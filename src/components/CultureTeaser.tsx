import { Link } from "react-router-dom";

const CultureTeaser = () => (
  <section className="bg-secondary text-secondary-foreground py-16 md:py-24">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
        Madeira Culture
      </p>
      <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6 leading-tight">
        More than clothing —<br />
        <span className="italic">a Madeira lifestyle.</span>
      </h2>
      <p className="font-body text-base md:text-lg leading-relaxed opacity-90 max-w-2xl mx-auto">
        Madeira is a volcanic island in the Atlantic with a culture all of its own — dramatic
        landscapes, a maritime identity, traditions that still live in everyday life, and a
        diaspora across three continents. Every Madeira Originals piece pulls from that.
      </p>
      <Link
        to="/culture"
        className="mt-8 inline-flex items-center justify-center border border-secondary-foreground text-secondary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-secondary-foreground hover:text-secondary transition-colors"
      >
        Read About Madeira
      </Link>
    </div>
  </section>
);

export default CultureTeaser;
