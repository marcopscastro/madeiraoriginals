import { useTranslation } from "react-i18next";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";

const Care = () => {
  const { t } = useTranslation();
  const sections = (t("carePage.sections", { returnObjects: true }) as PolicySection[]) ?? [];
  return (
    <PolicyPage
      seoTitle={t("carePage.seoTitle")}
      seoDescription={t("carePage.seoDescription")}
      path="/care"
      overline={t("carePage.overline")}
      title={t("carePage.title")}
      lead={t("carePage.lead")}
      sections={sections}
    />
  );
};

export default Care;
