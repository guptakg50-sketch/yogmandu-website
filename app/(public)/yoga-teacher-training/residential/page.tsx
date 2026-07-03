import type { Metadata } from "next";
import Link from "next/link";
import PricingSection from "../PricingSection";
import { RESIDENTIAL_TIER } from "../pricingTiers";
import IntakeMonths from "../IntakeMonths";
import LotusBackdrop from "@/components/LotusBackdropClient";

export const metadata: Metadata = {
  title: { absolute: "Residential Full Board 200hr Yoga Teacher Training — Nepal | Yogmandu" },
  description:
    "Live-in Residential Full Board 200-hour Yoga Teacher Training in Kathmandu, Nepal. Yoga Alliance RYT 200 with accommodation and all organic meals included (USD 1,400).",
  keywords: [
    "residential yoga teacher training Nepal",
    "full board yoga teacher training Kathmandu",
    "live-in 200hr YTT Nepal",
    "accommodation yoga training Nepal",
    "yoga alliance RYT 200 residential",
  ],
  alternates: { canonical: "https://yogmandu.com/yoga-teacher-training/residential" },
  openGraph: {
    title: "Residential Full Board 200hr Yoga Teacher Training | Yogmandu",
    description: "Live-in RYT 200 training in Kathmandu — accommodation + all organic meals included. USD 1,400.",
    url: "https://yogmandu.com/yoga-teacher-training/residential",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    title: "Residential Full Board 200hr Yoga Teacher Training | Yogmandu",
    description: "Live-in RYT 200 training in Kathmandu — accommodation + all organic meals included.",
  },
};

const includes = [
  { icon: "🛏", label: "Shared accommodation", sub: "25 nights at the Yogmandu campus" },
  { icon: "🥗", label: "3 organic meals daily", sub: "Vegetarian, sattvic kitchen" },
  { icon: "🍵", label: "Unlimited herbal teas", sub: "Throughout the day" },
  { icon: "💆", label: "2 Ayurvedic massages", sub: "Rest & recovery" },
  { icon: "🧺", label: "Shatkarma kit", sub: "For cleansing practices" },
  { icon: "📓", label: "Manual & notebook", sub: "Full Yogmandu curriculum" },
];

const residentialDay = [
  { time: "6:30 – 7:45 AM",  activity: "Shatkarma, Mantra Chanting, Pranayama" },
  { time: "8:00 – 9:30 AM",  activity: "Asana Practice" },
  { time: "9:30 – 10:30 AM", activity: "Breakfast" },
  { time: "10:30 – 1:00 PM", activity: "Lectures" },
  { time: "1:00 – 2:00 PM",  activity: "Lunch" },
  { time: "3:00 – 4:45 PM",  activity: "Workshop / Lab Session" },
  { time: "5:00 – 6:30 PM",  activity: "Asana / Meditation Practice" },
  { time: "6:30 – 7:30 PM",  activity: "Dinner" },
  { time: "7:30 – 9:30 PM",  activity: "Self Study" },
];

const faqs = [
  { q: "What does the Residential Full Board program include?", a: "The USD 1,400 residential program includes 25 nights of shared accommodation at the Yogmandu campus in Kathmandu, three organic vegetarian meals a day, unlimited herbal teas, a shatkarma kit, two Ayurvedic massages, and your training manual and notebook." },
  { q: "Is the certification the same as the other formats?", a: "Yes. All formats lead to the identical Yoga Alliance RYT 200 certificate. Only the setting and inclusions differ." },
  { q: "How do I secure my place?", a: "A USD 200 deposit reserves your spot, with the remaining USD 1,200 due on arrival. Each cohort is limited to 12 students, so early booking is recommended." },
  { q: "Can I do part of the training online instead?", a: "Yes — we also offer a live Online format and a non-residential Commuter format. Message us and we'll help you choose." },
];

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Residential Full Board 200-Hour Yoga Teacher Training in Nepal",
  description: "Yoga Alliance certified 200hr residential yoga teacher training in Kathmandu, Nepal — accommodation and all meals included.",
  provider: { "@type": "Organization", name: "Yogmandu", sameAs: "https://yogmandu.com" },
  courseMode: "onsite",
  location: { "@type": "Place", name: "Yogmandu", address: { "@type": "PostalAddress", streetAddress: "Miteri Marg, Mid-Baneshwor-31", addressLocality: "Kathmandu", addressCountry: "NP" } },
  offers: [{ "@type": "Offer", priceCurrency: "USD", price: "1400", name: "Residential (Full Board)" }],
};
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "Yoga Teacher Training", item: "https://yogmandu.com/yoga-teacher-training" },
    { "@type": "ListItem", position: 3, name: "Residential", item: "https://yogmandu.com/yoga-teacher-training/residential" },
  ],
};

export default function ResidentialPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden" style={{ background: "#FFFFFF" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 20%, rgba(107,45,139,0.06) 0%, transparent 60%)" }} />
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <img src="/logo.png" alt="Yogmandu" width={160} height={64} fetchPriority="high" decoding="async" style={{ height: 64, width: "auto", objectFit: "contain" }} />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs mb-6" style={{ color: "#9A7860" }}>
            <Link href="/yoga-teacher-training" className="hover:underline" style={{ color: "#6B2D8B" }}>200hr Teacher Training</Link>
            <span> / Residential</span>
          </p>
          <p className="text-xs tracking-[0.3em] uppercase mb-6 font-medium" style={{ color: "#8DC63F" }}>Yoga Alliance RYS 200</p>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.05] mb-8 max-w-3xl mx-auto" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            A full-board <em style={{ color: "#6B2D8B" }}>live-in immersion</em>
          </h1>
          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#4A2E1A" }}>
            Live and train on-site at our Kathmandu campus with accommodation and all organic meals included. The deepest way to complete your 200-hour Yoga Alliance certification.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/9779810263277" target="_blank" rel="noopener noreferrer" className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm text-white" style={{ background: "#6B2D8B", boxShadow: "0 6px 20px rgba(107,45,139,0.35)" }}>Apply on WhatsApp</a>
            <Link href="/yoga-teacher-training/online" className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm" style={{ border: "1.5px solid #6B2D8B", color: "#6B2D8B" }}>Prefer to train online? →</Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection
        tiers={[RESIDENTIAL_TIER]}
        eyebrow="Residential Format"
        title={<>Full Board <em style={{ color: "#6B2D8B" }}>program</em></>}
        subtitle="Everything included — tuition, accommodation, meals and the same RYT 200 certificate."
      />

      {/* What's included */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#F7941D" }}>What&apos;s Included</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Your stay, all covered</h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {includes.map((it) => (
              <div key={it.label} className="flex items-start gap-3 rounded-2xl p-5" style={{ background: "linear-gradient(135deg, #6B2D8B0C 0%, #FFFFFF 70%)", border: "1.5px solid #6B2D8B22" }}>
                <span style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", background: "linear-gradient(135deg, #6B2D8B22, #6B2D8B08)", border: "1px solid #6B2D8B33" }}>{it.icon}</span>
                <span>
                  <span className="block text-sm font-medium" style={{ color: "#2A1208" }}>{it.label}</span>
                  <span className="block text-xs" style={{ color: "#7A5840" }}>{it.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily rhythm */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #1a0a2e 0%, #3D1560 60%, #1a0a2e 100%)" }}>
        <LotusBackdrop />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#8DC63F" }}>On Campus</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#FFFFFF" }}>A day in the residential program</h2>
          </div>
          <div style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: "1.25rem", overflow: "hidden", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(4px)" }}>
            {residentialDay.map((row, i) => (
              <div key={row.time} style={{ display: "flex", alignItems: "center", gap: 16, padding: "0.85rem 1.5rem", borderBottom: i < residentialDay.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem", color: "#F7941D", minWidth: 130, flexShrink: 0 }}>{row.time}</span>
                <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.85)" }}>{row.activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intake */}
      <section className="py-16 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#6B2D8B" }}>Plan Ahead</p>
          <h2 className="text-3xl font-light mb-3" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Choose your intake month</h2>
          <p className="text-sm mb-10" style={{ color: "#7A5840" }}>Each cohort is limited to 12 students — reserve early.</p>
          <IntakeMonths />
          <p className="text-sm mt-6" style={{ color: "#7A5840" }}>Secure your place with a USD 200 deposit · Balance due on arrival</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#6B2D8B" }}>Questions</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Frequently asked</h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="faq-item rounded-2xl" style={{ background: "#F9F5FF", border: "1px solid rgba(107,45,139,0.12)" }}>
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
      <section className="py-20 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Ready to begin?</h2>
          <p className="text-lg mb-10" style={{ color: "#4A2E1A" }}>Cohorts fill quickly. Secure your place with a USD 200 deposit and our team will be in touch within 24 hours.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/9779810263277" target="_blank" rel="noopener noreferrer" className="cta-lift px-10 py-4 rounded-full text-white font-medium" style={{ background: "#6B2D8B" }}>Apply on WhatsApp</a>
            <Link href="/yoga-teacher-training" className="cta-lift px-10 py-4 rounded-full font-medium" style={{ border: "1.5px solid #F7941D", color: "#F7941D" }}>← 200hr Overview</Link>
          </div>
        </div>
      </section>
    </>
  );
}
