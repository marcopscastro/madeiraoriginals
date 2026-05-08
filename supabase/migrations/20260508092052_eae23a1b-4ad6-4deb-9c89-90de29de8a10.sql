-- production_quotes table
create table public.production_quotes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  business_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  service_type text not null,
  quantity text,
  deadline text,
  artwork_url text,
  message text,
  status text not null default 'new'
);

alter table public.production_quotes enable row level security;

create policy "Anyone can submit a production quote"
  on public.production_quotes for insert
  to anon, authenticated
  with check (true);

create policy "Admins read production quotes"
  on public.production_quotes for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins manage production quotes"
  on public.production_quotes for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create trigger production_quotes_touch_updated_at
  before update on public.production_quotes
  for each row execute function public.touch_updated_at();

-- private storage bucket for artwork
insert into storage.buckets (id, name, public)
values ('quote-artwork', 'quote-artwork', false)
on conflict (id) do nothing;

create policy "Anyone can upload quote artwork"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'quote-artwork');

create policy "Admins read quote artwork"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'quote-artwork' and public.has_role(auth.uid(), 'admin'));

create policy "Admins manage quote artwork"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'quote-artwork' and public.has_role(auth.uid(), 'admin'))
  with check (bucket_id = 'quote-artwork' and public.has_role(auth.uid(), 'admin'));
