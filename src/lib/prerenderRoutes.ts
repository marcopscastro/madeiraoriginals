// Single source of truth for routes that should be prerendered to static HTML
// at build time (scripts/prerender.mjs). Dynamic routes (journal posts, products)
// are expanded by the prerender script via live API calls.
//
// Excluded by design: /auth, /admin/*, anything behind the wholesale passcode.

export const STATIC_PRERENDER_ROUTES: readonly string[] = [
  "/",
  "/shop",
  "/studio",
  "/wholesale", // renders the passcode gate (public)
  "/culture",
  "/about",
  "/contact",
  "/journal",
  "/madeira-t-shirts",
  "/madeira-hoodies",
  "/madeira-accessories",
  "/madeira-stickers",
  "/madeira-streetwear",
  "/madeira-gifts",
  "/portugal-streetwear",
  "/madeira-souvenirs",
  "/shipping",
  "/returns",
  "/care",
  "/size-guide",
  "/custom",
];
