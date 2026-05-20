import { useTranslation } from "react-i18next";
import manifestoImg from "@/assets/manifesto-uber-teen-1200.webp";
import manifestoImg800 from "@/assets/manifesto-uber-teen-800.webp";

const Manifesto = () => {
  const { t } = useTranslation();
  const pillars = t("manifesto.pillars", { returnObjects: true }) as { title: string; body: string }[];

  return (
    <section className="bg-background border-y border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <img
            src={manifestoImg}
            alt={t("manifesto.imageAlt")}
            width={1280}
            height={960}
            loading="lazy"
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4">
            {t("manifesto.overline")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground leading-[1.05]">
            {t("manifesto.headingA")} <span className="italic">{t("manifesto.headingB")}</span>
          </h2>
          <p className="mt-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("manifesto.body")}
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div key={p.title}>
                <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 font-body text-sm text-muted-foreground leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
