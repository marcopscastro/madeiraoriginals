import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { formatPrice, ShopifyProduct } from "@/lib/shopify";
import { useProductRating } from "@/components/ProductReviews";

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const node = product.node;
  const image = node.images.edges[0]?.node;
  const hoverImage = node.images.edges[1]?.node;
  const price = node.priceRange.minVariantPrice;
  const rating = useProductRating(node.handle);

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        {image ? (
          <>
            <img
              src={image.url}
              alt={image.altText || node.title}
              loading="lazy"
              className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            {hoverImage && (
              <img
                src={hoverImage.url}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </>
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
        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="font-body text-base text-muted-foreground">{formatPrice(price)}</p>
          {rating && rating.count > 0 && (
            <span className="inline-flex items-center gap-1 font-heading text-[11px] uppercase tracking-widest text-muted-foreground">
              <Star size={12} className="fill-accent text-accent" strokeWidth={1.5} />
              {rating.avg.toFixed(1)} ({rating.count})
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
