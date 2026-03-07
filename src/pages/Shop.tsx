import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categoryLabels, type ProductCategory } from "@/data/products";
import { X } from "lucide-react";

type SortOption = "default" | "price-asc" | "price-desc";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") as ProductCategory | null;
  const [sort, setSort] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    let result = activeCategory ? products.filter((p) => p.category === activeCategory) : [...products];
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [activeCategory, sort]);

  const setCategory = (cat: ProductCategory | null) => {
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-foreground text-center mb-8">
          {activeCategory ? categoryLabels[activeCategory] : "All Products"}
        </h1>

        {/* Filters & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(categoryLabels) as ProductCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(activeCategory === cat ? null : cat)}
                className={`font-heading text-xs font-bold uppercase tracking-widest px-4 py-2 border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-foreground/20 text-foreground hover:border-foreground"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
            {activeCategory && (
              <button
                onClick={() => setCategory(null)}
                className="inline-flex items-center gap-1 font-heading text-xs font-bold uppercase tracking-widest px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={14} /> Clear
              </button>
            )}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="bg-background border border-foreground/20 font-heading text-xs font-semibold uppercase tracking-wide px-4 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center font-body text-muted-foreground py-16">
            No products found in this category.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
