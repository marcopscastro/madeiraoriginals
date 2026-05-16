import { useTranslation } from "react-i18next";

const ValueBanner = () => {
  const { t } = useTranslation();
  const items = [
    { emoji: "📍", text: t("valueBanner.designed") },
    { emoji: "🧵", text: t("valueBanner.cotton") },
    { emoji: "🚫", text: t("valueBanner.noTrap") },
  ];

  return (
    <section className="border-y border-foreground/10 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {items.map((item) => (
            <p key={item.text} className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
              <span className="mr-2">{item.emoji}</span>
              {item.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueBanner;
