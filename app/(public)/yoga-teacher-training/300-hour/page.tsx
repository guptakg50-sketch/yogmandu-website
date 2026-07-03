import type { Metadata } from "next";
import CourseProgram from "../CourseProgram";
import type { CourseConfig } from "../CourseProgram";

export const metadata: Metadata = {
  title: { absolute: "300-Hour Advanced Yoga Teacher Training in Nepal — RYS 300 | Yogmandu" },
  description:
    "Yoga Alliance RYS 300 advanced yoga teacher training in Kathmandu, Nepal. The next step for certified 200hr teachers — advanced asana, pranayama, philosophy, anatomy & teaching methodology. Combine with your 200hr for RYT 500.",
  keywords: [
    "300 hour yoga teacher training Nepal",
    "advanced yoga teacher training Kathmandu",
    "RYS 300 Nepal",
    "300hr YTT Nepal",
    "yoga alliance 300 hour certification",
    "RYT 500 pathway",
  ],
  alternates: { canonical: "https://yogmandu.com/yoga-teacher-training/300-hour" },
  openGraph: {
    title: "300-Hour Advanced Yoga Teacher Training Nepal | Yogmandu",
    description: "Yoga Alliance RYS 300 · advanced training in Kathmandu for certified 200hr teachers. Path to RYT 500.",
    url: "https://yogmandu.com/yoga-teacher-training/300-hour",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    title: "300-Hour Advanced Yoga Teacher Training Nepal | Yogmandu",
    description: "Yoga Alliance RYS 300 · advanced training in Kathmandu for certified 200hr teachers.",
  },
};

const config: CourseConfig = {
  hours:       "300",
  eyebrow:     "Yoga Alliance RYS 300",
  heroTitleA:  "Deepen your practice &",
  heroTitleEm: "advance your teaching",
  heroLead:    "The next step for certified 200-hour teachers — advanced asana, pranayama, philosophy, anatomy and refined teaching methodology. Combine your 200hr and 300hr to qualify for Yoga Alliance RYT 500.",
  duration:    "30 days",
  startInfo:   "Monthly intakes",

  overviewHeading: "Take your teaching to the next level",
  overviewBody: [
    "Our Yoga Alliance-certified 300-Hour Advanced Yoga Teacher Training is designed for graduates of a 200-hour program who want to refine their practice and teaching. It builds on your foundation with advanced asana, deeper pranayama and philosophy, applied anatomy and confident classroom leadership.",
    "Across an immersive month in Kathmandu you'll expand your repertoire, sharpen your sequencing and adjustments, and develop the presence to teach at every level — guided personally in small groups by our senior faculty.",
    "On completion you'll receive a 300-hour certificate registered under Yoga Alliance US. Combined with your existing 200-hour certification, this qualifies you to register as an RYT 500.",
  ],
  designedTo: [
    "Extend your knowledge in advanced asana, pranayama and subtle energy",
    "Refine your approach to sequencing, adjustments and mentorship",
    "Deepen your study of yogic philosophy and applied anatomy",
    "Immerse you in authentic Himalayan teachings and traditions",
    "Maintain small class sizes for personalised guidance and feedback",
  ],
  whoCanJoin: [
    "Certified 200-hour yoga teachers ready to advance to RYT 500",
    "Practitioners seeking a deeper, more advanced immersion in yoga",
    "Teachers who want to refine sequencing, adjustments and mentorship",
  ],
  highlights: [
    "Advanced postures and advanced breathing techniques",
    "Deeper sequencing and teaching methodology",
    "Asana and pranayama according to the ancient scriptures",
    "Patanjali's Yoga Sutras and Hatha yoga philosophy",
    "Techniques and forms of meditation",
    "Stages of the mind and meditativeness",
    "Anatomy and physiology in yoga",
    "Create, prepare and deliver high-quality yoga workshops",
    "Small batch sizes for interactive, engaging learning",
    "Safety and guidelines of yogic practices",
    "Interactive Q&A sessions",
    "Personalised yoga and lifestyle consultation",
    "Career counselling and mentorship",
    "Satsang — the company of truth",
  ],
  objectives: [
    "Build the confidence and skill of an advanced teacher within you",
    "Refine adjustment and modification skills while conducting class",
    "Master sequencing for all levels of practitioners",
    "Balance the demands of leading individual, small and large classes",
    "Provide high-level knowledge of yogic philosophy",
    "Understand how anatomy and yoga relate to each other",
    "Give ample opportunities to apply your learning as a teacher",
    "Practise advanced asanas with safety and precautions",
    "Learn advanced pranayama and how it builds energy and controls the mind",
    "Deepen your love for yoga and your commitment to teaching it",
  ],
  curriculum: [
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
  ],
  evaluation: [
    {
      title: "Assessment Preparation",
      points: [
        "Workshops on advanced teaching methodology",
        "Small-group work to enhance teaching qualities",
        "Prepare and lead full asana & pranayama classes",
        "Feedback from both students and teachers to build confidence",
      ],
    },
    {
      title: "Assessment Evaluation",
      points: [
        "Each student is evaluated against course criteria (mainly practical)",
        "Minimum 90% attendance; lesson prep, practicum & sequencing",
        "Alignment, adjustments, relaxation, communication & philosophy",
        "Constructive feedback from teachers and peers; re-assessment if unprepared",
      ],
    },
  ],
  ceremony: [
    { title: "Physical Graduation", body: "Complete the 108 Sun Salutations — suggested only for those without any physical injury or illness." },
    { title: "Academic Graduation", body: "Receive your 300-hour certificate, recognised by the US Yoga Alliance. Combined with your 200hr, it qualifies you to register as an RYT 500." },
    { title: "Spiritual Graduation", body: "Take part in a traditional fire ceremony in ceremonial dress — a spiritual oath to live a yogic life and teach authentic yoga." },
  ],
  certValue:
    "As a Yoga Alliance Registered School, our 300-hour advanced training is accredited by the US Yoga Alliance. On completing the course, you receive a 300-hour certificate which — combined with your existing 200-hour certification — qualifies you to register as an RYT 500 and gain global recognition as a Certified Yoga Teacher.",
  schedule: [
    {
      label: "Morning",
      rows: [
        { time: "6:30 – 7:00",  activity: "Meditation & Chanting" },
        { time: "7:00 – 7:15",  activity: "Jala Neti & Tea" },
        { time: "7:15 – 8:00",  activity: "Pranayama (breathing practice)" },
        { time: "8:15 – 9:30",  activity: "Asana practice" },
        { time: "9:30 – 10:30", activity: "Breakfast & rest" },
      ],
    },
    {
      label: "Midday",
      rows: [
        { time: "10:30 – 1:00", activity: "Philosophy / Anatomy lecture" },
        { time: "1:00 – 2:00",  activity: "Lunch" },
        { time: "2:00 – 3:00",  activity: "Self study & rest" },
      ],
    },
    {
      label: "Afternoon",
      rows: [
        { time: "3:00 – 4:45",  activity: "Teaching methodology / Workshop" },
        { time: "5:00 – 6:30",  activity: "Asana & alignment practice" },
        { time: "6:30 – 7:30",  activity: "Dinner" },
        { time: "7:30 – 9:00",  activity: "Self study" },
      ],
    },
  ],
  pricingIntro:
    "The 300-hour advanced training is for teachers who have completed a 200-hour YTT. Fees depend on your chosen dates and accommodation — reach out and we'll share current pricing and the next available intakes.",
  contactPricing: true,
  faqs: [
    { q: "Do I need to have completed a 200-hour training first?", a: "Yes. The 300-hour is an advanced program for graduates of a 200-hour YTT. Together they qualify you for Yoga Alliance RYT 500." },
    { q: "Does the 300hr on its own make me an RYT 500?", a: "The RYT 500 designation requires both a 200-hour and a 300-hour qualification. Once you complete the 300hr with your existing 200hr, you can register as an RYT 500." },
    { q: "I have certain food allergies. Can my meals be adjusted accordingly?", a: "Yes. Please inform us about your allergies and we'll ensure your meals are prepared accordingly." },
    { q: "Will I have free time?", a: "Yes. You'll have free time daily plus one day off each week (typically Sunday) to rest and explore." },
    { q: "Will I get the opportunity to teach during the course?", a: "Absolutely. Supervised teaching practice is central to the course; you'll teach peers and receive feedback from teachers and fellow students." },
  ],
  siblingLinks: [
    { href: "/yoga-teacher-training",          label: "200hr Teacher Training" },
    { href: "/yoga-teacher-training/500-hour",  label: "500hr Master Training" },
    { href: "/sound-healing-therapy",           label: "Sound Healing Course" },
  ],
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "300-Hour Advanced Yoga Teacher Training in Nepal",
  description:
    "Yoga Alliance certified 300hr advanced yoga teacher training in Kathmandu, Nepal — advanced asana, pranayama, philosophy, anatomy and teaching methodology for certified 200hr teachers.",
  provider: { "@type": "Organization", name: "Yogmandu", sameAs: "https://yogmandu.com" },
  courseMode: "onsite",
  location: {
    "@type": "Place",
    name: "Yogmandu",
    address: { "@type": "PostalAddress", streetAddress: "Miteri Marg, Mid-Baneshwor-31", addressLocality: "Kathmandu", addressCountry: "NP" },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: config.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "Yoga Teacher Training", item: "https://yogmandu.com/yoga-teacher-training" },
    { "@type": "ListItem", position: 3, name: "300-Hour", item: "https://yogmandu.com/yoga-teacher-training/300-hour" },
  ],
};

export default function ThreeHundredHourPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CourseProgram config={config} />
    </>
  );
}
