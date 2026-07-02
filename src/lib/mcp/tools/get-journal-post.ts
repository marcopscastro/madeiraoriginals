import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SUPABASE_URL = "https://hkyypgqbiwaxpyiflzhl.supabase.co";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreXlwZ3FiaXdheHB5aWZsemhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxODAxNTgsImV4cCI6MjA5Mzc1NjE1OH0.PGyIx9auFlwtQUSyiXqV26AtMYdXdEoWWyoxcFysueg";

export default defineTool({
  name: "get_journal_post",
  title: "Get journal post",
  description: "Fetch the full body of a published Madeira Originals journal article by slug (English + Portuguese if present).",
  inputSchema: {
    slug: z.string().min(1).describe("Article slug."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }) => {
    const params = new URLSearchParams({
      select: "slug,title,title_pt,excerpt,excerpt_pt,body_md,body_md_pt,tags,published_at,cover_url",
      slug: `eq.${slug}`,
      published: "eq.true",
      limit: "1",
    });
    const res = await fetch(`${SUPABASE_URL}/rest/v1/articles?${params}`, {
      headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` },
    });
    if (!res.ok) {
      return { content: [{ type: "text", text: `Error ${res.status}` }], isError: true };
    }
    const rows = await res.json();
    if (!rows.length) {
      return { content: [{ type: "text", text: `Post not found: ${slug}` }], isError: true };
    }
    const post = { ...rows[0], url: `https://madeiraoriginals.pt/journal/${rows[0].slug}` };
    return {
      content: [{ type: "text", text: JSON.stringify(post, null, 2) }],
      structuredContent: { post },
    };
  },
});
