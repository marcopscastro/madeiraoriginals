ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS title_pt text,
  ADD COLUMN IF NOT EXISTS excerpt_pt text,
  ADD COLUMN IF NOT EXISTS body_md_pt text,
  ADD COLUMN IF NOT EXISTS seo_title_pt text,
  ADD COLUMN IF NOT EXISTS seo_description_pt text;