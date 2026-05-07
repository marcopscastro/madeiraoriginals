
DELETE FROM public.articles WHERE slug = '__noop__';

UPDATE public.articles SET cover_url = '/journal/journal-streetwear.jpg' WHERE slug IN ('modern-madeira-streetwear','madeira-streetwear-modern-island-style');
UPDATE public.articles SET cover_url = '/journal/journal-embroidery.jpg' WHERE slug IN ('best-souvenirs-from-madeira','what-to-bring-back-from-madeira');
UPDATE public.articles SET cover_url = '/journal/culture-hero.jpg' WHERE slug = 'what-makes-madeira-culture-unique';
UPDATE public.articles SET cover_url = '/journal/journal-funchal.jpg' WHERE slug = 'funchal-travel-guide-locals';
UPDATE public.articles SET cover_url = '/journal/journal-poncha.jpg' WHERE slug = 'poncha-madeira-traditional-drink';
