import { useTranslation } from "react-i18next";
import saoVicente from "@/assets/sao-vicente.webp";

const Diaspora = () => {
  const { t } = useTranslation();
  return (
    <section className="relative">
      <img
        src={saoVicente}
        alt={t("diaspora.imageAlt")}
        width={1600}
        height={900}
        loading="lazy"
        className="w-full h-[60vh] md:h-[70vh] object-cover"
      />
      <div className="absolute inset-0 bg-secondary/70" />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-secondary-foreground">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
            {t("diaspora.overline")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05]">
            {t("diaspora.headingA")}<br />
            <span className="italic">{t("diaspora.headingB")}</span>
          </h2>
          <p className="mt-6 font-body text-base md:text-lg leading-relaxed opacity-90 max-w-xl mx-auto">
            {t("diaspora.body")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Diaspora;
