// Locale-aware drop-in replacements for react-router's Link / useNavigate.
//
// Every internal href written as a plain, locale-free path ("/shop") is
// automatically rewritten to the active locale tree ("/en/shop" in English).
// Admin and auth routes are never prefixed.

import { forwardRef, useCallback } from "react";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  type LinkProps,
  type NavigateOptions,
  type To,
} from "react-router-dom";
import { langFromPathname, localizeHref, stripLocale } from "@/lib/locale";
import type { Lang } from "@/i18n";

/** Active locale, derived from the URL. */
export const useLang = (): Lang => langFromPathname(useLocation().pathname);

/** Current path with the locale prefix removed (e.g. "/shop"). */
export const useLocaleFreePath = (): string => stripLocale(useLocation().pathname);

/** navigate() that prefixes internal string paths with the active locale. */
export const useLocaleNavigate = () => {
  const navigate = useNavigate();
  const lang = useLang();
  return useCallback(
    (to: To | number, options?: NavigateOptions) => {
      if (typeof to === "number") return navigate(to);
      if (typeof to === "string") return navigate(localizeHref(to, lang), options);
      return navigate(to, options);
    },
    [navigate, lang],
  );
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => {
  const lang = useLang();
  const resolved: To = typeof to === "string" ? localizeHref(to, lang) : to;
  return <RouterLink ref={ref} to={resolved} {...props} />;
});

Link.displayName = "LocaleLink";
