import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.webp";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
            Born in São Vicente, Madeira
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold text-foreground leading-[1.05]">
            Inspired by Madeira.<br />
            <span className="italic text-primary">Designed for everywhere.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground font-body max-w-lg leading-relaxed">
            Premium streetwear and custom apparel born in São Vicente, Madeira — built from
            island heritage, modern design, and a strict 0% Tourist Trap philosophy.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-none hover:opacity-90 transition-opacity"
            >
              Shop the Collection
            </Link>
            <Link
              to="/production-studio"
              className="inline-flex items-center justify-center border border-foreground text-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-none hover:bg-foreground hover:text-background transition-colors"
            >
              Explore Production Studio
            </Link>
          </div>
          <p className="mt-6 font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            A Nossa Ilha. A Nossa Marca.
          </p>
        </div>

        <div className="order-1 md:order-2">
          <img
            src={heroImage}
            alt="Premium Madeira streetwear by Madeira Originals against the Madeira Island coastline"
            className="w-full h-auto object-cover"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
