export const CATEGORIES = [
  "T-shirts",
  "Polos",
  "Hoodies & Sweatshirts",
  "Tote bags",
  "Caps & Hats",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_SLUGS: Record<Category, string> = {
  "T-shirts": "t-shirts",
  Polos: "polos",
  "Hoodies & Sweatshirts": "hoodies-sweatshirts",
  "Tote bags": "tote-bags",
  "Caps & Hats": "caps-hats",
};

export const SLUG_TO_CATEGORY: Record<string, Category> = Object.fromEntries(
  Object.entries(CATEGORY_SLUGS).map(([cat, slug]) => [slug, cat as Category]),
) as Record<string, Category>;

const ptPriceFormatter = new Intl.NumberFormat("pt-PT", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export const formatEUR = (n: number | null | undefined) => {
  if (n == null || isNaN(Number(n))) return "—";
  return ptPriceFormatter.format(Number(n));
};

export type PriceTier = {
  min_qty: number;
  cost?: number;
  price: number;
};

export const parseTiers = (raw: unknown): PriceTier[] => {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((t): t is Record<string, unknown> => !!t && typeof t === "object")
    .map((t) => ({
      min_qty: Number(t.min_qty ?? 0),
      cost: t.cost != null ? Number(t.cost) : undefined,
      price: Number(t.price ?? 0),
    }))
    .filter((t) => !isNaN(t.min_qty) && !isNaN(t.price))
    .sort((a, b) => a.min_qty - b.min_qty);
};

export const tierRangeLabel = (tier: PriceTier, next: PriceTier | undefined) => {
  const start = Math.max(1, tier.min_qty || 1);
  if (!next) return `${start}+`;
  const end = next.min_qty - 1;
  return end >= start ? `${start}–${end}` : `${start}+`;
};

export const supplierBadge = (supplier: string) => {
  const s = (supplier || "").toLowerCase();
  if (s.includes("makito")) return "Fornecedor A";
  if (s.includes("midocean")) return "Fornecedor B";
  return "Fornecedor";
};
