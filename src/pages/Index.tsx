import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueBanner from "@/components/ValueBanner";
import Bestsellers from "@/components/Bestsellers";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ValueBanner />
      <Bestsellers />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Index;
