import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useShopifyProducts";

const Bestsellers = () => {
  const { t } = useTranslation();
  const { data: products = [], isLoading } = useProducts(8);

  return (
    <section id="latest-drops" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40">
      <div className="text-center mb-16 md:mb-20">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-6">
          {t("bestsellers.overline")}
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.02] tracking-tight">
          {t("bestsellers.headingA")}<br />
          <span className="text-foreground/40">{t("bestsellers.headingB")}</span>
        </h2>
      </div>
      {isLoading ? (
        <p className="text-center font-body text-muted-foreground">{t("common.loading")}</p>
      ) : products.length === 0 ? (
        <p className="text-center font-body text-muted-foreground">{t("bestsellers.empty")}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center border border-foreground text-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
            >
              {t("common.shopAll")}
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Bestsellers;
