-- Bookings table
-- Run after 006_instructors.sql

create table if not exists public.yogmandu_bookings (
  id              uuid        primary key default gen_random_uuid(),
  name            text        not null,
  email           text        not null,
  phone           text,
  service_id      text        not null,
  service_title   text        not null,
  preferred_date  date,
  message         text,
  status          text        not null default 'pending',
  ip_hash         text,
  created_at      timestamptz not null default now()
);

create index if not exists yogmandu_bookings_email_idx
  on public.yogmandu_bookings(email);

create index if not exists yogmandu_bookings_created_idx
  on public.yogmandu_bookings(created_at desc);

create index if not exists yogmandu_bookings_status_idx
  on public.yogmandu_bookings(status);

-- RLS — only service role can read/write (admin API)
alter table public.yogmandu_bookings enable row level security;i
as