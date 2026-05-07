# Separate Streetwear from HORECA

Use Shopify product tags to split the catalog cleanly without changing checkout or fulfillment. Streetwear stays the main shop; HORECA gets its own dedicated landing page with a "Request a quote" CTA for bulk B2B inquiries.

## What changes for the user

- Header nav: `Shop` (streetwear) and `HORECA` (B2B/café-restaurant gear)
- Homepage Bestsellers: streetwear only
- `/shop`: streetwear only (renamed from "All Products")
- `/horeca`: new page with B2B-oriented hero, product grid, and quote CTA
- All existing Shopify products get tagged `streetwear` (current tees) so nothing disappears

## Implementation steps

1. **Tag existing products in Shopify**
   - Add tag `streetwear` to all current tees (Poncha, etc.) via `shopify--update_product`.
   - No HORECA products exist yet — page will show "Coming soon" empty state until the user adds them.

2. **Make `useProducts` accept a tag filter**
   - Pass the existing `query` param through as `tag:streetwear` or `tag:horeca`.
   - Already supported by the hook — just call sites need updating.

3. **Update homepage Bestsellers** (`Bestsellers.tsx`)
   - Pass `query: "tag:streetwear"` so the homepage stays focused on tees.

4. **Refactor `Shop.tsx` to accept a tag**
   - Add an optional `tag` prop (or read from route).
   - Use `/shop` route → `tag:streetwear`, title "Streetwear".

5. **Create `/horeca` page** (`src/pages/Horeca.tsx`)
   - Hero: "FOR THE HORECA" headline + short pitch (branded aprons, mugs, tees for cafés/restaurants in Madeira).
   - Product grid filtered by `tag:horeca` (empty state: "Custom HORECA drops coming soon — get in touch for bulk orders").
   - "Request a quote" CTA section: `mailto:` link or a simple form (start with mailto for speed).
   - Register route in `App.tsx`.

6. **Update Header nav** (`Header.tsx`)
   - Replace single shop link with `SHOP` → `/shop` and `HORECA` → `/horeca`.
   - Same treatment in mobile menu.

7. **Update SearchOverlay** (optional polish)
   - Keep searching all products — buyers shouldn't be blocked by category.

## Technical details

- Filtering uses Shopify Storefront API `query` param (already wired through `useProducts(first, query)` and `PRODUCTS_QUERY`).
- Tags applied via `shopify--update_product` with `tags: "streetwear"` (or comma-separated if product has others).
- No checkout/cart/fulfillment changes — Printify vs studio routing is handled per-product in Shopify admin, independent of tags.
- No new dependencies.

## Files touched

- `src/components/Bestsellers.tsx` — add tag filter
- `src/components/Header.tsx` — split nav into Shop / HORECA
- `src/pages/Shop.tsx` — filter by `tag:streetwear`, retitle
- `src/pages/Horeca.tsx` — **new**
- `src/App.tsx` — register `/horeca` route
- Shopify: tag existing products with `streetwear` (via update_product calls)
