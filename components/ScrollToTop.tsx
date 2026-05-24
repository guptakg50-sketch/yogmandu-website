"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={go}
      aria-label="Scroll to top"
      style={{
        position:    "fixed",
        right:       18,
        bottom:      90,
        zIndex:      45,
        width:       44,
        height:      44,
        borderRadius:"50%",
        border:      "none",
        background:  "linear-gradient(135deg, #6B2D8B, #F7941D)",
        color:       "#fff",
        cursor:      "pointer",
        boxShadow:   "0 10px 28px rgba(107,45,139,0.45)",
        opacity:     visible ? 1 : 0,
        transform:   visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.7)",
        pointerEvents: visible ? "auto" : "none",
        transition:  "opacity 0.3s ease, transform 0.3s ease",
        display:     "flex",
        alignItems:  "center",
        justifyContent: "center",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path d="M9 13.5V4.5M4.5 9l4.5-4.5L13.5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
