"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";

const Background3D = dynamic(() => import("@/components/TestimonialsBackground3D"), {
  ssr: false,
  loading: () => null,
});

// Real, verbatim Google reviews (Yogmandu Yoga, 4.9★ · 132 reviews on Google).
// Quotes are unedited excerpts taken directly from the reviewers' Google posts.
// These are also the fallback shown when the admin-managed Supabase list is
// empty/unconfigured — keep them in sync with supabase/migrations/011_testimonials.sql.
const DEFAULT_TESTIMONIALS = [
  {
    id: "rev-shraddha-timalsena",
    quote: "Yogmandu Yoga is a beautiful, calming space with incredible instructors who truly care. Every class feels grounding and uplifting. It's the perfect place to reconnect with yourself and your practice.",
    name: "Shraddha Timalsena",
    when: "a year ago",
    stars: 5,
    color: "#F7941D",
  },
  {
    id: "rev-george-h",
    quote: "Absolutely fantastic experience! The yoga teachers create a welcoming environment. Their expertise and guidance in each session helped me improve my flexibility and overall well-being. If you're in Kathmandu and seeking a yoga experience, Yogmandu is the place to be.",
    name: "George H.",
    when: "2 years ago",
    stars: 5,
    color: "#6B2D8B",
  },
  {
    id: "rev-love-thakur",
    quote: "I've been practicing yoga for years, but my sessions at Yogmandu Yoga have taken my practice to a whole new level. The instructors are incredibly knowledgeable and attentive, ensuring that each pose is performed correctly and safely.",
    name: "Love Thakur",
    when: "a year ago",
    stars: 5,
    color: "#8DC63F",
  },
  {
    id: "rev-rinku-thakur",
    quote: "The space is beautifully designed with soft lighting, peaceful music, and a warm, inviting vibe that made me feel comfortable immediately. The staff was friendly and knowledgeable, and the instructors were truly outstanding.",
    name: "Rinku Thakur",
    when: "a year ago",
    stars: 5,
    color: "#F7941D",
  },
  {
    id: "rev-babita-kc",
    quote: "Yogmandu is a truly peaceful and energizing space where I always feel a sense of positivity and calm. Practicing yoga here has helped me both physically and mentally. I leave every session feeling refreshed and balanced.",
    name: "Babita Kc",
    when: "a year ago",
    stars: 5,
    color: "#6B2D8B",
  },
  {
    id: "rev-sunita-rai",
    quote: "As a beginner, I was nervous to join yoga class due to my health condition at that time, but with the help, efforts and fully positive supportive instructors I was able to complete the course. The place is wonderful and located in a peaceful environment.",
    name: "Sunita Rai",
    when: "a year ago",
    stars: 5,
    color: "#8DC63F",
  },
  {
    id: "rev-sunaina-deoju",
    quote: "The best part of my yoga journey with Yogmandu is the peaceful and friendly environment. The teachers are very kind, cooperative and humble. I am so blessed to be part of this organization.",
    name: "Sunaina Deoju",
    when: "a year ago",
    stars: 5,
    color: "#F7941D",
  },
  {
    id: "rev-dipika-shrestha",
    quote: "Yogmandu is filled with positivity and offers wonderful guidance. I will always be thankful to each and every teacher, as well as the receptionist for being so kind.",
    name: "Dipika Shrestha",
    when: "a year ago",
    stars: 5,
    color: "#6B2D8B",
  },
  {
    id: "rev-smriti-kafle",
    quote: "Best experience at Yogmandu's yoga. Specially the tratak meditation makes you a completely different person, so I suggest you go through it.",
    name: "Smriti Kafle",
    when: "9 months ago",
    stars: 5,
    color: "#8DC63F",
  },
];

type Testimonial = typeof DEFAULT_TESTIMONIALS[number];


function TestimonialCard({
  t, index, active, total, onNext, onPrev, mousePos,
}: {
  t: Testimonial;
  index: number;
  active: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  mousePos: React.RefObject<{ x: number; y: number }>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const offset = index - active;
  const isActive = offset === 0;
  const isVisible = Math.abs(offset) <= 1;

  useEffect(() => {
    if (!isActive || !cardRef.current) return;
    let rafId: number;
    const update = () => {
      if (!cardRef.current) return;
      const mx = mousePos.current?.x ?? 0;
      const my = mousePos.current?.y ?? 0;
      cardRef.current.style.transform = `
        translateX(-50%)
        perspective(1000px)
        rotateY(${mx * 8}deg)
        rotateX(${-my * 5}deg)
        scale(1.02)
      `;
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [isActive, mousePos]);

  if (!isVisible && !(Math.abs(offset) === 1)) return null;
  if (Math.abs(offset) > 1) return null;

  const xOffset = offset * 340;
  const scale   = isActive ? 1 : 0.82;
  const opacity = isActive ? 1 : 0.4;
  const zIndex  = isActive ? 10 : 5;

  return (
    <div
      ref={isActive ? cardRef : undefined}
      onClick={!isActive ? (offset < 0 ? onPrev : onNext) : undefined}
      className="absolute top-0"
      style={{
        width: "min(480px, 90vw)",
        left: "50%",
        transform: isActive
          ? `translateX(-50%) scale(${scale})`
          : `translateX(calc(-50% + ${xOffset}px)) scale(${scale})`,
        opacity,
        zIndex,
        filter: isActive ? "none" : "blur(3px)",
        transition: "opacity 0.4s ease, filter 0.4s ease",
        cursor: isActive ? "grab" : "pointer",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="rounded-3xl p-8 md:p-10"
        style={{
          background: "rgba(255,255,255,0.97)",
          border: `1.5px solid ${t.color}25`,
          boxShadow: isActive
            ? `0 40px 100px rgba(107,45,139,0.3), 0 0 0 1px ${t.color}15, inset 0 1px 0 white`
            : "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        {/* Colored accent bar */}
        <div className="h-1 rounded-full mb-6"
          style={{ background: `linear-gradient(90deg, ${t.color}, #F7941D, transparent)` }} />

        {/* Stars */}
        <div className="flex gap-1 mb-5">
          {Array.from({ length: t.stars }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F7941D">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>

        {/* Quote mark */}
        <div className="text-5xl font-light leading-none mb-1"
          style={{ fontFamily: "Cormorant Garamond, serif", color: t.color, opacity: 0.25 }}>
          &ldquo;
        </div>

        <blockquote className="text-base md:text-lg font-light leading-relaxed mb-7 italic"
          style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
          {t.quote}
        </blockquote>

        {/* Author row */}
        <div className="flex items-center gap-3 pt-5"
          style={{ borderTop: `1px solid ${t.color}12` }}>
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
            style={{ background: `${t.color}12`, border: `1px solid ${t.color}25`, color: t.color }}>
            {t.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-sm" style={{ color: "#2A1208" }}>{t.name}</p>
            <p className="text-xs font-light mt-0.5 flex items-center gap-1.5" style={{ color: "rgba(42,18,8,0.45)" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/>
                <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"/>
                <path fill="#EA4335" d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 4.75 12 4.75Z"/>
              </svg>
              Google review&nbsp;&middot;&nbsp;
              <span>{t.when}</span>
            </p>
          </div>
          {/* Verified Google review badge */}
          <div className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-full"
            style={{ background: `${t.color}10`, border: `1px solid ${t.color}20` }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill={t.color}>
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            <span className="text-[9px] tracking-wide font-medium" style={{ color: t.color }}>Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [active, setActive] = useState(0);
  const dragging = useRef(false);
  const dragStart = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  // Pull admin-managed reviews; fall back to the built-in real Google reviews.
  useEffect(() => {
    let alive = true;
    fetch("/api/testimonials")
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        const list = Array.isArray(res?.data) ? (res.data as Testimonial[]) : [];
        if (alive && list.length > 0) {
          setItems(list);
          setActive(0);
        }
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const total = items.length;
  const next = useCallback(() => setActive(a => (a + 1) % total), [total]);
  const prev = useCallback(() => setActive(a => (a - 1 + total) % total), [total]);
  const current = items[active] ?? items[0];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePos.current = {
      x: ((e.clientX - rect.left) / rect.width)  * 2 - 1,
      y: ((e.clientY - rect.top)  / rect.height) * 2 - 1,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePos.current = { x: 0, y: 0 };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden py-28"
      style={{ background: "linear-gradient(160deg, #3D1560 0%, #6B2D8B 45%, #4A1A70 100%)" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={e => { dragging.current = true; dragStart.current = e.clientX; }}
      onMouseUp={e => {
        if (!dragging.current) return;
        const diff = dragStart.current - e.clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        dragging.current = false;
      }}
      onTouchStart={e => { dragStart.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        const diff = dragStart.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
      }}
    >
      {/* 3D background */}
      <div className="absolute inset-0">
        <Background3D />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#8DC63F" }} />
            <span className="text-xs tracking-[0.25em] uppercase font-light" style={{ color: "rgba(255,255,255,0.8)" }}>
              3,000+ Teachers Trained Worldwide
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4"
            style={{ fontFamily: "Cormorant Garamond, serif", textShadow: "0 2px 40px rgba(0,0,0,0.4)" }}>
            Voices from the
            <em className="block" style={{ color: "#F7941D" }}>practice</em>
          </h2>
          <p className="text-xs font-light tracking-[0.2em] uppercase mt-3"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            ← drag or use arrow keys to explore →
          </p>
        </div>

        {/* Card stage */}
        <div className="relative select-none" style={{ height: "clamp(380px, 440px, 100vw)" }}>
          {items.map((t, i) => (
            <TestimonialCard
              key={t.id ?? i} t={t} index={i} active={active}
              total={total} onNext={next} onPrev={prev}
              mousePos={mousePos}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <button onClick={prev}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div className="flex gap-2 items-center">
            {items.map((t, i) => (
              <button key={t.id ?? i} onClick={() => setActive(i)}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === active ? "32px" : "8px",
                  height: "8px",
                  background: i === active ? t.color : "rgba(255,255,255,0.2)",
                  boxShadow: i === active ? `0 0 14px ${t.color}` : "none",
                }}
              />
            ))}
          </div>

          <button onClick={next}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="mx-auto mt-5 rounded-full overflow-hidden"
          style={{ width: "100px", height: "2px", background: "rgba(255,255,255,0.1)" }}>
          <div className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${((active + 1) / total) * 100}%`,
              background: `linear-gradient(90deg, ${current.color}, #F7941D)`,
            }}
          />
        </div>
        <p className="text-center mt-2 text-xs font-light" style={{ color: "rgba(255,255,255,0.25)" }}>
          {active + 1} / {total}
        </p>
      </div>
    </section>
  );
}
