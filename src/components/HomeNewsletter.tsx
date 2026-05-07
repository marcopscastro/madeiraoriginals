import NewsletterForm from "@/components/NewsletterForm";

const HomeNewsletter = () => (
  <section className="bg-secondary text-secondary-foreground py-16 md:py-20">
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
        Newsletter
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3 leading-tight">
        Modern Madeira,<br />
        <span className="italic">in your inbox.</span>
      </h2>
      <p className="font-body text-base md:text-lg opacity-90 mb-7 max-w-lg mx-auto">
        Early access to drops, journal pieces, and the occasional postcard from the island.
      </p>
      <NewsletterForm source="home" />
    </div>
  </section>
);

export default HomeNewsletter;
