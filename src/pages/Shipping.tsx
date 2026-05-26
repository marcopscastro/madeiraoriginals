import { useTranslation } from "react-i18next";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";

const Shipping = () => {
  const { t } = useTranslation();
  const sections = (t("shippingPage.sections", { returnObjects: true }) as PolicySection[]) ?? [];
  return (
    <PolicyPage
      seoTitle={t("shippingPage.seoTitle")}
      seoDescription={t("shippingPage.seoDescription")}
      path="/shipping"
      overline={t("shippingPage.overline")}
      title={t("shippingPage.title")}
      lead={t("shippingPage.lead")}
      sections={sections}
    />
  );
};

export default Shipping;
