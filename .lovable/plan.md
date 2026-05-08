Now that auth, the admin journal editor, reviews, and the HORECA lead form are live and you can sign in as admin, the next phase focuses on the two remaining tracks from the original roadmap: **Conversion polish** and **More content + imagery**. These are the highest-leverage things left before a wider launch.

## Phase goals

1. Make the shop convert better (clearer pricing, trust, faster path to checkout).
2. Fill the site with real Madeira content so it feels like a brand, not a template.

## Scope

### 1. Conversion polish
- **Product card**: show price prominently, add hover state with secondary image (when available), add "Add to cart" quick action on `/shop`.
- **Product detail**: sticky "Add to cart" bar on mobile, clearer variant selector states, shipping/returns mini-info block under the buy box, trust row (secure checkout, ships from Madeira, 30-day returns).
- **Cart drawer**: free-shipping progress hint (e.g. "Free shipping over €X"), empty-state CTA linking to `/shop`.
- **Header**: cart count badge polish, ensure mobile menu closes on navigation.
- **Newsletter**: post-submit success state with a small incentive line ("First to know about drops").

### 2. Content + imagery
- **Home**: rewrite Hero subcopy + CTA, tighten "About" teaser, swap any placeholder imagery references for real Madeira-sourced photos (you provide or we source via Unsplash with proper credit).
- **Culture page**: add 3 short editorial blocks (Levadas, Poncha, Bordado) with images and a closing CTA into `/journal`.
- **About page**: founder/brand story rewrite in editorial tone, values strip, link to HORECA.
- **Journal seed**: create 2 starter posts as drafts in the admin so the `/journal` index isn't empty (you publish when ready).
- **SEO**: per-page titles/descriptions audit, add OG images where missing.

## Technical details
- No new tables required. Reviews, articles, leads, profiles, and roles are already in place.
- Product card hover image will use Shopify's second media when present; falls back to primary.
- Free-shipping threshold will be a constant in `src/lib/shopify.ts` (e.g. `FREE_SHIPPING_EUR = 60`) so you can tune it later.
- Sticky mobile buy bar uses a fixed bottom container that hides when the in-page Add-to-cart button is visible (IntersectionObserver).
- Journal seed posts are inserted via a migration as `published = false` so nothing goes live without your approval.
- All copy stays within brand voice rules (Fraunces display, Montserrat UI, witty product copy, editorial tone elsewhere) and respects the flat / no-shadow / no-rounded-CTA constraints.

## Out of scope (next phases)
- Payments/checkout changes (Shopify handles this).
- Multi-language (PT/EN) — flagged for a later phase.
- Analytics dashboard for admins.

## Deliverables
- Updated `Header`, `ProductCard`, `ProductDetail`, `CartDrawer`, `HomeNewsletter`, `Hero`, `AboutUs`, `Culture`, `About` components.
- 2 draft journal posts seeded in the database.
- SEO meta tightened across all top-level pages.

Approve and I'll implement.