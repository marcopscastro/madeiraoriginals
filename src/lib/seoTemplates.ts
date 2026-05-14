// Central SEO template registry.
//
// Single source of truth for page <title>, meta description, H1 text, and
// eyebrow label across the marketing site. Each entry is keyed off the route
// path and built around the keyword variants validated via Semrush research:
//
//   - "Madeira t-shirts" (no "n") — primary commercial term
//   - "Madeira streetwear" / "Premium streetwear" — brand/category
//   - "Madeira souvenirs" / "Funchal souvenirs" — gifts / journal cluster
//   - "Custom apparel Madeira" / "DTF printing Madeira" — Production Studio
//
// Conventions:
//   - `title` and `h1` always include the focus keyword in natural English.
//   - We omit "| Madeira Originals" from `title` here — the <SEO> component
//     appends it automatically (see src/components/SEO.tsx).
//   - `description` aims for 140–160 chars, leads with the focus keyword,
//     and includes a place anchor (Madeira / São Vicente / Funchal) where
//     it reads naturally.
//   - `h1` mirrors the focus keyword in the title without being identical,
//     so on-page heading and SERP listing reinforce each other.

export interface PageSeoTemplate {
  /** Meta <title>. Site name is appended automatically by <SEO>. */
  title: string;
  /** Meta description, ~140–160 chars. */
  description: string;
  /** Canonical path (leading slash). */
  path: string;
  /** On-page H1 text. */
  h1: string;
  /** Optional small uppercase label rendered above the H1. */
  eyebrow?: string;
  /** Optional supporting lead paragraph beneath the H1. */
  intro?: string;
}

export type PageSeoKey =
  | "home"
  | "shop"
  | "about"
  | "contact"
  | "culture"
  | "horeca"
  | "journal"
  | "productionStudio"
  | "auth";

export const PAGE_SEO: Record<PageSeoKey, PageSeoTemplate> = {
  home: {
    title: "Madeira Streetwear & Custom Apparel",
    description:
      "Madeira Originals — premium Madeira streetwear, t-shirts and custom apparel born in São Vicente. Inspired by Madeira, designed for everywhere. 0% tourist trap.",
    path: "/",
    eyebrow: "Madeira Originals",
    h1: "Premium Madeira Streetwear",
    intro:
      "Editorial Madeira t-shirts, hoodies and accessories — designed in São Vicente, shipped worldwide.",
  },
  shop: {
    title: "Shop Madeira T-Shirts, Hoodies & Streetwear",
    description:
      "Shop premium Madeira t-shirts, hoodies, accessories and streetwear by Madeira Originals. Designed in São Vicente, Madeira. Worldwide shipping.",
    path: "/shop",
    eyebrow: "Shop",
    h1: "Madeira Streetwear & Apparel",
    intro:
      "The full Madeira Originals collection — t-shirts, hoodies, accessories and stickers, designed in São Vicente.",
  },
  about: {
    title: "About Madeira Originals — Streetwear from Madeira",
    description:
      "Madeira Originals is a premium Madeira streetwear and custom apparel brand from São Vicente — inspired by island heritage, culture and modern design.",
    path: "/about",
    eyebrow: "About",
    h1: "A Madeira Streetwear Brand from São Vicente",
    intro:
      "Born on the north coast of Madeira. Built for people who want the island done properly — not a tourist-shop version of it.",
  },
  contact: {
    title: "Contact Madeira Originals — São Vicente, Madeira",
    description:
      "Get in touch with Madeira Originals — premium Madeira streetwear and custom apparel production based in São Vicente, Madeira, Portugal.",
    path: "/contact",
    eyebrow: "Contact",
    h1: "Talk to Madeira Originals",
    intro: "São Vicente, Madeira — replies within one working day.",
  },
  culture: {
    title: "Madeira Culture — Identity, Landscape & Atlantic Heritage",
    description:
      "A guide to Madeira culture: volcanic landscapes, Atlantic identity, traditions, food, drink and the modern Madeira lifestyle that inspires our designs.",
    path: "/culture",
    eyebrow: "Culture",
    h1: "Madeira Culture, Identity & Atlantic Heritage",
    intro:
      "What Madeira actually is — beyond postcards. The land, the people, the rituals that shape every piece we make.",
  },
  horeca: {
    title: "HORECA — Custom Glassware for Madeira Bars & Restaurants",
    description:
      "Custom branded pint glasses and glassware for hotels, restaurants, cafés and bars across Madeira. Designed and produced by Madeira Originals.",
    path: "/horeca",
    eyebrow: "HORECA",
    h1: "Custom Glassware for Madeira Hospitality",
    intro:
      "Branded pint glasses and barware for Madeira hotels, restaurants, cafés and bars. Low minimums, island-made.",
  },
  journal: {
    title: "Madeira Originals Journal — Culture, Streetwear & Design",
    description:
      "Stories about Madeira culture, modern streetwear, island identity, custom apparel production and the design philosophy behind Madeira Originals.",
    path: "/journal",
    eyebrow: "Journal",
    h1: "The Madeira Originals Journal",
    intro:
      "Long-form notes on Madeira culture, streetwear and the craft behind every piece.",
  },
  productionStudio: {
    title: "Production Studio — DTF Printing & Custom Apparel Madeira",
    description:
      "Madeira Originals Production Studio: custom apparel printing, DTF gang sheets, UV DTF stickers, business merch and rally team graphics — based in Madeira.",
    path: "/production-studio",
    eyebrow: "Production Studio",
    h1: "Custom Apparel & DTF Printing in Madeira",
    intro:
      "DTF gang sheets, UV DTF stickers, branded merch and rally graphics — produced in São Vicente for brands across Madeira and beyond.",
  },
  auth: {
    title: "Sign in — Madeira Originals",
    description:
      "Sign in to your Madeira Originals account to manage orders, the journal and quote requests.",
    path: "/auth",
    eyebrow: "Account",
    h1: "Sign in to Madeira Originals",
  },
};

export type PageSeoKey = keyof typeof PAGE_SEO;

/** Get a typed SEO template by route key. */
export const pageSeo = <K extends PageSeoKey>(key: K): PageSeoTemplate => PAGE_SEO[key];
