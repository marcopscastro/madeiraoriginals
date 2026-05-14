import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Link } from "react-router-dom";
import cultureHero from "@/assets/culture-hero.jpg";

const Culture = () => (
  <div className="min-h-screen bg-background">
    <PageSEO routeKey="culture" />
    <Header />
    <main>
      <section className="relative">
        <img
          src={cultureHero}
          alt="Madeira Island volcanic coastline at golden hour"
          width={1600}
          height={900}
          className="w-full h-[55vh] md:h-[70vh] object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20 w-full text-background">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
              Madeira Culture
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05]">
              The island,<br />
              <span className="italic">in its own words.</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
          Madeira is one of the most distinctive places in the Atlantic — volcanic, maritime,
          deeply Portuguese, and yet entirely its own. This is the culture that inspires every
          Madeira Originals design.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 grid md:grid-cols-3 gap-8 md:gap-10">
        {[
          {
            tag: "Landscape",
            title: "Levadas",
            body: "Centuries-old irrigation channels carved into the cliffs. Today they double as the island's most loved hiking network — a slow walk through laurisilva forest with the sound of running water.",
            img: "https://images.unsplash.com/photo-1602866381-3935e6c2eb39?auto=format&fit=crop&w=900&q=70",
          },
          {
            tag: "Drink",
            title: "Poncha",
            body: "Aguardente de cana, honey, and citrus, mixed in a glass with a wooden mexelote. Order one in any village bar and you've ordered the island's whole social ritual.",
            img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=70",
          },
          {
            tag: "Craft",
            title: "Bordado da Madeira",
            body: "A centuries-old embroidery tradition, still produced on the island. The motifs — flora, geometry, restrained palettes — quietly inform a lot of what we design.",
            img: "https://images.unsplash.com/photo-1528461160043-aa6f0fc26b32?auto=format&fit=crop&w=900&q=70",
          },
        ].map((b) => (
          <article key={b.title}>
            <div className="aspect-[4/5] overflow-hidden bg-muted mb-4">
              <img src={b.img} alt={b.title} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-2">{b.tag}</p>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2">{b.title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{b.body}</p>
          </article>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 md:pb-8 text-center">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80"
        >
          Read the Journal →
        </Link>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 prose-editorial">
        <h2>A volcanic island in the middle of the Atlantic</h2>
        <p>
          Madeira sits roughly 1,000 km from mainland Portugal and 500 km from the African coast.
          The island rose from underwater volcanoes and the landscape still shows it — sheer
          cliffs, cloud-covered peaks, terraced hillsides cut into the slopes, and deep ravines
          that channel water from the mountains down to the sea.
        </p>
        <p>
          That geography shapes everything. How Madeirans farm. How they build. How they eat.
          How they move around an island where the next valley over can be an hour's drive
          straight down and back up again.
        </p>

        <h2>An Atlantic — not Mediterranean — identity</h2>
        <p>
          Madeira's culture is fundamentally Atlantic. The food is heavier on the sea than on
          the olive grove. The light is sharper. The weather changes within the same hour.
          Madeira shares more in common, in some ways, with the Azores and the Canaries than
          with Lisbon — and yet remains unmistakably Portuguese.
        </p>

        <h2>Traditions that still live in everyday life</h2>
        <ul>
          <li>
            <strong>Mercado dos Lavradores</strong> — Funchal's working market, where flowers,
            fruit, and Atlantic fish still arrive daily.
          </li>
          <li>
            <strong>The Madeira toboggan</strong> — the wicker sleds from Monte that locals
            still half-jokingly call the original Madeira "Uber".
          </li>
          <li>
            <strong>Poncha</strong> — the island's traditional drink: aguardente de cana, honey,
            and citrus, mixed in a glass and shared.
          </li>
          <li>
            <strong>Festa da Flor & Festa do Vinho</strong> — the flower and wine festivals that
            still mark the island's calendar.
          </li>
          <li>
            <strong>Bordado da Madeira</strong> — Madeira embroidery, a centuries-old craft
            still produced on the island.
          </li>
        </ul>

        <h2>A diaspora across three continents</h2>
        <p>
          Madeirans have emigrated for generations — South Africa, Venezuela, the Channel
          Islands, Canada, Australia, the US, the UK. The diaspora keeps Madeira culture alive
          far beyond the island, and is increasingly driving demand for modern Madeiran products
          that feel rooted but not nostalgic.
        </p>

        <h2>Why Madeira inspires our designs</h2>
        <p>
          Madeira gives a designer an unusually rich vocabulary: the green-black of volcanic
          rock, the colour palette of the market, the geometry of terraced agriculture, the
          typography of old Funchal signage, the patterns of traditional embroidery. It is a
          small island with an outsized visual identity.
        </p>
        <p>
          Madeira Originals was built around that. Modern apparel, lifestyle products and
          accessories — premium materials, contemporary cuts, references that mean something to
          anyone who knows the island and quietly invite the question from anyone who does not.
        </p>

        <p>
          <Link to="/shop">Shop the collection →</Link>
        </p>
      </article>
    </main>
    <Footer />
  </div>
);

export default Culture;
