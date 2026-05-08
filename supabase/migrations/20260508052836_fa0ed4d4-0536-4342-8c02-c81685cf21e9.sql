
INSERT INTO public.articles (slug, title, excerpt, body_md, tags, published, seo_title, seo_description)
VALUES
(
  'walking-the-levadas',
  'Walking the Levadas: Madeira''s slow network',
  'Centuries-old irrigation channels turned into the island''s most loved hiking trails.',
  E'# Walking the Levadas\n\nThe levadas are Madeira''s quiet infrastructure. Centuries before the highways, before the tunnels through the mountains, the island was already moving water — from the cloud-soaked north to the drier, sun-facing south — through narrow stone channels carved by hand into the cliffs.\n\nToday, the maintenance paths beside those channels are the island''s most loved hiking network. You can walk for hours through laurisilva forest, the constant sound of running water beside you, and barely meet another person.\n\n## Where to start\n\n- **Levada do Caldeirão Verde** — dramatic, deep in the laurisilva.\n- **Levada das 25 Fontes** — the postcard one. Busy, but for good reason.\n- **Levada do Rei** — gentler, less travelled, ends at a spring.\n\n## What to wear\n\nLayers. The weather changes in the same hour. A heavyweight tee, something to throw over it, and shoes that don''t mind being a little damp.',
  ARRAY['culture','outdoors','levadas'],
  false,
  'Walking the Levadas — Madeira Originals Journal',
  'A short guide to Madeira''s levadas: the island''s centuries-old water channels turned hiking trails.'
),
(
  'poncha-the-island-in-a-glass',
  'Poncha: the island in a glass',
  'Aguardente de cana, honey, and citrus — and the social ritual that comes with it.',
  E'# Poncha\n\nThree ingredients, one wooden mexelote, and a small glass. Poncha is the most Madeiran drink there is — and ordering one in any village bar means you''ve also ordered the island''s whole social ritual.\n\n## The recipe\n\n- **Aguardente de cana** — sugar cane spirit, distilled on the island.\n- **Honey** — traditionally bee honey; sugar cane honey works too.\n- **Citrus** — lemon is classic. Tangerine in winter. Passion fruit if you''re in Câmara de Lobos.\n\nMix in the glass. Serve immediately. Repeat slowly.\n\n## Where to drink it\n\nThe small *tascas* of Câmara de Lobos and Serra de Água are the spiritual home, but a good poncha is now everywhere on the island. The rule is simple: if the bartender uses a wooden mexelote and not a blender, you''re in the right place.',
  ARRAY['culture','food-and-drink','poncha'],
  false,
  'Poncha — Madeira''s drink, Madeira Originals Journal',
  'A short editorial on poncha — Madeira''s traditional drink of aguardente de cana, honey, and citrus.'
)
ON CONFLICT (slug) DO NOTHING;
