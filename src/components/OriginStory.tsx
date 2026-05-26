import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SECTION_IMAGES } from "@/lib/sectionImages";

const OriginStory = () => {
  const { t } = useTranslation();
  const facts = t("origin.facts", { returnObjects: true }) as { k: string; v: string }[];

  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-32 md:py-48 grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-6">
            {t("origin.overline")}
          </p>
          <h2 className="font-display font-medium text-foreground leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl">
            {t("origin.headingA")} <span className="text-foreground/40">{t("origin.headingB")}</span>
          </h2>
          <div className="mt-8 space-y-5 max-w-xl">
            <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed">
              {t("origin.body1")}
            </p>
            <p className="font-body text-base md:text-lg text-foreground/70 leading-relaxed">
              {t("origin.body2")}
            </p>
          </div>

          <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 border-t border-foreground/15 pt-8 max-w-xl">
            {facts.map((f) => (
              <div key={f.k}>
                <dt className="font-heading text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/55">
                  {f.k}
                </dt>
                <dd className="mt-2 font-display text-lg md:text-xl text-foreground tracking-tight">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            to="/about"
            className="mt-12 inline-flex items-center font-heading text-[12px] font-semibold uppercase tracking-[0.3em] text-foreground hover:text-accent transition-colors border-b border-foreground pb-1"
          >
            {t("origin.cta")} →
          </Link>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-foreground">
            <picture>
              <source media="(max-width: 767px)" srcSet={SECTION_IMAGES.about.mobile} />
              <img
                src={SECTION_IMAGES.about.desktop}
                alt={t("origin.imageAlt")}
                width={1080}
                height={1350}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover img-cinematic"
              />
            </picture>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-background/85">
              <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.3em]">
                {t("origin.captionPlace")}
              </span>
              <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.3em]">
                32.8° N · 17.0° W
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OriginStory;
