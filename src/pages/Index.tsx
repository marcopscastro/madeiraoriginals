import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";
import OriginStory from "@/components/OriginStory";
import JournalPreview from "@/components/JournalPreview";
import HomeNewsletter from "@/components/HomeNewsletter";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Link } from "@/components/LocaleLink";
import { Button } from "@/components/ui/button";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const websiteLd = { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL };
const Index = () => {
  const { t } = useTranslation();
  return <div className="min-h-screen bg-background">
    <PageSEO routeKey="home" jsonLd={websiteLd} />
    <Header />
    <main>
      <Hero />
      <HomeProducts />
      <section className="border-y border-foreground/15"><p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 font-body text-sm md:text-base leading-relaxed">{t("shopHome.facts")}</p></section>
      <OriginStory />
      <section className="bg-secondary text-secondary-foreground"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div><p className="font-heading text-xs uppercase tracking-widest mb-4">{t("nav.wholesale")}</p><h2 className="font-display text-3xl md:text-5xl font-medium max-w-3xl leading-tight">{t("shopHome.wholesaleHeading")}</h2><p className="mt-4 font-body text-lg">{t("shopHome.wholesaleBody")}</p></div>
        <Button asChild className="h-14 rounded-none bg-background text-foreground hover:bg-muted font-heading uppercase tracking-widest px-8 self-start"><Link to="/wholesale">{t("nav.wholesale")} →</Link></Button>
      </div></section>
      <JournalPreview />
      <HomeNewsletter />
      <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 font-body text-sm text-muted-foreground"><a href="https://madeirastudio.pt" className="underline underline-offset-4">{t("shopHome.studioLine")}</a></p>
    </main>
    <Footer />
  </div>;
};
export default Index;
