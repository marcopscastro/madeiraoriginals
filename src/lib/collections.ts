import type { CollectionConfig } from "@/pages/Collection";
import { SECTION_IMAGES } from "@/lib/sectionImages";

export const COLLECTIONS: Record<string, CollectionConfig> = {
  "madeira-t-shirts": {
    slug: "madeira-t-shirts",
    eyebrow: "T-Shirts",
    title: "Madeira T-Shirts",
    intro:
      "Heavyweight cotton tees with island-rooted graphics — coordinates, levadas, laurissilva, and 100% Madeira humour. Designed in São Vicente, worn everywhere.",
    metaTitle: "Madeira T-Shirts | Premium Streetwear Tees | Madeira Originals",
    metaDescription:
      "Premium Madeira-inspired t-shirts in heavyweight cotton. Island graphics, coordinates and modern streetwear cuts. Designed in São Vicente, Madeira.",
    shopifyQuery: "tag:streetwear AND (product_type:T-Shirt OR title:t-shirt OR title:tee)",
    faqs: [
      {
        question: "Where are your Madeira t-shirts designed?",
        answer:
          "Every Madeira t-shirt is designed in São Vicente, on the north coast of Madeira. Graphics draw on island coordinates, levadas, laurissilva forest, and Madeiran humour — never generic souvenir-shop clichés.",
      },
      {
        question: "What size are your Madeira t-shirts?",
        answer:
          "Our Madeira t-shirts run true to a modern streetwear fit — slightly boxy, dropped shoulder, with room to layer. Each product page lists exact chest and length measurements so you can pick the right size.",
      },
      {
        question: "What fabric are the Madeira t-shirts made from?",
        answer:
          "Heavyweight 100% combed cotton (220–240 gsm depending on the drop). Built to hold its shape after wash and feel substantial — the opposite of thin tourist tees.",
      },
      {
        question: "Do you ship Madeira t-shirts worldwide?",
        answer:
          "Yes. We ship Madeira t-shirts worldwide from our fulfilment partners in the EU, UK and US. Madeira and mainland Portugal orders typically arrive in 3–6 working days; international in 5–10.",
      },
      {
        question: "Are these real Madeira t-shirts or just Portugal-themed?",
        answer:
          "Real. Madeira Originals is a Madeiran brand born in São Vicente. The graphics, language and references come from the island itself — not generic 'Portugal' iconography.",
      },
      {
        question: "Can I return a Madeira t-shirt if it doesn't fit?",
        answer:
          "Yes. Unworn, unwashed Madeira t-shirts can be returned within 14 days of delivery. Email us and we'll send return instructions.",
      },
    ],
  },
  "madeira-hoodies": {
    slug: "madeira-hoodies",
    eyebrow: "Hoodies",
    title: "Madeira Hoodies",
    intro:
      "Atlantic-weight hoodies built for Madeira's microclimates — and for every diaspora winter. Premium fleece, modern oversized cuts, island detailing.",
    metaTitle: "Madeira Hoodies | Heavyweight Streetwear Hoodies | Madeira Originals",
    metaDescription:
      "Premium Madeira hoodies in Atlantic-weight fleece. Modern cuts inspired by Madeira's landscapes and culture. Designed in São Vicente.",
    shopifyQuery: "tag:streetwear AND (product_type:Hoodie OR title:hoodie OR title:sweatshirt)",
  },
  "madeira-accessories": {
    slug: "madeira-accessories",
    eyebrow: "Accessories",
    title: "Madeira Accessories",
    intro:
      "Caps, totes, beanies, and small island essentials. Quiet branding, built to wear in.",
    metaTitle: "Madeira Accessories | Caps, Totes & Essentials | Madeira Originals",
    metaDescription:
      "Madeira-inspired caps, totes, beanies and accessories. Premium materials, editorial branding, designed in São Vicente, Madeira.",
    shopifyQuery: "tag:streetwear AND (product_type:Accessory OR title:cap OR title:tote OR title:beanie OR title:hat)",
  },
  "madeira-stickers": {
    slug: "madeira-stickers",
    eyebrow: "Stickers",
    title: "Madeira Stickers",
    intro:
      "Durable die-cut stickers — coordinates, micro-icons, and quiet Madeira culture. Made with the same UV DTF process we run for brands.",
    metaTitle: "Madeira Stickers | Die-Cut UV Stickers | Madeira Originals",
    metaDescription:
      "Premium Madeira stickers — die-cut, UV DTF, weatherproof. Coordinates, icons, and culture from São Vicente, Madeira.",
    shopifyQuery: "title:sticker OR product_type:Sticker OR tag:stickers",
  },
  "madeira-streetwear": {
    slug: "madeira-streetwear",
    eyebrow: "Streetwear",
    title: "Madeira Streetwear",
    intro:
      "The full Madeira Originals streetwear line — tees, hoodies, accessories. Inspired by Madeira. Designed for everywhere.",
    metaTitle: "Madeira Streetwear | Premium Apparel by Madeira Originals",
    metaDescription:
      "The full premium streetwear line by Madeira Originals. Heavyweight tees, Atlantic-weight hoodies, and island-rooted accessories from São Vicente, Madeira.",
    shopifyQuery: "tag:streetwear",
  },
  "madeira-gifts": {
    slug: "madeira-gifts",
    eyebrow: "Gifts",
    title: "Gifts From Madeira",
    intro:
      "Real Madeira gifts for people who hate tourist-shop merch. Premium pieces, editorial design, the opposite of magnets and keychains.",
    metaTitle: "Madeira Gifts | Premium Gifts from Madeira | Madeira Originals",
    metaDescription:
      "Premium gifts from Madeira — streetwear, accessories, stickers. Editorial, modern, 0% tourist trap. Designed in São Vicente, Madeira.",
    shopifyQuery: "tag:streetwear",
  },

  /* ─────────── Launch collection ─────────── */

  "first-drop": {
    slug: "first-drop",
    eyebrow: "First Drop · São Vicente Collection",
    title: "First Drop",
    intro:
      "The opening chapter. A small, curated set of premium pieces — heavyweight tees, a hoodie, a cap, a tote, and one limited São Vicente-inspired design. Designed in São Vicente, Madeira. Made to last well past the launch.",
    metaTitle: "First Drop — São Vicente Collection | Madeira Originals",
    metaDescription:
      "The Madeira Originals First Drop — a curated launch collection of premium streetwear designed in São Vicente, Madeira. Limited pieces. Built for long-term wear.",
    shopifyQuery: "tag:first-drop",
    image: SECTION_IMAGES.hero,
  },

  /* ─────────── Themed editorial collections ─────────── */

  "atlantic-utility": {
    slug: "atlantic-utility",
    eyebrow: "Collection 01 · Atlantic Utility",
    title: "Atlantic Utility",
    intro:
      "Minimal rugged essentials inspired by volcanic island life. Heavyweight cotton, technical detailing, built for fog, wind and salt — the quiet uniform of the north coast.",
    metaTitle: "Atlantic Utility | Madeira Originals",
    metaDescription:
      "Atlantic Utility — minimal rugged apparel essentials for volcanic island life. Heavyweight cotton, technical detailing. Designed in São Vicente, Madeira.",
    shopifyQuery: "tag:atlantic-utility OR tag:utility",
    image: SECTION_IMAGES["atlantic-utility"],
  },
  "norte": {
    slug: "norte",
    eyebrow: "Collection 02 · Norte",
    title: "Norte",
    intro:
      "São Vicente in fabric form — foggy peaks, basalt textures and the quiet weather of the north coast. A study of Madeira's wildest face.",
    metaTitle: "Norte | Madeira Originals",
    metaDescription:
      "Norte — apparel inspired by São Vicente fog, basalt cliffs and the Atlantic weather of Madeira's north coast. Designed in São Vicente.",
    shopifyQuery: "tag:norte OR tag:sao-vicente",
    image: SECTION_IMAGES.norte,
  },
  "contemporary-heritage": {
    slug: "contemporary-heritage",
    eyebrow: "Collection 03 · Contemporary Heritage",
    title: "Contemporary Heritage",
    intro:
      "Tradition, properly translated. Madeiran symbols, azulejo geometry and island coordinates redrawn with the restraint of a modern label.",
    metaTitle: "Contemporary Heritage | Madeira Originals",
    metaDescription:
      "Contemporary Heritage — traditional Madeira references reinterpreted in modern apparel design. Designed in São Vicente, Madeira.",
    shopifyQuery: "tag:heritage OR tag:contemporary-heritage",
    image: SECTION_IMAGES["contemporary-heritage"],
  },
  "island-humour": {
    slug: "island-humour",
    eyebrow: "Collection 04 · Island Icons",
    title: "Island Icons",
    intro:
      "Recognisable Madeira details, local symbols and small moments from island life — redrawn for now. Treated with the seriousness of a premium label.",
    metaTitle: "Island Icons | Madeira Originals",
    metaDescription:
      "Island Icons — recognisable Madeira details and local symbols on premium apparel. Designed in São Vicente, Madeira.",
    shopifyQuery: "tag:icons OR tag:island-icons OR tag:humour OR tag:island-humour",
    image: SECTION_IMAGES["island-humour"],
  },
};
