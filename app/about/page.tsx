import type { Metadata } from "next";
import Link from "next/link";
import FloatingLotus from "@/components/FloatingLotusClient";

export const metadata: Metadata = {
  title: "About Yogmandu | Our Story, Team & Mission — Kathmandu, Nepal",
  description:
    "Meet the team behind Yogmandu — Yoga Alliance certified instructors and sound healing practitioners rooted in authentic Himalayan lineage. Based in Kathmandu, Nepal.",
};

const team = [
  {
    name: "Ramesh Sharma",
    role: "Founder & Lead Yoga Teacher",
    bio: "E-RYT 500 with 18 years of practice and teaching. Trained in Mysore, Rishikesh, and the monasteries of the Kathmandu Valley. Ramesh holds space with quiet authority and warmth.",
    color: "#6B2D8B",
    initials: "RS",
  },
  {
    name: "Sunita Tamang",
    role: "Sound Healing Practitioner",
    bio: "Certified in Tibetan singing bowl therapy with lineage from master practitioners in Boudhanath. Sunita's sessions are known for their depth and precision of tuning.",
    color: "#F7941D",
    initials: "ST",
  },
  {
    name: "Bikash Rai",
    role: "Philosophy & Anatomy Teacher",
    bio: "MSc in Yoga & Consciousness, 12 years teaching Sanskrit texts and modern anatomy. Bikash brings rigorous scholarship and accessibility to every module.",
    color: "#8DC63F",
    initials: "BR",
  },
  {
    name: "Anita Gurung",
    role: "Meditation & Pranayama Guide",
    bio: "10 years of dedicated pranayama practice and retreat facilitation. Anita guides students into the subtler layers of the practice with patience and precision.",
    color: "#F7941D",
    initials: "AG",
  },
];

const values = [
  { title: "Authentic Lineage", body: "Every technique we teach has a traceable source — no hybridised wellness trends. We root in verified traditions from the Himalayan region." },
  { title: "Intimate Scale", body: "We cap cohorts at 12. Every student receives real attention, real feedback, and a real relationship with their teachers." },
  { title: "Place as Practice", body: "Kathmandu is not incidental. The ancient temples, the altitude, the community — Nepal is woven into the curriculum itself." },
  { title: "Transformation Over Certificate", body: "We care far more about who you are when you leave than what paper you carry. The certificate follows naturally from genuine development." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden" style={{ background: "#FAF6F0" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 70% at 80% 30%, rgba(107,45,139,0.08) 0%, transparent 65%)" }} />
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#8DC63F" }}>Our Story</p>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.05] mb-8 max-w-3xl"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            Born from the valley,
            <br />
            <em style={{ color: "#F7941D" }}>rooted in the mountains</em>
          </h1>
          <p className="text-lg font-light leading-relaxed max-w-xl" style={{ color: "rgba(42,18,8,0.5)" }}>
            Yogmandu was founded in 2014 by Ramesh Sharma with a single conviction: that yoga is most powerfully transmitted in the place where it has been lived and practiced for thousands of years.
          </p>
        </div>
        {/* 3D Lotus */}
        <div className="max-w-5xl mx-auto mt-8">
          <FloatingLotus size="lg" />
          <p className="text-center text-xs tracking-[0.2em] uppercase font-light mt-2" style={{ color: "rgba(141,198,63,0.4)" }}>
            The lotus — rooted in mud, rising in light
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-24 px-6" style={{ background: "#F0EAE2" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-light mb-6" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
              Why we exist
            </h2>
            <div className="space-y-5 text-sm font-light leading-relaxed" style={{ color: "rgba(42,18,8,0.55)" }}>
              <p>
                We watched the global yoga industry fragment into a thousand commercial directions — many beautiful, many lost. We wanted to offer something different: a return to source, held in the city that has carried the deepest spiritual traditions of the Himalayan world.
              </p>
              <p>
                Yogmandu was never intended to be the biggest yoga school. It was always meant to be one of the most honest. We keep our groups small, our lineages clear, and our promises few but kept.
              </p>
              <p>
                Over 500 graduates from 40+ countries have come through our programs. Most of them tell us the same thing: they arrived thinking they were learning to teach yoga. They left understanding what it means to practice.
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "2014", label: "Founded", color: "#F7941D" },
              { value: "500+", label: "Graduates", color: "#8DC63F" },
              { value: "40+", label: "Countries", color: "#6B2D8B" },
              { value: "RYS 200", label: "Yoga Alliance", color: "#F7941D" },
            ].map(s => (
              <div key={s.value} className="card-light p-6 text-center">
                <div className="text-3xl font-light mb-2" style={{ fontFamily: "Cormorant Garamond, serif", color: s.color }}>{s.value}</div>
                <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(42,18,8,0.4)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6" style={{ background: "#FAF6F0" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#F7941D" }}>What We Stand For</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
              Our values
            </h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="card-light p-8">
                <div className="text-5xl font-light mb-4 leading-none"
                  style={{ fontFamily: "Cormorant Garamond, serif", color: ["#F7941D","#8DC63F","#6B2D8B","#F7941D"][i], opacity: 0.25 }}>
                  {String(i+1).padStart(2,"0")}
                </div>
                <h3 className="text-xl font-light mb-3" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>{v.title}</h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(42,18,8,0.5)" }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6" style={{ background: "#F0EAE2" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#8DC63F" }}>The Teachers</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
              Meet your guides
            </h2>
            <div className="section-divider mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map(member => (
              <div key={member.name} className="card-light p-8 flex gap-6 items-start">
                <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-medium"
                  style={{ background: `${member.color}20`, border: `1px solid ${member.color}30`, color: member.color }}>
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-xl font-light mb-0.5" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>{member.name}</h3>
                  <p className="text-xs tracking-wide mb-3" style={{ color: member.color }}>{member.role}</p>
                  <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(42,18,8,0.5)" }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ background: "#FAF6F0" }}>
        <h2 className="text-4xl font-light mb-6" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
          Ready to join us?
        </h2>
        <p className="font-light mb-10 max-w-md mx-auto" style={{ color: "rgba(42,18,8,0.45)" }}>
          The next cohort is forming. Get in touch and we will help you find the right program.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/contact" className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm"
            style={{ background: "#F7941D", color: "#FAF6F0" }}>
            Get in Touch
          </Link>
          <Link href="/yoga-teacher-training" className="cta-lift px-8 py-3.5 rounded-full font-medium text-sm"
            style={{ border: "1px solid rgba(107,45,139,0.4)", color: "#6B2D8B" }}>
            View Programs
          </Link>
        </div>
      </section>
    </>
  );
}
