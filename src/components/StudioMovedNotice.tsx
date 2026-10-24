import { useTranslation } from "react-i18next";

const StudioMovedNotice = () => {
  const { t } = useTranslation();
  return (
    <p className="font-body text-sm text-foreground py-3">
      <a href="https://madeirastudio.pt" className="underline underline-offset-4">
        {t("services.movedNotice")}
      </a>
    </p>
  );
};

export default StudioMovedNotice;