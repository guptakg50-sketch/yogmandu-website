-- Generic singleton pricing config (jsonb) so future editable prices need no schema change.
create table if not exists public.yogmandu_pricing (
  id         text primary key default 'singleton',
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.yogmandu_pricing enable row level security;

insert into public.yogmandu_pricing (id, data)
values ('singleton', '{}'::jsonb)
on conflict (id) do nothing;
