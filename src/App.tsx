import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import { COLLECTIONS } from "./lib/collections";
import { useCartSync } from "@/hooks/useCartSync";

// Lazy-load non-critical routes to shrink initial bundle
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Shop = lazy(() => import("./pages/Shop"));
const Collection = lazy(() => import("./pages/Collection"));
const Culture = lazy(() => import("./pages/Culture"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

const PortugalStreetwear = lazy(() => import("./pages/PortugalStreetwear"));
const MadeiraSouvenirs = lazy(() => import("./pages/MadeiraSouvenirs"));
const Journal = lazy(() => import("./pages/Journal"));
const JournalPost = lazy(() => import("./pages/JournalPost"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminJournal = lazy(() => import("./pages/admin/AdminJournal"));
const AdminJournalEdit = lazy(() => import("./pages/admin/AdminJournalEdit"));
const AdminQuotes = lazy(() => import("./pages/admin/AdminQuotes"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center font-body text-sm text-muted-foreground">
    Loading…
  </div>
);

const AppRoutes = () => {
  useCartSync();
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        {Object.values(COLLECTIONS).map((c) => (
          <Route key={c.slug} path={`/${c.slug}`} element={<Collection config={c} />} />
        ))}
        <Route path="/production-studio" element={<ProductionStudio />} />
        <Route path="/portugal-streetwear" element={<PortugalStreetwear />} />
        <Route path="/madeira-souvenirs" element={<MadeiraSouvenirs />} />
        <Route path="/horeca" element={<Navigate to="/production-studio" replace />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<JournalPost />} />
        <Route path="/product/:handle" element={<ProductDetail />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin/journal" element={<AdminJournal />} />
        <Route path="/admin/journal/:id" element={<AdminJournalEdit />} />
        <Route path="/admin/quotes" element={<AdminQuotes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
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
