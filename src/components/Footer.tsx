import { Link } from "react-router-dom";
import NewsletterForm from "@/components/NewsletterForm";

const sections = [
  {
    heading: "Shop",
    links: [
      { label: "All", to: "/shop" },
      { label: "HORECA", to: "/horeca" },
    ],
  },
  {
    heading: "Brand",
    links: [
      { label: "About", to: "/about" },
      { label: "Madeira Culture", to: "/culture" },
      { label: "Journal", to: "/journal" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t-2 border-foreground bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h3 className="font-display text-2xl font-semibold text-foreground">
              Join the community.
            </h3>
            <p className="mt-2 font-body text-muted-foreground">
              Early access to new drops, island stories, and Madeira Originals updates.
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

        <div className="mt-12 pt-6 border-t border-foreground/10 text-center">
          <p className="font-body text-sm text-muted-foreground">
            © 2026 Madeira Originals — Modern products inspired by Madeira Island.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
