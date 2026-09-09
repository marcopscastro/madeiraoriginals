import { Link } from "@/components/LocaleLink";
import { useTranslation } from "react-i18next";
import capelinhaTee from "@/assets/products/capelinha-do-calhau-black.png";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden bg-foreground grain">
      <div className="absolute top-0 inset-x-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-5 md:pt-12 flex items-center justify-between text-background/85">
          <p className="font-heading text-[10px] sm:text-xs font-medium uppercase tracking-[0.4em]">
            {t("hero.coords")}
          </p>
          <p className="hidden md:block font-heading text-[10px] sm:text-xs font-medium uppercase tracking-[0.4em]">
            {t("hero.overline")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-14 pb-12 md:pt-24 md:pb-16">
        <div className="grid md:min-h-[620px] md:grid-cols-2 md:gap-10 lg:gap-16">
          <figure className="order-1 flex min-w-0 flex-col md:order-2 md:justify-center">
            <div className="aspect-[4/5] w-full min-h-0 md:h-[min(72vh,760px)] md:aspect-auto">
              <img
                src={capelinhaTee}
                alt={t("hero.imageAlt")}
                width={768}
                height={1024}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-contain"
              />
            </div>
            <figcaption className="mt-3 font-heading text-[10px] sm:text-xs font-medium uppercase tracking-[0.4em] text-background/70">
              {t("hero.caption")}
            </figcaption>
          </figure>

          <div className="order-2 flex flex-col justify-center pt-12 md:order-1 md:pt-0">
            <p className="mb-5 font-heading text-[10px] sm:text-xs font-medium uppercase tracking-[0.4em] text-background/85 md:hidden">
              {t("hero.overline")}
            </p>
          <h1 className="font-display font-medium text-background leading-[0.98] text-[2.25rem] sm:text-6xl md:text-7xl lg:text-[5.75rem] tracking-tight animate-fade-up max-w-5xl text-balance">
            {t("hero.headline1")}
            <br />
            <span className="text-background/80">{t("hero.headline2")}</span>
          </h1>

          <p
            className="mt-5 md:mt-10 font-body text-base md:text-lg text-background/90 max-w-md leading-relaxed animate-fade-up"
            style={{ animationDelay: "220ms" }}
          >
            {t("hero.body")}
          </p>

          <div
            className="mt-7 md:mt-14 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 animate-fade-up"
            style={{ animationDelay: "380ms" }}
          >
            <Link
              to="/contact"
              className="inline-flex h-14 items-center justify-center bg-background text-foreground font-heading font-semibold text-[12px] uppercase tracking-[0.3em] px-10 hover:bg-accent hover:text-accent-foreground transition-colors duration-500"
            >
              {t("hero.ctaQuote")}
            </Link>
            <Link
              to="/studio"
              className="group inline-flex h-14 items-center justify-center sm:justify-start px-2 text-background font-heading font-semibold text-[12px] uppercase tracking-[0.3em] hover:text-background/80 transition-colors duration-500"
            >
              <span className="border-b border-background/60 pb-1 group-hover:border-background transition-colors duration-500">
                {t("hero.ctaServices")}
              </span>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Hero;
