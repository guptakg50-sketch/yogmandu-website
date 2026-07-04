# Service Category Hubs & Service Pages — Design

**Date:** 2026-07-04
**Status:** Approved (pending spec review)

## Goal

Every nav *category* must behave and look **exactly like Teacher Training**:

- **Click a category** in the nav → its **hub page** opens, showing *all* the
  services in that category as the same 3D tilt cards used on the Teacher
  Training hub.
- **Hover a category** → the flyout of individual services (already works).
- **Click an individual service** (in the flyout, or its hub card) → that
  service's **own full page**, formatted the same as the Teacher Training
  child pages (the `CourseProgram` layout).

Today only Teacher Training does this. The other five categories point at pages
that don't present their services as a card-grid hub, and most of their
sub-items are bare `/book?service=…` links with no dedicated page.

## Non-goals

- No competitor content, competitor location/contact, or false claims. All
  pages use Yogmandu's own branding, Kathmandu context, WhatsApp/booking CTAs.
- Not touching the master `/services` grid page (it stays as the "all services"
  index) beyond nav-href changes.
- No auth/security changes (the earlier security scan is a separate track).

## Architecture — reuse Teacher Training's exact components

Two reusable pieces, built once, then fed data:

### 1. `ServiceHub` (hub card grid)
A section component that renders the **existing** `PricingCard`
(`app/(public)/yoga-teacher-training/PricingSection.tsx`) over an array of the
existing `Tier` type. Same 3D tilt, same animations. Each card's `cardHref`
points to that service's own page. Hub pages compose: hero + stats strip +
`ServiceHub` grid + any category-specific content — mirroring
`yoga-teacher-training/page.tsx`.

### 2. `ServicePage` (child page template)
A data-driven template modeled on the **existing** `CourseProgram`
(`app/(public)/yoga-teacher-training/CourseProgram.tsx`): hero → overview /
who-it's-for → what's included (checklist) → how it works (3 steps) → pricing /
booking CTA → FAQ → "also explore" sibling links. Each child page is a small
config object rendered by this one component, so all ~16 pages stay visually
identical and easy to edit — exactly the pattern Teacher Training's 300hr/500hr
pages already use.

Both live under a shared location, e.g. `components/service/` (or colocated),
with per-page config files kept small.

## URL map

Children nest under each category's existing canonical page (preserves SEO
pages, keeps URLs topical). The two categories that currently share `/services`
get their own **top-level** hub slugs.

| Category (nav href) | Hub page | Child service pages (rich template) |
|---|---|---|
| **Yoga Classes** → `/class-schedule` | existing page + `ServiceHub` grid | `/class-schedule/drop-in`, `/class-schedule/virtual`, `/class-schedule/private`, `/class-schedule/home` — hub also cards to existing `/yoga-for-beginners` |
| **Sound Healing** → `/sound-healing-therapy` | existing page + `ServiceHub` grid | `/sound-healing-therapy/sessions`, `/sound-healing-therapy/certification` (replace the old `#anchors`) |
| **Retreats & Special** → `/yoga-retreat-nepal` | existing page + `ServiceHub` grid | `/yoga-retreat-nepal/weight-loss-bootcamp`, `/yoga-retreat-nepal/corporate-yoga`, `/yoga-retreat-nepal/yoga-trekking` |
| **Therapy & Wellness** → `/therapy-wellness` *(NEW hub)* | new hub page | `/therapy-wellness/yoga-therapy`, `/therapy-wellness/reiki-healing`, `/therapy-wellness/diet-consultation` |
| **For Specific Groups** → `/specialized-yoga` *(NEW hub)* | new hub page | `/specialized-yoga/prenatal`, `/specialized-yoga/childrens-yoga`, `/specialized-yoga/senior-yoga`, `/specialized-yoga/school-yoga` |

Totals: **16 new child pages**, **2 new hub pages**, **3 existing pages** gain a
`ServiceHub` grid section, plus 2 reusable components.

## Wiring

- **Nav** (`components/Nav.tsx` `DEFAULT_CONFIG`, `lib/siteConfigStore.ts`
  `defaultNavConfig`, and the **live Supabase** `yogmandu_site_config` row):
  - Category hrefs: Therapy & Wellness → `/therapy-wellness`, For Specific
    Groups → `/specialized-yoga` (others unchanged).
  - Every item href repointed from `/book?service=…` to its new real page.
- **Sitemap** (`app/sitemap.ts`): add all 18 new routes with appropriate
  priority/changeFrequency; replace the two `/services`-category assumptions.
- **`/services` master grid**: unchanged as content; may add links to the new
  pages if trivial.

## Content plan

Genuine Yogmandu copy per service — real Kathmandu/Nepal context, Yogmandu
faculty/branding, price/booking via WhatsApp (+977-9810263277),
info@yogmandu.com, and the site's `/book?service=…` flow as the booking CTA
(the booking form still handles the actual booking). FAQs 3–4 per page.

## Testing / acceptance

- Every nav category click lands on a hub showing all its services as 3D cards.
- Every hub card and every flyout item opens its own full page (no dead
  `/book?service=` where a page now exists; booking CTA still reachable).
- Hubs visually match the Teacher Training hub; child pages match the
  `CourseProgram` layout.
- `next build` passes; new routes render; sitemap includes them.
- Mobile nav accordion + flyout still work.

## Rollout

Build the two reusable components first, then one full category end-to-end
(hub + its child pages) to lock the exact look, then replicate across the
remaining four. Nav + sitemap wiring last. Deploy via `npm run deploy:worker`
and patch the live Supabase nav config.
