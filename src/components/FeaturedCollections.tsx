import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import imgCoast from "@/assets/hero-volcanic-coast.jpg";
import imgBasalt from "@/assets/divider-basalt-texture.jpg";
import imgVillage from "@/assets/origin-sao-vicente-village.jpg";
import imgFog from "@/assets/divider-fog-road.jpg";

const IMAGES = [imgCoast, imgFog, imgVillage, imgBasalt];

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 md:pt-28 pb-8 md:pb-12">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 md:gap-x-8 md:gap-y-24">
          {items.map((item, i) => (
            <Link
              key={item.title}
              to={item.to}
              className="group block"
            >
              <div className="relative overflow-hidden bg-foreground aspect-[4/5]">
                <img
                  src={IMAGES[i]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                />
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
