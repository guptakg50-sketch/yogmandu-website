import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Accessibility — Yogmandu Yoga & Sound Healing, Kathmandu" },
  description:
    "How Yogmandu works to make yogmandu.com and our Mid-Baneshwor studio usable for everyone, what we support today, where we still fall short, and how to reach us for help.",
  alternates: { canonical: "https://yogmandu.com/accessibility" },
  openGraph: {
    title: "Accessibility at Yogmandu",
    description: "Our commitment to making the website and the studio usable for everyone — and how to tell us when something isn't working.",
    url: "https://yogmandu.com/accessibility",
    images: ["/opengraph-image.png"],
  },
};

const WHATSAPP = "https://wa.me/9779810263277";

// Deliberately written as a commitment plus a plain description of where we
// stand — not a conformance claim. Nothing here should overstate what has been
// formally audited.
const SECTIONS = [
  {
    title: "Our commitment",
    body: [
      "Yoga is for every body, and that includes how you reach us online. We want anyone — using a screen reader, navigating by keyboard, viewing at high zoom, or practising with limited mobility — to be able to read our timetable, find a teacher and book a class without friction.",
      "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. That is a target we work towards continuously rather than a certification we hold.",
    ],
  },
  {
    title: "What the website supports today",
    list: [
      "Every page can be navigated with a keyboard alone, and the element in focus is always visible.",
      "Images that carry meaning have written descriptions for screen readers; decorative graphics are hidden from them so they don't add noise.",
      "Headings follow a logical order, so screen-reader users can jump through a page by structure.",
      "Body text meets AA contrast against its background, and the layout reflows without horizontal scrolling down to a 320-pixel-wide screen.",
      "Text scales when you zoom to 200% without content being cut off or overlapping.",
      "Decorative motion is kept subtle, and the 3D elements on the site are optional flourishes — no information is conveyed by animation alone.",
    ],
  },
  {
    title: "Where we still fall short",
    body: [
      "We want to be honest rather than tick a box. The site has not yet had a formal third-party accessibility audit, and we know some areas need work: a few of our older gallery photographs have thin or missing descriptions, and some decorative animations do not yet respond to the operating system's “reduce motion” setting.",
      "These are on our list. If you hit something that blocks you, telling us moves it to the top of that list.",
    ],
  },
  {
    title: "At the studio",
    body: [
      "Our studio is on Miteri Marg in Mid-Baneshwor, Kathmandu. Please contact us before your first visit if you have questions about access to the building, and we will describe the entrance and stairs honestly so you can decide what works for you.",
      "Our teachers routinely adapt practice for injury, pregnancy, limited mobility and chronic conditions — tell us what you need when you book and we will plan the class around it.",
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <main style={{ background: "#FFFFFF" }}>
      <section style={{
        background: "linear-gradient(155deg, #1a0535 0%, #3D1560 45%, #6B2D8B 100%)",
        padding: "7rem 1.5rem 4rem", textAlign: "center",
      }}>
        <p style={{ fontSize: "0.85rem", letterSpacing: "0.3em", textTransform: "uppercase",
          color: "#8DC63F", marginBottom: 14, fontWeight: 500 }}>
          Everyone is welcome
        </p>
        <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2.4rem,6vw,3.6rem)",
          fontWeight: 300, color: "#FFFFFF", lineHeight: 1.12, margin: "0 auto 16px", maxWidth: 620 }}>
          Accessibility at <em style={{ color: "#F7941D" }}>Yogmandu</em>
        </h1>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.82)", maxWidth: 560,
          margin: "0 auto", lineHeight: 1.7 }}>
          How we work to make this website and our studio usable for everyone — and how to tell us
          when we have got it wrong.
        </p>
      </section>

      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gap: "2.75rem" }}>
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.9rem",
                fontWeight: 400, color: "#2A1208", marginBottom: 14 }}>
                {s.title}
              </h2>
              {s.body?.map((p) => (
                <p key={p} style={{ fontSize: "1rem", lineHeight: 1.85, color: "#4A2E1A", marginBottom: 14 }}>
                  {p}
                </p>
              ))}
              {s.list && (
                <ul style={{ margin: 0, paddingLeft: "1.2rem", display: "grid", gap: 10 }}>
                  {s.list.map((item) => (
                    <li key={item} style={{ fontSize: "1rem", lineHeight: 1.8, color: "#4A2E1A" }}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Feedback — the part that actually matters to someone who is stuck. */}
          <div style={{
            borderRadius: "1.25rem", padding: "2rem",
            background: "linear-gradient(135deg, rgba(107,45,139,0.06), rgba(247,148,29,0.05))",
            border: "1.5px solid rgba(107,45,139,0.16)",
          }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.9rem",
              fontWeight: 400, color: "#2A1208", marginBottom: 12 }}>
              Tell us what isn&rsquo;t working
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "#4A2E1A", marginBottom: 20 }}>
              If any part of this site or our studio is difficult for you to use, please tell us what
              happened and what you were trying to do. We read every message, aim to reply within two
              working days, and will help you book by phone or WhatsApp in the meantime.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem" }}>
              <a href="mailto:info@yogmandu.com?subject=Website%20accessibility" className="cta-lift"
                style={{ display: "inline-block", padding: "0.8rem 1.8rem", borderRadius: 999,
                  background: "#6B2D8B", color: "#fff", fontSize: "0.9rem", fontWeight: 500,
                  textDecoration: "none", boxShadow: "0 6px 20px rgba(107,45,139,0.3)" }}>
                Email info@yogmandu.com
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="cta-lift"
                style={{ display: "inline-block", padding: "0.8rem 1.8rem", borderRadius: 999,
                  border: "1.5px solid #6B2D8B", color: "#6B2D8B", fontSize: "0.9rem",
                  fontWeight: 500, textDecoration: "none" }}>
                WhatsApp +977 9810263277
              </a>
              <Link href="/contact" className="cta-lift"
                style={{ display: "inline-block", padding: "0.8rem 1.8rem", borderRadius: 999,
                  border: "1.5px solid #A65808", color: "#A65808", fontSize: "0.9rem",
                  fontWeight: 500, textDecoration: "none" }}>
                Contact form
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
