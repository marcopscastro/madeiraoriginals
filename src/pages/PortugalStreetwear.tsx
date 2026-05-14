import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useShopifyProducts";

const lanes = [
  {
    href: "/madeira-t-shirts",
    eyebrow: "T-Shirts",
    title: "Tees",
    body: "Heavyweight cotton tees with island-rooted graphics — coordinates, levadas, laurissilva, Madeiran humour.",
  },
  {
    href: "/madeira-accessories",
    eyebrow: "Bags & Totes",
    title: "Bags",
    body: "Totes and carry pieces. Quiet branding, built to wear in.",
  },
  {
    href: "/madeira-accessories",
    eyebrow: "Headwear",
    title: "Caps & Beanies",
    body: "Caps and beanies in Atlantic-weight materials. Modern silhouettes, island detailing.",
  },
];

const beliefs = [
  {
    n: "01",
    title: "Portuguese, but specifically Madeiran.",
    body: "Most ‘Portugal’ streetwear is Lisbon or Porto by default. We design from São Vicente, on Madeira's north coast — Atlantic, volcanic, off-continental. That's the lens.",
  },
  {
    n: "02",
    title: "0% tourist trap.",
    body: "No flag prints, no rooster mascots, no airport-shop clichés. Our graphics come from the actual island — coordinates, microclimates, language, ritual.",
  },
  {
    n: "03",
    title: "Designed in PT, made for everywhere.",
    body: "Pieces are designed in Madeira and shipped worldwide. Built for the diaspora, for visitors who saw the real island, and for anyone who wants Portuguese streetwear that means something.",
  },
];

const PortugalStreetwear = () => {
  const { data: products = [], isLoading } = useProducts(6, "tag:streetwear");

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
        {/* Hero */}
        <section className="border-b border-foreground/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              Portugal Streetwear · Made in Madeira
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-semibold text-foreground leading-[1.02]">
              A Portuguese streetwear brand
              <br />
              <span className="italic">from an island, not a capital.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto font-body text-base md:text-lg text-muted-foreground">
              Madeira Originals is a premium Portuguese streetwear brand born in São Vicente,
              Madeira. Heavyweight tees, technical headwear, everyday carry — designed in PT,
              shipped worldwide.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/madeira-streetwear"
                className="bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:opacity-90 transition-opacity"
              >
                Shop Streetwear
              </Link>
              <Link
                to="/about"
                className="border border-foreground text-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                About the Brand
              </Link>
            </div>
          </div>
        </section>

        {/* Lanes: Tees / Bags / Headwear */}
        <section className="border-b border-foreground/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                The Line
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                Tees, bags, headwear.
              </h2>
              <p className="mt-3 font-body text-base text-muted-foreground">
                A focused Portuguese streetwear line. No filler.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10">
              {lanes.map((l) => (
                <Link
                  key={l.title}
                  to={l.href}
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
                    Shop {l.title} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* What "Portuguese streetwear" means to us */}
        <section className="border-b border-foreground/10 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                Positioning
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                What “Portuguese streetwear” means to us.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {beliefs.map((b) => (
                <div key={b.n}>
                  <p className="font-heading text-xs font-bold tracking-[0.3em] text-primary mb-3">
                    {b.n}
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

        {/* Live products from the streetwear tag */}
        <section className="border-b border-foreground/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div className="max-w-xl">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                  In Stock
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                  Currently shipping from Madeira.
                </h2>
              </div>
              <Link
                to="/madeira-streetwear"
                className="font-heading text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                View all streetwear →
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
                <p className="font-display text-xl text-foreground">No streetwear in stock yet.</p>
                <p className="mt-2 font-body text-muted-foreground">
                  New drops land regularly — check back, or browse the full shop.
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

        {/* Footer CTA band */}
        <section>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05]">
              Portuguese streetwear,
              <br />
              <span className="italic">made on the island.</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto font-body text-base md:text-lg text-muted-foreground">
              Designed in São Vicente, Madeira. Shipped to mainland Portugal, the EU, the UK, the US
              and the diaspora worldwide.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/madeira-t-shirts"
                className="bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:opacity-90 transition-opacity"
              >
                Shop Tees
              </Link>
              <Link
                to="/madeira-accessories"
                className="border border-foreground text-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                Shop Bags & Caps
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
