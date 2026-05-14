import { Search, User, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartTotals } from "@/stores/cartStore";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import { useAuth } from "@/hooks/useAuth";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navLinks: NavItem[] = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All", href: "/shop" },
      { label: "T-Shirts", href: "/madeira-t-shirts" },
      { label: "Hoodies", href: "/madeira-hoodies" },
      { label: "Accessories", href: "/madeira-accessories" },
      { label: "Stickers", href: "/madeira-stickers" },
    ],
  },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCartTotals();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const go = (href: string) => {
    setMobileOpen(false);
    setOpenDropdown(null);
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
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    onClick={() => go(link.href)}
                    className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    <ChevronDown size={14} />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute left-0 top-full pt-2 min-w-[220px]">
                      <div className="bg-background border border-foreground/15 py-2">
                        {link.children.map((c) => (
                          <button
                            key={c.label}
                            onClick={() => go(c.href)}
                            className="block w-full text-left px-4 py-2 font-body text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={link.label}
                  onClick={() => go(link.href)}
                  className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              )
            )}
            {isAdmin && (
              <button
                onClick={() => go("/admin/journal")}
                className="font-heading text-sm font-semibold uppercase tracking-wide text-primary hover:opacity-70 transition-opacity"
              >
                Admin
              </button>
            )}
          </nav>

          <div className="flex items-center gap-4">
            <button aria-label="Search" className="text-foreground hover:text-primary transition-colors" onClick={() => setSearchOpen(true)}>
              <Search size={20} />
            </button>
            <button
              aria-label={user ? "Account" : "Sign in"}
              onClick={() => navigate(isAdmin ? "/admin/journal" : "/auth")}
              className="text-foreground hover:text-primary transition-colors hidden sm:block"
            >
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
          <nav className="md:hidden border-t border-foreground/10 bg-background px-4 pb-4 max-h-[80vh] overflow-y-auto">
            {user && (
              <div className="py-3 border-b border-foreground/10 mb-1">
                <span className="inline-flex items-center gap-1.5 font-body text-xs text-foreground">
                  <User size={14} />
                  Signed in{isAdmin && <span className="ml-1 inline-flex items-center rounded-none border border-primary bg-primary/10 px-1.5 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-wide text-primary">Admin</span>}
                </span>
              </div>
            )}
            {navLinks.map((link) => (
              <div key={link.label} className="border-b border-foreground/5">
                <button
                  onClick={() => go(link.href)}
                  className="block w-full text-left py-3 font-heading text-sm font-semibold uppercase tracking-wide text-foreground"
                >
                  {link.label}
                </button>
                {link.children && (
                  <div className="pl-3 pb-2">
                    {link.children.map((c) => (
                      <button
                        key={c.label}
                        onClick={() => go(c.href)}
                        className="block w-full text-left py-1.5 font-body text-sm text-muted-foreground"
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isAdmin && (
              <button
                onClick={() => go("/admin/journal")}
                className="block w-full text-left py-3 font-heading text-sm font-semibold uppercase tracking-wide text-primary"
              >
                Admin
              </button>
            )}
            {!user && (
              <button
                onClick={() => go("/auth")}
                className="block w-full text-left py-3 font-heading text-sm font-semibold uppercase tracking-wide text-foreground"
              >
                Sign in
              </button>
            )}
          </nav>
        )}
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;
