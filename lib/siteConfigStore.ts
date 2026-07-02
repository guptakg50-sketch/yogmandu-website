import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

// Nav + footer config lives in a single Supabase row so the admin panel can edit
// it in production. (Cloudflare Workers have a read-only filesystem, so the old
// local-file storage always failed to save there.) Falls back to the code
// defaults below whenever Supabase is unavailable or the row is empty.
const CONFIG_ID = "singleton";

export const defaultNavConfig = {
  // Two-level Services menu: each category (with its own icon) opens a flyout
  // of service links. Fully editable from the admin → Site Layout → Navigation.
  serviceGroups: [
    {
      label: "Yoga Classes", icon: "🧘",
      items: [
        { href: "/class-schedule",       label: "Class Schedule" },
        { href: "/yoga-for-beginners",   label: "Yoga for Beginners" },
        { href: "/book?service=drop-in", label: "Drop-In Sessions" },
        { href: "/book?service=virtual", label: "Virtual Live Yoga" },
        { href: "/book?service=private", label: "Private Classes" },
        { href: "/book?service=home",    label: "Yoga at Home" },
      ],
    },
    {
      label: "Teacher Training", icon: "📜",
      items: [
        { href: "/yoga-teacher-training", label: "200hr Teacher Training" },
        { href: "/yoga-teacher-training", label: "300hr Advanced Training" },
      ],
    },
    {
      label: "Sound Healing", icon: "🎵",
      items: [
        { href: "/sound-healing-therapy",               label: "Singing Bowls (Nepal)" },
        { href: "/sound-healing-therapy#sessions",      label: "Sound Healing Sessions" },
        { href: "/sound-healing-therapy#certification", label: "Sound Healing Certification" },
      ],
    },
    {
      label: "Retreats & Special", icon: "⛰",
      items: [
        { href: "/yoga-retreat-nepal",     label: "Yoga Retreat" },
        { href: "/book?service=bootcamp",  label: "Weight Loss Bootcamp" },
        { href: "/book?service=corporate", label: "Corporate Yoga" },
        { href: "/book?service=trekking",  label: "Yoga Trekking" },
      ],
    },
    {
      label: "Therapy & Wellness", icon: "🌿",
      items: [
        { href: "/book?service=therapy", label: "Yoga Therapy" },
        { href: "/book?service=reiki",   label: "Reiki Healing" },
        { href: "/book?service=diet",    label: "Diet Consultation" },
      ],
    },
    {
      label: "For Specific Groups", icon: "🌱",
      items: [
        { href: "/book?service=prenatal", label: "Prenatal & Postnatal" },
        { href: "/book?service=children", label: "Children's Yoga" },
        { href: "/book?service=seniors",  label: "Senior Citizens" },
        { href: "/book?service=school",   label: "School Programs" },
      ],
    },
  ],
  leftLinks: [
    { href: "/about",   label: "About" },
    { href: "/gallery", label: "Gallery" },
  ],
  rightLinks: [
    { href: "/blog",    label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  youtubeUrl:    "https://www.youtube.com/@yogmandu",
  tagline:       "Yoga & Sound Healing · Nepal",
  bookNowLabel:  "Book Now",
  bookNowHref:   "/contact",
};

export const defaultFooterConfig = {
  tagline:     "Nepal is calling.",
  taglineEm:   "Are you ready?",
  description: "Yoga Alliance certified teacher training & authentic Tibetan Sound Healing in Kathmandu, Nepal. Transforming practitioners since 2018.",
  programs: [
    { href: "/class-schedule",        label: "Class Schedule" },
    { href: "/yoga-teacher-training", label: "200 & 300hr Teacher Training" },
    { href: "/sound-healing-therapy", label: "Sound Healing Sessions" },
    { href: "/sound-healing-therapy", label: "Sound Healing Cert." },
  ],
  company: [
    { href: "/about",   label: "About Us" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog",    label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  contact: [
    { icon: "📍", text: "Miteri Marg, Mid-Baneshwor-31, Kathmandu, Nepal" },
    { icon: "📞", text: "+977-9810263277" },
    { icon: "✉️", text: "info@yogmandu.com" },
    { icon: "🕐", text: "Sun–Fri · 5:30–18:30" },
  ],
  // Google Maps location — a name+address query, or a full Maps URL. Drives the
  // "Get Directions" link, the footer location link, and the contact-page embed.
  mapQuery:     "Yogmandu, Miteri Marg, Mid-Baneshwor, Kathmandu",
  youtubeUrl:   "https://www.youtube.com/@yogmandu",
  instagramUrl: "https://instagram.com/yogmandu",
  facebookUrl:  "https://facebook.com/yogmandu",
  whatsappUrl:  "https://wa.me/9779810263277",
  badge:        "Yoga Alliance RYS 200 & 300 · Kathmandu, Nepal",
  ctaTagline:   "Begin your journey",
};

export async function readSiteConfig() {
  const fallback = { nav: defaultNavConfig, footer: defaultFooterConfig };
  if (!isSupabaseConfigured) return fallback;
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("yogmandu_site_config")
      .select("data")
      .eq("id", CONFIG_ID)
      .maybeSingle();
    if (error || !data?.data) return fallback;
    const cfg = data.data as { nav?: unknown; footer?: unknown };
    return {
      nav:    cfg.nav    ?? defaultNavConfig,
      footer: cfg.footer ?? defaultFooterConfig,
    };
  } catch {
    return fallback;
  }
}

export async function writeSiteConfig(config: object): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("yogmandu_site_config")
      .upsert(
        { id: CONFIG_ID, data: config, updated_at: new Date().toISOString() },
        { onConflict: "id" },
      );
    return !error;
  } catch {
    return false;
  }
}
