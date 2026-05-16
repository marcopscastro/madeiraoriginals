import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="bg-background py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
          {t("aboutUs.overline")}
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6 text-foreground leading-tight">
          {t("aboutUs.headingA")}<br />
          <span className="italic">{t("aboutUs.headingB")}</span>
        </h2>
        <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
          {t("aboutUs.bodyPre")}<em>{t("aboutUs.bodyEm")}</em>{t("aboutUs.bodyPost")}
        </p>
        <Link
          to="/about"
          className="mt-8 inline-flex items-center justify-center border border-foreground text-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
        >
          {t("aboutUs.cta")}
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;
