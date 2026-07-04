import Link from "next/link";
import type { ServiceConfig } from "./serviceContent";

// Reusable rich service page — same section rhythm as the Teacher Training
// child pages (CourseProgram): hero → overview → who-it's-for + what's-included
// → how-it-works → pricing/booking → FAQ → also-explore. All content comes from
// a ServiceConfig so every service page stays visually identical.

const WHATSAPP = "https://wa.me/9779810263277";
const PALETTE = ["#6B2D8B", "#F7941D", "#8DC63F"];

function SectionHeading({ eyebrow, title, color = "#6B2D8B" }: { eyebrow: string; title: string; color?: string }) {
  return (
    <div className="text-center mb-14">
      <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color }}>{eyebrow}</p>
      <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
        {title}
      </h2>
      <div className="section-divider mt-6" />
    </div>
  );
}

function CheckList({ items, color = "#6B2D8B", cols = 2 }: { items: string[]; color?: string; cols?: 1 | 2 }) {
  return (
    <ul className={`grid grid-cols-1 ${cols === 2 ? "md:grid-cols-2" : ""} gap-x-8 gap-y-3`}>
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-sm" style={{ color: "#3D2515" }}>
          <span style={{
            marginTop: 3, width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            background: `${color}18`, border: `1px solid ${color}55`,
            fontSize: 11, color, fontWeight: 700,
          }}>✓</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ServicePage({ config: c }: { config: ServiceConfig }) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden" style={{ background: "#FFFFFF" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 80% at 80% 20%, ${c.accent}0F 0%, transparent 60%)` }} />
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <img src="/logo.png" alt="Yogmandu" width={160} height={64} fetchPriority="high" decoding="async" style={{ height: 64, width: "auto", objectFit: "contain" }} />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs mb-6" style={{ color: "#9A7860" }}>
            <Link href={c.breadcrumb.href} className="hover:underline" style={{ color: "#6B2D8B" }}>{c.breadcrumb.label}</Link>
            <span> / {c.heroTitleA} {c.heroTitleEm}</span>
          </p>
          <p className="text-xs tracking-[0.3em] uppercase mb-6 font-medium" style={{ color: "#8DC63F" }}>{c.eyebrow}</p>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.05] mb-8 max-w-3xl mx-auto"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            {c.heroTitleA} <em style={{ color: c.accent }}>{c.heroTitleEm}</em>
          </h1>
          <p className="text-lg leading-relaxed mb-6 max-w-xl mx-auto" style={{ color: "#4A2E1A" }}>{c.heroLead}</p>
          <p className="text-sm mb-10 font-medium" style={{ color: "#B86010" }}>{c.heroMeta}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/book?service=${c.slug}`}
              className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm text-white"
              style={{ background: c.accent, boxShadow: `0 6px 20px ${c.accent}59` }}>
              {c.bookLabel}
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm"
              style={{ border: `1.5px solid ${c.accent}`, color: c.accent }}>
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading eyebrow="Overview" title={c.overviewHeading} color="#F7941D" />
          {c.overviewBody.map((p, i) => (
            <p key={i} className="text-base leading-relaxed mb-5" style={{ color: "#4A2E1A" }}>{p}</p>
          ))}
        </div>
      </section>

      {/* Who it's for + What's included */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-8 md:p-10"
            style={{ background: "linear-gradient(135deg, #F7941D0C 0%, #FFF7E8 80%)", border: "1.5px solid #F7941D2A" }}>
            <h3 className="text-2xl font-light mb-5" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Who it&apos;s for</h3>
            <CheckList items={c.forYou} color="#F7941D" cols={1} />
          </div>
          <div className="rounded-2xl p-8 md:p-10"
            style={{ background: `linear-gradient(135deg, ${c.accent}0C 0%, #F9F5FF 80%)`, border: `1.5px solid ${c.accent}2A` }}>
            <h3 className="text-2xl font-light mb-5" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>What&apos;s included</h3>
            <CheckList items={c.included} color={c.accent} cols={1} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="How It Works" title="Getting started is simple" color="#6B2D8B" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.steps.map((s, i) => (
              <div key={s.n} className="rounded-2xl p-7" style={{ background: "#FFFFFF", border: `1.5px solid ${PALETTE[i % 3]}22` }}>
                <span style={{
                  width: 44, height: 44, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: `${PALETTE[i % 3]}18`, border: `1.5px solid ${PALETTE[i % 3]}55`, color: PALETTE[i % 3],
                  fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem",
                }}>{s.n}</span>
                <h3 className="text-lg font-light mt-4 mb-2" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>{s.t}</h3>
                <p className="text-sm" style={{ color: "#4A2E1A" }}>{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / booking */}
      <section className="py-24 px-6" style={{ background: "#FAF3FF" }}>
        <div className="max-w-xl mx-auto text-center">
          <SectionHeading eyebrow="Pricing & Booking" title="Reserve your place" color="#F7941D" />
          <div className="rounded-2xl p-8 md:p-10" style={{ background: "#FFFFFF", border: `1.5px solid ${c.accent}22`, boxShadow: `0 8px 26px ${c.accent}12` }}>
            {c.price ? (
              <>
                <div className="text-[2.6rem] font-light leading-none mb-2"
                  style={{ fontFamily: "Cormorant Garamond, serif", color: c.accent }}>{c.price}</div>
                {c.priceNote && <p className="text-sm mb-6" style={{ color: "#7A5840" }}>{c.priceNote}</p>}
              </>
            ) : (
              <p className="text-sm mb-6" style={{ color: "#4A2E1A" }}>
                Message our team for current rates and availability — we reply within 24 hours.
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={`/book?service=${c.slug}`}
                className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm text-white" style={{ background: c.accent }}>
                {c.bookLabel}
              </Link>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm" style={{ border: `1.5px solid ${c.accent}`, color: c.accent }}>
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto">
          <SectionHeading eyebrow="Questions" title="Frequently asked" color="#6B2D8B" />
          <div className="space-y-3">
            {c.faqs.map((f) => (
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

      {/* CTA + also explore */}
      <section className="py-20 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Ready to begin?</h2>
          <p className="text-lg mb-10" style={{ color: "#4A2E1A" }}>
            Book online or message us — our team will confirm the details with you within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/book?service=${c.slug}`}
              className="cta-lift px-10 py-4 rounded-full text-white font-medium" style={{ background: c.accent }}>{c.bookLabel}</Link>
            <a href="mailto:info@yogmandu.com"
              className="cta-lift px-10 py-4 rounded-full font-medium" style={{ border: "1.5px solid #F7941D", color: "#F7941D" }}>Email us</a>
          </div>
          {c.siblingLinks.length > 0 && (
            <div className="mt-10">
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#9A7860" }}>Also explore</p>
              <div className="flex flex-wrap justify-center gap-3">
                {c.siblingLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="text-sm px-4 py-2 rounded-full hover:underline"
                    style={{ background: "#FFFFFF", border: "1px solid rgba(107,45,139,0.18)", color: "#6B2D8B" }}>{l.label}</Link>
                ))}
              </div>
            </div>
          )}
          <div className="mt-10 flex justify-center gap-8 text-sm" style={{ color: "#7A5840" }}>
            <span>📞 +977-9810263277</span>
            <span>✉️ info@yogmandu.com</span>
          </div>
        </div>
      </section>
    </>
  );
}
