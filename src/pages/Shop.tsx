import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import PageSEO from "@/components/PageSEO";
import { useProducts } from "@/hooks/useShopifyProducts";

type SortOption = "default" | "price-asc" | "price-desc" | "title-asc";

const Shop = () => {
  const { t } = useTranslation();
  const PAGE_SIZE = 12;
  const { data: products = [], isLoading } = useProducts(100);
  const [sort, setSort] = useState<SortOption>("default");
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<string>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const types = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.node.productType && set.add(p.node.productType));
    return ["all", ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    let list = products;
    if (activeType !== "all") {
      list = list.filter((p) => p.node.productType === activeType);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.node.title.toLowerCase().includes(q) ||
          (p.node.description ?? "").toLowerCase().includes(q)
      );
    }
    list = [...list];
    if (sort === "price-asc") {
      list.sort(
        (a, b) =>
          parseFloat(a.node.priceRange.minVariantPrice.amount) -
          parseFloat(b.node.priceRange.minVariantPrice.amount)
      );
    } else if (sort === "price-desc") {
      list.sort(
        (a, b) =>
          parseFloat(b.node.priceRange.minVariantPrice.amount) -
          parseFloat(a.node.priceRange.minVariantPrice.amount)
      );
    } else if (sort === "title-asc") {
      list.sort((a, b) => a.node.title.localeCompare(b.node.title));
    }
    return list;
  }, [products, sort, query, activeType]);

  // Reset pagination whenever the filtered list changes
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [sort, query, activeType, products.length]);

  const paginated = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const faqs = (t("shop.faqs", { returnObjects: true }) as Array<{ q: string; a: string }>) ?? [];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSEO routeKey="shop" jsonLd={faqLd} />
      <Header />
      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 md:pt-32 pb-12 md:pb-20">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div className="md:col-span-8">
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-6">
                {t("shop.overline")}
              </p>
              <h1 className="font-display font-medium text-foreground leading-[0.98] tracking-tight text-5xl md:text-7xl lg:text-[5.5rem]">
                {t("shop.heading")}
              </h1>
            </div>
            <p className="md:col-span-4 font-body text-base md:text-lg text-foreground/70 leading-relaxed max-w-md">
              {t("shop.sub")}
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-t border-foreground/10 pt-6 mb-12 md:mb-16">
            {types.length > 2 ? (
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`font-heading text-[11px] font-semibold uppercase tracking-[0.3em] pb-1 border-b transition-colors ${
                      activeType === type
                        ? "border-foreground text-foreground"
                        : "border-transparent text-foreground/55 hover:text-foreground"
                    }`}
                  >
                    {type === "all" ? t("shop.all") : type}
                  </button>
                ))}
              </div>
            ) : <span />}

            <div className="flex items-center gap-4 md:ml-auto">
              <div className="relative hidden sm:block">
                <Search size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-foreground/45 pointer-events-none" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("shop.searchPlaceholder")}
                  className="bg-transparent border-0 border-b border-foreground/15 font-body text-sm pl-5 pr-6 py-2 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/60 rounded-none w-44"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label={t("shop.clearSearch")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/45 hover:text-foreground"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                aria-label={t("shop.sortAria")}
                className="bg-transparent border-0 font-heading text-[11px] font-semibold uppercase tracking-[0.3em] px-0 py-2 text-foreground/70 hover:text-foreground focus:outline-none cursor-pointer"
              >
                <option value="default">{t("shop.sortDefault")}</option>
                <option value="title-asc">{t("shop.sortNameAsc")}</option>
                <option value="price-asc">{t("shop.sortPriceAsc")}</option>
                <option value="price-desc">{t("shop.sortPriceDesc")}</option>
              </select>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-28 md:pb-40">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-10 md:gap-y-20">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] bg-muted" />
                  <div className="h-4 bg-muted mt-6 w-2/3" />
                  <div className="h-4 bg-muted mt-3 w-1/4" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-28 md:py-40">
              <p className="font-display text-3xl md:text-4xl font-medium text-foreground tracking-tight">{t("shop.emptyTitle")}</p>
              <p className="mt-4 font-body text-foreground/65 max-w-md mx-auto">
                {t("shop.emptyBody")}
              </p>
              <button
                onClick={() => { setQuery(""); setActiveType("all"); setSort("default"); }}
                className="inline-flex items-center mt-10 font-heading text-[12px] font-semibold uppercase tracking-[0.3em] text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
              >
                {t("shop.resetFilters")} →
              </button>
            </div>
          ) : (
            <>
              <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-foreground/55 mb-8">
                {t("shop.showing", { count: paginated.length, total: filtered.length })}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-10 md:gap-y-24">
                {paginated.map((p) => (
                  <ProductCard key={p.node.id} product={p} />
                ))}
              </div>
              {hasMore && (
                <div className="text-center mt-20 md:mt-28">
                  <button
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="inline-flex items-center font-heading text-[12px] font-semibold uppercase tracking-[0.3em] text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
                  >
                    {t("shop.loadMore")} →
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 pb-32 md:pb-40 border-t border-foreground/10 pt-20 md:pt-28">
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-6 text-center">
            {t("shop.faqOverline")}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground text-center mb-16 tracking-tight leading-tight">
            {t("shop.faqHeading")}
          </h2>
          <dl className="space-y-10">
            {faqs.map((item) => (
              <div key={item.q} className="border-b border-foreground/10 pb-10 last:border-b-0 last:pb-0">
                <dt className="font-display text-xl md:text-2xl font-medium text-foreground mb-3 tracking-tight">
                  {item.q}
                </dt>
                <dd className="font-body text-base text-foreground/70 leading-relaxed">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
