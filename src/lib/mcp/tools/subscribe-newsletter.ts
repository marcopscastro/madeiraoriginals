import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SUPABASE_URL = "https://hkyypgqbiwaxpyiflzhl.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreXlwZ3FiaXdheHB5aWZsemhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODAxNTgsImV4cCI6MjA5Mzc1NjE1OH0.PGyIx9auFlwtQUSyiXqV26AtMYdXdEoWWyoxcFysueg";

export default defineTool({
  name: "subscribe_newsletter",
  title: "Subscribe to newsletter",
  description: "Subscribe an email address to the Madeira Originals newsletter.",
  inputSchema: {
    email: z.string().email().describe("Subscriber email address."),
    source: z.string().optional().describe("Where the subscription originated (default: 'mcp')."),
  },
  annotations: { readOnlyHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ email, source }) => {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON,
        Authorization: `Bearer ${SUPABASE_ANON}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal,resolution=ignore-duplicates",
      },
      body: JSON.stringify({ email, source: source ?? "mcp" }),
    });
    if (!res.ok) {
      const t = await res.text();
      return { content: [{ type: "text", text: `Subscribe failed ${res.status}: ${t}` }], isError: true };
    }
    return { content: [{ type: "text", text: `Subscribed ${email}.` }] };
  },
});
