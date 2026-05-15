import type { Metadata } from "next";
import SingingBowl from "@/components/SingingBowlClient";

export const metadata: Metadata = {
  title: "Sound Healing Therapy Nepal — Tibetan Singing Bowls | Yogmandu Kathmandu",
  description:
    "Authentic Tibetan singing bowl sound healing sessions and certification in Kathmandu, Nepal. Individual, group & immersive programs. Book your session with Yogmandu.",
};

const sessions = [
  {
    title: "Individual Session",
    duration: "60 min",
    price: "USD 45",
    desc: "A deeply personal one-on-one session. Bowls are placed on and around the body, tuned to your specific energy field.",
    color: "#F7941D",
  },
  {
    title: "Group Immersion",
    duration: "90 min",
    price: "USD 25 / person",
    desc: "A collective sound bath with 4–8 participants. Deeply relaxing — many participants report profound states of stillness.",
    color: "#6B2D8B",
  },
  {
    title: "Certification Training",
    duration: "7 Days",
    price: "USD 650",
    desc: "Learn to facilitate sound healing sessions yourself. Covers bowl selection, tuning theory, session design, and healing protocols.",
    color: "#8DC63F",
  },
];

export default function SoundHealingPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-36 pb-24 px-6 overflow-hidden"
        style={{ background: "#FAF6F0" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 30% 60%, rgba(247,148,29,0.05) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#F7941D" }}>
              Ancient Himalayan Practice
            </p>
            <h1
              className="text-5xl md:text-6xl font-light leading-[1.05] mb-8"
              style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}
            >
              Let sound dissolve
              <br />
              <em style={{ color: "#F7941D" }}>what words cannot reach</em>
            </h1>
            <p className="text-lg font-light leading-relaxed mb-10" style={{ color: "#555", maxWidth: "440px" }}>
              Tibetan singing bowl therapy, practiced in the Himalayas for centuries. Each session
              works through vibration to release tension, calm the nervous system, and restore
              inner equilibrium.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/9779800000000"
                className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm text-white"
                style={{ background: "#F7941D" }}
              >
                Book a Session
              </a>
              <a
                href="mailto:info@yogmandu.com"
                className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm"
                style={{ border: "1.5px solid #6B2D8B", color: "#6B2D8B" }}
              >
                Ask About Certification
              </a>
            </div>
          </div>

          {/* Bowl */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-xs h-72 animate-pulse-glow rounded-full">
              <SingingBowl />
            </div>
            <p
              className="mt-4 text-xs tracking-[0.25em] uppercase font-light"
              style={{ color: "#F7941D", opacity: 0.5 }}
            >
              Touch the bowl to hear it
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6" style={{ background: "#F0EAE2" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#6B2D8B" }}>
              The Science
            </p>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}
            >
              How sound heals
            </h2>
            <div className="section-divider mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Resonance",
                body: "The bowls produce frequencies that match and gently shift the brain's own oscillation — from beta (active) toward theta (deep rest).",
                color: "#F7941D",
              },
              {
                step: "02",
                title: "Vibration",
                body: "Sound waves travel through the water in your body, releasing tension held in tissue at a cellular level, where talk therapy cannot reach.",
                color: "#6B2D8B",
              },
              {
                step: "03",
                title: "Integration",
                body: "The silence after sound is equally important. In that stillness, the nervous system resets, and the body begins to remember its natural state of ease.",
                color: "#8DC63F",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="text-4xl font-light mb-4"
                  style={{ fontFamily: "Cormorant Garamond, serif", color: item.color, opacity: 0.3 }}
                >
                  {item.step}
                </div>
                <h3
                  className="text-2xl font-light mb-3"
                  style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: "#666" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions */}
      <section className="py-24 px-6" style={{ background: "#FAF6F0" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#F7941D" }}>
              Choose Your Path
            </p>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}
            >
              Sessions &amp; Programs
            </h2>
            <div className="section-divider mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sessions.map((s) => (
              <div
                key={s.title}
                className="rounded-3xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "#F0EAE2",
                  borderTop: `3px solid ${s.color}`,
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3
                      className="text-2xl font-light mb-1"
                      style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}
                    >
                      {s.title}
                    </h3>
                    <span className="text-xs tracking-wide font-light" style={{ color: "#888" }}>
                      {s.duration}
                    </span>
                  </div>
                  <span
                    className="text-sm font-medium px-3 py-1 rounded-full"
                    style={{ background: `${s.color}15`, color: s.color }}
                  >
                    {s.price}
                  </span>
                </div>
                <p className="text-sm font-light leading-relaxed flex-1 mb-8" style={{ color: "#555" }}>
                  {s.desc}
                </p>
                <a
                  href="https://wa.me/9779800000000"
                  className="cta-lift text-center px-6 py-3 rounded-full text-sm font-medium text-white"
                  style={{ background: s.color }}
                >
                  Book on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
