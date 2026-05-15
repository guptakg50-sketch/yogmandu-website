"use client";
import { useRef } from "react";

const pillars = [
  {
    color: "#F7941D",
    title: "Authentic lineage",
    body: "Every technique traces directly to Himalayan masters. No hybridised wellness trends — just the real thing, held in its original context.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F7941D" strokeWidth="1.4">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    color: "#6B2D8B",
    title: "Intimate groups",
    body: "We cap every cohort at 12 students. You get genuine attention, honest feedback, and teachers who actually know your practice.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6B2D8B" strokeWidth="1.4">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    color: "#8DC63F",
    title: "Place as teacher",
    body: "The temples, the altitude, the living tradition — Kathmandu is woven into the curriculum. Nepal itself accelerates the transformation.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8DC63F" strokeWidth="1.4">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

function PillarCard({ p }: { p: (typeof pillars)[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="relative rounded-2xl p-8"
      style={{
        background: "white",
        border: `1px solid ${p.color}15`,
        boxShadow: "0 4px 24px rgba(42,18,8,0.05)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
      }}
      onMouseEnter={() => {
        if (!ref.current) return;
        ref.current.style.transform = "translateY(-5px)";
        ref.current.style.boxShadow = `0 20px 48px ${p.color}22`;
        ref.current.style.borderColor = `${p.color}35`;
      }}
      onMouseLeave={() => {
        if (!ref.current) return;
        ref.current.style.transform = "translateY(0)";
        ref.current.style.boxShadow = "0 4px 24px rgba(42,18,8,0.05)";
        ref.current.style.borderColor = `${p.color}15`;
      }}
    >
      <div className="absolute top-0 left-8 right-8 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${p.color}40, transparent)` }} />
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${p.color}10`, border: `1px solid ${p.color}20` }}>
        {p.icon}
      </div>
      <h3 className="text-xl font-light mb-3"
        style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
        {p.title}
      </h3>
      <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(42,18,8,0.5)" }}>
        {p.body}
      </p>
    </div>
  );
}

const stats = [
  { value: "500+", label: "Graduates worldwide", color: "#F7941D" },
  { value: "40+",  label: "Countries represented", color: "#6B2D8B" },
  { value: "10+",  label: "Years in Kathmandu",    color: "#8DC63F" },
  { value: "RYS",  label: "Yoga Alliance certified", color: "#F7941D" },
];

export default function WhySection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: "#FAF6F0" }}>
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px]"
          style={{ background: "radial-gradient(ellipse, rgba(247,148,29,0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-64 h-64"
          style={{ background: "radial-gradient(circle, rgba(107,45,139,0.06) 0%, transparent 70%)" }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="#6B2D8B" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#6B2D8B" }}>Why Yogmandu</p>
          <h2 className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            The difference you can <em style={{ color: "#F7941D" }}>feel</em>
          </h2>
          <div className="section-divider mt-5" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((s) => (
            <div key={s.value} className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                style={{
                  background: `${s.color}10`,
                  border: `1.5px solid ${s.color}25`,
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <span className="text-3xl font-light"
                  style={{ fontFamily: "Cormorant Garamond, serif", color: s.color }}>
                  {s.value}
                </span>
              </div>
              <p className="text-xs font-light tracking-wide" style={{ color: "rgba(42,18,8,0.45)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => <PillarCard key={p.title} p={p} />)}
        </div>
      </div>
    </section>
  );
}
