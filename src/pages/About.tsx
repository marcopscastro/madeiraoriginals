import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import NewsletterForm from "@/components/NewsletterForm";
import heroImg from "@/assets/hero-volcanic-coast.jpg";
import villageImg from "@/assets/origin-sao-vicente-village.jpg";
import basaltImg from "@/assets/divider-basalt-texture.jpg";
import fogRoad from "@/assets/divider-fog-road.jpg";

const About = () => {
  const { t } = useTranslation();
  const pillars = t("aboutPage.philosophy.pillars", { returnObjects: true }) as {
    k: string;
    title: string;
    body: string;
  }[];

  return (
    <div className="min-h-screen bg-background grain-fixed">
      <PageSEO routeKey="about" />
      <Header />
      <main>
        {/* OPENER — full-bleed cinematic */}
        <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-foreground text-background">
          <img
            src={heroImg}
            alt={t("aboutPage.opener.heroAlt")}
            width={1920}
            height={1280}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover img-cinematic animate-ken-burns"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/20 to-foreground/85" />

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col">
            <div className="pt-32 md:pt-40">
              <p className="font-heading text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.4em] text-background/75">
                {t("aboutPage.volume")}
              </p>
            </div>

            <div className="mt-auto pb-20 md:pb-28 max-w-4xl">
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-background/75 mb-8">
                {t("aboutPage.opener.overline")}
              </p>
              <h1 className="font-display font-medium leading-[0.98] tracking-tight text-5xl sm:text-7xl md:text-8xl">
                {t("aboutPage.opener.headingA")}
                <br />
                <span className="text-background/55 italic">{t("aboutPage.opener.headingB")}</span>
              </h1>
              <p className="mt-10 font-body text-base md:text-xl text-background/85 leading-relaxed max-w-2xl">
                {t("aboutPage.opener.lead")}
              </p>
              <p className="mt-10 font-heading text-[10px] font-semibold uppercase tracking-[0.45em] text-background/60">
                {t("aboutPage.opener.coords")}
              </p>
            </div>
          </div>
        </section>

        {/* CHAPTER I — ORIGIN */}
        <section className="bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-32 md:py-48 grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-3">
                {t("aboutPage.origin.chapter")}
              </p>
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-foreground/55 mb-8">
                {t("aboutPage.origin.overline")}
              </p>
              <h2 className="font-display font-medium leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl text-foreground">
                {t("aboutPage.origin.headingA")}{" "}
                <span className="text-foreground/40">{t("aboutPage.origin.headingB")}</span>
              </h2>
              <div className="mt-10 space-y-6 max-w-xl">
                <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed">
                  {t("aboutPage.origin.p1")}
                </p>
                <p className="font-body text-base md:text-lg text-foreground/70 leading-relaxed">
                  {t("aboutPage.origin.p2")}
                </p>
                <p className="font-body text-base md:text-lg text-foreground/70 leading-relaxed">
                  {t("aboutPage.origin.p3")}
                </p>
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden bg-foreground">
                <img
                  src={villageImg}
                  alt={t("aboutPage.origin.imageAlt")}
                  width={1600}
                  height={2000}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover img-cinematic"
                />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-background/85">
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.3em]">
                    São Vicente · Madeira
                  </span>
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.3em]">
                    32.8° N · 17.0° W
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER II — PHILOSOPHY */}
        <section className="bg-background border-t border-foreground/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-32 md:py-48">
            <div className="max-w-4xl">
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-3">
                {t("aboutPage.philosophy.chapter")}
              </p>
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-foreground/55 mb-8">
                {t("aboutPage.philosophy.overline")}
              </p>
              <h2 className="font-display font-medium leading-[1.02] tracking-tight text-4xl md:text-5xl lg:text-6xl text-foreground">
                {t("aboutPage.philosophy.headingA")}{" "}
                <span className="text-foreground/40">{t("aboutPage.philosophy.headingB")}</span>
              </h2>
            </div>

            <dl className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-10 gap-y-14 border-t border-foreground/15 pt-12">
              {pillars.map((p) => (
                <div key={p.k}>
                  <dt>
                    <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.4em] text-foreground/45">
                      {p.k}
                    </span>
                    <span className="mt-3 block font-display text-xl md:text-2xl text-foreground tracking-tight">
                      {p.title}
                    </span>
                  </dt>
                  <dd className="mt-4 font-body text-sm md:text-base text-foreground/70 leading-relaxed">
                    {p.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* CHAPTER III — FIELD NOTES */}
        <section className="relative bg-foreground text-background overflow-hidden">
          <img
            src={basaltImg}
            alt={t("aboutPage.field.imageAlt")}
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover img-cinematic opacity-45"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/55 to-foreground/85" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-36 md:py-56">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-background/70 mb-3">
              {t("aboutPage.field.chapter")}
            </p>
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-background/55 mb-10">
              {t("aboutPage.field.overline")}
            </p>
            <h2 className="font-display font-medium leading-[1.02] tracking-tight text-4xl md:text-6xl lg:text-7xl max-w-3xl">
              {t("aboutPage.field.headingA")}
              <br />
              <span className="text-background/55 italic">{t("aboutPage.field.headingB")}</span>
            </h2>
            <div className="mt-12 grid md:grid-cols-2 gap-10 max-w-3xl">
              <p className="font-body text-base md:text-lg text-background/85 leading-relaxed">
                {t("aboutPage.field.p1")}
              </p>
              <p className="font-body text-base md:text-lg text-background/75 leading-relaxed">
                {t("aboutPage.field.p2")}
              </p>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="relative bg-foreground text-background overflow-hidden border-t border-background/10">
          <img
            src={fogRoad}
            alt=""
            aria-hidden
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover img-cinematic opacity-45"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/40" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-36 md:py-56 text-center">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.45em] text-background/70 mb-8">
              {t("aboutPage.closing.overline")}
            </p>
            <h2 className="font-display font-medium leading-[0.98] tracking-tight text-4xl sm:text-6xl md:text-7xl">
              {t("aboutPage.closing.headingA")}
              <br />
              <span className="text-background/55">{t("aboutPage.closing.headingB")}</span>
            </h2>
            <p className="mt-10 font-body text-base md:text-lg text-background/80 max-w-2xl mx-auto">
              {t("aboutPage.closing.body")}
            </p>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              <Link
                to="/shop"
                className="font-heading text-[12px] font-semibold uppercase tracking-[0.3em] text-background border-b border-background pb-1 hover:opacity-80 transition-opacity"
              >
                Explore Collection →
              </Link>
              <Link
                to="/journal"
                className="font-heading text-[12px] font-semibold uppercase tracking-[0.3em] text-background/70 hover:text-background border-b border-background/30 hover:border-background pb-1 transition-colors"
              >
                Read the Journal →
              </Link>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <h2 className="font-display text-2xl md:text-3xl text-foreground text-center mb-4 tracking-tight">
            {t("aboutPage.newsletterHeading")}
          </h2>
          <p className="font-body text-center text-muted-foreground mb-8">
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
