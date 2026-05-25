# Responsive & Safe-Zone Audit

Goal: verify every page renders cleanly on mobile, tablet, and desktop, with no horizontal scroll, no clipped text/CTAs, and proper safe-area insets on notched devices (iPhone, Android).

## Scope

Pages to test:
- `/` (Home: Hero, ValueBanner, Manifesto, Bestsellers, NoTouristTrap, DesignDirections, Diaspora, JournalPreview, HomeNewsletter)
- `/shop` + all collection routes (`/madeira-t-shirts`, `/madeira-hoodies`, `/madeira-accessories`, `/madeira-stickers`, `/madeira-streetwear`, `/madeira-gifts`)
- `/product/:handle` (PDP)
- `/studio` (incl. new POS Brasa section)
- `/wholesale` (gate + portal)
- `/journal` + `/journal/:slug`
- `/about`, `/contact`, `/culture`
- `/auth`, admin pages
- Header (mobile menu, dropdowns, cart drawer, search overlay)
- Footer

Breakpoints to verify:
- 320×568 (small phone)
- 375×812 (iPhone 12/13/14 — notch)
- 390×844 (iPhone 14 Pro)
- 768×1024 (iPad portrait)
- 1024×768 (iPad landscape)
- 1366×768 (laptop)
- 1920×1080 (desktop)

## What I'll check on every page

1. **No horizontal scroll** — body width must equal viewport at every breakpoint.
2. **Tap targets** — buttons/links ≥ 44×44px on mobile.
3. **Typography** — display headings don't overflow or clip; line-height holds.
4. **Images** — proper aspect ratios, no squash, no overflow.
5. **Forms** — inputs full-width on mobile, labels visible, keyboards don't cover submit.
6. **Sticky header** — doesn't cover content; mobile menu scrolls when long.
7. **Cart drawer / Search overlay / Lightbox** — fit screen, close button reachable.
8. **Footer** — grid collapses correctly, newsletter form usable.
9. **Safe-area insets** — iOS notch / home indicator respected via `env(safe-area-inset-*)` on:
   - Sticky `<header>` (top inset)
   - Fixed CTAs / cart drawer bottom (bottom inset)
   - Mobile menu (top + bottom)
   - Any full-bleed sections (left/right insets in landscape)

## How I'll run the audit

Use the in-sandbox browser at multiple viewports:
- Navigate each route, screenshot full page at 375, 768, 1366.
- Open mobile menu, cart drawer, search overlay, lightbox — screenshot each.
- Inspect for horizontal overflow via `document.documentElement.scrollWidth > clientWidth`.
- Check console for layout warnings.

Findings are logged into a single audit report (one row per issue: page, breakpoint, problem, fix).

## Fixes I'll apply

For each confirmed issue, the smallest change:
- Add `min-w-0`, `overflow-x-hidden`, `break-words`, `flex-wrap` where overflow occurs.
- Adjust Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) on grid/padding/text.
- Add safe-area utilities. In `tailwind.config.ts` extend spacing with `safe-t/b/l/r` mapped to `env(safe-area-inset-*)`, then apply `pt-safe-t`, `pb-safe-b` to sticky header, mobile menu, cart drawer, footer.
- Ensure `index.html` has `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` (required for safe-area insets to activate).
- No new dependencies, no design overhaul — only responsive corrections.

## Out of scope

- New features, copy changes, redesigns.
- Backend / business logic.
- SEO / performance work (already covered in prior passes).

## Deliverable

1. Audit report (in chat) listing issues found per page/breakpoint with screenshots.
2. Targeted code edits to fix each issue.
3. Re-test pass at the same breakpoints to confirm clean.
