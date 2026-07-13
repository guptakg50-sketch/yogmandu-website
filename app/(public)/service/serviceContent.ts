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

// ── Sound Healing (/sound-healing-therapy) ─────────────────────────────
const SOUND_SIBLINGS = [
  { href: "/sound-healing-therapy", label: "Sound Healing Overview" },
  { href: "/sound-healing-therapy/sessions", label: "Sound Healing Sessions" },
  { href: "/sound-healing-therapy/course-level-1", label: "Course — Level I" },
  { href: "/sound-healing-therapy/course-level-2", label: "Course — Level II" },
];

export const SOUND_SESSIONS: ServiceConfig = {
  slug: "sound",
  breadcrumb: { href: "/sound-healing-therapy", label: "Sound Healing" },
  eyebrow: "Restorative · Individual & Group",
  heroTitleA: "Sound healing",
  heroTitleEm: "sessions",
  heroLead: "Lie back and let the pure tones of Himalayan singing bowls wash over you. A deeply restorative sound bath for the nervous system, held at our Kathmandu studio.",
  heroMeta: "60 min · Mid-Baneshwor, Kathmandu · Individual or group",
  bookLabel: "Book a Session",
  overviewHeading: "A sound bath for body and mind",
  overviewBody: [
    "In a sound healing session you rest comfortably while a practitioner plays authentic Tibetan singing bowls and other instruments around and above you. The layered vibrations slow the breath and heart rate, guiding you into a profound state of relaxation.",
    "Many people use sessions to unwind from stress, ease tension, sleep better, or simply drop into a stillness that's hard to find in daily life. No experience is needed — you just receive.",
  ],
  forYou: [
    "Anyone carrying stress, tension or fatigue",
    "People struggling with sleep or an overactive mind",
    "Those curious about meditation but new to it",
    "Groups wanting a shared, restorative experience",
  ],
  included: [
    "A full guided sound bath with Tibetan bowls",
    "A calm, comfortable studio space",
    "Individual or small-group options",
    "Guidance from a trained practitioner",
    "Nothing to do but relax and receive",
  ],
  steps: [
    { n: "1", t: "Book your time", b: "Choose an individual session or gather friends for a group sound bath." },
    { n: "2", t: "Settle in", b: "Arrive, lie down with a blanket, and let your body get comfortable." },
    { n: "3", t: "Receive the sound", b: "Close your eyes as the bowls carry you into deep relaxation." },
  ],
  price: "From NPR 2,500",
  priceNote: "Per session · group rates on request",
  faqs: [
    { q: "What happens in a sound healing session?", a: "You rest comfortably while the practitioner plays Tibetan singing bowls around you. The vibrations and tones guide you into deep relaxation — there's nothing you need to do but receive." },
    { q: "Do I need any experience?", a: "None at all. Sound healing requires no prior practice — it's suitable for complete beginners and seasoned meditators alike." },
    { q: "How will I feel afterwards?", a: "Most people feel calm, clear and lighter. Some feel sleepy, others energised. We recommend drinking water and taking it gently afterwards." },
    { q: "Can I book a session for a group?", a: "Yes. Group sound baths are wonderful for friends, families or teams — message us and we'll arrange a time and a group rate." },
  ],
  siblingLinks: SOUND_SIBLINGS.filter((l) => l.href !== "/sound-healing-therapy/sessions"),
  accent: "#6B2D8B",
};

export const SOUND_LEVEL_1: ServiceConfig = {
  slug: "sound",
  breadcrumb: { href: "/sound-healing-therapy", label: "Sound Healing" },
  eyebrow: "Certification · Level I · Foundational",
  heroTitleA: "Sound Healing Course",
  heroTitleEm: "— Level I",
  heroLead: "The foundation for working with Tibetan singing bowls — history, tradition and practical technique. Your first step to becoming a certified sound healer.",
  heroMeta: "20 hours · Foundational · Internationally recognised certificate",
  bookLabel: "Enrol in Level I",
  overviewHeading: "Your foundation in sound healing",
  overviewBody: [
    "Level I is the foundational course for anyone beginning their journey with Tibetan singing bowls. You'll learn where these instruments come from, how to choose and read a bowl, and the practical technique to play them safely and effectively.",
    "By the end you'll be able to structure and hold a simple sound healing session, and you'll have your own daily practice as a practitioner. It's the essential first step before Level II. Training is led by experienced, internationally certified sound healing trainers.",
  ],
  forYou: [
    "Complete beginners to sound healing",
    "Yoga teachers and wellness professionals",
    "Anyone drawn to Tibetan singing bowls",
    "Those planning to progress to Level II",
  ],
  included: [
    "Sound & music — how sound affects body, mind & energy",
    "Nada Yoga — the yoga of sound",
    "Origin & lineage of Himalayan bowls",
    "Types of bowls, mallets & how to read a bowl",
    "Auras, chakras & aura-cleansing techniques",
    "Proper placement, session structure & self-practice",
    "Internationally recognised Level I certificate",
  ],
  steps: [
    { n: "1", t: "Enrol", b: "Message us to reserve your place and pick dates that suit you." },
    { n: "2", t: "Train hands-on", b: "Learn technique, tradition and session basics over the 20-hour course." },
    { n: "3", t: "Get certified", b: "Complete the course and receive your Level I certificate." },
  ],
  price: "NPR 35,000 / USD 350",
  priceNote: "Nepalese students / international students · Level I certification",
  faqs: [
    { q: "Do I need any experience for Level I?", a: "None at all. Level I is the foundational course and assumes no prior knowledge of sound healing or singing bowls." },
    { q: "How long is Level I?", a: "The Level I course runs for 20 hours. Schedules are flexible — message us with your preferred dates." },
    { q: "How much does Level I cost?", a: "Level I is NPR 35,000 for Nepalese students and USD 350 for international students, and includes your foundational certificate." },
    { q: "Can I go on to Level II afterwards?", a: "Absolutely — Level I is the prerequisite for the advanced Level II course, where you deepen into professional facilitation." },
  ],
  siblingLinks: SOUND_SIBLINGS.filter((l) => l.href !== "/sound-healing-therapy/course-level-1"),
  accent: "#4A6418",
};

export const SOUND_LEVEL_2: ServiceConfig = {
  slug: "sound",
  breadcrumb: { href: "/sound-healing-therapy", label: "Sound Healing" },
  eyebrow: "Certification · Level II · Advanced",
  heroTitleA: "Sound Healing Course",
  heroTitleEm: "— Level II",
  heroLead: "Deepen into professional facilitation — chakra mapping, advanced techniques and client work. The advanced course for practitioners ready to work with others.",
  heroMeta: "Advanced program · Level I required · Certificate on completion",
  bookLabel: "Enrol in Level II",
  overviewHeading: "Become a professional practitioner",
  overviewBody: [
    "Level II takes you beyond the foundations into confident, professional facilitation. You'll learn to map bowls precisely to the chakra system, design custom sessions around a client's needs, and work sensitively within trauma-informed boundaries.",
    "You'll also learn to combine sound with breathwork and meditation, and cover the ethics and practicalities of building a sound-healing practice. Level I is the prerequisite. Training is led by experienced, internationally certified trainers.",
  ],
  forYou: [
    "Graduates of the Level I course",
    "Practitioners ready to work with clients",
    "Yoga teachers & therapists going deeper",
    "Anyone building a sound-healing practice",
  ],
  included: [
    "Chakra system & precise bowl-to-chakra mapping",
    "Designing custom sessions for client needs",
    "Working with anxiety, PTSD & trauma-informed boundaries",
    "Combining sound with breathwork & meditation",
    "Building a sound-healing practice (ethics & business)",
    "Internationally recognised Level II certificate",
  ],
  steps: [
    { n: "1", t: "Confirm Level I", b: "Level I is the prerequisite — let us know when you completed it." },
    { n: "2", t: "Train in depth", b: "Cover advanced facilitation, chakra work and client practice." },
    { n: "3", t: "Get certified", b: "Complete your assessment and receive your Level II certificate." },
  ],
  price: "NPR 55,000 / USD 600",
  priceNote: "Nepalese students / international students · Level II certification",
  faqs: [
    { q: "Do I need Level I before Level II?", a: "Yes. Level II builds directly on the foundational skills from Level I, so completing Level I first is required." },
    { q: "What extra does Level II cover?", a: "Chakra-to-bowl mapping, designing sessions for individual clients, trauma-informed practice, combining sound with breathwork, and the ethics and business of practising professionally." },
    { q: "Will I be able to work with clients?", a: "Yes — Level II is designed to prepare you to facilitate professional one-to-one and group sessions with confidence." },
    { q: "How much does Level II cost?", a: "Level II is NPR 55,000 for Nepalese students and USD 600 for international students, and includes your advanced practitioner certificate." },
  ],
  siblingLinks: SOUND_SIBLINGS.filter((l) => l.href !== "/sound-healing-therapy/course-level-2"),
  accent: "#6B2D8B",
};

// ── Retreats & Special (/yoga-retreat-nepal) ───────────────────────────
const RETREAT_SIBLINGS = [
  { href: "/yoga-retreat-nepal", label: "Yoga Retreat" },
  { href: "/yoga-retreat-nepal/weight-loss-bootcamp", label: "Weight-Loss Bootcamp" },
  { href: "/yoga-retreat-nepal/corporate-yoga", label: "Corporate Yoga" },
  { href: "/yoga-retreat-nepal/yoga-trekking", label: "Yoga Trekking" },
];

export const WEIGHT_LOSS_BOOTCAMP: ServiceConfig = {
  slug: "bootcamp",
  breadcrumb: { href: "/yoga-retreat-nepal", label: "Retreats & Special" },
  eyebrow: "Transform · Structured Program",
  heroTitleA: "Weight-loss",
  heroTitleEm: "yoga bootcamp",
  heroLead: "A focused, structured program that pairs dynamic yoga with mindful nutrition to help you lose weight, build strength and reset your habits.",
  heroMeta: "Guided & progressive · Kathmandu · Real, lasting results",
  bookLabel: "Join the Bootcamp",
  overviewHeading: "Move, nourish, transform",
  overviewBody: [
    "This isn't a crash diet — it's a sustainable reset. Each day combines energising, calorie-burning yoga with practical guidance on eating well, so you build habits that last well beyond the program.",
    "Our teachers keep the sessions challenging but achievable, meeting you at your level and progressing as you get stronger. Expect more energy, better sleep and a lighter, more capable body.",
  ],
  forYou: [
    "Anyone wanting to lose weight sustainably",
    "People ready to reset their fitness and diet",
    "Those who prefer yoga to the gym",
    "Beginners and returning practitioners alike",
  ],
  included: [
    "Dynamic, calorie-burning daily yoga",
    "Practical diet and lifestyle guidance",
    "A progressive, structured plan",
    "Support and accountability throughout",
    "Measurable, lasting results",
  ],
  steps: [
    { n: "1", t: "Register", b: "Sign up and tell us your goals and current fitness level." },
    { n: "2", t: "Follow the plan", b: "Attend the guided sessions and follow the nutrition guidance." },
    { n: "3", t: "See results", b: "Track your progress as strength grows and weight comes off." },
  ],
  faqs: [
    { q: "Do I need to be fit to start?", a: "No. The bootcamp meets you where you are and builds gradually. Beginners are very welcome — the teachers adapt each session to your level." },
    { q: "Is a diet plan included?", a: "Yes. You'll receive practical, sustainable nutrition guidance to complement the physical practice — not an extreme diet." },
    { q: "How long is the program?", a: "Bootcamps run as focused, structured blocks. Message us for the current schedule and duration options." },
    { q: "Will I keep the results?", a: "Because the focus is on building sustainable habits rather than quick fixes, the results are designed to last beyond the program." },
  ],
  siblingLinks: RETREAT_SIBLINGS.filter((l) => l.href !== "/yoga-retreat-nepal/weight-loss-bootcamp"),
  accent: "#F7941D",
};

export const CORPORATE_YOGA: ServiceConfig = {
  slug: "corporate",
  breadcrumb: { href: "/yoga-retreat-nepal", label: "Retreats & Special" },
  eyebrow: "For Teams · On-Site or Virtual",
  heroTitleA: "Corporate",
  heroTitleEm: "yoga & wellness",
  heroLead: "Calmer, healthier, more focused teams. We bring tailored yoga and wellness sessions to your workplace — on-site in Kathmandu or live online for distributed teams.",
  heroMeta: "On-site or virtual · tailored to your workplace",
  bookLabel: "Request a Proposal",
  overviewHeading: "Invest in your team's wellbeing",
  overviewBody: [
    "Workplace stress, long hours at a desk and screen fatigue take a real toll. Regular yoga sessions give your team practical tools to release tension, refocus and feel better — which shows up as sharper, happier work.",
    "We design each program around your workplace: desk-friendly movement, breathing and relaxation techniques, and sessions timed to fit the working day. On-site in and around Kathmandu, or delivered live online.",
  ],
  forYou: [
    "Companies wanting to reduce team stress",
    "Teams spending long hours at desks",
    "HR and wellbeing leads planning benefits",
    "Distributed teams needing virtual sessions",
  ],
  included: [
    "Sessions tailored to your workplace",
    "Desk-friendly movement & stretches",
    "Breathing and stress-relief techniques",
    "On-site or live-online delivery",
    "Flexible scheduling around work hours",
  ],
  steps: [
    { n: "1", t: "Tell us your needs", b: "Share your team size, goals and whether you'd like on-site or virtual sessions." },
    { n: "2", t: "We design the program", b: "We build a tailored plan and schedule that fits your working day." },
    { n: "3", t: "Your team practises", b: "Our teachers deliver the sessions; we adjust as your team's needs evolve." },
  ],
  faqs: [
    { q: "Can you deliver sessions online?", a: "Yes. We run live virtual sessions for remote and distributed teams, as well as on-site sessions in and around Kathmandu." },
    { q: "Do employees need experience?", a: "Not at all. Sessions are designed for complete beginners and use accessible, desk-friendly movement everyone can join." },
    { q: "How often should we run sessions?", a: "Many workplaces run weekly sessions, but we'll recommend a cadence based on your goals and schedule." },
    { q: "How is pricing worked out?", a: "Pricing depends on team size, frequency and format. Request a proposal and we'll send tailored options." },
  ],
  siblingLinks: RETREAT_SIBLINGS.filter((l) => l.href !== "/yoga-retreat-nepal/corporate-yoga"),
  accent: "#8DC63F",
};

export const YOGA_TREKKING: ServiceConfig = {
  slug: "trekking",
  breadcrumb: { href: "/yoga-retreat-nepal", label: "Retreats & Special" },
  eyebrow: "Adventure · Trek + Practice",
  heroTitleA: "Yoga",
  heroTitleEm: "trekking",
  heroLead: "Move through the Himalayas by day and practise yoga amid the mountains at dawn and dusk. An unforgettable blend of trekking and mindful movement in Nepal.",
  heroMeta: "Himalayan trails · small groups · daily practice",
  bookLabel: "Plan Your Trek",
  overviewHeading: "Yoga where the mountains meet the sky",
  overviewBody: [
    "Imagine finishing a day on the trail with a gentle yoga practice as the peaks turn gold. Our yoga trekking journeys combine guided trekking through Nepal's landscapes with daily asana, breathwork and meditation.",
    "The trekking opens the body; the yoga restores it. Together they create a rare depth of experience — physically invigorating and deeply grounding. Groups are kept small for safety and connection.",
  ],
  forYou: [
    "Adventurers who also love to practise yoga",
    "Practitioners wanting nature and challenge",
    "Travellers seeking a meaningful Nepal journey",
    "Anyone reasonably fit and up for the trail",
  ],
  included: [
    "Guided trekking through Himalayan trails",
    "Daily yoga, breathwork & meditation",
    "Small groups for safety and connection",
    "Experienced yoga and trekking guidance",
    "A journey that restores as it challenges",
  ],
  steps: [
    { n: "1", t: "Enquire", b: "Tell us your dates, fitness level and the kind of route you'd love." },
    { n: "2", t: "We plan the journey", b: "We arrange the trek, the practice schedule and the logistics." },
    { n: "3", t: "Trek & practise", b: "Set out with your guides and greet each day with yoga in the mountains." },
  ],
  faqs: [
    { q: "How fit do I need to be?", a: "A reasonable level of fitness helps, but routes can be tailored. Tell us your experience and we'll match the trek to your ability." },
    { q: "Is yoga practised every day?", a: "Yes — typically a gentle morning and/or evening practice to complement the day's trekking and aid recovery." },
    { q: "Are the groups large?", a: "No. We keep groups small for safety, personal attention and a closer sense of community on the trail." },
    { q: "What's included in the cost?", a: "Inclusions vary by route and duration. Message us for a detailed itinerary and pricing." },
  ],
  siblingLinks: RETREAT_SIBLINGS.filter((l) => l.href !== "/yoga-retreat-nepal/yoga-trekking"),
  accent: "#F7941D",
};

// ── Therapy & Wellness (/therapy-wellness) ─────────────────────────────
const THERAPY_SIBLINGS = [
  { href: "/therapy-wellness/yoga-therapy", label: "Yoga Therapy" },
  { href: "/therapy-wellness/reiki-healing", label: "Reiki Healing" },
  { href: "/therapy-wellness/diet-consultation", label: "Diet Consultation" },
];

export const YOGA_THERAPY: ServiceConfig = {
  slug: "therapy",
  breadcrumb: { href: "/therapy-wellness", label: "Therapy & Wellness" },
  eyebrow: "Therapeutic · One-to-One",
  heroTitleA: "Yoga",
  heroTitleEm: "therapy",
  heroLead: "Yoga applied with precision to your body and your needs. A one-to-one therapeutic approach to ease pain, restore balance and support healing.",
  heroMeta: "One-to-one · condition-specific · Kathmandu",
  bookLabel: "Book a Consultation",
  overviewHeading: "Healing, tailored to you",
  overviewBody: [
    "Yoga therapy uses posture, breath and relaxation as precise tools to address specific issues — back pain, stiffness, stress, breathing difficulties, recovery from injury and more. It's a gentle, individualised alternative or complement to conventional care.",
    "Your session begins with an assessment of your body and history. From there, our senior faculty design a practice tailored to you, adjusting it over time as your body responds and heals.",
  ],
  forYou: [
    "People managing back pain, stiffness or injury",
    "Anyone with stress or breathing difficulties",
    "Those wanting a gentle, individualised practice",
    "People seeking a complement to medical care",
  ],
  included: [
    "A personal assessment of your needs",
    "A therapeutic practice built for your body",
    "Guidance from experienced senior faculty",
    "Adjustments as your body responds",
    "Tools you can continue at home",
  ],
  steps: [
    { n: "1", t: "Assessment", b: "We discuss your history, symptoms and goals to understand your needs." },
    { n: "2", t: "Your plan", b: "We design a therapeutic practice tailored precisely to your body." },
    { n: "3", t: "Practise & heal", b: "Work through the practice with guidance, refining it as you progress." },
  ],
  faqs: [
    { q: "Is yoga therapy a replacement for medical treatment?", a: "No — it's a complementary practice. We work alongside, not instead of, your medical care, and we'll always encourage you to keep your healthcare provider informed." },
    { q: "What conditions can it help with?", a: "Commonly back and joint pain, stiffness, stress, anxiety, breathing issues and injury recovery. Share your situation and we'll advise honestly whether we can help." },
    { q: "Is it a group or private session?", a: "Yoga therapy is one-to-one, so the entire session is built around your body and needs." },
    { q: "How many sessions will I need?", a: "It varies with the individual and the issue. Many people benefit from a short series; we'll give you a realistic picture after your first assessment." },
  ],
  siblingLinks: THERAPY_SIBLINGS.filter((l) => l.href !== "/therapy-wellness/yoga-therapy"),
  accent: "#6B2D8B",
};

export const REIKI_HEALING: ServiceConfig = {
  slug: "reiki",
  breadcrumb: { href: "/therapy-wellness", label: "Therapy & Wellness" },
  eyebrow: "Energy Healing · Deeply Relaxing",
  heroTitleA: "Reiki",
  heroTitleEm: "healing",
  heroLead: "A gentle, non-invasive energy healing that calms the mind and restores balance. Rest fully clothed while a practitioner channels soothing, restorative energy.",
  heroMeta: "Per session · gentle & non-invasive · Kathmandu",
  bookLabel: "Book a Reiki Session",
  overviewHeading: "Restore your energy and calm",
  overviewBody: [
    "Reiki is a gentle Japanese energy-healing practice. You lie comfortably, fully clothed, while the practitioner places their hands lightly on or just above the body to encourage relaxation and a sense of balance.",
    "People come to Reiki to unwind deep stress, quiet a busy mind, and feel more centred. It's completely non-invasive and pairs beautifully with yoga and meditation.",
  ],
  forYou: [
    "Anyone feeling stressed, drained or unbalanced",
    "People wanting deep, passive relaxation",
    "Those curious about energy healing",
    "Yoga and meditation practitioners going deeper",
  ],
  included: [
    "A full one-to-one Reiki session",
    "A calm, comfortable space",
    "A gentle, non-invasive approach",
    "Guidance from a trained practitioner",
    "Nothing required but rest",
  ],
  steps: [
    { n: "1", t: "Book your session", b: "Choose a time that lets you arrive relaxed and unhurried." },
    { n: "2", t: "Rest comfortably", b: "Lie down fully clothed while the practitioner begins." },
    { n: "3", t: "Receive & restore", b: "Let the gentle energy work settle your mind and body." },
  ],
  faqs: [
    { q: "What does a Reiki session feel like?", a: "Most people feel deeply relaxed — a warmth, tingling or gentle heaviness — as the mind quietens. You remain fully clothed throughout." },
    { q: "Do I need to believe in it for it to work?", a: "No. You simply rest and receive. Many sceptical first-timers are surprised by how relaxed and refreshed they feel afterwards." },
    { q: "Is it safe?", a: "Reiki is gentle and non-invasive, making it safe for most people. If you have specific health concerns, let us know when you book." },
    { q: "How long is a session?", a: "Sessions typically run around an hour. Message us for exact timings and current rates." },
  ],
  siblingLinks: THERAPY_SIBLINGS.filter((l) => l.href !== "/therapy-wellness/reiki-healing"),
  accent: "#F7941D",
};

export const DIET_CONSULTATION: ServiceConfig = {
  slug: "diet",
  breadcrumb: { href: "/therapy-wellness", label: "Therapy & Wellness" },
  eyebrow: "Nutrition · Personalised Plan",
  heroTitleA: "Diet",
  heroTitleEm: "consultation",
  heroLead: "Eat in a way that truly suits your body. A personalised nutrition consultation grounded in Ayurvedic principles and practical, everyday guidance.",
  heroMeta: "Personalised plan · Ayurvedic principles · Kathmandu",
  bookLabel: "Book a Consultation",
  overviewHeading: "Nutrition that fits your body and life",
  overviewBody: [
    "Generic diets ignore that each body is different. In a diet consultation we assess your constitution, lifestyle and goals, then build practical guidance around foods that support your energy, digestion and wellbeing.",
    "Rooted in Ayurvedic wisdom and common sense, the aim isn't restriction — it's a way of eating you can actually sustain, with ongoing support as you settle into it.",
  ],
  forYou: [
    "Anyone wanting to eat better for their body",
    "People with low energy or digestive issues",
    "Those pairing nutrition with a yoga practice",
    "Anyone tired of one-size-fits-all diets",
  ],
  included: [
    "An assessment of your body and lifestyle",
    "Personalised, practical food guidance",
    "Ayurvedic principles made everyday",
    "A plan you can genuinely sustain",
    "Ongoing support as you adjust",
  ],
  steps: [
    { n: "1", t: "Assessment", b: "We discuss your constitution, habits, energy and goals." },
    { n: "2", t: "Your plan", b: "We create practical, personalised nutrition guidance for you." },
    { n: "3", t: "Live it, with support", b: "Put it into practice with our guidance and check-ins." },
  ],
  faqs: [
    { q: "Is this a strict diet?", a: "No. The focus is on sustainable, personalised eating — practical guidance you can live with, not extreme restriction." },
    { q: "What are Ayurvedic principles?", a: "Ayurveda tailors food and lifestyle to your individual constitution. We translate its wisdom into simple, everyday choices — no special ingredients required." },
    { q: "Do you cater to specific goals?", a: "Yes — whether it's more energy, better digestion, weight management or supporting a yoga practice, the plan is built around your goals." },
    { q: "Is it done in person?", a: "Consultations can be arranged in person in Kathmandu or remotely. Message us to arrange what works for you." },
  ],
  siblingLinks: THERAPY_SIBLINGS.filter((l) => l.href !== "/therapy-wellness/diet-consultation"),
  accent: "#8DC63F",
};

// ── For Specific Groups (/specialized-yoga) ────────────────────────────
const SPECIAL_SIBLINGS = [
  { href: "/specialized-yoga/prenatal", label: "Prenatal & Postnatal" },
  { href: "/specialized-yoga/childrens-yoga", label: "Children's Yoga" },
  { href: "/specialized-yoga/senior-yoga", label: "Senior Citizens" },
  { href: "/specialized-yoga/school-yoga", label: "School Programs" },
];

export const PRENATAL: ServiceConfig = {
  slug: "prenatal",
  breadcrumb: { href: "/specialized-yoga", label: "For Specific Groups" },
  eyebrow: "Mother & Baby · Trimester-Safe",
  heroTitleA: "Prenatal &",
  heroTitleEm: "postnatal yoga",
  heroLead: "Gentle, safe yoga to support you through pregnancy and recovery. Nurture your body and connect with your baby, guided every step of the way.",
  heroMeta: "Trimester-safe · gentle & guided · Kathmandu",
  bookLabel: "Book a Class",
  overviewHeading: "Support through pregnancy and beyond",
  overviewBody: [
    "Prenatal yoga eases the aches of a changing body, builds the breath and strength that help in labour, and offers a calm space to bond with your baby. Every posture is chosen to be safe for your stage of pregnancy.",
    "After birth, postnatal sessions help you rebuild gently — restoring the core and pelvic floor and easing the demands of new motherhood, at a pace that respects your recovery.",
  ],
  forYou: [
    "Expecting mothers at any trimester",
    "New mothers recovering after birth",
    "Anyone wanting a gentle, guided practice",
    "Those seeking calm and connection in pregnancy",
  ],
  included: [
    "Postures safe for your stage of pregnancy",
    "Breathwork to support labour and calm",
    "Gentle postnatal recovery work",
    "Guidance from experienced teachers",
    "A supportive, unhurried space",
  ],
  steps: [
    { n: "1", t: "Tell us your stage", b: "Let us know your trimester or how far along your recovery is." },
    { n: "2", t: "We tailor the practice", b: "We ensure every session is safe and appropriate for you." },
    { n: "3", t: "Practise with care", b: "Move gently and confidently with a teacher guiding you throughout." },
  ],
  faqs: [
    { q: "Is prenatal yoga safe?", a: "Yes, when practised appropriately. Every posture is selected for your stage of pregnancy, and we always recommend checking with your doctor before beginning." },
    { q: "Can I start in any trimester?", a: "Generally yes, with the practice adapted to your stage. Tell us how far along you are and we'll guide you safely." },
    { q: "When can I begin postnatal yoga?", a: "It depends on your birth and recovery. We'll advise a gentle, safe starting point and progress at your body's pace." },
    { q: "Do I need prior yoga experience?", a: "No. These classes welcome complete beginners — the focus is on comfort, safety and connection, not performance." },
  ],
  siblingLinks: SPECIAL_SIBLINGS.filter((l) => l.href !== "/specialized-yoga/prenatal"),
  accent: "#6B2D8B",
};

export const CHILDRENS_YOGA: ServiceConfig = {
  slug: "children",
  breadcrumb: { href: "/specialized-yoga", label: "For Specific Groups" },
  eyebrow: "Playful · Age-Appropriate",
  heroTitleA: "Children's",
  heroTitleEm: "yoga",
  heroLead: "Playful, story-led yoga that helps children build strength, balance and focus — while having fun. A joyful introduction to movement and calm.",
  heroMeta: "Fun & age-appropriate · confidence & focus",
  bookLabel: "Book a Class",
  overviewHeading: "Movement, calm and confidence for kids",
  overviewBody: [
    "Children's yoga turns practice into play. Through animal poses, stories and games, kids develop coordination, strength and flexibility without ever feeling like it's exercise.",
    "Just as importantly, they learn simple breathing and calming techniques that help with focus, sleep and managing big feelings — gentle life skills that serve them well beyond the mat.",
  ],
  forYou: [
    "Children who love to move and play",
    "Kids who could use help with focus or calm",
    "Parents wanting healthy, screen-free activity",
    "Shy children building confidence gently",
  ],
  included: [
    "Playful, story-led yoga classes",
    "Balance, coordination and strength",
    "Simple breathing and calming tools",
    "A safe, encouraging environment",
    "Age-appropriate groups",
  ],
  steps: [
    { n: "1", t: "Tell us their age", b: "Share your child's age so we place them in the right group." },
    { n: "2", t: "We plan the class", b: "We tailor the games and poses to their stage and energy." },
    { n: "3", t: "Let them play", b: "Your child joins in, learns and has fun on the mat." },
  ],
  faqs: [
    { q: "What ages is this for?", a: "We group children by age so classes stay fun and appropriate. Tell us your child's age and we'll place them accordingly." },
    { q: "Is it safe for young children?", a: "Yes. Poses and games are chosen to be safe and playful, and classes are always supervised by an experienced teacher." },
    { q: "What should my child wear?", a: "Comfortable clothing they can move freely in. Mats are provided; bare feet are perfect for yoga." },
    { q: "Can siblings join together?", a: "Often yes, depending on their ages. Let us know and we'll advise the best arrangement." },
  ],
  siblingLinks: SPECIAL_SIBLINGS.filter((l) => l.href !== "/specialized-yoga/childrens-yoga"),
  accent: "#F7941D",
};

export const SENIOR_YOGA: ServiceConfig = {
  slug: "seniors",
  breadcrumb: { href: "/specialized-yoga", label: "For Specific Groups" },
  eyebrow: "Gentle · Low-Impact",
  heroTitleA: "Yoga for",
  heroTitleEm: "senior citizens",
  heroLead: "Gentle, low-impact yoga to keep you mobile, steady and at ease. Improve balance, flexibility and strength at a pace that respects your body.",
  heroMeta: "Low-impact · mobility & balance · chair options",
  bookLabel: "Book a Class",
  overviewHeading: "Stay mobile, steady and strong",
  overviewBody: [
    "Our senior yoga classes focus on gentle movement that maintains mobility, improves balance to help prevent falls, and keeps joints comfortable. Nothing is forced — the practice meets your body where it is.",
    "Chair-supported options make every posture accessible, so you can take part with confidence regardless of your current flexibility or strength. The result is more ease in daily movement and a calmer, clearer mind.",
  ],
  forYou: [
    "Older adults wanting to stay active",
    "Anyone seeking better balance and mobility",
    "People with stiff or sensitive joints",
    "Beginners who value a gentle pace",
  ],
  included: [
    "Gentle, joint-friendly movement",
    "Balance work to help prevent falls",
    "Chair-supported options where needed",
    "A calm, unhurried pace",
    "Experienced, patient guidance",
  ],
  steps: [
    { n: "1", t: "Share your needs", b: "Tell us about your mobility, any concerns and your goals." },
    { n: "2", t: "We adapt the class", b: "We choose gentle, accessible movement — chair options included." },
    { n: "3", t: "Practise with ease", b: "Move at your own pace with supportive guidance throughout." },
  ],
  faqs: [
    { q: "I'm not flexible — can I still join?", a: "Absolutely. These classes are designed for exactly that. We use gentle movement and chair support so everyone can take part comfortably." },
    { q: "Are chair-based options available?", a: "Yes. Postures can be adapted to a chair, making the whole practice accessible if standing or floor work is difficult." },
    { q: "Is it safe with joint problems?", a: "The practice is low-impact and joint-friendly. Let us know your specific concerns and we'll adapt accordingly — and please check with your doctor if unsure." },
    { q: "Can I come with a friend or partner?", a: "Of course — practising together is encouraged and often makes it more enjoyable." },
  ],
  siblingLinks: SPECIAL_SIBLINGS.filter((l) => l.href !== "/specialized-yoga/senior-yoga"),
  accent: "#8DC63F",
};

export const SCHOOL_YOGA: ServiceConfig = {
  slug: "school",
  breadcrumb: { href: "/specialized-yoga", label: "For Specific Groups" },
  eyebrow: "Education · For Institutions",
  heroTitleA: "School",
  heroTitleEm: "yoga programs",
  heroLead: "Yoga for students and staff — building focus, wellbeing and resilience in your school community. Curriculum-friendly programs delivered at your institution.",
  heroMeta: "For schools & institutions · flexible scheduling",
  bookLabel: "Request a Program",
  overviewHeading: "Yoga for a healthier school community",
  overviewBody: [
    "Bringing yoga into schools gives students practical tools for focus, calm and managing stress — supporting both their wellbeing and their learning. Sessions are playful and age-appropriate, so students genuinely enjoy them.",
    "We also offer sessions for teaching staff, who carry their own pressures. Programs are designed to fit around the school day and can be tailored to your goals, from a regular class to a wellbeing week.",
  ],
  forYou: [
    "Schools wanting to support student wellbeing",
    "Institutions building focus and resilience",
    "Teachers and staff needing stress relief",
    "Educators planning wellbeing initiatives",
  ],
  included: [
    "Age-appropriate yoga for students",
    "Focus, calm and stress-relief tools",
    "Optional sessions for teaching staff",
    "Programs that fit the school day",
    "Delivery at your institution",
  ],
  steps: [
    { n: "1", t: "Tell us your goals", b: "Share your school's size, age groups and what you'd like to achieve." },
    { n: "2", t: "We design the program", b: "We build an age-appropriate plan that fits your timetable." },
    { n: "3", t: "We deliver on-site", b: "Our teachers run the sessions at your school and adapt as needed." },
  ],
  faqs: [
    { q: "What age groups can take part?", a: "Programs can be tailored for any age group, from young children to senior students, with content adjusted appropriately." },
    { q: "Do you come to our school?", a: "Yes. Programs are delivered on-site at your institution in and around Kathmandu, scheduled to fit your school day." },
    { q: "Can staff be included?", a: "Definitely. Many schools include sessions for teachers and staff as part of a wider wellbeing initiative." },
    { q: "How is a program priced?", a: "Pricing depends on the number of students, frequency and duration. Request a program and we'll send tailored options." },
  ],
  siblingLinks: SPECIAL_SIBLINGS.filter((l) => l.href !== "/specialized-yoga/school-yoga"),
  accent: "#F7941D",
};

// Name-keyed map of every service page config. This is the canonical list the
// admin "Page Content" editor and lib/pageContent.ts iterate over — the DB may
// hold a per-service override row that is merged over these code defaults.
export const SERVICE_CONFIGS = {
  DROP_IN,
  VIRTUAL_YOGA,
  PRIVATE_YOGA,
  YOGA_AT_HOME,
  SOUND_SESSIONS,
  SOUND_LEVEL_1,
  SOUND_LEVEL_2,
  WEIGHT_LOSS_BOOTCAMP,
  CORPORATE_YOGA,
  YOGA_TREKKING,
  YOGA_THERAPY,
  REIKI_HEALING,
  DIET_CONSULTATION,
  PRENATAL,
  CHILDRENS_YOGA,
  SENIOR_YOGA,
  SCHOOL_YOGA,
} satisfies Record<string, ServiceConfig>;

export type ServiceConfigKey = keyof typeof SERVICE_CONFIGS;
