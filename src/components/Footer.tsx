import { Link } from "@/components/LocaleLink";
import { useTranslation } from "react-i18next";
import NewsletterForm from "@/components/NewsletterForm";
import logoMark from "@/assets/madeira-originals-logo.svg";

const Footer = () => {
  const { t } = useTranslation();

  const sections = [
    {
      heading: t("footer.shop"),
      links: [
        { label: t("nav.shopAll"), to: "/shop" },
        { label: t("nav.tshirts"), to: "/madeira-t-shirts" },
        { label: t("nav.hoodies"), to: "/madeira-hoodies" },
        { label: t("nav.accessories"), to: "/madeira-accessories" },
        { label: t("nav.stickers"), to: "/madeira-stickers" },
      ],
    },
    {
      heading: t("footer.brand"),
      links: [
        { label: t("nav.wholesale"), to: "/wholesale" },
        { label: t("nav.about"), to: "/about" },
        { label: t("nav.journal"), to: "/journal" },
        { label: t("nav.contact"), to: "/contact" },
      ],
    },
    {
      heading: t("footer.support"),
      links: [
        { label: t("footer.shipping"), to: "/shipping" },
        { label: t("footer.returns"), to: "/returns" },
        { label: t("footer.privacy"), to: "/privacidade" },
        { label: t("footer.terms"), to: "/termos" },
        { label: t("footer.complaints"), to: "https://www.livroreclamacoes.pt" },
        { label: t("footer.care"), to: "/care" },
        { label: t("footer.sizeGuide"), to: "/size-guide" },
      ],
    },
  ];

  return (
    <footer className="border-t-2 border-foreground bg-background pb-safe pl-safe pr-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link to="/" aria-label="Madeira Originals" className="inline-block mb-4"> {/* i18n-ignore */}
              <img src={logoMark} alt="Madeira Originals" className="h-11 w-auto" loading="lazy" decoding="async" /> {/* i18n-ignore */}
            </Link>
            <h3 className="font-display text-2xl font-semibold text-foreground">
              {t("footer.joinHeading")}
            </h3>
            <p className="mt-2 font-body text-muted-foreground">{t("footer.joinBody")}</p>
            <div className="mt-4">
              <NewsletterForm source="footer" />
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.heading}>
              <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                {s.heading}
              </h4>
              <ul className="space-y-2">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} reloadDocument={l.to.startsWith("https://")} className="font-body text-sm text-muted-foreground hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-foreground/10">
          <p className="font-body text-sm text-muted-foreground text-center mb-6"><a href="https://madeirastudio.pt" className="underline underline-offset-4">{t("footer.studioLink")}</a></p>
          <p className="font-heading text-[10px] uppercase tracking-[0.35em] text-muted-foreground text-center mb-6">
            {t("footer.designedIn")}
          </p>
          <p className="font-body text-sm text-muted-foreground text-center">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
