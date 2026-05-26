import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatPrice, ShopifyProduct } from "@/lib/shopify";
import { productAlt } from "@/lib/productAlt";
import { useProductRating } from "@/components/ProductReviews";

const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const { t } = useTranslation();
  const node = product.node;
  const image = node.images.edges[0]?.node;
  const hoverImage = node.images.edges[1]?.node;
  const price = node.priceRange.minVariantPrice;
  const rating = useProductRating(node.handle);

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="relative overflow-hidden bg-muted aspect-[4/5]">
        {image ? (
          <>
            <img
              src={image.url}
              alt={productAlt({ title: node.title, shopifyAlt: image.altText, index: 0, total: node.images.edges.length })}
              loading="lazy"
              className={`w-full h-full object-cover img-cinematic transition-all duration-[1400ms] ease-out group-hover:scale-[1.03] ${hoverImage ? "group-hover:opacity-0" : ""}`}
            />
            {hoverImage && (
              <img
                src={hoverImage.url}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover img-cinematic opacity-0 transition-opacity duration-[1400ms] ease-out group-hover:opacity-100"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-heading text-xs uppercase tracking-[0.3em]">
            {t("common.comingSoon")}
          </div>
        )}
      </div>
      <div className="mt-6">
        <h3 className="font-display text-lg md:text-xl font-medium text-foreground leading-snug tracking-tight group-hover:text-accent transition-colors">
          {node.title}
        </h3>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="font-body text-sm md:text-base text-foreground/65">{formatPrice(price)}</p>
          {rating && rating.count > 0 && (
            <span className="inline-flex items-center gap-1 font-heading text-[10px] uppercase tracking-[0.25em] text-foreground/55">
              <Star size={11} className="fill-accent text-accent" strokeWidth={1.5} />
              {rating.avg.toFixed(1)} ({rating.count})
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
