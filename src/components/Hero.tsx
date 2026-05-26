import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SECTION_IMAGES } from "@/lib/sectionImages";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[100svh] min-h-[680px] overflow-hidden bg-foreground grain">
      {/* Cinematic background */}
      <picture>
        <source media="(max-width: 767px)" srcSet={SECTION_IMAGES.hero.mobile} />
        <img
          src={SECTION_IMAGES.hero.desktop}
          alt={t("hero.imageAlt")}
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover img-cinematic animate-ken-burns"
        />
      </picture>

      {/* Atmospheric scrim — restrained, lets the imagery breathe */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-foreground/25 via-foreground/5 to-foreground/80"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-foreground/25 via-transparent to-transparent"
      />

      {/* Top eyebrow — geographic stamp */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 sm:px-8 lg:px-12 pt-8 md:pt-12 text-background/80">
        <p className="font-heading text-[10px] sm:text-xs font-medium uppercase tracking-[0.4em]">
          {t("hero.coords")}
        </p>
        <p className="font-heading text-[10px] sm:text-xs font-medium uppercase tracking-[0.4em] hidden sm:block">
          {t("hero.overline")}
        </p>
      </div>

      {/* Headline + CTAs anchored to bottom — generous breathing room */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-4 sm:px-8 lg:px-12 pb-14 md:pb-24 lg:pb-28">
        <div className="max-w-6xl">
          <h1 className="font-display font-medium text-background leading-[0.95] text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.75rem] tracking-tight animate-fade-up">
            {t("hero.headline1")}
            <br />
            <span className="text-background/70">{t("hero.headline2")}</span>
          </h1>

          <p
            className="mt-8 md:mt-10 font-body text-base md:text-lg text-background/80 max-w-md leading-relaxed animate-fade-up"
            style={{ animationDelay: "220ms" }}
          >
            {t("hero.body")}
          </p>

          <div
            className="mt-10 md:mt-14 flex flex-col sm:flex-row gap-3 sm:gap-5 animate-fade-up"
            style={{ animationDelay: "380ms" }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-background text-foreground font-heading font-semibold text-[12px] uppercase tracking-[0.3em] px-10 py-[18px] hover:bg-accent hover:text-accent-foreground transition-colors duration-500"
            >
              {t("hero.ctaShop")}
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center text-background font-heading font-semibold text-[12px] uppercase tracking-[0.3em] px-2 py-[18px] border-b border-background/60 hover:border-background hover:text-background/90 transition-colors duration-500"
            >
              {t("hero.ctaStory")}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 right-4 sm:right-8 z-10 hidden md:flex items-center gap-3 text-background/55">
        <span className="font-heading text-[10px] uppercase tracking-[0.4em]">{t("hero.scroll")}</span>
        <span aria-hidden className="block w-12 h-px bg-background/35" />
      </div>
    </section>
  );
};

export default Hero;
