-- Add bio and avatar_url to yogmandu_users

alter table public.yogmandu_users
  add column if not exists bio        text not null default '',
  add column if not exists avatar_url text not null default '';
