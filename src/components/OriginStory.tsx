import { Link } from "@/components/LocaleLink";
import { useTranslation } from "react-i18next";
import road from "@/assets/real-sao-vicente/closing-desktop.webp";

const OriginStory = () => {
  const { t } = useTranslation();
  return <section className="bg-background"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-28 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
    <div><p className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-5">{t("origin.overline")}</p>
      <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight">{t("shopHome.originHeading")}</h2>
      <p className="mt-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">{t("shopHome.originBody")}</p>
      <Link to="/about" className="mt-6 inline-flex min-h-11 items-center font-heading text-sm underline underline-offset-4">{t("shopHome.originCta")} →</Link>
    </div>
    <figure className="aspect-[4/3] overflow-hidden bg-muted"><img src={road} alt={t("shopHome.originImageAlt")} width={1200} height={900} loading="lazy" decoding="async" className="h-full w-full object-cover" /></figure>
  </div></section>;
};
export default OriginStory;
