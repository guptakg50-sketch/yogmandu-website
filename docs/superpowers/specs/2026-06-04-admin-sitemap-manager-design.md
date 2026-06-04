# Admin Sitemap Manager — Design

**Date:** 2026-06-04
**Status:** Approved (practical version)

## Problem

The admin panel has no way to influence `sitemap.xml`. Today `app/sitemap.ts`
auto-includes a fixed list of static pages plus all published blog posts (read
live from Supabase). But when new standalone landing pages are added (e.g.
`/yoga-for-beginners`, `/yoga-retreat-nepal`), there is no admin-facing way to
get them into the sitemap without a code change and redeploy.

We also want a convenient way, from the admin, to copy the sitemap URL and jump
straight to Google Search Console to (re)submit it.

## Scope

**In scope**
- A Supabase-backed list of **custom sitemap URLs** the admin can add/remove.
- `sitemap.ts` appends those custom URLs alongside static + blog routes.
- An admin "Sitemap" section to manage custom URLs, copy the sitemap URL, and
  deep-link to Google Search Console.

**Out of scope (YAGNI / decided against)**
- True programmatic "submit to Google" via API. **Rejected:** the Search Console
  API service-account path is hard-blocked by Google for this Domain property
  ("email not found" on add-user), and the OAuth path yields tokens that expire
  every 7 days in Testing mode (or needs multi-week app verification for a
  "sensitive" scope in Production). The value is marginal — Google already
  crawls the sitemap. We deep-link to GSC for a one-click manual submit instead.
- Editing existing static/blog routes (they auto-manage themselves).
- Per-URL `lastModified` editing or bulk import.

## Why Supabase (not the file store)

`lib/siteConfigStore.ts` persists via `writeFileSync` to `data/site-config.json`.
That works on cPanel but **does not persist on Cloudflare Workers** (read-only,
ephemeral filesystem). Custom sitemap URLs must therefore live in Supabase — the
only persistent store on the current hosting — following the existing
`yogmandu_*` table pattern.

## Components

### 1. Database — `supabase/migrations/008_sitemap_urls.sql`

New table, mirroring the conventions in `006_instructors.sql`:

```sql
create table if not exists public.yogmandu_sitemap_urls (
  id               uuid        primary key default gen_random_uuid(),
  path             text        not null unique,          -- e.g. '/yoga-for-beginners'
  priority         numeric(2,1) not null default 0.5,    -- 0.0–1.0
  change_frequency text        not null default 'monthly',
  created_at       timestamptz not null default now()
);
create index if not exists yogmandu_sitemap_urls_created_idx
  on public.yogmandu_sitemap_urls(created_at desc);
alter table public.yogmandu_sitemap_urls enable row level security;
```

The migration is applied by running it in the Supabase SQL editor (same as the
other numbered migrations — they are run manually per `supabase/README.md`).

### 2. Public read — `lib/publicData.ts`

Add `getCustomSitemapUrls()` following the exact shape of `getPublishedBlogs()`:
returns `null` when `!isSupabaseConfigured`, wraps the query in try/catch, selects
`path, priority, change_frequency` ordered by `created_at`.

### 3. Sitemap — `app/sitemap.ts`

Add a third source after `blogRoutes`:

```ts
const custom = await getCustomSitemapUrls().catch(() => null);
const customRoutes: MetadataRoute.Sitemap = (custom ?? []).map((row) => ({
  url:             `${base}${row.path}`,
  lastModified:    BUILD_DATE,
  changeFrequency: row.change_frequency as MetadataRoute.Sitemap[number]["changeFrequency"],
  priority:        row.priority,
}));
return [...staticRoutes, ...blogRoutes, ...fallbackRoutes, ...customRoutes];
```

A DB failure degrades gracefully — the sitemap still renders static + blog routes.

### 4. Admin API — `app/api/admin/sitemap-urls/route.ts`

`export const dynamic = "force-dynamic";` and every handler guarded by
`requireAdminSession()` + `isSupabaseConfigured`, matching `instructors/route.ts`.

- **GET** → list all rows (`{ data, configured }`).
- **POST** `{ path, priority?, changeFrequency? }` → validate, sanitize, insert.
- **DELETE** `?id=<uuid>` (or `{ id }` body) → delete by id.

**Validation (POST):**
- `path` required; trimmed; must start with `/`; must NOT contain `://`
  (same-site only, no external/absolute URLs); max length 512; reject if it
  collides with a known static route or `/blog/*` (those are already covered) —
  return 409 with a clear message.
- `priority` optional; coerce to number; clamp to `0.0–1.0`; default `0.5`.
- `changeFrequency` optional; must be one of the sitemap enum values
  (`always|hourly|daily|weekly|monthly|yearly|never`); default `monthly`.
- Sanitize string inputs via the existing `sanitizeDeep` (as `site-config` does).
- Duplicate `path` → DB unique constraint → return 409 with a friendly message.

### 5. Admin UI — "Sitemap" section in `app/admin/(protected)/page.tsx`

A new section consistent with the existing admin sections:
- **Add form:** path input (placeholder `/yoga-for-beginners`), optional priority
  (number 0–1) and change-frequency (select), **Add** button → `POST`.
- **List:** each custom URL with its priority/frequency and a **Delete** button → `DELETE`.
- **Helpers row:**
  - **Copy sitemap URL** → copies `https://yogmandu.com/sitemap.xml` to clipboard.
  - **View sitemap.xml** → opens `https://yogmandu.com/sitemap.xml` in a new tab.
  - **Open in Search Console** → opens
    `https://search.google.com/search-console/sitemaps?resource_id=sc-domain:yogmandu.com`
    in a new tab (one-click manual submit; honest label noting Google auto-submit
    is not available).

If the section grows large, extract it into a `SitemapManager` client component
imported by the admin page, to keep the page file focused.

## Data flow

```
Admin UI  ──POST/DELETE──▶  /api/admin/sitemap-urls  ──▶  yogmandu_sitemap_urls (Supabase)
                                                              │
public request /sitemap.xml ──▶ app/sitemap.ts ──getCustomSitemapUrls()──┘
```

## Error handling

- Supabase unconfigured: API returns `{ configured: false }` / 503; `sitemap.ts`
  falls back to static + blog routes (existing behavior).
- Invalid POST input: 400 with a specific message; duplicate/known-route: 409.
- All admin handlers 401 when unauthenticated (via `requireAdminSession`).

## Testing

- **Migration:** apply in Supabase; confirm table + unique index exist.
- **API:** unauthenticated → 401; valid add → row inserted + appears in GET;
  duplicate → 409; external URL (`https://evil.com`) → 400; known route
  (`/about`) → 409; delete → row gone.
- **Sitemap:** after adding `/yoga-for-beginners`, `GET /sitemap.xml` contains
  `<loc>https://yogmandu.com/yoga-for-beginners</loc>`; with Supabase down, the
  sitemap still returns static + blog routes.
- **UI:** add/delete round-trips; copy button writes the URL; GSC button opens
  the correct property.

## Deployment

Standard for this project (git auto-build is broken):
`npm run build:cf && npx wrangler pages deploy .open-next/assets
--project-name=yogmandu-official --branch=master --commit-dirty=true`, plus
applying the SQL migration in Supabase. No new secrets required.
