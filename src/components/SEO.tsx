import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE_URL, SITE_NAME, SITE_DEFAULT_DESC, ORG_JSONLD } from "@/lib/seo";
import { SUPPORTED_LANGS, HREFLANG_MAP, type Lang } from "@/i18n";
import { langFromPathname, localizePath, stripLocale } from "@/lib/locale";

interface Props {
  title: string;
  description?: string;
  /** Locale-free path, e.g. "/shop". The locale prefix is added automatically. */
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  noIndex?: boolean;
}

/** Absolute URL for a locale-free path in a given language. */
const absoluteUrl = (path: string, lang: Lang) => `${SITE_URL}${localizePath(path, lang)}`;

const SEO = ({
  title,
  description = SITE_DEFAULT_DESC,
  path = "/",
  image,
  type = "website",
  jsonLd,
  noIndex,
}: Props) => {
  const { pathname } = useLocation();
  const current = langFromPathname(pathname);
  const basePath = stripLocale(path.startsWith("/") ? path : `/${path}`);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonical = absoluteUrl(basePath, current);
  const ogLocale = current === "pt" ? "pt_PT" : "en_US";
  const ogLocaleAlternate = current === "pt" ? "en_US" : "pt_PT";
  const ldArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  const all = [ORG_JSONLD, ...ldArray];

  return (
    <Helmet>
      <html lang={HREFLANG_MAP[current] ?? "pt-PT"} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {SUPPORTED_LANGS.map((l) => (
        <link key={l} rel="alternate" hrefLang={HREFLANG_MAP[l]} href={absoluteUrl(basePath, l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={absoluteUrl(basePath, "pt")} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlternate} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <script type="application/ld+json">{JSON.stringify(all)}</script>
    </Helmet>
  );
};

export default SEO;
