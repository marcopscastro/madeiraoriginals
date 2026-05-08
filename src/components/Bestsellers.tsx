import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useShopifyProducts";

const Bestsellers = () => {
  const { data: products = [], isLoading } = useProducts(8, "tag:streetwear");

  return (
    <section id="latest-drops" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
          Latest Drops
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05]">
          Madeira-inspired apparel,<br />
          <span className="italic">made to wear anywhere.</span>
        </h2>
      </div>
      {isLoading ? (
        <p className="text-center font-body text-muted-foreground">Loading…</p>
      ) : products.length === 0 ? (
        <p className="text-center font-body text-muted-foreground">No products yet — drops coming soon.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center border border-foreground text-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
            >
              Shop All
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Bestsellers;
