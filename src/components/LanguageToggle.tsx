import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type Lang } from "@/i18n";

const LanguageToggle = ({ className = "" }: { className?: string }) => {
  const { i18n } = useTranslation();
  const current = (i18n.language?.slice(0, 2) as Lang) ?? "pt";

  const set = (l: Lang) => {
    if (l !== current) i18n.changeLanguage(l);
  };

  return (
    <div
      className={`inline-flex items-center border border-foreground/30 font-heading text-[11px] font-bold uppercase tracking-widest ${className}`}
      role="group"
      aria-label={i18n.t("language.label")}
    >
      {SUPPORTED_LANGS.map((l, i) => (
        <button
          key={l}
          onClick={() => set(l)}
          aria-pressed={current === l}
          className={`px-2.5 py-1 transition-colors ${
            current === l
              ? "bg-foreground text-background"
              : "text-foreground/70 hover:text-foreground"
          } ${i > 0 ? "border-l border-foreground/30" : ""}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
