import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { journalCoverProps } from "@/lib/journalImages";

const JournalPreview = () => {
  const { t, i18n } = useTranslation();
  const isPt = i18n.language.startsWith("pt");

  const { data: articles = [] } = useQuery({
    queryKey: ["journal-preview"],
    queryFn: async () => {
      const { data } = await supabase
        .from("articles")
        .select("slug,title,title_pt,excerpt,excerpt_pt,published_at,cover_url")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(3);
      return data ?? [];
    },
  });

  if (!articles.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">
            {t("journal.overline")}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            {t("journal.previewHeading")}
          </h2>
        </div>
        <Link
          to="/journal"
          className="hidden sm:inline-block font-heading text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary"
        >
          {t("journal.viewAll")}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((a) => {
          const title = (isPt && a.title_pt) || a.title;
          const excerpt = (isPt && a.excerpt_pt) || a.excerpt;
          const cover = journalCoverProps(a.cover_url);
          return (
            <Link
              key={a.slug}
              to={`/journal/${a.slug}`}
              className="group block border border-foreground/10 hover:border-foreground transition-colors overflow-hidden"
            >
              <div className="aspect-[4/3] bg-muted overflow-hidden">
                {cover && (
                  <img
                    src={cover.src}
                    srcSet={cover.srcSet}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    alt={title}
                    width={1000}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {title}
                </h3>
                {excerpt && (
                  <p className="mt-3 font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {excerpt}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default JournalPreview;
