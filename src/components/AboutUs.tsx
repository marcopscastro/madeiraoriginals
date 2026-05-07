const AboutUs = () => {
  return (
    <section id="about" className="bg-background py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
          Brand Story
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6 text-foreground leading-tight">
          Inspired by Madeira.<br />
          <span className="italic">Designed for everywhere.</span>
        </h2>
        <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground">
          Madeira Originals was created to bring the spirit of Madeira Island into modern apparel
          and lifestyle design. Inspired by the island's mountains, ocean, traditions and
          culture, our products combine authentic Madeira identity with contemporary aesthetics —
          made to feel as at home in Funchal as in Lisbon, London, or anywhere the diaspora
          carries the island.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
