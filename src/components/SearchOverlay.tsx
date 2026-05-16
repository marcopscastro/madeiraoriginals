import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useShopifyProducts";
import { formatPrice } from "@/lib/shopify";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: products = [] } = useProducts(50);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const filtered = query.trim()
    ? products.filter((p) => p.node.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm" onClick={onClose}>
      <div className="max-w-2xl mx-auto px-4 pt-20" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-foreground/10 pb-4">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            className="flex-1 bg-transparent font-heading text-lg uppercase tracking-wide text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button onClick={onClose} className="text-foreground hover:text-primary transition-colors">
            <X size={22} />
          </button>
        </div>

        <div className="mt-6 space-y-2 max-h-[60vh] overflow-y-auto">
          {query.trim() && filtered.length === 0 && (
            <p className="text-center text-muted-foreground font-body py-8">{t("search.empty")}</p>
          )}
          {filtered.map((p) => {
            const image = p.node.images.edges[0]?.node;
            return (
              <Link
                key={p.node.id}
                to={`/product/${p.node.handle}`}
                onClick={onClose}
                className="flex items-center gap-4 p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="w-14 h-14 bg-muted flex-shrink-0 overflow-hidden">
                  {image ? (
                    <img src={image.url} alt={p.node.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] font-heading uppercase">
                      {t("search.soon")}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
                    {p.node.title}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {formatPrice(p.node.priceRange.minVariantPrice)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
