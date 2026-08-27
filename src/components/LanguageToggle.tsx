import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { SUPPORTED_LANGS, type Lang } from "@/i18n";
import { langFromPathname, localizePath, stripLocale } from "@/lib/locale";

const LanguageToggle = ({ className = "" }: { className?: string }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const current = langFromPathname(location.pathname);

  // Switches to the SAME page in the other language — never back to the home page.
  const set = (l: Lang) => {
    if (l === current) return;
    i18n.changeLanguage(l); // persisted in localStorage (mo_lang)
    navigate(
      `${localizePath(stripLocale(location.pathname), l)}${location.search}${location.hash}`,
    );
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
