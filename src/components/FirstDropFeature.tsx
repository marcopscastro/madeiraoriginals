import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProducts } from "@/hooks/useShopifyProducts";
import ProductCard from "@/components/ProductCard";

/**
 * Homepage feature for the First Drop launch collection.
 * Calm editorial intro + first 4 products tagged `first-drop` in Shopify.
 * Falls back to a quiet placeholder when no products are tagged yet.
 */
const FirstDropFeature = () => {
  const { t } = useTranslation();
  const { data: products = [], isLoading } = useProducts(8, "tag:first-drop");
  const featured = products.slice(0, 4);

  return (
    <section className="bg-background border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 md:pt-36 pb-10 md:pb-16">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end">
          <div className="md:col-span-8">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-6">
              {t("firstDrop.overline")}
            </p>
            <h2 className="font-display font-medium text-foreground leading-[0.98] tracking-tight text-4xl md:text-6xl lg:text-7xl">
              {t("firstDrop.headingA")}{" "}
              <span className="text-foreground/40">{t("firstDrop.headingB")}</span>
            </h2>
          </div>
          <p className="md:col-span-4 font-body text-base md:text-lg text-foreground/70 leading-relaxed max-w-md">
            {t("firstDrop.body")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-24 md:pb-36">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-muted" />
                <div className="h-3 bg-muted mt-5 w-2/3" />
                <div className="h-3 bg-muted mt-2 w-1/4" />
              </div>
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div className="border border-foreground/10 px-6 py-16 md:py-20 text-center">
            <p className="font-display text-2xl md:text-3xl font-medium text-foreground tracking-tight">
              {t("firstDrop.soonTitle")}
            </p>
            <p className="mt-4 font-body text-foreground/65 max-w-md mx-auto">
              {t("firstDrop.soonBody")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-x-10 md:gap-y-20">
            {featured.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}

        <div className="mt-14 md:mt-20 flex justify-center">
          <Link
            to="/first-drop"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground font-heading font-semibold text-[12px] uppercase tracking-[0.3em] px-10 py-[18px] hover:opacity-90 transition-opacity"
          >
            {t("firstDrop.cta")} →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FirstDropFeature;
