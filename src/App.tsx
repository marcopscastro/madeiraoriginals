import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import Collection from "./pages/Collection";
import { COLLECTIONS } from "./lib/collections";

import Culture from "./pages/Culture";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductionStudio from "./pages/ProductionStudio";
import Journal from "./pages/Journal";
import JournalPost from "./pages/JournalPost";
import Auth from "./pages/Auth";
import AdminJournal from "./pages/admin/AdminJournal";
import AdminJournalEdit from "./pages/admin/AdminJournalEdit";
import AdminQuotes from "./pages/admin/AdminQuotes";
import NotFound from "./pages/NotFound";
import { useCartSync } from "@/hooks/useCartSync";

const queryClient = new QueryClient();

const AppRoutes = () => {
  useCartSync();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/shop" element={<Shop />} />
      {Object.values(COLLECTIONS).map((c) => (
        <Route key={c.slug} path={`/${c.slug}`} element={<Collection config={c} />} />
      ))}
      <Route path="/production-studio" element={<ProductionStudio />} />
      {/* Legacy HORECA URL → Production Studio */}
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
