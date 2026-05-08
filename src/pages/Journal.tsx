import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

const Journal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "all";

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

  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.tags?.forEach((t: string) => set.add(t)));
    return ["all", ...Array.from(set).sort()];
  }, [articles]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return articles;
    return articles.filter((a) => a.tags?.includes(activeCategory));
  }, [articles, activeCategory]);

  const setCategory = (c: string) => {
    if (c === "all") setSearchParams({});
    else setSearchParams({ category: c });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Madeira Originals Journal | Culture, Streetwear & Design"
        description="Read stories about Madeira culture, modern streetwear, island identity, custom apparel production, and the design philosophy behind Madeira Originals."
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

        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`font-heading text-[11px] font-semibold uppercase tracking-widest px-3 py-2 border transition-colors ${
                  activeCategory === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/20 text-foreground hover:border-foreground"
                }`}
              >
                {c === "all" ? "All" : c}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <p className="text-center font-body text-muted-foreground py-16">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="text-center font-body text-muted-foreground py-16">
            No articles in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filtered.map((a) => (
              <Link
                key={a.slug}
                to={`/journal/${a.slug}`}
                className="group block border border-foreground/10 hover:border-foreground transition-colors overflow-hidden"
              >
                <div className="aspect-[16/10] bg-muted overflow-hidden">
                  {a.cover_url && (
                    <img
                      src={a.cover_url}
                      alt={a.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-6 md:p-8">
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
                </div>
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
