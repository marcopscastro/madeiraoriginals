import { useTranslation } from "react-i18next";
import { Link } from "@/components/LocaleLink";

/**
 * Homepage house brand band — the entry point to the Shop.
 */
const HomeHouseBrand = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <div className="border border-foreground/15 p-8 md:p-14 lg:p-16">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
          {t("home.houseBrand.eyebrow")}
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05] max-w-3xl">
          {t("home.houseBrand.heading")}
        </h2>
        <p className="mt-8 font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          {t("home.houseBrand.body")}
        </p>
        <Link
          to="/shop"
          className="mt-10 inline-flex items-center justify-center bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:opacity-90 transition-opacity"
        >
          {t("home.houseBrand.cta")} →
        </Link>
      </div>
    </section>
  );
};

export default HomeHouseBrand;
