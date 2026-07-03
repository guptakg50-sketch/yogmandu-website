import type { Metadata } from "next";
import Link from "next/link";
import PricingSection from "../PricingSection";
import { ONLINE_TIER } from "../pricingTiers";
import IntakeMonths from "../IntakeMonths";

export const metadata: Metadata = {
  title: { absolute: "Online 200hr Yoga Teacher Training — Live Virtual | Yogmandu" },
  description:
    "Live Online 200-hour Yoga Teacher Training with Yogmandu. Earn your Yoga Alliance RYT 200 from anywhere with real-time classes (USD 500) — same certification as our in-person course.",
  keywords: [
    "online yoga teacher training",
    "live online 200hr YTT",
    "virtual yoga teacher training",
    "yoga alliance RYT 200 online",
    "online yoga certification Nepal",
  ],
  alternates: { canonical: "https://yogmandu.com/yoga-teacher-training/online" },
  openGraph: {
    title: "Online 200hr Yoga Teacher Training — Live Virtual | Yogmandu",
    description: "Earn your Yoga Alliance RYT 200 online with live real-time classes. USD 500.",
    url: "https://yogmandu.com/yoga-teacher-training/online",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    title: "Online 200hr Yoga Teacher Training — Live Virtual | Yogmandu",
    description: "Earn your Yoga Alliance RYT 200 online with live real-time classes. USD 500.",
  },
};

const includes = [
  { icon: "💻", label: "Live online sessions", sub: "Real-time on Zoom — not pre-recorded" },
  { icon: "🧘", label: "Asana, pranayama & bandhas", sub: "Guided daily practice" },
  { icon: "📖", label: "Teaching methodology", sub: "Cueing, sequencing & observation" },
  { icon: "📄", label: "Digital training manual", sub: "Yours to keep" },
  { icon: "🗓", label: "Flexible from home", sub: "Join from anywhere in the world" },
  { icon: "🎓", label: "Same RYT 200 certificate", sub: "Yoga Alliance registered" },
];

const howItWorks = [
  { n: "1", t: "Register via Google Form", b: "Message us for the registration link and reserve your place in the next live cohort." },
  { n: "2", t: "Join the live classes", b: "Practice and study in real time over Zoom alongside the resident cohort — ask questions and get feedback live." },
  { n: "3", t: "Get certified", b: "Complete the practicum and assessment to earn your Yoga Alliance RYT 200 certificate." },
];

const faqs = [
  { q: "Are the online classes live or pre-recorded?", a: "Live. The USD 500 online program runs as real-time sessions over Zoom alongside our resident cohort — not pre-recorded videos. You can ask questions and receive feedback in the moment." },
  { q: "Is the certification the same as the in-person course?", a: "Yes. The online program leads to the identical Yoga Alliance RYT 200 certificate as our Commuter and Residential formats. The curriculum is the same." },
  { q: "How do I register?", a: "Registration is via a Google Form. Message us on WhatsApp (+977-9810263277) or email info@yogmandu.com and we'll send you the link." },
  { q: "Will I get to practise teaching?", a: "Yes. Supervised teaching practice is part of the course — you'll teach and receive feedback from teachers and fellow students, all online." },
];

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Online 200-Hour Yoga Teacher Training",
  description: "Yoga Alliance certified 200hr online yoga teacher training with live real-time classes.",
  provider: { "@type": "Organization", name: "Yogmandu", sameAs: "https://yogmandu.com" },
  hasCourseInstance: [{ "@type": "CourseInstance", name: "Online (Live Virtual)", courseMode: "online" }],
  offers: [{ "@type": "Offer", priceCurrency: "USD", price: "500", name: "Online (Virtual)" }],
};
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "Yoga Teacher Training", item: "https://yogmandu.com/yoga-teacher-training" },
    { "@type": "ListItem", position: 3, name: "Online", item: "https://yogmandu.com/yoga-teacher-training/online" },
  ],
};

export default function OnlinePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden" style={{ background: "#FFFFFF" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 20%, rgba(141,198,63,0.08) 0%, transparent 60%)" }} />
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <img src="/logo.png" alt="Yogmandu" width={160} height={64} fetchPriority="high" decoding="async" style={{ height: 64, width: "auto", objectFit: "contain" }} />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs mb-6" style={{ color: "#9A7860" }}>
            <Link href="/yoga-teacher-training" className="hover:underline" style={{ color: "#6B2D8B" }}>200hr Teacher Training</Link>
            <span> / Online</span>
          </p>
          <p className="text-xs tracking-[0.3em] uppercase mb-6 font-medium" style={{ color: "#8DC63F" }}>Yoga Alliance RYS 200</p>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.05] mb-8 max-w-3xl mx-auto" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            Train from home, <em style={{ color: "#6B2D8B" }}>live</em>
          </h1>
          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#4A2E1A" }}>
            Earn the same Yoga Alliance RYT 200 certificate from anywhere in the world with real-time online classes — practice, study and teach live alongside our Kathmandu cohort.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:info@yogmandu.com" className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm text-white" style={{ background: "#6B2D8B", boxShadow: "0 6px 20px rgba(107,45,139,0.35)" }}>Get Details</a>
            <Link href="/yoga-teacher-training/residential" className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm" style={{ border: "1.5px solid #6B2D8B", color: "#6B2D8B" }}>Prefer to train in Nepal? →</Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection
        tiers={[ONLINE_TIER]}
        eyebrow="Online Format"
        title={<>Online <em style={{ color: "#6B2D8B" }}>program</em></>}
        subtitle="Live real-time training from home — the same RYT 200 certificate at the most accessible price."
      />

      {/* What's included */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#F7941D" }}>What&apos;s Included</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Everything you need</h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {includes.map((it) => (
              <div key={it.label} className="flex items-start gap-3 rounded-2xl p-5" style={{ background: "linear-gradient(135deg, #8DC63F0C 0%, #FFFFFF 70%)", border: "1.5px solid #8DC63F2A" }}>
                <span style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", background: "linear-gradient(135deg, #8DC63F22, #8DC63F08)", border: "1px solid #8DC63F33" }}>{it.icon}</span>
                <span>
                  <span className="block text-sm font-medium" style={{ color: "#2A1208" }}>{it.label}</span>
                  <span className="block text-xs" style={{ color: "#7A5840" }}>{it.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#6B2D8B" }}>How It Works</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Three steps to certified</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorks.map((s, i) => {
              const c = ["#6B2D8B", "#F7941D", "#8DC63F"][i % 3];
              return (
                <div key={s.n} className="rounded-2xl p-7" style={{ background: "#FFFFFF", border: `1.5px solid ${c}22` }}>
                  <span style={{ width: 44, height: 44, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", background: `${c}18`, border: `1.5px solid ${c}55`, color: c, fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem" }}>{s.n}</span>
                  <h3 className="text-lg font-light mt-4 mb-2" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>{s.t}</h3>
                  <p className="text-sm" style={{ color: "#4A2E1A" }}>{s.b}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Intake */}
      <section className="py-16 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#6B2D8B" }}>Plan Ahead</p>
          <h2 className="text-3xl font-light mb-3" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Choose your intake month</h2>
          <p className="text-sm mb-10" style={{ color: "#7A5840" }}>Cohorts are kept small for personalised feedback — reserve early.</p>
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
          <p className="text-lg mb-10" style={{ color: "#4A2E1A" }}>Message our team and we&apos;ll send the registration link and the next live start dates.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/9779810263277" target="_blank" rel="noopener noreferrer" className="cta-lift px-10 py-4 rounded-full text-white font-medium" style={{ background: "#6B2D8B" }}>Message on WhatsApp</a>
            <Link href="/yoga-teacher-training" className="cta-lift px-10 py-4 rounded-full font-medium" style={{ border: "1.5px solid #F7941D", color: "#F7941D" }}>← 200hr Overview</Link>
          </div>
        </div>
      </section>
    </>
  );
}
