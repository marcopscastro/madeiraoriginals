import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import Index from "./pages/Index";
import { COLLECTIONS } from "./lib/collections";
import { useCartSync } from "@/hooks/useCartSync";
import { localizePath, stripLocale, langFromPathname } from "@/lib/locale";
import type { Lang } from "@/i18n";

// Lazy-load non-critical routes to shrink initial bundle
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Shop = lazy(() => import("./pages/Shop"));
const Collection = lazy(() => import("./pages/Collection"));
const Culture = lazy(() => import("./pages/Culture"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

const Studio = lazy(() => import("./pages/Studio"));
const Design = lazy(() => import("./pages/Design"));
const ApparelPrinting = lazy(() => import("./pages/ApparelPrinting"));
const VinylSignage = lazy(() => import("./pages/VinylSignage"));
const Wholesale = lazy(() => import("./pages/Wholesale"));
const PortugalStreetwear = lazy(() => import("./pages/PortugalStreetwear"));
const MadeiraSouvenirs = lazy(() => import("./pages/MadeiraSouvenirs"));
const IslandFlowerProduct = lazy(() => import("./pages/IslandFlowerProduct"));
const Journal = lazy(() => import("./pages/Journal"));
const JournalPost = lazy(() => import("./pages/JournalPost"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminJournal = lazy(() => import("./pages/admin/AdminJournal"));
const AdminJournalEdit = lazy(() => import("./pages/admin/AdminJournalEdit"));
const AdminQuotes = lazy(() => import("./pages/admin/AdminQuotes"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Returns = lazy(() => import("./pages/Returns"));
const Care = lazy(() => import("./pages/Care"));
const SizeGuide = lazy(() => import("./pages/SizeGuide"));
const Catalogo = lazy(() => import("./pages/Catalogo"));
const CatalogoCategory = lazy(() => import("./pages/CatalogoCategory"));
const CatalogoProduto = lazy(() => import("./pages/CatalogoProduto"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center font-body text-sm text-muted-foreground">
    Loading…
  </div>
);

/**
 * Legacy `?lang=` URLs redirect to the matching path-based locale, preserving
 * the path and any other query parameters.
 *   /shop?lang=en&x=1  ->  /en/shop?x=1
 *   /shop?lang=pt      ->  /shop
 */
const LangQueryRedirect = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lang = params.get("lang");
  if (lang !== "en" && lang !== "pt") return <>{children}</>;

  params.delete("lang");
  const query = params.toString();
  const target =
    localizePath(stripLocale(location.pathname), lang as Lang) +
    (query ? `?${query}` : "") +
    location.hash;
  return <Navigate to={target} replace />;
};

/** Keep i18n in sync with the locale encoded in the URL. */
const useSyncLangWithRoute = (lang: Lang) => {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (i18n.language?.slice(0, 2) !== lang) i18n.changeLanguage(lang);
  }, [lang, i18n]);
};

/** Redirect helper that keeps the visitor inside the current locale tree. */
const LocaleRedirect = ({ to, lang }: { to: string; lang: Lang }) => (
  <Navigate to={localizePath(to, lang)} replace />
);

const ProductRedirect = ({ lang }: { lang: Lang }) => {
  const { handle } = useParams();
  return <Navigate to={localizePath(`/product/${handle}`, lang)} replace />;
};

/**
 * The full route tree, rendered once per locale.
 * Paths are relative so the same tree serves "/" (pt) and "/en" (en).
 */
const LocaleRoutes = ({ lang }: { lang: Lang }) => {
  useSyncLangWithRoute(lang);
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="shop" element={<Shop />} />
        {Object.values(COLLECTIONS).map((c) => (
          <Route key={c.slug} path={c.slug} element={<Collection config={c} />} />
        ))}
        <Route path="studio" element={<Studio />} />
        <Route path="b2b" element={<LocaleRedirect to="/studio" lang={lang} />} />
        <Route path="production-studio" element={<LocaleRedirect to="/studio" lang={lang} />} />
        <Route path="horeca" element={<LocaleRedirect to="/studio" lang={lang} />} />
        <Route path="design" element={<Design />} />
        <Route path="apparel-printing" element={<ApparelPrinting />} />
        <Route path="vinyl-signage" element={<VinylSignage />} />
        <Route path="norte" element={<LocaleRedirect to="/neblina" lang={lang} />} />
        <Route path="wholesale" element={<Wholesale />} />
        <Route path="portugal-streetwear" element={<PortugalStreetwear />} />
        <Route path="madeira-souvenirs" element={<MadeiraSouvenirs />} />
        <Route path="island-of-flowers" element={<LocaleRedirect to="/shop" lang={lang} />} />
        <Route path="culture" element={<Culture />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="journal" element={<Journal />} />
        <Route path="journal/:slug" element={<JournalPost />} />
        <Route path="product/:handle" element={<ProductDetail />} />
        <Route path="products/:handle" element={<ProductRedirect lang={lang} />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="returns" element={<Returns />} />
        <Route path="care" element={<Care />} />
        <Route path="care-guide" element={<LocaleRedirect to="/care" lang={lang} />} />
        <Route path="size-guide" element={<SizeGuide />} />
        <Route path="sizing" element={<LocaleRedirect to="/size-guide" lang={lang} />} />
        <Route path="shipping-returns" element={<LocaleRedirect to="/shipping" lang={lang} />} />
        <Route path="custom" element={<LocaleRedirect to="/apparel-printing" lang={lang} />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="catalogo/produto/:id" element={<CatalogoProduto />} />
        <Route path="catalogo/:category" element={<CatalogoCategory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

/** Locale-free routes: authentication and admin. */
const SystemRoutes = () => {
  const { pathname } = useLocation();
  useSyncLangWithRoute(langFromPathname(pathname));
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin/journal" element={<AdminJournal />} />
        <Route path="/admin/journal/:id" element={<AdminJournalEdit />} />
        <Route path="/admin/quotes" element={<AdminQuotes />} />
      </Routes>
    </Suspense>
  );
};

const AppRoutes = () => {
  useCartSync();
  return (
    <LangQueryRedirect>
      <Routes>
        <Route path="/auth" element={<SystemRoutes />} />
        <Route path="/admin/*" element={<SystemRoutes />} />
        <Route path="/en/*" element={<LocaleRoutes lang="en" />} />
        <Route path="/*" element={<LocaleRoutes lang="pt" />} />
      </Routes>
    </LangQueryRedirect>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
