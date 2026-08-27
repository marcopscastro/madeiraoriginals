import heroDesktop from "@/assets/real-sao-vicente/hero-desktop.webp";
import heroMobile from "@/assets/real-sao-vicente/hero-mobile.webp";
import atlanticUtilityDesktop from "@/assets/real-sao-vicente/atlantic-utility-desktop.webp";
import atlanticUtilityMobile from "@/assets/real-sao-vicente/atlantic-utility-mobile.webp";
import norteDesktop from "@/assets/real-sao-vicente/norte-desktop.webp";
import norteMobile from "@/assets/real-sao-vicente/norte-mobile.webp";
import contemporaryHeritageDesktop from "@/assets/real-sao-vicente/contemporary-heritage-desktop.webp";
import contemporaryHeritageMobile from "@/assets/real-sao-vicente/contemporary-heritage-mobile.webp";
import aboutDesktop from "@/assets/real-sao-vicente/about-desktop.webp";
import aboutMobile from "@/assets/real-sao-vicente/about-mobile.webp";
import islandHumourDesktop from "@/assets/real-sao-vicente/island-humour-desktop.webp";
import islandHumourMobile from "@/assets/real-sao-vicente/island-humour-mobile.webp";
import serviceDesign from "@/assets/hero-shirt-printed.jpg";
import serviceApparel from "@/assets/production-studio.jpg";
import serviceVinyl from "@/assets/horeca-hero.jpg";
import serviceWholesale from "@/assets/manifesto-uber-teen.jpg";

export type ResponsiveImageSet = {
  desktop: string;
  mobile: string;
};

export const SECTION_IMAGES: Record<
  "hero" | "about" | "atlantic-utility" | "norte" | "contemporary-heritage" | "island-humour",
  ResponsiveImageSet
> = {
  hero: {
    desktop: heroDesktop,
    mobile: heroMobile,
  },
  about: {
    desktop: aboutDesktop,
    mobile: aboutMobile,
  },
  "atlantic-utility": {
    desktop: atlanticUtilityDesktop,
    mobile: atlanticUtilityMobile,
  },
  norte: {
    desktop: norteDesktop,
    mobile: norteMobile,
  },
  "contemporary-heritage": {
    desktop: contemporaryHeritageDesktop,
    mobile: contemporaryHeritageMobile,
  },
  "island-humour": {
    desktop: islandHumourDesktop,
    mobile: islandHumourMobile,
  },
};

export const FEATURED_COLLECTION_IMAGES = [
  SECTION_IMAGES["atlantic-utility"],
  SECTION_IMAGES.norte,
  SECTION_IMAGES["contemporary-heritage"],
  SECTION_IMAGES["island-humour"],
] as const;

/**
 * Card imagery for the services grid, keyed by the service route.
 * NOTE: only assets that already exist in the repo are used here.
 */
export const SERVICE_CARD_IMAGES: Record<string, string> = {
  "/design": serviceDesign,
  "/apparel-printing": serviceApparel,
  "/vinyl-signage": serviceVinyl,
  "/contact": serviceWholesale,
};
