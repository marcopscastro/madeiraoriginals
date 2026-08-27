import { useTranslation } from "react-i18next";
import { Link } from "@/components/LocaleLink";

/**
 * Homepage case study band — references the same client as the /studio case study.
 */
const HomeCaseStudy = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
          {t("home.caseStudy.eyebrow")}
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] max-w-3xl">
          {t("home.caseStudy.heading")}
        </h2>
        <p className="mt-8 font-body text-base md:text-lg opacity-90 max-w-2xl leading-relaxed">
          {t("home.caseStudy.body")}
        </p>
        <p className="mt-6 font-heading text-[11px] font-bold uppercase tracking-[0.3em] opacity-60">
          {t("studio.projects.posBrasa.eyebrow")}
        </p>
        <Link
          to="/studio"
          className="mt-10 inline-flex items-center justify-center border border-secondary-foreground/60 text-secondary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-secondary-foreground hover:text-secondary transition-colors"
        >
          {t("home.caseStudy.cta")} →
        </Link>
      </div>
    </section>
  );
};

export default HomeCaseStudy;
