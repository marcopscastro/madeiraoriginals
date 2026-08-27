import type { CollectionConfig } from "@/pages/Collection";
import { SECTION_IMAGES } from "@/lib/sectionImages";

/**
 * Structural collection config only.
 * All user-facing copy (eyebrow, title, intro, metaTitle, metaDescription, faqs)
 * lives in src/i18n/locales/{en,pt}.json under `collections.<slug>.*`.
 */
export const COLLECTIONS: Record<string, CollectionConfig> = {
  "madeira-t-shirts": {
    slug: "madeira-t-shirts",
    shopifyQuery: "tag:streetwear AND (product_type:T-Shirt OR title:t-shirt OR title:tee)",
    hasFaqs: true,
  },
  "madeira-hoodies": {
    slug: "madeira-hoodies",
    shopifyQuery: "tag:streetwear AND (product_type:Hoodie OR title:hoodie OR title:sweatshirt)",
  },
  "madeira-accessories": {
    slug: "madeira-accessories",
    shopifyQuery:
      "tag:streetwear AND (product_type:Accessory OR title:cap OR title:tote OR title:beanie OR title:hat)",
  },
  "madeira-stickers": {
    slug: "madeira-stickers",
    shopifyQuery: "title:sticker OR product_type:Sticker OR tag:stickers",
  },
  "madeira-streetwear": {
    slug: "madeira-streetwear",
    shopifyQuery: "tag:streetwear",
  },
  "madeira-gifts": {
    slug: "madeira-gifts",
    shopifyQuery: "tag:streetwear",
  },

  /* ─────────── Themed editorial collections ─────────── */

  "atlantic-utility": {
    slug: "atlantic-utility",
    shopifyQuery: "tag:atlantic-utility OR tag:utility",
    image: SECTION_IMAGES["atlantic-utility"],
  },
  "neblina": {
    slug: "neblina",
    shopifyQuery: "tag:norte OR tag:sao-vicente",
    image: SECTION_IMAGES.norte,
  },
  "contemporary-heritage": {
    slug: "contemporary-heritage",
    shopifyQuery: "tag:heritage OR tag:contemporary-heritage",
    image: SECTION_IMAGES["contemporary-heritage"],
  },
  "island-humour": {
    slug: "island-humour",
    shopifyQuery: "tag:icons OR tag:island-icons OR tag:humour OR tag:island-humour",
    image: SECTION_IMAGES["island-humour"],
  },
};
