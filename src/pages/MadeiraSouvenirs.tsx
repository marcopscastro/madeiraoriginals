import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useShopifyProducts";

const pickHrefs = ["/madeira-t-shirts", "/madeira-hoodies", "/madeira-accessories", "/madeira-stickers"];

const MadeiraSouvenirs = () => {
  const { t } = useTranslation();
  const { data: products = [], isLoading } = useProducts(8, "tag:streetwear");

  const picks = t("souvenirs.picks", { returnObjects: true }) as { eyebrow: string; title: string; body: string; cta: string }[];
  const guide = t("souvenirs.guide", { returnObjects: true }) as { title: string; body: string }[];
  const faqs = t("souvenirs.faqs", { returnObjects: true }) as { q: string; a: string }[];

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://madeiraoriginals.pt/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Madeira Souvenirs",
        item: "https://madeiraoriginals.pt/madeira-souvenirs",
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO routeKey="madeiraSouvenirs" jsonLd={[breadcrumbsLd, faqLd]} />
      <Header />
      <main>
        <section className="border-b border-foreground/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              {t("souvenirs.hero.overline")}
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-semibold text-foreground leading-[1.02]">
              {t("souvenirs.hero.headingA")}
              <br />
              <span className="italic">{t("souvenirs.hero.headingB")}</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto font-body text-base md:text-lg text-muted-foreground">
              {t("souvenirs.hero.body")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/madeira-gifts"
                className="bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:opacity-90 transition-opacity"
              >
                {t("souvenirs.hero.ctaShop")}
              </Link>
              <Link
                to="/journal/best-souvenirs-from-madeira"
                className="border border-foreground text-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                {t("souvenirs.hero.ctaRead")}
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-foreground/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                {t("souvenirs.picksOverline")}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                {t("souvenirs.picksHeading")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
              {picks.map((p, i) => (
                <article key={p.title} className="bg-background p-8 md:p-10 flex flex-col">
                  <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
                    {p.eyebrow}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
                    {p.body}
                  </p>
                  <Link
                    to={pickHrefs[i]}
                    className="mt-6 inline-block self-start border border-foreground font-heading font-bold text-xs uppercase tracking-widest px-5 py-3 text-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    {p.cta} →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-foreground/10 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                {t("souvenirs.guideOverline")}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                {t("souvenirs.guideHeading")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {guide.map((b, i) => (
                <div key={b.title}>
                  <p className="font-heading text-xs font-bold tracking-[0.3em] text-primary mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {b.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-foreground/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div className="max-w-xl">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                  {t("souvenirs.stockOverline")}
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                  {t("souvenirs.stockHeading")}
                </h2>
                <p className="mt-3 font-body text-base text-muted-foreground">
                  {t("souvenirs.stockBody")}
                </p>
              </div>
              <Link
                to="/madeira-gifts"
                className="font-heading text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                {t("souvenirs.viewAll")}
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-muted" />
                    <div className="h-4 bg-muted mt-4 w-2/3" />
                    <div className="h-4 bg-muted mt-2 w-1/3" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-foreground/15">
                <p className="font-display text-xl text-foreground">{t("souvenirs.emptyHeading")}</p>
                <p className="mt-2 font-body text-muted-foreground">
                  {t("souvenirs.emptyBody")}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 8).map((p) => (
                  <ProductCard key={p.node.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="border-b border-foreground/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                {t("souvenirs.faqOverline")}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                {t("souvenirs.faqHeading")}
              </h2>
            </div>
            <dl className="space-y-8">
              {faqs.map((f) => (
                <div key={f.q} className="border-b border-foreground/10 pb-8 last:border-b-0">
                  <dt className="font-display text-lg md:text-xl font-semibold text-foreground mb-2">
                    {f.q}
                  </dt>
                  <dd className="font-body text-base text-muted-foreground leading-relaxed">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05]">
              {t("souvenirs.closingA")}
              <br />
              <span className="italic">{t("souvenirs.closingB")}</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto font-body text-base md:text-lg text-muted-foreground">
              {t("souvenirs.closingBody")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/madeira-gifts"
                className="bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:opacity-90 transition-opacity"
              >
                {t("souvenirs.closingCtaGifts")}
              </Link>
              <Link
                to="/madeira-stickers"
                className="border border-foreground text-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                {t("souvenirs.closingCtaStickers")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MadeiraSouvenirs;
