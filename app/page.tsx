import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import SingingBowl from "@/components/SingingBowlClient";
import MountainScene from "@/components/MountainSceneClient";
import ProgramsSection from "@/components/ProgramsSectionClient";
import WhySection from "@/components/WhySection";

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "Course", position: 1,
      name: "200-Hour Yoga Teacher Training Nepal",
      description: "Yoga Alliance certified 200hr teacher training in Kathmandu, Nepal.",
      provider: { "@type": "Organization", name: "Yogmandu" },
      courseMode: "onsite", location: { "@type": "Place", name: "Kathmandu, Nepal" },
    },
    {
      "@type": "Course", position: 2,
      name: "Sound Healing Therapy Nepal — Tibetan Singing Bowls",
      description: "Authentic Tibetan singing bowl sessions in Kathmandu, Nepal.",
      provider: { "@type": "Organization", name: "Yogmandu" },
      courseMode: "onsite", location: { "@type": "Place", name: "Kathmandu, Nepal" },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />

      {/* ── HERO — warm white bg ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#FAF6F0" }}>
        {/* Soft orange + purple orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(247,148,29,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(107,45,139,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
          {/* Decorative orange rings */}
          <div className="absolute top-1/3 right-16 w-40 h-40 rounded-full pointer-events-none hidden md:block"
            style={{ border: "1.5px solid rgba(247,148,29,0.15)", animation: "float 8s ease-in-out infinite" }} />
          <div className="absolute top-1/2 right-24 w-24 h-24 rounded-full pointer-events-none hidden md:block"
            style={{ border: "1px solid rgba(247,148,29,0.1)", animation: "float 6s ease-in-out infinite 1s" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
            {/* Green pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8"
              style={{ background: "rgba(141,198,63,0.08)", border: "1px solid rgba(141,198,63,0.25)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#8DC63F" }} />
              <span className="text-xs tracking-[0.2em] uppercase font-light" style={{ color: "#8DC63F" }}>
                Yoga Alliance Registered · Nepal
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] mb-6"
              style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
              Where the mountains
              <br />
              <em style={{ color: "#F7941D" }}>hold your practice</em>
            </h1>

            <p className="text-base font-light leading-relaxed mb-10 max-w-md" style={{ color: "rgba(42,18,8,0.5)" }}>
              Yoga Alliance certified teacher training &amp; authentic Sound Healing in Kathmandu, Nepal.
              Transform your practice amid the Himalayas.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/yoga-teacher-training"
                className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm text-white"
                style={{ background: "#F7941D" }}>
                Explore Teacher Training
              </Link>
              <Link href="/sound-healing-therapy"
                className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm"
                style={{ border: "1.5px solid #6B2D8B", color: "#6B2D8B" }}>
                Discover Sound Healing
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-14">
              {[
                { value: "500+", label: "Graduates", color: "#F7941D" },
                { value: "10+",  label: "Years in Nepal", color: "#6B2D8B" },
                { value: "RYS",  label: "Yoga Alliance", color: "#8DC63F" },
              ].map((b, i) => (
                <div key={b.value} className="flex flex-col">
                  <span className="text-2xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: b.color }}>{b.value}</span>
                  <span className="text-xs font-light" style={{ color: "rgba(42,18,8,0.4)" }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Bowl */}
          <div className="flex flex-col items-center justify-center animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
            <div className="relative w-full max-w-xs h-72 animate-pulse-glow rounded-full">
              <SingingBowl />
            </div>
            <p className="mt-3 text-xs tracking-[0.25em] uppercase font-light"
              style={{ color: "rgba(247,148,29,0.5)" }}>
              Click the bowl to hear it
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, #F7941D, transparent)" }} />
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(42,18,8,0.25)" }}>scroll</span>
        </div>
      </section>

      {/* ── PROGRAMS — 3D interactive section ── */}
      <ProgramsSection />

      {/* ── NEPAL — deep purple bg, white text ── */}
      <section className="relative overflow-hidden" style={{ background: "#3D1560" }}>
        {/* Decorative orange circle */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(247,148,29,0.15) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(107,45,139,0.3) 0%, transparent 65%)", filter: "blur(40px)" }} />

        {/* CSS starfield for the top text area */}
        <svg className="absolute inset-0 w-full pointer-events-none" style={{ height: "55%", opacity: 0.7 }} aria-hidden>
          {[
            [8,12],[15,28],[22,8],[31,42],[38,18],[44,55],[51,7],[57,33],[63,19],[70,48],
            [76,11],[82,38],[89,22],[94,61],[6,67],[12,81],[19,54],[26,73],[33,87],[40,64],
            [47,79],[54,91],[61,68],[67,83],[73,57],[80,75],[86,88],[92,71],[3,44],[9,95],
            [16,37],[23,62],[30,14],[37,79],[43,29],[50,53],[56,86],[62,41],[68,72],[74,25],
            [81,58],[87,43],[93,84],[5,20],[11,49],[18,90],[25,33],[32,66],[39,10],[46,82],
            [52,47],[59,16],[65,60],[71,35],[78,93],[84,28],[90,51],[97,17],[4,76],[21,5],
            [35,97],[48,22],[60,89],[77,44],[91,63],[14,55],[28,38],[42,71],[55,13],[69,85],
            [83,30],[96,68],[7,92],[20,18],[34,57],[49,80],[63,45],[78,6],[88,73],[2,61],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r={i % 5 === 0 ? 1.4 : i % 3 === 0 ? 0.9 : 0.55}
              fill={i % 7 === 0 ? "#e8d8ff" : "#FAF0DC"}
              opacity={i % 4 === 0 ? 0.9 : i % 3 === 0 ? 0.6 : 0.4}
            />
          ))}
        </svg>

        {/* Text section */}
        <div className="relative py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#8DC63F" }}>The Setting</p>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-6 leading-[1.1]"
              style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Kathmandu is not a backdrop —
              <br />
              <em style={{ color: "#F7941D" }}>it is the practice itself</em>
            </h2>
            <p className="text-base font-light leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
              The ancient temples, the mountain air, the living tradition of yoga lineage — Nepal carries a
              frequency that deepens every session and accelerates every transformation.
            </p>
            <a href="https://wa.me/9779800000000"
              className="cta-lift inline-block px-10 py-4 rounded-full font-medium text-sm"
              style={{ background: "#F7941D", color: "white" }}>
              Plan Your Journey to Nepal
            </a>
          </div>
        </div>

        {/* 3D mountain scene */}
        <div className="relative">
          <MountainScene />
          <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
            style={{ background: "linear-gradient(to top, #3D1560, transparent)" }} />
        </div>
      </section>

      {/* ── WHY YOGMANDU — cream break section ── */}
      <WhySection />

      {/* ── TESTIMONIALS ── */}
      <Testimonials />
    </>
  );
}
