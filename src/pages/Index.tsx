import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueBanner from "@/components/ValueBanner";
import Manifesto from "@/components/Manifesto";
import Bestsellers from "@/components/Bestsellers";
import NoTouristTrap from "@/components/NoTouristTrap";
import DesignDirections from "@/components/DesignDirections";

import Diaspora from "@/components/Diaspora";
import JournalPreview from "@/components/JournalPreview";
import HomeNewsletter from "@/components/HomeNewsletter";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { SITE_URL, SITE_NAME, LOCAL_BUSINESS_JSONLD } from "@/lib/seo";

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/shop?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const Index = () => (
  <div className="min-h-screen bg-background">
    <PageSEO routeKey="home" jsonLd={[websiteLd, LOCAL_BUSINESS_JSONLD]} />
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
