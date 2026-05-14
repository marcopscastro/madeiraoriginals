## Quick health check on the product detail page + adjacent UX

I'd review or rethink these, in rough order of impact:

### 1. Product description is one un-formatted blob
On mobile you saw `…year warrantyCare instructions- Machine wash cold…` smashed together. Printify writes descriptions in HTML, but we render them as plain text via `whitespace-pre-line`. Result: paragraphs, lists and headings collapse into a wall.
**Rethink:** sanitize + render the Shopify `descriptionHtml` field (we already query `description`, just swap to `descriptionHtml` and render with `dangerouslySetInnerHTML` after DOMPurify), or split the description into tabs/accordion: *Story · Materials · Care · Shipping*.

### 2. Description duplicates the brand tagline
Every Printify description ends with "Inspired by Madeira. Designed for everywhere. 0% Tourist Trap." — but that line also appears site-wide. Strip it from product copy or move it to the marketing band below.

### 3. "Select size" copy is now misleading
The button still says "Select size" even when the missing option is Color (or both). Should read "Select options" or name the first un-chosen option dynamically.

### 4. Toast still says "Please select a size"
Same issue in `handleAddToCart` error toast — generalise to "Please select [option name]".

### 5. Main image doesn't react to colour selection
When the user picks a different colour, the gallery stays on whatever image was first. Most stores swap the main image to the variant image.
**Rethink:** when active variant changes, find the matching variant image (Shopify exposes `variant.image`) and jump the gallery to that index.

### 6. Mobile sticky CTA hides the bottom of the page
`fixed bottom-0` with no `padding-bottom` on `<main>` means the last paragraph / reviews button can be covered. Add `pb-24 md:pb-0` to the main wrapper.

### 7. Quantity has no upper bound and no stock awareness
User can add 999 of a variant that has 1 in stock. Cap at variant's available quantity (Shopify exposes `quantityAvailable` if enabled) or at least a sane max like 10.

### 8. Image thumbnails have no alt text + no keyboard order
`alt=""` on every thumbnail is fine for decorative, but the buttons have no `aria-label` ("View image 2 of 5"). Minor a11y win.

### 9. JSON-LD `sku` uses Shopify GID
`sku: activeVariant?.id` outputs `gid://shopify/ProductVariant/...`. Google prefers a real SKU. Either drop it or use the variant's actual SKU (add `sku` to the GraphQL query).

### 10. Related products = first 3 of any product
`RelatedProducts` just slices the first 3 products. With only two products live this is fine, but as the catalogue grows it'll feel random. Consider filtering by shared tag or product type.

### 11. SEO description falls back to raw description
`product.description?.slice(0, 160)` can cut mid-word and includes the care-instruction blob. Better: hand-write `meta_description` in Shopify, or build a dedicated short blurb.

### 12. No "Out of stock" empty state
If every variant of a product becomes unavailable, the CTA stays enabled with the first variant pre-selected. Should disable + relabel "Sold out".

### 13. Bigger picture
- **Variant-level pricing**: the price in the header doesn't update if different colours/sizes have different prices (currently they don't, but worth wiring before they do).
- **Currency**: hardcoded EUR via Shopify locale — fine for now, but if you ever ship to UK/US, plan multi-currency via Shopify Markets.
- **Cart drawer / cart page**: worth a separate review pass — I haven't looked at it this turn.

---

Want me to implement any subset of these? My recommendation for the next batch:
**1, 2, 3, 5, 6, 12** — biggest visible UX/quality wins, all frontend-only.
