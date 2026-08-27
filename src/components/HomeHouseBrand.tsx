import { useTranslation } from "react-i18next";
import { Link } from "@/components/LocaleLink";
import teeMercado from "@/assets/mockup-tee-mercado.png";
import teePoncha from "@/assets/poncha-tee.jpg";
import tote from "@/assets/product-tote.png";

const HOUSE_BRAND_IMAGES = [teeMercado, teePoncha, tote];

/**
 * Homepage house brand band — the entry point to the Shop.
 */
const HomeHouseBrand = () => {
  const { t } = useTranslation();
  const alts = t("home.houseBrand.imageAlts", { returnObjects: true }) as string[];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 md:py-28">
      <div className="border border-foreground/15">
        <div className="grid grid-cols-3 gap-px bg-foreground/15 border-b border-foreground/15">
          {HOUSE_BRAND_IMAGES.map((src, i) => (
            <div key={src} className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={src}
                alt={alts?.[i] ?? ""}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <div className="p-8 md:p-14 lg:p-16">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
            {t("home.houseBrand.eyebrow")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05] max-w-3xl text-balance">
            {t("home.houseBrand.heading")}
          </h2>
          <p className="mt-8 font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {t("home.houseBrand.body")}
          </p>
          <Link
            to="/shop"
            className="mt-10 inline-flex h-14 items-center justify-center bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 hover:opacity-90 transition-opacity"
          >
            {t("home.houseBrand.cta")} →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeHouseBrand;
