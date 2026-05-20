"use client";
import { useState, useRef, useCallback } from "react";

const categories = ["All", "Yoga", "Sound Healing", "Nepal", "Graduates"];

type Photo = {
  id: number; cat: string; title: string; desc: string;
  aspect: "tall" | "wide" | "square";
  gradient: string; accentColor: string;
};

const photos: Photo[] = [
  { id: 1,  cat: "Yoga",          title: "Morning Asana Practice",    desc: "Sunrise session on the rooftop shala", aspect: "tall",   gradient: "linear-gradient(155deg,#2d0f4e 0%,#6B2D8B 55%,#9B59B6 100%)", accentColor: "#C39BD3" },
  { id: 2,  cat: "Nepal",         title: "Boudhanath Stupa",          desc: "The sacred stupa in the heart of Kathmandu", aspect: "wide",   gradient: "linear-gradient(140deg,#0a2a1a 0%,#1a5c3a 50%,#27ae60 100%)", accentColor: "#82E0AA" },
  { id: 3,  cat: "Sound Healing", title: "Singing Bowl Session",      desc: "Individual session with Himalayan bowls", aspect: "square", gradient: "linear-gradient(150deg,#7a2c00 0%,#c45000 50%,#F7941D 100%)", accentColor: "#FAD7A0" },
  { id: 4,  cat: "Graduates",     title: "Graduation Ceremony",       desc: "2024 cohort receiving their certificates", aspect: "wide",   gradient: "linear-gradient(145deg,#1a4a2a 0%,#2d7a45 55%,#8DC63F 100%)", accentColor: "#ABEBC6" },
  { id: 5,  cat: "Yoga",          title: "Pranayama Circle",          desc: "Group breathwork at dawn", aspect: "square", gradient: "linear-gradient(160deg,#1a0a3e 0%,#4B2D8B 50%,#7D5CC2 100%)", accentColor: "#BB8FCE" },
  { id: 6,  cat: "Nepal",         title: "Himalayan View",            desc: "Practicing with the mountains as witness", aspect: "tall",   gradient: "linear-gradient(150deg,#0d1b2a 0%,#1b4f72 50%,#2980b9 100%)", accentColor: "#85C1E9" },
  { id: 7,  cat: "Sound Healing", title: "Group Sound Bath",          desc: "Community healing session at the shala", aspect: "wide",   gradient: "linear-gradient(140deg,#6b2400 0%,#a83c00 50%,#e67e22 100%)", accentColor: "#F0B27A" },
  { id: 8,  cat: "Yoga",          title: "Adjustment & Alignment",    desc: "Hands-on teaching methodology", aspect: "square", gradient: "linear-gradient(155deg,#2c0a4e 0%,#5B1D8B 55%,#8E44AD 100%)", accentColor: "#D7BDE2" },
  { id: 9,  cat: "Nepal",         title: "Temple Morning Walk",       desc: "Daily practice of presence through the city", aspect: "square", gradient: "linear-gradient(145deg,#0a1f1a 0%,#145a3c 50%,#1e8449 100%)", accentColor: "#7DCEA0" },
  { id: 10, cat: "Graduates",     title: "Transformation Stories",    desc: "Students from 40+ countries", aspect: "tall",   gradient: "linear-gradient(160deg,#0f2a1a 0%,#1d6a3a 50%,#6AAF2A 100%)", accentColor: "#A9DFBF" },
  { id: 11, cat: "Yoga",          title: "Philosophy Class",          desc: "Exploring the Yoga Sutras", aspect: "wide",   gradient: "linear-gradient(140deg,#1f0a3e 0%,#4A1D78 55%,#7D3CB8 100%)", accentColor: "#C39BD3" },
  { id: 12, cat: "Sound Healing", title: "Bowl Collection",           desc: "Hand-selected Tibetan instruments", aspect: "square", gradient: "linear-gradient(155deg,#5a1e00 0%,#9a3000 50%,#D45800 100%)", accentColor: "#FAC3A0" },
];

function getCategoryIcon(cat: string) {
  if (cat === "Yoga") return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M22 14 C22 14 14 20 10 28 M22 14 C22 14 30 20 34 28 M14 22 C14 22 18 24 22 24 C26 24 30 22 30 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 28 C10 28 16 32 22 32 C28 32 34 28 34 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  if (cat === "Sound Healing") return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <ellipse cx="22" cy="26" rx="12" ry="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 26 Q10 16 22 16 Q34 16 34 26" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <ellipse cx="22" cy="26" rx="5" ry="2.5" stroke="currentColor" strokeWidth="1"/>
      <path d="M22 16 L22 10 M18 12 Q22 8 26 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M8 22 Q4 22 4 18 M36 22 Q40 22 40 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
  if (cat === "Nepal") return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M4 34 L14 14 L22 24 L30 10 L40 34 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M4 34 L40 34" stroke="currentColor" strokeWidth="1"/>
      <circle cx="22" cy="20" r="2" fill="currentColor" opacity="0.6"/>
      <path d="M18 26 Q22 22 26 26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
  if (cat === "Graduates") return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M22 8 L38 16 L22 24 L6 16 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M14 20 L14 30 Q14 34 22 34 Q30 34 30 30 L30 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M38 16 L38 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="38" cy="28" r="2" fill="currentColor"/>
    </svg>
  );
  return null;
}

function PhotoCard({ photo, onClick }: { photo: Photo; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const heightMap = { tall: "h-80", wide: "h-48", square: "h-64" };

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; const glow = glowRef.current;
    if (!el || !glow) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.03) translateZ(10px)`;
    glow.style.opacity = "1";
    glow.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.12) 0%, transparent 65%)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current; const glow = glowRef.current;
    if (!el || !glow) return;
    el.style.transform = "";
    glow.style.opacity = "0";
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        borderRadius: "1.25rem", overflow: "hidden", cursor: "pointer",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        position: "relative",
      }}
    >
      {/* Photo area */}
      <div className={`w-full ${heightMap[photo.aspect]} relative overflow-hidden`}
        style={{ background: photo.gradient }}>

        {/* Glow overlay */}
        <div ref={glowRef} style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.2s", pointerEvents: "none", zIndex: 1 }} />

        {/* Category SVG art */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          color: photo.accentColor, opacity: 0.35,
        }}>
          <div style={{ transform: "scale(1.8)" }}>{getCategoryIcon(photo.cat)}</div>
        </div>

        {/* Geometric accent lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }} aria-hidden>
          <line x1="0" y1="100%" x2="100%" y2="0" stroke={photo.accentColor} strokeWidth="1"/>
          <line x1="0" y1="70%" x2="70%" y2="0" stroke={photo.accentColor} strokeWidth="0.5"/>
          <circle cx="85%" cy="15%" r="40" fill="none" stroke={photo.accentColor} strokeWidth="1"/>
        </svg>

        {/* Bottom gradient overlay on hover */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)", zIndex: 2 }}>
          <div>
            <p className="text-white text-sm font-light">{photo.title}</p>
            <p className="text-xs font-light mt-0.5" style={{ color: photo.accentColor }}>{photo.desc}</p>
          </div>
        </div>

        {/* Category pill */}
        <div style={{
          position: "absolute", top: 12, right: 12, zIndex: 3,
          padding: "4px 10px", borderRadius: "3rem",
          background: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)",
          fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
          color: photo.accentColor, fontWeight: 500,
        }}>
          {photo.cat}
        </div>
      </div>

      {/* Card footer */}
      <div style={{ padding: "0.85rem 1rem", background: "#FFFFFF" }}>
        <p style={{ fontSize: "0.88rem", color: "#2A1208", fontWeight: 400 }}>{photo.title}</p>
        <p style={{ fontSize: "0.72rem", color: "rgba(42,18,8,0.45)", marginTop: 2 }}>{photo.desc}</p>
      </div>
    </div>
  );
}

function Lightbox({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 50,
        background: "rgba(8,4,16,0.92)", backdropFilter: "blur(16px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem",
        animation: "lbFadeIn 0.25s ease",
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes lbSlideUp { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
      <div
        style={{
          maxWidth: 480, width: "100%",
          borderRadius: "1.5rem", overflow: "hidden",
          animation: "lbSlideUp 0.3s ease",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Large photo area */}
        <div style={{ height: 280, background: photo.gradient, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: photo.accentColor, opacity: 0.4, transform: "scale(2.5)" }}>
            {getCategoryIcon(photo.cat)}
          </div>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }} aria-hidden>
            <line x1="0" y1="100%" x2="100%" y2="0" stroke={photo.accentColor} strokeWidth="1.5"/>
            <circle cx="80%" cy="20%" r="60" fill="none" stroke={photo.accentColor} strokeWidth="1"/>
            <circle cx="80%" cy="20%" r="40" fill="none" stroke={photo.accentColor} strokeWidth="0.5"/>
          </svg>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
          <div style={{ position: "absolute", top: 16, right: 16, padding: "4px 12px", borderRadius: "3rem", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: photo.accentColor, fontWeight: 500 }}>
            {photo.cat}
          </div>
        </div>

        {/* Info */}
        <div style={{ background: "#FFFFFF", padding: "1.75rem 2rem" }}>
          <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.75rem", fontWeight: 300, color: "#2A1208", marginBottom: 6 }}>{photo.title}</h3>
          <p style={{ fontSize: "0.9rem", color: "rgba(42,18,8,0.55)", marginBottom: 20 }}>{photo.desc}</p>
          <button
            onClick={onClose}
            style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(42,18,8,0.35)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            Close ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GalleryGrid() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  const filtered = active === "All" ? photos : photos.filter(p => p.cat === active);

  return (
    <>
      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, #FAF6F0 60%, #F0EAE2 100%)", padding: "9rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: "0.72rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#8DC63F", marginBottom: 20 }}>Visual Journey</p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 300, color: "#2A1208", lineHeight: 1.05, marginBottom: 20 }}>
            Life at <em style={{ color: "#F7941D" }}>Yogmandu</em>
          </h1>
          <p style={{ fontSize: "1rem", color: "rgba(42,18,8,0.5)", maxWidth: 480, lineHeight: 1.75 }}>
            A glimpse into our classes, ceremonies, and the extraordinary city that holds us all.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div style={{ background: "#FAF6F0", padding: "0 1.5rem", position: "sticky", top: 64, zIndex: 10, borderBottom: "1px solid rgba(42,18,8,0.06)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 8, flexWrap: "wrap", padding: "1rem 0" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "0.45rem 1.1rem", borderRadius: "3rem",
                fontSize: "0.8rem", fontWeight: 500, cursor: "pointer",
                transition: "all 0.25s ease",
                background: active === cat ? "#F7941D" : "transparent",
                color: active === cat ? "#FFFFFF" : "rgba(42,18,8,0.5)",
                border: active === cat ? "1.5px solid #F7941D" : "1.5px solid rgba(42,18,8,0.15)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <section style={{ background: "#FAF6F0", padding: "2.5rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", columns: "1", gap: "1.25rem" }}
          className="sm:columns-2 md:columns-3">
          {filtered.map(photo => (
            <div key={photo.id} style={{ breakInside: "avoid", marginBottom: "1.25rem" }}>
              <PhotoCard photo={photo} onClick={() => setLightbox(photo)} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem", color: "rgba(42,18,8,0.35)" }}>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 300 }}>No photos in this category yet</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}
