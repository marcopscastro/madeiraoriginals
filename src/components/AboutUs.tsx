import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section id="about" className="bg-background py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
          About
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6 text-foreground leading-tight">
          A Nossa Ilha.<br />
          <span className="italic">A Nossa Marca.</span>
        </h2>
        <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
          Madeira Originals is a premium streetwear and custom apparel brand born in São Vicente,
          Madeira. Operating under the philosophy <em>Inspired by Madeira. Designed for
          everywhere</em>, we bridge deep island heritage with contemporary design — and back it
          with our own production studio.
        </p>
        <Link
          to="/about"
          className="mt-8 inline-flex items-center justify-center border border-foreground text-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
        >
          Read the Brand Story
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;
