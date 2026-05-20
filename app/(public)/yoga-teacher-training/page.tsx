import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "200hr Yoga Teacher Training Nepal | Yogmandu — Yoga Alliance RYS 200",
  description:
    "Yoga Alliance RYS 200 certified teacher training in Kathmandu, Nepal. Residential USD 1,400 · Non-residential USD 600. 2026 dates: June 15, July 15, August 15. Hatha, Ashtanga, anatomy, philosophy & more.",
  keywords: [
    "200hr yoga teacher training Nepal",
    "yoga teacher training Kathmandu",
    "yoga alliance RYS 200 Nepal",
    "yoga teacher certification Nepal",
    "yoga school Nepal 2026",
    "affordable yoga teacher training Asia",
    "Hatha yoga teacher training Nepal",
    "Ashtanga teacher training Kathmandu",
    "yoga training residential Nepal",
  ],
  alternates: { canonical: "https://yogmandu.com/yoga-teacher-training" },
  openGraph: {
    title: "200hr Yoga Teacher Training Nepal | Yogmandu",
    description: "Yoga Alliance RYS 200 certified. Residential USD 1,400 · Non-residential USD 600. 2026 batches: June, July, August. Kathmandu, Nepal.",
    url: "https://yogmandu.com/yoga-teacher-training",
  },
  twitter: {
    title: "200hr Yoga Teacher Training Nepal | Yogmandu",
    description: "Yoga Alliance RYS 200 certified. Residential USD 1,400 · Non-residential USD 600. 2026 batches in Kathmandu.",
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "200-Hour Yoga Teacher Training in Nepal",
  description:
    "Yoga Alliance certified 200hr yoga teacher training in Kathmandu, Nepal. Hatha, Ashtanga, anatomy, philosophy, pranayama, and teaching methodology.",
  provider: { "@type": "Organization", name: "Yogmandu", sameAs: "https://yogmandu.com" },
  courseMode: "onsite",
  duration: "P28D",
  location: {
    "@type": "Place",
    name: "Yogmandu",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Miteri Marg, Mid-Baneshwor-31",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
  },
  offers: [
    { "@type": "Offer", priceCurrency: "USD", price: "600",  name: "Non-Residential" },
    { "@type": "Offer", priceCurrency: "USD", price: "1400", name: "Residential (Full Board)" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the 200-hour yoga teacher training Yoga Alliance certified?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Yogmandu is a Yoga Alliance Registered Yoga School (RYS 200). Graduates receive a certificate eligible for Yoga Alliance RYT 200 registration worldwide.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between residential and non-residential training?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The residential course (USD 1,400) includes 28 days of tuition plus accommodation and all meals at the Yogmandu studio in Kathmandu. The non-residential course (USD 600) covers tuition only — you arrange your own accommodation in Kathmandu.",
      },
    },
    {
      "@type": "Question",
      name: "How long is the 200-hour yoga teacher training course?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The course runs for 28 days. Daily sessions begin at 6:30 AM and cover asana, pranayama, anatomy, yoga philosophy, Sanskrit, and teaching methodology. Evenings include self-study until 9:30 PM.",
      },
    },
    {
      "@type": "Question",
      name: "When are the 2026 yoga teacher training start dates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "2026 batches start on June 15, July 15, and August 15. Each cohort is limited to 12 students. Contact us on WhatsApp (+977-9862909469) to reserve your place.",
      },
    },
    {
      "@type": "Question",
      name: "What level of yoga experience do I need to join?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The program is open to beginners and intermediate practitioners. No prior teaching experience is required — only a sincere commitment to daily practice and learning.",
      },
    },
    {
      "@type": "Question",
      name: "Who teaches the 200-hour yoga teacher training at Yogmandu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The program is led by Dr. Chintamani Gautam (PhD Yogic Science, E-RYT 500) and supported by senior faculty including Yogi Arjun Rakhal and Dr. Dipika. Dr. Gautam has trained 3,000+ teachers from 50+ countries.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "Yoga Teacher Training", item: "https://yogmandu.com/yoga-teacher-training" },
  ],
};

const curriculum = [
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
];

const dailySchedule = [
  { time: "6:30 – 7:45 AM",  activity: "Shatkarma, Mantra Chanting, Pranayama" },
  { time: "7:45 – 8:00 AM",  activity: "Tea Break" },
  { time: "8:00 – 9:30 AM",  activity: "Asana Practice" },
  { time: "9:30 – 10:30 AM", activity: "Breakfast" },
  { time: "10:30 – 1:00 PM", activity: "Lectures" },
  { time: "1:00 – 2:00 PM",  activity: "Lunch" },
  { time: "2:00 – 3:00 PM",  activity: "Self Study" },
  { time: "3:00 – 4:45 PM",  activity: "Workshop / Lab Session" },
  { time: "4:45 – 5:00 PM",  activity: "Tea Break" },
  { time: "5:00 – 6:30 PM",  activity: "Asana / Meditation Practice" },
  { time: "6:30 – 7:30 PM",  activity: "Dinner" },
  { time: "7:30 – 9:30 PM",  activity: "Self Study" },
];

export default function YogaTeacherTrainingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden" style={{ background: "#FFFFFF" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 80% 20%, rgba(107,45,139,0.06) 0%, transparent 60%)" }} />

        {/* Centered logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <img src="/logo.png" alt="Yogmandu" style={{ height: 64, width: "auto", objectFit: "contain" }} />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-6 font-medium" style={{ color: "#8DC63F" }}>
            Yoga Alliance RYS 200
          </p>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.05] mb-8 max-w-3xl mx-auto"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            Become a certified yoga teacher in the{" "}
            <em style={{ color: "#6B2D8B" }}>heart of the Himalayas</em>
          </h1>
          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#4A2E1A", fontWeight: 400 }}>
            A 28-day immersive 200hr program in Kathmandu, Nepal. Yoga Alliance certified. Taught in the classical Hatha tradition by Dr. Chintamani Gautam and our senior faculty.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/9779862909469"
              className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm text-white"
              style={{ background: "#6B2D8B", boxShadow: "0 6px 20px rgba(107,45,139,0.35)" }}>
              Reserve Your Spot on WhatsApp
            </a>
            <a href="mailto:info@yogmandu.com"
              className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm"
              style={{ border: "1.5px solid #6B2D8B", color: "#6B2D8B" }}>
              Email Us a Question
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="py-10 px-6" style={{ background: "#6B2D8B" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "28 Days",  label: "Program Duration" },
            { value: "RYT 200",  label: "Yoga Alliance Certified" },
            { value: "English",  label: "Language of Instruction" },
            { value: "2015",     label: "Teaching Since" },
          ].map(s => (
            <div key={s.value}>
              <div className="text-3xl font-light text-white mb-1"
                style={{ fontFamily: "Cormorant Garamond, serif" }}>{s.value}</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.65)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#F7941D" }}>Choose Your Format</p>
            <h2 className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
              Program options &amp; pricing
            </h2>
            <div className="section-divider mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Non-Residential */}
            <div className="rounded-2xl p-8" style={{ border: "1.5px solid rgba(247,148,29,0.25)", background: "#FFFFFF" }}>
              <div style={{ height: 3, background: "linear-gradient(90deg,#F7941D,#F7941D55)", borderRadius: 2, marginBottom: 20 }} />
              <p className="text-xs tracking-[0.2em] uppercase mb-2 font-medium" style={{ color: "#F7941D" }}>Non-Residential</p>
              <h3 className="text-2xl font-light mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Commuter Program</h3>
              <div className="mb-6">
                <div className="text-3xl font-light mb-1" style={{ fontFamily: "Cormorant Garamond, serif", color: "#F7941D" }}>USD 600</div>
                <div className="text-sm" style={{ color: "#7A5840" }}>
                  NPR 45,000 early bird · NPR 70,000 regular<br />
                  <span className="text-xs">(Nepalese citizens)</span>
                </div>
              </div>
              <ul className="space-y-2 mb-8 text-sm" style={{ color: "#4A2E1A" }}>
                {["Yoga Alliance RYT 200 Certificate","Yogmandu training manual","Tea & coffee daily","28-day program","Morning & afternoon sessions"].map(i => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#F7941D" }} />{i}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/9779862909469"
                className="cta-lift block text-center py-3 rounded-full font-medium text-sm text-white"
                style={{ background: "#F7941D" }}>Apply Now</a>
            </div>

            {/* Residential — featured */}
            <div className="rounded-2xl p-8 relative" style={{ border: "1.5px solid rgba(107,45,139,0.35)", background: "#F9F5FF" }}>
              <div style={{ height: 3, background: "linear-gradient(90deg,#6B2D8B,#9B4DB5)", borderRadius: 2, marginBottom: 20 }} />
              <div style={{ position: "absolute", top: 16, right: 16, background: "#6B2D8B", color: "#fff",
                fontSize: "0.6rem", letterSpacing: "0.15em", padding: "3px 10px", borderRadius: 999, fontWeight: 500 }}>
                MOST POPULAR
              </div>
              <p className="text-xs tracking-[0.2em] uppercase mb-2 font-medium" style={{ color: "#6B2D8B" }}>Residential</p>
              <h3 className="text-2xl font-light mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Full Board Program</h3>
              <div className="mb-6">
                <div className="text-3xl font-light mb-1" style={{ fontFamily: "Cormorant Garamond, serif", color: "#6B2D8B" }}>USD 1,400</div>
                <div className="text-sm" style={{ color: "#7A5840" }}>
                  USD 200 deposit on booking<br />
                  <span className="text-xs">+ USD 1,200 due on arrival</span>
                </div>
              </div>
              <ul className="space-y-2 mb-8 text-sm" style={{ color: "#4A2E1A" }}>
                {["Yoga Alliance RYT 200 Certificate","Shared accommodation (25 days)","3 organic vegetarian meals daily","Unlimited herbal teas","Shatkarma kit","2 Ayurvedic massages","Training manual & notebook"].map(i => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#6B2D8B" }} />{i}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/9779862909469"
                className="cta-lift block text-center py-3 rounded-full font-medium text-sm text-white"
                style={{ background: "#6B2D8B" }}>Apply Now</a>
            </div>

            {/* Virtual */}
            <div className="rounded-2xl p-8" style={{ border: "1.5px solid rgba(141,198,63,0.25)", background: "#FFFFFF" }}>
              <div style={{ height: 3, background: "linear-gradient(90deg,#8DC63F,#8DC63F55)", borderRadius: 2, marginBottom: 20 }} />
              <p className="text-xs tracking-[0.2em] uppercase mb-2 font-medium" style={{ color: "#8DC63F" }}>Virtual</p>
              <h3 className="text-2xl font-light mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Online Program</h3>
              <div className="mb-6">
                <div className="text-3xl font-light mb-1" style={{ fontFamily: "Cormorant Garamond, serif", color: "#8DC63F" }}>Contact Us</div>
                <div className="text-sm" style={{ color: "#7A5840" }}>Live virtual sessions<br /><span className="text-xs">Registration via Google Form</span></div>
              </div>
              <ul className="space-y-2 mb-8 text-sm" style={{ color: "#4A2E1A" }}>
                {["Yoga Alliance RYT 200 Certificate","Live online sessions","Training manual","Asanas, Pranayama & bandhas","Teaching methodology"].map(i => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#8DC63F" }} />{i}
                  </li>
                ))}
              </ul>
              <a href="mailto:info@yogmandu.com"
                className="cta-lift block text-center py-3 rounded-full font-medium text-sm"
                style={{ background: "rgba(141,198,63,0.1)", color: "#5A7A20", border: "1.5px solid rgba(141,198,63,0.3)" }}>Get Details</a>
            </div>
          </div>
        </div>
      </section>

      {/* 2026 Dates */}
      <section className="py-16 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#6B2D8B" }}>Plan Ahead</p>
          <h2 className="text-3xl font-light mb-10" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            2026 Intake Dates
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            {["June 15, 2026","July 15, 2026","August 15, 2026"].map(d => (
              <div key={d} style={{
                padding: "1.25rem 2rem", borderRadius: "1rem",
                border: "1.5px solid rgba(107,45,139,0.2)", background: "#FFFFFF",
                textAlign: "center", minWidth: 200,
              }}>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", fontWeight: 400, color: "#2A1208", marginBottom: 4 }}>{d}</div>
                <div style={{ fontSize: "0.72rem", color: "#F7941D", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Limited Spots</div>
              </div>
            ))}
          </div>
          <p className="text-sm mt-6" style={{ color: "#7A5840" }}>Secure your place with a USD 200 deposit · Full balance due on arrival</p>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#F7941D" }}>What You Will Learn</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
              The curriculum
            </h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curriculum.map(block => (
              <div key={block.title} className="rounded-2xl p-8"
                style={{ background: "#F9F5FF", borderLeft: `3px solid ${block.color}` }}>
                <p className="text-xs tracking-[0.25em] uppercase mb-4 font-medium" style={{ color: block.color }}>{block.title}</p>
                <ul className="space-y-2">
                  {block.items.map(item => (
                    <li key={item} className="text-sm flex items-start gap-2" style={{ color: "#4A2E1A" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: block.color }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section className="py-20 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#6B2D8B" }}>Residential Program</p>
            <h2 className="text-3xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>A typical day</h2>
          </div>
          <div style={{ border: "1px solid rgba(107,45,139,0.12)", borderRadius: "1.25rem", overflow: "hidden", background: "#FFFFFF" }}>
            {dailySchedule.map((row, i) => (
              <div key={row.time} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "0.85rem 1.5rem",
                borderBottom: i < dailySchedule.length - 1 ? "1px solid rgba(107,45,139,0.07)" : "none",
                background: i % 2 === 0 ? "#FFFFFF" : "rgba(107,45,139,0.02)",
              }}>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem",
                  color: "#6B2D8B", minWidth: 130, flexShrink: 0 }}>{row.time}</span>
                <span style={{ fontSize: "0.88rem", color: "#4A2E1A" }}>{row.activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Graduation & Cancellation */}
      <section className="py-20 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-light mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Graduation</h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#4A2E1A" }}>
              All graduates receive an internationally recognised Yoga Alliance RYT 200 certificate and can register as Registered Yoga Teachers.
            </p>
            <ul className="space-y-2 text-sm" style={{ color: "#4A2E1A" }}>
              {["Certificate presentation ceremony","108 Sun Salutations (optional)","Traditional Fire Ceremony (Hawan)"].map(i => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#8DC63F" }} />{i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-light mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Cancellation Policy</h3>
            <div style={{ border: "1px solid rgba(42,18,8,0.08)", borderRadius: "0.75rem", overflow: "hidden" }}>
              {[
                { when: "Week 1 cancellation", refund: "50% refund" },
                { when: "Week 2 cancellation", refund: "40% refund" },
                { when: "Week 3 cancellation", refund: "25% refund" },
                { when: "Week 4+ cancellation", refund: "No refund" },
              ].map((r, i) => (
                <div key={r.when} style={{
                  display: "flex", justifyContent: "space-between", padding: "0.75rem 1.25rem",
                  borderBottom: i < 3 ? "1px solid rgba(42,18,8,0.06)" : "none",
                  background: i % 2 === 0 ? "#FFFFFF" : "rgba(42,18,8,0.015)",
                }}>
                  <span style={{ fontSize: "0.85rem", color: "#4A2E1A" }}>{r.when}</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 500,
                    color: r.refund === "No refund" ? "#CC3333" : "#5A7A20" }}>{r.refund}</span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: "#9A7860" }}>USD 200 deposit is non-refundable but transferable within the same year.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Ready to begin?</h2>
          <p className="text-lg mb-10" style={{ color: "#4A2E1A", fontWeight: 400 }}>
            Cohorts fill quickly. Secure your place with a USD 200 deposit and our team will be in touch within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/9779862909469"
              className="cta-lift px-10 py-4 rounded-full text-white font-medium"
              style={{ background: "#6B2D8B" }}>Reserve Your Spot on WhatsApp</a>
            <Link href="/sound-healing-therapy"
              className="cta-lift px-10 py-4 rounded-full font-medium"
              style={{ border: "1.5px solid #F7941D", color: "#F7941D" }}>Also explore Sound Healing →</Link>
          </div>
          <div className="mt-8 flex justify-center gap-8 text-sm" style={{ color: "#7A5840" }}>
            <span>📞 +977-9862909469</span>
            <span>✉️ info@yogmandu.com</span>
          </div>
        </div>
      </section>
    </>
  );
}
