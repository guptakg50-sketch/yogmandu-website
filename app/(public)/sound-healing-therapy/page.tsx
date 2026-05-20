import type { Metadata } from "next";
import SingingBowl from "@/components/SingingBowlClient";

export const metadata: Metadata = {
  title: "Sound Healing Therapy Nepal — Tibetan Singing Bowls | Yogmandu",
  description:
    "Authentic Tibetan singing bowl sound healing in Kathmandu, Nepal. Individual sessions USD 20, group USD 10/person, Level I & II certification. Book with Yogmandu — Nepal's premier sound healing centre.",
  keywords: [
    "sound healing Kathmandu",
    "Tibetan singing bowl therapy Nepal",
    "sound healing session Nepal",
    "singing bowl Kathmandu",
    "sound healing certification Nepal",
    "chakra healing Kathmandu",
    "sound bath Nepal",
    "Himalayan bowl therapy",
    "yoga sound healing Nepal",
  ],
  alternates: { canonical: "https://yogmandu.com/sound-healing-therapy" },
  openGraph: {
    title: "Sound Healing Therapy Nepal — Tibetan Singing Bowls | Yogmandu",
    description: "Authentic Tibetan singing bowl sessions in Kathmandu. Individual USD 20 · Group USD 10/person · Level I & II certification. Book on WhatsApp.",
    url: "https://yogmandu.com/sound-healing-therapy",
  },
  twitter: {
    title: "Sound Healing Therapy Nepal — Tibetan Singing Bowls | Yogmandu",
    description: "Authentic Tibetan singing bowl sessions in Kathmandu. Individual USD 20 · Group USD 10/person · Level I & II certification.",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Sound Healing Therapy",
  description: "Authentic Tibetan singing bowl sound healing sessions in Kathmandu, Nepal. Individual, group, and certification courses available.",
  provider: { "@type": "Organization", name: "Yogmandu", url: "https://yogmandu.com" },
  areaServed: { "@type": "City", name: "Kathmandu" },
  serviceType: "Sound Healing Therapy",
  offers: [
    { "@type": "Offer", name: "Individual Session", priceCurrency: "USD", price: "20", description: "90-minute personal Tibetan singing bowl session." },
    { "@type": "Offer", name: "Group Sound Bath", priceCurrency: "USD", price: "10", description: "90-minute group session, minimum 5 participants." },
    { "@type": "Offer", name: "3-Session Package", priceCurrency: "USD", price: "55", description: "Three individual sessions at a discounted rate." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a Tibetan singing bowl sound healing session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A sound healing session uses hand-hammered Tibetan singing bowls placed on and around the body. The resonating frequencies promote deep relaxation, stress relief, and energetic balance. Sessions typically last 90 minutes.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a sound healing session cost at Yogmandu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Individual sessions are USD 20 (NPR 2,000). Group sessions are USD 10 per person with a minimum of 5 participants. A 3-session package is available for USD 55.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need experience for a sound healing session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No experience is needed. Sessions are suitable for complete beginners, yoga practitioners, and anyone seeking stress relief or energetic balance. Simply arrive, lie down, and allow the sound to do the work.",
      },
    },
    {
      "@type": "Question",
      name: "Can I become a certified sound healing practitioner at Yogmandu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Yogmandu offers Level I (Foundational, 20 hours) and Level II (Advanced) sound healing certification courses with internationally recognised certificates.",
      },
    },
    {
      "@type": "Question",
      name: "How do I book a sound healing session in Kathmandu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All sessions require pre-booking. Contact us via WhatsApp at +977-9862909469 or email info@yogmandu.com. We are located at Miteri Marg, Mid-Baneshwor-31, Kathmandu.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "Sound Healing Therapy", item: "https://yogmandu.com/sound-healing-therapy" },
  ],
};

const sessions = [
  {
    title: "Individual Session",
    duration: "90 min",
    price: "USD 20",
    priceSub: "NPR 2,000 · Pre-booking required",
    package: "3-session package: USD 55 / NPR 5,500",
    desc: "A deeply personal one-on-one Tibetan singing bowl session customised to your individual energy and wellness needs. Scheduled at your convenience.",
    color: "#F7941D",
  },
  {
    title: "Group Sound Healing",
    duration: "90 min",
    price: "USD 10 / person",
    priceSub: "NPR 1,000 per person · Min. 5 participants",
    package: "Pre-booking mandatory",
    desc: "A collective sound bath experience. Deeply relaxing — many participants report profound states of stillness, chakra balancing and stress relief.",
    color: "#6B2D8B",
  },
  {
    title: "Certification Training",
    duration: "Level I & Level II",
    price: "Contact Us",
    priceSub: "Foundational & Advanced courses available",
    package: "Full certification awarded",
    desc: "Become a certified sound healing practitioner. Learn Tibetan bowl techniques, chakra mapping, session design and professional client facilitation.",
    color: "#8DC63F",
  },
];

export default function SoundHealingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section
        className="relative pt-36 pb-24 px-6 overflow-hidden"
        style={{ background: "#FFFFFF" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 30% 60%, rgba(247,148,29,0.05) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#F7941D" }}>
              Ancient Himalayan Practice
            </p>
            <h1
              className="text-5xl md:text-6xl font-light leading-[1.05] mb-8"
              style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}
            >
              Let sound dissolve
              <br />
              <em style={{ color: "#F7941D" }}>what words cannot reach</em>
            </h1>
            <p className="text-lg font-light leading-relaxed mb-10" style={{ color: "#555", maxWidth: "440px" }}>
              Tibetan singing bowl therapy, practiced in the Himalayas for centuries. Each session
              works through vibration to release tension, calm the nervous system, and restore
              inner equilibrium.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/9779862909469"
                className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm text-white"
                style={{ background: "#F7941D" }}
              >
                Book a Session
              </a>
              <a
                href="mailto:info@yogmandu.com"
                className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm"
                style={{ border: "1.5px solid #6B2D8B", color: "#6B2D8B" }}
              >
                Ask About Certification
              </a>
            </div>
          </div>

          {/* Bowl */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-xs h-72 animate-pulse-glow rounded-full">
              <SingingBowl />
            </div>
            <p
              className="mt-4 text-xs tracking-[0.25em] uppercase font-light"
              style={{ color: "#F7941D", opacity: 0.5 }}
            >
              Touch the bowl to hear it
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#6B2D8B" }}>
              The Science
            </p>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}
            >
              How sound heals
            </h2>
            <div className="section-divider mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Resonance",
                body: "The bowls produce frequencies that match and gently shift the brain's own oscillation — from beta (active) toward theta (deep rest).",
                color: "#F7941D",
              },
              {
                step: "02",
                title: "Vibration",
                body: "Sound waves travel through the water in your body, releasing tension held in tissue at a cellular level, where talk therapy cannot reach.",
                color: "#6B2D8B",
              },
              {
                step: "03",
                title: "Integration",
                body: "The silence after sound is equally important. In that stillness, the nervous system resets, and the body begins to remember its natural state of ease.",
                color: "#8DC63F",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="text-4xl font-light mb-4"
                  style={{ fontFamily: "Cormorant Garamond, serif", color: item.color, opacity: 0.3 }}
                >
                  {item.step}
                </div>
                <h3
                  className="text-2xl font-light mb-3"
                  style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: "#666" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#F7941D" }}>
              Choose Your Path
            </p>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}
            >
              Sessions &amp; Programs
            </h2>
            <div className="section-divider mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sessions.map((s) => (
              <div
                key={s.title}
                className="rounded-3xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-1"
                style={{ background: "#FFFFFF", borderTop: `3px solid ${s.color}`, border: `1.5px solid ${s.color}20`, borderTopWidth: 3 }}
              >
                <div className="mb-5">
                  <h3 className="text-2xl font-light mb-1"
                    style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
                    {s.title}
                  </h3>
                  <span className="text-xs font-medium tracking-wide" style={{ color: "#7A5840" }}>
                    {s.duration}
                  </span>
                </div>
                {/* Price */}
                <div className="mb-5">
                  <span className="text-2xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: s.color }}>
                    {s.price}
                  </span>
                  <p className="text-xs mt-1" style={{ color: "#7A5840" }}>{s.priceSub}</p>
                  <p className="text-xs mt-1 font-medium" style={{ color: s.color }}>{s.package}</p>
                </div>
                <p className="text-sm leading-relaxed flex-1 mb-8" style={{ color: "#4A2E1A", fontWeight: 400 }}>
                  {s.desc}
                </p>
                <a href="https://wa.me/9779862909469"
                  className="cta-lift text-center px-6 py-3 rounded-full text-sm font-medium text-white"
                  style={{ background: s.color }}>
                  Book on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
