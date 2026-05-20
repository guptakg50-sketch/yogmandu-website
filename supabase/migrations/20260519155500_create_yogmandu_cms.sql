-- Yogmandu CMS backend schema.
-- Run this in the Supabase SQL editor. It creates the CMS tables and a public
-- Storage bucket named "yogmandu-media".

create table if not exists public.yogmandu_blogs (
  id text primary key,
  slug text unique not null,
  title text not null,
  status text not null default 'Draft',
  published_at timestamptz,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists yogmandu_blogs_status_idx on public.yogmandu_blogs(status);
create index if not exists yogmandu_blogs_published_at_idx on public.yogmandu_blogs(published_at desc);

create table if not exists public.yogmandu_sessions (
  id text primary key,
  slug text unique not null,
  name text not null,
  type text not null,
  status text not null default 'Active',
  display_order integer not null default 100,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists yogmandu_sessions_status_idx on public.yogmandu_sessions(status);
create index if not exists yogmandu_sessions_display_order_idx on public.yogmandu_sessions(display_order);

create table if not exists public.yogmandu_media (
  id text primary key,
  url text not null,
  caption text not null default '',
  used_by text not null default '',
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists yogmandu_media_used_by_idx on public.yogmandu_media(used_by);

alter table public.yogmandu_blogs enable row level security;
alter table public.yogmandu_sessions enable row level security;
alter table public.yogmandu_media enable row level security;

drop policy if exists "Public can read published blogs" on public.yogmandu_blogs;
create policy "Public can read published blogs"
on public.yogmandu_blogs for select
using (status = 'Published');

drop policy if exists "Public can read active sessions" on public.yogmandu_sessions;
create policy "Public can read active sessions"
on public.yogmandu_sessions for select
using (status in ('Active', 'Upcoming'));

drop policy if exists "Public can read media" on public.yogmandu_media;
create policy "Public can read media"
on public.yogmandu_media for select
using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'yogmandu-media',
  'yogmandu-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
