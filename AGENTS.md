# Project rules
- Keep shared identity and metadata scoped to the apparel site; studio services belong to a separate site, so retained legacy service content must not redefine the global brand.
- Import the apparel logo SVG directly from assets using the existing logo convention, because asset-serving paths are unavailable in the local Vite preview.
- Use one translated StudioMovedNotice on each retained studio/contact page and exclude those routes from sitemap generation, so both locale trees communicate the move consistently without deleting pages.