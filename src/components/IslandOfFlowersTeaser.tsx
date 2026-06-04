import { Link } from "react-router-dom";

const TEASER = [
  { name: "Bird of Paradise", url: "https://cdn.shopify.com/s/files/1/1025/7367/0742/files/ChatGPT_Image_Jun_3_2026_05_37_37_AM.png?v=1780472959" },
  { name: "Pride of Madeira", url: "https://cdn.shopify.com/s/files/1/1025/7367/0742/files/ChatGPT_Image_Jun_3_2026_05_45_03_AM.png?v=1780472960" },
  { name: "Hydrangea", url: "https://cdn.shopify.com/s/files/1/1025/7367/0742/files/04_hydrangea.png?v=1780472959" },
];

const GOLD = "#c9952a";

const IslandOfFlowersTeaser = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm uppercase tracking-[0.35em] mb-5" style={{ color: GOLD }}>
            Madeira Originals · Collection
          </p>
          <h2 className="font-serif-display text-4xl md:text-6xl font-light text-foreground mb-4">
            Island of Flowers
          </h2>
          <p className="font-body text-base md:text-lg text-foreground/60">
            Nine botanicals from the garden island
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TEASER.map((f) => (
            <Link
              key={f.name}
              to="/island-of-flowers"
              className="group relative block overflow-hidden"
              style={{ borderRadius: "8px", aspectRatio: "2 / 3" }}
              aria-label={`View ${f.name} in Island of Flowers collection`}
            >
              <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-[1.03]" style={{ borderRadius: "8px", overflow: "hidden" }}>
                <img src={f.url} alt={`${f.name} — Island of Flowers`} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="pointer-events-none absolute inset-0 border opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ borderColor: GOLD, borderRadius: "8px" }} />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 px-5 py-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(to top, rgba(13,13,13,0.85), rgba(13,13,13,0))", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}
              >
                <span className="block text-left font-heading text-sm uppercase tracking-[0.25em] text-white">
                  {f.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-14">
          <Link
            to="/island-of-flowers"
            className="inline-block px-8 py-4 font-heading text-xs uppercase tracking-[0.3em] transition-opacity duration-300 hover:opacity-90"
            style={{ backgroundColor: GOLD, color: "#0d0d0d" }}
          >
            View collection →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IslandOfFlowersTeaser;
