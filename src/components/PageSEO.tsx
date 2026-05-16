import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import { PAGE_SEO, type PageSeoKey, type PageSeoTemplate } from "@/lib/seoTemplates";

interface Props {
  /** Route key in PAGE_SEO. Use this for built-in pages. */
  routeKey?: PageSeoKey;
  /** Override the template (useful for dynamic routes like /journal/:slug). */
  template?: PageSeoTemplate;
  /** Optional override for canonical path (defaults to template.path). */
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  noIndex?: boolean;
}

/**
 * SEO driven by central template registry + i18n overrides.
 * Per-route title/description are pulled from translations at
 * `pageSeo.<routeKey>` so meta updates with the active language.
 */
const PageSEO = ({ routeKey, template, path, image, type, jsonLd, noIndex }: Props) => {
  const { t, i18n } = useTranslation();
  const base = template ?? (routeKey ? PAGE_SEO[routeKey] : undefined);
  if (!base) return null;

  // Translation lookup is opt-in via routeKey; dynamic templates use their own values.
  const translatedTitle = routeKey
    ? t(`pageSeo.${routeKey}.title`, { defaultValue: base.title, lng: i18n.language })
    : base.title;
  const translatedDesc = routeKey
    ? t(`pageSeo.${routeKey}.description`, { defaultValue: base.description, lng: i18n.language })
    : base.description;

  return (
    <SEO
      title={translatedTitle}
      description={translatedDesc}
      path={path ?? base.path}
      image={image}
      type={type}
      jsonLd={jsonLd}
      noIndex={noIndex}
    />
  );
};

export default PageSEO;
