import manifestoImg from "@/assets/manifesto.jpg";

const pillars = [
  {
    title: "Island Heritage",
    body: "Rooted in Madeira's culture, nature, language, humour, and local identity.",
  },
  {
    title: "Modern Streetwear",
    body: "Clean typography, heavyweight apparel, minimalist graphics, premium layouts.",
  },
  {
    title: "Production Quality",
    body: "Built through our own technical print studio: high-resolution DTF, UV DTF, and custom apparel.",
  },
];

const Manifesto = () => (
  <section className="bg-background border-y border-foreground/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
      <div>
        <img
          src={manifestoImg}
          alt="Heavyweight cream and maroon t-shirts on volcanic Madeira basalt by Madeira Originals"
          width={1280}
          height={960}
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </div>
      <div>
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
          Brand Manifesto
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05]">
          Not souvenirs. Not clichés. <span className="italic">Madeira, properly translated.</span>
        </h2>
        <p className="mt-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
          Madeira Originals was created in São Vicente to bring authentic Madeiran identity into
          modern streetwear and custom apparel. We take the island's landscapes, humour,
          traditions, coordinates, textures, and cultural details — then translate them into
          clean, wearable, premium designs.
        </p>
        <div className="mt-10 grid sm:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.title}>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Manifesto;
