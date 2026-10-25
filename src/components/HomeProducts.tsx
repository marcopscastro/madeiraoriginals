import { useTranslation } from "react-i18next";
import { useProducts } from "@/hooks/useShopifyProducts";
import { isSaoVicenteTee } from "@/lib/storefrontCatalog";
import ProductCard from "@/components/ProductCard";
import { Link } from "@/components/LocaleLink";

const HomeProducts = () => {
  const { t } = useTranslation();
  const { data = [], isLoading, isError } = useProducts(100);
  const products = data.filter((product) => isSaoVicenteTee(product.node));
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24" aria-labelledby="collection-heading">
      <div className="flex items-end justify-between gap-6 mb-10">
        <h2 id="collection-heading" className="font-display text-3xl md:text-5xl font-medium text-foreground">{t("shopHome.collectionHeading")}</h2>
        <Link to="/shop" className="hidden sm:inline-flex min-h-11 items-center font-heading text-sm underline underline-offset-4">{t("common.shopAll")} →</Link>
      </div>
      {isLoading ? <p role="status" className="py-16 font-body text-muted-foreground">{t("common.loading")}</p> : isError || !products.length ? (
        <p role="status" className="py-16 font-body text-muted-foreground">{t("shopHome.productsUnavailable")} <Link to="/shop" className="underline">{t("nav.shop")}</Link></p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
          {products.map((product) => <ProductCard key={product.node.id} product={product} />)}
        </div>
      )}
    </section>
  );
};
export default HomeProducts;