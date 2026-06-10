import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIES, CATEGORY_SLUGS, type Category } from "@/lib/catalog";

const Catalogo = () => {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const results = await Promise.all(
        CATEGORIES.map(async (c) => {
          const { count } = await supabase
            .from("catalog_products")
            .select("id", { count: "exact", head: true })
            .eq("category", c);
          return [c, count ?? 0] as const;
        }),
      );
      if (!cancelled) {
        setCounts(Object.fromEntries(results));
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Catálogo — Vestuário e acessórios personalizáveis"
        description="Vestuário e acessórios personalizáveis para empresas e eventos. T-shirts, polos, hoodies, totes e bonés."
        path="/catalogo"
      />
      <Header />
      <main>
        <section className="bg-secondary text-secondary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-accent mb-3">
              Catálogo · B2B
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] max-w-3xl">
              Vestuário e acessórios personalizáveis para empresas e eventos
            </h1>
            <p className="mt-4 font-body text-base md:text-lg opacity-90 max-w-2xl">
              Selecionámos as melhores referências dos nossos fornecedores europeus.
              Personalizamos em Madeira para a sua marca, evento ou equipa.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat}
                category={cat as Category}
                count={counts[cat]}
                loading={loading}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const CategoryCard = ({
  category,
  count,
  loading,
}: {
  category: Category;
  count: number | undefined;
  loading: boolean;
}) => (
  <Link
    to={`/catalogo/${CATEGORY_SLUGS[category]}`}
    className="group block border border-foreground/20 p-6 md:p-8 hover:bg-foreground hover:text-background transition-colors"
  >
    <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-primary group-hover:text-background/70 mb-3">
      Categoria
    </p>
    <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">{category}</h2>
    <p className="font-heading text-xs font-bold uppercase tracking-widest opacity-70">
      {loading ? "…" : `${count ?? 0} produtos`}
    </p>
  </Link>
);

export default Catalogo;
