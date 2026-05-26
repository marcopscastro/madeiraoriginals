import { useTranslation } from "react-i18next";

const ValueBanner = () => {
  const { t } = useTranslation();
  const items = [
    t("valueBanner.designed"),
    t("valueBanner.cotton"),
    t("valueBanner.noTrap"),
    t("valueBanner.shipped"),
  ];

  // Marquee-style row, repeated for seamless feel
  return (
    <section className="bg-foreground text-background border-y border-background/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {items.map((item, i) => (
            <p
              key={item}
              className="font-heading text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-background/85 flex items-center gap-10"
            >
              {item}
              {i < items.length - 1 && (
                <span aria-hidden className="hidden sm:inline-block w-1 h-1 rounded-full bg-accent" />
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueBanner;
