import { useTranslation } from "react-i18next";
import { Link } from "@/components/LocaleLink";
import firePit from "@/assets/work/brasa-viva-fire-pit.jpg";
import skewers from "@/assets/work/brasa-viva-skewers.jpg";
import badge from "@/assets/work/brasa-viva-badge.jpg";
import oven from "@/assets/work/brasa-viva-oven.jpg";

/**
 * Homepage case study band — references the same client as the /studio case study.
 */
const HomeCaseStudy = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 md:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            {t("home.caseStudy.eyebrow")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] text-balance">
            {t("home.caseStudy.heading")}
          </h2>
          <p className="mt-8 font-body text-base md:text-lg opacity-90 leading-relaxed">
            {t("home.caseStudy.body")}
          </p>
          <p className="mt-6 font-heading text-[11px] font-bold uppercase tracking-[0.3em] opacity-60">
            {t("studio.projects.posBrasa.eyebrow")}
          </p>
          <Link
            to="/studio"
            className="mt-10 inline-flex h-14 items-center justify-center border border-secondary-foreground/60 text-secondary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 hover:bg-secondary-foreground hover:text-secondary transition-colors"
          >
            {t("home.caseStudy.cta")} →
          </Link>
        </div>

        <div className="lg:col-span-6 grid grid-cols-3 gap-px bg-secondary-foreground/15 border border-secondary-foreground/15">
          <div className="col-span-2 relative aspect-[4/3] overflow-hidden img-placeholder-dark">
            <img
              src={caseStudyImg}
              alt={t("home.caseStudy.imageAlt")}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover img-cinematic"
            />
          </div>
          <div className="relative aspect-[2/3] overflow-hidden bg-background">
            <img
              src={caseStudyProduct}
              alt={t("home.caseStudy.productAlt")}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-contain p-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCaseStudy;
