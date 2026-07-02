// Prerender public routes to static HTML so crawlers and tools like Claude
// can read real markup without executing JavaScript.
//
// Strategy:
//   1. Boot `vite preview` against the freshly built `dist/`.
//   2. Use Puppeteer to visit each route, wait for the React app to render,
//      and snapshot the resulting HTML.
//   3. Write each snapshot to `dist/<route>/index.html` so the static host
//      serves it directly. The SPA still hydrates and takes over after load.
//
// Designed to NEVER fail the build: if Puppeteer/Chromium can't start
// (sandboxed CI, missing system libs, etc.), we log a warning and exit 0.

import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { setTimeout as wait } from "node:timers/promises";

const DIST_DIR = resolve("dist");
const PORT = 4317;
const ORIGIN = `http://127.0.0.1:${PORT}`;

const STATIC_ROUTES = [
  "/",
  "/shop",
  "/studio",
  "/wholesale",
  "/culture",
  "/about",
  "/contact",
  "/journal",
  "/madeira-t-shirts",
  "/madeira-hoodies",
  "/madeira-accessories",
  "/madeira-stickers",
  "/madeira-streetwear",
  "/madeira-gifts",
  "/portugal-streetwear",
  "/madeira-souvenirs",
  "/shipping",
  "/returns",
  "/care",
  "/size-guide",
  "/custom",
];

// Mirror src/lib/shopify.ts — keep in sync.
const SHOPIFY_URL =
  "https://madeiraoriginals-cve6q.myshopify.com/api/2025-07/graphql.json";
const SHOPIFY_TOKEN = "bbcc49de92200adcd5c43d7f6f847485";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

async function fetchProductHandles() {
  const query = `{ products(first: 100) { edges { node { handle } } } }`;
  try {
    const res = await fetch(SHOPIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data?.products?.edges ?? []).map(
      (e) => `/product/${e.node.handle}`,
    );
  } catch (err) {
    console.warn(`prerender: skipping product routes (${err.message})`);
    return [];
  }
}

async function fetchJournalSlugs() {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?select=slug&published=eq.true`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      },
    );
    if (!res.ok) return [];
    const rows = await res.json();
    return rows.map((r) => `/journal/${r.slug}`);
  } catch (err) {
    console.warn(`prerender: skipping journal routes (${err.message})`);
    return [];
  }
}

function startPreviewServer() {
  const child = spawn(
    "npx",
    ["vite", "preview", "--port", String(PORT), "--strictPort"],
    { stdio: ["ignore", "pipe", "pipe"] },
  );
  child.stdout.on("data", () => {});
  child.stderr.on("data", () => {});
  return child;
}

async function waitForServer(url, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      // not ready yet
    }
    await wait(250);
  }
  return false;
}

function routeToFile(route) {
  if (route === "/") return join(DIST_DIR, "index.html");
  const clean = route.replace(/^\/+|\/+$/g, "");
  return join(DIST_DIR, clean, "index.html");
}

async function snapshot(browser, route) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`${ORIGIN}${route}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    // Give React Query / lazy chunks a small grace period.
    await wait(400);
    const html = await page.content();
    const outFile = routeToFile(route);
    mkdirSync(resolve(outFile, ".."), { recursive: true });
    writeFileSync(outFile, html);
    console.log(`prerender: ${route} → ${outFile.replace(DIST_DIR, "dist")}`);
  } finally {
    await page.close();
  }
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.warn("prerender: dist/ not found — run `vite build` first.");
    return;
  }

  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch (err) {
    console.warn(
      `prerender: puppeteer not available, skipping snapshots (${err.message})`,
    );
    return;
  }

  const [productRoutes, journalRoutes] = await Promise.all([
    fetchProductHandles(),
    fetchJournalSlugs(),
  ]);
  const allRoutes = [...STATIC_ROUTES, ...productRoutes, ...journalRoutes];
  console.log(
    `prerender: ${allRoutes.length} routes (` +
      `${STATIC_ROUTES.length} static, ${productRoutes.length} products, ` +
      `${journalRoutes.length} journal)`,
  );

  const server = startPreviewServer();
  const ready = await waitForServer(`${ORIGIN}/`);
  if (!ready) {
    console.warn("prerender: vite preview never came up — aborting.");
    server.kill();
    return;
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } catch (err) {
    console.warn(
      `prerender: could not launch Chromium, skipping (${err.message})`,
    );
    server.kill();
    return;
  }

  try {
    for (const route of allRoutes) {
      try {
        await snapshot(browser, route);
      } catch (err) {
        console.warn(`prerender: ${route} failed — ${err.message}`);
      }
    }
  } finally {
    await browser.close();
    server.kill();
  }

  console.log("prerender: done.");
}

main().catch((err) => {
  console.warn(`prerender: unexpected failure (${err.message}) — continuing.`);
  process.exit(0);
});
