import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

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
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 border-b border-foreground/10 pb-4">
                  <div className="w-20 h-20 bg-muted flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] font-heading uppercase">
                        Soon
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-xs font-semibold uppercase tracking-wide text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>
                    <p className="font-heading text-sm font-bold text-primary mt-1">€{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-1 border border-foreground/20 hover:bg-muted transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-heading text-xs font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-1 border border-foreground/20 hover:bg-muted transition-colors"
                        aria-label="Increase"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="ml-auto p-1 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-foreground/10 pt-4 space-y-3">
              <div className="flex justify-between font-heading text-sm uppercase tracking-wide">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold text-foreground">€{totalPrice.toFixed(2)}</span>
              </div>
              <Button
                className="w-full rounded-none font-heading font-bold text-sm uppercase tracking-widest py-6"
                asChild
                onClick={() => onOpenChange(false)}
              >
                <Link to="/cart">View Cart</Link>
              </Button>
              <Button
                className="w-full rounded-none font-heading font-bold text-sm uppercase tracking-widest py-6"
                variant="outline"
                asChild
                onClick={() => onOpenChange(false)}
              >
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
