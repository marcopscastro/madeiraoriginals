import { Link } from "@/components/LocaleLink";
import { useTranslation } from "react-i18next";
import { SECTION_IMAGES } from "@/lib/sectionImages";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[88svh] min-h-[560px] max-h-[820px] md:h-[100svh] md:min-h-[680px] md:max-h-[1040px] overflow-hidden bg-foreground grain img-placeholder-dark">
      {/* Cinematic background */}
      <picture>
        <source media="(max-width: 767px)" srcSet={SECTION_IMAGES.hero.mobile} />
        <img
          src={SECTION_IMAGES.hero.desktop}
          alt={t("hero.imageAlt")}
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover img-cinematic-lifted animate-ken-burns"
        />
      </picture>

      {/* Atmospheric scrim — light at the top so the landscape reads,
          weighted at the bottom only where the headline sits (WCAG AA). */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-foreground/85 via-foreground/55 to-transparent"
      />

      {/* Top eyebrow — geographic stamp */}
      <div className="absolute top-0 inset-x-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-5 md:pt-12 flex items-center justify-between text-background/85">
          <p className="font-heading text-[10px] sm:text-xs font-medium uppercase tracking-[0.4em]">
            {t("hero.coords")}
          </p>
          <p className="font-heading text-[10px] sm:text-xs font-medium uppercase tracking-[0.4em] hidden sm:block">
            {t("hero.overline")}
          </p>
        </div>
      </div>

      {/* Headline + CTAs anchored to bottom — generous breathing room */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-10 md:pb-24 lg:pb-28">
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

      {/* Scroll cue */}
      <div className="absolute bottom-6 right-4 sm:right-8 z-10 hidden md:flex items-center gap-3 text-background/60">
        <span className="font-heading text-[10px] uppercase tracking-[0.4em]">{t("hero.scroll")}</span>
        <span aria-hidden className="block w-12 h-px bg-background/35" />
      </div>
    </section>
  );
};

export default Hero;
