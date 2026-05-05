import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingCart, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedProducts from "@/components/RelatedProducts";
import { useProductByHandle } from "@/hooks/useShopifyProducts";
import { formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProductByHandle(handle);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const variants = useMemo(
    () => product?.variants.edges.map((e) => e.node) ?? [],
    [product]
  );
  const sizeOption = product?.options.find((o) => o.name.toLowerCase() === "size");
  const hasSizeOption = !!sizeOption && sizeOption.values.length > 1;
  const singleVariant = variants.length === 1 ? variants[0] : null;

  const activeVariant =
    variants.find((v) => v.id === selectedVariantId) ?? singleVariant ?? null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center font-body text-muted-foreground">
          Loading…
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
            Product Not Found
          </h1>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-primary hover:opacity-80"
          >
            <ArrowLeft size={16} /> Back to Shop
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
    if (!activeVariant) {
      toast.error("Please select a size");
      return;
    }
    await addItem({
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
    toast.success(`${product.title} added to cart`, {
      description: hasSizeOption
        ? `${activeVariant.title} · Qty: ${quantity}`
        : `Qty: ${quantity}`,
      position: "top-center",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <nav className="flex items-center gap-2 font-heading text-xs uppercase tracking-widest text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-muted aspect-[3/4]">
              {currentImage ? (
                <img
                  src={currentImage.url}
                  alt={currentImage.altText || product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-heading text-sm uppercase tracking-wide">
                  Coming Soon
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 overflow-hidden bg-muted border-2 transition-colors ${
                      selectedImage === i
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/30"
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-foreground leading-tight">
              {product.title}
            </h1>
            <p className="mt-3 font-heading text-xl sm:text-2xl font-bold text-primary">
              {formatPrice(price)}
            </p>
            {product.description && (
              <p className="mt-6 font-body text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            )}

            {hasSizeOption && (
              <div className="mt-8">
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => {
                    const sizeVal =
                      v.selectedOptions.find((o) => o.name.toLowerCase() === "size")?.value ??
                      v.title;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantId(v.id)}
                        disabled={!v.availableForSale}
                        className={`min-w-[3rem] px-4 py-2.5 border font-heading text-sm font-semibold uppercase tracking-wide transition-colors ${
                          activeVariant?.id === v.id
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-foreground/20 text-foreground hover:border-foreground"
                        } ${!v.availableForSale ? "opacity-40 cursor-not-allowed line-through" : ""}`}
                      >
                        {sizeVal}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8">
              <p className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                Quantity
              </p>
              <div className="inline-flex items-center border border-foreground/20">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-foreground hover:bg-muted transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-heading text-sm font-bold text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-foreground hover:bg-muted transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding || (hasSizeOption && !activeVariant)}
              className="mt-8 w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-none hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isAdding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Add to Cart — {formatPrice({ amount: totalPrice.toFixed(2), currencyCode: price.currencyCode })}
                </>
              )}
            </button>
          </div>
        </div>
      </main>

      <RelatedProducts currentHandle={product.handle} />
      <Footer />
    </div>
  );
};

export default ProductDetail;
