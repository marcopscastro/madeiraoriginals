import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const JournalPost = () => {
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
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center font-body text-muted-foreground">
          Loading…
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <SEO title="Article not found" path={`/journal/${slug}`} noIndex />
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-semibold mb-4">Article not found</h1>
          <Link to="/journal" className="text-primary underline underline-offset-4">
            ← Back to Journal
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt ?? undefined,
    datePublished: article.published_at ?? article.created_at,
    dateModified: article.updated_at,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/journal/${article.slug}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={article.seo_title ?? article.title}
        description={article.seo_description ?? article.excerpt ?? undefined}
        path={`/journal/${article.slug}`}
        type="article"
        jsonLd={articleLd}
      />
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <nav className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-6">
          <Link to="/journal" className="hover:text-foreground">Journal</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{article.title}</span>
        </nav>

        <header className="mb-10">
          {article.tags?.[0] && (
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              {article.tags[0]}
            </p>
          )}
          <h1 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.1]">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-5 font-body text-lg text-muted-foreground leading-relaxed">
              {article.excerpt}
            </p>
          )}
        </header>

        {article.cover_url && (
          <img
            src={article.cover_url}
            alt={article.title}
            className="w-full aspect-[16/9] object-cover mb-10"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        )}

        <div className="prose-editorial">
          <ReactMarkdown>{article.body_md}</ReactMarkdown>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/10 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Shop the Collection
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JournalPost;
