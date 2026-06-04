import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingCart, Loader2 } from "lucide-react";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import { useProductByHandle } from "@/hooks/useShopifyProducts";
import { formatPrice, formatSizeLabel, extractGpsrBlock } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const BG = "#0d0d0d";
const FG = "#f0ead8";
const GOLD = "#c9952a";
const MUTED = "rgba(240,234,216,0.55)";
const BORDER = "rgba(240,234,216,0.18)";

const IslandFlowerProduct = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProductByHandle(handle);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const variants = useMemo(
    () => product?.variants.edges.map((e) => e.node) ?? [],
    [product]
  );
  const options = product?.options ?? [];
  const singleVariant = variants.length === 1 ? variants[0] : null;

  const activeVariant = useMemo(() => {
    if (singleVariant) return singleVariant;
    if (options.length === 0) return null;
    return (
      variants.find((v) =>
        v.selectedOptions.every((so) => selectedOptions[so.name] === so.value)
      ) ?? null
    );
  }, [variants, options, selectedOptions, singleVariant]);

  const needsSelection = !singleVariant && options.length > 0;
  const allSoldOut = variants.length > 0 && variants.every((v) => !v.availableForSale);

  useEffect(() => {
    if (!product || singleVariant) return;
    if (Object.keys(selectedOptions).length > 0) return;
    const first = variants.find((v) => v.availableForSale) ?? variants[0];
    if (first) {
      const initial: Record<string, string> = {};
      first.selectedOptions.forEach((o) => (initial[o.name] = o.value));
      setSelectedOptions(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  const { cleanedHtml, gpsrHtml } = useMemo(() => {
    const html = product?.descriptionHtml;
    if (!html) return { cleanedHtml: "", gpsrHtml: "" };
    return extractGpsrBlock(html);
  }, [product?.descriptionHtml]);

  const sanitizedDescription = useMemo(() => {
    if (!cleanedHtml) return "";
    return DOMPurify.sanitize(cleanedHtml, { USE_PROFILES: { html: true } });
  }, [cleanedHtml]);

  const sanitizedGpsr = useMemo(() => {
    if (!gpsrHtml) return "";
    return DOMPurify.sanitize(gpsrHtml, { USE_PROFILES: { html: true } });
  }, [gpsrHtml]);

  if (isLoading) {
    return (
      <div style={{ backgroundColor: BG, color: FG }} className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-32 text-center font-body text-sm" style={{ color: MUTED }}>
          {/* i18n-ignore */}
          Loading…
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ backgroundColor: BG, color: FG }} className="min-h-screen">
        <Header />
        <div className="max-w-3xl mx-auto px-6 py-32 text-center">
          <h1 className="font-serif-display text-4xl mb-6">Product not found{/* i18n-ignore */}</h1>
          <Link
            to="/island-of-flowers"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            <ArrowLeft size={14} /> Back to collection{/* i18n-ignore */}
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images.edges.map((e) => e.node);
  const currentImage = images[selectedImage] ?? images[0];
  const price = activeVariant?.price ?? product.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (allSoldOut) {
      toast.error("Sold out"); // i18n-ignore
      return;
    }
    if (!activeVariant) {
      toast.error("Please choose your options"); // i18n-ignore
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
      toast.error("Could not add to cart", { position: "top-center" }); // i18n-ignore
      return;
    }
    toast.success(`${product.title} added`, { position: "top-center" }); // i18n-ignore
  };

  return (
    <div style={{ backgroundColor: BG, color: FG }} className="min-h-screen">
      <SEO
        title={`${product.title} — Madeira Originals`}
        description={product.description?.slice(0, 160)}
        path={`/products/${product.handle}`}
        image={images[0]?.url}
      />
      <Header />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-28 md:pt-36 pb-24">
        {/* Breadcrumb */}
        <nav
          className="mb-12 text-[10px] uppercase tracking-[0.3em]"
          style={{ color: MUTED }}
        >
          <Link to="/island-of-flowers" className="hover:opacity-100" style={{ color: GOLD }}>
            Island of Flowers{/* i18n-ignore */}
          </Link>
          <span className="mx-3 opacity-50">·</span>
          <span style={{ color: FG }}>{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div>
            <div
              className="aspect-square overflow-hidden"
              style={{ backgroundColor: "#161616", border: `1px solid ${BORDER}` }}
            >
              {currentImage && (
                <img
                  src={currentImage.url}
                  alt={currentImage.altText ?? product.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((img, i) => (
                  <button
                    key={img.url}
                    onClick={() => setSelectedImage(i)}
                    className="aspect-square overflow-hidden transition-opacity duration-300"
                    style={{
                      border: `1px solid ${i === selectedImage ? GOLD : BORDER}`,
                      opacity: i === selectedImage ? 1 : 0.6,
                    }}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p
              className="text-[10px] uppercase tracking-[0.35em] mb-6"
              style={{ color: GOLD }}
            >
              Madeira Originals · Collection{/* i18n-ignore */}
            </p>
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              {product.title}
            </h1>
            <p className="mt-6 text-xl" style={{ color: FG }}>
              {formatPrice(price)}
            </p>

            <div
              className="mt-8 mb-8 h-px w-16"
              style={{ backgroundColor: GOLD }}
            />

            {sanitizedDescription ? (
              <div
                className="font-body text-[15px] leading-relaxed"
                style={{ color: MUTED }}
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              />
            ) : product.description ? (
              <p
                className="font-body text-[15px] leading-relaxed whitespace-pre-line"
                style={{ color: MUTED }}
              >
                {product.description}
              </p>
            ) : null}

            {/* Variant options */}
            {needsSelection &&
              options.map((opt) => (
                <div key={opt.name} className="mt-10">
                  <p
                    className="text-[10px] uppercase tracking-[0.3em] mb-3"
                    style={{ color: MUTED }}
                  >
                    {opt.name}
                    {selectedOptions[opt.name] && (
                      <span className="ml-3" style={{ color: FG }}>
                        {formatSizeLabel(selectedOptions[opt.name])}
                      </span>
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {opt.values.map((val) => {
                      const selected = selectedOptions[opt.name] === val;
                      return (
                        <button
                          key={val}
                          onClick={() =>
                            setSelectedOptions((prev) => ({ ...prev, [opt.name]: val }))
                          }
                          className="min-w-[3rem] px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors"
                          style={{
                            border: `1px solid ${selected ? GOLD : BORDER}`,
                            backgroundColor: selected ? GOLD : "transparent",
                            color: selected ? BG : FG,
                          }}
                        >
                          {formatSizeLabel(val)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

            {/* Quantity */}
            <div className="mt-10">
              <p
                className="text-[10px] uppercase tracking-[0.3em] mb-3"
                style={{ color: MUTED }}
              >
                Quantity{/* i18n-ignore */}
              </p>
              <div
                className="inline-flex items-center"
                style={{ border: `1px solid ${BORDER}` }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 transition-opacity hover:opacity-70 disabled:opacity-30"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity" // i18n-ignore
                  style={{ color: FG }}
                >
                  <Minus size={14} />
                </button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="p-3 transition-opacity hover:opacity-70"
                  aria-label="Increase quantity" // i18n-ignore
                  style={{ color: FG }}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding || allSoldOut || (needsSelection && !activeVariant)}
              className="mt-10 w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-xs uppercase tracking-[0.3em] transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: GOLD, color: BG }}
            >
              {isAdding ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Adding…{/* i18n-ignore */}
                </>
              ) : allSoldOut ? (
                <>Sold out{/* i18n-ignore */}</>
              ) : (
                <>
                  <ShoppingCart size={16} /> Add to cart{/* i18n-ignore */}
                </>
              )}
            </button>

            {sanitizedGpsr && (
              <Accordion type="single" collapsible className="mt-8" style={{ border: `1px solid ${BORDER}` }}>
                <AccordionItem value="gpsr" className="border-0">
                  <AccordionTrigger
                    className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors hover:no-underline"
                    style={{ color: FG }}
                  >
                    Product safety & compliance{/* i18n-ignore */}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div
                      className="font-body text-sm leading-relaxed"
                      style={{ color: MUTED }}
                      dangerouslySetInnerHTML={{ __html: sanitizedGpsr }}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            <Link
              to="/island-of-flowers"
              className="mt-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] self-start"
              style={{ color: MUTED }}
            >
              <ArrowLeft size={12} /> Back to Island of Flowers{/* i18n-ignore */}
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <div className="mx-auto h-px w-12 mb-5" style={{ backgroundColor: GOLD }} />
          <p
            className="text-[10px] uppercase tracking-[0.35em]"
            style={{ color: MUTED }}
          >
            Premium streetwear. 0% tourist trap.{/* i18n-ignore */}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default IslandFlowerProduct;
