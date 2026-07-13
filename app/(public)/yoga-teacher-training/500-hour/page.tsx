import type { Metadata } from "next";
import CourseProgram from "../CourseProgram";
import { getCurriculum } from "@/lib/pageContent";

// Curriculum modules are admin-editable (defaults in curriculumContent.ts).
export const revalidate = 60;
import type { CourseConfig } from "../CourseProgram";

export const metadata: Metadata = {
  title: { absolute: "500-Hour Yoga Teacher Training in Nepal — RYS 500 | Yogmandu" },
  description:
    "Yoga Alliance RYS 500 advanced yoga teacher training in Kathmandu, Nepal. A 45-day immersion in advanced asana, pranayama, meditation, philosophy & healing — the highest level of yoga certification.",
  keywords: [
    "500 hour yoga teacher training Nepal",
    "advanced yoga teacher training Kathmandu",
    "RYT 500 Nepal",
    "yoga alliance 500 hour certification",
    "master yoga teacher training",
    "500hr YTTC Nepal",
  ],
  alternates: { canonical: "https://yogmandu.com/yoga-teacher-training/500-hour" },
  openGraph: {
    title: "500-Hour Yoga Teacher Training Nepal | Yogmandu",
    description: "Yoga Alliance RYS 500 · 45-day advanced immersion in Kathmandu, Nepal. The highest level of yoga certification.",
    url: "https://yogmandu.com/yoga-teacher-training/500-hour",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    title: "500-Hour Yoga Teacher Training Nepal | Yogmandu",
    description: "Yoga Alliance RYS 500 · 45-day advanced immersion in Kathmandu, Nepal.",
  },
};

const config: Omit<CourseConfig, "curriculum"> = {
  hours:       "500",
  eyebrow:     "Yoga Alliance RYS 500",
  heroTitleA:  "Achieve the highest level of",
  heroTitleEm: "yoga certification",
  heroLead:    "Deepen your expertise in advanced asana, pranayama, meditation and the philosophy, science & healing of yoga — and step into the highest level of professional teaching.",
  duration:    "45 days",
  startInfo:   "Starts on the 15th of every month",

  overviewHeading: "Master the art of yoga & elevate your teaching",
  overviewBody: [
    "Guided by experienced yoga masters, our Yoga Alliance-certified 500-Hour Yoga Teacher Training is the ultimate journey for dedicated practitioners and teachers. This intensive program integrates advanced asana, pranayama, meditation, philosophy and healing applications, empowering you to teach at the highest professional level.",
    "Over 45 days you'll embark on a deep, holistic immersion into yoga — refining your personal practice while mastering advanced teaching methodologies, and building the confidence, knowledge and skills to train others as a highly qualified teacher and mentor.",
    "On completion you'll receive a 500-hour Yoga Teacher Certification registered under Yoga Alliance US, enabling you to teach at all levels worldwide and to run your own teacher-training programs.",
  ],
  designedTo: [
    "Provide a complete, in-depth yoga education for those seeking mastery",
    "Offer advanced knowledge in pranayama, subtle energy, meditation and philosophy",
    "Develop a refined approach to sequencing, adjustments and student mentorship",
    "Immerse you in authentic Himalayan teachings and yogic traditions",
    "Maintain small class sizes for personalised guidance and feedback",
  ],
  whoCanJoin: [
    "Aspiring yoga trainers looking to lead their own teacher-training programs",
    "Dedicated practitioners seeking full immersion in yoga's philosophy and techniques",
    "Holistic healers interested in the healing applications of yoga",
  ],
  highlights: [
    "Classical knowledge and history of yoga",
    "Traditional understanding of yoga practice",
    "Theoretical and practical skill enhancement",
    "Advanced postures and advanced breathing techniques",
    "Sequencing and teaching methodology",
    "Asana and pranayama according to the ancient scriptures",
    "Unique, well-structured yoga teaching techniques",
    "Small batch sizes for interactive, engaging learning",
    "Create, prepare and deliver high-quality yoga workshops",
    "Anatomy and physiology in yoga",
    "Patanjali's Yoga Sutras and Hatha yoga philosophy",
    "Techniques and forms of meditation",
    "Stages of the mind and meditativeness",
    "Safety and guidelines of yogic practices",
    "Interactive Q&A sessions",
    "Personalised yoga and lifestyle consultation",
    "Career counselling",
    "Satsang — the company of truth",
  ],
  objectives: [
    "Develop confidence and create a skilful teacher within you",
    "Equip you with adjustment and modification skills while conducting class",
    "Make you skilful at sequencing for all levels of practitioners",
    "Learn the best method for an authentic, balanced practice",
    "Balance the demands of leading individual, small and large classes",
    "Provide high-level knowledge of yogic philosophy",
    "Understand how anatomy and yoga relate to each other",
    "Give ample opportunities to apply your learning as a teacher",
    "Inculcate the yogic life within you",
    "Practise advanced asanas with safety and precautions",
    "Learn advanced pranayama and how it builds energy and controls the mind",
    "Understand your body type and create a suitable practice for yourself",
    "Create a joyful, accepting environment that deepens your love for yoga",
  ],
  evaluation: [
    {
      title: "Assessment Preparation",
      points: [
        "Numerous workshops on teaching methodology",
        "Small-group work to enhance teaching qualities",
        "Spontaneous teaching of any mantra, pranayama or asana",
        "Prepare and lead full asana & pranayama classes",
        "Feedback from both students and teachers to build confidence",
      ],
    },
    {
      title: "Assessment Evaluation",
      points: [
        "Each student is evaluated against a set of course criteria (mainly practical)",
        "Minimum 90% attendance; lesson prep, practicum & sequencing",
        "Alignment, verbal & physical adjustments, counter poses, relaxation",
        "Modification, communication, chanting, workshop technique & philosophy",
        "Constructive feedback from teachers and peers; re-assessment if unprepared",
      ],
    },
  ],
  ceremony: [
    { title: "Physical Graduation", body: "Complete the 108 Sun Salutations — suggested only for those without any physical injury or illness." },
    { title: "Academic Graduation", body: "Receive your certificate of completion, recognised by the US Yoga Alliance, making you an internationally Certified Yoga Teacher eligible to register with any Yoga Alliance." },
    { title: "Spiritual Graduation", body: "Take part in a traditional fire ceremony in ceremonial dress — a spiritual oath to live a yogic life and teach authentic yoga." },
  ],
  certValue:
    "As a Yoga Alliance Registered School, our 500-hour advanced yoga teacher training is accredited by the US Yoga Alliance. On successfully completing the course and passing the assessment, you're awarded two certificates — one for the 200-hour YTT and one for the advanced 300-hour YTT — qualifying you to register as an RYT 500 with any Yoga Alliance and gain global recognition as a Certified Yoga Teacher.",
  schedule: [
    {
      label: "Morning",
      rows: [
        { time: "6:30 – 7:00",  activity: "Meditation & Chanting" },
        { time: "7:00 – 7:15",  activity: "Jala Neti & Tea" },
        { time: "7:15 – 8:00",  activity: "Pranayama (breathing practice)" },
        { time: "8:00 – 8:15",  activity: "Tea break" },
        { time: "8:15 – 9:30",  activity: "Asana practice" },
        { time: "9:30 – 11:30", activity: "Breakfast & rest" },
      ],
    },
    {
      label: "Midday",
      rows: [
        { time: "11:30 – 1:00", activity: "Philosophy / Anatomy lecture" },
        { time: "1:00 – 2:00",  activity: "Lunch" },
        { time: "2:00 – 3:00",  activity: "Self study & rest" },
      ],
    },
    {
      label: "Afternoon",
      rows: [
        { time: "3:00 – 4:30",  activity: "Teaching methodology / Workshop" },
        { time: "4:30 – 4:45",  activity: "Tea break" },
        { time: "4:45 – 6:15",  activity: "Asana & alignment practice" },
        { time: "6:15 – 7:00",  activity: "Meditation / Yoga Nidra" },
        { time: "7:00 – 8:00",  activity: "Dinner" },
      ],
    },
  ],
  pricingIntro:
    "The 500-hour advanced yoga teacher training starts at USD 2,500. A USD 400 advance secures your place at booking — non-refundable if you later cancel, but valid for up to one year. The course begins on the 15th of every month and takes 45 days to complete. Fees vary by room type and occupancy:",
  rooms: [
    {
      name: "Bamboo Cottage",
      single: "USD 2,700", double: "USD 2,500",
      amenities: [
        "Spacious room",
        "Two separate single beds",
        "Attached spacious bathroom",
        "Hot / cold shower",
        "Scenic panoramic views",
        "Free internet",
      ],
    },
    {
      name: "Standard Room",
      single: "USD 3,100", double: "USD 2,750",
      amenities: [
        "Expansive room layout",
        "Dual large beds",
        "Spacious bathroom",
        "Hot / cold shower & hair dryer",
        "Dedicated workspace",
        "Scenic panoramic views",
        "Free internet",
      ],
    },
    {
      name: "Panoramic Deluxe",
      single: "USD 3,850", double: "USD 3,100",
      amenities: [
        "Air conditioning",
        "Breathtaking panoramic views",
        "King-size bed with balcony (or dual large beds)",
        "Tea-making facility & ergonomic workspace",
        "Luxuriously appointed bathroom",
        "Hot / cold shower & hair dryer",
        "Free internet",
      ],
    },
  ],
  faqs: [
    { q: "I have certain food allergies. Can my meals be adjusted accordingly?", a: "Yes. Please inform us about your allergies and we'll ensure your meals are prepared accordingly." },
    { q: "Can I use a computer or mobile device during my stay?", a: "Yes — you're welcome to use your devices during free time. We simply ask that phones stay off during practice, meditation and lectures." },
    { q: "Is there purified water at the center?", a: "Yes, purified drinking water is available throughout the day." },
    { q: "Will I have free time?", a: "Yes. You'll have free time daily plus one day off each week (typically Sunday) to rest and explore." },
    { q: "Is it necessary to be flexible to do a YTT course?", a: "No. Flexibility is not a prerequisite — the training meets you where you are and builds ability safely over time." },
    { q: "Will I get the opportunity to teach during the course?", a: "Absolutely. Supervised teaching practice is a core part of the course; you'll teach peers and receive feedback from teachers and fellow students." },
  ],
  siblingLinks: [
    { href: "/yoga-teacher-training",          label: "200hr Teacher Training" },
    { href: "/yoga-teacher-training/300-hour",  label: "300hr Advanced Training" },
    { href: "/sound-healing-therapy",           label: "Sound Healing Course" },
  ],
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "500-Hour Advanced Yoga Teacher Training in Nepal",
  description:
    "Yoga Alliance certified 500hr advanced yoga teacher training in Kathmandu, Nepal — advanced asana, pranayama, meditation, philosophy, anatomy and teaching methodology over 45 days.",
  provider: { "@type": "Organization", name: "Yogmandu", sameAs: "https://yogmandu.com" },
  courseMode: "onsite",
  duration: "P45D",
  location: {
    "@type": "Place",
    name: "Yogmandu",
    address: { "@type": "PostalAddress", streetAddress: "Miteri Marg, Mid-Baneshwor-31", addressLocality: "Kathmandu", addressCountry: "NP" },
  },
  offers: [{ "@type": "Offer", priceCurrency: "USD", price: "2500", name: "500hr Advanced YTT (from)" }],
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
    { "@type": "ListItem", position: 3, name: "500-Hour", item: "https://yogmandu.com/yoga-teacher-training/500-hour" },
  ],
};

export default async function FiveHundredHourPage() {
  const { modules: curriculum } = await getCurriculum("HOUR_500");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CourseProgram config={{ ...config, curriculum }} />
    </>
  );
}
