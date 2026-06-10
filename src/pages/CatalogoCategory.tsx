import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import {
  CATEGORIES,
  CATEGORY_SLUGS,
  SLUG_TO_CATEGORY,
  formatEUR,
  type Category,
} from "@/lib/catalog";

type Row = {
  id: string;
  name: string;
  supplier: string;
  supplier_ref: string;
  category: string;
  gsm: number | null;
  colors: unknown;
  price_from: number | null;
  price_on_request: boolean;
  image_url: string | null;
};

const PAGE_SIZE = 48;
type Sort = "price-asc" | "price-desc" | "name";

const CatalogoCategory = () => {
  const { category: slug } = useParams();
  const category = slug ? SLUG_TO_CATEGORY[slug] : undefined;

  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("price-asc");
  const [loading, setLoading] = useState(true);

  // Debounce search
  const [searchDebounced, setSearchDebounced] = useState("");
  useEffect(() => {
    const id = setTimeout(() => setSearchDebounced(search.trim()), 250);
    return () => clearTimeout(id);
  }, [search]);

  useEffect(() => {
    setPage(0);
  }, [category, searchDebounced, sort]);

  useEffect(() => {
    if (!category) return;
    let cancelled = false;
    setLoading(true);
    (async () => {
      let q = supabase
        .from("catalog_products")
        .select("id,name,supplier,supplier_ref,category,gsm,colors,price_from,price_on_request,image_url", {
          count: "exact",
        })
        .eq("category", category);

      if (searchDebounced) {
        const escaped = searchDebounced.replace(/[%,]/g, " ");
        q = q.or(`name.ilike.%${escaped}%,supplier_ref.ilike.%${escaped}%`);
      }
      if (sort === "price-asc") q = q.order("price_from", { ascending: true, nullsFirst: false });
      else if (sort === "price-desc") q = q.order("price_from", { ascending: false, nullsFirst: false });
      else q = q.order("name", { ascending: true });

      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const { data, count } = await q.range(from, to);
      if (cancelled) return;
      setRows((data ?? []) as Row[]);
      setTotal(count ?? 0);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [category, searchDebounced, sort, page]);

  if (slug && !category) return <Navigate to="/catalogo" replace />;
  if (!category) return null;

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${category} — Catálogo`}
        description={`Catálogo de ${category.toLowerCase()} personalizáveis para empresas e eventos.`}
        path={`/catalogo/${slug}`}
      />
      <Header />
      <main>
        <section className="bg-secondary text-secondary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <Link
              to="/catalogo"
              className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] opacity-70 hover:opacity-100"
            >
              ← Catálogo
            </Link>
            <h1 className="mt-3 font-display text-3xl md:text-5xl font-semibold leading-[1.05]">
              {category}
            </h1>
          </div>
        </section>

        {/* Filters */}
        <section className="border-b border-foreground/15 sticky top-0 z-30 bg-background/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c}
                  to={`/catalogo/${CATEGORY_SLUGS[c as Category]}`}
                  className={`font-heading text-[11px] font-bold uppercase tracking-widest px-3 py-2 border ${
                    c === category
                      ? "bg-foreground text-background border-foreground"
                      : "border-foreground/25 hover:border-foreground"
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar por nome ou referência"
                className="flex-1 bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
              />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
              >
                <option value="price-asc">Preço (menor → maior)</option>
                <option value="price-desc">Preço (maior → menor)</option>
                <option value="name">Nome (A–Z)</option>
              </select>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          {loading && rows.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground">A carregar…</p>
          ) : rows.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground">
              Sem resultados. Tente outra pesquisa.
            </p>
          ) : (
            <>
              <p className="font-heading text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                {total} produto{total === 1 ? "" : "s"}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {rows.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

const ProductCard = ({ p }: { p: Row }) => {
  const colorsArr = Array.isArray(p.colors) ? (p.colors as unknown[]) : [];
  return (
    <Link to={`/catalogo/produto/${p.id}`} className="group block">
      <div className="aspect-square bg-muted overflow-hidden border border-foreground/10">
        {p.image_url ? (
          <img
            src={p.image_url}
            alt={p.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-heading text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Sem imagem
          </div>
        )}
      </div>
      <div className="mt-3">
        <h3 className="font-body text-sm leading-snug line-clamp-2">{p.name}</h3>
        <p className="mt-1 font-heading text-xs font-bold tracking-widest text-foreground">
          {p.price_on_request || p.price_from == null
            ? "Preço sob consulta"
            : `desde ${formatEUR(p.price_from)}`}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {colorsArr.length > 0 && (
            <span className="font-heading text-[10px] uppercase tracking-widest border border-foreground/25 px-2 py-0.5">
              {colorsArr.length} cor{colorsArr.length === 1 ? "" : "es"}
            </span>
          )}
          {p.gsm ? (
            <span className="font-heading text-[10px] uppercase tracking-widest border border-foreground/25 px-2 py-0.5">
              {p.gsm} g/m²
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

const Pagination = ({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) => {
  const windowed = useMemo(() => {
    const set = new Set<number>([0, totalPages - 1, page]);
    for (let d = 1; d <= 2; d++) {
      if (page - d >= 0) set.add(page - d);
      if (page + d < totalPages) set.add(page + d);
    }
    return Array.from(set).sort((a, b) => a - b);
  }, [page, totalPages]);

  return (
    <nav className="mt-10 flex flex-wrap gap-2 items-center justify-center">
      <button
        onClick={() => onChange(Math.max(0, page - 1))}
        disabled={page === 0}
        className="font-heading text-[11px] font-bold uppercase tracking-widest border border-foreground/25 px-3 py-2 disabled:opacity-30"
      >
        Anterior
      </button>
      {windowed.map((p, idx) => {
        const prev = windowed[idx - 1];
        const gap = prev != null && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-2">
            {gap && <span className="font-body text-sm text-muted-foreground">…</span>}
            <button
              onClick={() => onChange(p)}
              className={`font-heading text-[11px] font-bold uppercase tracking-widest px-3 py-2 border ${
                p === page
                  ? "bg-foreground text-background border-foreground"
                  : "border-foreground/25 hover:border-foreground"
              }`}
            >
              {p + 1}
            </button>
          </span>
        );
      })}
      <button
        onClick={() => onChange(Math.min(totalPages - 1, page + 1))}
        disabled={page >= totalPages - 1}
        className="font-heading text-[11px] font-bold uppercase tracking-widest border border-foreground/25 px-3 py-2 disabled:opacity-30"
      >
        Seguinte
      </button>
    </nav>
  );
};

export default CatalogoCategory;
