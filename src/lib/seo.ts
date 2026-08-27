export const SITE_URL = "https://madeiraoriginals.pt";
export const SITE_NAME = "Madeira Originals";
export const SITE_DEFAULT_DESC =
  "Creative and print studio in São Vicente, Madeira. Graphic design, custom apparel printing, signage and our own Madeira-inspired collection.";

export const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    "Creative and print studio in São Vicente, Madeira — graphic design, custom apparel printing, DTF and UV DTF production, signage, and a Madeira-inspired apparel collection.",
  brand: { "@type": "Brand", name: SITE_NAME },
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Vicente",
    addressRegion: "Madeira",
    addressCountry: "PT",
  },
  areaServed: ["PT", "EU", "Worldwide"],
  keywords: [
    "creative print studio Madeira",
    "Madeira clothing",
    "Madeira apparel",
    "Madeira t-shirts",
    "Madeira gifts",
    "Madeira lifestyle brand",
    "custom apparel Madeira",
    "DTF printing Madeira",
    "UV DTF Madeira",
    "DTF gang sheets Madeira",
    "business merchandise Madeira",
  ],
};

export const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Custom apparel printing, DTF gang sheets, UV DTF stickers, and business merchandise studio in São Vicente, Madeira.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Vicente",
    addressRegion: "Madeira",
    addressCountry: "PT",
  },
  areaServed: "Madeira, Portugal",
};
