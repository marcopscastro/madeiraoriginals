import { useEffect, useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Img = { url: string; altText?: string | null };

interface Props {
  images: Img[];
  startIndex: number;
  open: boolean;
  onClose: () => void;
  title?: string;
}

const ImageLightbox = ({ images, startIndex, open, onClose, title }: Props) => {
  const [index, setIndex] = useState(startIndex);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (open) setIndex(startIndex);
  }, [open, startIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, images.length, onClose]);

  if (!open || images.length === 0) return null;

  const img = images[index];
  const hasMany = images.length > 1;

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50 && hasMany) {
      if (dx < 0) setIndex((i) => (i + 1) % images.length);
      else setIndex((i) => (i - 1 + images.length) % images.length);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Product image viewer"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close image viewer"
        className="absolute top-4 right-4 z-10 p-3 text-foreground hover:bg-muted transition-colors"
      >
        <X size={24} />
      </button>

      {hasMany && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
            className="absolute left-2 sm:left-4 z-10 p-3 text-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIndex((i) => (i + 1) % images.length);
            }}
            aria-label="Next image"
            className="absolute right-2 sm:right-4 z-10 p-3 text-foreground hover:bg-muted transition-colors"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      <div
        className="w-full h-full flex items-center justify-center p-4 sm:p-12 overflow-auto touch-pan-x touch-pan-y"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={img.url}
          alt={img.altText || title || "Product image"}
          className="max-w-full max-h-full object-contain select-none"
          draggable={false}
        />
      </div>

      {hasMany && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-heading text-xs uppercase tracking-widest text-foreground">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;
