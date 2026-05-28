import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import fogRoad from "@/assets/divider-fog-road.jpg";

const Diaspora = () => {
  const { t } = useTranslation();
  return (
    <section className="relative w-full bg-foreground text-background grain overflow-hidden">
      <img
        src={fogRoad}
        alt={t("diaspora.imageAlt")}
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover img-cinematic opacity-50"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/40" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-28 md:py-44 text-center">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.45em] text-background/70 mb-8">
          {t("diaspora.overline")}
        </p>
        <h2 className="font-display font-medium leading-[0.98] tracking-tight text-4xl sm:text-6xl md:text-7xl">
          {t("diaspora.headingA")}
          <br />
          <span className="text-background/55">{t("diaspora.headingB")}</span>
        </h2>
        <p className="mt-10 font-body text-base md:text-lg leading-relaxed text-background/80 max-w-2xl mx-auto">
          {t("diaspora.body")}
        </p>

        <div className="mt-12 md:mt-14 flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center">
          <Link
            to="/first-drop"
            className="inline-flex items-center justify-center bg-background text-foreground font-heading font-semibold text-[12px] uppercase tracking-[0.3em] px-10 py-[18px] hover:bg-accent hover:text-accent-foreground transition-colors duration-500"
          >
            {t("diaspora.ctaShop")}
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center text-background font-heading font-semibold text-[12px] uppercase tracking-[0.3em] px-2 py-[18px] border-b border-background/60 hover:border-background hover:text-background/90 transition-colors duration-500"
          >
            {t("diaspora.ctaStory")} →
          </Link>
        </div>

        <p className="mt-12 font-heading text-[10px] uppercase tracking-[0.4em] text-background/45">
          {t("diaspora.designedIn")}
        </p>
      </div>
    </section>
  );
};

export default Diaspora;

