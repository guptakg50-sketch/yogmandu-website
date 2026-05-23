-- Newsletter subscribers
-- Run in Supabase SQL editor after 003_password_resets_and_verification.sql

create table if not exists public.yogmandu_newsletter_subscribers (
  id              uuid        primary key default gen_random_uuid(),
  email           text        not null unique,
  source          text        not null default 'footer',
  ip_hash         text,
  created_at      timestamptz not null default now(),
  unsubscribed_at timestamptz
);

create index if not exists yogmandu_newsletter_email_idx
  on public.yogmandu_newsletter_subscribers(email);

create index if not exists yogmandu_newsletter_created_idx
  on public.yogmandu_newsletter_subscribers(created_at desc);

-- RLS off — only the service role inserts via the API
alter table public.yogmandu_newsletter_subscribers enable row level security;
