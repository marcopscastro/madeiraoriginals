import { useTranslation } from "react-i18next";
import PolicyPage, { type PolicySection } from "@/components/PolicyPage";

const Legal = ({ kind }: { kind: "privacy" | "terms" }) => {
  const { t } = useTranslation();
  const key = `${kind}Page`;
  return <PolicyPage seoTitle={t(`${key}.seoTitle`)} seoDescription={t(`${key}.seoDescription`)} path={kind === "privacy" ? "/privacidade" : "/termos"} overline={t(`${key}.overline`)} title={t(`${key}.title`)} lead={t(`${key}.lead`)} sections={t(`${key}.sections`, { returnObjects: true }) as PolicySection[]} />;
};
export default Legal;