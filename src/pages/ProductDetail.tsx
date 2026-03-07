import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="font-heading text-3xl font-bold uppercase text-foreground mb-4">
            Product Not Found
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wide text-primary hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: product.images[0],
      });
    }
    toast.success(`${product.name} added to cart`, {
      description: `Size: ${selectedSize} · Qty: ${quantity}`,
    });
  };

  const currentImage = product.images[selectedImage];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-heading text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-muted aspect-[3/4]">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground font-heading text-sm uppercase tracking-wide">
                  Coming Soon
                </div>
              )}
              {product.tag && (
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground font-heading text-xs font-bold uppercase tracking-wider px-3 py-1">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 overflow-hidden bg-muted border-2 transition-colors ${
                      selectedImage === i
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/30"
                    }`}
                  >
                    {img ? (
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] font-heading uppercase">
                        Soon
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-foreground leading-tight">
              {product.name}
            </h1>

            <p className="mt-3 font-heading text-xl sm:text-2xl font-bold text-primary">
              €{product.price}
            </p>

            <p className="mt-6 font-body text-base text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mt-8">
              <p className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] px-4 py-2.5 border font-heading text-sm font-semibold uppercase tracking-wide transition-colors ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-foreground/20 text-foreground hover:border-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
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

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="mt-8 w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-none hover:opacity-90 transition-opacity"
            >
              <ShoppingCart size={18} />
              Add to Cart — €{(product.price * quantity).toFixed(0)}
            </button>

            {/* Details */}
            <div className="mt-10 pt-8 border-t border-foreground/10">
              <p className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-4">
                Details
              </p>
              <ul className="space-y-2">
                {product.details.map((detail) => (
                  <li
                    key={detail}
                    className="font-body text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-accent mt-0.5">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
