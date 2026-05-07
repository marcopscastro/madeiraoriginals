
-- PROFILES
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Profiles readable by everyone" on public.profiles for select using (true);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = user_id);
create policy "Users insert own profile" on public.profiles for insert with check (auth.uid() = user_id);
create trigger profiles_touch before update on public.profiles for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)));
  return new;
end; $$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- REVIEWS
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_handle text not null,
  product_title text,
  user_id uuid not null,
  author_name text not null,
  rating int not null check (rating between 1 and 5),
  title text,
  body text not null,
  approved boolean not null default true,
  created_at timestamptz not null default now()
);
create index reviews_handle_idx on public.reviews(product_handle);
alter table public.reviews enable row level security;
create policy "Anyone reads approved reviews" on public.reviews for select using (approved = true);
create policy "Admins read all reviews" on public.reviews for select to authenticated using (has_role(auth.uid(),'admin'));
create policy "Authed users insert own review" on public.reviews for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own review" on public.reviews for update to authenticated using (auth.uid() = user_id);
create policy "Users delete own review" on public.reviews for delete to authenticated using (auth.uid() = user_id);
create policy "Admins manage reviews" on public.reviews for all to authenticated using (has_role(auth.uid(),'admin')) with check (has_role(auth.uid(),'admin'));

-- HORECA LEADS
create table public.horeca_leads (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  product_type text,
  estimated_quantity text,
  deadline text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
alter table public.horeca_leads enable row level security;
create policy "Anyone can submit a lead" on public.horeca_leads for insert to anon, authenticated with check (true);
create policy "Admins read leads" on public.horeca_leads for select to authenticated using (has_role(auth.uid(),'admin'));
create policy "Admins manage leads" on public.horeca_leads for all to authenticated using (has_role(auth.uid(),'admin')) with check (has_role(auth.uid(),'admin'));

-- STORAGE bucket for journal covers
insert into storage.buckets (id, name, public) values ('journal-covers','journal-covers',true) on conflict (id) do nothing;
create policy "Public read journal covers" on storage.objects for select using (bucket_id = 'journal-covers');
create policy "Admins upload journal covers" on storage.objects for insert to authenticated with check (bucket_id = 'journal-covers' and has_role(auth.uid(),'admin'));
create policy "Admins update journal covers" on storage.objects for update to authenticated using (bucket_id = 'journal-covers' and has_role(auth.uid(),'admin'));
create policy "Admins delete journal covers" on storage.objects for delete to authenticated using (bucket_id = 'journal-covers' and has_role(auth.uid(),'admin'));
