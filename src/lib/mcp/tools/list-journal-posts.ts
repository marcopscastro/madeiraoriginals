import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SUPABASE_URL = "https://hkyypgqbiwaxpyiflzhl.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreXlwZ3FiaXdheHB5aWZsemhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODAxNTgsImV4cCI6MjA5Mzc1NjE1OH0.PGyIx9auFlwtQUSyiXqV26AtMYdXdEoWWyoxcFysueg";

export default defineTool({
  name: "list_journal_posts",
  title: "List journal posts",
  description: "List published Madeira Originals journal articles (title, slug, excerpt, tags, published date).",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional().describe("Max results (default 20)."),
    tag: z.string().optional().describe("Filter by tag (exact match)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, tag }) => {
    const params = new URLSearchParams({
      select: "slug,title,excerpt,tags,published_at,cover_url",
      published: "eq.true",
      order: "published_at.desc.nullslast",
      limit: String(limit ?? 20),
    });
    if (tag) params.set("tags", `cs.{${tag}}`);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/articles?${params}`, {
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
    });
    if (!res.ok) {
      return { content: [{ type: "text", text: `Error ${res.status}: ${await res.text()}` }], isError: true };
    }
    const rows = await res.json();
    const posts = rows.map((r: any) => ({
      ...r,
      url: `https://madeiraoriginals.pt/journal/${r.slug}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(posts, null, 2) }],
      structuredContent: { posts },
    };
  },
});
