import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { journalCoverProps } from "@/lib/journalImages";

const JournalPost = () => {
  const { t, i18n } = useTranslation();
  const isPt = i18n.language.startsWith("pt");
  const { slug } = useParams<{ slug: string }>();

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug!)
        .eq("published", true)
        .maybeSingle();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <SEO title={t("journal.loading")} path={`/journal/${slug}`} type="article" noIndex />
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center font-body text-muted-foreground">
          {t("journal.loading")}
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <SEO title={t("journal.notFoundTitle")} path={`/journal/${slug}`} noIndex />
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-semibold mb-4">{t("journal.notFoundTitle")}</h1>
          <Link to="/journal" className="text-primary underline underline-offset-4">
            {t("journal.backToJournal")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const title = (isPt && article.title_pt) || article.title;
  const excerpt = (isPt && article.excerpt_pt) || article.excerpt;
  const bodyMd = (isPt && article.body_md_pt) || article.body_md;
  const seoTitle = (isPt && article.seo_title_pt) || article.seo_title;
  const seoDescription = (isPt && article.seo_description_pt) || article.seo_description;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt ?? undefined,
    image: article.cover_url ?? undefined,
    datePublished: article.published_at ?? article.created_at,
    dateModified: article.updated_at,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/journal/${article.slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/journal` },
      { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}/journal/${article.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background grain-fixed">
      <SEO
        title={seoTitle ?? title}
        description={seoDescription ?? excerpt ?? undefined}
        path={`/journal/${article.slug}`}
        type="article"
        jsonLd={[articleLd, breadcrumbLd]}
      />
      <Header />
      <main>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-40">
          <nav className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-10">
            <Link to="/journal" className="hover:text-foreground transition-colors">{t("journal.breadcrumb")}</Link>
            <span className="mx-3 text-foreground/30">/</span>
            <span className="text-foreground/60">{title}</span>
          </nav>

          <header className="mb-14">
            {article.tags?.[0] && (
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-6">
                {article.tags[0]}
              </p>
            )}
            <h1 className="font-display font-medium tracking-tight text-foreground leading-[1.02] text-4xl md:text-6xl lg:text-7xl">
              {title}
            </h1>
            {excerpt && (
              <p className="mt-8 font-body text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl">
                {excerpt}
              </p>
            )}
          </header>
        </div>

        {(() => {
          const cover = journalCoverProps(article.cover_url);
          return cover ? (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
              <img
                src={cover.src}
                srcSet={cover.srcSet}
                sizes="(min-width: 1024px) 1100px, 100vw"
                alt={title}
                className="w-full aspect-[16/9] object-cover img-cinematic"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          ) : null;
        })()}

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
          <div className="prose-editorial">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{bodyMd}</ReactMarkdown>
          </div>

          <div className="mt-20 pt-10 border-t border-foreground/15 flex flex-wrap items-center justify-between gap-6">
            <Link
              to="/journal"
              className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/60 hover:text-foreground transition-colors"
            >
              ← {t("journal.breadcrumb")}
            </Link>
            <Link
              to="/shop"
              className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
            >
              {t("journal.ctaShop")} →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default JournalPost;
