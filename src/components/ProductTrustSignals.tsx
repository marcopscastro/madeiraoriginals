import { useTranslation } from "react-i18next";
import { Truck, Lock, Recycle, MapPin } from "lucide-react";

/**
 * Minimal trust signal row for the product page.
 * Editorial restraint — no badges, no colour, just calm reassurance.
 */
const ProductTrustSignals = () => {
  const { t } = useTranslation();
  const items = [
    { Icon: MapPin, label: t("productTrust.origin") },
    { Icon: Truck, label: t("productTrust.shipping") },
    { Icon: Lock, label: t("productTrust.secure") },
    { Icon: Recycle, label: t("productTrust.built") },
  ];
  return (
    <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-foreground/10 pt-8">
      {items.map(({ Icon, label }) => (
        <li
          key={label}
          className="flex items-start gap-3 font-heading text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
        >
          <Icon size={14} strokeWidth={1.4} className="mt-0.5 flex-shrink-0 text-foreground/60" />
          <span className="leading-snug">{label}</span>
        </li>
      ))}
    </ul>
  );
};

export default ProductTrustSignals;
