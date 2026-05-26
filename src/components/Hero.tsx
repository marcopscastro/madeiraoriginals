import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-volcanic-coast.jpg";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-foreground">
      {/* Cinematic background */}
      <img
        src={heroImage}
        alt={t("hero.imageAlt")}
        width={1920}
        height={1280}
        fetchPriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover animate-ken-burns"
      />

      {/* Atmospheric scrim — bottom-heavy gradient for legibility, doesn't muddy the imagery */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/10 to-foreground/85"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-foreground/35 via-transparent to-transparent"
      />

      {/* Top eyebrow — geographic stamp */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 sm:px-8 lg:px-12 pt-6 md:pt-10 text-background/85">
        <p className="font-heading text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em]">
          {t("hero.coords")}
        </p>
        <p className="font-heading text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] hidden sm:block">
          {t("hero.overline")}
        </p>
      </div>

      {/* Headline + CTAs anchored to bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-4 sm:px-8 lg:px-12 pb-10 md:pb-16 lg:pb-20">
        <div className="max-w-6xl">
          <h1 className="font-display font-semibold text-background leading-[0.95] text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight animate-fade-up">
            {t("hero.headline1")}
            <br />
            <span className="text-background/75">{t("hero.headline2")}</span>
          </h1>

          <p
            className="mt-6 md:mt-8 font-body text-base md:text-lg text-background/85 max-w-xl leading-relaxed animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            {t("hero.body")}
          </p>

          <div
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-up"
            style={{ animationDelay: "320ms" }}
          >
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-background text-foreground font-heading font-semibold text-[13px] uppercase tracking-[0.25em] px-9 py-4 hover:bg-accent hover:text-accent-foreground transition-colors duration-500"
            >
              {t("hero.ctaShop")}
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center border border-background/70 text-background font-heading font-semibold text-[13px] uppercase tracking-[0.25em] px-9 py-4 hover:bg-background hover:text-foreground transition-colors duration-500"
            >
              {t("hero.ctaStory")}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-4 right-4 sm:right-8 z-10 hidden md:flex items-center gap-3 text-background/65">
        <span className="font-heading text-[10px] uppercase tracking-[0.35em]">{t("hero.scroll")}</span>
        <span aria-hidden className="block w-10 h-px bg-background/40" />
      </div>
    </section>
  );
};

export default Hero;
