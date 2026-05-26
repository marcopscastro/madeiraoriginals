import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SEO from "@/components/SEO";
import { useProducts } from "@/hooks/useShopifyProducts";

type SortOption = "default" | "price-asc" | "price-desc" | "title-asc";

export interface CollectionFaq {
  question: string;
  answer: string;
}

export interface CollectionConfig {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  shopifyQuery: string;
  faqs?: CollectionFaq[];
}

const Collection = ({ config }: { config: CollectionConfig }) => {
  const { t } = useTranslation();
  const { data: products = [], isLoading } = useProducts(50, config.shopifyQuery);
  const [sort, setSort] = useState<SortOption>("default");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = products;
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
  }, [products, sort, query]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={config.metaTitle}
        description={config.metaDescription}
        path={`/${config.slug}`}
        jsonLd={
          config.faqs && config.faqs.length > 0
            ? {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: config.faqs.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: { "@type": "Answer", text: f.answer },
                })),
              }
            : undefined
        }
      />
      <Header />
      <main>
        {/* Editorial collection hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 md:pt-32 pb-12 md:pb-20">
          <nav className="flex items-center gap-2 font-heading text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/55 mb-10 md:mb-16">
            <a href="/" className="hover:text-foreground transition-colors">{t("collection.home")}</a>
            <span>·</span>
            <a href="/shop" className="hover:text-foreground transition-colors">{t("collection.shop")}</a>
            <span>·</span>
            <span className="text-foreground">{config.title}</span>
          </nav>

          <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end">
            <div className="md:col-span-8">
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.4em] text-accent mb-6">
                {config.eyebrow}
              </p>
              <h1 className="font-display font-medium text-foreground leading-[0.98] tracking-tight text-5xl md:text-7xl lg:text-[5.5rem]">
                {config.title}
              </h1>
            </div>
            <p className="md:col-span-4 font-body text-base md:text-lg text-foreground/70 leading-relaxed max-w-md">
              {config.intro}
            </p>
          </div>
        </section>

        {/* Calm controls — no border, just a soft baseline */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between gap-4 border-t border-foreground/10 pt-6 mb-12 md:mb-16">
            <p className="font-heading text-[10px] uppercase tracking-[0.3em] text-foreground/55">
              {isLoading ? "" : `${filtered.length} ${filtered.length === 1 ? "piece" : "pieces"}`}
            </p>
            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-foreground/45 pointer-events-none" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("collection.searchPlaceholder")}
                  className="bg-transparent border-0 border-b border-foreground/15 font-body text-sm pl-5 pr-6 py-2 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/60 rounded-none w-44"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label={t("collection.clearSearch")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-foreground/45 hover:text-foreground"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                aria-label={t("collection.sortAria")}
                className="bg-transparent border-0 font-heading text-[11px] font-semibold uppercase tracking-[0.3em] px-0 py-2 text-foreground/70 hover:text-foreground focus:outline-none cursor-pointer"
              >
                <option value="default">{t("collection.sortDefault")}</option>
                <option value="title-asc">{t("collection.sortNameAsc")}</option>
                <option value="price-asc">{t("collection.sortPriceAsc")}</option>
                <option value="price-desc">{t("collection.sortPriceDesc")}</option>
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
              <p className="font-display text-3xl md:text-4xl font-medium text-foreground tracking-tight">{t("collection.emptyTitle")}</p>
              <p className="mt-4 font-body text-foreground/65 max-w-md mx-auto">
                {t("collection.emptyBody")}
              </p>
              <a
                href="/shop"
                className="inline-flex items-center mt-10 font-heading text-[12px] font-semibold uppercase tracking-[0.3em] text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors"
              >
                {t("collection.emptyCta")} →
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-10 md:gap-y-24">
              {filtered.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          )}
        </section>

        {config.faqs && config.faqs.length > 0 && (
          <section className="mt-20 md:mt-28 max-w-3xl mx-auto border-t border-foreground/10 pt-12 md:pt-16">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3 text-center">
              {t("collection.faq")}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground text-center mb-10">
              {config.title} {t("collection.faqHeadingSuffix")}
            </h2>
            <dl className="space-y-8">
              {config.faqs.map((faq) => (
                <div key={faq.question} className="border-b border-foreground/10 pb-8 last:border-b-0">
                  <dt className="font-display text-lg md:text-xl font-semibold text-foreground mb-2">
                    {faq.question}
                  </dt>
                  <dd className="font-body text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Collection;
