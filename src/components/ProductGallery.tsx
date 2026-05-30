import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslation } from "react-i18next";
import { productAlt } from "@/lib/productAlt";

interface Image {
  url: string;
  altText: string | null;
}

interface Props {
  images: Image[];
  productTitle: string;
  selectedIndex: number;
  onSelect: (i: number) => void;
  onZoom: () => void;
}

/**
 * Premium product gallery.
 * - Desktop: large main image + thumbnail strip (vertical-ish, wraps).
 * - Mobile: full-bleed embla swipe carousel with dot indicators.
 * Editorial: no captions, no shadows, calm spacing.
 */
const ProductGallery = ({ images, productTitle, selectedIndex, onSelect, onZoom }: Props) => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [emblaIndex, setEmblaIndex] = useState(0);

  // Keep embla in sync with parent selection (e.g. variant colour change).
  useEffect(() => {
    if (!emblaApi) return;
    if (emblaApi.selectedScrollSnap() !== selectedIndex) {
      emblaApi.scrollTo(selectedIndex, true);
    }
  }, [emblaApi, selectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSnap = () => {
      const idx = emblaApi.selectedScrollSnap();
      setEmblaIndex(idx);
      onSelect(idx);
    };
    emblaApi.on("select", onSnap);
    emblaApi.on("reInit", onSnap);
    return () => {
      emblaApi.off("select", onSnap);
      emblaApi.off("reInit", onSnap);
    };
  }, [emblaApi, onSelect]);

  const current = images[selectedIndex];

  if (images.length === 0) {
    return (
      <div className="bg-muted aspect-[4/5] flex items-center justify-center text-foreground/45 font-heading text-xs uppercase tracking-[0.3em]">
        {t("product.comingSoon")}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Mobile: swipe carousel */}
      <div className="md:hidden">
        <div className="overflow-hidden bg-muted" ref={emblaRef}>
          <div className="flex">
            {images.map((img, i) => (
              <div key={i} className="min-w-0 shrink-0 grow-0 basis-full">
                <button
                  type="button"
                  onClick={onZoom}
                  className="w-full block cursor-zoom-in"
                  aria-label={t("product.zoomImage")}
                >
                  <img
                    src={img.url}
                    alt={productAlt({
                      title: productTitle,
                      shopifyAlt: img.altText,
                      index: i,
                      total: images.length,
                    })}
                    className="w-full aspect-[4/5] object-cover img-cinematic"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        {images.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={t("product.thumbAria", { i: i + 1, total: images.length })}
                aria-current={emblaIndex === i}
                className={`h-[2px] transition-all ${
                  emblaIndex === i ? "w-8 bg-foreground" : "w-4 bg-foreground/25"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: main image + thumbnails */}
      <div className="hidden md:block">
        <div className="relative overflow-hidden bg-muted aspect-[4/5]">
          {current && (
            <button
              type="button"
              onClick={onZoom}
              className="w-full h-full block cursor-zoom-in"
              aria-label={t("product.zoomImage")}
            >
              <img
                src={current.url}
                alt={productAlt({
                  title: productTitle,
                  shopifyAlt: current.altText,
                  index: selectedIndex,
                  total: images.length,
                })}
                className="w-full h-full object-cover img-cinematic"
              />
            </button>
          )}
        </div>
        {images.length > 1 && (
          <div className="mt-5 grid grid-cols-5 gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => onSelect(i)}
                aria-label={t("product.thumbAria", { i: i + 1, total: images.length })}
                aria-current={selectedIndex === i}
                className={`aspect-[4/5] overflow-hidden bg-muted transition-opacity ${
                  selectedIndex === i
                    ? "opacity-100 ring-1 ring-foreground"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img.url}
                  alt={productAlt({
                    title: productTitle,
                    shopifyAlt: img.altText,
                    index: i,
                    total: images.length,
                  })}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
