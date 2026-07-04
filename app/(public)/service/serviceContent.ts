// Config types + per-service content for the reusable ServicePage template.
// Each individual service page (drop-in yoga, reiki, prenatal, …) is just one
// ServiceConfig object rendered by <ServicePage>, so every page stays visually
// identical to the Teacher Training child pages and is trivial to edit here.

export type ServiceFaq = { q: string; a: string };
export type ServiceStep = { n: string; t: string; b: string };

export type ServiceConfig = {
  /** Booking id — the whole-page CTA links to /book?service=<slug>. */
  slug: string;
  /** Parent hub link shown in the hero breadcrumb. */
  breadcrumb: { href: string; label: string };
  eyebrow: string;            // e.g. "Drop-In · All Levels"
  heroTitleA: string;
  heroTitleEm: string;        // emphasised (accent) tail of the H1
  heroLead: string;
  heroMeta: string;           // "Daily · Kathmandu · From NPR 600"
  bookLabel: string;          // primary CTA label
  overviewHeading: string;
  overviewBody: string[];     // paragraphs
  forYou: string[];           // "who it's for" checklist
  included: string[];         // "what's included" checklist
  steps: ServiceStep[];       // exactly 3 "how it works" steps
  price?: string;             // optional headline price
  priceNote?: string;
  faqs: ServiceFaq[];         // 3–4
  siblingLinks: { href: string; label: string }[];
  accent: string;             // hex accent from the palette
};

// ── configs are appended per category in later tasks ───────────────────
