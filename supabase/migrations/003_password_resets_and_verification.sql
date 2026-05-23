-- Password reset + email verification support
-- Run this in Supabase SQL editor after 002_user_profile_fields.sql

-- 1) Add verification columns to existing users table
alter table public.yogmandu_users
  add column if not exists email_verified                boolean      not null default false,
  add column if not exists email_verified_at             timestamptz,
  add column if not exists verification_token_hash       text         not null default '',
  add column if not exists verification_token_expires_at timestamptz;

-- 2) Password reset tokens — separate table so multiple outstanding tokens can be invalidated cleanly
create table if not exists public.yogmandu_password_resets (
  id          uuid        primary key default gen_random_uuid(),
  user_id     uuid        not null references public.yogmandu_users(id) on delete cascade,
  token_hash  text        not null,
  expires_at  timestamptz not null,
  used_at     timestamptz,
  created_at  timestamptz not null default now()
);

create index if not exists yogmandu_password_resets_token_idx
  on public.yogmandu_password_resets(token_hash);

create index if not exists yogmandu_password_resets_user_idx
  on public.yogmandu_password_resets(user_id, expires_at);

-- RLS off — only service role accesses this table
alter table public.yogmandu_password_resets enable row level security;
