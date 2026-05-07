import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useShopifyProducts";

const Bestsellers = () => {
  const { data: products = [], isLoading } = useProducts(4, "tag:streetwear");

  return (
    <section id="bestsellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-12">
        Bestsellers
      </h2>
      {isLoading ? (
        <p className="text-center font-body text-muted-foreground">Loading…</p>
      ) : products.length === 0 ? (
        <p className="text-center font-body text-muted-foreground">No products yet — drops coming soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.node.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Bestsellers;
