-- Instructors / Teachers
-- Run in Supabase SQL editor after 005_gallery_items.sql

create table if not exists public.yogmandu_instructors (
  id            text        primary key,
  name          text        not null,
  photo         text        not null default '',
  bio           text        not null default '',
  specialties   text[]      not null default '{}',
  certifications text       not null default '',
  years         integer     not null default 0,
  status        text        not null default 'Active',
  display_order integer     not null default 0,
  data          jsonb       not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists yogmandu_instructors_status_idx
  on public.yogmandu_instructors(status);

create index if not exists yogmandu_instructors_order_idx
  on public.yogmandu_instructors(display_order asc, name);

alter table public.yogmandu_instructors enable row level security;
