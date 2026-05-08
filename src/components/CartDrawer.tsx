import { useEffect } from "react";
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
      <SheetContent className="flex flex-col bg-background w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-lg font-bold uppercase tracking-widest text-foreground">
            Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <p className="font-body text-muted-foreground">Your cart is empty</p>
            <Button variant="outline" onClick={() => onOpenChange(false)} asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => {
                const image = item.product.node.images?.edges?.[0]?.node;
                return (
                  <div
                    key={item.variantId}
                    className="flex gap-4 border-b border-foreground/10 pb-4"
                  >
                    <div className="w-20 h-20 bg-muted flex-shrink-0">
                      {image ? (
                        <img
                          src={image.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] font-heading uppercase">
                          Soon
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading text-xs font-semibold uppercase tracking-wide text-foreground truncate">
                        {item.product.node.title}
                      </p>
                      {item.selectedOptions.length > 0 && (
                        <p className="font-body text-xs text-muted-foreground mt-0.5">
                          {item.selectedOptions.map((o) => o.value).join(" · ")}
                        </p>
                      )}
                      <p className="font-heading text-sm font-bold text-primary mt-1">
                        {formatPrice(item.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-1 border border-foreground/20 hover:bg-muted transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-heading text-xs font-bold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="p-1 border border-foreground/20 hover:bg-muted transition-colors"
                          aria-label="Increase"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="ml-auto p-1 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove"
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
                        ? `€${remaining.toFixed(2)} away from free shipping`
                        : "Free shipping unlocked ✦"}
                    </p>
                    <div className="h-[2px] bg-foreground/10">
                      <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })()}
              <div className="flex justify-between font-heading text-sm uppercase tracking-wide">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold text-foreground">
                  {formatPrice({ amount: totalPrice.toFixed(2), currencyCode })}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground">
                Shipping & taxes calculated at checkout.
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
                    Checkout
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
