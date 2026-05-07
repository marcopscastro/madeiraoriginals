import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const JournalPreview = () => {
  const { data: articles = [] } = useQuery({
    queryKey: ["journal-preview"],
    queryFn: async () => {
      const { data } = await supabase
        .from("articles")
        .select("slug,title,excerpt,published_at,cover_url")
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
            Journal
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
            Stories from the island.
          </h2>
        </div>
        <Link
          to="/journal"
          className="hidden sm:inline-block font-heading text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary"
        >
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((a) => (
          <Link
            key={a.slug}
            to={`/journal/${a.slug}`}
            className="group block border border-foreground/10 hover:border-foreground transition-colors overflow-hidden"
          >
            <div className="aspect-[4/3] bg-muted overflow-hidden">
              {a.cover_url && (
                <img
                  src={a.cover_url}
                  alt={a.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {a.title}
              </h3>
              {a.excerpt && (
                <p className="mt-3 font-body text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {a.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default JournalPreview;
