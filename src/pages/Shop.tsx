import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useShopifyProducts";

type SortOption = "default" | "price-asc" | "price-desc";

const Shop = () => {
  const { data: products = [], isLoading } = useProducts(50);
  const [sort, setSort] = useState<SortOption>("default");

  const sorted = useMemo(() => {
    const list = [...products];
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
    }
    return list;
  }, [products, sort]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-foreground text-center mb-8">
          All Products
        </h1>

        <div className="flex justify-end mb-10">
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

        {isLoading ? (
          <p className="text-center font-body text-muted-foreground py-16">Loading…</p>
        ) : sorted.length === 0 ? (
          <p className="text-center font-body text-muted-foreground py-16">
            No products yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
