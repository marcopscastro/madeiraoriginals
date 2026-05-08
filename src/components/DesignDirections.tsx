const directions = [
  {
    title: "Contemporary Heritage",
    body: "Traditional details, azulejo references, coordinates, and island symbols redesigned for modern apparel.",
  },
  {
    title: "Elevated Local Humour",
    body: "Poncha, bolo do caco, expressions, and inside jokes treated with the seriousness of a premium label.",
  },
  {
    title: "Topographic & Nature",
    body: "Mountain lines, levadas, coastlines, and volcanic textures translated into clean graphics.",
  },
  {
    title: "Technical / Performance",
    body: "Data-driven layouts, spec sheets, sponsor systems, and rally-inspired graphics.",
  },
];

const DesignDirections = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
    <div className="text-center mb-12">
      <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
        Collection Directions
      </p>
      <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05]">
        Madeira, <span className="italic">reworked.</span>
      </h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 border border-foreground/10">
      {directions.map((d, i) => (
        <div key={d.title} className="bg-background p-8 md:p-10">
          <p className="font-heading text-xs font-bold uppercase tracking-widest text-primary mb-4">
            0{i + 1}
          </p>
          <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3 leading-tight">
            {d.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{d.body}</p>
        </div>
      ))}
    </div>
  </section>
);

export default DesignDirections;
