import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useShopifyProducts";

const laneHrefs = ["/madeira-t-shirts", "/madeira-accessories", "/madeira-accessories"];

const PortugalStreetwear = () => {
  const { t } = useTranslation();
  const { data: products = [], isLoading } = useProducts(6, "tag:streetwear");

  const lanes = t("pwear.lanes", { returnObjects: true }) as { eyebrow: string; title: string; body: string }[];
  const beliefs = t("pwear.beliefs", { returnObjects: true }) as { title: string; body: string }[];

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://madeiraoriginals.pt/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portugal Streetwear",
        item: "https://madeiraoriginals.pt/portugal-streetwear",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO routeKey="portugalStreetwear" jsonLd={breadcrumbsLd} />
      <Header />
      <main>
        <section className="border-b border-foreground/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              {t("pwear.hero.overline")}
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-semibold text-foreground leading-[1.02]">
              {t("pwear.hero.headingA")}
              <br />
              <span className="italic">{t("pwear.hero.headingB")}</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto font-body text-base md:text-lg text-muted-foreground">
              {t("pwear.hero.body")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/madeira-streetwear"
                className="bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:opacity-90 transition-opacity"
              >
                {t("pwear.hero.ctaShop")}
              </Link>
              <Link
                to="/about"
                className="border border-foreground text-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                {t("pwear.hero.ctaAbout")}
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-foreground/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                {t("pwear.lanesOverline")}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                {t("pwear.lanesHeading")}
              </h2>
              <p className="mt-3 font-body text-base text-muted-foreground">
                {t("pwear.lanesSub")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
              {lanes.map((l, i) => (
                <Link
                  key={l.title}
                  to={laneHrefs[i]}
                  className="group bg-background p-8 md:p-10 flex flex-col hover:bg-muted/40 transition-colors"
                >
                  <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
                    {l.eyebrow}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
                    {l.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
                    {l.body}
                  </p>
                  <span className="mt-6 font-heading text-xs font-bold uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                    {t("pwear.shopLane", { title: l.title })}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-foreground/10 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                {t("pwear.beliefsOverline")}
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                {t("pwear.beliefsHeading")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {beliefs.map((b, i) => (
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
                  {t("pwear.stockOverline")}
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                  {t("pwear.stockHeading")}
                </h2>
              </div>
              <Link
                to="/madeira-streetwear"
                className="font-heading text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                {t("pwear.viewAll")}
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-muted" />
                    <div className="h-4 bg-muted mt-4 w-2/3" />
                    <div className="h-4 bg-muted mt-2 w-1/3" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-foreground/15">
                <p className="font-display text-xl text-foreground">{t("pwear.emptyHeading")}</p>
                <p className="mt-2 font-body text-muted-foreground">
                  {t("pwear.emptyBody")}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 6).map((p) => (
                  <ProductCard key={p.node.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05]">
              {t("pwear.closingA")}
              <br />
              <span className="italic">{t("pwear.closingB")}</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto font-body text-base md:text-lg text-muted-foreground">
              {t("pwear.closingBody")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/madeira-t-shirts"
                className="bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:opacity-90 transition-opacity"
              >
                {t("pwear.closingCtaTees")}
              </Link>
              <Link
                to="/madeira-accessories"
                className="border border-foreground text-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                {t("pwear.closingCtaBags")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PortugalStreetwear;
