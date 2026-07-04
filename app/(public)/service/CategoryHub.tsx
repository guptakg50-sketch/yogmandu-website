import Link from "next/link";
import { ServiceHub } from "./ServiceHub";
import type { HubConfig } from "./hubContent";

// A standalone category hub page — hero + the 3D card grid + closing CTA, laid
// out exactly like the Teacher Training hub. Used by the new top-level category
// pages (Therapy & Wellness, For Specific Groups) that don't already have a
// canonical landing page to attach the grid to.

const WHATSAPP = "https://wa.me/9779810263277";

export type CategoryHubConfig = {
  eyebrow:   string;
  titleA:    string;
  titleEm:   string;
  lead:      string;
  primaryCta: { href: string; label: string };
  hub:       HubConfig;
  accent:    string;
};

export default function CategoryHub({ config: c }: { config: CategoryHubConfig }) {
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
          <p className="text-xs tracking-[0.3em] uppercase mb-6 font-medium" style={{ color: "#8DC63F" }}>{c.eyebrow}</p>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.05] mb-8 max-w-3xl mx-auto"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            {c.titleA} <em style={{ color: c.accent }}>{c.titleEm}</em>
          </h1>
          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "#4A2E1A" }}>{c.lead}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={c.primaryCta.href}
              className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm text-white"
              style={{ background: c.accent, boxShadow: `0 6px 20px ${c.accent}59` }}>
              {c.primaryCta.label}
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm"
              style={{ border: `1.5px solid ${c.accent}`, color: c.accent }}>
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* The 3D card hub grid */}
      <ServiceHub {...c.hub} />

      {/* Closing CTA */}
      <section className="py-20 px-6" style={{ background: "#F9F5FF" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-4" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>Not sure which is right for you?</h2>
          <p className="text-lg mb-10" style={{ color: "#4A2E1A" }}>
            Message our team and we&apos;ll help you choose — we reply within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="cta-lift px-10 py-4 rounded-full text-white font-medium" style={{ background: c.accent }}>Ask on WhatsApp</a>
            <a href="mailto:info@yogmandu.com"
              className="cta-lift px-10 py-4 rounded-full font-medium" style={{ border: "1.5px solid #F7941D", color: "#F7941D" }}>Email us</a>
          </div>
          <div className="mt-10 flex justify-center gap-8 text-sm" style={{ color: "#7A5840" }}>
            <span>📞 +977-9810263277</span>
            <span>✉️ info@yogmandu.com</span>
          </div>
        </div>
      </section>
    </>
  );
}
