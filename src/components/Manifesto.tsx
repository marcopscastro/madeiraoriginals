import { useTranslation } from "react-i18next";

const Manifesto = () => {
  const { t } = useTranslation();
  const pillars = t("manifesto.pillars", { returnObjects: true }) as { title: string; body: string }[];

  return (
    <section className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-28 md:py-40">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-8">
          {t("manifesto.overline")}
        </p>

        {/* Oversized editorial statement */}
        <h2 className="font-display font-medium text-foreground leading-[0.98] tracking-tight text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] max-w-5xl">
          <span className="block">{t("manifesto.lineA")}</span>
          <span className="block text-foreground/35">{t("manifesto.lineB")}</span>
          <span className="block">{t("manifesto.lineC")}</span>
        </h2>

        <div className="mt-20 md:mt-32 grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <p className="md:col-span-5 md:col-start-2 font-body text-base md:text-lg text-foreground/75 leading-relaxed">
            {t("manifesto.body")}
          </p>

          <div className="md:col-span-5 grid gap-8">
            {pillars.map((p, i) => (
              <div key={p.title} className="border-t border-foreground/15 pt-5">
                <div className="flex items-baseline gap-4">
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.35em] text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-3 font-body text-sm md:text-base text-foreground/70 leading-relaxed">
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
