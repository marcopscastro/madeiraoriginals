
ALTER TABLE public.production_quotes
  ADD COLUMN IF NOT EXISTS horeca_sector text,
  ADD COLUMN IF NOT EXISTS required_services text[];

CREATE TABLE IF NOT EXISTS public.wholesale_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  product_lines text[] NOT NULL DEFAULT '{}',
  estimated_volume text,
  delivery_window text,
  notes text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.wholesale_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a wholesale inquiry"
  ON public.wholesale_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins read wholesale inquiries"
  ON public.wholesale_inquiries FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage wholesale inquiries"
  ON public.wholesale_inquiries FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER wholesale_inquiries_touch_updated_at
  BEFORE UPDATE ON public.wholesale_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
