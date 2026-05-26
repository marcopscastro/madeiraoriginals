import { useTranslation } from "react-i18next";
import basaltImg from "@/assets/divider-basalt-texture.jpg";

const VisualDivider = () => {
  const { t } = useTranslation();
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-foreground grain">
      <img
        src={basaltImg}
        alt={t("divider.imageAlt")}
        width={1920}
        height={900}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover img-cinematic"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/30 to-foreground/70"
      />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.45em] text-background/75 mb-6">
            {t("divider.overline")}
          </p>
          <p className="font-display font-medium text-background leading-[0.98] tracking-tight text-4xl sm:text-5xl md:text-7xl max-w-3xl">
            {t("divider.line1")}
            <br />
            <span className="text-background/55">{t("divider.line2")}</span>
          </p>
        </div>
      </div>
      <div className="absolute bottom-5 right-5 sm:right-8 font-heading text-[10px] uppercase tracking-[0.35em] text-background/60">
        {t("divider.location")}
      </div>
    </section>
  );
};

export default VisualDivider;
