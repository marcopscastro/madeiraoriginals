## Goal
Create a single test product in Shopify so it appears live in your existing `Shop` page grid and homepage `Bestsellers` section — no design changes.

## What I'll create

**Product:** "The Poncha Made Me Do It Tee" (test product, easy to delete later)

- **Vendor:** Madeira Originals
- **Type:** T-Shirt
- **Tags:** test, tee
- **Description:** Short witty placeholder copy ("A test tee to make sure everything looks sharp. Delete me when the real drops land.")
- **Price:** €29.00
- **Sizes (option):** S, M, L, XL (4 variants, all €29.00, inventory tracked)
- **Image:** Shopify-hosted placeholder (so the card image slot renders properly)

## Steps
1. Call `shopify--create_product` with the spec above.
2. Confirm it appears on `/shop` and in Bestsellers (React Query will fetch it on next load — may need a refresh).
3. Tell you the product handle and admin link so you can delete or edit it once Printify products start syncing.

## Notes
- No code changes — this is purely a data action against your live store.
- Once Printify pushes real products, you can remove this test from the Shopify admin in two clicks.
- If Shopify returns a payment-required error, I'll surface it and we'll pause until the store is claimed.