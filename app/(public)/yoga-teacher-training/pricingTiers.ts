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
};

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
