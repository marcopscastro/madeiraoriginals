import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <PageSEO routeKey="contact" />
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
          {t("contactPage.overline")}
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground leading-[1.05]">
          {t("contactPage.heading")}
        </h1>
        <p className="mt-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
          {t("contactPage.lead")}
        </p>

        <div className="mt-12 grid md:grid-cols-1 gap-8">
          <div className="border border-foreground/10 p-8">
            <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-primary mb-3">
              {t("contactPage.generalLabel")}
            </h2>
            <a href="mailto:hello@madeiraoriginals.pt" className="font-display text-xl text-foreground hover:text-primary transition-colors break-all">
              hello@madeiraoriginals.pt
            </a>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              {t("contactPage.generalNote")}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-foreground/10 pt-8">
          <h2 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-3">
            {t("contactPage.studioLabel")}
          </h2>
          <p className="font-body text-foreground">{t("contactPage.studioAddress")}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
