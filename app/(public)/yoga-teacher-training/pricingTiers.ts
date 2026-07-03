// Shared pricing-tier data for the 200hr Teacher Training pages.
// The 200hr overview page shows the Commuter (non-residential) tier; the
// Residential & Online sub-page shows the Full Board + Online tiers. Keeping
// the data here means both pages render the exact same 3D card component.

export type Tier = {
  id:        string;
  badge:     string;
  badgeColor: string;
  category:  string;
  title:     string;
  icon:      string;
  price:     string;
  priceSub:  string;
  priceNote: string;
  color:     string;        // accent
  features:  string[];
  ctaLabel:  string;
  ctaHref:   string;
  featured?: boolean;
  /** Where the whole card links to (defaults to the 200hr booking flow). */
  cardHref?: string;
};

// Program cards for the "all teacher training pathways" hub — same 3D card as
// the pricing tiers, but each links to its own program page.
export const PROGRAM_TIERS: Tier[] = [
  {
    id: "p-commuter", badge: "Most Popular", badgeColor: "#F7941D", category: "RYS 200 · Non-Residential",
    title: "Commuter (200hr)", icon: "🚪", price: "USD 600", priceSub: "NPR rates for Nepali citizens",
    priceNote: "28-day program", color: "#F7941D", featured: true,
    features: ["Yoga Alliance RYT 200", "Your own accommodation", "Morning & afternoon sessions"],
    ctaLabel: "View program", ctaHref: "/yoga-teacher-training/commuter", cardHref: "/yoga-teacher-training/commuter",
  },
  {
    id: "p-residential", badge: "", badgeColor: "#6B2D8B", category: "RYS 200 · Residential",
    title: "Residential (200hr)", icon: "🏡", price: "USD 1,400", priceSub: "All-inclusive · full board",
    priceNote: "USD 200 deposit", color: "#6B2D8B",
    features: ["25 nights accommodation", "3 organic meals daily", "2 Ayurvedic massages"],
    ctaLabel: "View program", ctaHref: "/yoga-teacher-training/residential", cardHref: "/yoga-teacher-training/residential",
  },
  {
    id: "p-online", badge: "", badgeColor: "#8DC63F", category: "RYS 200 · Online",
    title: "Online (200hr)", icon: "💻", price: "USD 500", priceSub: "Live · from anywhere",
    priceNote: "Same RYT 200 certificate", color: "#8DC63F",
    features: ["Live real-time classes", "Train from home", "Yoga Alliance RYT 200"],
    ctaLabel: "View program", ctaHref: "/yoga-teacher-training/online", cardHref: "/yoga-teacher-training/online",
  },
  {
    id: "p-300", badge: "", badgeColor: "#6B2D8B", category: "RYS 300 · Advanced",
    title: "300hr Advanced", icon: "📜", price: "Advanced", priceSub: "For certified 200hr teachers",
    priceNote: "Path to RYT 500", color: "#6B2D8B",
    features: ["Advanced asana & philosophy", "Refined teaching methodology", "Combine for RYT 500"],
    ctaLabel: "View program", ctaHref: "/yoga-teacher-training/300-hour", cardHref: "/yoga-teacher-training/300-hour",
  },
  {
    id: "p-500", badge: "Highest Level", badgeColor: "#F7941D", category: "RYS 500 · Master",
    title: "500hr Master", icon: "🏔", price: "USD 2,500", priceSub: "from · master pathway",
    priceNote: "45-day immersion", color: "#F7941D",
    features: ["Complete 200 + 300 pathway", "Two certificates", "Highest level of teaching"],
    ctaLabel: "View program", ctaHref: "/yoga-teacher-training/500-hour", cardHref: "/yoga-teacher-training/500-hour",
  },
];

export const COMMUTER_TIER: Tier = {
  id:        "commuter",
  badge:     "Most Popular",
  badgeColor: "#F7941D",
  category:  "Non-Residential",
  title:     "Commuter Program",
  icon:      "🚪",
  price:     "USD 600",
  priceSub:  "NPR 45,000 early bird · NPR 70,000 regular",
  priceNote: "(Nepalese citizens)",
  color:     "#F7941D",
  features: [
    "Yoga Alliance RYT 200 Certificate",
    "Yogmandu training manual",
    "Tea & coffee daily",
    "28-day program",
    "Morning & afternoon sessions",
  ],
  ctaLabel:  "Apply Now",
  ctaHref:   "https://wa.me/9779810263277",
  featured:  true,
};

export const RESIDENTIAL_TIER: Tier = {
  id:        "residential",
  badge:     "All-Inclusive",
  badgeColor: "#6B2D8B",
  category:  "Residential",
  title:     "Full Board Program",
  icon:      "🏡",
  price:     "USD 1,400",
  priceSub:  "USD 200 deposit on booking",
  priceNote: "+ USD 1,200 due on arrival",
  color:     "#6B2D8B",
  features: [
    "Yoga Alliance RYT 200 Certificate",
    "Shared accommodation (25 days)",
    "3 organic vegetarian meals daily",
    "Unlimited herbal teas",
    "Shatkarma kit",
    "2 Ayurvedic massages",
    "Training manual & notebook",
  ],
  ctaLabel:  "Apply Now",
  ctaHref:   "https://wa.me/9779810263277",
  featured:  true,
};

export const ONLINE_TIER: Tier = {
  id:        "virtual",
  badge:     "",
  badgeColor: "#8DC63F",
  category:  "Virtual",
  title:     "Online Program",
  icon:      "💻",
  price:     "USD 500",
  priceSub:  "NPR 40,000 (Nepali citizens)",
  priceNote: "Registration via Google Form",
  color:     "#8DC63F",
  features: [
    "Yoga Alliance RYT 200 Certificate",
    "Live online sessions",
    "Training manual",
    "Asanas, Pranayama & bandhas",
    "Teaching methodology",
  ],
  ctaLabel:  "Get Details",
  ctaHref:   "mailto:info@yogmandu.com",
};
