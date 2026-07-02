# Nested Services dropdown, clickable service boxes & direct Google Maps link

**Date:** 2026-07-02
**Status:** Approved

Three client-requested improvements, driven by two reference screenshots (a
competitor mega-menu, and the Yogmandu Teacher-Training pricing cards).

---

## 1 · Nested Services dropdown (category → services flyout)

Today `components/Nav.tsx` renders a flat list of 5 hand-picked links under
**Services**. The client wants a "dropdown inside the dropdown" that exposes
**all** services, grouped like the Services page.

### Data shape

Replace the flat `DEFAULT_CONFIG.services` array with a grouped structure
mirroring `app/(public)/services/ServicesGrid.tsx`:

```ts
serviceGroups: [
  { label: "Yoga Programs",       icon: "🧘", items: [ { label, href }, ... ] },
  { label: "Special Programs",    icon: "☸",  items: [ ... ] },
  { label: "Therapy & Wellness",  icon: "🌿", items: [ ... ] },
  { label: "For Specific Groups", icon: "🌱", items: [ ... ] },
  { label: "Workshops & Extras",  icon: "✦",  items: [ ... ] },
]
```

- Still fetched/overridable via `/api/admin/site-config` (`data.nav`). The fetch
  merge must tolerate **both** the old `services` shape and the new
  `serviceGroups` shape so a stale remote config can't break the nav — if
  `serviceGroups` is absent, fall back to the built-in default.

### Leaf destinations

- Services with a dedicated page link to it:
  - Teacher Training → `/yoga-teacher-training`
  - Sound Healing (sessions/cert) → `/sound-healing-therapy` (+ hash where used today)
  - Class Schedule → `/class-schedule`
  - Retreat → `/yoga-retreat-nepal`
  - Yoga for Beginners → `/yoga-for-beginners`
- Every other service → `/book?service=<id>` (the booking page already
  preselects by `?service=`). **Confirmed acceptable by client.**
- An **"All Services →"** link to `/services` stays pinned at the bottom of the
  category panel.

### Desktop behaviour

- Click **Services** → category panel opens (list of the 5 groups, each with a
  chevron/▸).
- Hover (or focus) a category → a **second-level flyout** slides out to the
  right listing that category's service leaves.
- Clicking outside closes everything (existing `mousedown` handler stays).
- Keyboard/focus accessible; flyout is reachable and dismissible.

### Mobile behaviour

- The existing hamburger panel gets an **accordion**: tapping a category expands
  its services inline (indented). No hover.

---

## 2 · Clickable service boxes

Client: "the services inside those boxes need to be clickable" / "all the lines
of text … clickable links to lead to the pages related, for all pages that have
boxes like these." Interpretation: the **whole box** for a program/service
becomes a link to its related page, so clicking anywhere on it (including the
text lines) navigates.

### Pattern — accessible stretched link

Do **not** nest `<a>` inside `<a>`. For each card:

1. Ensure the card root is `position: relative`.
2. Add a full-cover overlay `<Link href={dest} aria-label={title}>` styled
   `position:absolute; inset:0; z-index:1` (transparent).
3. Lift any genuinely interactive children (secondary buttons like WhatsApp /
   mailto / Google Form, carousel arrows) to `position:relative; z-index:2` so
   they remain independently clickable and keyboard-focusable.

### Destination rule

- Whole-box destination = the card's existing **internal** CTA target.
- If the card's only CTA is external (WhatsApp / mailto / Google Form), the box
  overlay points to `/book?service=<id>` (or the most relevant service page) and
  the external button stays clickable on top.

### Targets

- `app/(public)/page.tsx` — the 6-card service grid, the 3-focus strip.
- `components/ProgramsSection.tsx` — the carousel cards; the **active/front**
  card navigates via overlay. Side cards keep their existing "click to advance"
  behaviour. (Client greenlit including this section.)
- `app/(public)/yoga-teacher-training/PricingSection.tsx` — the 3 pricing cards
  (Commuter → `/book?service=…`, Full Board → `/book?service=…`, Online →
  `/book?service=virtual`); existing Apply/Get-Details buttons stay on top.
- `app/(public)/services/ServicesGrid.tsx` — each `ServiceCard`.
- **Audit + apply** the same to any equivalent box grids in
  `sound-healing-therapy`, `yoga-retreat-nepal`, `class-schedule`, `about`,
  `teachers`. No exclusions requested.

### Non-goals

- The 3-D tilt/hover effects on cards are preserved; the overlay must not swallow
  the `onMouseMove` tilt handlers (overlay is transparent and sits above content
  but the tilt handlers live on the card root, which still receives pointer
  events that bubble — verify tilt still fires; if the overlay blocks it, attach
  tilt to the root with the overlay as a child and rely on event bubbling, or set
  `pointer-events` so the root still tracks movement).

---

## 3 · Google Maps opens the exact pin

### Root cause

All four links query the **address only**
(`?q=31 Miteri Marg, Mid-Baneshwor-31, Kathmandu 44600, Nepal`). Google geocodes
that to a street and shows a chooser / generic pin instead of the Yogmandu
listing. Including the **business name** resolves to the single listing.

### Change

Create `lib/site.ts` as the single source of truth:

```ts
const MAP_QUERY = "Yogmandu, Miteri Marg, Mid-Baneshwor, Kathmandu";
export const MAP_LINK  = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
export const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
```

Replace the duplicated URLs in:
- `app/layout.tsx` (`hasMap`)
- `app/(public)/contact/ContactForm.tsx` (iframe `src` + "Get Directions" link)
- `components/Footer.tsx` (location link)

### Fallback

If the name-based query still isn't exact, the client can paste their Google
Maps **Share** link (`maps.app.goo.gl/…`) into the single `MAP_LINK` constant.

---

## Testing / verification

- Build passes (`next build` or existing lint/typecheck).
- Manual: desktop Services flyout opens category → sub-list; mobile accordion
  expands; every leaf navigates to the mapped destination.
- Manual: clicking anywhere on each target card navigates; secondary buttons
  still work; card tilt/hover still animates.
- Manual: all Map links/embed open the Yogmandu pin (not a chooser).
