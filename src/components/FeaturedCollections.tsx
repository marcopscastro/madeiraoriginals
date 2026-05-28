import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FEATURED_COLLECTION_IMAGES } from "@/lib/sectionImages";

const FeaturedCollections = () => {
  const { t } = useTranslation();
  const items = t("collections.items", { returnObjects: true }) as {
    index: string;
    title: string;
    body: string;
    cta: string;
    to: string;
  }[];

  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-24 md:pt-32 pb-10 md:pb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-6">
              {t("collections.overline")}
            </p>
            <h2 className="font-display font-medium text-foreground leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl">
              {t("collections.headingA")}{" "}
              <span className="text-foreground/40">{t("collections.headingB")}</span>
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center self-start md:self-end font-heading text-[12px] font-semibold uppercase tracking-[0.3em] text-foreground hover:text-accent transition-colors"
          >
            {t("collections.viewAll")} →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-28 md:pb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20 md:gap-x-12 md:gap-y-32">
          {items.map((item, i) => (
            <Link
              key={item.title}
              to={item.to}
              className="group block"
            >
              <div className="relative overflow-hidden bg-foreground aspect-[4/5]">
                <picture>
                  <source media="(max-width: 767px)" srcSet={FEATURED_COLLECTION_IMAGES[i].mobile} />
                  <img
                    src={FEATURED_COLLECTION_IMAGES[i].desktop}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover img-cinematic transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
                  />
                </picture>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent"
                />
                <div className="absolute top-5 left-5">
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.35em] text-background/85">
                    {item.index}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-body text-sm md:text-base text-foreground/70 leading-relaxed max-w-md">
                    {item.body}
                  </p>
                </div>
                <span className="hidden sm:inline-flex shrink-0 mt-2 font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/60 group-hover:text-accent transition-colors">
                  {item.cta} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
