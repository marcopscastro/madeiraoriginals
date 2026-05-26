import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Item {
  key: string;
  title: string;
  body: string;
  linkLabel?: string;
  linkTo?: string;
}

/**
 * Editorial accordion on the product page for Shipping, Returns, Care.
 * Calm, minimal, no upsell.
 */
const ProductDetailsAccordion = () => {
  const { t } = useTranslation();
  const items: Item[] = [
    {
      key: "shipping",
      title: t("productInfo.shipping.title"),
      body: t("productInfo.shipping.body"),
      linkLabel: t("productInfo.shipping.link"),
      linkTo: "/shipping",
    },
    {
      key: "returns",
      title: t("productInfo.returns.title"),
      body: t("productInfo.returns.body"),
      linkLabel: t("productInfo.returns.link"),
      linkTo: "/returns",
    },
    {
      key: "care",
      title: t("productInfo.care.title"),
      body: t("productInfo.care.body"),
      linkLabel: t("productInfo.care.link"),
      linkTo: "/care",
    },
  ];

  return (
    <Accordion type="single" collapsible className="mt-10 border-t border-foreground/10">
      {items.map((item) => (
        <AccordionItem key={item.key} value={item.key} className="border-b border-foreground/10">
          <AccordionTrigger className="py-5 font-heading text-xs font-bold uppercase tracking-[0.3em] text-foreground hover:no-underline">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="font-body text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line pb-6">
            {item.body}
            {item.linkLabel && item.linkTo && (
              <div className="mt-4">
                <Link
                  to={item.linkTo}
                  className="font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground border-b border-foreground/40 hover:border-foreground"
                >
                  {item.linkLabel}
                </Link>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ProductDetailsAccordion;
