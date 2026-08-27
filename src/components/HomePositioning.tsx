import { useTranslation } from "react-i18next";

const HomePositioning = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-24 md:py-32">
        <h2 className="font-display font-medium text-foreground leading-[1.05] tracking-tight text-3xl md:text-5xl">
          {t("home.positioning.heading")}
        </h2>
        <p className="mt-8 font-body text-base md:text-lg text-foreground/80 leading-relaxed max-w-2xl">
          {t("home.positioning.body1")}
        </p>
        <p className="mt-4 font-body text-base md:text-lg text-foreground/70 leading-relaxed max-w-2xl">
          {t("home.positioning.body2")}
        </p>
      </div>
    </section>
  );
};

export default HomePositioning;
