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

// ── Yoga Classes (/class-schedule) ─────────────────────────────────────
const CLASS_SIBLINGS = [
  { href: "/class-schedule", label: "Class Schedule" },
  { href: "/yoga-for-beginners", label: "Yoga for Beginners" },
  { href: "/class-schedule/drop-in", label: "Drop-In Sessions" },
  { href: "/class-schedule/virtual", label: "Virtual Live Yoga" },
  { href: "/class-schedule/private", label: "Private Classes" },
  { href: "/class-schedule/home", label: "Yoga at Home" },
];

export const DROP_IN: ServiceConfig = {
  slug: "drop-in",
  breadcrumb: { href: "/class-schedule", label: "Yoga Classes" },
  eyebrow: "Drop-In · All Levels",
  heroTitleA: "Drop-in",
  heroTitleEm: "yoga sessions",
  heroLead: "No membership, no commitment — just show up and practise. Join any class on our weekly timetable at our Mid-Baneshwor studio in Kathmandu.",
  heroMeta: "Sun–Fri · Mid-Baneshwor, Kathmandu · From NPR 600 per class",
  bookLabel: "Book a Drop-In",
  overviewHeading: "Practise on your schedule",
  overviewBody: [
    "Our drop-in classes are the easiest way to build a steady yoga practice around a busy life. Pay per class and join whenever you can — mornings before work, or in the cool of the evening.",
    "Every class is led by our experienced Yogmandu faculty and welcomes all levels, from complete beginners to seasoned practitioners. Mats and props are provided, so you only need to bring yourself.",
  ],
  forYou: [
    "Anyone wanting a flexible, pay-as-you-go practice",
    "Travellers and visitors staying in Kathmandu",
    "Practitioners who prefer variety over a fixed course",
    "Beginners testing the waters before committing",
  ],
  included: [
    "Access to any scheduled class",
    "Yoga mats and props provided",
    "Guidance from experienced teachers",
    "Hatha, Vinyasa, Yin, pranayama & meditation",
    "A welcoming, all-levels community",
  ],
  steps: [
    { n: "1", t: "Check the timetable", b: "Browse the weekly class schedule and pick a class that suits your level and time." },
    { n: "2", t: "Reserve your spot", b: "Book online or message us on WhatsApp — most classes welcome walk-ins too." },
    { n: "3", t: "Come and practise", b: "Arrive 10 minutes early, roll out a mat, and enjoy your class." },
  ],
  price: "From NPR 600",
  priceNote: "Per class · class passes available on request",
  faqs: [
    { q: "Do I need to book in advance?", a: "Most classes welcome drop-ins, but booking ahead guarantees your place — especially for popular morning and evening slots. Message us on WhatsApp to reserve." },
    { q: "Do you provide mats and equipment?", a: "Yes. Mats, blocks, straps and bolsters are all provided at the studio. Just wear comfortable clothing." },
    { q: "Are drop-in classes suitable for beginners?", a: "Absolutely. Our teachers offer modifications for every posture, so beginners and experienced practitioners can share the same class comfortably." },
    { q: "Where are classes held?", a: "At our studio in Mid-Baneshwor-31, Kathmandu — minutes from New Baneshwor and a short drive from the airport." },
  ],
  siblingLinks: CLASS_SIBLINGS.filter((l) => l.href !== "/class-schedule/drop-in"),
  accent: "#F7941D",
};

export const VIRTUAL_YOGA: ServiceConfig = {
  slug: "virtual",
  breadcrumb: { href: "/class-schedule", label: "Yoga Classes" },
  eyebrow: "Live Online · Worldwide",
  heroTitleA: "Virtual",
  heroTitleEm: "live yoga",
  heroLead: "Practise with our Kathmandu teachers in real time, from anywhere in the world. Live, interactive classes streamed straight to your home.",
  heroMeta: "Live online · flexible time zones · From NPR 500 per class",
  bookLabel: "Join a Live Class",
  overviewHeading: "The studio, wherever you are",
  overviewBody: [
    "Can't make it to Kathmandu? Our virtual live classes bring the same authentic teaching to your living room. These are real-time, two-way sessions — your teacher can see you, offer corrections and answer questions, just like an in-person class.",
    "It's ideal for practitioners abroad who want to study in the classical Himalayan tradition, or for anyone who prefers to practise from the comfort of home.",
  ],
  forYou: [
    "International students who can't travel to Nepal",
    "Anyone who prefers practising at home",
    "Busy people who want to skip the commute",
    "Practitioners seeking authentic Himalayan teaching remotely",
  ],
  included: [
    "Live, real-time interactive classes",
    "Personal corrections from your teacher",
    "A class recording on request",
    "All levels and styles catered for",
    "Only a device and a little space needed",
  ],
  steps: [
    { n: "1", t: "Pick your class", b: "Choose a live class time that works across your time zone." },
    { n: "2", t: "Get the link", b: "We send you a secure video link and a short setup guide before class." },
    { n: "3", t: "Roll out & join", b: "Log in from home and practise live with your teacher and the group." },
  ],
  price: "From NPR 500",
  priceNote: "Per class · packages available for regular students",
  faqs: [
    { q: "Is the class live or pre-recorded?", a: "Fully live and interactive. Your teacher can see you and offer real-time guidance — it is not a pre-recorded video." },
    { q: "What do I need to join?", a: "A phone, tablet or laptop with a camera, a stable internet connection, and enough space to lay out a mat." },
    { q: "Can I get a recording if I miss it?", a: "Yes, we can share a recording of most classes on request so you can catch up or revisit the practice." },
    { q: "Which time zones do you teach in?", a: "We schedule classes to suit students across Asia, Europe and beyond. Message us with your location and we'll find a time that works." },
  ],
  siblingLinks: CLASS_SIBLINGS.filter((l) => l.href !== "/class-schedule/virtual"),
  accent: "#6B2D8B",
};

export const PRIVATE_YOGA: ServiceConfig = {
  slug: "private",
  breadcrumb: { href: "/class-schedule", label: "Yoga Classes" },
  eyebrow: "One-to-One · Personalised",
  heroTitleA: "Private",
  heroTitleEm: "yoga classes",
  heroLead: "One-to-one attention, a practice built entirely around you. Perfect for faster progress, specific goals, or simply learning at your own pace.",
  heroMeta: "By appointment · studio or your location · Kathmandu",
  bookLabel: "Book a Private Class",
  overviewHeading: "A practice designed for you",
  overviewBody: [
    "In a private class, the entire session is shaped around your body, your goals and your pace. Whether you're recovering from an injury, preparing for a deeper practice, or want the focused attention a group can't offer, one-to-one sessions accelerate your progress.",
    "Your teacher builds a personalised sequence and adjusts it as you grow. Sessions can be held at our Kathmandu studio or at a location that suits you.",
  ],
  forYou: [
    "Anyone wanting focused, individual attention",
    "Students with specific goals or physical needs",
    "Beginners who prefer to learn privately first",
    "Couples or small groups wanting a tailored session",
  ],
  included: [
    "A fully personalised sequence",
    "One-to-one guidance and corrections",
    "Flexible scheduling around your week",
    "Studio or off-site options",
    "Progress tracking session to session",
  ],
  steps: [
    { n: "1", t: "Tell us your goals", b: "Share what you'd like to work on — flexibility, strength, calm, or a specific practice." },
    { n: "2", t: "We match your teacher", b: "We pair you with a teacher suited to your needs and agree a time and place." },
    { n: "3", t: "Practise & progress", b: "Enjoy focused sessions built around you, adjusted as you advance." },
  ],
  faqs: [
    { q: "How much does a private class cost?", a: "Private sessions are priced by frequency and location. Message us with what you're looking for and we'll send a tailored quote." },
    { q: "Can the teacher come to me?", a: "Yes. Private classes can be held at our Mid-Baneshwor studio or at your home or hotel in and around Kathmandu." },
    { q: "Can my partner or friend join?", a: "Of course — small private groups of two or three are very welcome and often a lovely way to practise together." },
    { q: "Is a private class good for beginners?", a: "It's one of the best ways to start. You'll learn correct alignment and breathing from day one, with the teacher's full attention." },
  ],
  siblingLinks: CLASS_SIBLINGS.filter((l) => l.href !== "/class-schedule/private"),
  accent: "#F7941D",
};

export const YOGA_AT_HOME: ServiceConfig = {
  slug: "home",
  breadcrumb: { href: "/class-schedule", label: "Yoga Classes" },
  eyebrow: "At Your Space · In-Person",
  heroTitleA: "Yoga",
  heroTitleEm: "at home",
  heroLead: "Bring the practice to your doorstep. Our teacher comes to your home for a session in the comfort and privacy of your own space.",
  heroMeta: "By appointment · in & around Kathmandu",
  bookLabel: "Arrange a Home Session",
  overviewHeading: "Your home, your studio",
  overviewBody: [
    "For many people, home is where they feel most at ease — and that ease deepens a yoga practice. With our at-home service, an experienced Yogmandu teacher comes to you, so there's no commute and no crowd.",
    "It's a wonderful option for families, for those with a busy schedule, or for anyone who simply prefers to practise privately in familiar surroundings.",
  ],
  forYou: [
    "Families who'd like to practise together",
    "Anyone short on time to travel to a studio",
    "People who prefer privacy and familiar surroundings",
    "Those with mobility or scheduling constraints",
  ],
  included: [
    "A qualified teacher who comes to you",
    "A session tailored to your space and level",
    "Guidance for the whole household if desired",
    "Flexible timings that fit your day",
    "All you need is a little clear floor space",
  ],
  steps: [
    { n: "1", t: "Share your location", b: "Let us know where you are in the Kathmandu area and your preferred times." },
    { n: "2", t: "We plan the session", b: "We confirm a teacher, timing and the style of practice you'd like." },
    { n: "3", t: "Practise at home", b: "Your teacher arrives ready to guide you in your own space." },
  ],
  faqs: [
    { q: "Which areas do you cover?", a: "We serve homes in and around Kathmandu. Message us with your location and we'll confirm availability and any travel considerations." },
    { q: "How much space do I need?", a: "Enough room to lay out a mat and move your arms and legs freely — a living room or a cleared bedroom is usually perfect." },
    { q: "Can my whole family join?", a: "Yes. Home sessions are ideal for couples and families; the teacher will adapt the practice so everyone can take part." },
    { q: "Do you bring mats?", a: "We can advise on what to have ready and bring props where needed. Let us know your setup when you book." },
  ],
  siblingLinks: CLASS_SIBLINGS.filter((l) => l.href !== "/class-schedule/home"),
  accent: "#6B2D8B",
};
