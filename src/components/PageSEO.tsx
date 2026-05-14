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
 * Drop-in <SEO> driven by the central seoTemplates registry.
 * Usage: <PageSEO routeKey="shop" /> or <PageSEO template={dynamic} />.
 */
const PageSEO = ({ routeKey, template, path, image, type, jsonLd, noIndex }: Props) => {
  const t = template ?? (routeKey ? PAGE_SEO[routeKey] : undefined);
  if (!t) return null;
  return (
    <SEO
      title={t.title}
      description={t.description}
      path={path ?? t.path}
      image={image}
      type={type}
      jsonLd={jsonLd}
      noIndex={noIndex}
    />
  );
};

export default PageSEO;
