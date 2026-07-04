# Service Category Hubs & Service Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every nav category behave exactly like Teacher Training — category click opens a 3D-card hub of all its services; each card / flyout item opens its own full page.

**Architecture:** Two reusable pieces feed all pages: `ServiceHub` (reuses the existing `PricingCard` 3D tilt card over an array of `Tier`) for the hub grids, and `ServicePage` (a data-driven template cloned from `CourseProgram`) for the child pages. Existing category pages gain a `ServiceHub` section; two categories that shared `/services` get new top-level hub pages. Content is per-page config objects.

**Tech Stack:** Next.js 16 App Router (RSC), TypeScript, Tailw-style inline styles, Supabase (`yogmandu_site_config`), Cloudflare Workers via OpenNext.

## Global Constraints

- Next.js is a modified build — consult `node_modules/next/dist/docs/` before using any unfamiliar API. (AGENTS.md)
- No competitor content, competitor location/contact, or false claims (e.g. "first Yoga Alliance school in Nepal"). Yogmandu branding only.
- Contact constants: WhatsApp `https://wa.me/9779810263277`, phone `+977-9810263277`, email `info@yogmandu.com`. Booking CTA uses the existing `/book?service=<id>` flow.
- Palette: purple `#6B2D8B`, orange `#F7941D`, green `#8DC63F`/`#4A6418`, ink `#2A1208`, heading font `Cormorant Garamond, serif`.
- Never run Yogmandu DDL/writes via the Supabase MCP (it points at a different project). Live `yogmandu_site_config` is patched via a throwaway Node script reading `.env.local`, then deleted.
- Verification per task = `npm run build` succeeds AND the new/changed route renders in `npm run dev`. There is no unit-test harness; do not invent one.
- Reuse existing components verbatim (`PricingCard`, `Tier`, `CourseProgram` patterns). Do not fork/duplicate their styles.
- Work on branch `feat/service-category-hubs`. Commit after each task. Deploy (`npm run deploy:worker`) + Supabase config patch happen only in the final wiring task.

---

## File structure

```
app/(public)/service/
  ServicePage.tsx          # reusable rich child-page template (clone of CourseProgram)
  ServiceHub.tsx           # reusable hub section: hero + stats + PricingCard grid
  serviceContent.ts        # ServiceConfig type + all 16 child-page configs
  hubContent.ts            # HubConfig type + the 5 hub definitions (Tier[] per category)
app/(public)/class-schedule/
  page.tsx                 # + <ServiceHub> section (Yoga Classes)
  drop-in/page.tsx         # new
  virtual/page.tsx         # new
  private/page.tsx         # new
  home/page.tsx            # new
app/(public)/sound-healing-therapy/
  page.tsx                 # + <ServiceHub> section
  sessions/page.tsx        # new
  certification/page.tsx   # new
app/(public)/yoga-retreat-nepal/
  page.tsx                 # + <ServiceHub> section
  weight-loss-bootcamp/page.tsx
  corporate-yoga/page.tsx
  yoga-trekking/page.tsx
app/(public)/therapy-wellness/
  page.tsx                 # new hub
  yoga-therapy/page.tsx
  reiki-healing/page.tsx
  diet-consultation/page.tsx
app/(public)/specialized-yoga/
  page.tsx                 # new hub
  prenatal/page.tsx
  childrens-yoga/page.tsx
  senior-yoga/page.tsx
  school-yoga/page.tsx
components/Nav.tsx          # DEFAULT_CONFIG hrefs
lib/siteConfigStore.ts      # defaultNavConfig hrefs
app/sitemap.ts              # + 18 routes
```

Each child `page.tsx` is ~6 lines: import `ServicePage` + its config, export `metadata`, render `<ServicePage config={...} />`. All heavy layout lives in the two reusable components; all content lives in `serviceContent.ts` / `hubContent.ts`.

---

## Task 1: `ServicePage` reusable template

**Files:**
- Create: `app/(public)/service/ServicePage.tsx`
- Create: `app/(public)/service/serviceContent.ts` (type only, in this task)

**Interfaces:**
- Produces: `ServiceConfig` type and `export default function ServicePage({ config }: { config: ServiceConfig })`.

`ServiceConfig` (author exact fields; mirrors `CourseProgram`'s config but for a single service):

```ts
export type ServiceFaq = { q: string; a: string };
export type ServiceStep = { n: string; t: string; b: string };
export type ServiceConfig = {
  slug: string;              // used for booking: /book?service=<slug>
  breadcrumb: { href: string; label: string }; // parent hub link
  eyebrow: string;           // e.g. "Drop-In · All Levels"
  heroTitleA: string;
  heroTitleEm: string;       // emphasised (purple) tail of the H1
  heroLead: string;
  heroMeta: string;          // "Daily · Kathmandu · From NPR 600"
  bookLabel: string;         // primary CTA label
  overviewHeading: string;
  overviewBody: string[];    // paragraphs
  forYou: string[];          // "who it's for" checklist
  included: string[];        // "what's included" checklist
  steps: ServiceStep[];      // exactly 3 "how it works" steps
  price?: string;            // optional headline price; when absent → "contact for pricing" CTA card
  priceNote?: string;
  faqs: ServiceFaq[];        // 3-4
  siblingLinks: { href: string; label: string }[];
  accent: string;            // hex accent, one of the palette
};
```

- [ ] **Step 1: Create the type file** — write `serviceContent.ts` with only the types above (configs added in later tasks).

- [ ] **Step 2: Build `ServicePage.tsx`** — clone the section rhythm of `app/(public)/yoga-teacher-training/CourseProgram.tsx` (hero with logo + breadcrumb + WhatsApp/Book CTAs → overview → "who it's for" + "what's included" cards → 3-step "how it works" → price/booking CTA (price card when `config.price`, else the WhatsApp "get pricing" card) → FAQ (`<details>` accordion, same markup) → "also explore" sibling chips + contact line). Reuse `SectionHeading`/`CheckList` helpers (copy them in, or extract to a shared file if cleaner). Primary book CTA is `<Link href={"/book?service=" + config.slug}>`.

- [ ] **Step 3: Temporary smoke render** — add a throwaway `app/(public)/service/_preview/page.tsx` that renders `<ServicePage config={demo} />` with an inline demo config, run `npm run dev`, confirm `/service/_preview` renders with all sections, then delete `_preview`.

- [ ] **Step 4: Build** — `npm run build`. Expected: success, no type errors.

- [ ] **Step 5: Commit** — `git add app/(public)/service && git commit -m "feat(service): reusable ServicePage template"`.

---

## Task 2: `ServiceHub` reusable hub section + `HubConfig`

**Files:**
- Create: `app/(public)/service/ServiceHub.tsx`
- Create: `app/(public)/service/hubContent.ts`

**Interfaces:**
- Consumes: `PricingCard` and `Tier` from `app/(public)/yoga-teacher-training/PricingSection.tsx` / `pricingTiers.ts`.
- Produces: `HubConfig` type; `export function ServiceHub({ eyebrow, title, subtitle, tiers }: HubConfig)`; and named hub exports `YOGA_CLASSES_HUB`, `SOUND_HEALING_HUB`, `RETREATS_HUB`, `THERAPY_WELLNESS_HUB`, `SPECIALIZED_HUB` (each `HubConfig`).

```ts
import type { Tier } from "../yoga-teacher-training/pricingTiers";
export type HubConfig = { eyebrow: string; title: string; subtitle: string; tiers: Tier[] };
```

- [ ] **Step 1: Build `ServiceHub.tsx`** — a `<section>` copying the "All Teacher Training programs — hub grid" block from `app/(public)/yoga-teacher-training/page.tsx:262-279`: centered header (eyebrow/title/subtitle + `section-divider`), then `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-6 pt-8" style={{ perspective: "1500px" }}>` mapping `tiers` to `<PricingCard key={t.id} tier={t} />`. Import `PricingCard`.

- [ ] **Step 2: Write `hubContent.ts`** — define the 5 hub `Tier[]` arrays. Each `Tier` follows the shape in `pricingTiers.ts` (id, badge, badgeColor, category, title, icon, price, priceSub, priceNote, color, features[3], ctaLabel `"View program"`, ctaHref = the service page, cardHref = the service page). Cards per hub:
  - `YOGA_CLASSES_HUB`: Yoga for Beginners → `/yoga-for-beginners`; Drop-In → `/class-schedule/drop-in`; Virtual Live → `/class-schedule/virtual`; Private → `/class-schedule/private`; At Home → `/class-schedule/home`.
  - `SOUND_HEALING_HUB`: Sessions → `/sound-healing-therapy/sessions`; Certification → `/sound-healing-therapy/certification`.
  - `RETREATS_HUB`: Yoga Retreat → `/yoga-retreat-nepal`; Weight-Loss Bootcamp → `/yoga-retreat-nepal/weight-loss-bootcamp`; Corporate → `/yoga-retreat-nepal/corporate-yoga`; Trekking → `/yoga-retreat-nepal/yoga-trekking`.
  - `THERAPY_WELLNESS_HUB`: Yoga Therapy → `/therapy-wellness/yoga-therapy`; Reiki → `/therapy-wellness/reiki-healing`; Diet → `/therapy-wellness/diet-consultation`.
  - `SPECIALIZED_HUB`: Prenatal → `/specialized-yoga/prenatal`; Children's → `/specialized-yoga/childrens-yoga`; Senior → `/specialized-yoga/senior-yoga`; School → `/specialized-yoga/school-yoga`.

- [ ] **Step 3: Build** — `npm run build`. Expected: success.

- [ ] **Step 4: Commit** — `git commit -am "feat(service): reusable ServiceHub + hub definitions"`.

---

## Task 3: Yoga Classes — hub grid + 4 child pages (first full vertical)

This is the reference vertical: build it end-to-end, confirm the look, then Tasks 4–7 replicate.

**Files:**
- Modify: `app/(public)/class-schedule/page.tsx` — insert `<ServiceHub {...YOGA_CLASSES_HUB} />` after the existing intro/hero, before the schedule table.
- Create: `app/(public)/class-schedule/{drop-in,virtual,private,home}/page.tsx`
- Modify: `app/(public)/service/serviceContent.ts` — add configs `DROP_IN`, `VIRTUAL_YOGA`, `PRIVATE_YOGA`, `YOGA_AT_HOME`.

- [ ] **Step 1: Author the 4 configs** in `serviceContent.ts` — full `ServiceConfig` each, real Yogmandu copy. Slugs: `drop-in`, `virtual`, `private`, `home` (match existing `/book?service=` ids). Breadcrumb `{ href: "/class-schedule", label: "Yoga Classes" }`. `siblingLinks` = the other three + Class Schedule.

- [ ] **Step 2: Create the 4 page files** — each:

```tsx
import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { DROP_IN } from "../../service/serviceContent";
export const metadata: Metadata = { title: { absolute: "Drop-In Yoga Classes in Kathmandu | Yogmandu" }, description: "…", alternates: { canonical: "https://yogmandu.com/class-schedule/drop-in" } };
export default function Page() { return <ServicePage config={DROP_IN} />; }
```

- [ ] **Step 3: Add the hub grid** to `class-schedule/page.tsx` — import `ServiceHub` + `YOGA_CLASSES_HUB`, render `<ServiceHub {...YOGA_CLASSES_HUB} />` in the appropriate slot.

- [ ] **Step 4: Build + render** — `npm run build`; `npm run dev`; verify `/class-schedule` shows the 3D card hub and each of `/class-schedule/{drop-in,virtual,private,home}` renders fully and its Book CTA points to `/book?service=<slug>`.

- [ ] **Step 5: Commit** — `git commit -am "feat(yoga-classes): hub grid + drop-in/virtual/private/home pages"`.

**⟢ Checkpoint:** stop for user review of the exact look before replicating.

---

## Task 4: Sound Healing — hub grid + 2 child pages

**Files:**
- Modify: `app/(public)/sound-healing-therapy/page.tsx` — add `<ServiceHub {...SOUND_HEALING_HUB} />`.
- Create: `app/(public)/sound-healing-therapy/{sessions,certification}/page.tsx`
- Modify: `serviceContent.ts` — add `SOUND_SESSIONS`, `SOUND_CERTIFICATION`.

- [ ] **Step 1:** Author 2 configs (slugs `sound-session`, `sound-cert` — pick ids consistent with the booking form; if none exist use these and they flow to `/book?service=…`). Breadcrumb `{ href: "/sound-healing-therapy", label: "Sound Healing" }`.
- [ ] **Step 2:** Create the 2 page files (pattern from Task 3 Step 2).
- [ ] **Step 3:** Insert the hub grid into `sound-healing-therapy/page.tsx`.
- [ ] **Step 4:** Build + render `/sound-healing-therapy` and both children.
- [ ] **Step 5:** Commit `git commit -am "feat(sound-healing): hub grid + sessions/certification pages"`.

---

## Task 5: Retreats & Special — hub grid + 3 child pages

**Files:**
- Modify: `app/(public)/yoga-retreat-nepal/page.tsx` — add `<ServiceHub {...RETREATS_HUB} />`.
- Create: `app/(public)/yoga-retreat-nepal/{weight-loss-bootcamp,corporate-yoga,yoga-trekking}/page.tsx`
- Modify: `serviceContent.ts` — add `WEIGHT_LOSS_BOOTCAMP`, `CORPORATE_YOGA`, `YOGA_TREKKING`.

- [ ] **Step 1:** Author 3 configs (slugs `bootcamp`, `corporate`, `trekking`). Breadcrumb `{ href: "/yoga-retreat-nepal", label: "Retreats & Special" }`.
- [ ] **Step 2:** Create the 3 page files.
- [ ] **Step 3:** Insert the hub grid.
- [ ] **Step 4:** Build + render all four.
- [ ] **Step 5:** Commit `git commit -am "feat(retreats): hub grid + bootcamp/corporate/trekking pages"`.

---

## Task 6: Therapy & Wellness — new hub page + 3 child pages

**Files:**
- Create: `app/(public)/therapy-wellness/page.tsx` (new hub)
- Create: `app/(public)/therapy-wellness/{yoga-therapy,reiki-healing,diet-consultation}/page.tsx`
- Modify: `serviceContent.ts` — add `YOGA_THERAPY`, `REIKI_HEALING`, `DIET_CONSULTATION`.

- [ ] **Step 1:** Author 3 configs (slugs `therapy`, `reiki`, `diet`). Breadcrumb `{ href: "/therapy-wellness", label: "Therapy & Wellness" }`.
- [ ] **Step 2: Build the new hub page** — compose like the Teacher Training hub: hero (logo, eyebrow, H1, lead, CTAs) + optional stats strip + `<ServiceHub {...THERAPY_WELLNESS_HUB} />` + closing CTA. Export `metadata` with canonical `https://yogmandu.com/therapy-wellness` and a `BreadcrumbList` JSON-LD.
- [ ] **Step 3:** Create the 3 child page files.
- [ ] **Step 4:** Build + render `/therapy-wellness` and children.
- [ ] **Step 5:** Commit `git commit -am "feat(therapy-wellness): hub + yoga-therapy/reiki/diet pages"`.

---

## Task 7: For Specific Groups — new hub page + 4 child pages

**Files:**
- Create: `app/(public)/specialized-yoga/page.tsx` (new hub)
- Create: `app/(public)/specialized-yoga/{prenatal,childrens-yoga,senior-yoga,school-yoga}/page.tsx`
- Modify: `serviceContent.ts` — add `PRENATAL`, `CHILDRENS_YOGA`, `SENIOR_YOGA`, `SCHOOL_YOGA`.

- [ ] **Step 1:** Author 4 configs (slugs `prenatal`, `children`, `seniors`, `school`). Breadcrumb `{ href: "/specialized-yoga", label: "For Specific Groups" }`.
- [ ] **Step 2:** Build the new hub page (same structure as Task 6 Step 2; canonical `https://yogmandu.com/specialized-yoga`).
- [ ] **Step 3:** Create the 4 child page files.
- [ ] **Step 4:** Build + render `/specialized-yoga` and children.
- [ ] **Step 5:** Commit `git commit -am "feat(specialized-yoga): hub + prenatal/children/senior/school pages"`.

---

## Task 8: Nav + sitemap wiring

**Files:**
- Modify: `components/Nav.tsx` (`DEFAULT_CONFIG.serviceGroups`)
- Modify: `lib/siteConfigStore.ts` (`defaultNavConfig.serviceGroups`)
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Update category hrefs + item hrefs** in BOTH `Nav.tsx` and `siteConfigStore.ts` (keep them identical):
  - Therapy & Wellness `href` → `/therapy-wellness`; items → `/therapy-wellness/yoga-therapy`, `/therapy-wellness/reiki-healing`, `/therapy-wellness/diet-consultation`.
  - For Specific Groups `href` → `/specialized-yoga`; items → `/specialized-yoga/prenatal`, `/specialized-yoga/childrens-yoga`, `/specialized-yoga/senior-yoga`, `/specialized-yoga/school-yoga`.
  - Yoga Classes items: Drop-In → `/class-schedule/drop-in`, Virtual → `/class-schedule/virtual`, Private → `/class-schedule/private`, At Home → `/class-schedule/home` (Class Schedule + Beginners unchanged).
  - Sound Healing items: Sessions → `/sound-healing-therapy/sessions`, Certification → `/sound-healing-therapy/certification`.
  - Retreats items: Bootcamp → `/yoga-retreat-nepal/weight-loss-bootcamp`, Corporate → `/yoga-retreat-nepal/corporate-yoga`, Trekking → `/yoga-retreat-nepal/yoga-trekking`.

- [ ] **Step 2: Add the 18 new routes to `app/sitemap.ts`** `staticRoutes` with `mtime(...)` lastModified and priority ~0.8 (hubs) / 0.7 (children), matching the existing formatting.

- [ ] **Step 3: Build + render** — `npm run build`; in dev, click each category (desktop flyout + mobile accordion) and confirm it lands on the hub and each item opens its own page.

- [ ] **Step 4: Commit** — `git commit -am "feat(nav): point categories at new hubs + service pages; sitemap"`.

---

## Task 9: Deploy + live Supabase config patch

**Files:** none (ops)

- [ ] **Step 1:** Merge/rebase `feat/service-category-hubs` per repo convention (fast-forward into `master` locally; do NOT push unless the user asks).
- [ ] **Step 2: Patch live nav config** — write a throwaway `_tmp_navupdate.mjs` in the project root that reads `.env.local` for `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY`, fetches the `yogmandu_site_config` singleton, replaces `data.nav.serviceGroups` with the new hrefs (identical to Task 8), upserts it, then delete the script. Do NOT use the Supabase MCP.
- [ ] **Step 3: Deploy** — `npm run deploy:worker` (ignore error 100117 custom_domain step).
- [ ] **Step 4: Verify prod** — load `https://yogmandu.com`, click 2–3 categories, confirm hubs + a child page render live.

---

## Self-Review

**Spec coverage:** hubs for all 5 categories (Tasks 3–7) ✓; 16 child pages (Tasks 3–7) ✓; reuse of exact TT components (Tasks 1–2) ✓; top-level slugs for the two `/services` categories (Tasks 6–7) ✓; rich template depth (Task 1) ✓; nav + live Supabase + sitemap wiring (Tasks 8–9) ✓; no competitor content / Yogmandu branding (Global Constraints) ✓.

**Placeholders:** page-file code shown; config *content* is authored during execution against the fixed `ServiceConfig` type (content, not placeholder logic). Slugs and hrefs are exact.

**Type consistency:** `ServiceConfig`/`ServicePage` (Task 1), `HubConfig`/`ServiceHub` + named hub exports (Task 2), `Tier`/`PricingCard` reused verbatim; hub export names match their use in Tasks 3–8.
