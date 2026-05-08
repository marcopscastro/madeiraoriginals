import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SEO from "@/components/SEO";
import { useProducts } from "@/hooks/useShopifyProducts";

type SortOption = "default" | "price-asc" | "price-desc" | "title-asc";

export interface CollectionConfig {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  shopifyQuery: string;
}

const Collection = ({ config }: { config: CollectionConfig }) => {
  const { data: products = [], isLoading } = useProducts(50, config.shopifyQuery);
  const [sort, setSort] = useState<SortOption>("default");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = products;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.node.title.toLowerCase().includes(q) ||
          (p.node.description ?? "").toLowerCase().includes(q)
      );
    }
    list = [...list];
    if (sort === "price-asc") {
      list.sort(
        (a, b) =>
          parseFloat(a.node.priceRange.minVariantPrice.amount) -
          parseFloat(b.node.priceRange.minVariantPrice.amount)
      );
    } else if (sort === "price-desc") {
      list.sort(
        (a, b) =>
          parseFloat(b.node.priceRange.minVariantPrice.amount) -
          parseFloat(a.node.priceRange.minVariantPrice.amount)
      );
    } else if (sort === "title-asc") {
      list.sort((a, b) => a.node.title.localeCompare(b.node.title));
    }
    return list;
  }, [products, sort, query]);

  return (
    <div className="min-h-screen bg-background">
      <SEO title={config.metaTitle} description={config.metaDescription} path={`/${config.slug}`} />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <nav className="flex items-center gap-2 font-heading text-xs uppercase tracking-widest text-muted-foreground mb-8">
          <a href="/" className="hover:text-foreground">Home</a>
          <span>/</span>
          <a href="/shop" className="hover:text-foreground">Shop</a>
          <span>/</span>
          <span className="text-foreground">{config.title}</span>
        </nav>

        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
            {config.eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            {config.title}
          </h1>
          <p className="mt-4 font-body text-base md:text-lg text-muted-foreground">
            {config.intro}
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-end">
          <div className="flex items-center gap-3 md:ml-auto">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="bg-background border border-foreground/20 font-body text-sm pl-9 pr-9 py-2 text-foreground focus:outline-none focus:border-foreground rounded-none w-44 sm:w-56"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              aria-label="Sort products"
              className="bg-background border border-foreground/20 font-heading text-xs font-semibold uppercase tracking-wide px-3 py-2 text-foreground focus:outline-none focus:border-foreground"
            >
              <option value="default">Sort by</option>
              <option value="title-asc">Name: A → Z</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-muted" />
                <div className="h-4 bg-muted mt-4 w-2/3" />
                <div className="h-4 bg-muted mt-2 w-1/3" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-foreground/15">
            <p className="font-display text-2xl text-foreground">No pieces in this collection yet.</p>
            <p className="mt-2 font-body text-muted-foreground">
              New drops land regularly. Browse the full shop in the meantime.
            </p>
            <a
              href="/shop"
              className="inline-block mt-6 border border-foreground font-heading font-bold text-xs uppercase tracking-widest px-5 py-3 hover:bg-foreground hover:text-background"
            >
              Browse all
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Collection;
