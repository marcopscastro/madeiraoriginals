import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const RATE_LIMIT_WINDOW_MINUTES = 15;
const RATE_LIMIT_MAX_ATTEMPTS = 5;

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = "";
  for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = (s + pad).replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return b64url(sig);
}

async function tokenValid(token: string, secret: string): Promise<boolean> {
  try {
    if (!token.includes(".")) return false;
    const [payload, signature] = token.split(".");
    const expected = await sign(payload, secret);
    if (!constantTimeEqual(expected, signature)) return false;
    const decoded = JSON.parse(new TextDecoder().decode(b64urlDecode(payload))) as {
      scope?: string;
      exp?: number;
    };
    const now = Math.floor(Date.now() / 1000);
    return decoded.scope === "wholesale" && !!decoded.exp && decoded.exp >= now;
  } catch {
    return false;
  }
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const { passcode, token } = await req.json().catch(() => ({}));
    const expected = Deno.env.get("WHOLESALE_PASSCODE") ?? "";
    const tokenSecret = Deno.env.get("WHOLESALE_TOKEN_SECRET") ?? "";
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!expected || !tokenSecret || !supabaseUrl || !serviceKey) {
      return json({ error: "Server not configured" }, 500);
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    // Rate limit: 5 attempts per 15 minutes per IP
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
    const { count } = await admin
      .from("pin_attempts")
      .select("id", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("attempted_at", windowStart);
    if ((count ?? 0) >= RATE_LIMIT_MAX_ATTEMPTS) {
      return json({ error: "Too many attempts. Try again later." }, 429);
    }

    let authorized = false;
    if (typeof passcode === "string" && passcode.length > 0) {
      await admin.from("pin_attempts").insert({ ip });
      authorized = constantTimeEqual(passcode.trim(), expected);
    } else if (typeof token === "string" && token.length > 0) {
      authorized = await tokenValid(token, tokenSecret);
    } else {
      return json({ error: "passcode or token required" }, 400);
    }

    if (!authorized) {
      return json({ error: "invalid" }, 401);
    }

    const { data, error } = await admin
      .from("wholesale_pricing")
      .select("tier_label, min_qty, max_qty, unit_price_eur, notes, sort_order")
      .order("sort_order", { ascending: true });
    if (error) return json({ error: "Failed to load pricing" }, 500);

    return json({ rows: data ?? [] }, 200);
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});
