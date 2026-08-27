// Path-based locales.
//
//   Portuguese (pt-PT) = default, lives at the root:  /shop
//   English            = /en prefix:                  /en/shop
//
// Slugs are identical in both trees — only the prefix changes.

import type { Lang } from "@/i18n";

export const DEFAULT_LANG: Lang = "pt";

/** URL prefix for each language ("" for the default locale). */
export const LOCALE_PREFIX: Record<Lang, string> = {
  pt: "",
  en: "/en",
};

/** Routes that exist only once (no locale variants). */
export const isUnlocalizedPath = (path: string) =>
  /^\/(admin|auth)(\/|$)/.test(path);

/** Read the locale from a pathname. */
export const langFromPathname = (pathname: string): Lang =>
  pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt";

/** Remove the locale prefix from a pathname, always returning a leading slash. */
export const stripLocale = (pathname: string): string => {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname || "/";
};

/** Prefix a locale-free path for the given language. */
export const localizePath = (path: string, lang: Lang): string => {
  const clean = stripLocale(path.startsWith("/") ? path : `/${path}`);
  if (isUnlocalizedPath(clean)) return clean;
  const prefix = LOCALE_PREFIX[lang] ?? "";
  if (clean === "/") return prefix || "/";
  return `${prefix}${clean}`;
};

/**
 * Locale-aware version of an href that may carry a query string / hash.
 * Non-internal hrefs (external, mailto, #anchor, relative) pass through.
 */
export const localizeHref = (href: string, lang: Lang): string => {
  if (!href.startsWith("/")) return href;
  const match = href.match(/^([^?#]*)([?#].*)?$/);
  const path = match?.[1] ?? href;
  const rest = match?.[2] ?? "";
  return `${localizePath(path, lang)}${rest}`;
};
