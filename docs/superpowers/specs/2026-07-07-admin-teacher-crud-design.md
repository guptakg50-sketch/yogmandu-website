# Admin Teacher Add / Delete — Design

**Date:** 2026-07-07
**Status:** Approved
**Scope:** Make adding and deleting teachers reliable and safe in the admin panel.

## Problem

The admin persists instructors with a **full-replace PUT**
(`saveRemote("instructors")` → `PUT /api/admin/instructors`), which upserts the
submitted list and **deletes every row not in it**. Consequences:

- **Add** only works if the full instructor list is perfectly loaded into admin
  state first; a partial load + save would wipe the missing teachers.
- **No hard delete** exists — only "Archive" (sets `status: "Archived"`, keeps the
  row). Clients cannot actually remove a teacher.

This is the data-safety hazard noted in project memory ("add via single-row
upsert, NOT admin PUT full-replace").

## Approach: per-row operations

Operate on one instructor row at a time; never submit the whole list.

### Backend — `app/api/admin/instructors/route.ts`

- `GET` — unchanged (returns `row.data` for each row).
- **`POST`** (new) — upsert **one** instructor by `id`. Uses the same row-shaping
  the current PUT applies per item: writes both the top-level columns
  (`id, name, photo, bio, specialties, certifications, years, status,
  display_order, updated_at`) **and** the `data` JSON blob, so the display source
  (`data`) and the queryable columns stay consistent. No delete step → other rows
  are never touched.
- **`DELETE`** (new) — remove exactly one row by `id` (read from `?id=` query).
- The full-replace `PUT` is retired for instructors (the admin stops calling it;
  other CMS modules are unchanged).
- All handlers keep the existing `requireAdminSession()` auth gate and
  `isSupabaseConfigured` guard.

### Frontend — `components/AdminPanel.jsx`

- **Save** (`InstructorEditor`) → `POST` that single teacher (add or edit), then
  update local state. Brand-new teachers persist correctly.
- **Archive** → `POST` with `status: "Archived"` (single upsert) — recoverable.
- **Delete** (new red button, with `confirm()`) → `DELETE /api/admin/instructors?id=…`,
  then remove from local state. Permanent.
- Remove `instructors` from the bulk full-replace `saveRemote` path so no code
  path can wipe the table.

## Data safety

Every operation is scoped to a single `id`. Adding a teacher cannot delete
another; deleting one cannot touch the rest. Matches the single-row-upsert rule.

## Verification

Dev admin end-to-end: add a test teacher (appears on `/about`), edit it, archive
it (hidden from `/about`), hard-delete it (row gone), and confirm the **other**
teachers remain intact through every step. Then `npm run deploy:worker` and spot
check production.

## Out of scope (YAGNI)

Drag-to-reorder, bulk import, photo cropping. Photo add stays as-is (upload or
paste URL).
