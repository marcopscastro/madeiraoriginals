import { useTranslation } from "react-i18next";
import { Link } from "@/components/LocaleLink";

/**
 * Homepage services grid — same card treatment as the services hub on /studio.
 */
const HomeServices = () => {
  const { t } = useTranslation();
  const services = t("home.servicesItems", { returnObjects: true }) as {
    title: string;
    desc: string;
    to: string;
  }[];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
        {t("services.hubHeading")}
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/15 border border-foreground/15">
        {services.map((s, i) => (
          <Link key={s.to} to={s.to} className="group bg-background p-8 md:p-10 hover:bg-muted transition-colors">
            <p className="font-heading text-xs font-bold uppercase tracking-widest text-primary mb-4">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              {s.title}
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed">{s.desc}</p>
            <span className="mt-6 inline-block font-heading text-xs font-bold uppercase tracking-widest text-primary group-hover:opacity-70">
              {t("services.viewService")} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeServices;
