CREATE TABLE public.wholesale_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_label text NOT NULL,
  min_qty integer NOT NULL,
  max_qty integer,
  unit_price_eur numeric(10,2) NOT NULL,
  notes text,
  sort_order integer NOT NULL DEFAULT 0
);

GRANT ALL ON public.wholesale_pricing TO service_role;

ALTER TABLE public.wholesale_pricing ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.pin_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip text NOT NULL,
  attempted_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX pin_attempts_ip_attempted_at_idx ON public.pin_attempts (ip, attempted_at);

GRANT ALL ON public.pin_attempts TO service_role;

ALTER TABLE public.pin_attempts ENABLE ROW LEVEL SECURITY;

INSERT INTO public.wholesale_pricing (tier_label, min_qty, max_qty, unit_price_eur, sort_order) VALUES
  ('Tier 1', 25, 49, 12.50, 1),
  ('Tier 2', 50, 99, 11.00, 2),
  ('Tier 3', 100, NULL, 10.00, 3);