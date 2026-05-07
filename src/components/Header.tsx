import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartTotals } from "@/stores/cartStore";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "HORECA", href: "/horeca" },
  { label: "Culture", href: "/culture" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCartTotals();
  const navigate = useNavigate();

  const go = (href: string) => {
    setMobileOpen(false);
    navigate(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="font-heading font-bold text-lg sm:text-xl tracking-widest uppercase text-primary">
            Madeira Originals
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => go(link.href)}
                className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button aria-label="Search" className="text-foreground hover:text-primary transition-colors" onClick={() => setSearchOpen(true)}>
              <Search size={20} />
            </button>
            <button aria-label="Account" className="text-foreground hover:text-primary transition-colors hidden sm:block">
              <User size={20} />
            </button>
            <button
              aria-label="Cart"
              className="relative text-foreground hover:text-primary transition-colors"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground font-heading text-[10px] font-bold w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
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

        {mobileOpen && (
          <nav className="md:hidden border-t border-foreground/10 bg-background px-4 pb-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => go(link.href)}
                className="block w-full text-left py-3 font-heading text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
