import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";

const Culture = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Madeira Culture — Identity, Landscape & Atlantic Heritage"
      description="A guide to Madeira culture: volcanic landscapes, Atlantic identity, traditions, food, drink, and the modern Madeira lifestyle that inspires our designs."
      path="/culture"
    />
    <Header />
    <main>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
          Madeira Culture
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground leading-[1.05]">
          The island,<br />
          <span className="italic">in its own words.</span>
        </h1>
        <p className="mt-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
          Madeira is one of the most distinctive places in the Atlantic — volcanic, maritime,
          deeply Portuguese, and yet entirely its own. This is the culture that inspires every
          Madeira Originals design.
        </p>
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
