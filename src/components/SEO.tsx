import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { SITE_URL, SITE_NAME, SITE_DEFAULT_DESC, ORG_JSONLD } from "@/lib/seo";
import { SUPPORTED_LANGS, HREFLANG_MAP, type Lang } from "@/i18n";

interface Props {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  noIndex?: boolean;
}

const buildAlternateUrl = (path: string, lang: Lang) => {
  // Canonical PT (default) has no ?lang param; EN gets ?lang=en.
  if (lang === "pt") return `${SITE_URL}${path}`;
  const sep = path.includes("?") ? "&" : "?";
  return `${SITE_URL}${path}${sep}lang=${lang}`;
};

const SEO = ({
  title,
  description = SITE_DEFAULT_DESC,
  path = "/",
  image,
  type = "website",
  jsonLd,
  noIndex,
}: Props) => {
  const { i18n } = useTranslation();
  const current = ((i18n.language?.slice(0, 2) as Lang) ?? "pt");
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonical = buildAlternateUrl(path, current);
  const ogLocale = current === "pt" ? "pt_PT" : "en_US";
  const ogLocaleAlternate = current === "pt" ? "en_US" : "pt_PT";
  const ldArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  const all = [ORG_JSONLD, ...ldArray];

  return (
    <Helmet>
      <html lang={HREFLANG_MAP[current] ?? "en"} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {SUPPORTED_LANGS.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={HREFLANG_MAP[l]}
          href={buildAlternateUrl(path, l)}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />
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
