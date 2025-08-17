create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  city text,
  bio text,
  rating_avg numeric,
  reviews_count int default 0,
  created_at timestamp with time zone default now()
);

create table if not exists public.listings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text check (type in ('need','offer')) not null,
  title text not null,
  description text not null,
  category text not null,
  price_number numeric,
  city text,
  status text not null default 'active' check (status in ('active','closed')),
  created_at timestamp with time zone default now()
);

create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  reviewer_id uuid not null references auth.users(id) on delete cascade,
  reviewee_id uuid not null references auth.users(id) on delete cascade,
  listing_id uuid references public.listings(id) on delete set null,
  rating int not null check (rating between 1 and 5),
  text text,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.reviews enable row level security;

create policy "profiles read" on public.profiles for select using (true);
create policy "profiles upsert self" on public.profiles for insert with check (auth.uid() = user_id);
create policy "profiles update self" on public.profiles for update using (auth.uid() = user_id);

create policy "listings read" on public.listings for select using (true);
create policy "listings insert self" on public.listings for insert with check (auth.uid() = user_id);
create policy "listings update self" on public.listings for update using (auth.uid() = user_id);
create policy "listings delete self" on public.listings for delete using (auth.uid() = user_id);

create policy "reviews read" on public.reviews for select using (true);
create policy "reviews insert self" on public.reviews for insert with check (auth.uid() = reviewer_id);