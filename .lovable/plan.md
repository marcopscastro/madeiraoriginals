# Replace tee artwork with shirt mockups

Right now the three tee products use flat design artwork as their main image. I'll swap them for proper on-shirt mockups (the design printed on an actual tee, front view, clean studio background) so the storefront shows what customers actually receive.

## Affected products
1. Mercado dos Lavradores Tee
2. The Original Madeira Uber Tee
3. Liquid Software Tee

## Steps
1. Generate three new mockup images — design centered on a flat-laid / ghost-mannequin tee, neutral background, matching each tee's primary color (Sand for Mercado & Uber, White for Liquid). Save to `src/assets/`:
   - `mockup-tee-mercado.png`
   - `mockup-tee-uber.png`
   - `mockup-tee-liquid.png`
2. For each Shopify product, call `shopify--update_product` with the new image. Note: per the tool spec, providing `images` replaces all existing images, so the flat artwork will be removed and replaced by the mockup.
3. No code changes — `Bestsellers` and `ProductCard` already pull images from the Storefront API, so the new mockups appear automatically on reload.

## Out of scope
- Pint glass products (keep current images).
- No variant, price, or copy changes.
- Not adding multiple angles yet — single front mockup per product. We can add back/detail shots later if you want.
