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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        background: "linear-gradient(160deg, #1a0a2e 0%, #2d1060 45%, #3a1458 75%, #1a0a2e 100%)",
        padding: "5.5rem 1.5rem 6rem",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes pcFade { from { opacity: 0; transform: scale(1.015); } to { opacity: 1; transform: scale(1); } }
        .pc-arrow { transition: background 0.2s, opacity 0.2s; }
        .pc-arrow:hover { background: rgba(255,255,255,0.18) !important; }
        .pc-thumb { transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s; }
        .pc-thumb:hover { opacity: 1 !important; transform: translateY(-2px); }
        .pc-strip::-webkit-scrollbar { height: 6px; }
        .pc-strip::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.18); border-radius: 99px; }
        .pc-strip::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      {/* ambient glows */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "12%", right: "8%", width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(247,148,29,0.16) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "6%", left: "4%", width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(141,198,63,0.12) 0%, transparent 70%)", filter: "blur(55px)" }} />
      </div>

      <div style={{ maxWidth: 980, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* heading */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.32em", textTransform: "uppercase",
            color: "#8DC63F", marginBottom: 14 }}>
            Our Community
          </p>
          <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
            fontWeight: 300, color: "#fff", lineHeight: 1.1, margin: 0 }}>
            Life at <em style={{ color: "#F7941D" }}>Yogmandu</em>
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7,
            maxWidth: 520, margin: "16px auto 0" }}>
            Real students, real graduations, real moments from our shala in Kathmandu.
          </p>
        </div>

        {/* stage */}
        <div
          onClick={() => setLightbox(true)}
          style={{
            position: "relative", borderRadius: 20, overflow: "hidden", cursor: "zoom-in",
            aspectRatio: "3 / 2", background: "#120824",
            boxShadow: "0 30px 70px rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.08)",
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
          <div style={{ position: "absolute", left: 0, bottom: 0, padding: "1.4rem 1.6rem", zIndex: 2 }}>
            <span style={{ display: "inline-block", fontSize: "0.72rem", letterSpacing: "0.22em",
              textTransform: "uppercase", color: accent, background: `${accent}22`,
              padding: "3px 10px", borderRadius: 99, marginBottom: 8 }}>
              {current.cat}
            </span>
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", fontWeight: 400,
              color: "#fff", margin: 0, lineHeight: 1.2 }}>
              {current.title}
            </p>
          </div>

          {/* counter */}
          <div style={{ position: "absolute", top: 14, right: 16, zIndex: 2,
            fontSize: "0.78rem", letterSpacing: "0.12em", color: "rgba(255,255,255,0.75)",
            background: "rgba(0,0,0,0.32)", padding: "4px 10px", borderRadius: 99 }}>
            {idx + 1} / {count}
          </div>

          {/* arrows */}
          <button className="pc-arrow" aria-label="Previous photo"
            onClick={e => { e.stopPropagation(); go(-1); }}
            style={arrowStyle("left")}>←</button>
          <button className="pc-arrow" aria-label="Next photo"
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
                  padding: 0, cursor: "pointer", background: "#120824",
                  border: "none", opacity: active ? 1 : 0.5,
                  boxShadow: active ? `0 0 0 2px ${accent}, 0 6px 16px rgba(0,0,0,0.4)` : "none",
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
          <a href="/gallery" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "0.7rem 1.8rem", borderRadius: 999,
            border: "1.5px solid rgba(255,255,255,0.25)", color: "#fff",
            fontSize: "0.85rem", fontWeight: 500, textDecoration: "none", letterSpacing: "0.03em",
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
    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
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
