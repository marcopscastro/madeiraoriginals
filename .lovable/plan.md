## Goal
The homepage "Latest Drops" section currently shows only 2 products because it filters by the Shopify `tag:streetwear`. Remove that filter so all products in the store appear.

## Change
**File:** `src/components/Bestsellers.tsx`

Replace:
```ts
const { data: products = [], isLoading } = useProducts(8, "tag:streetwear");
```
with:
```ts
const { data: products = [], isLoading } = useProducts(8);
```

That's it — `useProducts` already handles a missing query parameter and returns all products (up to 8 here).

## Notes
- `/shop` page is unaffected and keeps its own product taxonomy.
- No design, copy, or layout changes. Same 8-product cap, same grid, same "Shop All" CTA.
- Once you add more products in Shopify, they'll automatically populate the homepage.
