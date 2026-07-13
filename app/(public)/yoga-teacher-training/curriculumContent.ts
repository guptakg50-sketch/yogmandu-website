// Curriculum module lists for the teacher-training pages, keyed per page so
// each can be overridden from Admin → Page Content (see lib/pageContent.ts).
// The 200-hour formats share defaults (hub/residential and commuter/online),
// but each page has its own key so the admin can edit them independently.

export type CurriculumModule = {
  title: string;
  icon?: string; // only used by the 300/500-hour card style
  color: string;
  items: string[];
};

export type Curriculum = { modules: CurriculumModule[] };

const TWO_HUNDRED_CAMPUS_MODULES: CurriculumModule[] = [
  {
    title: "Techniques & Practice",
    color: "#6B2D8B",
    items: [
      "Prayer & mantra chanting",
      "Sukshma vyayama & asanas",
      "Pranayama, bandha & shatkarma",
      "Mudras, yoga nidra & meditation",
      "Alignment & safety guidelines",
    ],
  },
  {
    title: "Teaching Methodology",
    color: "#F7941D",
    items: [
      "Group dynamics & time management",
      "Demonstration principles",
      "Verbal cueing & observation",
      "Correction techniques",
      "Teacher qualities & ethics",
    ],
  },
  {
    title: "Anatomy & Physiology",
    color: "#8DC63F",
    items: [
      "Human body systems",
      "Bones, joints & muscles",
      "Spiritual anatomy: chakras & nadis",
      "Kundalini & pancha kosha",
      "Yoga therapy foundations",
    ],
  },
  {
    title: "Philosophy & Ethics",
    color: "#6B2D8B",
    items: [
      "History of yoga",
      "Patanjali Yoga Sutras",
      "Karma, bhakti & jnana yoga",
      "Mantra yoga & Sanskrit",
      "Ashtanga — the eight limbs",
    ],
  },
  {
    title: "Yogic Diet & Nutrition",
    color: "#F7941D",
    items: [
      "What is food?",
      "Modern Nutrition",
      "Ayurvedic Nutrition",
      "Naturopathic Nutrition",
      "Yogic Diet and Nutrition",
      "Sattvic, Rajasic and Tamasic Food",
    ],
  },
];

const TWO_HUNDRED_LIVE_MODULES: CurriculumModule[] = [
  {
    title: "Techniques & Practice",
    color: "#6B2D8B",
    items: [
      "Prayer & mantra chanting",
      "Sukshma vyayama, warm-ups & sun salutation",
      "Asanas, bandha & pranayama",
      "Shatkarma & mudras",
      "Yoga nidra, meditation, alignment & safety",
    ],
  },
  {
    title: "Teaching Methodology",
    color: "#F7941D",
    items: [
      "Group dynamics & time management",
      "Principles of demonstration",
      "Verbal cueing & observation",
      "Correction techniques",
      "Qualities of a good teacher",
    ],
  },
  {
    title: "Anatomy & Physiology",
    color: "#8DC63F",
    items: [
      "Constituents of the human body",
      "Bones, joints & muscles",
      "Human body systems",
      "Spiritual anatomy: chakras & nadis",
      "Kundalini & pancha kosha",
    ],
  },
  {
    title: "Philosophy, Lifestyle & Ethics",
    color: "#6B2D8B",
    items: [
      "Meaning & history of yoga",
      "Patanjali Yoga Sutras",
      "Forms of yoga",
      "Karma, bhakti & mantra yoga",
      "Jnana yoga",
    ],
  },
  {
    title: "Yogic Diet & Nutrition",
    color: "#F7941D",
    items: [
      "What is food?",
      "Modern Nutrition",
      "Ayurvedic Nutrition",
      "Naturopathic Nutrition",
      "Yogic Diet and Nutrition",
      "Sattvic, Rajasic and Tamasic Food",
    ],
  },
];

const YOGIC_DIET_ADVANCED: CurriculumModule = {
  title: "Yogic Diet & Nutrition",
  icon: "🥗",
  color: "#8DC63F",
  items: [
    "What is food?",
    "Modern Nutrition",
    "Ayurvedic Nutrition",
    "Naturopathic Nutrition",
    "Yogic Diet and Nutrition",
    "Sattvic, Rajasic and Tamasic Food",
  ],
};

const HOUR_300_MODULES: CurriculumModule[] = [
  {
    title: "Philosophy", icon: "📜", color: "#6B2D8B",
    items: [
      "Advanced yoga philosophy & Patanjali's Yoga Sutras",
      "Deep study of Ashtanga & Hatha traditions",
      "Overview of Bhakti, Gyana, Karma, Mantra & Kundalini yoga",
      "Lifestyle and ethics of a yoga teacher",
      "Yogic philosophy from the classical scriptures",
    ],
  },
  YOGIC_DIET_ADVANCED,
  {
    title: "Teaching Methodology", icon: "🎓", color: "#F7941D",
    items: [
      "Advanced principles of creating sequences",
      "Sequences for intermediate, advanced & peak pose",
      "Vinyasa flow sequencing",
      "Teach and lead workshops; teach classes and receive feedback",
      "Hands-on adjustments, verbal cues & effective assistance",
      "Class setup, observation, assisting and correction",
    ],
  },
  {
    title: "Asana Practice", icon: "🧘", color: "#8DC63F",
    items: [
      "Workshops on advanced and special postures",
      "Proper alignment to prevent injuries",
      "Hatha, Ashtanga, Vinyasa, Power and Yin styles",
      "Modifications, variations, applied anatomy & precautions",
      "Individual support to improve advanced asanas",
    ],
  },
  {
    title: "Pranayama & Meditation", icon: "🌬", color: "#6B2D8B",
    items: [
      "Advanced pranayama and its link to yogic philosophy",
      "Teaching methodology for pranayama class",
      "Panchakosha and prana shakti",
      "Yoga Nidra, mindfulness and mantra meditation",
      "Chakra and Vipassana meditation",
    ],
  },
  {
    title: "Anatomy", icon: "🦴", color: "#F7941D",
    items: [
      "Musculoskeletal system and its relation to asana",
      "Focus on the spine, its movement & health",
      "Common areas of injury and their prevention",
      "Contraindications under specific conditions",
      "Spiritual anatomy: Nadis, Chakras and Koshas",
    ],
  },
];

const HOUR_500_MODULES: CurriculumModule[] = [
  {
    title: "Philosophy", icon: "📜", color: "#6B2D8B",
    items: [
      "Wisdom of yoga: history, philosophy, and dhyan, mudra & bandha",
      "Traditional vs modern yoga; deep study of Ashtanga & Hatha",
      "Overview of Bhakti, Gyana, Karma, Mantra & Kundalini yoga",
      "Satkarma — the six cleansing techniques of Hatha yoga",
      "Classical yoga philosophy & Patanjali's Yoga Sutras",
      "Lifestyle and ethics of a yoga teacher",
      "Badhak Tattva (obstacles) & Sadhak Tattva (supporting elements)",
      "Yogic philosophy from other scriptures",
    ],
  },
  YOGIC_DIET_ADVANCED,
  {
    title: "Teaching Methodology", icon: "🎓", color: "#F7941D",
    items: [
      "Principles and guidelines of creating sequences",
      "Sequences for beginner, intermediate & advanced levels",
      "Sequences for peak pose and Vinyasa flow",
      "Teach and lead workshops; teach classes and receive feedback",
      "Teaching diverse levels, needs and age groups",
      "Voice, language and instructional techniques",
      "Demonstration, hands-on adjustments, verbal cues & assistance",
      "Class setup, observation, assisting and correction",
      "Conscious interaction, engagement and body language",
    ],
  },
  {
    title: "Asana Practice", icon: "🧘", color: "#8DC63F",
    items: [
      "Workshops on advanced and special postures",
      "Learning new and advanced asanas",
      "Proper alignment to prevent injuries",
      "Asana practice twice a day for full immersion",
      "Hatha, Ashtanga, Vinyasa, Power and Yin styles",
      "Modifications, variations, applied anatomy & precautions",
      "Individual support to improve advanced asanas",
    ],
  },
  {
    title: "Pranayama Practice", icon: "🌬", color: "#6B2D8B",
    items: [
      "Teaching various pranayama techniques",
      "Extended time on individual techniques for depth",
      "Advanced pranayama and its link to yogic philosophy",
      "Teaching methodology for pranayama class",
      "Daily advanced pranayama classes",
      "Panchakosha and prana shakti",
      "Importance & benefits of pranayama",
    ],
  },
  {
    title: "Meditation", icon: "🕉", color: "#F7941D",
    items: [
      "Yoga Nidra — meditative yogic sleep",
      "Stages of mind & meditativeness",
      "Seated guided meditation & mindfulness",
      "Mantra and candle-gazing (Trataka) meditation",
      "Chakra and Vipassana meditation",
    ],
  },
  {
    title: "Anatomy", icon: "🦴", color: "#8DC63F",
    items: [
      "Musculoskeletal system and its relation to asana",
      "Focus on the spine and its movement & health",
      "Common areas of injury and their prevention",
      "Contraindications under specific conditions",
      "Spiritual anatomy: Nadis, Chakras and Koshas",
    ],
  },
];

export const CURRICULA = {
  YTT_HUB:     { modules: TWO_HUNDRED_CAMPUS_MODULES },
  RESIDENTIAL: { modules: TWO_HUNDRED_CAMPUS_MODULES },
  COMMUTER:    { modules: TWO_HUNDRED_LIVE_MODULES },
  ONLINE:      { modules: TWO_HUNDRED_LIVE_MODULES },
  HOUR_300:    { modules: HOUR_300_MODULES },
  HOUR_500:    { modules: HOUR_500_MODULES },
} satisfies Record<string, Curriculum>;

export type CurriculumKey = keyof typeof CURRICULA;
