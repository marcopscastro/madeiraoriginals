import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-foreground mb-10">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-6" />
            <p className="font-heading text-lg uppercase tracking-wide text-muted-foreground mb-6">
              Your cart is empty
            </p>
            <Button asChild className="rounded-none font-heading font-bold text-sm uppercase tracking-widest px-8 py-6">
              <Link to="/shop">Shop Now</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-0">
              <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 pb-4 border-b border-foreground/10 font-heading text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <span>Product</span>
                <span>Size</span>
                <span>Quantity</span>
                <span>Total</span>
                <span />
              </div>
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 py-6 border-b border-foreground/10 items-center"
                >
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-muted flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] font-heading uppercase">
                          Soon
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-heading text-sm font-semibold uppercase tracking-wide text-foreground">
                        {item.name}
                      </p>
                      <p className="font-heading text-sm font-bold text-primary mt-1">€{item.price}</p>
                    </div>
                  </div>
                  <p className="font-body text-sm text-muted-foreground">
                    <span className="sm:hidden font-heading text-xs uppercase tracking-widest text-foreground mr-2">Size:</span>
                    {item.size}
                  </p>
                  <div className="inline-flex items-center border border-foreground/20 w-fit">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="p-2 hover:bg-muted transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-heading text-sm font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="p-2 hover:bg-muted transition-colors"
                      aria-label="Increase"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-heading text-sm font-bold text-foreground">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id, item.size)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 mt-6 font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={14} /> Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit border border-foreground/10 p-6">
              <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-foreground mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 font-body text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-heading text-xs uppercase tracking-widest">Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t border-foreground/10 mt-4 pt-4 flex justify-between font-heading text-base font-bold uppercase tracking-wide text-foreground">
                <span>Total</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
              <Button
                asChild
                className="w-full mt-6 rounded-none font-heading font-bold text-sm uppercase tracking-widest py-6"
              >
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
