-- Site layout config (nav + footer) as a singleton row.
-- Moves nav/footer off local-file storage (which is read-only on Cloudflare
-- Workers, so admin "Site Layout" saves used to error) into Supabase so the
-- admin panel can edit the navigation (incl. the Services dropdown) and footer
-- in production. Run in the Supabase SQL editor after 012_services.sql.

create table if not exists public.yogmandu_site_config (
  id         text        primary key default 'singleton',
  data       jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.yogmandu_site_config enable row level security;

-- Seed the singleton row (empty — the app falls back to code defaults until
-- the admin saves, at which point real config is written here).
insert into public.yogmandu_site_config (id, data)
values ('singleton', '{}'::jsonb)
on conflict (id) do nothing;
