import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.webp";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-semibold text-foreground leading-[1.05]">
            Modern Madeira<br />
            <span className="italic text-primary">inspired apparel</span><br />
            & lifestyle.
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground font-body max-w-lg leading-relaxed">
            Premium clothing and products inspired by the landscapes, culture, and identity of
            Madeira Island. Designed in Madeira, made for everywhere.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-none hover:opacity-90 transition-opacity"
            >
              Shop Collection
            </Link>
            <Link
              to="/culture"
              className="inline-flex items-center justify-center border border-foreground text-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-none hover:bg-foreground hover:text-background transition-colors"
            >
              Explore Madeira Culture
            </Link>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <img
            src={heroImage}
            alt="Modern Madeira inspired apparel against the Madeira Island coastline"
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
