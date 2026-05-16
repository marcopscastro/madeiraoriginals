import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en.json";
import pt from "./locales/pt.json";

export const SUPPORTED_LANGS = ["pt", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const HREFLANG_MAP: Record<Lang, string> = {
  pt: "pt-PT",
  en: "en",
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: { en: { translation: en }, pt: { translation: pt } },
      fallbackLng: "pt",
      supportedLngs: SUPPORTED_LANGS as unknown as string[],
      load: "languageOnly",
      interpolation: { escapeValue: false },
      detection: {
        order: ["querystring", "localStorage", "navigator"],
        caches: ["localStorage"],
        lookupQuerystring: "lang",
        lookupLocalStorage: "mo_lang",
      },
    });
}

const applyHtmlLang = (lng: string) => {
  if (typeof document !== "undefined") {
    const short = lng.slice(0, 2) as Lang;
    document.documentElement.lang = HREFLANG_MAP[short] ?? "en";
  }
};

/**
 * Keep the `?lang=` query in sync with the active language so a refresh,
 * deep-link share, or back/forward nav never reverts the user's choice.
 * PT is the default and renders without the param; EN keeps `?lang=en`.
 */
const syncLangQuery = (lng: string) => {
  if (typeof window === "undefined") return;
  const short = (lng.slice(0, 2) as Lang);
  const url = new URL(window.location.href);
  const current = url.searchParams.get("lang");
  if (short === "pt") {
    if (current === null) return;
    url.searchParams.delete("lang");
  } else {
    if (current === short) return;
    url.searchParams.set("lang", short);
  }
  window.history.replaceState(window.history.state, "", url.toString());
};

applyHtmlLang(i18n.language);
syncLangQuery(i18n.language);
i18n.on("languageChanged", (lng) => {
  applyHtmlLang(lng);
  syncLangQuery(lng);
});

export default i18n;
