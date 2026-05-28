import { useTranslation } from "react-i18next";
import NewsletterForm from "@/components/NewsletterForm";

const HomeNewsletter = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-secondary text-secondary-foreground py-14 md:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-accent mb-4">
          {t("homeNewsletter.overline")}
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3 leading-tight">
          {t("homeNewsletter.heading")}
        </h2>
        <p className="font-body text-base md:text-lg opacity-90 mb-7 max-w-lg mx-auto">
          {t("homeNewsletter.body")}
        </p>
        <NewsletterForm source="home" />
      </div>
    </section>
  );
};

export default HomeNewsletter;
