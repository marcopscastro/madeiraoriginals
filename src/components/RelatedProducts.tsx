import ProductCard from "./ProductCard";
import { useProducts, useProductByHandle } from "@/hooks/useShopifyProducts";

const RelatedProducts = ({ currentHandle }: { currentHandle: string }) => {
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide text-foreground text-center mb-12">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {related.map((p) => (
          <ProductCard key={p.node.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
