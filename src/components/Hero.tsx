import { Link } from "@/components/LocaleLink";
import { useTranslation } from "react-i18next";
import { useProducts } from "@/hooks/useShopifyProducts";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const { t } = useTranslation();
  const { data: products = [] } = useProducts(100);
  const product = products.find((p) => p.node.handle.startsWith("capelinha-do-calhau")) ?? products[0];
  const image = product?.node.images.edges[0]?.node;
  return (
    <section className="w-full bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-16">
        <p className="font-heading text-xs font-medium uppercase tracking-widest mb-8">Madeira Originals · São Vicente</p>{/* i18n-ignore */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="min-w-0">
            <h1 className="font-display font-medium leading-[1.02] text-4xl sm:text-6xl lg:text-7xl text-balance">{t("shopHome.headline")}</h1>
            <p className="mt-6 font-body text-base md:text-lg text-background/90 leading-relaxed max-w-xl">{t("shopHome.subline")}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center">
              <Button asChild className="h-14 rounded-none bg-background text-foreground hover:bg-muted font-heading uppercase tracking-widest px-6"><Link to="/shop">{t("shopHome.ctaShop")}</Link></Button>
              <Button asChild variant="link" className="h-14 rounded-none text-background font-heading uppercase tracking-wide px-0"><Link to="/wholesale">{t("shopHome.ctaWholesale")} →</Link></Button>
            </div>
          </div>
          {image && <figure className="min-w-0">
            <Link to={`/product/${product.node.handle}`} className="block aspect-[4/5] md:aspect-square overflow-hidden">
              <img src={image.url} alt={image.altText || product.node.title} width={1000} height={1250} loading="eager" fetchPriority="high" decoding="async" className="h-full w-full object-contain" />
            </Link>
            <figcaption className="mt-3 font-heading text-xs text-background/80">{product.node.title}</figcaption>
          </figure>}
        </div>
      </div>
    </section>
  );
};
export default Hero;
