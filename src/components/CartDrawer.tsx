import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore, useCartTotals } from "@/stores/cartStore";
import { formatPrice, FREE_SHIPPING_EUR } from "@/lib/shopify";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { t } = useTranslation();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const checkoutUrl = useCartStore((s) => s.checkoutUrl);
  const isLoading = useCartStore((s) => s.isLoading);
  const isSyncing = useCartStore((s) => s.isSyncing);
  const syncCart = useCartStore((s) => s.syncCart);
  const { totalItems, totalPrice, currencyCode } = useCartTotals();

  useEffect(() => {
    if (open) syncCart();
  }, [open, syncCart]);

  const handleCheckout = () => {
    if (!checkoutUrl) return;
    window.open(checkoutUrl, "_blank");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col bg-background w-full sm:max-w-md pt-safe pb-safe">
        <SheetHeader>
          <SheetTitle className="font-heading text-lg font-bold uppercase tracking-widest text-foreground">
            {t("cart.title")} ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <p className="font-body text-muted-foreground">{t("cart.empty")}</p>
            <Button variant="outline" onClick={() => onOpenChange(false)} asChild>
              <Link to="/shop">{t("cart.continueShopping")}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => {
                const image = item.product.node.images?.edges?.[0]?.node;
                const lineTotal = parseFloat(item.price.amount) * item.quantity;
                const productHref = `/product/${item.product.node.handle}`;
                return (
                  <div
                    key={item.variantId}
                    className="flex gap-4 border-b border-foreground/10 pb-4"
                  >
                    <Link
                      to={productHref}
                      onClick={() => onOpenChange(false)}
                      className="w-20 h-20 bg-muted flex-shrink-0 block"
                      aria-label={`View ${item.product.node.title}`}
                    >
                      {image ? (
                        <img
                          src={image.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] font-heading uppercase">
                          {t("cart.soon")}
                        </div>
                      )}
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={productHref}
                        onClick={() => onOpenChange(false)}
                        className="font-heading text-xs font-semibold uppercase tracking-wide text-foreground truncate block hover:text-primary transition-colors"
                      >
                        {item.product.node.title}
                      </Link>
                      {item.selectedOptions.length > 0 && (
                        <p className="font-body text-xs text-muted-foreground mt-0.5">
                          {item.selectedOptions.map((o) => o.value).join(" · ")}
                        </p>
                      )}
                      <div className="flex items-baseline gap-2 mt-1">
                        <p className="font-heading text-sm font-bold text-primary">
                          {formatPrice({ amount: lineTotal.toFixed(2), currencyCode: item.price.currencyCode })}
                        </p>
                        {item.quantity > 1 && (
                          <p className="font-body text-[11px] text-muted-foreground">
                            {formatPrice(item.price)} {t("cart.each")}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 border border-foreground/20 hover:bg-muted transition-colors"
                          aria-label={t("cart.decrease")}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-heading text-xs font-bold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="p-1 border border-foreground/20 hover:bg-muted transition-colors"
                          aria-label={t("cart.increase")}
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="ml-auto p-1 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label={t("cart.remove")}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-foreground/10 pt-4 space-y-3">
              {currencyCode === "EUR" && (() => {
                const remaining = Math.max(0, FREE_SHIPPING_EUR - totalPrice);
                const pct = Math.min(100, (totalPrice / FREE_SHIPPING_EUR) * 100);
                return (
                  <div>
                    <p className="font-heading text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5">
                      {remaining > 0
                        ? t("cart.freeShippingAway", { amount: remaining.toFixed(2) })
                        : t("cart.freeShippingUnlocked")}
                    </p>
                    <div className="h-[2px] bg-foreground/10">
                      <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })()}
              <div className="flex justify-between font-heading text-sm uppercase tracking-wide">
                <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                <span className="font-bold text-foreground">
                  {formatPrice({ amount: totalPrice.toFixed(2), currencyCode })}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground">
                {t("cart.shippingNote")}
              </p>
              <Button
                onClick={handleCheckout}
                disabled={!checkoutUrl || isLoading || isSyncing}
                className="w-full rounded-none font-heading font-bold text-sm uppercase tracking-widest py-6"
              >
                {isLoading || isSyncing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t("cart.checkout")}
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
