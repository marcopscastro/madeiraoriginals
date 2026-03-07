

# Printify-Ready Storefront — Full Page Design Plan

Since this store will connect to Printify (a print-on-demand service), the product data will eventually come from the Printify API. For now, we'll build all the UI pages with the current local product data, structured so it's easy to swap in Printify data later.

## New Pages to Build

### 1. Shop / Collection Page (`/shop`)
- Full product catalog with filtering by category (Tees, Canvas Goods, Headwear)
- Sort options (Price low-high, high-low, Newest)
- Responsive grid: 3-col desktop, 2-col tablet, 1-col mobile
- Active filter chips with clear-all option
- Uses brand colors: Atlantic Blue headings, Canvas background, Pico Red active filters

### 2. Cart Page (`/cart`)
- Full-page cart view showing all items with images, names, sizes, quantities
- Quantity adjustment (+/−) and remove buttons per item
- Order summary sidebar: subtotal, shipping estimate, total
- "Continue Shopping" link and "Proceed to Checkout" CTA (Pico Red, sharp corners)
- Empty cart state with illustration and "Shop Now" link

### 3. Checkout Page (`/checkout`)
- Multi-step or single-page form: Contact info → Shipping address → Payment placeholder
- Order summary sidebar showing cart items and totals
- Form validation with clear error states
- "Place Order" button (Pico Red) — placeholder for Printify/payment integration
- Clean, minimal layout to maximize conversion

### 4. Category Pages (via `/shop?category=tees` etc.)
- Nav links (Shop Tees, Canvas Goods, Headwear) route to `/shop` with category filter pre-applied
- "Our Story" links to `/#about` scroll anchor

## Enhancements to Existing Pages

### Header Updates
- Cart icon opens a **slide-out cart drawer** (Sheet component) showing items, quantities, subtotal, and "View Cart" / "Checkout" buttons
- Nav links become functional routes to `/shop?category=...`
- Search icon opens a search overlay filtering products by name

### Product Detail Page Updates
- "You may also like" section at the bottom showing 3 related products
- Breadcrumb navigation: Home > Shop > Product Name

### Product Data Structure
- Add a `category` field to the Product interface (`"tees" | "canvas" | "headwear"`) for filtering
- Add `slug` field for URL-friendly routing (already using `id` which works)

## Technical Approach

- **Cart Drawer**: Use the existing Shadcn `Sheet` component for the slide-out cart
- **Routing**: Add routes for `/shop`, `/cart`, `/checkout` in `App.tsx`
- **URL Params**: Use `useSearchParams` for category filtering on the shop page
- **Form Handling**: Use `react-hook-form` + `zod` (already installed) for checkout validation
- **All pages** use the existing `Header` + `Footer` wrapper pattern
- **Brand consistency**: All CTAs are Pico Red with sharp corners, headings in Montserrat uppercase, body in Inter

## File Changes Summary

| Action | File |
|--------|------|
| Create | `src/pages/Shop.tsx` |
| Create | `src/pages/Cart.tsx` |
| Create | `src/pages/Checkout.tsx` |
| Create | `src/components/CartDrawer.tsx` |
| Create | `src/components/ProductCard.tsx` (shared card component) |
| Create | `src/components/RelatedProducts.tsx` |
| Update | `src/data/products.ts` — add `category` field |
| Update | `src/App.tsx` — add new routes |
| Update | `src/components/Header.tsx` — functional nav links, cart drawer trigger |
| Update | `src/pages/ProductDetail.tsx` — add breadcrumbs, related products |

