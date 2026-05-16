# Platform Expansion V2 — Implementation Plan

## Heads-up before we build

- Project memory currently says **Production Studio is hidden** from the public site (nav/footer/home; `/production-studio` redirects to `/`). This PRD reverses that decision — I'll un-hide it under the new `/studio` path and update memory accordingly.
- A `/horeca` route + `HorecaLeadForm` already exist but currently redirect to `/`. The new **Studio** absorbs HORECA apparel as one of three service pillars, so `/horeca` will keep redirecting (now to `/studio`).
- Existing `ProductionStudio.tsx` + `ProductionQuoteForm` are 80% of what's needed for `/studio` — I'll restyle + extend, not rebuild.

---

## 1. Internationalization (PT-PT / EN)

- Add `react-i18next` + `i18next` (lightweight, standard).
- Create `src/i18n/index.ts` with two resource files: `src/i18n/locales/pt.json`, `src/i18n/locales/en.json`.
- Provide a `LanguageContext` wrapper around i18next so the `[ PT | EN ]` toggle re-renders instantly (no reload). Persist choice in `localStorage`; default to browser language, falling back to PT-PT.
- Add `[ PT | EN ]` pill toggle in `Header.tsx` (desktop right cluster + mobile menu top).
- Wrap **new** strings in `t('key')`. For existing pages, migrate static copy opportunistically — full migration of every page would be a much bigger pass, so I'll scope this round to: Header, Footer, Hero, Studio page, Wholesale page, and shared CTAs. (Flag if you want a full sweep.)
- Set `<html lang>` dynamically.

## 2. Global tagline + nav restructure

- **Footer**: keep "A Nossa Ilha. A Nossa Marca." (already there, line 67) — promote it visually (larger, accent color, never translated).
- **Hero sections** of `/studio` and `/wholesale`: anchor the same tagline as an over-line above the H1.
- **Header nav** restructured to:
  - Shop  (existing dropdown — keep)
  - Studio  → `/studio`
  - Wholesale  → `/wholesale`
  - Journal · About · Contact  (collapse into a smaller secondary group or keep inline; I'll keep inline to avoid hiding existing routes)

## 3. `/studio` — B2B HORECA Solutions

- New `src/pages/Studio.tsx` (replaces hidden `ProductionStudio.tsx` role; old file can stay as legacy or be deleted — I'll delete to avoid drift).
- Route `/studio` (+ alias `/b2b` → `/studio`). `/production-studio` and `/horeca` redirect to `/studio`.
- **Visual direction**: technical / brutalist. Darker surface — use `secondary` token (navy/charcoal already in palette) for hero + section dividers. Mono-style labels, hairline borders, no rounding (per design memory).
- **Sections**:
  1. Hero — tagline overline, H1 "We build brands from the kitchen to the cloud.", subcopy, dual CTA (Request Quote / See Services).
  2. Three-column pillar grid:
     - **Digital Infrastructure** — Custom Websites · POS Integrations · Local SEO
     - **HORECA Apparel** — High-durability DTF staff uniforms (FOH/BOH) · Custom aprons
     - **Physical Branding** — UV DTF equipment decals · Laser-engraved menus · Stone signage
  3. Trusted-by strip (reuse existing).
  4. Quote form (see below).
- **Quote form** — extend `ProductionQuoteForm` into `StudioQuoteForm`:
  - Fields: Name, Business Name, **HORECA Sector** (dropdown: Restaurant / Café / Bar / Hotel / Bakery / Food Truck / Other), **Required Services** (multi-select checkboxes: Digital, Apparel, Physical), Email, Phone, Message, optional artwork upload.
  - DB: add columns `horeca_sector text`, `required_services text[]` to existing `production_quotes` table via migration. No new table.

## 4. `/wholesale` — Gated distribution portal

- New `src/pages/Wholesale.tsx` + `src/components/WholesaleGate.tsx`.
- **Auth model**: shared passcode (PRD says "distributed via physical business cards"), **not** per-user accounts. Implementation:
  - Passcode stored as Supabase secret `WHOLESALE_PASSCODE`.
  - New edge function `verify-wholesale-passcode` compares submitted code (constant-time) and returns a signed short-lived token (HMAC with a second secret `WHOLESALE_TOKEN_SECRET`).
  - Frontend stores token in `sessionStorage`; gate component re-verifies token signature/expiry on mount via a second edge function `validate-wholesale-token` (so passcode is never shipped to the client). Token TTL: 12h.
  - This avoids the anti-pattern of client-side `if (code === 'XYZ')` checks.
- **Post-login portal sections**:
  1. **Premium Corner Line** — digital catalog of core MO tees with bulk-pricing tiers (e.g. 25 / 50 / 100+ units). Pulls from Shopify products tagged `wholesale`; falls back to a static list if none tagged yet. Tier pricing is editorial (no Shopify variant changes).
  2. **White-Label Manufacturing** — informational block: custom design + DTF for souvenir shops. CTA → bulk inquiry form.
  3. **UV DTF Merch** — bulk waterproof sticker pack ordering block. CTA → bulk inquiry form.
- **Bulk-order inquiry form** — new `WholesaleInquiryForm.tsx` writing to new table `wholesale_inquiries`:
  - Fields: Business name, Contact, Email, Phone, Product line (multi-select: Corner Line tees / White-label / UV DTF stickers), Estimated volume, Delivery window, Notes.
  - Surfaces in `/admin/quotes` (existing admin page).
- **Mobile-first**: tighter spacing, sticky CTA, single-column catalog cards under `md:`.

## 5. Component reuse

- All forms reuse the existing `Field/Input` patterns + design tokens (`bg-primary`, `font-heading`, hairline borders, no rounding). No new buttons or typography.
- Wholesale catalog cards reuse `ProductCard` shell with a `priceOverride` slot for bulk tiers.

## 6. Memory update

- Update `mem://index.md`: remove "Production Studio is HIDDEN" rule; add new routes (`/studio`, `/wholesale`) + i18n note.

---

## Technical section

**Files added**
- `src/i18n/index.ts`, `src/i18n/locales/{pt,en}.json`
- `src/contexts/LanguageContext.tsx`
- `src/components/LanguageToggle.tsx`
- `src/pages/Studio.tsx`, `src/components/StudioQuoteForm.tsx`
- `src/pages/Wholesale.tsx`, `src/components/WholesaleGate.tsx`, `src/components/WholesaleInquiryForm.tsx`, `src/components/WholesaleCatalog.tsx`
- `supabase/functions/verify-wholesale-passcode/index.ts`
- `supabase/functions/validate-wholesale-token/index.ts`

**Files edited**
- `src/App.tsx` — routes for `/studio`, `/b2b`→`/studio`, `/wholesale`; update `/production-studio` + `/horeca` redirects to `/studio`; wrap in `LanguageProvider`.
- `src/components/Header.tsx` — nav restructure + language toggle.
- `src/components/Footer.tsx` — promote tagline; add Studio/Wholesale links.
- `src/components/Hero.tsx` — wrap headline in `t()`.
- `mem://index.md` — see §6.

**Files deleted**
- `src/pages/ProductionStudio.tsx`, `src/pages/Horeca.tsx` (logic absorbed into Studio).

**DB migrations** (one migration)
- `ALTER TABLE production_quotes ADD COLUMN horeca_sector text, ADD COLUMN required_services text[]`.
- `CREATE TABLE wholesale_inquiries (...)` with RLS: insert allowed to anyone (public form), select only to admins via existing `has_role(uid, 'admin')`.

**Secrets to add**
- `WHOLESALE_PASSCODE` (the passcode itself)
- `WHOLESALE_TOKEN_SECRET` (HMAC signing key for session tokens)

I'll request both via the secrets tool before deploying the wholesale edge functions.

**Out of scope this round** (flag if wanted)
- Full i18n migration of every existing page (Shop, ProductDetail, Journal, etc.) — only new + global chrome translated now.
- Bulk pricing pulled from Shopify metafields — using editorial tiers for now.
- Per-distributor wholesale accounts — using shared passcode per PRD.
