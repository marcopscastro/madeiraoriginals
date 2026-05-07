import { Link } from "react-router-dom";

const collections = [
  { label: "T-Shirts", href: "/shop", desc: "Heavyweight tees with island-rooted graphics" },
  { label: "Hoodies", href: "/shop", desc: "Atlantic weight, everyday cuts" },
  { label: "Accessories", href: "/shop", desc: "Totes, caps, island essentials" },
  { label: "HORECA", href: "/horeca", desc: "Custom glassware for bars & restaurants" },
];

const CollectionsGrid = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-10">
        Featured Collections
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {collections.map((c) => (
          <Link
            key={c.label}
            to={c.href}
            className="group block bg-muted aspect-[3/4] relative overflow-hidden border border-foreground/10 hover:border-foreground transition-colors"
          >
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
              <p className="font-heading text-base md:text-xl font-bold uppercase tracking-wide text-foreground">
                {c.label}
              </p>
              <p className="mt-1 font-body text-xs md:text-sm text-muted-foreground hidden md:block">
                {c.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionsGrid;
