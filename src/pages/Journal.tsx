import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { supabase } from "@/integrations/supabase/client";
import { journalCoverProps, JOURNAL_FALLBACK_COVER } from "@/lib/journalImages";

const Journal = () => {
  const { t, i18n } = useTranslation();
  const isPt = i18n.language.startsWith("pt");
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "all";

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles-list"],
    queryFn: async () => {
      const { data } = await supabase
        .from("articles")
        .select("slug,title,title_pt,excerpt,excerpt_pt,published_at,cover_url,tags")
        .eq("published", true)
        .order("published_at", { ascending: false });
      return data ?? [];
    },
  });

  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.tags?.forEach((tag: string) => set.add(tag)));
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

  const [lead, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-background grain-fixed">
      <PageSEO routeKey="journal" />
      <Header />
      <main>
        {/* Editorial masthead */}
        <section className="border-b border-foreground/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 md:pt-44 pb-16 md:pb-24">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.45em] text-accent mb-6">
              {t("journal.overline")} · Field Notes · Atlantic Dispatches
            </p>
            <h1 className="font-display font-medium leading-[0.98] tracking-tight text-5xl sm:text-7xl md:text-8xl text-foreground max-w-5xl">
              {t("journal.heading")}
            </h1>
            <p className="mt-8 max-w-xl font-body text-base md:text-lg text-foreground/65 leading-relaxed">
              Stories, field notes and dispatches from São Vicente and the wider Atlantic — culture, craft, weather and the modern Madeira identity.
            </p>
          </div>

          {categories.length > 2 && (
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pb-10">
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`font-heading text-[11px] font-semibold uppercase tracking-[0.3em] pb-1 border-b transition-colors ${
                      activeCategory === c
                        ? "border-foreground text-foreground"
                        : "border-transparent text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {c === "all" ? t("journal.all") : c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-20 md:py-28">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] bg-muted" />
                  <div className="mt-5 space-y-3">
                    <div className="h-3 bg-muted w-24" />
                    <div className="h-6 bg-muted w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center font-body text-muted-foreground py-16">
              {t("journal.empty")}
            </p>
          ) : (
            <>
              {/* Lead story */}
              {lead && (() => {
                const cover = journalCoverProps(lead.cover_url);
                return (
                  <Link to={`/journal/${lead.slug}`} className="group block mb-24 md:mb-32">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
                      <div className="lg:col-span-8 aspect-[16/10] overflow-hidden bg-muted">
                        <img
                          src={cover.src}
                          srcSet={cover.srcSet}
                          sizes="(min-width: 1024px) 66vw, 100vw"
                          alt={(isPt && lead.title_pt) || lead.title}
                          width={1600}
                          height={1000}
                          loading="eager"
                          decoding="async"
                          onError={(e) => {
                            const img = e.currentTarget;
                            if (img.src.endsWith(JOURNAL_FALLBACK_COVER)) return;
                            img.srcset = "";
                            img.src = JOURNAL_FALLBACK_COVER;
                          }}
                          className="w-full h-full object-cover img-cinematic transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02]"
                        />
                      </div>
                      <div className="lg:col-span-4">
                        {lead.tags?.[0] && (
                          <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.4em] text-accent mb-4">
                            {lead.tags[0]}
                          </p>
                        )}
                        <h2 className="font-display font-medium tracking-tight text-3xl md:text-5xl text-foreground leading-[1.05] group-hover:text-foreground/70 transition-colors">
                          {(isPt && lead.title_pt) || lead.title}
                        </h2>
                        {((isPt && lead.excerpt_pt) || lead.excerpt) && (
                          <p className="mt-5 font-body text-base text-foreground/65 leading-relaxed line-clamp-4">
                            {(isPt && lead.excerpt_pt) || lead.excerpt}
                          </p>
                        )}
                        <span className="mt-6 inline-block font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground border-b border-foreground pb-1">
                          Read →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })()}

              {/* Remaining stories */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-20">
                  {rest.map((a) => {
                    const cover = journalCoverProps(a.cover_url);
                    return (
                      <Link
                        key={a.slug}
                        to={`/journal/${a.slug}`}
                        className="group block"
                      >
                        <div className="aspect-[4/5] overflow-hidden bg-muted">
                          <img
                            src={cover.src}
                            srcSet={cover.srcSet}
                            sizes="(min-width: 768px) 50vw, 100vw"
                            alt={(isPt && a.title_pt) || a.title}
                            width={1200}
                            height={1500}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (img.src.endsWith(JOURNAL_FALLBACK_COVER)) return;
                              img.srcset = "";
                              img.src = JOURNAL_FALLBACK_COVER;
                            }}
                            className="w-full h-full object-cover img-cinematic transition-transform duration-[1400ms] ease-out group-hover:scale-[1.02]"
                          />
                        </div>
                        <div className="mt-6">
                          {a.tags?.[0] && (
                            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.4em] text-accent mb-3">
                              {a.tags[0]}
                            </p>
                          )}
                          <h3 className="font-display font-medium tracking-tight text-2xl md:text-3xl text-foreground leading-[1.1] group-hover:text-foreground/70 transition-colors">
                            {(isPt && a.title_pt) || a.title}
                          </h3>
                          {((isPt && a.excerpt_pt) || a.excerpt) && (
                            <p className="mt-3 font-body text-sm md:text-base text-foreground/60 leading-relaxed line-clamp-3">
                              {(isPt && a.excerpt_pt) || a.excerpt}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Journal;
