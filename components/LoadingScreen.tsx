"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1600);
    const hideTimer = setTimeout(() => setVisible(false), 2200);
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer); };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAF6F0",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Outer rotating ring */}
      <div style={{ position: "relative", width: 120, height: 120 }}>
        <svg
          width="120" height="120"
          viewBox="0 0 120 120"
          style={{
            position: "absolute",
            inset: 0,
            animation: "spin-loader 2.4s linear infinite",
          }}
        >
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="#F7941D"
            strokeWidth="1.5"
            strokeDasharray="80 260"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
        {/* Inner counter-rotating ring */}
        <svg
          width="120" height="120"
          viewBox="0 0 120 120"
          style={{
            position: "absolute",
            inset: 0,
            animation: "spin-loader 3.6s linear infinite reverse",
          }}
        >
          <circle
            cx="60" cy="60" r="44"
            fill="none"
            stroke="#6B2D8B"
            strokeWidth="1"
            strokeDasharray="40 236"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>

        {/* Logo in center */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            overflow: "hidden",
            position: "relative",
            animation: "pulse-loader 1.8s ease-in-out infinite",
          }}>
            <Image
              src="/logo.png"
              alt="Yogmandu"
              fill
              priority
              sizes="72px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

      {/* Brand name */}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <p style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "1.6rem",
          fontWeight: 300,
          letterSpacing: "0.04em",
          color: "#2A1208",
          animation: "fade-in-loader 0.8s ease 0.3s both",
        }}>
          <span style={{ color: "#F7941D" }}>Yog</span>
          <span style={{ color: "#6B2D8B" }}>mandu</span>
        </p>
        <p style={{
          fontSize: "0.6rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(42,18,8,0.35)",
          marginTop: 4,
          animation: "fade-in-loader 0.8s ease 0.6s both",
        }}>
          Yoga &amp; Sound Healing · Nepal
        </p>
      </div>

      <style>{`
        @keyframes spin-loader {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-loader {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.04); }
        }
        @keyframes fade-in-loader {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
