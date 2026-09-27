/**
 * The twelve sound-healing therapies, defined once.
 *
 * Three places need them and they must never disagree:
 *   • the cards on /sound-healing-therapy/sessions (app/(public)/service/hubContent.ts)
 *   • the booking options on /book                 (app/(public)/book/BookClient.tsx)
 *   • the link between the two                     (withTherapyBookingLinks below)
 *
 * Two ids, deliberately:
 *   • `cardId`    — the tier id. NEVER change these. The client's saved admin
 *                   copy is keyed on them, and a changed id silently orphans
 *                   their edits (see withTherapyBookingLinks).
 *   • `bookingId` — what lands in the bookings table's `service_id`, so a
 *                   booking names the exact therapy rather than a generic
 *                   "sound".
 *
 * The prices below mirror what the studio entered in the admin in September
 * 2026. The admin copy still wins at runtime; these are the fallback and the
 * record of what was agreed, so a reset never loses the real figures.
 */

export type SoundTherapy = {
  cardId:    string;
  bookingId: string;
  title:     string;
  /** Small-caps line on the card. */
  category:  string;
  /** One line under the title in the booking picker. */
  subtitle:  string;
  icon:      string;
  color:     string;
  price:     string;
  priceSub:  string;
  features:  [string, string, string];
};

const P = "#6B2D8B", O = "#F7941D", G = "#8DC63F";

const SESSION_PRICE = "From NPR 2,500/USD 25";
const SESSION_SUB   = "Per session · 60 min";

export const SOUND_THERAPIES: SoundTherapy[] = [
  {
    cardId: "t-energy-purification", bookingId: "sound-energy-purification",
    title: "Energy Purification and Relaxation (Aura Cleansing)",
    category: "Restorative", subtitle: "Aura cleansing, deep rest", icon: "🌬", color: P,
    price: SESSION_PRICE, priceSub: SESSION_SUB,
    features: ["Full-body singing bowl placement", "Clears heaviness and fatigue", "Releases stress & tension"],
  },
  {
    cardId: "t-shushumna", bookingId: "sound-shushumna",
    title: "Shushumna Activation Therapy",
    category: "Subtle Body", subtitle: "Along the central channel", icon: "🕉", color: O,
    price: SESSION_PRICE, priceSub: SESSION_SUB,
    features: ["Works along the central channel", "Bowls placed within the spine", "Steadies breath and attention"],
  },
  {
    cardId: "t-psychic-balancing", bookingId: "sound-psychic-balancing",
    title: "Psychic Energy Balancing",
    category: "Energy Work", subtitle: "Balances the energy field", icon: "🔮", color: G,
    price: SESSION_PRICE, priceSub: SESSION_SUB,
    features: ["Balances the subtle energy field", "Gentle and non-invasive", "Quietens an overactive mind"],
  },
  {
    cardId: "t-sacral", bookingId: "sound-sacral",
    title: "Sacral Therapy for Sensual Vibration",
    category: "Sacral Centre", subtitle: "Focused on the sacral centre", icon: "🌺", color: P,
    price: SESSION_PRICE, priceSub: SESSION_SUB,
    features: ["Focused on the sacral centre", "Low-frequency bowl work", "Releases long-held tension"],
  },
  {
    // Not a hands-on oil massage — the bowls do the work, resting on the body.
    cardId: "t-whole-body-massage", bookingId: "sound-whole-body-massage",
    title: "Whole Body Massage",
    category: "Sound Massage", subtitle: "Bowls rested on the body", icon: "🔔", color: O,
    price: SESSION_PRICE, priceSub: SESSION_SUB,
    features: ["Singing bowls rested on the body", "Vibration travels head to feet", "Eases muscular tightness"],
  },
  {
    cardId: "t-chakra-healing", bookingId: "sound-chakra-healing",
    title: "Chakra Healing",
    category: "Seven Centres", subtitle: "A bowl for each chakra", icon: "🌈", color: G,
    price: SESSION_PRICE, priceSub: SESSION_SUB,
    features: ["A bowl tuned to each chakra", "Worked crown to root", "Restores a sense of balance"],
  },
  {
    cardId: "t-vedic-therapy", bookingId: "sound-vedic-therapy",
    title: "Vedic Therapy",
    category: "Vedic Tradition", subtitle: "Mantra with the bowls", icon: "📜", color: P,
    price: SESSION_PRICE, priceSub: SESSION_SUB,
    features: ["Rooted in Vedic practice", "Mantra alongside the bowls", "Shaped around your needs"],
  },
  {
    cardId: "t-vedic-healing", bookingId: "sound-vedic-healing",
    title: "Vedic Healing",
    category: "Vedic Tradition", subtitle: "Traditional ritual setting", icon: "🪔", color: O,
    price: SESSION_PRICE, priceSub: SESSION_SUB,
    features: ["Mantra, sound and intention", "Traditional ritual setting", "Individual or small group"],
  },
  {
    cardId: "t-brainwave-therapy", bookingId: "sound-brainwave-therapy",
    title: "Brainwave Therapy",
    category: "Neuro-Acoustic", subtitle: "Guided toward theta", icon: "🧠", color: G,
    price: SESSION_PRICE, priceSub: SESSION_SUB,
    features: ["Guides the mind toward theta", "Paired bowl frequencies", "Supports sleep and focus"],
  },
  {
    cardId: "t-brainwave-healing", bookingId: "sound-brainwave-healing",
    title: "Brainwave Healing",
    category: "Neuro-Acoustic", subtitle: "Extended deep rest", icon: "💫", color: P,
    price: SESSION_PRICE, priceSub: SESSION_SUB,
    features: ["Extended deep-rest session", "Layered bowl frequencies", "For stress and mental fatigue"],
  },
  {
    cardId: "t-hot-cold-water", bookingId: "sound-hot-cold-water",
    title: "Hot/Cold Water Therapy",
    category: "Hydrotherapy", subtitle: "Contrast hydrotherapy", icon: "💧", color: O,
    price: SESSION_PRICE, priceSub: SESSION_SUB,
    features: ["Alternating hot and cold water", "Traditional contrast method", "Circulation and recovery"],
  },
  {
    cardId: "t-group-sound-bath", bookingId: "sound-group-sound-bath",
    title: "Group Healing & Sound Bath",
    category: "For Groups (Min. 4 pax)", subtitle: "Groups of four or more", icon: "🎶", color: G,
    price: "From NPR 1,000/USD 10 per person", priceSub: SESSION_SUB,
    features: ["For groups, teams and friends", "Lie back and simply receive", "At our studio or your venue"],
  },
];

/** The booking-picker group these sit in. */
export const SOUND_THERAPY_GROUP = "Sound Healing Therapies";

export const therapyBookingHref = (bookingId: string) => `/book?service=${bookingId}`;

const BY_CARD_ID = new Map(SOUND_THERAPIES.map((t) => [t.cardId, t]));

/**
 * Point each therapy card at its own booking option.
 *
 * The booking link is owned by the code, not by the saved admin copy: the
 * studio should never have to keep twelve URLs correct by hand, and a copy
 * saved before these options existed still carries the old generic
 * "/book?service=sound" for every card. Everything else the client typed —
 * titles, prices, wording — is left exactly as they saved it.
 *
 * Cards the client adds themselves have an unknown id and keep their own link.
 */
export function withTherapyBookingLinks<T extends { tiers: Array<Record<string, unknown>> }>(hub: T): T {
  return {
    ...hub,
    tiers: hub.tiers.map((tier) => {
      const therapy = BY_CARD_ID.get(String(tier.id));
      if (!therapy) return tier;
      const href = therapyBookingHref(therapy.bookingId);
      return { ...tier, ctaHref: href, cardHref: href };
    }),
  };
}
