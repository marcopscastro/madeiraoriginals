
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS public.catalog_products (
  id text PRIMARY KEY,
  supplier text NOT NULL,
  supplier_ref text NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  material text,
  composition text,
  gsm int,
  colors jsonb NOT NULL DEFAULT '[]'::jsonb,
  sizes jsonb NOT NULL DEFAULT '[]'::jsonb,
  price_tiers jsonb NOT NULL DEFAULT '[]'::jsonb,
  price_from numeric(10,2),
  price_on_request boolean NOT NULL DEFAULT false,
  image_url text,
  supplier_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.catalog_products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.catalog_products TO authenticated;
GRANT ALL ON public.catalog_products TO service_role;

ALTER TABLE public.catalog_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "catalog_public_read" ON public.catalog_products FOR SELECT USING (true);
CREATE POLICY "catalog_admin_insert" ON public.catalog_products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "catalog_admin_update" ON public.catalog_products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "catalog_admin_delete" ON public.catalog_products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS catalog_products_category_idx ON public.catalog_products (category);
CREATE INDEX IF NOT EXISTS catalog_products_price_from_idx ON public.catalog_products (price_from);
CREATE INDEX IF NOT EXISTS catalog_products_name_trgm_idx ON public.catalog_products USING gin (name gin_trgm_ops);

CREATE TRIGGER catalog_products_updated_at
  BEFORE UPDATE ON public.catalog_products
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE IF NOT EXISTS public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id text REFERENCES public.catalog_products(id) ON DELETE SET NULL,
  product_name text,
  name text NOT NULL,
  email text NOT NULL,
  company text,
  quantity text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.quote_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.quote_requests TO authenticated;
GRANT ALL ON public.quote_requests TO service_role;

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "quote_requests_public_insert" ON public.quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "quote_requests_admin_select" ON public.quote_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "quote_requests_admin_update" ON public.quote_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "quote_requests_admin_delete" ON public.quote_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER quote_requests_updated_at
  BEFORE UPDATE ON public.quote_requests
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
