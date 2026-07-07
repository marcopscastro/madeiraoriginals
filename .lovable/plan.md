## Diagnosis

The site's Storefront API calls are succeeding (HTTP 200) but Shopify is returning an empty product list for every query:

```
POST .../api/2025-07/graphql.json
→ {"data":{"products":{"edges":[]}}}
```

This is not a code bug. The `/shop` page, homepage bestsellers, and collection pages all use the same `getProducts()` helper, and they'd all show products the moment Shopify starts returning them. The problem is on the Shopify side: the products are active in admin, but they are not published to the sales channel that the Storefront API token belongs to.

## Why this happens

Every Storefront Access Token in Shopify is tied to a specific sales channel (usually "Headless" or "Hydrogen"). A product being "Active" only means it's not archived/draft — it still has to be individually published to each sales channel to become visible through that channel's API. New products default to Online Store only, not Headless.

Secondary things that can cause the same symptom, in order of likelihood:

1. Products not published to the Headless/Hydrogen channel used by the current Storefront token.
2. Products have no variant with `availableForSale: true` (all variants out of stock + "Continue selling when out of stock" disabled → filtered out).
3. Products are in a market/region that excludes Portugal/EU, so the Storefront API hides them from this locale.
4. The Storefront token was regenerated in Shopify and the app is still using the old one (would usually 401, but worth confirming).

## Recommended fix (you do this in Shopify admin)

1. Shopify admin → **Sales channels** (left sidebar) → confirm a **Headless** (or Hydrogen) channel exists. If it doesn't, add it from the Shopify App Store — this is what the Storefront API reads from.
2. Open a product → **Sales channels and apps** panel on the right → tick **Headless** (and Online Store) → **Save**.
3. Do the same for every product you want on the site. You can bulk-select in the Products list → **More actions → Add available channel → Headless**.
4. Make sure at least one variant has stock, or that the variant has **"Continue selling when out of stock"** enabled — otherwise the Storefront API still hides it.
5. Refresh `/shop`. Products should appear immediately; no code deploy needed.

## What I'll do in the app once products are visible

Nothing structural needs changing. Once the Storefront API returns products:

- `/shop`, homepage bestsellers, `/madeira-t-shirts`, `/madeira-hoodies`, `/madeira-accessories`, `/madeira-stickers`, and every collection page will populate automatically.
- Featured collections filter by Shopify **tags** (`atlantic-utility`, `norte`, `contemporary-heritage`, `island-humour`). If you want products to appear in a specific homepage collection, add the matching tag on the product in Shopify.
- Optional: I can add a small inline warning on `/shop` in dev mode that says "Storefront API returned 0 products — check sales channel publishing" so this failure mode is obvious next time. Say the word if you want it.

## If you've already published to Headless

If you've verified the products are published to the Headless channel and `/shop` is still empty, tell me and I'll:

1. Reconnect the Shopify tools in this chat so I can call `shopify--search_products` and `shopify--count_products` against your store directly.
2. Compare what admin sees vs. what the Storefront token sees, and identify the exact product(s) that are misconfigured.
