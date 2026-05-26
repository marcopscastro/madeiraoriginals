import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Minus, Plus, ShoppingCart, Loader2 } from "lucide-react";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedProducts from "@/components/RelatedProducts";
import ImageLightbox from "@/components/ImageLightbox";
import SEO from "@/components/SEO";
import ProductTrustSignals from "@/components/ProductTrustSignals";
import ProductDetailsAccordion from "@/components/ProductDetailsAccordion";
import ProductReviews, { useProductRating } from "@/components/ProductReviews";
import { useProductByHandle } from "@/hooks/useShopifyProducts";
import { formatPrice } from "@/lib/shopify";
import { productAlt } from "@/lib/productAlt";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const TAGLINE_RE = /inspired by madeira\.?\s*designed for everywhere\.?\s*0%\s*tourist\s*trap\.?/gi;
const stripTagline = (s?: string) => (s ?? "").replace(TAGLINE_RE, "").trim();

const ProductDetail = () => {
  const { t } = useTranslation();
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProductByHandle(handle);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);
  const rating = useProductRating(handle);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const variants = useMemo(
    () => product?.variants.edges.map((e) => e.node) ?? [],
    [product]
  );
  const options = product?.options ?? [];
  const singleVariant = variants.length === 1 ? variants[0] : null;

  const activeVariant = useMemo(() => {
    if (singleVariant) return singleVariant;
    if (options.length === 0) return null;
    const allChosen = options.every((o) => selectedOptions[o.name]);
    if (!allChosen) return null;
    return (
      variants.find((v) =>
        v.selectedOptions.every((so) => selectedOptions[so.name] === so.value)
      ) ?? null
    );
  }, [variants, options, selectedOptions, singleVariant]);

  const needsSelection = !singleVariant && options.length > 0;
  const allSoldOut = variants.length > 0 && variants.every((v) => !v.availableForSale);
  const missingOption = needsSelection
    ? options.find((o) => !selectedOptions[o.name])?.name
    : undefined;

  // Default-select the first available variant's options
  useEffect(() => {
    if (!product || singleVariant) return;
    if (Object.keys(selectedOptions).length > 0) return;
    const firstAvailable = variants.find((v) => v.availableForSale) ?? variants[0];
    if (firstAvailable) {
      const initial: Record<string, string> = {};
      firstAvailable.selectedOptions.forEach((o) => {
        initial[o.name] = o.value;
      });
      setSelectedOptions(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  // For a given option, check if a value has any in-stock variant given other current selections
  const isValueAvailable = (optionName: string, value: string) => {
    return variants.some((v) => {
      if (!v.availableForSale) return false;
      return v.selectedOptions.every((so) => {
        if (so.name === optionName) return so.value === value;
        const sel = selectedOptions[so.name];
        return !sel || sel === so.value;
      });
    });
  };

  // Swap main image when active variant has its own image (e.g. colour change)
  useEffect(() => {
    const variantImageUrl = activeVariant?.image?.url;
    if (!variantImageUrl || !product) return;
    const idx = product.images.edges.findIndex((e) => e.node.url === variantImageUrl);
    if (idx >= 0) setSelectedImage(idx);
  }, [activeVariant?.id, product]);

  // Clamp quantity to active variant's stock when it changes
  useEffect(() => {
    const stock = activeVariant?.quantityAvailable;
    if (typeof stock === "number" && stock > 0 && quantity > stock) {
      setQuantity(stock);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVariant?.id]);

  const sanitizedDescription = useMemo(() => {
    const html = product?.descriptionHtml;
    if (!html) return "";
    const cleaned = stripTagline(html);
    return DOMPurify.sanitize(cleaned, { USE_PROFILES: { html: true } });
  }, [product?.descriptionHtml]);

  // Strip HTML tags + tagline + collapse whitespace for SEO/JSON-LD copy
  const plainDescription = useMemo(() => {
    const raw = product?.descriptionHtml || product?.description || "";
    const noTags = raw.replace(/<[^>]*>/g, " ");
    return stripTagline(noTags).replace(/\s+/g, " ").trim();
  }, [product?.descriptionHtml, product?.description]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center font-body text-muted-foreground">
          {t("product.loading")}
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="font-heading text-3xl font-bold uppercase text-foreground mb-4">
            {t("product.notFound")}
          </h1>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-primary hover:opacity-80"
          >
            <ArrowLeft size={16} /> {t("product.backToShop")}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images.edges.map((e) => e.node);
  const currentImage = images[selectedImage];
  const price = activeVariant?.price ?? product.priceRange.minVariantPrice;
  const totalPrice = parseFloat(price.amount) * quantity;

  const handleAddToCart = async () => {
    if (allSoldOut) {
      toast.error(t("product.soldOutShort"));
      return;
    }
    if (!activeVariant) {
      toast.error(
        missingOption
          ? t("product.pleaseSelect", { name: missingOption.toLowerCase() })
          : t("product.pleaseSelectOptions")
      );
      return;
    }
    const ok = await addItem({
      product: {
        node: {
          id: product.id,
          title: product.title,
          handle: product.handle,
          images: product.images,
        },
      },
      variantId: activeVariant.id,
      variantTitle: activeVariant.title,
      price: activeVariant.price,
      quantity,
      selectedOptions: activeVariant.selectedOptions,
    });
    if (!ok) {
      toast.error(t("product.addError"), {
        description: t("product.addErrorBody"),
        position: "top-center",
      });
      return;
    }
    toast.success(t("product.addedToCart", { title: product.title }), {
      description: needsSelection
        ? t("product.addedVariantQty", { variant: activeVariant.title, qty: quantity })
        : t("product.addedQty", { qty: quantity }),
      position: "top-center",
    });
  };

  // (plainDescription is computed above before early returns)

  const truncate = (s: string, n: number) => {
    if (s.length <= n) return s;
    const cut = s.slice(0, n);
    const lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > 100 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
  };

  const productLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: plainDescription.slice(0, 5000),
    image: images.map((i) => i.url),
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      price: price.amount,
      priceCurrency: price.currencyCode,
      availability: activeVariant?.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/product/${product.handle}`,
    },
  };
  if (activeVariant?.sku) productLd.sku = activeVariant.sku;
  if (rating && rating.count > 0) {
    productLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating.avg.toFixed(1),
      reviewCount: rating.count,
    };
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Shop", item: `${SITE_URL}/shop` },
      { "@type": "ListItem", position: 3, name: product.title, item: `${SITE_URL}/product/${product.handle}` },
    ],
  };

  // SEO title: cap full title (incl. brand suffix) at ~60 chars so Google doesn't truncate.
  const BRAND_SUFFIX = " | Madeira Originals";
  const titleBudget = 60 - BRAND_SUFFIX.length; // ~40 chars for product title
  const shortTitle =
    product.title.length > titleBudget
      ? truncate(product.title, titleBudget)
      : product.title;
  const seoTitle = `${shortTitle}${BRAND_SUFFIX}`;

  // SEO description: prefer Shopify copy when it's a real sentence (not a list/heading),
  // otherwise scaffold a keyword-rich lead. Always capped at 160 chars.
  const looksLikeSentence =
    plainDescription.length >= 60 &&
    /[.!?]/.test(plainDescription.slice(0, 200)) &&
    !/^[-•*]/.test(plainDescription);
  const scaffoldLead = t("product.seoFallback", { title: product.title });
  const seoDescription = truncate(
    looksLikeSentence ? plainDescription : `${scaffoldLead} ${plainDescription}`.trim(),
    160
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/product/${product.handle}`}
        type="product"
        image={images[0]?.url}
        jsonLd={[productLd, breadcrumbLd]}
      />
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-12 md:pt-20 pb-28 md:pb-32">
        <nav className="flex items-center gap-2 font-heading text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/55 mb-10 md:mb-16">
          <Link to="/" className="hover:text-foreground transition-colors">{t("product.home")}</Link>
          <span>·</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">{t("product.shop")}</Link>
          <span>·</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-5">
            <div className="relative overflow-hidden bg-muted aspect-[4/5]">
              {currentImage ? (
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="w-full h-full block cursor-zoom-in"
                  aria-label={t("product.zoomImage")}
                >
                  <img
                    src={currentImage.url}
                    alt={productAlt({
                      title: product.title,
                      shopifyAlt: currentImage.altText,
                      index: selectedImage,
                      total: images.length,
                    })}
                    className="w-full h-full object-cover img-cinematic"
                  />
                </button>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-foreground/45 font-heading text-xs uppercase tracking-[0.3em]">
                  {t("product.comingSoon")}
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    aria-label={t("product.thumbAria", { i: i + 1, total: images.length })}
                    aria-current={selectedImage === i}
                    className={`w-20 h-24 overflow-hidden bg-muted transition-opacity ${
                      selectedImage === i
                        ? "opacity-100 ring-1 ring-foreground"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={productAlt({
                        title: product.title,
                        shopifyAlt: img.altText,
                        index: i,
                        total: images.length,
                      })}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col md:pt-4">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-[1.05] tracking-tight">
              {product.title}
            </h1>
            <p className="mt-5 font-body text-lg sm:text-xl text-foreground/75">
              {formatPrice(price)}
            </p>
            {rating && rating.count > 0 && (
              <a
                href="#reviews"
                className="mt-2 inline-flex items-center gap-2 font-heading text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
              >
                <span className="text-accent tracking-tight">
                  {"★".repeat(Math.round(rating.avg))}
                  <span className="text-foreground/20">{"★".repeat(5 - Math.round(rating.avg))}</span>
                </span>
                {rating.avg.toFixed(1)} · {rating.count} {rating.count === 1 ? t("product.reviewsOne") : t("product.reviewsOther")}
              </a>
            )}
            <p className="mt-3 font-heading text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {t("product.tagline")}
            </p>
            {sanitizedDescription ? (
              <div
                className="mt-6 font-body text-base text-muted-foreground leading-relaxed prose prose-sm max-w-none prose-headings:font-heading prose-headings:uppercase prose-headings:tracking-wide prose-headings:text-foreground prose-strong:text-foreground prose-li:my-1"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              />
            ) : product.description ? (
              <p className="mt-6 font-body text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {stripTagline(product.description)}
              </p>
            ) : null}

            {needsSelection && options.map((opt) => (
              <div key={opt.name} className="mt-8">
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                  {opt.name}
                  {selectedOptions[opt.name] && (
                    <span className="ml-2 text-muted-foreground font-normal normal-case tracking-normal">
                      {selectedOptions[opt.name]}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  {opt.values.map((val) => {
                    const available = isValueAvailable(opt.name, val);
                    const selected = selectedOptions[opt.name] === val;
                    return (
                      <button
                        key={val}
                        onClick={() =>
                          setSelectedOptions((prev) => ({ ...prev, [opt.name]: val }))
                        }
                        disabled={!available}
                        className={`min-w-[3rem] px-4 py-2.5 border font-heading text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors ${
                          selected
                            ? "border-foreground bg-foreground text-background"
                            : "border-foreground/20 text-foreground hover:border-foreground"
                        } ${!available ? "opacity-40 cursor-not-allowed line-through" : ""}`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {(() => {
              const stock = activeVariant?.quantityAvailable;
              const maxQty = typeof stock === "number" && stock > 0 ? Math.min(stock, 10) : 10;
              const atMax = quantity >= maxQty;
              return (
                <div className="mt-8">
                  <p className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                    {t("product.quantity")}
                    {typeof stock === "number" && stock > 0 && stock <= 5 && (
                      <span className="ml-2 text-muted-foreground font-normal normal-case tracking-normal">
                        {t("product.onlyLeft", { stock })}
                      </span>
                    )}
                  </p>
                  <div className="inline-flex items-center border border-foreground/20">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-foreground hover:bg-muted transition-colors disabled:opacity-40"
                      disabled={quantity <= 1}
                      aria-label={t("product.decreaseQty")}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-heading text-sm font-bold text-foreground">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                      className="p-3 text-foreground hover:bg-muted transition-colors disabled:opacity-40"
                      disabled={atMax}
                      aria-label={t("product.increaseQty")}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              );
            })()}

            <button
              onClick={handleAddToCart}
              disabled={isAdding || allSoldOut || (needsSelection && !activeVariant)}
              className="mt-8 w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-none hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isAdding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : allSoldOut ? (
                t("product.soldOut")
              ) : needsSelection && missingOption ? (
                t("product.selectOption", { name: missingOption })
              ) : (
                <>
                  <ShoppingCart size={18} />
                  {t("product.addToCart")} — {formatPrice({ amount: totalPrice.toFixed(2), currencyCode: price.currencyCode })}
                </>
              )}
            </button>

            <ProductTrustSignals />
            <ProductDetailsAccordion />
          </div>
        </div>

        <section className="mt-20 grid md:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              {t("product.inspirationHeading")}
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              {t("product.inspirationBody")}
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4">
              {t("product.materialsHeading")}
            </h2>
            <ul className="font-body text-base text-muted-foreground leading-relaxed space-y-2 list-disc pl-5">
              {((t("product.materials", { returnObjects: true }) as string[]) ?? []).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductReviews productHandle={product.handle} productTitle={product.title} />
      </div>

      <RelatedProducts currentHandle={product.handle} />
      <Footer />

      <ImageLightbox
        images={images}
        startIndex={selectedImage}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        title={product.title}
      />

      {/* Mobile sticky add-to-cart */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background border-t border-foreground/10 px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-heading text-[10px] uppercase tracking-widest text-muted-foreground truncate">
            {product.title}
          </p>
          <p className="font-heading text-base font-bold text-primary">{formatPrice(price)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isAdding || allSoldOut || (needsSelection && !activeVariant)}
          className="bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-widest px-5 py-3 disabled:opacity-50"
        >
          {isAdding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : allSoldOut ? (
            t("product.soldOutShort")
          ) : needsSelection && missingOption ? (
            t("product.selectOption", { name: missingOption.toLowerCase() })
          ) : (
            t("product.addToCartShort")
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
