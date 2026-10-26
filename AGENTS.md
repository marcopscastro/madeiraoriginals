# Project rules
- Keep this project apparel-only: shop, own-collection wholesale and customer support; studio services are external redirects to Madeira Studio, not rendered service pages.
- Import the apparel logo SVG directly from assets, because the local preview does not support asset-serving pointers for that logo.
- Apply shared storefront eligibility to catalogue lists, product reads, sitemap and prerender discovery so posters and Printify products stay hidden without modifying Shopify data.
- Legal route helpers map /privacidade to /en/privacy and /termos to /en/terms; all other localized slugs remain identical.
- Keep wholesale pricing and passcode validation on the server; public pages must never contain private tier values.
- Use the shared formatPrice helper for displayed currency amounts so Intl.NumberFormat follows the active storefront language everywhere.
- Classic hosting cannot emit external HTTP 301s or route-specific HTTP 404s; use replacement navigation for moved routes and noindex for unknown routes, without pretending these are server responses.

- All Storefront operations include language context and Portugal country context; React Query keys include language and cart sync recreates checkout on locale changes while preserving variant IDs and quantities, because Shopify checkout language is set at cart creation.
