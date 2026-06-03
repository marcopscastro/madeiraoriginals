import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ImageLightbox from "@/components/ImageLightbox";

const FLOWERS = [
  { name: "Bird of Paradise", url: "https://cdn.shopify.com/s/files/1/1025/7367/0742/files/ChatGPT_Image_Jun_3_2026_05_37_37_AM.png?v=1780472959" },
  { name: "Pride of Madeira", url: "https://cdn.shopify.com/s/files/1/1025/7367/0742/files/ChatGPT_Image_Jun_3_2026_05_45_03_AM.png?v=1780472960" },
  { name: "Agapanthus", url: "https://cdn.shopify.com/s/files/1/1025/7367/0742/files/ChatGPT_Image_Jun_3_2026_05_48_29_AM.png?v=1780472960" },
  { name: "Hydrangea", url: "https://cdn.shopify.com/s/files/1/1025/7367/0742/files/04_hydrangea.png?v=1780472959" },
  { name: "Calla Lily", url: "https://cdn.shopify.com/s/files/1/1025/7367/0742/files/05_calla_lily.png?v=1780472960" },
  { name: "Bougainvillea", url: "https://cdn.shopify.com/s/files/1/1025/7367/0742/files/06_bougainvillea.png?v=1780472959" },
  { name: "King Protea", url: "https://cdn.shopify.com/s/files/1/1025/7367/0742/files/07_king_protea.png?v=1780472960" },
  { name: "Torch Ginger", url: "https://cdn.shopify.com/s/files/1/1025/7367/0742/files/08_torch_ginger.png?v=1780472960" },
  { name: "Watsonia", url: "https://cdn.shopify.com/s/files/1/1025/7367/0742/files/09_watsonia.png?v=1780472959" },
];

const BG = "#0d0d0d";
const FG = "#f0ead8";
const GOLD = "#c9952a";

const IslandOfFlowers = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("iof-footer");
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight - 80) setFooterVisible(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  return (
    <div style={{ backgroundColor: BG, color: FG }} className="min-h-screen">
      <SEO
        title="Island of Flowers — Madeira Originals Collection"
        description="Nine botanicals from the garden island. A premium editorial collection by Madeira Originals."
      />
      <Header />

      <main className="pt-24 md:pt-32 pb-20">
        {/* Header */}
        <section className="px-6 md:px-12 text-center max-w-4xl mx-auto">
          <p
            className="text-xs md:text-sm uppercase tracking-[0.35em] mb-6"
            style={{ color: GOLD }}
          >
            Madeira Originals · Collection
          </p>
          <h1
            className="font-serif-display text-5xl md:text-7xl lg:text-8xl font-light mb-5"
            style={{ color: FG }}
          >
            Island of Flowers
          </h1>
          <p className="text-base md:text-lg font-body text-white/55 mb-10">
            Nine botanicals from the garden island
          </p>
          <div
            className="mx-auto h-px w-24"
            style={{ backgroundColor: GOLD }}
          />
        </section>

        {/* Gallery */}
        <section className="mt-16 md:mt-24 px-4 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {FLOWERS.map((f, i) => (
              <button
                key={f.name}
                onClick={() => openLightbox(i)}
                className="group relative block overflow-hidden opacity-0 animate-[iofFade_600ms_ease-out_forwards]"
                style={{
                  borderRadius: "8px",
                  animationDelay: `${i * 80}ms`,
                  aspectRatio: "2 / 3",
                }}
                aria-label={`View ${f.name}`}
              >
                <div
                  className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  style={{ borderRadius: "8px", overflow: "hidden" }}
                >
                  <img
                    src={f.url}
                    alt={`${f.name} — Island of Flowers collection by Madeira Originals`}
                    className="w-full h-full object-cover"
                    loading={i < 3 ? "eager" : "lazy"}
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ borderColor: GOLD, borderRadius: "8px" }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 px-5 py-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,13,13,0.85), rgba(13,13,13,0))",
                    borderBottomLeftRadius: "8px",
                    borderBottomRightRadius: "8px",
                  }}
                >
                  <span
                    className="block text-left font-heading text-sm uppercase tracking-[0.25em]"
                    style={{ color: FG }}
                  >
                    {f.name}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Footer accent */}
        <section
          id="iof-footer"
          className={`mt-24 md:mt-32 px-6 text-center transition-all duration-700 ease-out ${
            footerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div
            className="mx-auto h-px w-24 mb-8"
            style={{ backgroundColor: GOLD }}
          />
          <p
            className="text-xs uppercase tracking-[0.35em] text-white/55"
          >
            Premium streetwear. 0% tourist trap.
          </p>
        </section>
      </main>

      <Footer />

      <ImageLightbox
        images={FLOWERS.map((f) => ({ url: f.url, altText: f.name }))}
        startIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title="Island of Flowers"
      />

      <style>{`
        @keyframes iofFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default IslandOfFlowers;
