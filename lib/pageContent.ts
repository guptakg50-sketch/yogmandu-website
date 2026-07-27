import { cache } from "react";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import { SERVICE_CONFIGS, type ServiceConfig, type ServiceConfigKey } from "@/app/(public)/service/serviceContent";
import { HUB_CONFIGS, type HubConfig, type HubConfigKey } from "@/app/(public)/service/hubContent";
import { TIER_SETS, type TierSet, type TierSetKey } from "@/app/(public)/yoga-teacher-training/pricingTiers";
import { CURRICULA, type Curriculum, type CurriculumKey } from "@/app/(public)/yoga-teacher-training/curriculumContent";

// Editable page content, stored as extra rows in yogmandu_site_config
// (id = "content:<key>", data = the override object). Every document has a
// code default below or in serviceContent/hubContent/pricingTiers — the DB row
// is merged over it, so pages always render even with an empty/unreachable DB
// and newly added code fields still appear until the admin saves again.

const ROW_PREFIX = "content:";

// ── Bespoke section defaults ──────────────────────────────────────────────────

export const INSIDE_STUDIO_DEFAULT = {
  eyebrow: "Inside the Studio",
  title: "Real classes,",
  titleEm: "every day",
  body: "This is what a regular morning looks like at Yogmandu — a full room of students of all ages and levels practising together in our Mid-Baneshwor studio. Whether it's your first class or your five-hundredth, roll out a mat and join us.",
  image: "/images/schedule/group-class.webp",
  imageAlt: "A morning group yoga class at the Yogmandu studio in Mid-Baneshwor, Kathmandu",
  primaryLabel: "Book a Class",
  primaryHref: "/book",
  secondaryLabel: "WhatsApp Us",
  secondaryHref: "https://wa.me/9779810263277",
};

export const HOME_HERO_PHOTO_DEFAULT = {
  image: "/images/home/hero-class.webp",
  imageAlt: "A full morning group yoga class in lunge pose at the Yogmandu studio in Mid-Baneshwor, Kathmandu",
};

export const CLASSES_WE_OFFER_DEFAULT = {
  image: "/images/schedule/classes-we-offer.webp",
  imageAlt: "Yoga classes we offer at Yogmandu — Power Yoga for strength and stamina, Flexibility Yoga for mobility, Hatha Yoga for balance of body, breath and mind, Vinyasa Flow for dynamic strength and discipline, Asana & Meditation for mindfulness, and Pranayama & Suryanamaskar for breath control and energising sun salutations",
};

// Optional image bands. Every section built as "small eyebrow line + heading"
// has one of these slots directly under the heading; leaving the image blank
// hides the band entirely, so the client can add a picture to any of them
// without a code change. Images keep their own aspect ratio and scale down on
// small screens, so any size can be uploaded.
export const SECTION_IMAGES_DEFAULT = {
  slots: [
    { id: "home-programs",    label: "Homepage — Our Programs",              image: "", alt: "" },
    { id: "ytt-programs",     label: "Teacher Training — All pathways",      image: "", alt: "" },
    { id: "ytt-curriculum",   label: "Teacher Training — Curriculum",        image: "", alt: "" },
    { id: "ytt-dates",        label: "Teacher Training — Intake months",     image: "", alt: "" },
    { id: "hub-YOGA_CLASSES", label: "Class Schedule — Ways to practise",    image: "", alt: "" },
    { id: "hub-SOUND_HEALING", label: "Sound Healing — hub cards",           image: "", alt: "" },
    { id: "hub-RETREATS",     label: "Retreats — hub cards",                 image: "", alt: "" },
    { id: "hub-THERAPY_WELLNESS", label: "Therapy & Wellness — hub cards",   image: "", alt: "" },
    { id: "hub-SPECIALIZED",  label: "Specific Groups — hub cards",          image: "", alt: "" },
    { id: "about-team",       label: "About — Meet the team",                image: "", alt: "" },
  ],
};

// The six quick-link cards under the homepage hero. `icon` is an icon name from
// components/CardIcon (an emoji still works — it renders as-is).
export const HOME_QUICK_LINKS_DEFAULT = {
  cards: [
    {
      href: "/class-schedule", accent: "#6B2D8B", textAccent: "#6B2D8B", icon: "calendar",
      title: "Class Schedule",
      desc: "Browse our weekly yoga timetable — morning flows, evening restorative sessions, pranayama and more.",
      cta: "View Schedule",
    },
    {
      href: "/yoga-teacher-training", accent: "#F7941D", textAccent: "#A65808", icon: "lotus",
      title: "Yoga Teacher Training",
      desc: "Yoga Alliance RYS 200, 300 & 500 certified programs in the heart of Kathmandu, Nepal.",
      cta: "View Programs",
    },
    {
      href: "/book?service=sound", accent: "#8DC63F", textAccent: "#4A6418", icon: "bowl",
      title: "Sound Healing",
      desc: "Authentic Tibetan singing bowl therapy — individual sessions, group healing and full certification courses.",
      cta: "Book a Session",
    },
    {
      href: "/services", accent: "#6B2D8B", textAccent: "#6B2D8B", icon: "sparkle",
      title: "All Services",
      desc: "Retreats, corporate yoga, weight-loss bootcamp, therapy, diet consultation, Reiki, prenatal & more — the full range.",
      cta: "Explore Services",
    },
    {
      href: "/about", accent: "#F7941D", textAccent: "#A65808", icon: "sunrise",
      title: "Our Story",
      desc: "Founded in 2018 by the teams of experts in the yoga and wellness industry. Led by Yogi Arjun Rakhal (ERYT 500, YACEP) and Dr. Chintamani Gautam (PhD Yogic Science, ERYT 500). Nepal's first Yoga Alliance registered school.",
      cta: "Meet the Team",
    },
    {
      href: "/gallery", accent: "#8DC63F", textAccent: "#4A6418", icon: "camera",
      title: "Studio & Students",
      desc: "Photos from classes, sound baths, retreats, and 200hr graduates from 50+ countries — see what awaits you in Kathmandu.",
      cta: "View Gallery",
    },
  ],
};

// The category list behind the "Type" dropdown on every session. Stored here so
// the client can add or remove categories without a code change; sessions keep
// whatever type string they were saved with.
export const SESSION_TYPES_DEFAULT = {
  types: ["Class", "Workshop", "Retreat", "Drop-in", "Online"],
};

export const YTT_GRADUATION_DEFAULT = {
  heading: "Graduation",
  body: "All graduates receive an internationally recognised Yoga Alliance RYT 200 certificate and can register as Registered Yoga Teachers.",
  bullets: [
    "Certificate presentation ceremony",
    "108 Sun Salutations (optional)",
    "Traditional Fire Ceremony (Hawan)",
  ],
  image: "/images/ytt/graduation.webp",
  imageAlt: "Yogmandu teacher training graduates holding their certificates, wearing marigold garlands at the graduation ceremony in Kathmandu",
};

export const YTT_CANCELLATION_DEFAULT = {
  heading: "Cancellation Policy",
  rows: [
    { when: "Week 1 cancellation", refund: "50% refund" },
    { when: "Week 2 cancellation", refund: "40% refund" },
    { when: "Week 3 cancellation", refund: "25% refund" },
    { when: "Week 4+ cancellation", refund: "No refund" },
  ],
  note: "USD 200 deposit is non-refundable but transferable within the same year.",
  noteResidential: "A USD 200 deposit reserves your place; the remaining USD 1,200 is due on arrival. If Yogmandu cancels your reservation you are refunded in full, and in the event of illness or government restrictions you may reschedule to a later course.",
};

export const YTT_PLEASE_NOTE_DEFAULT = {
  title: "Please note",
  body: "If, for any reason, a participant is found unfit to complete the course, Yogmandu reserves the right to discontinue their course without a refund. In some unavoidable situations, we may allow participants to complete the course in the near future at no additional charge.",
};

export const SOUND_IN_SESSION_DEFAULT = {
  eyebrow: "In Session",
  title: "The sound bath",
  titleEm: "experience",
  body: "A group sound bath at our Mid-Baneshwor studio — students rest under warm blankets while traditional Tibetan bowls, bells and mallets carry them into deep relaxation.",
  photos: [
    { src: "/images/sound/sound-bath.webp", alt: "Students resting under maroon blankets during a group sound bath session at the Yogmandu studio in Kathmandu" },
    { src: "/images/sound/sound-tools.webp", alt: "Traditional Tibetan bell and felt-tipped singing bowl mallets resting on a cushion before a sound healing session" },
  ],
};

export const TIMING_NOTICE_DEFAULT = {
  lead: "Please note:",
  body: "class and session times are not fixed and may change with the season, teacher availability and demand. Please confirm your preferred time with us on WhatsApp before visiting.",
  ctaLabel: "Confirm on WhatsApp",
  ctaHref: "https://wa.me/9779810263277",
};

const SECTION_DEFAULTS = {
  INSIDE_STUDIO:    INSIDE_STUDIO_DEFAULT,
  HOME_HERO_PHOTO:  HOME_HERO_PHOTO_DEFAULT,
  CLASSES_WE_OFFER: CLASSES_WE_OFFER_DEFAULT,
  HOME_QUICK_LINKS: HOME_QUICK_LINKS_DEFAULT,
  SECTION_IMAGES:   SECTION_IMAGES_DEFAULT,
  SESSION_TYPES:    SESSION_TYPES_DEFAULT,
  YTT_GRADUATION:   YTT_GRADUATION_DEFAULT,
  YTT_CANCELLATION: YTT_CANCELLATION_DEFAULT,
  YTT_PLEASE_NOTE:  YTT_PLEASE_NOTE_DEFAULT,
  SOUND_IN_SESSION: SOUND_IN_SESSION_DEFAULT,
  TIMING_NOTICE:    TIMING_NOTICE_DEFAULT,
} as const;

export type SectionKey = keyof typeof SECTION_DEFAULTS;

// ── Registry (drives the admin "Page Content" editor) ────────────────────────

// Field schemas let the admin render a form for each bespoke section without
// hardcoding shapes client-side. types: text | textarea | image | lines |
// pairs (when/refund rows) | photos (src+alt list).
type FieldDef = { name: string; label: string; type: "text" | "textarea" | "image" | "lines" | "pairs" | "photos" | "cards" | "slots" };

const SECTION_META: Record<SectionKey, { label: string; page: string; fields: FieldDef[] }> = {
  INSIDE_STUDIO: {
    label: "Inside the Studio (photo + intro)",
    page: "/class-schedule",
    fields: [
      { name: "eyebrow", label: "Eyebrow (small caps line)", type: "text" },
      { name: "title", label: "Heading", type: "text" },
      { name: "titleEm", label: "Heading — accented tail", type: "text" },
      { name: "body", label: "Paragraph", type: "textarea" },
      { name: "image", label: "Photo", type: "image" },
      { name: "imageAlt", label: "Photo alt text (SEO)", type: "text" },
      { name: "primaryLabel", label: "Primary button label", type: "text" },
      { name: "primaryHref", label: "Primary button link", type: "text" },
      { name: "secondaryLabel", label: "Secondary button label", type: "text" },
      { name: "secondaryHref", label: "Secondary button link", type: "text" },
    ],
  },
  HOME_HERO_PHOTO: {
    label: "Homepage hero photo",
    page: "/ (homepage)",
    fields: [
      { name: "image", label: "Photo", type: "image" },
      { name: "imageAlt", label: "Photo alt text (SEO)", type: "text" },
    ],
  },
  CLASSES_WE_OFFER: {
    label: "“Yoga Classes We Offer” graphic",
    page: "/class-schedule",
    fields: [
      { name: "image", label: "Graphic", type: "image" },
      { name: "imageAlt", label: "Graphic alt text (SEO)", type: "textarea" },
    ],
  },
  SECTION_IMAGES: {
    label: "Section images (optional picture under a heading)",
    page: "every “eyebrow + heading” section across the site",
    fields: [
      { name: "slots", label: "Image slots", type: "slots" },
    ],
  },
  HOME_QUICK_LINKS: {
    label: "Homepage quick-link cards (icons + text)",
    page: "/ (homepage)",
    fields: [
      { name: "cards", label: "Cards", type: "cards" },
    ],
  },
  SESSION_TYPES: {
    label: "Session type list (Class, Workshop, …)",
    page: "Admin → Sessions (the Type dropdown & filter)",
    fields: [
      { name: "types", label: "Session types (one per line)", type: "lines" },
    ],
  },
  YTT_GRADUATION: {
    label: "Graduation (photo + text)",
    page: "/yoga-teacher-training",
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "body", label: "Paragraph", type: "textarea" },
      { name: "bullets", label: "Bullet points (one per line)", type: "lines" },
      { name: "image", label: "Photo", type: "image" },
      { name: "imageAlt", label: "Photo alt text (SEO)", type: "text" },
    ],
  },
  YTT_CANCELLATION: {
    label: "Cancellation Policy table",
    page: "/yoga-teacher-training + /yoga-teacher-training/residential",
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "rows", label: "Refund rows", type: "pairs" },
      { name: "note", label: "Note under the table (Teacher Training hub)", type: "textarea" },
      { name: "noteResidential", label: "Note under the table (Residential page)", type: "textarea" },
    ],
  },
  YTT_PLEASE_NOTE: {
    label: "“Please note” disclaimer card",
    page: "/yoga-teacher-training/commuter + /online",
    fields: [
      { name: "title", label: "Title", type: "text" },
      { name: "body", label: "Disclaimer text", type: "textarea" },
    ],
  },
  SOUND_IN_SESSION: {
    label: "In Session (sound bath photos)",
    page: "/sound-healing-therapy",
    fields: [
      { name: "eyebrow", label: "Eyebrow (small caps line)", type: "text" },
      { name: "title", label: "Heading", type: "text" },
      { name: "titleEm", label: "Heading — accented tail", type: "text" },
      { name: "body", label: "Paragraph", type: "textarea" },
      { name: "photos", label: "Photos", type: "photos" },
    ],
  },
  TIMING_NOTICE: {
    label: "Timing notice (site-wide banner)",
    page: "every page that shows times",
    fields: [
      { name: "lead", label: "Bold lead-in", type: "text" },
      { name: "body", label: "Notice text", type: "textarea" },
      { name: "ctaLabel", label: "Button label", type: "text" },
      { name: "ctaHref", label: "Button link", type: "text" },
    ],
  },
};

const TIER_SET_LABELS: Record<TierSetKey, { label: string; page: string }> = {
  PROGRAM_CARDS: { label: "Teacher Training program cards", page: "/yoga-teacher-training" },
  COMMUTER:      { label: "Commuter pricing card",          page: "/yoga-teacher-training/commuter" },
  RESIDENTIAL:   { label: "Residential pricing card",       page: "/yoga-teacher-training/residential" },
  ONLINE:        { label: "Online pricing card",            page: "/yoga-teacher-training/online" },
};

const CURRICULUM_LABELS: Record<CurriculumKey, { label: string; page: string }> = {
  YTT_HUB:     { label: "Curriculum — Teacher Training hub", page: "/yoga-teacher-training" },
  RESIDENTIAL: { label: "Curriculum — Residential",          page: "/yoga-teacher-training/residential" },
  COMMUTER:    { label: "Curriculum — Commuter",             page: "/yoga-teacher-training/commuter" },
  ONLINE:      { label: "Curriculum — Online",               page: "/yoga-teacher-training/online" },
  HOUR_300:    { label: "Curriculum — 300-Hour",             page: "/yoga-teacher-training/300-hour" },
  HOUR_500:    { label: "Curriculum — 500-Hour",             page: "/yoga-teacher-training/500-hour" },
};

const HUB_LABELS: Record<HubConfigKey, { label: string; page: string }> = {
  YOGA_CLASSES:     { label: "Yoga Classes hub cards",       page: "/class-schedule" },
  SOUND_HEALING:    { label: "Sound Healing hub cards",      page: "/sound-healing-therapy" },
  RETREATS:         { label: "Retreats & Special hub cards", page: "/yoga-retreat-nepal" },
  THERAPY_WELLNESS: { label: "Therapy & Wellness hub cards", page: "/therapy-wellness" },
  SPECIALIZED:      { label: "Specific Groups hub cards",    page: "/specialized-yoga" },
};

const SERVICE_PAGE_PATHS: Record<ServiceConfigKey, string> = {
  DROP_IN:              "/class-schedule/drop-in",
  VIRTUAL_YOGA:         "/class-schedule/virtual",
  PRIVATE_YOGA:         "/class-schedule/private",
  YOGA_AT_HOME:         "/class-schedule/home",
  SOUND_SESSIONS:       "/sound-healing-therapy/sessions",
  SOUND_LEVEL_1:        "/sound-healing-therapy/course-level-1",
  SOUND_LEVEL_2:        "/sound-healing-therapy/course-level-2",
  WEIGHT_LOSS_BOOTCAMP: "/yoga-retreat-nepal/weight-loss-bootcamp",
  CORPORATE_YOGA:       "/yoga-retreat-nepal/corporate-yoga",
  YOGA_TREKKING:        "/yoga-retreat-nepal/yoga-trekking",
  YOGA_THERAPY:         "/therapy-wellness/yoga-therapy",
  REIKI_HEALING:        "/therapy-wellness/reiki-healing",
  DIET_CONSULTATION:    "/therapy-wellness/diet-consultation",
  PRENATAL:             "/specialized-yoga/prenatal",
  CHILDRENS_YOGA:       "/specialized-yoga/childrens-yoga",
  SENIOR_YOGA:          "/specialized-yoga/senior-yoga",
  SCHOOL_YOGA:          "/specialized-yoga/school-yoga",
};

export type ContentDocMeta = {
  key: string;                 // e.g. "section:INSIDE_STUDIO", "svc:DROP_IN"
  kind: "section" | "service" | "tiers" | "hub" | "curriculum";
  label: string;
  page: string;                // where it appears (shown as a hint in admin)
  fields?: FieldDef[];         // only for kind === "section"
};

export function contentRegistry(): Array<ContentDocMeta & { default: object }> {
  const docs: Array<ContentDocMeta & { default: object }> = [];
  for (const key of Object.keys(SECTION_DEFAULTS) as SectionKey[]) {
    const meta = SECTION_META[key];
    docs.push({ key: `section:${key}`, kind: "section", label: meta.label, page: meta.page, fields: meta.fields, default: SECTION_DEFAULTS[key] });
  }
  for (const key of Object.keys(SERVICE_CONFIGS) as ServiceConfigKey[]) {
    const cfg = SERVICE_CONFIGS[key];
    docs.push({ key: `svc:${key}`, kind: "service", label: `${cfg.heroTitleA} ${cfg.heroTitleEm}`.trim(), page: SERVICE_PAGE_PATHS[key], default: cfg });
  }
  for (const key of Object.keys(TIER_SETS) as TierSetKey[]) {
    docs.push({ key: `tiers:${key}`, kind: "tiers", label: TIER_SET_LABELS[key].label, page: TIER_SET_LABELS[key].page, default: TIER_SETS[key] });
  }
  for (const key of Object.keys(HUB_CONFIGS) as HubConfigKey[]) {
    docs.push({ key: `hub:${key}`, kind: "hub", label: HUB_LABELS[key].label, page: HUB_LABELS[key].page, default: HUB_CONFIGS[key] });
  }
  for (const key of Object.keys(CURRICULA) as CurriculumKey[]) {
    docs.push({ key: `curriculum:${key}`, kind: "curriculum", label: CURRICULUM_LABELS[key].label, page: CURRICULUM_LABELS[key].page, default: CURRICULA[key] });
  }
  return docs;
}

export function isKnownContentKey(key: string): boolean {
  return contentRegistry().some((d) => d.key === key);
}

// ── Read / write ──────────────────────────────────────────────────────────────

async function readOverride(key: string): Promise<Record<string, unknown> | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("yogmandu_site_config")
      .select("data")
      .eq("id", ROW_PREFIX + key)
      .maybeSingle();
    if (error || !data?.data || typeof data.data !== "object" || Array.isArray(data.data)) return null;
    return data.data as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** Merged content for one document: DB override (shallow) over the code default. */
export async function getContent<T extends object>(key: string, fallback: T): Promise<T> {
  const override = await readOverride(key);
  if (!override) return fallback;
  return { ...fallback, ...(override as Partial<T>) };
}

export async function getSectionContent<K extends SectionKey>(key: K): Promise<(typeof SECTION_DEFAULTS)[K]> {
  return getContent(`section:${key}`, SECTION_DEFAULTS[key]);
}

export type SectionImageSlot = { id: string; label: string; image: string; alt: string };

/**
 * All section image slots. Wrapped in React `cache` so a page rendering several
 * <SectionImage> bands still makes a single database read per request.
 */
export const getSectionImages = cache(async (): Promise<SectionImageSlot[]> => {
  const { slots } = await getSectionContent("SECTION_IMAGES");
  return Array.isArray(slots) ? (slots as SectionImageSlot[]) : [];
});

/** One slot by id, or null when the client hasn't set a picture for it. */
export async function getSectionImage(id: string): Promise<SectionImageSlot | null> {
  const slot = (await getSectionImages()).find((s) => s.id === id);
  return slot?.image ? slot : null;
}

/** Session categories, admin-editable. Falls back to the built-in list. */
export async function getSessionTypes(): Promise<string[]> {
  const { types } = await getSectionContent("SESSION_TYPES");
  return Array.isArray(types) && types.length ? types : SESSION_TYPES_DEFAULT.types;
}

export async function getServicePageConfig(key: ServiceConfigKey): Promise<ServiceConfig> {
  return getContent(`svc:${key}`, SERVICE_CONFIGS[key]);
}

export async function getTierSet(key: TierSetKey): Promise<TierSet> {
  return getContent(`tiers:${key}`, TIER_SETS[key]);
}

export async function getHubConfig(key: HubConfigKey): Promise<HubConfig> {
  return getContent(`hub:${key}`, HUB_CONFIGS[key]);
}

export async function getCurriculum(key: CurriculumKey): Promise<Curriculum> {
  return getContent(`curriculum:${key}`, CURRICULA[key]);
}

export async function writeContent(key: string, data: object): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("yogmandu_site_config")
      .upsert(
        { id: ROW_PREFIX + key, data, updated_at: new Date().toISOString() },
        { onConflict: "id" },
      );
    return !error;
  } catch {
    return false;
  }
}

/** Delete the override row so the page falls back to the code default. */
export async function resetContent(key: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("yogmandu_site_config")
      .delete()
      .eq("id", ROW_PREFIX + key);
    return !error;
  } catch {
    return false;
  }
}

/** All documents with merged data + whether a DB override exists (admin GET). */
export async function listContent(): Promise<Array<ContentDocMeta & { data: object; overridden: boolean }>> {
  const registry = contentRegistry();
  const overrides = new Map<string, Record<string, unknown>>();
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase
        .from("yogmandu_site_config")
        .select("id, data")
        .like("id", `${ROW_PREFIX}%`);
      if (!error) {
        for (const row of data ?? []) {
          if (row.data && typeof row.data === "object" && !Array.isArray(row.data)) {
            overrides.set((row.id as string).slice(ROW_PREFIX.length), row.data as Record<string, unknown>);
          }
        }
      }
    } catch {
      // fall through — admin will just see code defaults
    }
  }
  return registry.map(({ default: def, ...meta }) => {
    const override = overrides.get(meta.key);
    return { ...meta, data: override ? { ...def, ...override } : def, overridden: Boolean(override) };
  });
}
