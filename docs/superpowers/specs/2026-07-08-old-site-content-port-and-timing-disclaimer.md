# Old-site content port + "timings not fixed" disclaimer

Date: 2026-07-08
Status: Approved to build (client relay, "Yes, build it all")

## Context

The old Yogmandu WordPress site still lives on the cPanel box (reachable at
`https://69.10.54.26` with `Host: yogmandu.com`, or `?rest_route=/wp/v2/pages/<id>`
for REST; permalinks 404 over the raw IP). It holds richer real copy than the
new Next.js pages. The client wants that real content ported into the new site,
plus a site-wide notice that class/session times are not fixed.

Content was gathered to `scratchpad/oldsite/*.txt`. 300hr/500hr are sourced from a
different site (out of scope here).

## Rule: one service = one page

Each distinct service is its own standalone page under its section, reachable from
the section hub + hover dropdown (the Teacher Training pattern). Never merge a
service into a sibling page. If a gap is found, create the page AND add it to the
nav (`lib/siteConfigStore.ts` default + Supabase `yogmandu_site_config`).
Audit result: the new nav is already a superset of old-site services — no missing
pages expected, but build one if a genuine gap appears.

## A. Timing disclaimer (site-wide)

New reusable component `components/TimingNotice.tsx`. Copy:

> ⚠️ Please note: Class and session times are not fixed and may change with the
> season, teacher availability and demand. Please confirm your preferred time
> with us on WhatsApp before visiting. → [Confirm on WhatsApp] wa.me/9779810263277

Placement:
- `/class-schedule` — prominent, below the level legend / above the grid.
- YTT pages (commuter, residential, online) — lighter inline note near hours.
- `/sound-healing-therapy/sessions` — near session info.

Canonical WhatsApp: `9779810263277`.

## B. Teacher-training pages (reuse Residential's card patterns)

Source curriculum groups (from old Course Content): Techniques & Practice /
Teaching Methodology / Anatomy & Physiology / Philosophy & Ethics.

- **Commuter** (`/yoga-teacher-training/commuter`) — currently thin. Add:
  Course Content (4 curriculum cards), Eligibility (18+, communication,
  prior-experience optional), Certification, Evaluation list, Graduation Ceremony
  (certificate, 108 Sun Salutations optional, Fire Ceremony optional), and the
  "found unfit → discontinue without refund" note.
- **Online** (`/yoga-teacher-training/online`) — same set; differences: 16+,
  digital textbook & resources, no residential inclusions.
- **Residential** (`/yoga-teacher-training/residential`) — already has curriculum +
  graduation + cancellation. ADD only: Eligibility, Evaluation, and
  Included/Excluded (3 organic veg meals/vegan on request, unlimited herbal teas,
  shared accommodation, shatkarma kit, 2 Ayurvedic massages, textbook+notebook,
  Yoga Alliance cert, 13% VAT + 10% service; excludes airfare/transfers, outing
  expenses, travel & medical insurance, laundry). Do not disturb curated sections.

## C. Sound healing

- `/sound-healing-therapy` (landing) — add "Transform your life with the healing
  power of sound…" intro + booking CTA.
- `/sound-healing-therapy/course-level-1` — intro + "What You'll Learn" (Sound &
  Music, Nada Yoga, Singing Bowls, Auras, Chakras, Aura Cleansing) + pricing
  Rs 30,000 / $350.
- `/sound-healing-therapy/course-level-2` — advanced intro + pricing Rs 55,000 / $600.

## D. About (`/about`)

Add Mission statement + "Why Yogmandu?" bullets (Baneshwor location, certified
teachers, Dr. Chintamani Gautam credentials, Yoga Alliance affiliations, styles
offered, private/corporate/virtual sessions).

## E. No old-site source (leave untouched)

YTT hub, retreat packages, testimonials, book-a-class, contact (Elementor/empty);
300/500hr, specialized-yoga, therapy-wellness, retreat sub-pages, class-schedule
variants (never existed on old site).

## Verify

Typecheck/build, run dev server, visually confirm each edited page renders and is
not broken, then show the user before pushing (do NOT push until approved).
