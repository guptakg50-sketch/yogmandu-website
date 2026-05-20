-- Run this in Supabase SQL editor to add student accounts support

create table if not exists public.yogmandu_users (
  id          uuid        primary key default gen_random_uuid(),
  email       text        unique not null,
  password_hash text      not null,
  full_name   text        not null default '',
  phone       text        not null default '',
  nationality text        not null default '',
  experience_level text   not null default 'Beginner',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists yogmandu_users_email_idx on public.yogmandu_users(email);

-- RLS: no public access — all reads/writes go through server-side API with service role key
alter table public.yogmandu_users enable row level security;
