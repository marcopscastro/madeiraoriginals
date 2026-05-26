import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface PolicySection {
  heading: string;
  body: string;
}

interface Props {
  seoTitle: string;
  seoDescription: string;
  path: string;
  overline: string;
  title: string;
  lead: string;
  sections: PolicySection[];
}

const PolicyPage = ({ seoTitle, seoDescription, path, overline, title, lead, sections }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background grain-fixed">
      <SEO title={seoTitle} description={seoDescription} path={path} />
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32 pb-24 md:pb-40">
        <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.35em] text-accent mb-6">
          {overline}
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-medium text-foreground leading-[1.05] tracking-tight">
          {title}
        </h1>
        <p className="mt-8 font-body text-lg md:text-xl text-foreground/75 leading-relaxed">
          {lead}
        </p>

        <div className="mt-16 md:mt-24 space-y-14 md:space-y-20">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-heading text-xs font-bold uppercase tracking-[0.35em] text-foreground mb-5">
                {s.heading}
              </h2>
              <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {s.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-24 pt-10 border-t border-foreground/10">
          <p className="font-body text-sm text-muted-foreground">
            {t("policy.questions")}{" "}
            <Link to="/contact" className="text-foreground border-b border-foreground/40 hover:border-foreground">
              {t("policy.contactLink")}
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolicyPage;
