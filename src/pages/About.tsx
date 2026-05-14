import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import NewsletterForm from "@/components/NewsletterForm";
import { Link } from "react-router-dom";
import aboutHero from "@/assets/about-hero.jpg";
import saoVicente from "@/assets/sao-vicente.webp";

const About = () => (
  <div className="min-h-screen bg-background">
    <PageSEO routeKey="about" />
    <Header />
    <main>
      <section className="grid md:grid-cols-2 gap-0 items-stretch border-b border-foreground/10">
        <div className="flex items-center px-6 sm:px-10 lg:px-16 py-16 md:py-24">
          <div>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
              About Madeira Originals
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground leading-[1.05]">
              A Nossa Ilha.<br />
              <span className="italic">A Nossa Marca.</span>
            </h1>
            <p className="mt-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              Premium streetwear and custom apparel born in São Vicente, Madeira.
            </p>
          </div>
        </div>
        <div className="order-first md:order-last">
          <img
            src={aboutHero}
            alt="Heavyweight cream and navy folded t-shirts beside bougainvillea by Madeira Originals"
            width={1600}
            height={900}
            className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
            fetchPriority="high"
          />
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 prose-editorial">
        <h2>Who we are</h2>
        <p>
          Madeira Originals is a premium streetwear and custom apparel brand born in São Vicente,
          Madeira. Operating under the philosophy <em>Inspired by Madeira. Designed for
          everywhere</em>, we bridge deep island heritage with contemporary global fashion.
        </p>

        <h2>Why we exist</h2>
        <p>
          We created Madeira Originals because Madeira deserves better than generic souvenirs.
          Our island has its own humour, texture, landscapes, language, traditions, diaspora, and
          visual identity. We translate that into modern apparel and production-quality design.
        </p>

        <h2>0% Tourist Trap</h2>
        <p>
          Our standard is simple: no clichés, no lazy graphics, no throwaway tourist products.
          Every design must feel authentic to Madeira and wearable anywhere.
        </p>

        <h2>Retail Apparel</h2>
        <p>
          Original collections inspired by Madeira's nature, culture, and everyday identity —
          heavyweight cotton, premium finishes, editorial graphics.
        </p>

        <h2>Born in São Vicente</h2>
        <p>
          Madeira Originals started in São Vicente, on the north coast of Madeira — a place
          shaped by mountains, sea, weather, tradition, and working culture.
        </p>

        <h2>Designed for everywhere</h2>
        <p>
          Our clothing should feel as natural in Funchal as it does in Lisbon, London, Jersey, or
          anywhere the Madeiran diaspora lives.
        </p>
      </article>

      <section className="relative border-y border-foreground/10">
        <img
          src={saoVicente}
          alt="Atlantic cliffs of São Vicente, Madeira"
          width={1600}
          height={900}
          loading="lazy"
          className="w-full h-[40vh] md:h-[55vh] object-cover"
        />
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground text-center mb-4">
          Stay close to the island.
        </h2>
        <p className="font-body text-center text-muted-foreground mb-6">
          First access to new drops, production updates, and stories from Madeira.
        </p>
        <NewsletterForm source="about" />
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
