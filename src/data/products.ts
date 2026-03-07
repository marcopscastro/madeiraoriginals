import productTee from "@/assets/product-tee.png";
import productHat from "@/assets/product-tote.png";

export type ProductCategory = "tees" | "canvas" | "headwear";

export interface Product {
  id: string;
  name: string;
  price: number;
  tag?: string;
  images: (string | null)[];
  sizes: string[];
  description: string;
  details: string[];
  category: ProductCategory;
}

export const products: Product[] = [
  {
    id: "poncha-tee",
    name: 'The "Poncha Made Me Do It" Tee',
    price: 35,
    tag: "Bestseller",
    images: [productTee],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "tees",
    description:
      "Blame it on the poncha. This heavyweight cotton tee features our signature hand-drawn poncha glass graphic — perfect for anyone who's had one too many at a Funchal tasca.",
    details: [
      "100% premium heavyweight cotton (220gsm)",
      "Relaxed unisex fit",
      "Screen-printed graphic",
      "Pre-shrunk & enzyme-washed",
      "Designed in Madeira, printed in Portugal",
    ],
  },
  {
    id: "vilhoa-tote",
    name: "Classic Vilhoa Canvas Tote",
    price: 28,
    images: [null],
    sizes: ["One Size"],
    category: "canvas",
    description:
      "A sturdy canvas tote inspired by the traditional Vilhoa patterns of Madeira. Roomy enough for market runs, beach days, or hauling bolo do caco home.",
    details: [
      "Heavy-duty 12oz canvas",
      "Reinforced stitching",
      "Interior pocket",
      "Screen-printed pattern",
      "Designed in Madeira",
    ],
  },
  {
    id: "bolo-hat",
    name: '"Bolo do Caco" Embroidered Dad Hat',
    price: 25,
    images: [productHat],
    sizes: ["One Size"],
    category: "headwear",
    description:
      "Rep the island's most iconic bread with this embroidered dad hat. The garlic butter is not included, but the compliments are guaranteed.",
    details: [
      "100% washed cotton twill",
      "Embroidered front graphic",
      "Adjustable brass buckle closure",
      "Low-profile unstructured crown",
      "Designed in Madeira",
    ],
  },
  {
    id: "heritage-tee",
    name: "Heritage Stripe Pocket Tee",
    price: 38,
    images: [null],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "tees",
    description:
      "A clean pocket tee with subtle heritage stripe detailing inspired by traditional Madeiran textiles. Understated island pride.",
    details: [
      "100% premium cotton (200gsm)",
      "Relaxed fit with chest pocket",
      "Contrast stripe detail",
      "Pre-shrunk",
      "Designed in Madeira, printed in Portugal",
    ],
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const categoryLabels: Record<ProductCategory, string> = {
  tees: "Shop Tees",
  canvas: "Canvas Goods",
  headwear: "Headwear",
};
