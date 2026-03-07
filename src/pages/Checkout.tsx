import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const checkoutSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  firstName: z.string().trim().min(1, "Required").max(100),
  lastName: z.string().trim().min(1, "Required").max(100),
  address: z.string().trim().min(1, "Required").max(200),
  city: z.string().trim().min(1, "Required").max(100),
  postalCode: z.string().trim().min(1, "Required").max(20),
  country: z.string().trim().min(1, "Required").max(100),
  phone: z.string().trim().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (_data: CheckoutFormData) => {
    // Placeholder — will integrate with Printify/payment later
    await new Promise((r) => setTimeout(r, 1000));
    clearCart();
    toast.success("Order placed successfully!", {
      description: "This is a demo. Real payment integration coming soon.",
    });
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="font-heading text-lg uppercase tracking-wide text-muted-foreground mb-6">
            Your cart is empty
          </p>
          <Button asChild className="rounded-none font-heading font-bold text-sm uppercase tracking-widest px-8 py-6">
            <Link to="/shop">Shop Now</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const fieldClass = "rounded-none border-foreground/20 font-body text-sm focus-visible:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Cart
        </Link>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wide text-foreground mb-10">
          Checkout
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact */}
              <section>
                <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-foreground mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="font-heading text-xs uppercase tracking-widest">Email</Label>
                    <Input id="email" type="email" {...register("email")} className={fieldClass} />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="font-heading text-xs uppercase tracking-widest">Phone (optional)</Label>
                    <Input id="phone" type="tel" {...register("phone")} className={fieldClass} />
                  </div>
                </div>
              </section>

              {/* Shipping */}
              <section>
                <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-foreground mb-4">
                  Shipping Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="font-heading text-xs uppercase tracking-widest">First Name</Label>
                    <Input id="firstName" {...register("firstName")} className={fieldClass} />
                    {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="font-heading text-xs uppercase tracking-widest">Last Name</Label>
                    <Input id="lastName" {...register("lastName")} className={fieldClass} />
                    {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div className="mt-4">
                  <Label htmlFor="address" className="font-heading text-xs uppercase tracking-widest">Address</Label>
                  <Input id="address" {...register("address")} className={fieldClass} />
                  {errors.address && <p className="text-destructive text-xs mt-1">{errors.address.message}</p>}
                </div>
                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor="city" className="font-heading text-xs uppercase tracking-widest">City</Label>
                    <Input id="city" {...register("city")} className={fieldClass} />
                    {errors.city && <p className="text-destructive text-xs mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="font-heading text-xs uppercase tracking-widest">Postal Code</Label>
                    <Input id="postalCode" {...register("postalCode")} className={fieldClass} />
                    {errors.postalCode && <p className="text-destructive text-xs mt-1">{errors.postalCode.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="country" className="font-heading text-xs uppercase tracking-widest">Country</Label>
                    <Input id="country" {...register("country")} className={fieldClass} />
                    {errors.country && <p className="text-destructive text-xs mt-1">{errors.country.message}</p>}
                  </div>
                </div>
              </section>

              {/* Payment Placeholder */}
              <section className="border border-dashed border-foreground/20 p-6">
                <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-foreground mb-2">
                  Payment
                </h2>
                <p className="font-body text-sm text-muted-foreground">
                  Payment processing will be enabled once Printify integration is connected. For now, you can place a test order.
                </p>
              </section>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 h-fit border border-foreground/10 p-6">
              <h2 className="font-heading text-sm font-bold uppercase tracking-widest text-foreground mb-6">
                Order Summary
              </h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between font-body text-sm">
                    <span className="text-foreground">
                      {item.name} <span className="text-muted-foreground">× {item.quantity}</span>
                    </span>
                    <span className="text-foreground font-semibold">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-foreground/10 mt-4 pt-4 space-y-2">
                <div className="flex justify-between font-body text-sm text-muted-foreground">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>€{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-heading text-xs uppercase tracking-widest">Free</span>
                </div>
              </div>
              <div className="border-t border-foreground/10 mt-4 pt-4 flex justify-between font-heading text-base font-bold uppercase tracking-wide text-foreground">
                <span>Total</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 rounded-none font-heading font-bold text-sm uppercase tracking-widest py-6"
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </Button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
