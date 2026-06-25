"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useWebGLAvailable } from "@/lib/useWebGL";

const SingingBowl = dynamic(() => import("@/components/SingingBowl"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" style={{ minHeight: 200 }}>
      <div className="w-16 h-16 rounded-full animate-pulse" style={{ border: "1.5px solid rgba(107,45,139,0.3)" }} />
    </div>
  ),
});

function playTone(ctx: AudioContext) {
  [220, 440, 660].forEach((freq, i) => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.11 / (i + 1), ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.6 - i * 0.35);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 3);
  });
}

/** Visible CSS bowl with tap-to-ring — zero Three.js weight on mobile */
function CSSBowl() {
  const [ringing, setRinging] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  function ring() {
    if (!audioRef.current) {
      audioRef.current = new (window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!)();
    }
    const ctx = audioRef.current;
    if (ctx.state === "suspended") ctx.resume();
    playTone(ctx);
    setRinging(true);
    setTimeout(() => setRinging(false), 3000);
  }

  return (
    <div
      onClick={ring}
      style={{
        cursor: "pointer",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        minHeight: 260, gap: 10, userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div style={{ position: "relative", width: 180, height: 180 }}>
        {/* Ripple rings on ring */}
        {ringing && [0, 0.35, 0.7].map((d) => (
          <div key={d} style={{
            position: "absolute", inset: -20, borderRadius: "50%",
            border: "2px solid rgba(247,148,29,0.55)",
            animation: `cssbowl-ring 1.4s ease-out ${d}s forwards`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Glow halo */}
        <div style={{
          position: "absolute", inset: "-12%", borderRadius: "50%",
          background: `radial-gradient(circle, rgba(247,148,29,${ringing ? "0.28" : "0.10"}) 0%, transparent 70%)`,
          transition: "background 0.4s ease",
          pointerEvents: "none",
        }} />

        {/* SVG bowl */}
        <svg
          viewBox="0 0 180 180"
          style={{
            width: "100%", height: "100%",
            filter: ringing
              ? "drop-shadow(0 0 18px rgba(247,148,29,0.75))"
              : "drop-shadow(0 6px 18px rgba(107,45,139,0.28))",
            transition: "filter 0.3s ease",
          }}
        >
          <defs>
            <radialGradient id="cbg" cx="38%" cy="28%" r="68%">
              <stop offset="0%"   stopColor="#ffe080" />
              <stop offset="45%"  stopColor="#d99830" />
              <stop offset="100%" stopColor="#7a4c0a" />
            </radialGradient>
            <radialGradient id="cbg2" cx="50%" cy="40%" r="55%">
              <stop offset="0%"   stopColor="#fff3aa" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#d99830"  stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Bowl body */}
          <path d="M36,78 Q38,116 90,120 Q142,116 144,78 Z" fill="url(#cbg)" />
          {/* Bowl interior shadow */}
          <path d="M46,80 Q48,108 90,112 Q132,108 134,80 Z" fill="#5a3005" fillOpacity="0.45" />
          {/* Highlight overlay */}
          <ellipse cx="90" cy="90" rx="44" ry="32" fill="url(#cbg2)" />
          {/* Rim ellipse */}
          <ellipse cx="90" cy="78" rx="54" ry="10" fill="url(#cbg)" />
          <ellipse cx="90" cy="78" rx="50" ry="6.5" fill="#c88020" fillOpacity="0.35" />
          {/* Highlight arc on rim */}
          <path d="M52,74 Q78,66 90,72" stroke="rgba(255,248,180,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Decorative band */}
          <path d="M42,93 Q90,99 138,93" stroke="#b87018" strokeWidth="1.5" fill="none" strokeOpacity="0.55" />
          {/* Base */}
          <ellipse cx="90" cy="120" rx="24" ry="6" fill="#c07818" fillOpacity="0.8" />
          <ellipse cx="90" cy="120" rx="18" ry="3.5" fill="#8a5010" />
        </svg>

        {/* Mallet hint */}
        {!ringing && (
          <div style={{
            position: "absolute", top: "14%", right: "8%",
            width: 6, height: 38, borderRadius: 4,
            background: "linear-gradient(to bottom, #c88020, #5a3005)",
            transform: "rotate(25deg)",
            opacity: 0.65,
            boxShadow: "0 2px 6px rgba(107,45,139,0.2)",
          }} />
        )}
      </div>

      <p style={{
        fontSize: "0.78rem", letterSpacing: "0.22em", textTransform: "uppercase",
        color: ringing ? "#F7941D" : "#A65808", fontWeight: 600,
        transition: "color 0.3s ease",
      }}>
        {ringing ? "∿ resonating ∿" : "Tap to ring"}
      </p>

      <style>{`
        @keyframes cssbowl-ring {
          from { transform: scale(1);   opacity: 0.55; }
          to   { transform: scale(1.9); opacity: 0;    }
        }
      `}</style>
    </div>
  );
}

/**
 * Mobile (<768px): CSS golden bowl with tap-to-ring — Three.js never loads.
 * Desktop: full interactive 3-D SingingBowl loaded after browser idle.
 */
export default function SingingBowlClient() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const webgl = useWebGLAvailable();

  useEffect(() => {
    setMobile(window.innerWidth < 768);
  }, []);

  if (mobile === null || webgl === null) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ minHeight: 200 }}>
        <div className="w-16 h-16 rounded-full animate-pulse" style={{ border: "1.5px solid rgba(107,45,139,0.3)" }} />
      </div>
    );
  }
  // Mobile OR no WebGL support → lightweight CSS bowl (Three.js never mounts).
  if (mobile || !webgl) return <CSSBowl />;
  return <SingingBowl />;
}
