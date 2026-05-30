import { useTranslation } from "react-i18next";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";

const SizeGuide = () => {
  const { t } = useTranslation();
  const sections = (t("sizeGuidePage.sections", { returnObjects: true }) as PolicySection[]) ?? [];
  return (
    <PolicyPage
      seoTitle={t("sizeGuidePage.seoTitle")}
      seoDescription={t("sizeGuidePage.seoDescription")}
      path="/size-guide"
      overline={t("sizeGuidePage.overline")}
      title={t("sizeGuidePage.title")}
      lead={t("sizeGuidePage.lead")}
      sections={sections}
    />
  );
};

export default SizeGuide;
