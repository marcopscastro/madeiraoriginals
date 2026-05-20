## PageSpeed Mobile — 58 → target 90+

Lighthouse flagged 4 things actually moving the needle. Everything else is noise.

### What's slow (and why)

| Issue | Impact |
|---|---|
| Hero JPG **1.49 MB** at 896×1200 (displayed 665×891) | LCP 11.6s — biggest win |
| Manifesto JPG **1.44 MB** | Wastes ~1.4 MB on scroll |
| `/journal/*.jpg` oversized + **no cache headers** | Repeat-visit + LCP cost |
| Google Fonts CSS **render-blocking 780 ms** | Pushes FCP to 3.9s |
| LCP image not preloaded → **2.23s "resource load delay"** | Browser waits for JS to discover it |

### Fixes

**1. Convert bundled hero + manifesto images to WebP + responsive sizes**
- Add `vite-imagetools` plugin.
- Re-author `Hero.tsx` and `Manifesto.tsx` to import multiple widths and emit `<img srcset sizes>` with the AVIF/WebP variants. Expected: hero drops from 1.5 MB → ~120 KB at the actual displayed size.
- Hero gets `fetchpriority="high"` (already there) + new `<link rel="preload" as="image" imagesrcset ...>` in `index.html` so the browser starts the download before parsing JS.

**2. Compress + responsive-size the `/public/journal/*.jpg` previews**
- Run `sharp` once to emit `.webp` at 800w and 1200w; update `JournalPreview.tsx` and `Journal.tsx` to use them.
- These are static so we can't set Cache-Control from the app (host config), but cutting size ~60% removes most of the cost anyway.

**3. Stop fonts from blocking render**
- Replace the synchronous Google Fonts `<link>` with the `media="print" onload` swap pattern (or a `<link rel="preload" as="style">` + onload). Keeps Fraunces / Montserrat / Inter, but they no longer block FCP.
- Already have `display=swap` — keep it; this just removes the 780 ms blocking penalty.

**4. Don't fire Supabase review queries on the home page**
- `RelatedProducts` / Bestsellers currently trigger `reviews?select=rating` for each tile during initial render, extending the critical chain to 3.7s. Defer those calls until after first paint (`requestIdleCallback` or move into a `useEffect` that runs after the carousel mounts). Small change, removes 3 round trips from the LCP path.

### Out of scope
- Shopify CDN images already sized 2048 — would need a srcset overhaul of `ProductCard`. Defer to a follow-up; not needed to hit 90.
- DOM size / TBT 240ms are fine.

### Files touched
- `vite.config.ts` (add `imagetools`)
- `package.json` (add `vite-imagetools`, `sharp` as devDep)
- `index.html` (font swap + LCP preload)
- `src/components/Hero.tsx`, `src/components/Manifesto.tsx`
- `src/components/JournalPreview.tsx`, `src/pages/Journal.tsx`
- `src/components/Bestsellers.tsx` / wherever review ratings are fetched
- new compressed assets under `public/journal/`

### Expected result
LCP 11.6s → ~2.5s, FCP 3.9s → ~1.8s, Performance 58 → ~90.
