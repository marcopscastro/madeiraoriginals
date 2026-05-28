import { useTranslation } from "react-i18next";
import type { ShopifyMetafield } from "@/lib/shopify";

interface Props {
  metafields?: Array<ShopifyMetafield | null>;
  productTitle: string;
}

const getMf = (mfs: Array<ShopifyMetafield | null> | undefined, key: string) =>
  mfs?.find((m) => m && m.key === key)?.value?.trim() || "";

/**
 * Editorial product specs block — Story, Garment Details, Size & Fit.
 * Pulls from Shopify metafields (namespace: custom) with calm fallback copy.
 */
const ProductSpecs = ({ metafields, productTitle }: Props) => {
  const { t } = useTranslation();

  const story = getMf(metafields, "story") || t("productSpecs.storyFallback");
  const material = getMf(metafields, "material") || t("productSpecs.materialFallback");
  const fit = getMf(metafields, "fit") || t("productSpecs.fitFallback");
  const gsm = getMf(metafields, "gsm");
  const printMethod = getMf(metafields, "print_method") || t("productSpecs.printFallback");
  const sizeGuide = getMf(metafields, "size_guide");

  const detailLines = [
    material,
    fit,
    gsm ? t("productSpecs.gsmLine", { gsm }) : null,
    printMethod,
    t("productSpecs.origin"),
    t("productSpecs.builtToLast"),
  ].filter(Boolean) as string[];

  // Standard apparel sizing table (used when metafield absent)
  const fallbackSizes = [
    { size: "S", chest: "50", length: "70" },
    { size: "M", chest: "53", length: "72" },
    { size: "L", chest: "56", length: "74" },
    { size: "XL", chest: "59", length: "76" },
    { size: "XXL", chest: "62", length: "78" },
  ];

  return (
    <section className="mt-16 md:mt-20 border-t border-foreground/10 pt-12 md:pt-16 space-y-14 md:space-y-20">
      {/* Story */}
      <div className="grid md:grid-cols-12 gap-6 md:gap-10">
        <p className="md:col-span-3 font-heading text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">
          {t("productSpecs.storyHeading")}
        </p>
        <p className="md:col-span-9 font-body text-base md:text-lg text-foreground/75 leading-relaxed max-w-3xl whitespace-pre-line">
          {story}
        </p>
      </div>

      {/* Garment Details */}
      <div className="grid md:grid-cols-12 gap-6 md:gap-10">
        <p className="md:col-span-3 font-heading text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">
          {t("productSpecs.detailsHeading")}
        </p>
        <ul className="md:col-span-9 space-y-2 max-w-2xl">
          {detailLines.map((line) => (
            <li
              key={line}
              className="font-body text-sm md:text-base text-foreground/80 leading-relaxed pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-foreground/40"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>

      {/* Size & Fit */}
      <div className="grid md:grid-cols-12 gap-6 md:gap-10">
        <p className="md:col-span-3 font-heading text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">
          {t("productSpecs.sizeHeading")}
        </p>
        <div className="md:col-span-9 max-w-2xl">
          <p className="font-body text-sm md:text-base text-foreground/75 leading-relaxed mb-6">
            {t("productSpecs.sizeIntro")}
          </p>

          {sizeGuide ? (
            <p className="font-body text-sm text-foreground/75 leading-relaxed whitespace-pre-line">
              {sizeGuide}
            </p>
          ) : (
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full min-w-[420px] border-t border-foreground/10">
                <thead>
                  <tr className="font-heading text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/55">
                    <th className="text-left py-3 px-2 font-medium">{t("productSpecs.tSize")}</th>
                    <th className="text-left py-3 px-2 font-medium">{t("productSpecs.tChest")}</th>
                    <th className="text-left py-3 px-2 font-medium">{t("productSpecs.tLength")}</th>
                  </tr>
                </thead>
                <tbody className="font-body text-sm text-foreground/80">
                  {fallbackSizes.map((row) => (
                    <tr key={row.size} className="border-t border-foreground/10">
                      <td className="py-3 px-2 font-heading text-xs font-semibold uppercase tracking-widest">
                        {row.size}
                      </td>
                      <td className="py-3 px-2">{row.chest} cm</td>
                      <td className="py-3 px-2">{row.length} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 font-body text-xs text-foreground/55 leading-relaxed">
                {t("productSpecs.sizeNote")}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSpecs;
