import { useTranslation } from "react-i18next";

const NoTouristTrap = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6">
          {t("noTouristTrap.overline")}
        </p>
        <h2 className="font-display text-5xl md:text-7xl font-semibold leading-[0.95]">
          {t("noTouristTrap.headingMain")} <span className="italic text-accent">{t("noTouristTrap.headingItalic")}</span>
        </h2>
        <p className="mt-8 font-body text-base md:text-lg leading-relaxed opacity-90 max-w-2xl mx-auto">
          {t("noTouristTrap.body")}
        </p>
      </div>
    </section>
  );
};

export default NoTouristTrap;
