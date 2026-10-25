// Shared storefront eligibility; Shopify remains the source of titles and prices.
export const SAO_VICENTE_DESIGNS = [
  "levada-walks", "vale-de-sao-vicente", "estrada-do-norte", "vale-imperioso",
  "capelinha-do-calhau", "capelinha-de-fatima", "miradouro-de-sao-cristovao",
  "faja-da-areia", "vila-de-sao-vicente",
] as const;

type CatalogIdentity = { handle: string; title?: string; productType?: string; vendor?: string; tags?: string[] };

export function isStorefrontProduct(product: CatalogIdentity): boolean {
  const identity = [product.handle, product.title, product.productType, product.vendor, ...(product.tags ?? [])].join(" ");
  return !/printify|poster|art[ -]?print|wall[ -]?art|p[oó]ster|quadro/i.test(identity);
}

export function isSaoVicenteTee(product: CatalogIdentity): boolean {
  return isStorefrontProduct(product) && SAO_VICENTE_DESIGNS.some((design) => product.handle.startsWith(`${design}-`) || product.handle === design);
}