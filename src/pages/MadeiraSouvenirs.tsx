import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useShopifyProducts";

const picks = [
  {
    eyebrow: "For the souvenir-hater",
    title: "A Madeira T-Shirt that isn't a tourist tee.",
    body: "Heavyweight cotton, island-rooted graphics — coordinates, levadas, Madeiran humour. Worn properly, not folded into a suitcase as an afterthought.",
    cta: "Shop Madeira T-Shirts",
    href: "/madeira-t-shirts",
  },
  {
    eyebrow: "For the diaspora",
    title: "An Atlantic-weight Madeira hoodie.",
    body: "Thicker than a holiday memory. The piece you actually keep — built for Madeira's microclimates and every diaspora winter.",
    cta: "Shop Madeira Hoodies",
    href: "/madeira-hoodies",
  },
  {
    eyebrow: "For the everyday",
    title: "Caps, totes & quiet island accessories.",
    body: "Editorial branding. No flag prints, no rooster mascots — just well-made pieces with Madeira embedded in the details.",
    cta: "Shop Accessories",
    href: "/madeira-accessories",
  },
  {
    eyebrow: "For under €15",
    title: "Madeira stickers — small, durable, real.",
    body: "Die-cut UV DTF stickers built to outlast the airport magnets. Coordinates, micro-icons, real Madeira culture.",
    cta: "Shop Stickers",
    href: "/madeira-stickers",
  },
];

const buyingGuide = [
  {
    n: "01",
    title: "Skip the airport.",
    body: "Funchal airport souvenirs are designed for the 20-minute browse before boarding — not for keeping. Pieces made on the island, by people from the island, hold up better.",
  },
  {
    n: "02",
    title: "Look for the demonym.",
    body: "‘Madeira’ on a magnet is geography. ‘Madeiran’ in the design — language, references, place names — is culture. The second one ages well.",
  },
  {
    n: "03",
    title: "Choose pieces you'd wear at home.",
    body: "The best Madeira souvenir is one you'd buy if you weren't on holiday. Premium tees, hoodies, caps, totes — same standard as your everyday wardrobe.",
  },
  {
    n: "04",
    title: "Buy direct, ship anywhere.",
    body: "You don't need to fit it in your suitcase. We ship Madeira gifts worldwide from the island — to mainland Portugal, the EU, the UK, the US and beyond.",
  },
];

const faqs = [
  {
    q: "What are the best souvenirs from Madeira?",
    a: "The best souvenirs from Madeira are pieces actually made on the island — premium streetwear (Madeira t-shirts, hoodies, caps), poncha and Madeira wine from local producers, embroidery from established Funchal ateliers, and bolo do caco from a real bakery. Skip the airport magnets and rooster figurines.",
  },
  {
    q: "What to buy in Madeira (and what to skip)?",
    a: "Buy: Madeiran streetwear and accessories from local brands, Madeira wine from a producer cellar (Blandy's, D'Oliveiras), poncha from a São Vicente or Câmara de Lobos bar, and embroidery from a credentialed atelier. Skip: anything sold in three different airport shops at three different prices, plastic figurines of folkloric dancers, and 'I love Madeira' t-shirts.",
  },
  {
    q: "What are good Funchal souvenirs?",
    a: "In Funchal specifically, look for: streetwear from Madeiran brands (skip the harbour-front tourist shops), Madeira wine from a tasting cellar in São Pedro or Avenida Arriaga, embroidery from Bordal or Patrício & Gouveia on Rua dos Ferreiros, and poncha kits from a proper grocer. Funchal souvenirs done right are island-made, not import-and-print.",
  },
  {
    q: "Can I order Madeira souvenirs online from outside Portugal?",
    a: "Yes. Madeira Originals ships premium Madeira gifts and apparel worldwide — to mainland Portugal, the EU, UK, US and the diaspora. You don't need to be on the island, or to fit anything in a suitcase, to buy properly.",
  },
  {
    q: "What is a typical Madeira gift?",
    a: "Typical Madeira gifts include Madeira wine, poncha, embroidery (Bordado da Madeira), wickerwork from Camacha, and more recently, modern Madeiran streetwear and accessories. The new wave of Madeira gifts skips the souvenir-shop clichés in favour of pieces locals would actually wear or use.",
  },
];

const MadeiraSouvenirs = () => {
  const { data: products = [], isLoading } = useProducts(8, "tag:streetwear");

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
        {/* Hero */}
        <section className="border-b border-foreground/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              The Madeira Souvenirs Guide
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-semibold text-foreground leading-[1.02]">
              Real Madeira souvenirs.
              <br />
              <span className="italic">0% tourist trap.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto font-body text-base md:text-lg text-muted-foreground">
              A curated guide to the best souvenirs from Madeira and Funchal — gift-ready picks
              from a Madeiran streetwear brand based in São Vicente. No magnets. No rooster
              figurines. Worldwide shipping.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/madeira-gifts"
                className="bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:opacity-90 transition-opacity"
              >
                Shop Gifts From Madeira
              </Link>
              <Link
                to="/journal/best-souvenirs-from-madeira"
                className="border border-foreground text-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                Read the Long Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Curated picks */}
        <section className="border-b border-foreground/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                Curated Picks
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                Gift-ready Madeira souvenirs by who they're for.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
              {picks.map((p) => (
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
                    to={p.href}
                    className="mt-6 inline-block self-start border border-foreground font-heading font-bold text-xs uppercase tracking-widest px-5 py-3 text-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    {p.cta} →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Buying guide */}
        <section className="border-b border-foreground/10 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                Buying Guide
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                What to buy in Madeira (and what to skip).
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {buyingGuide.map((b) => (
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

        {/* Live products */}
        <section className="border-b border-foreground/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div className="max-w-xl">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                  In Stock
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                  Madeira gifts shipping today.
                </h2>
                <p className="mt-3 font-body text-base text-muted-foreground">
                  From São Vicente, Madeira to anywhere in the world.
                </p>
              </div>
              <Link
                to="/madeira-gifts"
                className="font-heading text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              >
                View all gifts →
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
                <p className="font-display text-xl text-foreground">No gifts in stock yet.</p>
                <p className="mt-2 font-body text-muted-foreground">
                  New drops land regularly. Browse the full shop in the meantime.
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

        {/* FAQ */}
        <section className="border-b border-foreground/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
                FAQ
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                Madeira souvenirs — questions, answered.
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

        {/* Closing CTA */}
        <section>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05]">
              Madeira souvenirs,
              <br />
              <span className="italic">made on the island.</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto font-body text-base md:text-lg text-muted-foreground">
              Designed in São Vicente, Madeira. Shipped worldwide.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/madeira-gifts"
                className="bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:opacity-90 transition-opacity"
              >
                Shop Madeira Gifts
              </Link>
              <Link
                to="/madeira-stickers"
                className="border border-foreground text-foreground font-heading font-bold text-xs uppercase tracking-widest px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                Under €15: Stickers
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
