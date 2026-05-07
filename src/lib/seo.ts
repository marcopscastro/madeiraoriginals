export const SITE_URL = "https://www.madeiraoriginals.pt";
export const SITE_NAME = "Madeira Originals";
export const SITE_DEFAULT_DESC =
  "Premium clothing and lifestyle products inspired by the landscapes, culture and identity of Madeira Island.";

export const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Brand",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Premium Madeira inspired apparel and lifestyle brand combining island culture with modern design.",
  brand: { "@type": "Brand", name: SITE_NAME },
  keywords: [
    "Madeira clothing",
    "Madeira apparel",
    "Madeira souvenirs",
    "Madeira lifestyle",
    "Madeira streetwear",
    "Madeira gifts",
  ],
};
