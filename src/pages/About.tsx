import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import NewsletterForm from "@/components/NewsletterForm";
import aboutHero from "@/assets/about-hero.jpg";
import saoVicente from "@/assets/sao-vicente.webp";

const About = () => {
  const { t } = useTranslation();
  const sections = t("aboutPage.sections", { returnObjects: true }) as { h: string; p: string }[];

  return (
    <div className="min-h-screen bg-background">
      <PageSEO routeKey="about" />
      <Header />
      <main>
        <section className="grid md:grid-cols-2 gap-0 items-stretch border-b border-foreground/10">
          <div className="flex items-center px-6 sm:px-10 lg:px-16 py-16 md:py-24">
            <div>
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
                {t("aboutPage.overline")}
              </p>
              <h1 className="font-display text-4xl md:text-6xl font-semibold text-foreground leading-[1.05]">
                {t("aboutPage.headingA")}<br />
                <span className="italic">{t("aboutPage.headingB")}</span>
              </h1>
              <p className="mt-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
                {t("aboutPage.lead")}
              </p>
            </div>
          </div>
          <div className="order-first md:order-last">
            <img
              src={aboutHero}
              alt={t("aboutPage.heroAlt")}
              width={1600}
              height={900}
              className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
              fetchPriority="high"
            />
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 prose-editorial">
          {sections.map((s) => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </div>
          ))}
        </article>

        <section className="relative border-y border-foreground/10">
          <img
            src={saoVicente}
            alt={t("aboutPage.saoVicenteAlt")}
            width={1600}
            height={900}
            loading="lazy"
            className="w-full h-[40vh] md:h-[55vh] object-cover"
          />
        </section>

        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground text-center mb-4">
            {t("aboutPage.newsletterHeading")}
          </h2>
          <p className="font-body text-center text-muted-foreground mb-6">
            {t("aboutPage.newsletterBody")}
          </p>
          <NewsletterForm source="about" />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
