import { useTranslation } from "react-i18next";
import { Link } from "@/components/LocaleLink";
import { SERVICE_CARD_IMAGES } from "@/lib/sectionImages";

/**
 * Homepage services grid — same card treatment as the services hub on /studio.
 */
const HomeServices = () => {
  const { t } = useTranslation();
  const services = t("home.servicesItems", { returnObjects: true }) as {
    title: string;
    desc: string;
    to: string;
    label?: string;
  }[];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 md:py-28">
      <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
        {t("services.hubHeading")}
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/15 border border-foreground/15">
        {services.map((s, i) => {
          const img = SERVICE_CARD_IMAGES[s.to];
          return (
            <Link key={s.to} to={s.to} className="group bg-background hover:bg-muted transition-colors">
              {img && (
                <div className="relative aspect-[16/10] overflow-hidden img-placeholder-dark">
                  <img
                    src={img}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover img-cinematic group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-8 md:p-10">
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-primary mb-4">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
                  {s.title}
                </h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                <span className="mt-6 inline-block font-heading text-xs font-bold uppercase tracking-widest text-primary group-hover:opacity-70">
                  {s.label || t("services.viewService")} →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default HomeServices;
