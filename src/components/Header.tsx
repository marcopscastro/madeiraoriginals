import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = ["Shop Tees", "Canvas Goods", "Headwear", "Our Story"];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="font-heading font-bold text-lg sm:text-xl tracking-widest uppercase text-primary">
          Madeira Originals
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-foreground hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <button aria-label="Account" className="text-foreground hover:text-primary transition-colors">
            <User size={20} />
          </button>
          <button aria-label="Cart" className="text-foreground hover:text-primary transition-colors">
            <ShoppingCart size={20} />
          </button>
          <button
            aria-label="Menu"
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-foreground/10 bg-background px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="block py-3 font-heading text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
