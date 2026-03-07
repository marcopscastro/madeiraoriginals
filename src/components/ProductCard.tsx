import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group block">
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
      <div className="mt-4">
        <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 font-body text-base text-muted-foreground">
          €{product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
