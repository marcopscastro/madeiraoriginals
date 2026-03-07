import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Bestsellers = () => {
  return (
    <section id="bestsellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-foreground text-center mb-12">
        Shop the Latest
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Bestsellers;
