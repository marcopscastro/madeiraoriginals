import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueBanner from "@/components/ValueBanner";
import Manifesto from "@/components/Manifesto";
import Bestsellers from "@/components/Bestsellers";
import NoTouristTrap from "@/components/NoTouristTrap";
import DesignDirections from "@/components/DesignDirections";
import ProductionStudioPreview from "@/components/ProductionStudioPreview";
import Diaspora from "@/components/Diaspora";
import JournalPreview from "@/components/JournalPreview";
import HomeNewsletter from "@/components/HomeNewsletter";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Madeira Originals | Premium Madeira Streetwear & Custom Apparel"
      description="Madeira Originals is a premium streetwear and custom apparel brand born in São Vicente, Madeira. Inspired by Madeira, designed for everywhere. 0% tourist trap."
      path="/"
    />
    <Header />
    <main>
      <Hero />
      <ValueBanner />
      <Manifesto />
      <Bestsellers />
      <NoTouristTrap />
      <DesignDirections />
      <ProductionStudioPreview />
      <Diaspora />
      <JournalPreview />
      <HomeNewsletter />
    </main>
    <Footer />
  </div>
);

export default Index;
