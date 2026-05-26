import { useTranslation } from "react-i18next";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";

const Returns = () => {
  const { t } = useTranslation();
  const sections = (t("returnsPage.sections", { returnObjects: true }) as PolicySection[]) ?? [];
  return (
    <PolicyPage
      seoTitle={t("returnsPage.seoTitle")}
      seoDescription={t("returnsPage.seoDescription")}
      path="/returns"
      overline={t("returnsPage.overline")}
      title={t("returnsPage.title")}
      lead={t("returnsPage.lead")}
      sections={sections}
    />
  );
};

export default Returns;
