import { PricingCard } from "../yoga-teacher-training/PricingSection";
import type { HubConfig } from "./hubContent";

// The category hub grid — identical 3D tilt cards to the Teacher Training hub.
// Drop <ServiceHub {...SOME_HUB} /> into any category landing page.
export function ServiceHub({ eyebrow, title, titleEm, subtitle, tiers }: HubConfig) {
  return (
    <section className="py-24 px-6" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FAF3FF 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#F7941D" }}>{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            {title} <em style={{ color: "#6B2D8B" }}>{titleEm}</em>
          </h2>
          <p className="text-sm font-light max-w-xl mx-auto mt-4" style={{ color: "#6B5240" }}>{subtitle}</p>
          <div className="section-divider mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-6 pt-8" style={{ perspective: "1500px" }}>
          {tiers.map((tier) => <PricingCard key={tier.id} tier={tier} />)}
        </div>
      </div>
    </section>
  );
}
