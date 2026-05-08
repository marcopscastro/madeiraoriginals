import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import studioImg from "@/assets/production-studio.jpg";
import { LOCAL_BUSINESS_JSONLD } from "@/lib/seo";
import ProductionQuoteForm from "@/components/ProductionQuoteForm";

const services = [
  {
    id: "custom-apparel",
    title: "Custom Apparel Printing",
    body: "Premium apparel printing for brands, businesses, restaurants, events, teams, and creators. Ideal for uniforms, merchandise, limited drops, and promotional clothing.",
  },
  {
    id: "dtf",
    title: "DTF Gang Sheets",
    body: "High-resolution DTF gang sheets for efficient apparel production. Suitable for logos, graphics, brand marks, sponsor layouts, and multi-design print runs.",
  },
  {
    id: "uv-dtf",
    title: "UV DTF Stickers",
    body: "Durable UV DTF stickers for hard surfaces — glass, packaging, signs, promotional items, and business merchandise.",
  },
  {
    id: "business-merch",
    title: "Business Merchandise",
    body: "Custom merchandise for cafés, restaurants, hotels, tourism businesses, local brands, and event organizers.",
  },
  {
    id: "rally",
    title: "Rally & Performance Teams",
    body: "Technical design and production for rally crews and performance teams — sponsor layouts, data-style graphics, apparel, and durable decals.",
  },
];

const trust = [
  "Restaurants",
  "Hotels",
  "Cafés",
  "Local brands",
  "Rally teams",
  "Events",
  "Sports teams",
  "Creators",
];

const ProductionStudio = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Production Studio Madeira | DTF, UV DTF & Custom Apparel Printing"
      description="Madeira Originals Production Studio offers custom apparel printing, DTF gang sheets, UV DTF stickers, business merch, and rally team graphics in Madeira."
      path="/production-studio"
      jsonLd={LOCAL_BUSINESS_JSONLD}
    />
    <Header />
    <main>
      <section className="grid md:grid-cols-2 gap-0 items-stretch border-b border-foreground/10">
        <div className="flex items-center px-6 sm:px-10 lg:px-16 py-16 md:py-24">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              Madeira Originals — Production Studio
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground leading-[1.05]">
              Custom apparel.<br />
              <span className="italic">Built in Madeira.</span>
            </h1>
            <p className="mt-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              Custom apparel, DTF gang sheets, UV DTF stickers, and technical print solutions for
              brands, businesses, restaurants, teams, and creators.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="#quote"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:opacity-90 transition-opacity"
              >
                Request a Quote
              </Link>
              <Link
                to="#services"
                className="inline-flex items-center justify-center border border-foreground text-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
              >
                See Services
              </Link>
            </div>
          </div>
        </div>
        <div className="order-first md:order-last">
          <img
            src={studioImg}
            alt="Custom apparel printing studio with DTF gang sheet by Madeira Originals in São Vicente, Madeira"
            width={1280}
            height={960}
            fetchPriority="high"
            className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
          />
        </div>
      </section>

      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05] mb-12">
          Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
          {services.map((s, i) => (
            <article id={s.id} key={s.id} className="bg-background p-8 md:p-10 scroll-mt-24">
              <p className="font-heading text-xs font-bold uppercase tracking-widest text-primary mb-3">
                0{i + 1}
              </p>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                {s.title}
              </h3>
              <p className="font-body text-base text-muted-foreground leading-relaxed">{s.body}</p>
              <Link
                to="#quote"
                className="mt-6 inline-block font-heading text-xs font-bold uppercase tracking-widest text-primary hover:opacity-70"
              >
                Get a quote for this →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Trusted by
          </p>
          <p className="font-body text-base md:text-lg opacity-90">
            {trust.join(" · ")}
          </p>
        </div>
      </section>

      <section id="quote" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 scroll-mt-24">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
          Quote Form
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05]">
          Request a production quote.
        </h2>
        <p className="mt-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
          Tell us about the project — service, quantity, deadline, and artwork if you have it.
          We reply within one working day with pricing and next steps.
        </p>
        <div className="mt-10">
          <ProductionQuoteForm />
        </div>
        <p className="mt-6 font-body text-sm text-muted-foreground">
          Prefer email? <a href="mailto:studio@madeiraoriginals.pt" className="text-primary underline underline-offset-4">studio@madeiraoriginals.pt</a>
        </p>
      </section>
    </main>
    <Footer />
  </div>
);

export default ProductionStudio;
