import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

const Journal = () => {
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles-list"],
    queryFn: async () => {
      const { data } = await supabase
        .from("articles")
        .select("slug,title,excerpt,published_at,cover_url,tags")
        .eq("published", true)
        .order("published_at", { ascending: false });
      return data ?? [];
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Madeira Originals Journal — Madeira Culture, Travel & Style"
        description="Stories about Madeira culture, modern Madeira streetwear, island travel, gifts and the lifestyle behind Madeira Originals."
        path="/journal"
      />
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
            Journal
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            Stories from Madeira.
          </h1>
        </div>

        {isLoading ? (
          <p className="text-center font-body text-muted-foreground py-16">Loading…</p>
        ) : articles.length === 0 ? (
          <p className="text-center font-body text-muted-foreground py-16">
            No articles yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {articles.map((a) => (
              <Link
                key={a.slug}
                to={`/journal/${a.slug}`}
                className="group block border border-foreground/10 hover:border-foreground transition-colors p-6 md:p-8"
              >
                <div className="aspect-[16/10] bg-muted mb-5" />
                {a.tags?.[0] && (
                  <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                    {a.tags[0]}
                  </p>
                )}
                <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {a.title}
                </h2>
                {a.excerpt && (
                  <p className="mt-3 font-body text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
                    {a.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Journal;
