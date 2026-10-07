// Share-preview text (the title and blurb shown when a page link is pasted into
// WhatsApp, Facebook, Google, etc.).
//
// These are the built-in defaults. The admin's SEO / Share Preview screen saves
// overrides on top of them, so the client can change what a shared link says
// without a code change — previously this text existed only here and the admin
// screen that appeared to edit it saved nothing.

export type SharePage = {
  path: string;
  label: string;
  title: string;
  description: string;
  /** Optional custom preview image; blank uses the site-wide default. */
  image?: string;
};

export const SHARE_PAGES: SharePage[] = [
  {
    path: "/",
    label: "Homepage",
    title: "Yogmandu | Yoga Classes, Sound Healing & Teacher Training in Kathmandu",
    description: "Daily yoga classes, Tibetan sound healing and Yoga Alliance certified teacher training in Baneshwor, Kathmandu. Beginners welcome, since 2018.",
  },
  {
    path: "/about",
    label: "/about",
    title: "About Yogmandu | Nepal's First Yoga Alliance Registered School",
    description: "Founded 2018 by Yogi Arjuna Rakhal and Dr. Chintamani Gautam. ERYT 500, PhD Yogic Science. 3,000+ teachers from 50+ countries. Kathmandu, Nepal.",
  },
  {
    path: "/blog",
    label: "/blog",
    title: "Yoga Blog \u2014 Philosophy, Breathwork & Sound Healing | Yogmandu Nepal",
    description: "Articles on yoga philosophy, pranayama, sound healing, teacher training and practising in Kathmandu, from the Yogmandu teaching team in Nepal.",
  },
  {
    path: "/class-schedule",
    label: "/class-schedule",
    title: "Yoga Class Schedule Kathmandu | Daily Classes at Yogmandu",
    description: "Hatha, Vinyasa, Ashtanga, Yin, Pranayama, Meditation & Sound Healing \u2014 7 days a week in Kathmandu. All levels welcome.",
  },
  {
    path: "/class-schedule/drop-in",
    label: "/class-schedule/drop-in",
    title: "Drop-In Yoga Classes Kathmandu | Yogmandu",
    description: "No membership needed \u2014 join any class on our weekly timetable. From NPR 600 per class in Mid-Baneshwor, Kathmandu.",
  },
  {
    path: "/class-schedule/home",
    label: "/class-schedule/home",
    title: "Yoga at Home Kathmandu | Yogmandu",
    description: "A Yogmandu teacher comes to your home anywhere in and around Kathmandu — private one-to-one or family yoga in your own space, by appointment.",
  },
  {
    path: "/class-schedule/private",
    label: "/class-schedule/private",
    title: "Private Yoga Classes Kathmandu | Yogmandu",
    description: "One-to-one yoga tailored to you \u2014 faster progress with a teacher's full attention. Studio or your location.",
  },
  {
    path: "/class-schedule/virtual",
    label: "/class-schedule/virtual",
    title: "Virtual Live Yoga Online | Yogmandu Nepal",
    description: "Practise live with our Himalayan teachers from home. Real-time, interactive classes from NPR 500.",
  },
  {
    path: "/contact",
    label: "/contact",
    title: "Contact Yogmandu | Book Yoga & Sound Healing in Kathmandu",
    description: "WhatsApp +977-9810263277 \u00b7 yogmandu@gmail.com \u00b7 Miteri Marg, Mid-Baneshwor-31, Kathmandu, Nepal.",
  },
  {
    path: "/gallery",
    label: "/gallery",
    title: "Gallery | Yoga & Sound Healing in Kathmandu \u2014 Yogmandu",
    description: "Photos from yoga classes, Tibetan singing bowl sessions, and teacher training at Yogmandu Kathmandu.",
  },
  {
    path: "/gallery/all",
    label: "/gallery/all",
    title: "All Photos | Yogmandu Gallery",
    description: "Photos from yoga classes, Tibetan singing bowl sessions, teacher training graduations and retreats at Yogmandu in Kathmandu, Nepal.",
  },
  {
    path: "/services",
    label: "/services",
    title: "All Yogmandu Services \u2014 Yoga, Sound Healing, Therapy, Retreats",
    description: "The full range of Yogmandu programs: drop-in classes, virtual live yoga, retreats, corporate yoga, yoga therapy, sound healing, diet consultation, and more.",
  },
  {
    path: "/sound-healing-therapy",
    label: "/sound-healing-therapy",
    title: "Sound Healing Therapy Nepal \u2014 Tibetan Singing Bowls | Yogmandu",
    description: "Authentic Tibetan singing bowl sessions in Kathmandu. Individual USD 20 \u00b7 Group USD 10/person \u00b7 Level I & II certification. Book on WhatsApp.",
  },
  {
    path: "/sound-healing-therapy/course-level-1",
    label: "/sound-healing-therapy/course-level-1",
    title: "Sound Healing Certification Level I, Nepal | Yogmandu",
    description: "Level I foundational sound healing certification in Kathmandu, Nepal. 20 hours of Tibetan singing bowl history, technique and session basics.",
  },
  {
    path: "/sound-healing-therapy/course-level-2",
    label: "/sound-healing-therapy/course-level-2",
    title: "Sound Healing Course \u2014 Level II | Yogmandu",
    description: "The advanced course in professional sound healing facilitation. Internationally recognised certificate.",
  },
  {
    path: "/sound-healing-therapy/sessions",
    label: "/sound-healing-therapy/sessions",
    title: "Sound Healing Sessions Kathmandu | Yogmandu",
    description: "Restorative Tibetan singing bowl sound baths in Kathmandu, Nepal. Individual or group sessions, no experience needed. From NPR 2,500.",
  },
  {
    path: "/specialized-yoga",
    label: "/specialized-yoga",
    title: "Specialized Yoga \u2014 Prenatal, Kids, Seniors, Schools | Yogmandu",
    description: "Yoga for every stage of life: expecting mothers, children, seniors and schools. Kathmandu, Nepal.",
  },
  {
    path: "/specialized-yoga/childrens-yoga",
    label: "/specialized-yoga/childrens-yoga",
    title: "Children's Yoga Kathmandu | Yogmandu",
    description: "Playful, story-led yoga classes for children in Kathmandu — building strength, balance, confidence and focus through playful movement and calm.",
  },
  {
    path: "/specialized-yoga/prenatal",
    label: "/specialized-yoga/prenatal",
    title: "Prenatal & Postnatal Yoga Kathmandu | Yogmandu",
    description: "Gentle, trimester-safe yoga to support you through pregnancy and recovery, guided every step of the way.",
  },
  {
    path: "/specialized-yoga/school-yoga",
    label: "/specialized-yoga/school-yoga",
    title: "School Yoga Programs Kathmandu | Yogmandu",
    description: "Curriculum-friendly yoga for students and staff, delivered at your school in Kathmandu. Builds focus, wellbeing and resilience, with flexible scheduling.",
  },
  {
    path: "/specialized-yoga/senior-yoga",
    label: "/specialized-yoga/senior-yoga",
    title: "Senior Citizens' Yoga Kathmandu | Yogmandu",
    description: "Gentle, low-impact yoga for older adults in Kathmandu — improve balance, mobility and strength at your own pace, with chair-supported options available.",
  },
  {
    path: "/therapy-wellness",
    label: "/therapy-wellness",
    title: "Therapy & Wellness \u2014 Yoga Therapy, Reiki, Diet | Yogmandu",
    description: "One-to-one yoga therapy, Reiki healing and personalised diet consultation in Kathmandu, Nepal. Individual support for pain, stress and wellbeing.",
  },
  {
    path: "/therapy-wellness/diet-consultation",
    label: "/therapy-wellness/diet-consultation",
    title: "Diet Consultation Kathmandu | Yogmandu",
    description: "Eat in a way that suits your body \u2014 personalised, Ayurvedic-informed nutrition guidance you can sustain.",
  },
  {
    path: "/therapy-wellness/reiki-healing",
    label: "/therapy-wellness/reiki-healing",
    title: "Reiki Healing Kathmandu | Yogmandu",
    description: "A gentle energy-healing practice for deep relaxation and balance. Non-invasive and restorative.",
  },
  {
    path: "/therapy-wellness/yoga-therapy",
    label: "/therapy-wellness/yoga-therapy",
    title: "Yoga Therapy Kathmandu | Yogmandu",
    description: "Yoga applied with precision to your body \u2014 a therapeutic, one-to-one approach to pain, stress and recovery.",
  },
  {
    path: "/yoga-for-beginners",
    label: "/yoga-for-beginners",
    title: "Yoga for Beginners in Kathmandu | Start Your Practice \u2014 Yogmandu",
    description: "Beginner-friendly yoga in Kathmandu, Nepal. Gentle Hatha, pranayama and meditation. No experience or flexibility required \u2014 all levels welcome.",
  },
  {
    path: "/yoga-retreat-nepal",
    label: "/yoga-retreat-nepal",
    title: "Yoga Retreat in Nepal | Kathmandu & the Himalayas \u2014 Yogmandu",
    description: "A yoga retreat in the home of the lineage \u2014 daily practice, Tibetan sound healing, meditation and Himalayan culture. Tailored retreats in Nepal with Yogmandu.",
  },
  {
    path: "/yoga-retreat-nepal/corporate-yoga",
    label: "/yoga-retreat-nepal/corporate-yoga",
    title: "Corporate Yoga Kathmandu | Yogmandu",
    description: "Calmer, healthier, more focused teams. On-site or virtual workplace yoga tailored to your company.",
  },
  {
    path: "/yoga-retreat-nepal/weight-loss-bootcamp",
    label: "/yoga-retreat-nepal/weight-loss-bootcamp",
    title: "Weight-Loss Yoga Bootcamp Kathmandu | Yogmandu",
    description: "Dynamic yoga + mindful nutrition for a sustainable reset. Guided, progressive, and beginner-friendly.",
  },
  {
    path: "/yoga-retreat-nepal/yoga-trekking",
    label: "/yoga-retreat-nepal/yoga-trekking",
    title: "Yoga Trekking Nepal | Yogmandu",
    description: "Trek the Himalayas by day, practise yoga amid the mountains. Small groups, unforgettable journeys.",
  },
  {
    path: "/yoga-teacher-training",
    label: "/yoga-teacher-training",
    title: "200hr Yoga Teacher Training Nepal | Yogmandu",
    description: "Yoga Alliance RYS 200 certified. Residential USD 1,400 \u00b7 Non-residential USD 600. 2026 batches: June, July, August. Kathmandu, Nepal.",
  },
  {
    path: "/yoga-teacher-training/300-hour",
    label: "/yoga-teacher-training/300-hour",
    title: "300-Hour Advanced Yoga Teacher Training Nepal | Yogmandu",
    description: "Yoga Alliance RYS 300 advanced yoga teacher training in Kathmandu, Nepal. For certified 200hr teachers: advanced asana, pranayama, philosophy and anatomy.",
  },
  {
    path: "/yoga-teacher-training/500-hour",
    label: "/yoga-teacher-training/500-hour",
    title: "500-Hour Yoga Teacher Training Nepal | Yogmandu",
    description: "Yoga Alliance RYS 500 \u00b7 45-day advanced immersion in Kathmandu, Nepal. The highest level of yoga certification.",
  },
  {
    path: "/yoga-teacher-training/commuter",
    label: "/yoga-teacher-training/commuter",
    title: "Non-Residential 200hr Yoga Teacher Training Nepal | Yogmandu",
    description: "Non-residential 200-hour Yoga Teacher Training in Kathmandu, Nepal. Train by day, stay in your own accommodation. Yoga Alliance RYT 200 from USD 600.",
  },
  {
    path: "/yoga-teacher-training/online",
    label: "/yoga-teacher-training/online",
    title: "Online 200hr Yoga Teacher Training \u2014 Live Virtual | Yogmandu",
    description: "Earn your Yoga Alliance RYT 200 online with live real-time classes taught from Kathmandu — not recordings. USD 500, same certificate as on-site.",
  },
  {
    path: "/events",
    label: "/events",
    title: "Yoga Events & Workshops in Kathmandu | Yogmandu",
    description: "Upcoming yoga workshops, sound healing evenings, meditation courses and retreats at Yogmandu in Kathmandu, Nepal.",
  },
  {
    path: "/yoga-teacher-training/residential",
    label: "/yoga-teacher-training/residential",
    title: "Residential 200hr Yoga Teacher Training Nepal | Yogmandu",
    description: "Live-in 200-hour Yoga Teacher Training in Kathmandu, Nepal. Yoga Alliance RYT 200 with accommodation and all organic meals included. From USD 1,400.",
  },
];

/** Built-in share text for a route, if we have one. */
export function defaultShareFor(path: string): SharePage | undefined {
  return SHARE_PAGES.find((p) => p.path === path);
}
