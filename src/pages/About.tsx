import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import NewsletterForm from "@/components/NewsletterForm";
import aboutHero from "@/assets/about-hero.jpg";

const About = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="About Madeira Originals — Modern Madeira Lifestyle Brand"
      description="Madeira Originals is a premium lifestyle and apparel brand inspired by the landscapes, culture and identity of Madeira Island."
      path="/about"
    />
    <Header />
    <main>
      <section className="grid md:grid-cols-2 gap-0 items-stretch border-b border-foreground/10">
        <div className="flex items-center px-6 sm:px-10 lg:px-16 py-16 md:py-24">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              About
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground leading-[1.05]">
              A modern Madeira<br />
              <span className="italic">lifestyle brand.</span>
            </h1>
            <p className="mt-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              Premium clothing, accessories and lifestyle products — designed in Madeira,
              made for everywhere.
            </p>
          </div>
        </div>
        <div className="order-first md:order-last">
          <img
            src={aboutHero}
            alt="Heavyweight cream and navy folded t-shirts beside bougainvillea"
            width={1600}
            height={900}
            className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
            fetchPriority="high"
          />
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 prose-editorial">
        <h2>What we make</h2>
        <p>
          Madeira Originals designs premium clothing, accessories, and lifestyle products inspired
          by the landscapes, culture, and identity of Madeira Island. Heavyweight tees, hoodies,
          accessories, and custom glassware for the island's hospitality industry.
        </p>

        <h2>Why we exist</h2>
        <p>
          Madeira deserves better than tourist-shop souvenirs. The island has one of the
          strongest, most distinctive identities in the Atlantic — volcanic geography, maritime
          culture, traditions still alive in everyday life, and a diaspora across three
          continents. We translate that identity into modern, wearable design.
        </p>

        <h2>Our design philosophy</h2>
        <ul>
          <li><strong>Rooted, not nostalgic.</strong> References that mean something, not clichés.</li>
          <li><strong>Premium materials.</strong> Heavyweight cotton, considered finishes.</li>
          <li><strong>Editorial, not touristy.</strong> Modern cuts, quiet typography, real graphic design.</li>
          <li><strong>Made to wear anywhere.</strong> Pieces that work in Funchal, Lisbon, or anywhere the diaspora carries the island.</li>
        </ul>

        <h2>Where we make it</h2>
        <p>
          Designed in Madeira. Produced through trusted partners. Sold worldwide.
        </p>
      </article>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground text-center mb-4">
          Stay close to the island.
        </h2>
        <p className="font-body text-center text-muted-foreground mb-6">
          Early access to new drops, journal pieces, and Madeira Originals updates.
        </p>
        <NewsletterForm source="about" />
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
