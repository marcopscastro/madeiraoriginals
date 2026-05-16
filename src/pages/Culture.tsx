import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import cultureHero from "@/assets/culture-hero.jpg";

const cardImages = [
  "https://images.unsplash.com/photo-1602866381-3935e6c2eb39?auto=format&fit=crop&w=900&q=70",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=70",
  "https://images.unsplash.com/photo-1528461160043-aa6f0fc26b32?auto=format&fit=crop&w=900&q=70",
];

const Culture = () => {
  const { t } = useTranslation();
  const cards = t("culturePage.cards", { returnObjects: true }) as { tag: string; title: string; body: string }[];
  const longform = t("culturePage.longform", { returnObjects: true }) as { h: string; p: string[] }[];
  const traditions = t("culturePage.traditions", { returnObjects: true }) as { label: string; body: string }[];

  return (
    <div className="min-h-screen bg-background">
      <PageSEO routeKey="culture" />
      <Header />
      <main>
        <section className="relative">
          <img
            src={cultureHero}
            alt={t("culturePage.heroAlt")}
            width={1600}
            height={900}
            className="w-full h-[55vh] md:h-[70vh] object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-foreground/30" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20 w-full text-background">
              <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
                {t("culturePage.overline")}
              </p>
              <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05]">
                {t("culturePage.headingA")}<br />
                <span className="italic">{t("culturePage.headingB")}</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("culturePage.lead")}
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 grid md:grid-cols-3 gap-8 md:gap-10">
          {cards.map((b, i) => (
            <article key={b.title}>
              <div className="aspect-[4/5] overflow-hidden bg-muted mb-4">
                <img src={cardImages[i]} alt={b.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-2">{b.tag}</p>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{b.body}</p>
            </article>
          ))}
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 md:pb-8 text-center">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80"
          >
            {t("culturePage.readJournal")}
          </Link>
        </section>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 prose-editorial">
          {longform.map((s) => (
            <div key={s.h}>
              <h2>{s.h}</h2>
              {s.p.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ))}

          <h2>{t("culturePage.traditionsHeading")}</h2>
          <ul>
            {traditions.map((tr) => (
              <li key={tr.label}>
                <strong>{tr.label}</strong> — {tr.body}
              </li>
            ))}
          </ul>

          <h2>{t("culturePage.diasporaHeading")}</h2>
          <p>{t("culturePage.diasporaBody")}</p>

          <h2>{t("culturePage.inspireHeading")}</h2>
          <p>{t("culturePage.inspireBody1")}</p>
          <p>{t("culturePage.inspireBody2")}</p>

          <p>
            <Link to="/shop">{t("culturePage.shopLink")}</Link>
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Culture;
