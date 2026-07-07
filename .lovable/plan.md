## What this screen means

You're inside **Sales channels → Headless → Madeiraoriginals Cve6q Headless**. This channel exists and issued the Storefront token the site uses (`bbcc49de92200adcd5c43d7f6f847485` — confirmed working, just returning 0 products).

The "Manage API access" panel on this page is about the token's *scopes* (which endpoints it can call), not about which products are published to the channel. Product publishing is done from the Products list, not from here.

## Exact clicks to make products visible

1. In the left sidebar of Shopify admin, click **Products**.
2. Top-left of the products table, click the checkbox in the header row → this selects all 21 products.
3. A blue action bar appears at the top. Click **More actions**.
4. Choose **Add available channel** (some Shopify UIs label it **Manage → Publishing** or **Make products available** — same thing).
5. In the dialog, tick **Madeiraoriginals Cve6q Headless** (and **Online Store** if you also want them on any Shopify-hosted URL).
6. Click **Save** / **Done**.
7. Refresh `https://madeiraoriginals.pt/shop`. Products appear instantly — no redeploy.

## Verify from my side

Once you've done the above, tell me "done" and I'll re-run `shopify--search_products` against your live catalog. If the Storefront API still returns 0, I'll query product-by-product to find which one is still hidden (usually 1–2 have zero-stock variants with "Continue selling when out of stock" disabled).

## What NOT to touch on the screen you're on

- Don't click **Delete storefront** — that revokes the token the site depends on and would take `/shop` offline entirely until a new token is wired in.
- **Manage** next to Storefront API is only needed if we later want the site to read customer-specific data (orders, addresses). Not required for products.
