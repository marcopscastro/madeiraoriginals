import { Search, User, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCartTotals } from "@/stores/cartStore";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import LanguageToggle from "@/components/LanguageToggle";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCartTotals();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    {
      label: t("nav.shop"),
      href: "/shop",
      children: [
        { label: t("nav.shopAll"), href: "/shop" },
        { label: t("nav.tshirts"), href: "/madeira-t-shirts" },
        { label: t("nav.hoodies"), href: "/madeira-hoodies" },
        { label: t("nav.accessories"), href: "/madeira-accessories" },
        { label: t("nav.stickers"), href: "/madeira-stickers" },
      ],
    },
    { label: t("nav.studio"), href: "/studio" },
    { label: t("nav.wholesale"), href: "/wholesale" },
    { label: t("nav.journal"), href: "/journal" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.contact"), href: "/contact" },
  ] as { label: string; href: string; children?: { label: string; href: string }[] }[];

  const go = (href: string) => {
    setMobileOpen(false);
    setOpenDropdown(null);
    navigate(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b border-foreground/10 pt-safe pl-safe pr-safe">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-2 sm:gap-4">
          <Link to="/" className="font-heading font-bold text-[15px] sm:text-lg md:text-xl tracking-widest uppercase text-primary whitespace-nowrap truncate min-w-0">
            Madeira Originals
          </Link>

          <nav className="hidden md:flex items-center gap-6">
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
                {t("nav.admin")}
              </button>
            )}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageToggle className="hidden sm:inline-flex" />
            <button aria-label={t("nav.search")} className="text-foreground hover:text-primary transition-colors" onClick={() => setSearchOpen(true)}>
              <Search size={20} />
            </button>
            <button
              aria-label={user ? t("nav.account") : t("nav.signIn")}
              onClick={() => navigate(isAdmin ? "/admin/journal" : "/auth")}
              className="text-foreground hover:text-primary transition-colors hidden sm:block"
            >
              <User size={20} />
            </button>
            <button
              aria-label={t("nav.cart")}
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
              aria-label={t("nav.menu")}
              className="md:hidden text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden border-t border-foreground/10 bg-background px-4 pb-4 max-h-[80vh] overflow-y-auto">
            <div className="py-3 border-b border-foreground/10 mb-1 flex items-center justify-between">
              <LanguageToggle />
              {user && (
                <span className="inline-flex items-center gap-1.5 font-body text-xs text-foreground">
                  <User size={14} />
                  {isAdmin && <span className="ml-1 inline-flex items-center rounded-none border border-primary bg-primary/10 px-1.5 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-wide text-primary">{t("common.admin")}</span>}
                </span>
              )}
            </div>
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
                {t("nav.admin")}
              </button>
            )}
            {!user && (
              <button
                onClick={() => go("/auth")}
                className="block w-full text-left py-3 font-heading text-sm font-semibold uppercase tracking-wide text-foreground"
              >
                {t("nav.signIn")}
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
