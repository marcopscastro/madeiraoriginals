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
      <div className="relative max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-36 md:py-56 text-center">
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
      </div>
    </section>
  );
};

export default Diaspora;
