import { useTranslation } from "react-i18next";

const HomePositioning = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 md:py-28">
        <h2 className="font-display font-medium text-foreground leading-[1.05] tracking-tight text-3xl md:text-5xl max-w-4xl text-balance">
          {t("home.positioning.heading")}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-12 max-w-5xl">
          <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed">
            {t("home.positioning.body1")}
          </p>
          <p className="font-body text-base md:text-lg text-foreground/70 leading-relaxed">
            {t("home.positioning.body2")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePositioning;
