"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  STATIC_PHOTOS, CAT_ACCENT, shuffleInterleaved, toWebpSrc,
  type PhotoItem,
} from "@/app/(public)/gallery/galleryData";

type DBItem = { id: string; url: string; title?: string; category?: string };

const AUTOPLAY_MS = 5000;

export default function PhotoCarousel() {
  const [photos, setPhotos]   = useState<PhotoItem[]>(() => shuffleInterleaved(STATIC_PHOTOS));
  const [idx, setIdx]         = useState(0);
  const [hovering, setHover]  = useState(false);
  const [visible, setVisible] = useState(true);
  const [lightbox, setLightbox] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const stripRef   = useRef<HTMLDivElement>(null);
  const reduced    = useRef(false);

  const count   = photos.length;
  const current = photos[idx] ?? photos[0];
  const accent  = current ? (CAT_ACCENT[current.cat] ?? "#F7941D") : "#F7941D";

  const go   = useCallback((dir: 1 | -1) => setIdx(i => (i + dir + count) % count), [count]);
  const jump = useCallback((i: number) => setIdx(i), []);

  // Pull the live gallery set (same source as /gallery); fall back to static.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/gallery")
      .then(r => (r.ok ? r.json() : null))
      .then(j => {
        if (cancelled || !j?.data?.length) return;
        const mapped: PhotoItem[] = j.data.map((it: DBItem) => ({
          id:    it.id,
          src:   it.url,
          cat:   it.category || "Yoga",
          title: it.title || "Photo",
        }));
        setPhotos(shuffleInterleaved(mapped));
        setIdx(0);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // Respect reduced-motion + pause when off-screen.
  useEffect(() => {
    if (typeof window !== "undefined") {
      reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Autoplay.
  useEffect(() => {
    if (reduced.current || hovering || lightbox || !visible || count <= 1) return;
    const t = setInterval(() => setIdx(i => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [hovering, lightbox, visible, count]);

  // Keep the active thumbnail centered in the strip (scrolls the strip only).
  useEffect(() => {
    const strip = stripRef.current;
    const el = strip?.children[idx] as HTMLElement | undefined;
    if (!strip || !el) return;
    strip.scrollTo({
      left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2,
      behavior: "smooth",
    });
  }, [idx]);

  if (!count) return null;

  const webp = toWebpSrc(current.src);

  return (
    <section
      ref={sectionRef}
      className="pc-section"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #FFFDF9 0%, #FFFFFF 45%, #FBF6EF 100%)",
        padding: "6rem 1.5rem",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes pcFade { from { opacity: 0; transform: scale(1.015); } to { opacity: 1; transform: scale(1); } }
        @keyframes pc-spin { to { transform: rotate(360deg); } }
        @keyframes pc-float-a { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-18px) rotate(8deg); } }
        @keyframes pc-float-b { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(14px) rotate(-6deg); } }
        .pc-arrow { transition: background 0.2s, box-shadow 0.2s, opacity 0.2s; }
        .pc-arrow:hover { background: rgba(0,0,0,0.5) !important; }
        .pc-thumb { transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s; }
        .pc-thumb:hover { opacity: 1 !important; transform: translateY(-2px); }
        .pc-strip::-webkit-scrollbar { height: 6px; }
        .pc-strip::-webkit-scrollbar-thumb { background: rgba(42,18,8,0.18); border-radius: 99px; }
        .pc-strip::-webkit-scrollbar-track { background: transparent; }
        .pc-cta:hover { background: rgba(42,18,8,0.04) !important; border-color: rgba(42,18,8,0.35) !important; }
        .pc-paused * { animation-play-state: paused !important; }
        @media (prefers-reduced-motion: reduce) {
          .pc-deco * { animation: none !important; }
        }
        @media (max-width: 640px) {
          .pc-section { padding: 3.75rem 1rem 4.25rem !important; }
          .pc-stage { border-radius: 16px !important; }
          .pc-arrow { width: 40px !important; height: 40px !important; font-size: 16px !important; }
          .pc-arrow-left  { left: 8px !important; }
          .pc-arrow-right { right: 8px !important; }
          .pc-caption { padding: 1rem 1.1rem !important; }
          .pc-caption-title { font-size: 1.1rem !important; }
          .pc-thumb { width: 64px !important; height: 44px !important; }
          .pc-deco-lg { display: none !important; }
        }
      `}</style>

      {/* ── 3-D yoga background elements (mirrors the Why Yogmandu section) ── */}
      <div className={`pc-deco${visible ? "" : " pc-paused"}`} aria-hidden
        style={{ position: "absolute", inset: 0, pointerEvents: "none", perspective: "600px" }}>
        {/* Rotating mandala ring — top left */}
        <div className="pc-deco-lg" style={{ position: "absolute", top: "7%", left: "3%", width: 200, height: 200,
          animation: "pc-spin 20s linear infinite", willChange: "transform" }}>
          <svg viewBox="0 0 200 200" fill="none" opacity="0.07">
            <circle cx="100" cy="100" r="90" stroke="#F7941D" strokeWidth="1"/>
            <circle cx="100" cy="100" r="70" stroke="#F7941D" strokeWidth="0.8"/>
            <circle cx="100" cy="100" r="50" stroke="#6B2D8B" strokeWidth="0.8"/>
            {[0,45,90,135,180,225,270,315].map(d => (
              <line key={d} x1="100" y1="10" x2="100" y2="190" stroke="#F7941D" strokeWidth="0.5"
                transform={`rotate(${d} 100 100)`}/>
            ))}
          </svg>
        </div>

        {/* Counter-rotating ring — bottom right */}
        <div className="pc-deco-lg" style={{ position: "absolute", bottom: "4%", right: "2%", width: 240, height: 240,
          animation: "pc-spin 26s linear infinite reverse", willChange: "transform" }}>
          <svg viewBox="0 0 240 240" fill="none" opacity="0.06">
            <circle cx="120" cy="120" r="110" stroke="#6B2D8B" strokeWidth="1"/>
            <circle cx="120" cy="120" r="85"  stroke="#8DC63F" strokeWidth="0.8"/>
            <circle cx="120" cy="120" r="60"  stroke="#6B2D8B" strokeWidth="0.6"/>
            {[0,60,120,180,240,300].map(d => (
              <line key={d} x1="120" y1="10" x2="120" y2="230" stroke="#6B2D8B" strokeWidth="0.5"
                transform={`rotate(${d} 120 120)`}/>
            ))}
          </svg>
        </div>

        {/* Floating torus ring — mid right */}
        <div style={{ position: "absolute", top: "38%", right: "4%", width: 110, height: 110,
          animation: "pc-float-a 7s ease-in-out infinite", willChange: "transform" }}>
          <svg viewBox="0 0 120 120" fill="none" opacity="0.09">
            <ellipse cx="60" cy="60" rx="52" ry="22" stroke="#F7941D" strokeWidth="1.5"/>
            <ellipse cx="60" cy="60" rx="52" ry="52" stroke="#F7941D" strokeWidth="0.6"/>
          </svg>
        </div>

        {/* Small lotus — mid left */}
        <div className="pc-deco-lg" style={{ position: "absolute", top: "56%", left: "4%", width: 90, height: 90,
          animation: "pc-float-b 9s ease-in-out infinite", willChange: "transform" }}>
          <svg viewBox="0 0 90 90" fill="none" opacity="0.08">
            <circle cx="45" cy="45" r="38" stroke="#8DC63F" strokeWidth="1"/>
            {[0,36,72,108,144,180,216,252,288,324].map(d => (
              <ellipse key={d} cx="45" cy="20" rx="7" ry="14"
                fill="#8DC63F" fillOpacity="0.15" stroke="#8DC63F" strokeWidth="0.5"
                transform={`rotate(${d} 45 45)`}/>
            ))}
          </svg>
        </div>

        {/* Dot grid */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025 }}>
          <defs>
            <pattern id="pc-dots" width="48" height="48" patternUnits="userSpaceOnUse">
              <circle cx="24" cy="24" r="1" fill="#6B2D8B" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pc-dots)" />
        </svg>

        {/* Soft glow blobs */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 700, height: 350, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(247,148,29,0.07) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 280, height: 280,
          background: "radial-gradient(circle, rgba(107,45,139,0.07) 0%, transparent 70%)" }} />
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* heading */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.32em", textTransform: "uppercase",
            color: "#6B2D8B", marginBottom: 14 }}>
            Our Community
          </p>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            fontWeight: 300, color: "#2A1208", lineHeight: 1.1, margin: 0 }}>
            Life at <em style={{ color: "#A65808" }}>Yogmandu</em>
          </h2>
          <p style={{ fontSize: "1rem", color: "#5C3D2E", lineHeight: 1.7,
            maxWidth: 520, margin: "16px auto 0" }}>
            Real students, real graduations, real moments from our shala in Kathmandu.
          </p>
        </div>

        {/* stage */}
        <div
          className="pc-stage"
          onClick={() => setLightbox(true)}
          style={{
            position: "relative", borderRadius: 20, overflow: "hidden", cursor: "zoom-in",
            aspectRatio: "3 / 2", background: "#F3ECE2",
            boxShadow: "0 30px 70px rgba(42,18,8,0.16)", border: "1px solid rgba(42,18,8,0.06)",
          }}
        >
          <picture key={current.id}>
            {webp && <source type="image/webp" srcSet={webp} />}
            <img
              src={current.src}
              alt={current.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block",
                animation: "pcFade 0.6s ease" }}
            />
          </picture>

          {/* caption gradient */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(to top, rgba(5,0,18,0.82) 0%, rgba(5,0,18,0.1) 38%, transparent 60%)" }} />
          <div className="pc-caption" style={{ position: "absolute", left: 0, bottom: 0, padding: "1.4rem 1.6rem", zIndex: 2 }}>
            <span style={{ display: "inline-block", fontSize: "0.72rem", letterSpacing: "0.22em",
              textTransform: "uppercase", color: "#fff", background: `${accent}cc`,
              padding: "3px 10px", borderRadius: 99, marginBottom: 8 }}>
              {current.cat}
            </span>
            <p className="pc-caption-title" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", fontWeight: 400,
              color: "#fff", margin: 0, lineHeight: 1.2 }}>
              {current.title}
            </p>
          </div>

          {/* counter */}
          <div style={{ position: "absolute", top: 14, right: 16, zIndex: 2,
            fontSize: "0.78rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.85)",
            background: "rgba(0,0,0,0.38)", padding: "4px 10px", borderRadius: 99 }}>
            {idx + 1} / {count}
          </div>

          {/* arrows */}
          <button className="pc-arrow pc-arrow-left" aria-label="Previous photo"
            onClick={e => { e.stopPropagation(); go(-1); }}
            style={arrowStyle("left")}>←</button>
          <button className="pc-arrow pc-arrow-right" aria-label="Next photo"
            onClick={e => { e.stopPropagation(); go(1); }}
            style={arrowStyle("right")}>→</button>
        </div>

        {/* thumbnails */}
        <div ref={stripRef} className="pc-strip"
          style={{ display: "flex", gap: 10, marginTop: 18, overflowX: "auto",
            padding: "4px 2px 10px", scrollbarWidth: "thin" }}>
          {photos.map((p, i) => {
            const active = i === idx;
            const tw = toWebpSrc(p.src);
            return (
              <button key={p.id} className="pc-thumb" aria-label={`Show ${p.title}`}
                onClick={() => jump(i)}
                style={{
                  flex: "0 0 auto", width: 88, height: 60, borderRadius: 10, overflow: "hidden",
                  padding: 0, cursor: "pointer", background: "#F3ECE2",
                  border: "none", opacity: active ? 1 : 0.5,
                  boxShadow: active ? `0 0 0 2px ${accent}, 0 6px 16px rgba(42,18,8,0.22)` : "none",
                }}>
                <picture>
                  {tw && <source type="image/webp" srcSet={tw} />}
                  <img src={p.src} alt="" loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </picture>
              </button>
            );
          })}
        </div>

        {/* link to full gallery */}
        <div style={{ textAlign: "center", marginTop: "2.2rem" }}>
          <a href="/gallery" className="pc-cta" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "0.7rem 1.8rem", borderRadius: 999,
            border: "1.5px solid rgba(42,18,8,0.2)", color: "#2A1208",
            fontSize: "0.85rem", fontWeight: 500, textDecoration: "none", letterSpacing: "0.03em",
            transition: "background 0.2s, border-color 0.2s",
          }}>
            View the full gallery <span style={{ fontSize: "1rem" }}>→</span>
          </a>
        </div>
      </div>

      {lightbox && (
        <CarouselLightbox
          photos={photos} index={idx}
          onClose={() => setLightbox(false)}
          onPrev={() => go(-1)} onNext={() => go(1)}
        />
      )}
    </section>
  );
}

function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    [side]: 14, zIndex: 2,
    width: 46, height: 46, borderRadius: "50%",
    background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff", fontSize: 18, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
  };
}

// Compact full-screen viewer (kept inline so the homepage bundle stays lean).
function CarouselLightbox({
  photos, index, onClose, onPrev, onNext,
}: {
  photos: PhotoItem[]; index: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  const photo  = photos[index];
  const accent = CAT_ACCENT[photo.cat] ?? "#F7941D";
  const webp   = toWebpSrc(photo.src);

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

  const nav: React.CSSProperties = {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.16)",
    color: "#fff", borderRadius: "50%", width: 52, height: 52, fontSize: 20,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(4,1,12,0.96)", backdropFilter: "blur(18px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <button aria-label="Previous photo" style={{ ...nav, left: 20 }}
        onClick={e => { e.stopPropagation(); onPrev(); }}>←</button>
      <div onClick={e => e.stopPropagation()}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem", maxWidth: "90vw" }}>
        <picture key={photo.id}>
          {webp && <source type="image/webp" srcSet={webp} />}
          <img src={photo.src} alt={photo.title}
            style={{ maxWidth: "84vw", maxHeight: "72vh", objectFit: "contain",
              borderRadius: 12, boxShadow: "0 30px 80px rgba(0,0,0,0.85)", display: "block" }} />
        </picture>
        <div style={{ textAlign: "center" }}>
          <span style={{ display: "inline-block", fontSize: "0.78rem", letterSpacing: "0.24em",
            textTransform: "uppercase", color: accent, background: `${accent}1a`,
            padding: "3px 10px", borderRadius: 99, marginBottom: 8 }}>{photo.cat}</span>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", fontWeight: 300,
            color: "#fff", margin: 0 }}>{photo.title}</p>
        </div>
      </div>
      <button aria-label="Next photo" style={{ ...nav, right: 20 }}
        onClick={e => { e.stopPropagation(); onNext(); }}>→</button>
      <button onClick={onClose} aria-label="Close"
        style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none",
          color: "rgba(255,255,255,0.45)", fontSize: 28, cursor: "pointer", lineHeight: 1 }}>✕</button>
    </div>
  );
}
