import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "200hr & 300hr Yoga Teacher Training Nepal | Yogmandu — Yoga Alliance Certified",
  description:
    "Yoga Alliance certified 200hr and 300hr yoga teacher training in Kathmandu, Nepal. Immersive Hatha, Ashtanga, philosophy & anatomy. Small groups, experienced teachers.",
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "200-Hour Yoga Teacher Training in Nepal",
  description:
    "Yoga Alliance certified 200hr yoga teacher training in Kathmandu, Nepal. Covers Hatha yoga, Ashtanga, anatomy, philosophy, pranayama, and teaching methodology in small intimate groups.",
  provider: {
    "@type": "Organization",
    name: "Yogmandu",
    sameAs: "https://yogmandu.com",
  },
  courseMode: "onsite",
  duration: "P28D",
  location: {
    "@type": "Place",
    name: "Yogmandu",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "1800",
    availability: "https://schema.org/InStock",
  },
};

const curriculum = [
  { week: "Week 1", title: "Foundation & Alignment", items: ["Asana fundamentals (Hatha & Ashtanga)", "Anatomy & physiology", "Introduction to Patanjali's Yoga Sutras"] },
  { week: "Week 2", title: "Breath & Energy", items: ["Pranayama techniques (12 classical forms)", "Chakra system & subtle body", "Teaching methodology — cueing & sequencing"] },
  { week: "Week 3", title: "Depth of Practice", items: ["Advanced asanas & adjustments", "Yoga philosophy & Vedanta", "Meditation techniques"] },
  { week: "Week 4", title: "Teaching Practicum", items: ["Practicum teaching sessions", "Business of yoga & ethics", "Graduation & Yoga Alliance registration"] },
];

export default function YogaTeacherTrainingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      {/* Hero */}
      <section
        className="relative pt-36 pb-24 px-6 overflow-hidden"
        style={{ background: "#FAF6F0" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 80% 20%, rgba(107,45,139,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#8DC63F" }}>
            Yoga Alliance RYS 200 &amp; 300
          </p>
          <h1
            className="text-5xl md:text-7xl font-light leading-[1.05] mb-8 max-w-3xl"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}
          >
            Become a certified yoga teacher in the{" "}
            <em style={{ color: "#6B2D8B" }}>heart of the Himalayas</em>
          </h1>
          <p className="text-lg font-light leading-relaxed mb-10 max-w-xl" style={{ color: "#555" }}>
            A 28-day immersive 200hr program in Kathmandu, Nepal. Yoga Alliance certified. Small
            groups. Experienced Himalayan lineage teachers.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/9779800000000"
              className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm text-white"
              style={{ background: "#6B2D8B" }}
            >
              Reserve Your Spot
            </a>
            <a
              href="mailto:info@yogmandu.com"
              className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm"
              style={{ border: "1.5px solid #6B2D8B", color: "#6B2D8B" }}
            >
              Ask a Question
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="py-10 px-6" style={{ background: "#6B2D8B" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "28 Days", label: "Immersive Program" },
            { value: "200hr", label: "Yoga Alliance Certified" },
            { value: "8–12", label: "Students Per Cohort" },
            { value: "USD 1,800", label: "Full Program Fee" },
          ].map((s) => (
            <div key={s.value}>
              <div
                className="text-3xl font-light text-white mb-1"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                {s.value}
              </div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum */}
      <section className="py-24 px-6" style={{ background: "#FAF6F0" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#F7941D" }}>
              The Journey
            </p>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}
            >
              28 days, four transformations
            </h2>
            <div className="section-divider mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curriculum.map((week, i) => (
              <div
                key={week.week}
                className="rounded-2xl p-8"
                style={{
                  background: "#F0EAE2",
                  borderLeft: `3px solid ${["#6B2D8B", "#F7941D", "#8DC63F", "#6B2D8B"][i]}`,
                }}
              >
                <p
                  className="text-xs tracking-[0.25em] uppercase mb-2"
                  style={{ color: ["#6B2D8B", "#F7941D", "#8DC63F", "#6B2D8B"][i] }}
                >
                  {week.week}
                </p>
                <h3
                  className="text-2xl font-light mb-4"
                  style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}
                >
                  {week.title}
                </h3>
                <ul className="space-y-2">
                  {week.items.map((item) => (
                    <li key={item} className="text-sm font-light flex items-start gap-2" style={{ color: "#555" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: ["#6B2D8B", "#F7941D", "#8DC63F", "#6B2D8B"][i] }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 px-6" style={{ background: "#F0EAE2" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl font-light mb-6"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}
          >
            Ready to begin?
          </h2>
          <p className="font-light text-lg mb-10" style={{ color: "#666" }}>
            Cohorts fill quickly. Secure your place with a small deposit and our team will be in
            touch within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/9779800000000"
              className="cta-lift px-10 py-4 rounded-full text-white font-medium"
              style={{ background: "#6B2D8B" }}
            >
              Reserve Your Spot on WhatsApp
            </a>
            <Link
              href="/sound-healing-therapy"
              className="cta-lift px-10 py-4 rounded-full font-medium"
              style={{ border: "1.5px solid #F7941D", color: "#F7941D" }}
            >
              Also explore Sound Healing →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
