-- Events: dated occurrences (workshops, hikes, multi-week bootcamps).
-- Distinct from service pages, which describe permanent offerings; an event
-- that runs a service links to that service page rather than duplicating it.
--
-- Same shape as yogmandu_blogs: real columns for the fields we filter and
-- sort on, plus a `data` jsonb column holding the whole record so the admin
-- can add fields without a migration.
--
-- Run in the Supabase SQL editor (Yogmandu project) after 013_site_config.sql.

create table if not exists public.yogmandu_events (
  id         text        primary key,
  slug       text        not null unique,
  status     text        not null default 'Draft',
  -- Date only (no time zone). Times are stored inside `data` and are always
  -- Nepal time (UTC+05:45); storing a timestamptz here would invite silent
  -- off-by-one-day errors around that unusual offset.
  start_date date        not null,
  end_date   date,
  data       jsonb       not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- The public list filters on status and orders by start_date; the detail page
-- looks up by slug (already covered by the unique constraint above).
create index if not exists yogmandu_events_status_start_idx
  on public.yogmandu_events (status, start_date);

-- Only Draft / Published / Cancelled are valid. Guarded so re-running the
-- migration does not error on an existing constraint.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'yogmandu_events_status_check'
  ) then
    alter table public.yogmandu_events
      add constraint yogmandu_events_status_check
      check (status in ('Draft', 'Published', 'Cancelled'));
  end if;
end $$;

-- An end date must not precede the start date.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'yogmandu_events_dates_check'
  ) then
    alter table public.yogmandu_events
      add constraint yogmandu_events_dates_check
      check (end_date is null or end_date >= start_date);
  end if;
end $$;

-- RLS on with no policies: the site reads and writes through the service role
-- key from the Worker, which bypasses RLS. This matches the other yogmandu_*
-- tables and means the anon key cannot read drafts.
alter table public.yogmandu_events enable row level security;
