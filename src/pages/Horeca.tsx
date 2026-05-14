import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import PageSEO from "@/components/PageSEO";
import { useProducts } from "@/hooks/useShopifyProducts";
import HorecaLeadForm from "@/components/HorecaLeadForm";
import horecaHero from "@/assets/horeca-hero.jpg";

const Horeca = () => {
  const { data: products = [], isLoading } = useProducts(20, "tag:horeca");

  return (
    <div className="min-h-screen bg-background">
      <PageSEO routeKey="horeca" />
      <Header />
      <main>
        <section className="relative">
          <img
            src={horecaHero}
            alt="Branded pint glasses on a Madeira bar counter at dusk"
            width={1600}
            height={900}
            className="w-full h-[55vh] md:h-[65vh] object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-secondary/70" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full text-secondary-foreground">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
                Hotels · Restaurants · Cafés · Bars
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                HORECA — custom glassware,<br />
                <span className="italic">built for your brand.</span>
              </h1>
              <p className="mt-6 font-body text-base md:text-lg leading-relaxed opacity-90 max-w-2xl mx-auto">
                Premium pint glasses and branded glassware for the Madeiran hospitality industry.
                Low minimums, full custom branding, designed and printed locally.
              </p>
              <a href="#quote" className="mt-8 inline-flex items-center justify-center bg-accent text-accent-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:opacity-90 transition-opacity">
                Request a Quote
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-10">
            HORECA Products
          </h2>
          {isLoading ? (
            <p className="text-center font-body text-muted-foreground py-16">Loading…</p>
          ) : products.length === 0 ? (
            <p className="text-center font-body text-muted-foreground py-16">
              No HORECA products listed yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          )}
        </section>

        <section id="quote" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
          <div className="text-center mb-8">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">Request a quote</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Tell us about your business.
            </h2>
            <p className="mt-3 font-body text-muted-foreground">We reply within 24 hours with pricing and lead times.</p>
          </div>
          <HorecaLeadForm />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Horeca;
