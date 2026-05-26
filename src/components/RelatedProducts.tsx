import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";
import { useProducts, useProductByHandle } from "@/hooks/useShopifyProducts";

const RelatedProducts = ({ currentHandle }: { currentHandle: string }) => {
  const { t } = useTranslation();
  const { data: products = [] } = useProducts(20);
  const { data: current } = useProductByHandle(currentHandle);
  const currentType = current?.productType;

  const others = products.filter((p) => p.node.handle !== currentHandle);
  const sameType = currentType
    ? others.filter((p) => p.node.productType === currentType)
    : [];
  const related = (sameType.length >= 3 ? sameType : [...sameType, ...others.filter((p) => !sameType.includes(p))]).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 md:py-40">
      <div className="mb-14 md:mb-20 text-center">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.35em] text-accent mb-4">
          {t("relatedProducts.overline")}
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground leading-[1.05] tracking-tight">
          {t("relatedProducts.heading")}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
        {related.map((p) => (
          <ProductCard key={p.node.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
