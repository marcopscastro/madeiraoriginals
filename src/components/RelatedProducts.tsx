import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ currentId }: { currentId: string }) => {
  const related = products.filter((p) => p.id !== currentId).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide text-foreground text-center mb-12">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
