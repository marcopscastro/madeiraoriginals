import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SEO from "@/components/SEO";
import { useProducts } from "@/hooks/useShopifyProducts";

type SortOption = "default" | "price-asc" | "price-desc" | "title-asc";

const Shop = () => {
  const { data: products = [], isLoading } = useProducts(50, "tag:streetwear");
  const [sort, setSort] = useState<SortOption>("default");
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<string>("all");

  const types = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.node.productType && set.add(p.node.productType));
    return ["all", ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    let list = products;
    if (activeType !== "all") {
      list = list.filter((p) => p.node.productType === activeType);
    }
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
  }, [products, sort, query, activeType]);

  const faqs = [
    {
      q: "Do you ship worldwide?",
      a: "Yes. We ship Madeira Originals apparel and accessories worldwide from our fulfilment partners, with tracked delivery to Europe, the UK, the US, and most of the rest of the world. Shipping options and live rates are calculated at checkout based on your destination.",
    },
    {
      q: "Can I order Madeira souvenirs from outside Portugal?",
      a: "Absolutely. Most of our customers order from outside Portugal — including the Madeiran diaspora in the UK, Channel Islands, South Africa, Venezuela and beyond, plus travellers who discovered us in Funchal or São Vicente and want to order more once they get home.",
    },
    {
      q: "Are these made in Madeira?",
      a: "Madeira Originals is designed in São Vicente, on the north coast of Madeira, and the brand is entirely rooted on the island. Production is handled by our vetted fulfilment partners using premium blanks, with our Production Studio in Madeira running custom apparel, DTF and UV DTF for local and international clients.",
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Shop Madeira Originals | Streetwear & Apparel"
        description="Shop premium Madeira-inspired t-shirts, hoodies, accessories, and streetwear designed by Madeira Originals in São Vicente, Madeira. Worldwide shipping."
        path="/shop"
        jsonLd={faqLd}
      />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-10">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
            Collection
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            Madeira Streetwear & Apparel
          </h1>
          <p className="mt-4 font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium tees, hoodies and accessories inspired by the landscapes, traditions, and
            modern culture of Madeira — designed in São Vicente, shipped worldwide from Funchal.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
          {types.length > 2 && (
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`font-heading text-[11px] font-semibold uppercase tracking-widest px-3 py-2 border transition-colors ${
                    activeType === t
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/20 text-foreground hover:border-foreground"
                  }`}
                >
                  {t === "all" ? "All" : t}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 md:ml-auto">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
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
            <p className="font-display text-2xl text-foreground">Nothing matches that.</p>
            <p className="mt-2 font-body text-muted-foreground">
              Try clearing filters or searching for something else.
            </p>
            <button
              onClick={() => { setQuery(""); setActiveType("all"); setSort("default"); }}
              className="mt-6 border border-foreground font-heading font-bold text-xs uppercase tracking-widest px-5 py-3 hover:bg-foreground hover:text-background"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <p className="font-heading text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
              Showing {filtered.length} of {products.length}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
