-- Gallery items
-- Run in Supabase SQL editor after 004_newsletter.sql
-- Stores photos shown on /gallery — categorised + ordered, managed via /admin → Gallery.

create table if not exists public.yogmandu_gallery_items (
  id            text        primary key,
  url           text        not null,
  path          text,
  title         text        not null default '',
  category      text        not null default 'Yoga',
  display_order integer     not null default 0,
  data          jsonb       not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists yogmandu_gallery_order_idx
  on public.yogmandu_gallery_items(display_order asc, created_at desc);

create index if not exists yogmandu_gallery_category_idx
  on public.yogmandu_gallery_items(category);

alter table public.yogmandu_gallery_items enable row level security;
