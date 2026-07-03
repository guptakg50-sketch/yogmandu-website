import type { Metadata } from "next";
import Link from "next/link";
import PricingSection from "../PricingSection";
import { RESIDENTIAL_TIER, ONLINE_TIER } from "../pricingTiers";
import IntakeMonths from "../IntakeMonths";
import LotusBackdrop from "@/components/LotusBackdropClient";

export const metadata: Metadata = {
  title: { absolute: "Residential & Online 200hr Yoga Teacher Training — Nepal | Yogmandu" },
  description:
    "Two ways to earn your Yoga Alliance RYT 200 with Yogmandu: the Residential Full Board program in Kathmandu (accommodation + all meals, USD 1,400) or the live Online program from home (USD 500).",
  keywords: [
    "residential yoga teacher training Nepal",
    "full board yoga teacher training Kathmandu",
    "online yoga teacher training",
    "live online 200hr YTT",
    "yoga alliance RYT 200 online",
    "accommodation yoga training Nepal",
    "virtual yoga teacher certification",
  ],
  alternates: { canonical: "https://yogmandu.com/yoga-teacher-training/residential-online" },
  openGraph: {
    title: "Residential & Online 200hr Yoga Teacher Training | Yogmandu",
    description: "Full Board residential (USD 1,400) or live Online (USD 500) — same Yoga Alliance RYT 200 certification. Kathmandu, Nepal.",
    url: "https://yogmandu.com/yoga-teacher-training/residential-online",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    title: "Residential & Online 200hr Yoga Teacher Training | Yogmandu",
    description: "Full Board residential (USD 1,400) or live Online (USD 500) — same RYT 200 certification.",
  },
};

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Residential & Online 200-Hour Yoga Teacher Training in Nepal",
  description:
    "Yoga Alliance certified 200hr yoga teacher training offered as a Residential Full Board program in Kathmandu or a live Online program. Hatha, Ashtanga, anatomy, philosophy, pranayama, and teaching methodology.",
  provider: { "@type": "Organization", name: "Yogmandu", sameAs: "https://yogmandu.com" },
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
  hasCourseInstance: [
    { "@type": "CourseInstance", name: "Residential (Full Board)", courseMode: "onsite" },
    { "@type": "CourseInstance", name: "Online (Live Virtual)",    courseMode: "online" },
  ],
  offers: [
    { "@type": "Offer", priceCurrency: "USD", price: "1400", name: "Residential (Full Board)" },
    { "@type": "Offer", priceCurrency: "USD", price: "500",  name: "Online (Virtual)" },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "Yoga Teacher Training", item: "https://yogmandu.com/yoga-teacher-training" },
    { "@type": "ListItem", position: 3, name: "Residential & Online", item: "https://yogmandu.com/yoga-teacher-training/residential-online" },
  ],
};

const residentialIncludes = [
  { icon: "🛏", label: "Shared accommodation", sub: "25 nights at the Yogmandu campus" },
  { icon: "🥗", label: "3 organic meals daily", sub: "Vegetarian, sattvic kitchen" },
  { icon: "🍵", label: "Unlimited herbal teas", sub: "Throughout the day" },
  { icon: "💆", label: "2 Ayurvedic massages", sub: "Rest & recovery" },
  { icon: "🧺", label: "Shatkarma kit", sub: "For cleansing practices" },
  { icon: "📓", label: "Manual & notebook", sub: "Full Yogmandu curriculum" },
];

const onlineIncludes = [
  { icon: "💻", label: "Live online sessions", sub: "Real-time on Zoom — not pre-recorded" },
  { icon: "🧘", label: "Asana, pranayama & bandhas", sub: "Guided daily practice" },
  { icon: "📖", label: "Teaching methodology", sub: "Cueing, sequencing & observation" },
  { icon: "📄", label: "Digital training manual", sub: "Yours to keep" },
  { icon: "🗓", label: "Flexible from home", sub: "Join from anywhere in the world" },
  { icon: "🎓", label: "Same RYT 200 certificate", sub: "Yoga Alliance registered" },
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
  {
    q: "Is the certification the same for the residential and online programs?",
    a: "Yes. Both formats lead to the identical Yoga Alliance RYT 200 certificate. The curriculum — asana, pranayama, anatomy, philosophy, and teaching methodology — is the same; only the setting and inclusions differ.",
  },
  {
    q: "What does the Residential Full Board program include?",
    a: "The USD 1,400 residential program includes 25 nights of shared accommodation at the Yogmandu campus in Kathmandu, three organic vegetarian meals a day, unlimited herbal teas, a shatkarma kit, two Ayurvedic massages, and your training manual and notebook.",
  },
  {
    q: "How does the Online program work?",
    a: "The USD 500 online program runs as live, real-time sessions over Zoom — not pre-recorded videos. You practice asana, pranayama and bandhas, and study teaching methodology alongside the resident cohort. Registration is via a Google Form; contact us and we'll send the link.",
  },
  {
    q: "How do I secure my place in the residential program?",
    a: "A USD 200 deposit reserves your spot, with the remaining USD 1,200 due on arrival. Each cohort is limited to 12 students, so early booking is recommended.",
  },
  {
    q: "Can I switch between formats?",
    a: "Where space allows, yes — many students start online and later join a residential intake to complete their immersion. Message us on WhatsApp (+977-9810263277) and we'll help you plan.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function IncludeCard({
  accent, tag, title, price, priceSub, items,
}: {
  accent: string; tag: string; title: string; price: string; priceSub: string;
  items: { icon: string; label: string; sub: string }[];
}) {
  return (
    <div className="rounded-3xl p-8 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${accent}0C 0%, #FFFFFF 70%)`,
        border: `1.5px solid ${accent}2A`,
        boxShadow: `0 8px 28px ${accent}12`,
      }}>
      <div style={{
        position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%",
        background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`, pointerEvents: "none",
      }} />
      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase"
        style={{ color: accent, background: `${accent}1A`, padding: "4px 12px", borderRadius: 99, border: `1px solid ${accent}40` }}>
        {tag}
      </span>
      <h3 className="text-2xl font-light mt-4 mb-1" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
        {title}
      </h3>
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-3xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: accent }}>{price}</span>
        <span className="text-xs" style={{ color: "#9A7860" }}>{priceSub}</span>
      </div>
      <ul className="space-y-4 relative">
        {items.map((it) => (
          <li key={it.label} className="flex items-start gap-3">
            <span style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.15rem",
              background: `linear-gradient(135deg, ${accent}22, ${accent}08)`,
              border: `1px solid ${accent}33`,
            }}>{it.icon}</span>
            <span>
              <span className="block text-sm font-medium" style={{ color: "#2A1208" }}>{it.label}</span>
              <span className="block text-xs" style={{ color: "#7A5840" }}>{it.sub}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ResidentialOnlinePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden" style={{ background: "#FFFFFF" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 80% 20%, rgba(107,45,139,0.06) 0%, transparent 60%)" }} />

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <img src="/logo.png" alt="Yogmandu" width={160} height={64} fetchPriority="high" decoding="async" style={{ height: 64, width: "auto", objectFit: "contain" }} />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          {/* Breadcrumb */}
          <p className="text-xs mb-6" style={{ color: "#9A7860" }}>
            <Link href="/yoga-teacher-training" className="hover:underline" style={{ color: "#6B2D8B" }}>200hr Teacher Training</Link>
            <span> / Residential &amp; Online</span>
          </p>
          <p className="text-xs tracking-[0.3em] uppercase mb-6 font-medium" style={{ color: "#8DC63F" }}>
            Yoga Alliance RYS 200
          </p>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.05] mb-8 max-w-3xl mx-auto"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            Live-in immersion or <em style={{ color: "#6B2D8B" }}>train from home</em>
          </h1>
          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#4A2E1A", fontWeight: 400 }}>
            Two formats of our 200-hour program, one Yoga Alliance certification. Immerse fully with our Residential Full Board stay in Kathmandu, or join the same live training online from anywhere in the world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/9779810263277" target="_blank" rel="noopener noreferrer"
              className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm text-white"
              style={{ background: "#6B2D8B", boxShadow: "0 6px 20px rgba(107,45,139,0.35)" }}>
              Apply on WhatsApp
            </a>
            <Link href="/yoga-teacher-training"
              className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm"
              style={{ border: "1.5px solid #6B2D8B", color: "#6B2D8B" }}>
              ← Back to 200hr Overview
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing — the two formats */}
      <PricingSection
        tiers={[RESIDENTIAL_TIER, ONLINE_TIER]}
        eyebrow="Two Formats"
        title={<>Residential &amp; <em style={{ color: "#6B2D8B" }}>online</em></>}
        subtitle="Same 28-day curriculum, same RYT 200 certificate. Choose full immersion on-site or live training from home."
      />

      {/* What's included — side-by-side comparison */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#F7941D" }}>What&apos;s Included</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
              Compare the formats
            </h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IncludeCard
              accent="#6B2D8B" tag="Residential" title="Full Board Program"
              price="USD 1,400" priceSub="USD 200 deposit · balance on arrival"
              items={residentialIncludes}
            />
            <IncludeCard
              accent="#8DC63F" tag="Virtual" title="Online Program"
              price="USD 500" priceSub="Registration via Google Form"
              items={onlineIncludes}
            />
          </div>
        </div>
      </section>

      {/* Residential daily rhythm */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #1a0a2e 0%, #3D1560 60%, #1a0a2e 100%)" }}>
        <LotusBackdrop />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#8DC63F" }}>On Campus</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#FFFFFF" }}>
              A day in the residential program
            </h2>
            <p className="text-sm max-w-lg mx-auto mt-3" style={{ color: "rgba(255,255,255,0.72)" }}>
              Full board students live the practice from dawn to dusk. Online students join the core practice and lecture blocks live.
            </p>
          </div>
          <div style={{ border: "1px solid rgba(255,255,255,0.14)", borderRadius: "1.25rem", overflow: "hidden", background: "rgba(255,255,255,0.05)", backdropFilter: "blur(4px)" }}>
            {residentialDay.map((row, i) => (
              <div key={row.time} style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "0.85rem 1.5rem",
                borderBottom: i < residentialDay.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem",
                  color: "#F7941D", minWidth: 130, flexShrink: 0 }}>{row.time}</span>
                <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.85)" }}>{row.activity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2026 Dates */}
      <section className="py-16 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#6B2D8B" }}>Plan Ahead</p>
          <h2 className="text-3xl font-light mb-3" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            Choose Your Intake Month
          </h2>
          <p className="text-sm mb-10" style={{ color: "#7A5840" }}>
            Tap a month to reserve your place — each cohort is limited to 12 students.
          </p>
          <IntakeMonths />
          <p className="text-sm mt-6" style={{ color: "#7A5840" }}>Secure your place with a USD 200 deposit · Full balance due on arrival</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#6B2D8B" }}>Questions</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
              Frequently asked
            </h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="faq-item rounded-2xl"
                style={{ background: "#F9F5FF", border: "1px solid rgba(107,45,139,0.12)" }}>
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
          <p className="text-lg mb-10" style={{ color: "#4A2E1A", fontWeight: 400 }}>
            Cohorts fill quickly. Secure your place with a USD 200 deposit and our team will be in touch within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/9779810263277" target="_blank" rel="noopener noreferrer"
              className="cta-lift px-10 py-4 rounded-full text-white font-medium"
              style={{ background: "#6B2D8B" }}>Apply on WhatsApp</a>
            <Link href="/yoga-teacher-training"
              className="cta-lift px-10 py-4 rounded-full font-medium"
              style={{ border: "1.5px solid #F7941D", color: "#F7941D" }}>← 200hr Overview</Link>
          </div>
          <div className="mt-8 flex justify-center gap-8 text-sm" style={{ color: "#7A5840" }}>
            <span>📞 +977-9810263277</span>
            <span>✉️ info@yogmandu.com</span>
          </div>
        </div>
      </section>
    </>
  );
}
