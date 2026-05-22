"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import type { DBMedia } from "@/lib/publicData";

const FloatingLotus = dynamic(() => import("@/components/FloatingLotus"), {
  ssr: false,
  loading: () => (
    <div className="h-72 flex items-center justify-center">
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(141,198,63,0.12)", border: "1px solid rgba(141,198,63,0.25)", animation: "pulse 2s infinite" }} />
    </div>
  ),
});

const PARTICLES = [
  { left: 7,  delay: 0.3, dur: 4.2, size: 3 }, { left: 16, delay: 1.4, dur: 5.1, size: 2 },
  { left: 25, delay: 0.7, dur: 3.8, size: 4 }, { left: 34, delay: 2.0, dur: 4.9, size: 2 },
  { left: 43, delay: 0.5, dur: 5.6, size: 3 }, { left: 54, delay: 1.9, dur: 4.3, size: 2 },
  { left: 63, delay: 0.8, dur: 3.7, size: 4 }, { left: 72, delay: 2.3, dur: 5.0, size: 3 },
  { left: 81, delay: 0.6, dur: 4.7, size: 2 }, { left: 90, delay: 1.1, dur: 3.9, size: 3 },
  { left: 11, delay: 3.0, dur: 6.1, size: 2 }, { left: 22, delay: 2.6, dur: 5.4, size: 3 },
  { left: 49, delay: 3.4, dur: 4.5, size: 2 }, { left: 67, delay: 1.0, dur: 5.9, size: 4 },
  { left: 87, delay: 2.8, dur: 4.1, size: 2 },
];

// ── Types ─────────────────────────────────────────────────────────────────────
interface PhotoItem { id: string; src: string; cat: string; title: string; desc: string }

const CATEGORIES = ["All", "Yoga", "Sound Healing", "Graduates"];

const CAT_ACCENT: Record<string, string> = {
  Yoga:            "#F7941D",
  "Sound Healing": "#6B2D8B",
  Graduates:       "#8DC63F",
};

const STATIC_PHOTOS: PhotoItem[] = [
  // Sound Healing
  { id: "b1",  src: "/images/gallery/bell/bowl-1.jpg",            cat: "Sound Healing", title: "Tibetan Singing Bowl",        desc: "Authentic sound healing" },
  { id: "b2",  src: "/images/gallery/bell/bowl-2.jpg",            cat: "Sound Healing", title: "Bowl Session",                desc: "Healing frequencies" },
  { id: "b3",  src: "/images/gallery/bell/bowl-3.jpg",            cat: "Sound Healing", title: "Sound Bath",                  desc: "Deep resonance therapy" },
  { id: "b4",  src: "/images/gallery/bell/bowl-4.jpg",            cat: "Sound Healing", title: "Singing Bowl Ritual",         desc: "Ancient tradition" },
  { id: "b5",  src: "/images/gallery/bell/bowl-5.jpg",            cat: "Sound Healing", title: "Bowl Collection",             desc: "Himalayan instruments" },
  { id: "b6",  src: "/images/gallery/bell/bowl-6.jpg",            cat: "Sound Healing", title: "Healing Session",             desc: "Vibration therapy" },
  { id: "b7",  src: "/images/gallery/bell/bowl-7.jpg",            cat: "Sound Healing", title: "Group Sound Bath",            desc: "Collective healing" },
  { id: "b8",  src: "/images/gallery/bell/bowl-8.jpg",            cat: "Sound Healing", title: "Bowl Practice",               desc: "Traditional technique" },
  { id: "b9",  src: "/images/gallery/bell/bowl-9.jpg",            cat: "Sound Healing", title: "Bowl Ceremony",               desc: "Himalayan ritual" },
  { id: "b10", src: "/images/gallery/bell/bowl-10.jpg",           cat: "Sound Healing", title: "Morning Sound Bath",          desc: "Sunrise resonance" },
  { id: "b11", src: "/images/gallery/bell/bowl-11.jpg",           cat: "Sound Healing", title: "Healing Circle",              desc: "Group therapy session" },
  { id: "b12", src: "/images/gallery/bell/bowl-12.jpg",           cat: "Sound Healing", title: "Sacred Bowls",                desc: "Ancient instruments" },
  { id: "b13", src: "/images/gallery/bell/bowl-13.jpg",           cat: "Sound Healing", title: "Vibration Therapy",           desc: "Deep healing tones" },
  { id: "b14", src: "/images/gallery/bell/bowl-14.jpg",           cat: "Sound Healing", title: "Sound Journey",               desc: "Meditative frequencies" },
  { id: "b15", src: "/images/gallery/bell/bowl-15.jpg",           cat: "Sound Healing", title: "Bowl Collection",             desc: "Hand-crafted bowls" },
  { id: "b16", src: "/images/gallery/bell/bowl-16.jpg",           cat: "Sound Healing", title: "Evening Session",             desc: "Twilight sound bath" },
  { id: "br",  src: "/images/gallery/bell/bellrining.jpg",        cat: "Sound Healing", title: "Bell Ringing",                desc: "Sacred ceremony" },
  { id: "ps1", src: "/images/gallery/bell/people-sleeping-1.jpg", cat: "Sound Healing", title: "Yoga Nidra Session",          desc: "Deep yogic rest" },
  { id: "ps2", src: "/images/gallery/bell/people-sleeping-2.jpg", cat: "Sound Healing", title: "Sound Bath Rest",             desc: "Restorative healing" },
  { id: "ps3", src: "/images/gallery/bell/people-sleeping-3.jpg", cat: "Sound Healing", title: "Group Nidra",                 desc: "Collective deep rest" },
  // Graduates
  { id: "c1",  src: "/images/gallery/certificates/certificate-1.jpg", cat: "Graduates", title: "Graduation Ceremony",        desc: "Certified yoga teachers" },
  { id: "c2",  src: "/images/gallery/certificates/certificate-2.jpg", cat: "Graduates", title: "Certificate Presentation",    desc: "Yoga Alliance certified" },
  { id: "c3",  src: "/images/gallery/certificates/certificate-3.jpg", cat: "Graduates", title: "Teacher Training Graduates",  desc: "3,000+ trained globally" },
  { id: "c4",  src: "/images/gallery/certificates/certificate-4.jpg", cat: "Graduates", title: "Certification Day",           desc: "50+ countries represented" },
  { id: "c5",  src: "/images/gallery/certificates/certificate-5.jpg", cat: "Graduates", title: "Graduate Celebration",        desc: "Achievement unlocked" },
  { id: "c6",  src: "/images/gallery/certificates/certificate-6.jpg", cat: "Graduates", title: "Training Complete",           desc: "Journey accomplished" },
  { id: "c7",  src: "/images/gallery/certificates/certificate-7.jpg", cat: "Graduates", title: "Certified Teachers",          desc: "Ready to teach the world" },
  { id: "c8",  src: "/images/gallery/certificates/certificate-8.jpg", cat: "Graduates", title: "Graduation Day",              desc: "A new chapter begins" },
  // Yoga
  { id: "y1",  src: "/images/gallery/yoga/yoga-1.jpg",  cat: "Yoga", title: "Morning Practice",   desc: "Sunrise Hatha flow" },
  { id: "y2",  src: "/images/gallery/yoga/yoga-2.jpg",  cat: "Yoga", title: "Alignment Class",    desc: "Hands-on guidance" },
  { id: "y3",  src: "/images/gallery/yoga/yoga-3.jpg",  cat: "Yoga", title: "Ashtanga Series",    desc: "Primary series practice" },
  { id: "y4",  src: "/images/gallery/yoga/yoga-4.jpg",  cat: "Yoga", title: "Vinyasa Flow",       desc: "Breath and movement" },
  { id: "y5",  src: "/images/gallery/yoga/yoga-5.jpg",  cat: "Yoga", title: "Group Class",        desc: "Community practice" },
  { id: "y6",  src: "/images/gallery/yoga/yoga-6.jpg",  cat: "Yoga", title: "Asana Practice",     desc: "Yogmandu studio" },
  { id: "y7",  src: "/images/gallery/yoga/yoga-7.jpg",  cat: "Yoga", title: "Yoga Session",       desc: "Daily practice" },
  { id: "y8",  src: "/images/gallery/yoga/yoga-8.jpg",  cat: "Yoga", title: "Studio Flow",        desc: "Guided movement" },
  { id: "y9",  src: "/images/gallery/yoga/yoga-9.jpg",  cat: "Yoga", title: "Breathwork Class",   desc: "Pranayama session" },
  { id: "y10", src: "/images/gallery/yoga/yoga-10.jpg", cat: "Yoga", title: "Posture Workshop",   desc: "Alignment focus" },
  { id: "y11", src: "/images/gallery/yoga/yoga-11.jpg", cat: "Yoga", title: "Evening Practice",   desc: "Wind-down flow" },
  { id: "y12", src: "/images/gallery/yoga/yoga-12.jpg", cat: "Yoga", title: "Group Session",      desc: "Collective energy" },
];

// ── 3-D tilt card (matches WhySection's exact technique) ─────────────────────
function TiltPhotoCard({
  photo,
  onOpen,
}: {
  photo: PhotoItem;
  onOpen: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const accent  = CAT_ACCENT[photo.cat] ?? "#F7941D";

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.03)`;
    el.style.boxShadow = `${-x * 18}px ${y * 18}px 40px rgba(0,0,0,0.18), 0 0 0 1.5px ${accent}55`;
  }, [accent]);

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    el.style.boxShadow = `0 4px 24px rgba(0,0,0,0.10)`;
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onOpen}
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: "4 / 3",
        flexShrink: 0,
        willChange: "transform",
        transition: "transform 0.12s ease, box-shadow 0.12s ease",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        background: "#fff",
      }}
    >
      {/* Accent line at top */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 2, zIndex: 2,
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        opacity: 0.7,
      }} />

      {/* Photo */}
      <img
        src={photo.src}
        alt={photo.title}
        loading="lazy"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={e => { (e.target as HTMLImageElement).style.opacity = "0"; }}
      />

      {/* Gradient overlay — always visible at bottom */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(5,0,18,0.85) 0%, rgba(5,0,18,0.1) 40%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Caption */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "1rem 1.2rem", zIndex: 1,
      }}>
        <span style={{
          display: "inline-block",
          fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase",
          color: accent, background: `${accent}1a`,
          padding: "2px 8px", borderRadius: 99, marginBottom: 6,
        }}>{photo.cat}</span>
        <p style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "1.1rem", fontWeight: 400, color: "#fff",
          lineHeight: 1.2, margin: 0,
        }}>{photo.title}</p>
      </div>

      {/* Corner glow */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: 120, height: 120,
        background: `radial-gradient(circle at 100% 0%, ${accent}18 0%, transparent 65%)`,
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  photos, index, onClose, onPrev, onNext,
}: {
  photos: PhotoItem[]; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const photo  = photos[index];
  const accent = CAT_ACCENT[photo.cat] ?? "#F7941D";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  const navStyle: React.CSSProperties = {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)",
    color: "#fff", borderRadius: "50%", width: 52, height: 52, fontSize: 20,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    transition: "background 0.2s",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(4, 1, 12, 0.96)", backdropFilter: "blur(20px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "lbIn 0.2s ease",
      }}
    >
      <style>{`
        @keyframes lbIn { from{opacity:0} to{opacity:1} }
        @keyframes lbUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .lb-nav:hover { background: rgba(255,255,255,0.16) !important; }
        .lb-nav:disabled { opacity:.18 !important; cursor:default !important; }
      `}</style>

      <button className="lb-nav" disabled={index === 0}
        style={{ ...navStyle, left: 20 }}
        onClick={e => { e.stopPropagation(); onPrev(); }}>←</button>

      <div onClick={e => e.stopPropagation()}
        style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1.4rem", maxWidth:"90vw" }}>
        <img key={photo.id} src={photo.src} alt={photo.title}
          style={{
            maxWidth:"82vw", maxHeight:"70vh", objectFit:"contain",
            borderRadius:14, boxShadow:"0 30px 80px rgba(0,0,0,0.85)",
            animation:"lbUp 0.25s ease", display:"block",
          }} />
        <div style={{ textAlign:"center", animation:"lbUp 0.3s ease" }}>
          <span style={{
            display:"inline-block", fontSize:"0.6rem", letterSpacing:"0.28em",
            textTransform:"uppercase", color: accent,
            background:`${accent}1a`, padding:"3px 10px", borderRadius:99, marginBottom:10,
          }}>{photo.cat}</span>
          <p style={{ fontFamily:"Cormorant Garamond, serif", fontSize:"1.4rem", fontWeight:300, color:"#fff", marginBottom:4 }}>
            {photo.title}
          </p>
          {photo.desc && <p style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.38)" }}>{photo.desc}</p>}
          <p style={{ marginTop:12, fontSize:"0.58rem", color:"rgba(255,255,255,0.16)", letterSpacing:"0.15em" }}>
            {index + 1} / {photos.length}
          </p>
        </div>
      </div>

      <button className="lb-nav" disabled={index === photos.length - 1}
        style={{ ...navStyle, right: 20 }}
        onClick={e => { e.stopPropagation(); onNext(); }}>→</button>

      <button onClick={onClose}
        style={{ position:"absolute", top:20, right:24, background:"none", border:"none",
          color:"rgba(255,255,255,0.35)", fontSize:28, cursor:"pointer", lineHeight:1 }}
        onMouseEnter={e => (e.currentTarget.style.color="#fff")}
        onMouseLeave={e => (e.currentTarget.style.color="rgba(255,255,255,0.35)")}>✕</button>

      <p style={{ position:"absolute", bottom:18, left:"50%", transform:"translateX(-50%)",
        fontSize:"0.56rem", letterSpacing:"0.18em", textTransform:"uppercase",
        color:"rgba(255,255,255,0.13)", pointerEvents:"none", whiteSpace:"nowrap" }}>
        ← → navigate · Esc close
      </p>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
interface GalleryGridProps { media?: DBMedia[] | null }

export default function GalleryGrid({ media }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [startIdx, setStartIdx]             = useState(0);
  const [lightboxIdx, setLightboxIdx]       = useState<number | null>(null);
  const [sliding, setSliding]               = useState(false);

  // How many cards are visible — we'll read from a CSS var, but default to 3
  const VISIBLE = 3;

  const allPhotos: PhotoItem[] = useMemo(() => {
    if (media && media.length > 0) {
      return media.map(m => ({ id: m.id, src: m.url, cat: "Yoga", title: m.caption || "Photo", desc: "" }));
    }
    return STATIC_PHOTOS;
  }, [media]);

  const filtered = useMemo(() =>
    activeCategory === "All" ? allPhotos : allPhotos.filter(p => p.cat === activeCategory),
  [allPhotos, activeCategory]);

  const maxStart   = Math.max(0, filtered.length - VISIBLE);
  const canPrev    = startIdx > 0;
  const canNext    = startIdx < maxStart;

  // Smooth slide with a brief disabled window
  const slide = useCallback((dir: 1 | -1) => {
    if (sliding) return;
    setSliding(true);
    setStartIdx(i => Math.max(0, Math.min(maxStart, i + dir)));
    setTimeout(() => setSliding(false), 420);
  }, [sliding, maxStart]);

  // Reset carousel on category change
  useEffect(() => { setStartIdx(0); setLightboxIdx(null); }, [activeCategory]);

  const openLightbox  = useCallback((idx: number) => setLightboxIdx(idx), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevPhoto     = useCallback(() => setLightboxIdx(i => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextPhoto     = useCallback(() => setLightboxIdx(i => (i !== null && i < filtered.length - 1 ? i + 1 : i)), [filtered.length]);

  // Dot pages
  const totalPages = maxStart + 1;
  const currentPage = startIdx;

  return (
    <>
      <style>{`
        .ym-filter-btn { transition: all 0.22s ease; }
        .ym-filter-btn:hover { border-color: #c97a18 !important; color: #c97a18 !important; }
        .ym-nav-btn { transition: background 0.18s, opacity 0.18s; }
        .ym-nav-btn:hover:not(:disabled) { background: rgba(0,0,0,0.08) !important; }
        .ym-nav-btn:disabled { opacity: 0.25; cursor: default; }
        .ym-dot { transition: all 0.25s ease; }

        /* Carousel track */
        .ym-track {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          transition: opacity 0.18s ease;
        }
        @media (max-width: 900px) {
          .ym-track { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .ym-track { grid-template-columns: 1fr; }
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .ym-card-enter { animation: cardIn 0.38s ease forwards; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section style={{
        position: "relative",
        background: "linear-gradient(160deg, #1a0a2e 0%, #2d1060 45%, #3a1458 75%, #1a0a2e 100%)",
        padding: "9rem 1.5rem 5rem",
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}>
        {/* Glowing orbs */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", top:"8%", right:"12%", width:420, height:420, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(107,45,139,0.45) 0%, transparent 70%)", filter:"blur(55px)" }} />
          <div style={{ position:"absolute", bottom:"10%", left:"6%", width:320, height:320, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(247,148,29,0.18) 0%, transparent 70%)", filter:"blur(50px)" }} />
          <div style={{ position:"absolute", top:"40%", left:"30%", width:200, height:200, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(141,198,63,0.12) 0%, transparent 70%)", filter:"blur(40px)" }} />
        </div>

        {/* Floating particles */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
          <style>{`
            @keyframes floatUp {
              0%   { transform: translateY(100vh) scale(0);   opacity: 0; }
              10%  { opacity: 1; }
              90%  { opacity: 0.6; }
              100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
            }
          `}</style>
          {PARTICLES.map((p, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${p.left}%`,
              bottom: 0,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: i % 3 === 0 ? "#F7941D" : i % 3 === 1 ? "#8DC63F" : "#9B6BDF",
              opacity: 0,
              animation: `floatUp ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }} />
          ))}
        </div>

        {/* Content grid */}
        <div style={{ maxWidth:1100, margin:"0 auto", width:"100%", position:"relative", zIndex:1,
          display:"grid", gridTemplateColumns:"1fr auto", gap:"2rem", alignItems:"center" }}>
          <div>
            <p style={{ fontSize:"0.68rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"#8DC63F", marginBottom:20 }}>
              Visual Journey
            </p>
            <h1 style={{
              fontFamily:"Cormorant Garamond, serif",
              fontSize:"clamp(3rem, 7vw, 5.5rem)", fontWeight:300,
              color:"#fff", lineHeight:1.05, marginBottom:20,
            }}>
              Life at <em style={{ color:"#F7941D" }}>Yogmandu</em>
            </h1>
            <p style={{ fontSize:"1rem", color:"rgba(255,255,255,0.48)", lineHeight:1.8, maxWidth:460 }}>
              Moments from our classes, ceremonies, and the spirit of Kathmandu.
            </p>
          </div>

          {/* 3-D lotus */}
          <div style={{ width:260, flexShrink:0 }} className="hidden md:block">
            <FloatingLotus size="lg" />
          </div>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────────────── */}
      <div style={{
        background:"#fff", borderBottom:"1px solid #e8e2d9",
        position:"sticky", top:64, zIndex:10, padding:"0 1.5rem",
        boxShadow:"0 2px 12px rgba(0,0,0,0.06)",
      }}>
        <div style={{ maxWidth:960, margin:"0 auto", display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", padding:"0.85rem 0" }}>
          {CATEGORIES.map(cat => {
            const active = cat === activeCategory;
            return (
              <button key={cat} className="ym-filter-btn"
                onClick={() => activeCategory !== cat && setActiveCategory(cat)}
                style={{
                  padding:"0.36rem 1.05rem", borderRadius:99,
                  fontSize:"0.78rem", fontWeight:500, cursor:"pointer",
                  background: active ? "#F7941D" : "transparent",
                  color:  active ? "#fff" : "#7a6a58",
                  border: active ? "1.5px solid #F7941D" : "1.5px solid #d9d0c4",
                }}
              >{cat}</button>
            );
          })}
          <span style={{ marginLeft:"auto", fontSize:"0.7rem", color:"#b0a898" }}>
            {filtered.length} photos
          </span>
        </div>
      </div>

      {/* ── Carousel ─────────────────────────────────────────────────────────── */}
      <section style={{ background:"#F9F5F0", padding:"3rem 1.5rem 5rem" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>

          {/* Nav row */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.5rem" }}>
            <p style={{ fontSize:"0.72rem", color:"#b0a898", letterSpacing:"0.1em" }}>
              Showing {startIdx + 1}–{Math.min(startIdx + VISIBLE, filtered.length)} of {filtered.length}
            </p>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <button className="ym-nav-btn" disabled={!canPrev} onClick={() => slide(-1)}
                style={{
                  width:44, height:44, borderRadius:"50%", border:"1px solid #ddd5c8",
                  background:"#fff", color:"#5a4a38", fontSize:18, cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow:"0 2px 8px rgba(0,0,0,0.07)",
                }}>←</button>
              <button className="ym-nav-btn" disabled={!canNext} onClick={() => slide(1)}
                style={{
                  width:44, height:44, borderRadius:"50%", border:"1px solid #ddd5c8",
                  background:"#fff", color:"#5a4a38", fontSize:18, cursor:"pointer",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow:"0 2px 8px rgba(0,0,0,0.07)",
                }}>→</button>
            </div>
          </div>

          {/* Cards */}
          <div className="ym-track" style={{ opacity: sliding ? 0.5 : 1 }}>
            {filtered.slice(startIdx, startIdx + VISIBLE).map((photo, i) => (
              <div key={`${photo.id}-${startIdx}`} className="ym-card-enter"
                style={{ animationDelay: `${i * 60}ms` }}>
                <TiltPhotoCard
                  photo={photo}
                  onOpen={() => openLightbox(startIdx + i)}
                />
              </div>
            ))}
          </div>

          {/* Dot pagination */}
          {totalPages > 1 && (
            <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:"2.5rem" }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className="ym-dot"
                  onClick={() => setStartIdx(i)}
                  style={{
                    width: i === currentPage ? 24 : 8,
                    height: 8, borderRadius: 99, border: "none", cursor: "pointer",
                    background: i === currentPage ? "#F7941D" : "#d9d0c4",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section style={{
        background:"#fff8f0", padding:"4.5rem 1.5rem",
        textAlign:"center", borderTop:"1px solid #ede6dc",
      }}>
        <p style={{
          fontFamily:"Cormorant Garamond, serif",
          fontSize:"clamp(1.5rem, 4vw, 2.5rem)", fontWeight:300,
          color:"#2a1a0a", marginBottom:24,
        }}>
          Come practice with us in <em style={{ color:"#F7941D" }}>Kathmandu</em>
        </p>
        <a href="https://wa.me/9779862909469" style={{
          display:"inline-block", padding:"0.85rem 2.4rem",
          borderRadius:999, background:"#F7941D",
          color:"#fff", fontSize:"0.9rem", fontWeight:500,
          textDecoration:"none", letterSpacing:"0.04em",
        }}>Book a Session</a>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────────────────── */}
      {lightboxIdx !== null && (
        <Lightbox
          photos={filtered}
          index={lightboxIdx}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  );
}
