"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useWebGLAvailable } from "@/lib/useWebGL";

const LotusScene = dynamic(() => import("@/components/LotusScene"), { ssr: false });

/** Zero-Three.js fallback — a soft CSS glow + SVG lotus silhouette */
function LotusFallback() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", width: 460, height: 460,
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(circle, rgba(247,148,29,0.18) 0%, rgba(107,45,139,0.10) 45%, transparent 70%)",
      }} />
      <svg viewBox="0 0 200 200" width="260" height="260" aria-hidden
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -45%)", opacity: 0.5 }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <ellipse key={i} cx="100" cy="70" rx="14" ry="44"
            fill="rgba(235,217,255,0.45)" stroke="rgba(247,148,29,0.3)" strokeWidth="0.6"
            transform={`rotate(${i * 40} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="11" fill="rgba(247,148,29,0.6)" />
      </svg>
    </div>
  );
}

/**
 * Ambient lotus backdrop for the "Continue your journey" section.
 * Desktop with WebGL → animated 3-D lotus + drifting dust.
 * Mobile or no WebGL → static SVG lotus (Three.js never downloads).
 * Always pointer-events-none and dimmed so it sits behind the content.
 */
export default function LotusBackdropClient() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const webgl = useWebGLAvailable();

  useEffect(() => {
    setMobile(window.innerWidth < 768);
  }, []);

  return (
    <div
      aria-hidden
      style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.6 }}
    >
      {mobile === null || webgl === null
        ? null
        : mobile || !webgl
          ? <LotusFallback />
          : <LotusScene />}
    </div>
  );
}
