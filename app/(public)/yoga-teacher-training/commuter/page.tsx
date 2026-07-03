import type { Metadata } from "next";
import Link from "next/link";
import PricingSection from "../PricingSection";
import { COMMUTER_TIER } from "../pricingTiers";
import IntakeMonths from "../IntakeMonths";

export const metadata: Metadata = {
  title: { absolute: "Commuter (Non-Residential) 200hr Yoga Teacher Training — Nepal | Yogmandu" },
  description:
    "Non-residential Commuter 200-hour Yoga Teacher Training in Kathmandu, Nepal. Train by day and stay in your own accommodation. Yoga Alliance RYT 200 from USD 600.",
  keywords: [
    "non-residential yoga teacher training Nepal",
    "commuter yoga teacher training Kathmandu",
    "affordable 200hr YTT Nepal",
    "yoga alliance RYT 200 non residential",
  ],
  alternates: { canonical: "https://yogmandu.com/yoga-teacher-training/commuter" },
  openGraph: {
    title: "Commuter (Non-Residential) 200hr Yoga Teacher Training | Yogmandu",
    description: "Train by day, stay in your own accommodation. Yoga Alliance RYT 200 from USD 600. Kathmandu, Nepal.",
    url: "https://yogmandu.com/yoga-teacher-training/commuter",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    title: "Commuter (Non-Residential) 200hr Yoga Teacher Training | Yogmandu",
    description: "Train by day, stay in your own accommodation. Yoga Alliance RYT 200 from USD 600.",
  },
};

const includes = [
  { icon: "📜", label: "Yoga Alliance RYT 200", sub: "Internationally recognised certificate" },
  { icon: "📓", label: "Yogmandu training manual", sub: "Full curriculum & notebook" },
  { icon: "☕", label: "Tea & coffee daily", sub: "Throughout your sessions" },
  { icon: "🗓", label: "28-day program", sub: "Morning & afternoon sessions" },
  { icon: "🏠", label: "Your own accommodation", sub: "Stay where you like in Kathmandu" },
  { icon: "🧘", label: "Same curriculum", sub: "Identical to our residential course" },
];

const dailySchedule = [
  { time: "6:30 – 7:45 AM",  activity: "Shatkarma, Mantra Chanting, Pranayama" },
  { time: "8:00 – 9:30 AM",  activity: "Asana Practice" },
  { time: "9:30 – 10:30 AM", activity: "Breakfast Break" },
  { time: "10:30 – 1:00 PM", activity: "Lectures (Philosophy / Anatomy)" },
  { time: "1:00 – 2:00 PM",  activity: "Lunch Break" },
  { time: "2:00 – 3:00 PM",  activity: "Self Study" },
  { time: "3:00 – 4:45 PM",  activity: "Workshop / Teaching Practicum" },
  { time: "5:00 – 6:30 PM",  activity: "Asana / Meditation Practice" },
];

const faqs = [
  { q: "What's the difference between the Commuter and Residential programs?", a: "The Commuter (non-residential) course is USD 600 and covers tuition only — you arrange your own accommodation in Kathmandu and commute to the studio each day. The Residential Full Board course includes accommodation and all meals on-site." },
  { q: "Do I need to arrange my own accommodation?", a: "Yes. Many students book a nearby guesthouse or apartment in Mid-Baneshwor — we're happy to recommend affordable options close to the studio." },
  { q: "Is the certificate the same as the other formats?", a: "Yes. The Commuter course leads to the identical Yoga Alliance RYT 200 certificate as our Residential and Online formats. The curriculum is the same." },
  { q: "What are the daily hours?", a: "The program runs for 28 days with morning and afternoon sessions covering asana, pranayama, anatomy, philosophy and teaching methodology. You're free to return to your accommodation in the evenings." },
];

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Commuter (Non-Residential) 200-Hour Yoga Teacher Training in Nepal",
  description: "Yoga Alliance certified 200hr non-residential yoga teacher training in Kathmandu, Nepal — tuition only, you arrange your own accommodation.",
  provider: { "@type": "Organization", name: "Yogmandu", sameAs: "https://yogmandu.com" },
  courseMode: "onsite",
  duration: "P28D",
  location: { "@type": "Place", name: "Yogmandu", address: { "@type": "PostalAddress", streetAddress: "Miteri Marg, Mid-Baneshwor-31", addressLocality: "Kathmandu", addressCountry: "NP" } },
  offers: [{ "@type": "Offer", priceCurrency: "USD", price: "600", name: "Commuter (Non-Residential)" }],
};
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "Yoga Teacher Training", item: "https://yogmandu.com/yoga-teacher-training" },
    { "@type": "ListItem", position: 3, name: "Commuter", item: "https://yogmandu.com/yoga-teacher-training/commuter" },
  ],
};

export default function CommuterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden" style={{ background: "#FFFFFF" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 20%, rgba(247,148,29,0.07) 0%, transparent 60%)" }} />
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <img src="/logo.png" alt="Yogmandu" width={160} height={64} fetchPriority="high" decoding="async" style={{ height: 64, width: "auto", objectFit: "contain" }} />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs mb-6" style={{ color: "#9A7860" }}>
            <Link href="/yoga-teacher-training" className="hover:underline" style={{ color: "#6B2D8B" }}>200hr Teacher Training</Link>
            <span> / Commuter</span>
          </p>
          <p className="text-xs tracking-[0.3em] uppercase mb-6 font-medium" style={{ color: "#8DC63F" }}>Yoga Alliance RYS 200</p>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.05] mb-8 max-w-3xl mx-auto" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            The <em style={{ color: "#6B2D8B" }}>non-residential</em> way to certify
          </h1>
          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#4A2E1A" }}>
            Train with us by day and stay in your own accommodation in Kathmandu. The most flexible and affordable way to earn your 200-hour Yoga Alliance certification.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/9779810263277" target="_blank" rel="noopener noreferrer" className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm text-white" style={{ background: "#6B2D8B", boxShadow: "0 6px 20px rgba(107,45,139,0.35)" }}>Apply on WhatsApp</a>
            <Link href="/yoga-teacher-training/residential" className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm" style={{ border: "1.5px solid #6B2D8B", color: "#6B2D8B" }}>Prefer full board? →</Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <div id="pricing" />
      <PricingSection
        tiers={[COMMUTER_TIER]}
        eyebrow="Non-Residential Format"
        title={<>Commuter <em style={{ color: "#6B2D8B" }}>program</em></>}
        subtitle="Tuition only — you arrange your own stay in Kathmandu. Same 28-day curriculum and RYT 200 certificate."
      />

      {/* What's included */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#F7941D" }}>What&apos;s Included</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Everything but the bed</h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {includes.map((it) => (
              <div key={it.label} className="flex items-start gap-3 rounded-2xl p-5" style={{ background: "linear-gradient(135deg, #F7941D0C 0%, #FFFFFF 70%)", border: "1.5px solid #F7941D2A" }}>
                <span style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", background: "linear-gradient(135deg, #F7941D22, #F7941D08)", border: "1px solid #F7941D33" }}>{it.icon}</span>
                <span>
                  <span className="block text-sm font-medium" style={{ color: "#2A1208" }}>{it.label}</span>
                  <span className="block text-xs" style={{ color: "#7A5840" }}>{it.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily schedule */}
      <section className="py-20 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#6B2D8B" }}>Daily Rhythm</p>
            <h2 className="text-3xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>A typical day</h2>
          </div>
          <div style={{ border: "1px solid rgba(107,45,139,0.12)", borderRadius: "1.25rem", overflow: "hidden", background: "#FFFFFF" }}>
            {dailySchedule.map((row, i) => (
              <div key={row.time} style={{ display: "flex", alignItems: "center", gap: 16, padding: "0.85rem 1.5rem", borderBottom: i < dailySchedule.length - 1 ? "1px solid rgba(107,45,139,0.07)" : "none", background: i % 2 === 0 ? "#FFFFFF" : "rgba(107,45,139,0.02)" }}>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem", color: "#6B2D8B", minWidth: 130, flexShrink: 0 }}>{row.time}</span>
                <span style={{ fontSize: "0.88rem", color: "#4A2E1A" }}>{row.activity}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-center mt-4" style={{ color: "#9A7860" }}>Evenings are your own — return to your accommodation to rest and self-study.</p>
        </div>
      </section>

      {/* Intake */}
      <section className="py-16 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#6B2D8B" }}>Plan Ahead</p>
          <h2 className="text-3xl font-light mb-3" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Choose your intake month</h2>
          <p className="text-sm mb-10" style={{ color: "#7A5840" }}>Each cohort is limited to 12 students — reserve early.</p>
          <IntakeMonths />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#6B2D8B" }}>Questions</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Frequently asked</h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="faq-item rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid rgba(107,45,139,0.12)" }}>
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5">
                  <span className="text-base font-medium" style={{ color: "#2A1208" }}>{f.q}</span>
                  <span className="faq-mark flex-shrink-0 text-xl font-light leading-none" style={{ color: "#6B2D8B" }}>+</span>
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#4A2E1A" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <style>{`
          .faq-item > summary::-webkit-details-marker { display: none; }
          .faq-item .faq-mark { transition: transform 0.2s ease; }
          .faq-item[open] .faq-mark { transform: rotate(45deg); }
        `}</style>
      </section>

      {/* CTA */}
      <section className="py-20 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Ready to begin?</h2>
          <p className="text-lg mb-10" style={{ color: "#4A2E1A" }}>Secure your place with a USD 200 deposit and our team will be in touch within 24 hours.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/9779810263277" target="_blank" rel="noopener noreferrer" className="cta-lift px-10 py-4 rounded-full text-white font-medium" style={{ background: "#6B2D8B" }}>Apply on WhatsApp</a>
            <Link href="/yoga-teacher-training" className="cta-lift px-10 py-4 rounded-full font-medium" style={{ border: "1.5px solid #F7941D", color: "#F7941D" }}>← All Programs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
