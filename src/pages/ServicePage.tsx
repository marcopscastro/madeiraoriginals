import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "@/components/LocaleLink";
import { LOCAL_BUSINESS_JSONLD } from "@/lib/seo";

export type ServiceKey = "design" | "apparel" | "vinyl";

interface Props {
  serviceKey: ServiceKey;
  path: string;
}

/**
 * Shared template for the studio service pages (/design, /apparel-printing,
 * /vinyl-signage). Copy lives in i18n under `services.<key>`.
 */
const ServicePage = ({ serviceKey, path }: Props) => {
  const { t } = useTranslation();
  const base = `services.${serviceKey}`;
  const list = t(`${base}.list`, { returnObjects: true }) as string[];
  const process = t(`${base}.process`, { returnObjects: true, defaultValue: [] }) as string[];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t(`${base}.seoTitle`)}
        description={t(`${base}.seoDescription`)}
        path={path}
        jsonLd={LOCAL_BUSINESS_JSONLD}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-secondary text-secondary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-accent mb-6">
              {t("tagline")}
            </p>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] opacity-70 mb-4">
              {t(`${base}.overline`)}
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] max-w-4xl">
              {t(`${base}.hero`)}
            </h1>
            <p className="mt-8 font-body text-base md:text-lg opacity-90 max-w-2xl leading-relaxed">
              {t(`${base}.intro`)}
            </p>
          </div>
        </section>

        {/* What's included */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-8">
            {t("services.listHeading")}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {list.map((item) => (
              <li
                key={item}
                className="flex gap-3 font-body text-base md:text-lg text-foreground/90 leading-relaxed border-t border-foreground/15 pt-4"
              >
                <span aria-hidden className="font-heading text-accent font-bold shrink-0">
                  →
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {serviceKey === "apparel" && (
            <div className="mt-14 relative aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden img-placeholder-dark border border-foreground/15">
              <img
                src={brasaVivaFirePit}
                alt={t("home.caseStudy.alts.firePit")}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover img-cinematic"
              />
            </div>
          )}
        </section>

        {/* Process */}
        {process.length > 0 && (
          <section className="border-t border-foreground/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-8">
                {t("services.processHeading")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-foreground/15 border border-foreground/15">
                {process.map((step, i) => (
                  <article key={step} className="bg-background p-6 md:p-8">
                    <p className="font-heading text-xs font-bold uppercase tracking-widest text-primary mb-4">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="font-body text-base text-muted-foreground leading-relaxed">{step}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <ServiceQuoteCTA />
      </main>
      <Footer />
    </div>
  );
};

/** Shared closing quote CTA used on every service page. */
export const ServiceQuoteCTA = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 md:py-28">
        <div className="max-w-3xl">
        <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05]">
          {t("services.cta.heading")}
        </h2>
        <p className="mt-6 font-body text-base md:text-lg opacity-90 leading-relaxed">
          {t("services.cta.body")}
        </p>
        <Link
          to="/contact"
          className="mt-10 inline-flex h-14 items-center justify-center bg-accent text-accent-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 hover:opacity-90 transition-opacity"
        >
          {t("services.cta.button")}
        </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicePage;
