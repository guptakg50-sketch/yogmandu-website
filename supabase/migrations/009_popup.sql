-- Site-wide entry popup (singleton config)
-- Run in Supabase SQL editor after 008_sitemap_urls.sql

create table if not exists public.yogmandu_popup (
  id         text        primary key default 'singleton',
  enabled    boolean     not null default false,
  image_url  text        not null default '',
  image_alt  text        not null default '',
  link_url   text        not null default '',
  start_at   timestamptz,
  end_at     timestamptz,
  version    integer     not null default 1,
  data       jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.yogmandu_popup enable row level security;

-- Seed the singleton row (disabled by default)
insert into public.yogmandu_popup (id, enabled, version)
values ('singleton', false, 1)
on conflict (id) do nothing;
