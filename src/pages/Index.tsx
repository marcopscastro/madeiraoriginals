import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueBanner from "@/components/ValueBanner";
import AboutUs from "@/components/AboutUs";
import CollectionsGrid from "@/components/CollectionsGrid";
import Bestsellers from "@/components/Bestsellers";
import CultureTeaser from "@/components/CultureTeaser";
import GiftPositioning from "@/components/GiftPositioning";
import JournalPreview from "@/components/JournalPreview";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Madeira Originals — Modern Madeira Inspired Apparel & Lifestyle"
      description="Premium Madeira inspired clothing, streetwear and lifestyle products. Modern apparel rooted in Madeira Island culture, landscapes and identity."
      path="/"
    />
    <Header />
    <main>
      <Hero />
      <ValueBanner />
      <AboutUs />
      <CollectionsGrid />
      <Bestsellers />
      <CultureTeaser />
      <GiftPositioning />
      <JournalPreview />
    </main>
    <Footer />
  </div>
);

export default Index;
