import type { Tier } from "../yoga-teacher-training/pricingTiers";

// Hub definitions — one per nav category. Each is rendered by <ServiceHub> as a
// grid of the same 3D tilt cards used on the Teacher Training hub. Every card's
// cardHref/ctaHref points to that service's own full page.
export type HubConfig = {
  eyebrow:  string;
  title:    string;
  titleEm:  string;   // emphasised (purple) tail of the heading
  subtitle: string;
  tiers:    Tier[];
};

// Helper keeps each card terse while matching the Tier shape verbatim.
function card(
  id: string, category: string, title: string, icon: string, price: string,
  priceSub: string, priceNote: string, color: string, features: string[], href: string,
  extra: Partial<Tier> = {},
): Tier {
  return {
    id, badge: "", badgeColor: color, category, title, icon, price, priceSub, priceNote,
    color, features, ctaLabel: "View program", ctaHref: href, cardHref: href, ...extra,
  };
}

const P = "#6B2D8B", O = "#F7941D", G = "#8DC63F";

// ── Yoga Classes → /class-schedule ─────────────────────────────────────
export const YOGA_CLASSES_HUB: HubConfig = {
  eyebrow: "Our Classes", title: "Ways to", titleEm: "practise with us",
  subtitle: "From your first Sun Salutation to a private one-to-one — find the class that fits your day.",
  tiers: [
    card("c-beginners", "For New Students", "Yoga for Beginners", "🌱", "From NPR 600", "Gentle foundations",
      "No experience needed", G, ["Alignment & breath basics", "Small, welcoming groups", "Build a home practice"],
      "/yoga-for-beginners", { badge: "Start Here", badgeColor: G, featured: true }),
    card("c-drop-in", "Pay As You Go", "Drop-In Sessions", "🧘", "From NPR 600", "Per class · no membership",
      "Book any day", O, ["Join any scheduled class", "All levels welcome", "Mats & props provided"],
      "/class-schedule/drop-in"),
    card("c-virtual", "Live Online", "Virtual Live Yoga", "💻", "From NPR 500", "Real-time · from home",
      "Global time zones", P, ["Live-streamed classes", "Practise anywhere", "Recording on request"],
      "/class-schedule/virtual"),
    card("c-private", "One-to-One", "Private Classes", "✨", "On request", "Tailored to you",
      "Studio or your home", O, ["Personalised sequencing", "Flexible scheduling", "Faster progress"],
      "/class-schedule/private"),
    card("c-home", "At Your Space", "Yoga at Home", "🏠", "On request", "Our teacher comes to you",
      "In & around Kathmandu", P, ["Practise in your own space", "Family or group sessions", "No commute"],
      "/class-schedule/home"),
  ],
};

// ── Sound Healing → /sound-healing-therapy ─────────────────────────────
export const SOUND_HEALING_HUB: HubConfig = {
  eyebrow: "Sound Healing", title: "Tibetan sound", titleEm: "journeys",
  subtitle: "Authentic Himalayan singing-bowl therapy — as a relaxing session, or as a two-level certified practitioner course.",
  tiers: [
    card("s-session", "Restorative", "Sound Healing Sessions", "🎵", "From NPR 2,500", "Per session · 60 min",
      "Studio in Kathmandu", P, ["Tibetan singing bowls", "Deep nervous-system reset", "Individual or group"],
      "/sound-healing-therapy/sessions", { badge: "Most Booked", badgeColor: P, featured: true }),
    card("s-level1", "Course · Level I", "Course — Level I", "🌱", "20 hours", "Foundational",
      "Certificate on completion", "#4A6418", ["Bowl history & technique", "Session structure & timing", "Foundational certificate"],
      "/sound-healing-therapy/course-level-1"),
    card("s-level2", "Course · Level II", "Course — Level II", "✨", "Advanced", "Level I required",
      "Certificate on completion", P, ["Chakra mapping & client work", "Trauma-informed facilitation", "Advanced certificate"],
      "/sound-healing-therapy/course-level-2"),
  ],
};

// ── Retreats & Special → /yoga-retreat-nepal ───────────────────────────
export const RETREATS_HUB: HubConfig = {
  eyebrow: "Retreats & Special", title: "Immersions &", titleEm: "special programs",
  subtitle: "Step out of the everyday — retreats, bootcamps and yoga in the Himalayas.",
  tiers: [
    card("r-retreat", "Signature", "Yoga Retreat", "⛰", "On request", "Multi-day · full board",
      "Kathmandu Valley & beyond", P, ["Daily yoga & meditation", "Nourishing sattvic meals", "Nature & rest"],
      "/yoga-retreat-nepal", { badge: "Signature", badgeColor: P, featured: true }),
    card("r-bootcamp", "Transform", "Weight-Loss Bootcamp", "🔥", "On request", "Structured program",
      "Guided & progressive", O, ["Dynamic daily practice", "Diet & lifestyle guidance", "Measurable results"],
      "/yoga-retreat-nepal/weight-loss-bootcamp"),
    card("r-corporate", "For Teams", "Corporate Yoga", "🏢", "On request", "On-site or virtual",
      "Tailored to your workplace", G, ["Reduce team stress", "Desk-friendly sequences", "Flexible scheduling"],
      "/yoga-retreat-nepal/corporate-yoga"),
    card("r-trekking", "Adventure", "Yoga Trekking", "🥾", "On request", "Trek + daily practice",
      "Himalayan trails", O, ["Yoga amid the mountains", "Guided trekking", "Small groups"],
      "/yoga-retreat-nepal/yoga-trekking"),
  ],
};

// ── Therapy & Wellness → /therapy-wellness ─────────────────────────────
export const THERAPY_WELLNESS_HUB: HubConfig = {
  eyebrow: "Therapy & Wellness", title: "Healing &", titleEm: "wellbeing",
  subtitle: "One-to-one therapeutic care — yoga therapy, Reiki energy healing and personalised nutrition.",
  tiers: [
    card("w-therapy", "Therapeutic", "Yoga Therapy", "🌿", "On request", "One-to-one",
      "Condition-specific", P, ["Tailored to your body", "Address pain & imbalance", "Guided by senior faculty"],
      "/therapy-wellness/yoga-therapy", { badge: "One-to-One", badgeColor: P, featured: true }),
    card("w-reiki", "Energy Healing", "Reiki Healing", "🙌", "On request", "Per session",
      "Deeply relaxing", O, ["Balance your energy", "Gentle & non-invasive", "Calm mind & body"],
      "/therapy-wellness/reiki-healing"),
    card("w-diet", "Nutrition", "Diet Consultation", "🥗", "On request", "Personalised plan",
      "Ayurvedic principles", G, ["Assessment of your needs", "Practical meal guidance", "Ongoing support"],
      "/therapy-wellness/diet-consultation"),
  ],
};

// ── For Specific Groups → /specialized-yoga ────────────────────────────
export const SPECIALIZED_HUB: HubConfig = {
  eyebrow: "For Specific Groups", title: "Yoga for", titleEm: "every stage of life",
  subtitle: "Specially adapted classes — for expecting mothers, children, seniors and schools.",
  tiers: [
    card("g-prenatal", "Mother & Baby", "Prenatal & Postnatal", "🤰", "On request", "Trimester-safe",
      "Guided & gentle", P, ["Safe for every trimester", "Breath & pelvic-floor work", "Postnatal recovery"],
      "/specialized-yoga/prenatal", { badge: "Popular", badgeColor: P, featured: true }),
    card("g-children", "Playful", "Children's Yoga", "🧒", "On request", "Fun & age-appropriate",
      "Confidence & focus", O, ["Playful, story-led classes", "Balance & coordination", "Calm & focus"],
      "/specialized-yoga/childrens-yoga"),
    card("g-seniors", "Gentle", "Senior Citizens", "🧓", "On request", "Low-impact",
      "Mobility & ease", G, ["Joint-friendly movement", "Improve balance", "Chair options available"],
      "/specialized-yoga/senior-yoga"),
    card("g-school", "Education", "School Programs", "🏫", "On request", "For institutions",
      "Curriculum-friendly", O, ["Yoga for students & staff", "Focus & wellbeing", "Flexible scheduling"],
      "/specialized-yoga/school-yoga"),
  ],
};

// Name-keyed map of every hub — iterated by the admin "Page Content" editor
// and lib/pageContent.ts (DB overrides merge over these code defaults).
export const HUB_CONFIGS = {
  YOGA_CLASSES:     YOGA_CLASSES_HUB,
  SOUND_HEALING:    SOUND_HEALING_HUB,
  RETREATS:         RETREATS_HUB,
  THERAPY_WELLNESS: THERAPY_WELLNESS_HUB,
  SPECIALIZED:      SPECIALIZED_HUB,
} satisfies Record<string, HubConfig>;

export type HubConfigKey = keyof typeof HUB_CONFIGS;
