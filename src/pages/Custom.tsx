import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import CustomQuoteForm from "@/components/CustomQuoteForm";

const Custom = () => {
  const { t } = useTranslation();
  const services = t("custom.services.items", { returnObjects: true }) as {
    title: string;
    body: string;
  }[];
  const audiences = t("custom.audiences.items", { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("custom.seoTitle")}
        description={t("custom.seoDescription")}
        path="/custom"
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-background border-b border-foreground/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 md:pt-32 pb-20 md:pb-28">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-6">
              {t("custom.overline")}
            </p>
            <h1 className="font-display font-medium text-foreground leading-[0.98] tracking-tight text-5xl md:text-7xl lg:text-[5.5rem] max-w-4xl">
              {t("custom.headingA")}{" "}
              <span className="text-foreground/40">{t("custom.headingB")}</span>
            </h1>
            <p className="mt-10 font-body text-base md:text-lg text-foreground/75 max-w-2xl leading-relaxed">
              {t("custom.subcopy")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-5">
              <a
                href="#quote"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground font-heading font-semibold text-[12px] uppercase tracking-[0.3em] px-10 py-[18px] hover:opacity-90 transition-opacity"
              >
                {t("custom.ctaQuote")}
              </a>
              <Link
                to="/studio"
                className="inline-flex items-center justify-center text-foreground font-heading font-semibold text-[12px] uppercase tracking-[0.3em] px-2 py-[18px] border-b border-foreground/60 hover:border-foreground transition-colors"
              >
                {t("custom.ctaStudio")} →
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-24 md:py-32">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-6">
            {t("custom.services.overline")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground tracking-tight max-w-3xl leading-tight">
            {t("custom.services.heading")}
          </h2>
          <div className="mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/15 border border-foreground/15">
            {services.map((s, i) => (
              <article key={s.title} className="bg-background p-8 md:p-10">
                <p className="font-heading text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/45 mb-5">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-medium text-foreground mb-4 leading-tight">
                  {s.title}
                </h3>
                <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Audiences strip */}
        <section className="bg-foreground text-background py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-[0.4em] text-background/60 mb-6">
              {t("custom.audiences.overline")}
            </p>
            <p className="font-body text-base md:text-lg leading-relaxed text-background/85">
              {audiences.join(" · ")}
            </p>
          </div>
        </section>

        {/* Quote form */}
        <section id="quote" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-24 md:py-32">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-6 text-center">
            {t("custom.form.overline")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground tracking-tight text-center mb-4 leading-tight">
            {t("custom.form.heading")}
          </h2>
          <p className="font-body text-base text-foreground/65 text-center mb-12 max-w-xl mx-auto leading-relaxed">
            {t("custom.form.sub")}
          </p>
          <CustomQuoteForm />
          <p className="mt-8 font-heading text-[10px] uppercase tracking-[0.3em] text-foreground/55 text-center">
            {t("custom.designedIn")}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Custom;
