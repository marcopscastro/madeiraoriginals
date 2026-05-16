/**
 * Keyword-relevant alt text for product imagery.
 *
 * Goals:
 *  - Always include the product title (the page's primary keyword phrase).
 *  - Include brand + category keywords ("Madeira Originals", "Madeira streetwear")
 *    on the primary image so it carries real SEO weight.
 *  - For secondary images (thumbnails, hover, lightbox views), disambiguate
 *    with "alternate view N" so each <img> has unique, useful alt text rather
 *    than empty alt or duplicated copy (which hurts accessibility + SEO).
 *  - Respect merchant-authored Shopify altText when present.
 */

const BRAND_TAIL = "Madeira Originals premium streetwear";

export function productAlt(opts: {
  title: string;
  shopifyAlt?: string | null;
  index?: number; // 0 = primary/hero image
  total?: number;
}): string {
  const { title, shopifyAlt, index = 0, total = 1 } = opts;

  // Merchant override always wins — they may have crafted SEO copy in Shopify.
  if (shopifyAlt && shopifyAlt.trim().length > 0) return shopifyAlt.trim();

  if (index === 0) {
    return `${title} — ${BRAND_TAIL}`;
  }
  if (total > 1) {
    return `${title} — alternate view ${index + 1} of ${total}`;
  }
  return `${title} — ${BRAND_TAIL}`;
}
