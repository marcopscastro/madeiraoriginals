import { Link } from "react-router-dom";
import { formatPrice, ShopifyProduct } from "@/lib/shopify";

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const node = product.node;
  const image = node.images.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-heading text-sm uppercase tracking-wide">
            Coming Soon
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors">
          {node.title}
        </h3>
        <p className="mt-1 font-body text-base text-muted-foreground">{formatPrice(price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
