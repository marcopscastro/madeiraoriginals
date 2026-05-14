## Goal
Rewrite the title and description of both live Shopify products so they rank better on Google/Shopify search while staying on-brand (editorial, premium, "Inspired by Madeira. Designed for everywhere.", 0% Tourist Trap).

## Current state
Two active products, both vendor `Printify`, type `T-Shirt`, tagged `streetwear`:

1. **Madeira Über No Brakes Required T-Shirt | Wooden Toboggan Sled Design** (id `10559521227094`)
2. **Poncha First Questions Later Tee | Cocktail Phrase Shirt, Madeira Drink** (id `10559520145750`)

Issues to fix:
- Titles are long and Printify-style (pipe-separated keyword stuffing). Google truncates >60 chars and the secondary phrase reads like a tag dump.
- Descriptions open with prose rather than a keyword-rich first sentence, and have no headings, no bullet hierarchy beyond features, no internal cues for São Vicente / Madeira streetwear.
- No SEO metafields set (Shopify `title_tag` / `description_tag`) — search snippet falls back to product title and the long body.

## SEO rewrite rules
- **Product title:** ≤60 chars, primary keyword first, brand suffix `| Madeira Originals`. Drop Printify keyword stuffing.
- **Body (description):** Open with one keyword-rich sentence (Madeira + product type + key phrase). Keep the brand voice. Reorganise into short paragraphs + Features / Care bullet lists already present. Add a closing line tying back to São Vicente / "Designed for everywhere".
- **Keep:** all variants, images, tags, pricing untouched. Only `title` and `body_html` change via `shopify--update_product`.
- Optional follow-up (not in this plan unless approved): also set Shopify SEO metafields `title_tag` / `description_tag` — current `update_product` tool doesn't expose those, so they'd require a separate step.

## Proposed rewrites

### Product 1 — Toboggan tee
- **New title (57 chars):** `Madeira Toboggan Tee — No Brakes Required | Madeira Originals`
- **Body opening:** "A premium Madeira streetwear t-shirt celebrating the wicker toboggans of Monte — the original Madeira Über. Heavyweight cotton, built in São Vicente energy, designed for everywhere."
- Keep existing Features and Care bullets, lightly tightened.

### Product 2 — Poncha tee
- **New title (54 chars):** `Poncha First, Questions Later Tee | Madeira Originals`
- **Body opening:** "A premium Madeira streetwear t-shirt for poncha lovers — Madeira's honey, lemon and aguardente cocktail, worn loud. Heavyweight cotton, São Vicente attitude, designed for everywhere."
- Keep existing Features and Care bullets, lightly tightened.

## Steps
1. Call `shopify--update_product` for product `10559521227094` with new `title` and `body` (HTML preserved).
2. Call `shopify--update_product` for product `10559520145750` with new `title` and `body`.
3. Confirm in chat; no frontend code changes needed (storefront pulls from Shopify live).

## Out of scope
- Image alt text (handled in product images, not by `update_product`).
- Shopify SEO metafields (`title_tag`, `description_tag`) — flag as a follow-up if you want them set too.
- Adding more products / variants.
