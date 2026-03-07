import { useState } from "react";

const footerLinks = ["Shipping & Returns", "Size Guide", "FAQ", "Contact Us"];

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t-2 border-foreground bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Newsletter */}
          <div>
            <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-foreground">
              Join the Locals.
            </h3>
            <p className="mt-2 font-body text-muted-foreground">
              Drop your email to get early access to new designs and island stories.
            </p>
            <div className="mt-4 flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="flex-1 bg-background border border-foreground px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary rounded-none"
              />
              <button className="bg-primary text-primary-foreground font-heading text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-none hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-start md:items-end gap-3">
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-foreground/10 text-center">
          <p className="font-body text-sm text-muted-foreground">
            © 2026 Madeira Originals. Wear the island.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
