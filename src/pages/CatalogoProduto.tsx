import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import {
  CATEGORY_SLUGS,
  formatEUR,
  parseTiers,
  supplierBadge,
  tierRangeLabel,
  type Category,
} from "@/lib/catalog";

type Product = {
  id: string;
  name: string;
  supplier: string;
  supplier_ref: string;
  category: string;
  material: string | null;
  composition: string | null;
  gsm: number | null;
  colors: unknown;
  sizes: unknown;
  price_tiers: unknown;
  price_from: number | null;
  price_on_request: boolean;
  image_url: string | null;
};

const CatalogoProduto = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("catalog_products")
        .select(
          "id,name,supplier,supplier_ref,category,material,composition,gsm,colors,sizes,price_tiers,price_from,price_on_request,image_url",
        )
        .eq("id", id)
        .maybeSingle();
      if (cancelled) return;
      setProduct((data as Product | null) ?? null);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <p className="font-body text-sm text-muted-foreground">A carregar…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="font-display text-3xl font-semibold mb-4">Produto não encontrado</h1>
          <Link
            to="/catalogo"
            className="font-heading text-xs font-bold uppercase tracking-widest underline"
          >
            Voltar ao catálogo
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const tiers = parseTiers(product.price_tiers);
  const colors = Array.isArray(product.colors) ? (product.colors as string[]) : [];
  const sizes = Array.isArray(product.sizes) ? (product.sizes as string[]) : [];
  const categorySlug = CATEGORY_SLUGS[product.category as Category];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${product.name} — Catálogo`}
        description={`${product.name} — referência ${product.supplier_ref}. Personalizável para empresas e eventos.`}
        path={`/catalogo/produto/${product.id}`}
      />
      <Header />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <nav className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            <Link to="/catalogo" className="hover:text-foreground">Catálogo</Link>
            {categorySlug && (
              <>
                <span className="mx-2">/</span>
                <Link to={`/catalogo/${categorySlug}`} className="hover:text-foreground">
                  {product.category}
                </Link>
              </>
            )}
          </nav>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="aspect-square bg-muted border border-foreground/10 overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-heading text-xs uppercase tracking-widest text-muted-foreground">
                Sem imagem
              </div>
            )}
          </div>

          <div>
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-2">
              {supplierBadge(product.supplier)} · Ref. {product.supplier_ref}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-4">
              {product.name}
            </h1>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6 font-body text-sm">
              {product.material && <Spec label="Material" value={product.material} />}
              {product.composition && <Spec label="Composição" value={product.composition} />}
              {product.gsm ? <Spec label="Gramagem" value={`${product.gsm} g/m²`} /> : null}
              <Spec label="Categoria" value={product.category} />
            </dl>

            {colors.length > 0 && (
              <div className="mb-5">
                <p className="font-heading text-xs font-bold uppercase tracking-widest mb-2">
                  Cores ({colors.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <span
                      key={c}
                      className="font-body text-xs border border-foreground/25 px-2.5 py-1"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div className="mb-8">
                <p className="font-heading text-xs font-bold uppercase tracking-widest mb-2">
                  Tamanhos
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <span
                      key={s}
                      className="font-heading text-xs font-bold uppercase tracking-widest border border-foreground/25 px-2.5 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.price_on_request || tiers.length === 0 ? (
              <div className="border border-foreground/20 p-5 mb-6">
                <p className="font-heading text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Preço
                </p>
                <p className="font-display text-2xl font-semibold">Preço sob consulta</p>
              </div>
            ) : (
              <div className="mb-3 border border-foreground/20">
                <div className="grid grid-cols-2 bg-foreground text-background font-heading text-[11px] font-bold uppercase tracking-widest">
                  <div className="px-4 py-3">Quantidade</div>
                  <div className="px-4 py-3">Preço/un.</div>
                </div>
                {tiers.map((tier, i) => (
                  <div
                    key={tier.min_qty + "-" + i}
                    className="grid grid-cols-2 border-t border-foreground/15 font-body text-sm"
                  >
                    <div className="px-4 py-3">{tierRangeLabel(tier, tiers[i + 1])}</div>
                    <div className="px-4 py-3 font-heading font-bold">
                      {formatEUR(tier.price)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-body text-xs text-muted-foreground mb-8">
              Preços s/ IVA e s/ personalização.
            </p>

            <a
              href="#orcamento"
              className="inline-block bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-4 hover:opacity-90"
            >
              Pedir orçamento
            </a>
          </div>
        </section>

        <section
          id="orcamento"
          className="border-t border-foreground/15 bg-secondary/40 py-16 md:py-20"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">
              Pedir orçamento
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-8">
              Receba uma proposta personalizada em 24h úteis.
            </p>
            <QuoteForm productId={product.id} productName={product.name} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const Spec = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="font-heading text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
      {label}
    </dt>
    <dd className="mt-0.5">{value}</dd>
  </div>
);

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Indique o seu nome").max(80),
  email: z.string().trim().email("Email inválido").max(255),
  company: z.string().trim().max(120).optional(),
  quantity: z.string().trim().max(40).optional(),
  message: z.string().trim().max(2000).optional(),
});

const QuoteForm = ({ productId, productName }: { productId: string; productName: string }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    quantity: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = <K extends keyof typeof form>(k: K, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = quoteSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const d = parsed.data;
    const { error } = await supabase.from("quote_requests").insert({
      product_id: productId,
      product_name: productName,
      name: d.name,
      email: d.email,
      company: d.company || null,
      quantity: d.quantity || null,
      message: d.message || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Não foi possível enviar. Tente novamente.");
      return;
    }
    setDone(true);
    toast.success("Pedido enviado");
  };

  if (done) {
    return (
      <div className="border border-foreground/20 p-8 text-center bg-background">
        <h3 className="font-display text-2xl font-semibold mb-3">Pedido recebido</h3>
        <p className="font-body text-muted-foreground">
          Obrigado. Vamos responder por email em 24h úteis.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="grid sm:grid-cols-2 gap-4 border border-foreground/20 p-6 md:p-8 bg-background"
    >
      <Field label="Nome" value={form.name} onChange={(v) => update("name", v)} required />
      <Field
        label="Email"
        type="email"
        value={form.email}
        onChange={(v) => update("email", v)}
        required
      />
      <Field label="Empresa" value={form.company} onChange={(v) => update("company", v)} />
      <Field
        label="Quantidade"
        value={form.quantity}
        onChange={(v) => update("quantity", v)}
        placeholder="Ex.: 100 unidades"
      />
      <div className="sm:col-span-2">
        <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">
          Mensagem
        </label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          maxLength={2000}
          placeholder="Cores, tamanhos, prazo, tipo de personalização…"
          className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="sm:col-span-2 bg-primary text-primary-foreground font-heading font-bold text-sm uppercase tracking-widest px-6 py-4 hover:opacity-90 disabled:opacity-50"
      >
        {submitting ? "A enviar…" : "Enviar pedido"}
      </button>
    </form>
  );
};

const Field = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) => (
  <div>
    <label className="font-heading text-xs font-bold uppercase tracking-widest mb-2 block">
      {label}
      {required && <span className="text-primary"> *</span>}
    </label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-background border border-foreground/30 px-4 py-3 font-body text-sm focus:outline-none focus:border-foreground rounded-none"
    />
  </div>
);

export default CatalogoProduto;
