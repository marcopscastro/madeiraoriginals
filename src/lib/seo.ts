export const SITE_URL = "https://madeiraoriginals.pt";
export const SITE_NAME = "Madeira Originals";
export const SITE_DEFAULT_DESC =
  "Madeira Originals t-shirts, hoodies and accessories, designed in São Vicente and inspired by Madeira's culture.";

export const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/madeira-originals-logo.svg`,
  description:
    "Madeira Originals t-shirts, hoodies and accessories, designed in São Vicente and inspired by Madeira's culture.",
  brand: { "@type": "Brand", name: SITE_NAME },
  telephone: "+351 962 220 769",
  email: "geral@madeiraoriginals.pt",
  vatID: "PT202158969",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Entrada do Cascalho 3",
    postalCode: "9240-203",
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
    streetAddress: "Caminho da Furna 7",
    postalCode: "9240-206",
    addressLocality: "São Vicente",
    addressRegion: "Madeira",
    addressCountry: "PT",
  },
  areaServed: "Madeira, Portugal",
};
