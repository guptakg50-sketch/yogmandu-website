# Entry Popup — Design Spec

**Date:** 2026-06-07
**Status:** Approved (build)

## Goal
A site-wide promotional popup (e.g. an event poster) that shows **once per visitor per
campaign**, survives refreshes, is fully admin-controlled, responsive on mobile, and can
be killed instantly.

## Decisions (confirmed with client)
- **Duration = campaign end date.** Admin sets a start date + duration (presets: 3 days /
  1 week / 2 weeks / 1 month / custom). Popup auto-stops after `end_at`.
- **Re-show on change = yes.** Every admin save bumps a `version`; dismissal is keyed by
  version, so a new/updated campaign shows once again to everyone.
- **Content = image + optional link.** Poster image with a close (X); if a link URL is
  set, the whole image is clickable (opens in new tab). Blank = not clickable.
- **Once-per-visitor uses `localStorage`** (standard; per-browser/device).

## Storage — Supabase (NOT the fs siteConfigStore, which doesn't persist on Workers)
Table `yogmandu_popup`, singleton row `id = 'singleton'`:
| column | type | meaning |
|---|---|---|
| id | text pk | always `'singleton'` |
| enabled | bool | master on/off (emergency kill = false) |
| image_url | text | poster URL (Supabase media or manual) |
| image_alt | text | alt text |
| link_url | text | optional click-through (blank = none) |
| start_at | timestamptz | campaign start (nullable = no lower bound) |
| end_at | timestamptz | campaign end (nullable = no upper bound) |
| version | int | bumped every save; drives re-show |
| data | jsonb | bookkeeping |
| updated_at | timestamptz | |

**Active** ⇔ `enabled` AND `now ∈ [start_at, end_at]`.

## APIs
- `GET /api/popup` — public, `force-dynamic`. Returns `{ active, version, imageUrl,
  imageAlt, linkUrl }`; `{ active:false }` when disabled/out-of-window/unconfigured.
  Being a live Worker route, **emergency-disable applies on the next page load**.
- `GET/PUT /api/admin/popup` — admin auth. GET returns full config (or defaults). PUT
  sanitizes, computes nothing client-trusted blindly, and **bumps `version`**. Image
  reuses existing `/api/admin/media/upload` + media library — no new upload code.

## Public component — `components/EntryPopup.tsx` (client)
Mounted once in `app/(public)/layout.tsx`.
1. Fetch `/api/popup`. If `!active` → render nothing.
2. If `localStorage["yogmandu_popup_seen"] !== String(version)` → show.
3. Close via X button, backdrop click, or ESC → persist version to localStorage.
4. Centered modal, backdrop blur, `object-contain`, `max-h:85vh`, fluid width with
   `clamp()`; `role="dialog"`, focus the close button, respects
   `prefers-reduced-motion`. Optional `<a target="_blank" rel="noopener">` wrap.

## Admin — `PopupManager` (new top-level "Popup" section in AdminPanel.jsx)
Enable toggle · image (upload / choose from library / manual URL) · alt text · optional
link URL · start date · duration preset → computed "Active until <date>" · live status
badge (Active / Scheduled / Expired / Disabled) · prominent red **Emergency Remove
(Disable Now)** · note: "Saving shows the popup again to everyone who closed it."

## Out of scope (YAGNI)
Per-page targeting, multiple concurrent popups, scheduling queues, impression analytics,
A/B testing.
