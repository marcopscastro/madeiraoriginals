import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useShopifyProducts";

const Bestsellers = () => {
  const { t } = useTranslation();
  const { data: products = [], isLoading } = useProducts(6, "tag:first-drop");
  const featured = products.slice(0, 3);

  return (
    <section id="latest-drops" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 md:py-32">
      <div className="text-center mb-14 md:mb-16 max-w-2xl mx-auto">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-6">
          {t("bestsellers.overline")}
        </p>
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.02] tracking-tight">
          {t("bestsellers.heading")}
        </h2>
        <p className="mt-5 font-body text-base md:text-lg text-foreground/65 leading-relaxed">
          {t("bestsellers.subheading")}
        </p>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 md:gap-x-14">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/5] bg-muted" />
              <div className="h-3 bg-muted mt-5 w-2/3" />
              <div className="h-3 bg-muted mt-2 w-1/4" />
            </div>
          ))}
        </div>
      ) : featured.length === 0 ? (
        <p className="text-center font-body text-muted-foreground">{t("bestsellers.empty")}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 md:gap-x-14 md:gap-y-20">
            {featured.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-14 md:mt-16">
            <Link
              to="/first-drop"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-heading font-semibold text-[12px] uppercase tracking-[0.3em] px-10 py-[18px] hover:opacity-90 transition-opacity"
            >
              {t("bestsellers.cta")} →
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default Bestsellers;
