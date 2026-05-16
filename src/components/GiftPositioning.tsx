import { useTranslation } from "react-i18next";

const GiftPositioning = () => {
  const { t } = useTranslation();
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
      <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
        {t("giftPositioning.overline")}
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-5">
        {t("giftPositioning.heading")}
      </h2>
      <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        {t("giftPositioning.body")}
      </p>
    </section>
  );
};

export default GiftPositioning;
