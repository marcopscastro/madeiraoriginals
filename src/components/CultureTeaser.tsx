import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CultureTeaser = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-secondary text-secondary-foreground py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
          {t("cultureTeaser.overline")}
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6 leading-tight">
          {t("cultureTeaser.headingA")}<br />
          <span className="italic">{t("cultureTeaser.headingB")}</span>
        </h2>
        <p className="font-body text-base md:text-lg leading-relaxed opacity-90 max-w-2xl mx-auto">
          {t("cultureTeaser.body")}
        </p>
        <Link
          to="/culture"
          className="mt-8 inline-flex items-center justify-center border border-secondary-foreground text-secondary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-secondary-foreground hover:text-secondary transition-colors"
        >
          {t("cultureTeaser.cta")}
        </Link>
      </div>
    </section>
  );
};

export default CultureTeaser;
