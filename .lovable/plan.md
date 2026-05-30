# Make the app readable & editable outside Lovable

Two parallel tracks: (A) prerender key public routes so Claude (and crawlers) can read real HTML, (B) connect the project to GitHub so Claude Code can read/edit the codebase locally.

## A. Prerendering (so Claude can *see* the site)

Goal: static HTML snapshots for public pages, served from the same Vite build. No framework change, no SSR runtime.

**Approach:** add a post-build prerender step using `vite-plugin-prerender` (or a small Puppeteer script) that renders the SPA to HTML for a fixed route list and writes `dist/<route>/index.html`. Hosting (Lovable static) already serves those files directly, so crawlers and tools like Claude get full markup.

**Routes to prerender (public only):**
- `/`, `/shop`, `/studio`, `/wholesale` (gate screen only), `/culture`, `/about`, `/contact`
- `/journal` + each published `/journal/:slug` (fetched from Lovable Cloud at build time)
- Collection pages: `/madeira-t-shirts`, `/madeira-hoodies`, `/madeira-accessories`, `/madeira-stickers`, `/madeira-streetwear`, `/madeira-gifts`
- Product pages: `/product/:handle` for every Shopify product (fetched via Storefront API at build time)

**Excluded:** `/auth`, `/admin/*`, anything behind the wholesale passcode beyond the gate.

**i18n handling:** prerender PT (default, canonical) markup. EN remains client-rendered via `?lang=en` — meta `hreflang` already covers SEO. (Can add EN snapshots later if needed.)

**Dynamic data freshness:** snapshots refresh on each Lovable publish. Live cart, Shopify inventory, journal updates between publishes still hydrate client-side on load — prerender only seeds the initial HTML.

### Technical notes
- Add `scripts/prerender.mjs` (Puppeteer) that boots `vite preview`, visits each URL, saves rendered HTML.
- Route list built from a single `src/lib/prerenderRoutes.ts` source of truth + dynamic fetch of journal slugs (Supabase) and product handles (Shopify Storefront).
- Wire `"build": "vite build && node scripts/prerender.mjs"` in `package.json`.
- React already mounts cleanly into prerendered DOM (react-helmet-async + react-router are SSR-safe with this snapshot approach).

## B. GitHub + Claude Code (so Claude can *edit* the code)

1. In Lovable: top-right → GitHub → **Connect to GitHub** → create a new repo (e.g. `madeira-originals`). Lovable will two-way sync every change.
2. Locally (or anywhere Claude Code runs):
   ```
   git clone git@github.com:<you>/madeira-originals.git
   cd madeira-originals
   claude   # starts Claude Code in the repo
   ```
3. Claude Code can now read every file and propose edits. Commits pushed to `main` flow back into Lovable automatically.
4. Optional: add Playwright MCP to Claude Code so it can also *render* the live preview URL and verify visual changes.

No code changes needed for track B — it's a one-time connection in the Lovable UI plus a local clone.

## Deliverables (track A, after approval)
- `scripts/prerender.mjs`
- `src/lib/prerenderRoutes.ts`
- `package.json` build script update
- `vite.config.ts` left as-is (prerender runs after `vite build`)
- Short README section documenting how prerendering works and how to add new routes

## What I need from you
- Confirm track A scope (route list above) — add/remove anything?
- For track B, just say the word and I'll walk you through the GitHub connect button; the actual connect happens in the Lovable UI, not via code.
