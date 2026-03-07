import { Link } from "react-router-dom";
import { products } from "@/data/products";

const Bestsellers = () => {
  return (
    <section id="bestsellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h2 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-foreground text-center mb-12">
        Shop the Latest
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group block"
          >
            {/* Image */}
            <div className="relative overflow-hidden bg-muted aspect-[3/4]">
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-heading text-sm uppercase tracking-wide">
                  Coming Soon
                </div>
              )}
              {product.tag && (
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground font-heading text-xs font-bold uppercase tracking-wider px-3 py-1">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="mt-4">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="mt-1 font-body text-base text-muted-foreground">
                €{product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Bestsellers;
