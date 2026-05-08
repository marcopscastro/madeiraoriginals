import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import Horeca from "./pages/Horeca";
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
      {/* SEO collection routes — currently alias /shop until per-tag pages ship in Phase 3 */}
      <Route path="/madeira-t-shirts" element={<Shop />} />
      <Route path="/madeira-hoodies" element={<Shop />} />
      <Route path="/madeira-accessories" element={<Shop />} />
      <Route path="/madeira-stickers" element={<Shop />} />
      <Route path="/madeira-streetwear" element={<Shop />} />
      <Route path="/madeira-gifts" element={<Shop />} />
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
