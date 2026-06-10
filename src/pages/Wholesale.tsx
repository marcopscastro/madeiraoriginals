import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import WholesaleGate, { wholesaleSignOut } from "@/components/WholesaleGate";
import WholesaleInquiryForm from "@/components/WholesaleInquiryForm";
import { Link } from "react-router-dom";

const tiers = [
  { qty: "25–49 units", price: "€19 / unit" },
  { qty: "50–99 units", price: "€16 / unit" },
  { qty: "100+ units", price: "€13.50 / unit" },
];

const Wholesale = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <SEO title={t("wholesale.seoTitle")} path="/wholesale" noIndex />
      <Header />
      <main>
        <WholesaleGate>
          {/* Header strip */}
          <section className="bg-secondary text-secondary-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-accent mb-3">
                  {t("tagline")}
                </p>
                <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] opacity-70 mb-3">
                  {t("wholesale.overline")}
                </p>
                <h1 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] max-w-3xl">
                  {t("wholesale.heading")}
                </h1>
                <p className="mt-4 font-body text-base md:text-lg opacity-90 max-w-2xl">
                  {t("wholesale.sub")}
                </p>
              </div>
              <button
                onClick={() => {
                  wholesaleSignOut();
                  window.location.reload();
                }}
                className="self-start md:self-auto font-heading text-[11px] font-bold uppercase tracking-widest border border-secondary-foreground/60 px-4 py-2 hover:bg-secondary-foreground hover:text-secondary transition-colors"
              >
                {t("wholesale.signOut")}
              </button>
            </div>
          </section>

          {/* Catalogue link */}
          <section className="border-b border-foreground/15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                  Catálogo B2B
                </p>
                <h3 className="font-display text-xl md:text-2xl font-semibold">
                  Vestuário e acessórios personalizáveis
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  T-shirts, polos, hoodies, totes e bonés — preços por escalão.
                </p>
              </div>
              <Link
                to="/catalogo"
                className="self-start md:self-auto font-heading text-xs font-bold uppercase tracking-widest bg-foreground text-background px-5 py-3 hover:opacity-90"
              >
                Abrir catálogo →
              </Link>
            </div>
          </section>

          {/* Corner Line */}
          <section id="corner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">01</p>
            <h2 className="font-display text-2xl md:text-4xl font-semibold text-foreground mb-3">
              {t("wholesale.sections.corner.title")}
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mb-8">
              {t("wholesale.sections.corner.body")}
            </p>
            <div className="border border-foreground/20">
              <div className="grid grid-cols-3 bg-foreground text-background font-heading text-[11px] font-bold uppercase tracking-widest">
                <div className="px-4 py-3">{t("wholesale.tiers")}</div>
                <div className="px-4 py-3">{t("wholesale.tableQty")}</div>
                <div className="px-4 py-3">{t("wholesale.tablePrice")}</div>
              </div>
              {tiers.map((tier, i) => (
                <div key={tier.qty} className="grid grid-cols-3 border-t border-foreground/15 font-body text-sm">
                  <div className="px-4 py-3 font-heading text-xs uppercase tracking-widest text-primary">
                    {t("wholesale.tierLabel", { n: i + 1 })}
                  </div>
                  <div className="px-4 py-3">{tier.qty}</div>
                  <div className="px-4 py-3">{tier.price}</div>
                </div>
              ))}
            </div>
            <a
              href="#inquire"
              className="mt-6 inline-block font-heading text-xs font-bold uppercase tracking-widest text-primary hover:opacity-70"
            >
              {t("wholesale.inquire")} →
            </a>
          </section>

          {/* White-label */}
          <section id="white-label" className="bg-muted/50 border-y border-foreground/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">02</p>
              <h2 className="font-display text-2xl md:text-4xl font-semibold text-foreground mb-3">
                {t("wholesale.sections.whiteLabel.title")}
              </h2>
              <p className="font-body text-base text-muted-foreground max-w-2xl mb-6">
                {t("wholesale.sections.whiteLabel.body")}
              </p>
              <a
                href="#inquire"
                className="inline-block font-heading text-xs font-bold uppercase tracking-widest text-primary hover:opacity-70"
              >
                {t("wholesale.inquire")} →
              </a>
            </div>
          </section>

          {/* UV DTF */}
          <section id="uv-dtf" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">03</p>
            <h2 className="font-display text-2xl md:text-4xl font-semibold text-foreground mb-3">
              {t("wholesale.sections.uvdtf.title")}
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mb-6">
              {t("wholesale.sections.uvdtf.body")}
            </p>
            <a
              href="#inquire"
              className="inline-block font-heading text-xs font-bold uppercase tracking-widest text-primary hover:opacity-70"
            >
              {t("wholesale.inquire")} →
            </a>
          </section>

          {/* Inquiry form */}
          <section id="inquire" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 scroll-mt-24">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              {t("wholesale.form.heading")}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              {t("wholesale.form.heading")}
            </h2>
            <p className="mt-3 font-body text-base text-muted-foreground">{t("wholesale.form.sub")}</p>
            <div className="mt-8">
              <WholesaleInquiryForm />
            </div>
          </section>
        </WholesaleGate>
      </main>
      <Footer />
    </div>
  );
};

export default Wholesale;
