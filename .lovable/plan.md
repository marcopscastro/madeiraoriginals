# Madeira Originals — Brand Site v2

Transform the current shop into a Madeira lifestyle brand site: keep the cream/navy/red palette, elevate typography and tone, add deep content + SEO infrastructure, split HORECA, and stand up a DB-backed Journal.

## Phase 1 — Foundation (HORECA split + SEO infra)

1. **Tag remaining products** in Shopify
   - `streetwear`: Poncha tee, Liquid Software, Mercado, Uber, Tote, Garment-Dyed, Hooded, Heavy Cotton (already done: Cotton Tote, Liquid, Mercado, Uber)
   - `horeca`: Custom Pint, MO Pint (done)
   - Remaining: Poncha tee + 3 Printify generics → tag `streetwear`

2. **Routing & nav** (`App.tsx`, `Header.tsx`)
   - Routes: `/`, `/shop`, `/horeca`, `/culture`, `/about`, `/journal`, `/journal/:slug`, `/product/:handle`
   - Nav: SHOP · HORECA · CULTURE · JOURNAL · ABOUT
   - Filter `Shop` and `Bestsellers` by `tag:streetwear`

3. **SEO infrastructure**
   - `react-helmet-async` for per-page `<title>`, meta description, OG tags, canonical
   - JSON-LD: Organization/Brand on every page; Product on PDP; Article on journal posts; BreadcrumbList where applicable
   - `public/robots.txt` + dynamic-ish `public/sitemap.xml` (regenerated manually for now; products listed by handle)
   - Update `index.html` defaults + favicon meta

## Phase 2 — Typography + tone elevation (hybrid rebrand)

- Add **Fraunces** (serif) for editorial display headings on Home/Culture/About/Journal hero blocks
- Keep **Montserrat** for UI/nav/buttons/product cards, **Inter** for body
- Add Tailwind token `font-display` → Fraunces; use sparingly on hero H1s and section openers
- Voice update: keep wit on product copy, but homepage / culture / about lean editorial ("Modern products inspired by Madeira Island"). No cheesy souvenir tone.
- Colors unchanged.

## Phase 3 — Homepage rebuild (`pages/Index.tsx`)

Sections in order:
1. **Hero** — H1 "Modern Madeira Inspired Apparel & Lifestyle" + subtitle, two CTAs (Shop Collection / Explore Madeira Culture), full-bleed island image
2. **Brand story** — "Inspired by Madeira. Designed for Everywhere."
3. **Featured collections** — Tees / Hoodies / Accessories / HORECA tiles → link to filtered shop
4. **Bestsellers** (existing, streetwear-only)
5. **Madeira Culture teaser** — links to `/culture`
6. **Tourism / Gift positioning** — "Authentic Madeira Inspired Gifts"
7. **Journal preview** — latest 3 articles
8. **Email capture** — stores to new `newsletter_subscribers` table
9. **Footer** (existing) extended with sitemap links

## Phase 4 — Content pages

- **`/culture`** (`pages/Culture.tsx`) — long-form: island identity, landscapes, Atlantic culture, traditions. SEO H2s ("Why Madeira Inspires Our Designs", etc.). 600+ words.
- **`/about`** (`pages/About.tsx`) — brand story, founder note, design philosophy, Madeira inspiration.
- **`/horeca`** (`pages/Horeca.tsx`) — B2B hero, products tagged `horeca`, "Request a quote" mailto CTA.
- **`/shop`** — retitled "Streetwear", filtered.

## Phase 5 — PDP enrichment (`pages/ProductDetail.tsx`)

- Add structured story sections under the buy box:
  - "The Story" (uses Shopify description)
  - "Designed With Madeira Inspiration" (per-product or brand-level fallback copy)
  - "Materials & Fit"
  - "Shipping & Returns"
- Product JSON-LD schema (name, image, description, price, availability, brand)
- Breadcrumb (Home › Shop › Title)
- Target 300–600 words/page (combine Shopify description + brand boilerplate + section copy)

## Phase 6 — Journal (Lovable Cloud)

Enable Lovable Cloud, then:

**Schema** (`articles` table):
- `id uuid pk`, `slug text unique`, `title text`, `excerpt text`, `body_md text`, `cover_url text`, `tags text[]`, `published boolean`, `published_at timestamptz`, `seo_title text`, `seo_description text`, `created_at`, `updated_at`
- RLS: public `select` on `published = true`; insert/update restricted to authenticated `admin` role (separate `user_roles` table + `has_role()` SECURITY DEFINER fn per security guidelines)
- Seed 3 articles: "Best Souvenirs From Madeira", "Modern Madeira Streetwear", "What Makes Madeira Culture Unique"

**Pages**:
- `/journal` — grid of published articles (cover, title, excerpt, date)
- `/journal/:slug` — article view, renders markdown via `react-markdown`, Article JSON-LD, related links
- Admin editing deferred (seed via SQL for now; can add `/admin/journal` later behind auth)

**Newsletter**:
- `newsletter_subscribers` (`email`, `created_at`); RLS allows anonymous insert only.

## Files touched / created

**New**: `pages/Horeca.tsx`, `pages/Culture.tsx`, `pages/About.tsx`, `pages/Journal.tsx`, `pages/JournalPost.tsx`, `components/SEO.tsx`, `components/JsonLd.tsx`, `components/NewsletterForm.tsx`, `components/CollectionsGrid.tsx`, `components/JournalPreview.tsx`, `lib/seo.ts`, `public/robots.txt`, `public/sitemap.xml`

**Edited**: `App.tsx`, `index.html`, `tailwind.config.ts`, `index.css`, `Header.tsx`, `Footer.tsx`, `Hero.tsx`, `pages/Index.tsx`, `pages/Shop.tsx`, `pages/ProductDetail.tsx`, `components/Bestsellers.tsx`

**Backend**: Enable Cloud, migrations for `articles`, `user_roles`, `app_role` enum, `has_role()`, `newsletter_subscribers`, RLS policies, seed articles.

**Shopify**: tag remaining 4 products `streetwear`.

**Memory**: update visual-aesthetic + typography memory to record the Fraunces display addition and editorial tone shift.

## Notes / trade-offs

- Hybrid keeps your existing brand recognition; only typography hierarchy and tone evolve.
- Sitemap is static-generated for now; dynamic edge function can come later.
- Journal admin UI is deferred to keep this round shippable; you'll add posts via me/SQL until needed.
- Image SEO (renaming files, alt text) applied to new hero + section images; existing Shopify images keep their CDN names but we set rich `alt` text in components.
