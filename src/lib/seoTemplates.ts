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
  | "portugalStreetwear"
  | "madeiraSouvenirs"
  | "auth";

export const PAGE_SEO: Record<PageSeoKey, PageSeoTemplate> = {
  home: {
    title: "Madeira Originals — T-shirts of places in Madeira",
    description:
      "T-shirts with designs of places in Madeira you won't find anywhere else. The first collection is São Vicente, on the north coast. Printed to order in our studio.",
    path: "/",
    eyebrow: "Madeira Originals",
    h1: "The Madeira that isn't on the postcard.",
    intro:
      "Designs of places across the island — first collection: São Vicente. Printed to order in our studio.",
  },
  shop: {
    title: "Shop Madeira T-Shirts, Hoodies & Apparel",
    description:
      "Shop premium Madeira t-shirts, hoodies and accessories by Madeira Originals. Designed in São Vicente, Madeira. Worldwide shipping.",
    path: "/shop",
    eyebrow: "Shop",
    h1: "Madeira Streetwear & Apparel",
    intro:
      "The full Madeira Originals collection — t-shirts, hoodies, accessories and stickers, designed in São Vicente.",
  },
  about: {
    title: "About Madeira Originals — Madeira Apparel",
    description:
      "Madeira Originals is an apparel brand from São Vicente, Madeira, inspired by island heritage, culture and modern design.",
    path: "/about",
    eyebrow: "About",
    h1: "A Madeira Streetwear Brand from São Vicente",
    intro:
      "Born on the north coast of Madeira. Built for people who want the island done properly — not a tourist-shop version of it.",
  },
  contact: {
    title: "Contact Madeira Originals — Orders & Returns",
    description:
      "Contact Madeira Originals about orders, sizes, returns and wholesale.",
    path: "/contact",
    eyebrow: "Contact",
    h1: "Contact Madeira Originals",
    intro: "Orders, sizes, returns and wholesale.",
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
      "Custom branded pint glasses and glassware for hotels, restaurants, cafés and bars across Madeira. Designed and produced by Madeira Studio.",
    path: "/horeca",
    eyebrow: "HORECA",
    h1: "Custom Glassware for Madeira Hospitality",
    intro:
      "Branded pint glasses and barware for Madeira hotels, restaurants, cafés and bars. Low minimums, island-made.",
  },
  journal: {
    title: "Madeira Originals Journal — Culture, Design & Apparel",
    description:
      "Stories about Madeira culture, island identity, design, custom apparel production and the philosophy behind Madeira Originals.",
    path: "/journal",
    eyebrow: "Journal",
    h1: "The Madeira Originals Journal",
    intro:
      "Long-form notes on Madeira culture, streetwear and the craft behind every piece.",
  },
  productionStudio: {
    title: "Services — Design, Apparel Printing & Signage in Madeira",
    description:
      "Design, apparel printing, vinyl and signage, and wholesale for businesses in Madeira. Everything your brand shows a customer, made in São Vicente.",
    path: "/studio",
    eyebrow: "Services",
    h1: "Your brand, on every surface",
    intro:
      "We design, print and produce everything your business shows a customer — from São Vicente, Madeira.",
  },
  portugalStreetwear: {
    title: "Portugal Streetwear — Madeira Originals",
    description:
      "Premium tees, bags and headwear designed in São Vicente, Madeira — Portuguese design made on the island, shipped worldwide.",
    path: "/portugal-streetwear",
    eyebrow: "Portugal Streetwear",
    h1: "Portuguese Streetwear from Madeira",
    intro:
      "Madeira Originals — a premium Portugal streetwear brand born in São Vicente. Designed in PT, made for everywhere.",
  },
  auth: {
    title: "Sign in — Madeira Originals",
    description:
      "Sign in to your Madeira Originals account to manage orders, the journal and quote requests.",
    path: "/auth",
    eyebrow: "Account",
    h1: "Sign in to Madeira Originals",
  },
  madeiraSouvenirs: {
    title: "Madeira Souvenirs Guide — Real Gifts From Madeira",
    description:
      "Curated guide to the best Madeira souvenirs and Funchal gifts — premium, gift-ready picks from a São Vicente creative studio.",
    path: "/madeira-souvenirs",
    eyebrow: "Madeira Souvenirs Guide",
    h1: "The Madeira Souvenirs Guide",
    intro:
      "What to buy in Madeira (and what to skip) — curated, gift-ready Madeira souvenirs from São Vicente. 0% tourist trap.",
  },
};



/** Get a typed SEO template by route key. */
export const pageSeo = <K extends PageSeoKey>(key: K): PageSeoTemplate => PAGE_SEO[key];
