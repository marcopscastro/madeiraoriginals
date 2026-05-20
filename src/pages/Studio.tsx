import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import StudioQuoteForm from "@/components/StudioQuoteForm";
import { LOCAL_BUSINESS_JSONLD } from "@/lib/seo";

const Studio = () => {
  const { t } = useTranslation();

  const pillars = [
    { key: "digital" as const, num: "01" },
    { key: "apparel" as const, num: "02" },
    { key: "physical" as const, num: "03" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageSEO routeKey="productionStudio" jsonLd={LOCAL_BUSINESS_JSONLD} />
      <Header />
      <main>
        {/* Hero — darker, technical, brutalist */}
        <section className="bg-secondary text-secondary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-accent mb-6">
              {t("tagline")}
            </p>
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] opacity-70 mb-4">
              {t("studio.overline")}
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] max-w-4xl">
              {t("studio.h1Line1")}
              <br />
              <span className="italic text-accent">{t("studio.h1Line2")}</span>
            </h1>
            <p className="mt-8 font-body text-base md:text-lg opacity-90 max-w-2xl leading-relaxed">
              {t("studio.subcopy")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="#quote"
                className="inline-flex items-center justify-center bg-accent text-accent-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:opacity-90 transition-opacity"
              >
                {t("studio.ctaQuote")}
              </a>
              <a
                href="#pillars"
                className="inline-flex items-center justify-center border border-secondary-foreground/60 text-secondary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-secondary-foreground hover:text-secondary transition-colors"
              >
                {t("studio.ctaServices")}
              </a>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section id="pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
            {t("studio.pillarsHeading")}
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/15 border border-foreground/15">
            {pillars.map((p) => (
              <article key={p.key} className="bg-background p-8 md:p-10">
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-primary mb-4">
                  {p.num}
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  {t(`studio.pillars.${p.key}.title`)}
                </h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  {t(`studio.pillars.${p.key}.items`)}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Trusted by strip */}
        <section className="bg-foreground text-background py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] opacity-70 mb-3">
              {t("studio.trustedBy")}
            </p>
            <p className="font-body text-base md:text-lg opacity-95">
              {t("studio.trustedList")}
            </p>
          </div>
        </section>

        {/* Projects / Case studies */}
        <section id="projects" className="bg-background border-t border-foreground/10 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
              {t("studio.projects.overline")}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05] max-w-3xl">
              {t("studio.projects.heading")}
            </h2>

            <article className="mt-12 border border-foreground/15 bg-background">
              {/* Image slot — placeholder until screenshots */}
              <div className="aspect-[4/3] md:aspect-[16/9] w-full bg-secondary/10 border-b border-foreground/15 flex items-center justify-center">
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  {t("studio.projects.imageSoon")}
                </p>
              </div>

              <div className="p-6 sm:p-10 md:p-12">
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-4">
                  {t("studio.projects.posBrasa.eyebrow")}
                </p>
                <h3 className="font-display text-2xl md:text-4xl font-semibold text-foreground leading-[1.1]">
                  {t("studio.projects.posBrasa.title")}
                </h3>
                <p className="mt-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  {t("studio.projects.posBrasa.lede")}
                </p>
                <p className="mt-4 font-body text-base text-muted-foreground leading-relaxed max-w-3xl">
                  {t("studio.projects.posBrasa.about")}
                </p>
                <p className="mt-6 font-display italic text-xl md:text-2xl text-primary max-w-3xl">
                  &ldquo;{t("studio.projects.posBrasa.tagline")}&rdquo;
                </p>

                <div className="mt-10 pt-8 border-t border-foreground/10">
                  <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6">
                    {t("studio.projects.posBrasa.capabilitiesHeading")}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                    {(t("studio.projects.posBrasa.capabilities", { returnObjects: true }) as string[]).map((cap, i) => (
                      <li key={i} className="flex gap-3 font-body text-sm md:text-base text-foreground/90 leading-relaxed">
                        <span aria-hidden className="font-heading text-accent font-bold shrink-0">→</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 border-l-2 border-accent bg-secondary/5 p-5 md:p-6">
                  <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-2">
                    {t("studio.projects.posBrasa.disclaimerLabel")}
                  </p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {t("studio.projects.posBrasa.disclaimer")}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>



        {/* Quote form */}
        <section id="quote" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 scroll-mt-24">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
            {t("studio.form.heading")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05]">
            {t("studio.form.heading")}
          </h2>
          <p className="mt-4 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("studio.form.sub")}
          </p>
          <div className="mt-10">
            <StudioQuoteForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Studio;
