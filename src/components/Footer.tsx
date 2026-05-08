import { Link } from "react-router-dom";
import NewsletterForm from "@/components/NewsletterForm";

const sections = [
  {
    heading: "Shop",
    links: [
      { label: "All", to: "/shop" },
      { label: "T-Shirts", to: "/madeira-t-shirts" },
      { label: "Hoodies", to: "/madeira-hoodies" },
      { label: "Accessories", to: "/madeira-accessories" },
      { label: "Stickers", to: "/madeira-stickers" },
    ],
  },
  {
    heading: "Production Studio",
    links: [
      { label: "Custom Apparel", to: "/production-studio#custom-apparel" },
      { label: "DTF Gang Sheets", to: "/production-studio#dtf" },
      { label: "UV DTF Stickers", to: "/production-studio#uv-dtf" },
      { label: "Business Merch", to: "/production-studio#business-merch" },
      { label: "Rally & Performance", to: "/production-studio#rally" },
    ],
  },
  {
    heading: "Brand",
    links: [
      { label: "About", to: "/about" },
      { label: "Journal", to: "/journal" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t-2 border-foreground bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-semibold text-foreground">
              Join the community.
            </h3>
            <p className="mt-2 font-body text-muted-foreground">
              First access to drops, production updates, and stories from the island.
            </p>
            <div className="mt-4">
              <NewsletterForm source="footer" />
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.heading}>
              <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                {s.heading}
              </h4>
              <ul className="space-y-2">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="font-body text-sm text-muted-foreground hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-foreground/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-center md:text-left">
          <p className="font-body text-sm text-muted-foreground">
            © 2026 Madeira Originals — Premium streetwear, apparel & custom printing born in São Vicente, Madeira, Portugal.
          </p>
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            A Nossa Ilha. A Nossa Marca.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
