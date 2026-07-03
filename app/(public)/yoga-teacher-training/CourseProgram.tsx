import Link from "next/link";
import IntakeMonths from "./IntakeMonths";
import LotusBackdrop from "@/components/LotusBackdropClient";

// Data-driven advanced-training course page. Both the 300hr and 500hr pages
// render this same component with their own config so the two stay visually
// identical and easy to edit. Contact details are always Yogmandu's own.

export type ScheduleBlock = { label: string; rows: { time: string; activity: string }[] };
export type Room = { name: string; single: string; double: string; amenities: string[] };
export type CurriculumBlock = { title: string; icon: string; color: string; items: string[] };

export type CourseConfig = {
  hours:        string;   // "500"
  eyebrow:      string;   // "Yoga Alliance RYS 500"
  heroTitleA:   string;
  heroTitleEm:  string;
  heroLead:     string;
  duration:     string;   // "45 days"
  startInfo:    string;   // "Starts on the 15th of every month"
  overviewHeading: string;
  overviewBody: string[];
  designedTo:   string[];
  whoCanJoin:   string[];
  highlights:   string[];
  objectives:   string[];
  curriculum:   CurriculumBlock[];
  evaluation:   { title: string; points: string[] }[];
  ceremony:     { title: string; body: string }[];
  certValue:    string;
  schedule:     ScheduleBlock[];
  pricingIntro: string;
  rooms?:       Room[];          // when set, shows the price table + accommodation
  contactPricing?: boolean;      // when true, shows a contact CTA instead of prices
  faqs:         { q: string; a: string }[];
  siblingLinks: { href: string; label: string }[];
};

const WHATSAPP = "https://wa.me/9779810263277";
const PALETTE = ["#6B2D8B", "#F7941D", "#8DC63F"];

// ── small building blocks ─────────────────────────────────────────────
function SectionHeading({ eyebrow, title, color = "#6B2D8B", light = false }: {
  eyebrow: string; title: string; color?: string; light?: boolean;
}) {
  return (
    <div className="text-center mb-14">
      <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color }}>{eyebrow}</p>
      <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: light ? "#FFFFFF" : "#2A1208" }}>
        {title}
      </h2>
      {!light && <div className="section-divider mt-6" />}
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

// ── the page ──────────────────────────────────────────────────────────
export default function CourseProgram({ config: c }: { config: CourseConfig }) {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden" style={{ background: "#FFFFFF" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 80% 20%, rgba(107,45,139,0.06) 0%, transparent 60%)" }} />
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <img src="/logo.png" alt="Yogmandu" width={160} height={64} fetchPriority="high" decoding="async" style={{ height: 64, width: "auto", objectFit: "contain" }} />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs mb-6" style={{ color: "#9A7860" }}>
            <Link href="/yoga-teacher-training" className="hover:underline" style={{ color: "#6B2D8B" }}>Teacher Training</Link>
            <span> / {c.hours}-Hour</span>
          </p>
          <p className="text-xs tracking-[0.3em] uppercase mb-6 font-medium" style={{ color: "#8DC63F" }}>{c.eyebrow}</p>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.05] mb-8 max-w-3xl mx-auto"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            {c.heroTitleA} <em style={{ color: "#6B2D8B" }}>{c.heroTitleEm}</em>
          </h1>
          <p className="text-lg leading-relaxed mb-6 max-w-xl mx-auto" style={{ color: "#4A2E1A" }}>{c.heroLead}</p>
          <p className="text-sm mb-10 font-medium" style={{ color: "#B86010" }}>
            {c.startInfo} · {c.duration} · Limited spots — secure yours today
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm text-white"
              style={{ background: "#6B2D8B", boxShadow: "0 6px 20px rgba(107,45,139,0.35)" }}>
              Register Now
            </a>
            <Link href="/yoga-teacher-training"
              className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm"
              style={{ border: "1.5px solid #6B2D8B", color: "#6B2D8B" }}>
              ← Teacher Training Overview
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading eyebrow="Program Info" title={c.overviewHeading} color="#F7941D" />
          {c.overviewBody.map((p, i) => (
            <p key={i} className="text-base leading-relaxed mb-5" style={{ color: "#4A2E1A" }}>{p}</p>
          ))}
        </div>
        <div className="max-w-4xl mx-auto mt-10 rounded-2xl p-8 md:p-10"
          style={{ background: "#FFFFFF", border: "1.5px solid #6B2D8B22", boxShadow: "0 6px 22px #6B2D8B10" }}>
          <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-5" style={{ color: "#6B2D8B" }}>A Course Designed To</p>
          <CheckList items={c.designedTo} color="#6B2D8B" />
        </div>
      </section>

      {/* Who can join + Highlights */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-8 md:p-10 mb-12"
            style={{ background: "linear-gradient(135deg, #F7941D0C 0%, #FFF7E8 80%)", border: "1.5px solid #F7941D2A" }}>
            <h3 className="text-2xl font-light mb-5" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Who can join this course?</h3>
            <CheckList items={c.whoCanJoin} color="#F7941D" />
          </div>
          <SectionHeading eyebrow="What You Gain" title={`Highlights of the ${c.hours}-hour training`} color="#8DC63F" />
          <div className="rounded-2xl p-8 md:p-10"
            style={{ background: "linear-gradient(135deg, #8DC63F0C 0%, #F9F5FF 80%)", border: "1.5px solid #8DC63F2A" }}>
            <CheckList items={c.highlights} color="#4A6418" />
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Program Objectives" title="What this training builds in you" color="#6B2D8B" />
          <div className="rounded-2xl p-8 md:p-10" style={{ background: "#FFFFFF", border: "1.5px solid #6B2D8B22" }}>
            <CheckList items={c.objectives} color="#6B2D8B" />
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Course & Curriculum" title="What you will study" color="#F7941D" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.curriculum.map((block) => (
              <div key={block.title} className="lift-3d rounded-2xl p-8 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${block.color}0C 0%, #F9F5FF 80%)`,
                  border: `1.5px solid ${block.color}22`, borderLeft: `3px solid ${block.color}`,
                  boxShadow: `0 6px 22px ${block.color}10`,
                }}>
                <div style={{
                  position: "absolute", top: -30, right: -30, width: 110, height: 110, borderRadius: "50%",
                  background: `radial-gradient(circle, ${block.color}22 0%, transparent 70%)`, pointerEvents: "none",
                }} />
                <div className="flex items-center gap-3 mb-4 relative">
                  <span style={{ fontSize: "1.3rem" }}>{block.icon}</span>
                  <p className="text-xs tracking-[0.22em] uppercase font-semibold" style={{ color: block.color }}>{block.title}</p>
                </div>
                <ul className="space-y-2 relative">
                  {block.items.map((item) => (
                    <li key={item} className="text-sm flex items-start gap-2" style={{ color: "#3D2515" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: block.color, boxShadow: `0 0 6px ${block.color}80` }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation & Certification */}
      <section className="py-20 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Evaluation & Certification" title="How you are assessed" color="#6B2D8B" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.evaluation.map((e) => (
              <div key={e.title} className="rounded-2xl p-8" style={{ background: "#FFFFFF", border: "1.5px solid #6B2D8B22" }}>
                <h3 className="text-xl font-light mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>{e.title}</h3>
                <ul className="space-y-2.5">
                  {e.points.map((p) => (
                    <li key={p} className="text-sm flex items-start gap-2" style={{ color: "#3D2515" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#6B2D8B" }} />{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Ceremony (dark) */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #1a0a2e 0%, #3D1560 60%, #1a0a2e 100%)" }}>
        <LotusBackdrop />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading eyebrow="Achievement Ceremony" title="Three graduations" color="#8DC63F" light />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.ceremony.map((g, i) => (
              <div key={g.title} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "1.25rem", padding: "2rem", backdropFilter: "blur(4px)" }}>
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: PALETTE[i % 3], background: `${PALETTE[i % 3]}22`, padding: "4px 12px", borderRadius: 99, border: `1px solid ${PALETTE[i % 3]}50` }}>
                  Step {i + 1}
                </span>
                <h3 className="text-2xl font-light mt-4 mb-2" style={{ fontFamily: "Cormorant Garamond, serif", color: "#FFFFFF" }}>{g.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>{g.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl p-8 text-center" style={{ background: "rgba(247,148,29,0.10)", border: "1px solid rgba(247,148,29,0.3)" }}>
            <p className="text-xs tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: "#F7941D" }}>Value of Certification</p>
            <p className="text-sm leading-relaxed max-w-3xl mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>{c.certValue}</p>
          </div>
        </div>
      </section>

      {/* Course schedule */}
      <section className="py-24 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Course Schedule" title="A typical day" color="#6B2D8B" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.schedule.map((blk) => (
              <div key={blk.label} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(107,45,139,0.14)", background: "#F9F5FF" }}>
                <div className="px-5 py-3" style={{ background: "#6B2D8B" }}>
                  <p className="text-xs tracking-[0.2em] uppercase font-semibold text-white">{blk.label}</p>
                </div>
                <div>
                  {blk.rows.map((row, i) => (
                    <div key={row.time + i} className="px-5 py-3" style={{ borderTop: i ? "1px solid rgba(107,45,139,0.08)" : "none" }}>
                      <span className="block text-sm font-medium" style={{ fontFamily: "Cormorant Garamond, serif", color: "#6B2D8B" }}>{row.time}</span>
                      <span className="block text-xs" style={{ color: "#4A2E1A" }}>{row.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-center mt-6" style={{ color: "#9A7860" }}>
            Schedule may be adjusted by the management. Students have one day off per week (typically Sunday).
          </p>
        </div>
      </section>

      {/* Pricing & accommodation */}
      <section className="py-24 px-6" style={{ background: "#FAF3FF" }}>
        <div className="max-w-5xl mx-auto">
          <SectionHeading eyebrow="Pricing & Start Dates" title="Fees & accommodation" color="#F7941D" />
          <p className="text-sm text-center max-w-2xl mx-auto mb-12" style={{ color: "#4A2E1A" }}>{c.pricingIntro}</p>

          {c.rooms ? (
            <>
              {/* Price table */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                {c.rooms.map((r, i) => (
                  <div key={r.name} className="rounded-2xl p-7 text-center relative overflow-hidden"
                    style={{ background: "#FFFFFF", border: `1.5px solid ${PALETTE[i % 3]}33`, boxShadow: `0 8px 26px ${PALETTE[i % 3]}12` }}>
                    <div style={{
                      position: "absolute", top: -30, right: -30, width: 110, height: 110, borderRadius: "50%",
                      background: `radial-gradient(circle, ${PALETTE[i % 3]}18 0%, transparent 70%)`, pointerEvents: "none",
                    }} />
                    <h3 className="text-xl font-light mb-5 relative" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>{r.name}</h3>
                    <div className="flex justify-center gap-6 relative">
                      <div>
                        <p className="text-[10px] tracking-[0.15em] uppercase mb-1" style={{ color: "#9A7860" }}>Single</p>
                        <p className="text-2xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: PALETTE[i % 3] }}>{r.single}</p>
                      </div>
                      <div style={{ width: 1, background: "rgba(0,0,0,0.08)" }} />
                      <div>
                        <p className="text-[10px] tracking-[0.15em] uppercase mb-1" style={{ color: "#9A7860" }}>Double</p>
                        <p className="text-2xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: PALETTE[i % 3] }}>{r.double}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Accommodation amenities */}
              <SectionHeading eyebrow="Accommodation & Facilities" title="Where you'll stay" color="#6B2D8B" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {c.rooms.map((r, i) => (
                  <div key={r.name} className="rounded-2xl p-7" style={{ background: "#FFFFFF", border: `1.5px solid ${PALETTE[i % 3]}22` }}>
                    <h4 className="text-lg font-light mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: PALETTE[i % 3] }}>{r.name}</h4>
                    <ul className="space-y-2">
                      {r.amenities.map((a) => (
                        <li key={a} className="text-sm flex items-start gap-2" style={{ color: "#3D2515" }}>
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: PALETTE[i % 3] }} />{a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="max-w-xl mx-auto rounded-2xl p-8 text-center" style={{ background: "#FFFFFF", border: "1.5px solid #6B2D8B22" }}>
              <p className="text-sm mb-6" style={{ color: "#4A2E1A" }}>
                For current fees, accommodation options and start dates, message our team — we&apos;ll send full details within 24 hours.
              </p>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="cta-lift inline-block px-8 py-3.5 rounded-full font-medium text-sm text-white" style={{ background: "#6B2D8B" }}>
                Get Pricing on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Intake months */}
      <section className="py-16 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#6B2D8B" }}>Plan Ahead</p>
          <h2 className="text-3xl font-light mb-3" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Choose your intake month</h2>
          <p className="text-sm mb-10" style={{ color: "#7A5840" }}>Cohorts are kept small for personalised guidance — reserve early.</p>
          <IntakeMonths />
        </div>
      </section>

      {/* How to book */}
      <section className="py-20 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="How to Book" title="Three simple steps" color="#F7941D" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "1", t: "Register online", b: "Fill out the booking form on our website — you'll receive a confirmation email." },
              { n: "2", t: "Pay the deposit", b: "A deposit confirms your spot; the balance is due on arrival. Cash, bank transfer, or debit/credit card." },
              { n: "3", t: "Plan your trip", b: "Prepare for your training in Kathmandu. Questions? Chat with our team any time." },
            ].map((s, i) => (
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
          <p className="text-xs text-center mt-8" style={{ color: "#9A7860" }}>
            Prices are listed in USD for convenience; payment in NPR is calculated at the exchange rate on your arrival.
          </p>
        </div>
      </section>

      {/* Why Nepal */}
      <section className="py-20 px-6" style={{ background: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading eyebrow="Why Nepal" title="Study yoga at its source" color="#6B2D8B" />
          <p className="text-base leading-relaxed mb-6" style={{ color: "#4A2E1A" }}>
            Nepal is the birthplace of yoga and meditation, offering a deeply spiritual atmosphere unlike anywhere else. Practising here connects you to ancient wisdom, Himalayan energy, and a community of like-minded seekers.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Learn traditional yoga immersed in nature", "Experience authentic Himalayan spirituality", "Join a supportive yogic community"].map((t) => (
              <span key={t} className="text-xs px-4 py-2 rounded-full" style={{ background: "#F9F5FF", border: "1px solid rgba(107,45,139,0.18)", color: "#6B2D8B" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-3xl mx-auto">
          <SectionHeading eyebrow="Questions" title="Frequently asked" color="#6B2D8B" />
          <div className="space-y-3">
            {c.faqs.map((f) => (
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
          <h2 className="text-4xl font-light mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Join us now</h2>
          <p className="text-lg mb-10" style={{ color: "#4A2E1A" }}>
            Secure your place with a deposit and our team will be in touch within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="cta-lift px-10 py-4 rounded-full text-white font-medium" style={{ background: "#6B2D8B" }}>Register on WhatsApp</a>
            <a href="mailto:info@yogmandu.com"
              className="cta-lift px-10 py-4 rounded-full font-medium" style={{ border: "1.5px solid #F7941D", color: "#F7941D" }}>Email us</a>
          </div>
          {c.siblingLinks.length > 0 && (
            <div className="mt-10">
              <p className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "#9A7860" }}>Also explore</p>
              <div className="flex flex-wrap justify-center gap-3">
                {c.siblingLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="text-sm px-4 py-2 rounded-full hover:underline"
                    style={{ background: "#F9F5FF", border: "1px solid rgba(107,45,139,0.18)", color: "#6B2D8B" }}>{l.label}</Link>
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
