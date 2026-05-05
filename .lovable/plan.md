
# Wire storefront to Shopify (real products + real checkout)

Replace all mock commerce with live Shopify Storefront API integration. Brand visuals and marketing sections (Hero, AboutUs, ValueBanner, Footer) stay untouched. Shopify hosts the entire checkout — we never collect payment in the app.

## Files removed
- `src/data/products.ts` — hardcoded products
- `src/context/CartContext.tsx` — mock cart
- `src/pages/Cart.tsx`, `src/pages/Checkout.tsx` — Shopify owns checkout

## Files created
- `src/lib/shopify.ts` — API constants (token + domain), `storefrontApiRequest`, GraphQL queries (products list, product by handle, cart create/add/update/remove), TypeScript types, `formatCheckoutUrl` helper
- `src/stores/cartStore.ts` — Zustand store with `persist`: items, cartId, checkoutUrl, isLoading, isSyncing; addItem/updateQuantity/removeItem/clearCart/syncCart
- `src/hooks/useCartSync.ts` — clears cart on tab visibility change after Shopify checkout completes
- `src/hooks/useShopifyProducts.ts` — React Query hooks: `useProducts(limit, query?)`, `useProductByHandle(handle)`

## Files refactored
- `ProductCard` — accepts `ShopifyProduct`, renders Shopify image/title/price, links to `/product/:handle`
- `Bestsellers` — fetches first 4 Shopify products
- `Shop` — fetches all products; price sort kept; category buttons removed for now (re-add later via Shopify tags); empty state "No products yet"
- `ProductDetail` — route `/product/:handle`; size selector built from Shopify variants; Add to cart calls `cartStore.addItem` with the variant's `gid://...` ID
- `RelatedProducts` — fetches 3 other Shopify products, excludes current handle
- `SearchOverlay` — filters Shopify products by title client-side
- `CartDrawer` — reads from Zustand; Checkout button does `window.open(checkoutUrl, '_blank')` (URL always carries `channel=online_store`)
- `Header` — `totalItems` from Zustand
- `App.tsx` — drop `CartProvider`, drop `/cart` and `/checkout` routes, wire `useCartSync()`

## Dependency
- Install `zustand` (already needed for the cart store)

## Checkout flow
Add to Cart → first item creates Shopify cart (`cartCreate`), stores `cartId`+`checkoutUrl` → subsequent items use `cartLinesAdd`/`Update`/`Remove` → Cart drawer Checkout opens hosted Shopify checkout in new tab → on return, `useCartSync` clears local cart if Shopify cart is empty.

## After build
Store has zero products. I'll prompt for the first product (name, price, sizes, image) and create it via `shopify--create_product`. Printify products will sync in automatically once the user connects Printify → Shopify in their Printify dashboard.
