"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ACCENTS = ["#F7941D", "#6B2D8B", "#8DC63F"];

// The next `count` months starting from the current month. Computed on the
// client so already-passed months are never shown, no matter when the site
// was last built/deployed.
function upcomingMonths(count: number): string[] {
  const out: string[] = [];
  const now = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    out.push(d.toLocaleDateString("en-US", { month: "long", year: "numeric" }));
  }
  return out;
}

export default function IntakeMonths() {
  const [months, setMonths] = useState<string[]>([]);

  useEffect(() => {
    setMonths(upcomingMonths(12));
  }, []);

  // Placeholder keeps the section height stable until the client computes months.
  if (months.length === 0) {
    return <div style={{ minHeight: 120 }} aria-hidden />;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
      {months.map((label, i) => {
        const a = ACCENTS[i % ACCENTS.length];
        return (
          <Link
            key={label}
            href={`/book?service=ytt-200&month=${encodeURIComponent(label)}`}
            className="lift-3d lift-3d-purple"
            style={{
              display: "block", padding: "1.5rem 2rem", borderRadius: "1rem",
              border: `1.5px solid ${a}33`,
              background: `linear-gradient(160deg, ${a}10 0%, #FFFFFF 80%)`,
              boxShadow: `0 6px 22px ${a}14`,
              textAlign: "center", minWidth: 200,
              position: "relative", overflow: "hidden", textDecoration: "none",
            }}
          >
            <div style={{
              position: "absolute", top: -25, right: -25, width: 80, height: 80, borderRadius: "50%",
              background: `radial-gradient(circle, ${a}22 0%, transparent 70%)`, pointerEvents: "none",
            }} />
            <div style={{
              fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", fontWeight: 400,
              color: "#2A1208", marginBottom: 4, position: "relative",
            }}>{label}</div>
            <div style={{
              fontSize: "0.82rem", color: a, fontWeight: 600,
              letterSpacing: "0.12em", textTransform: "uppercase", position: "relative",
            }}>Book This Month →</div>
          </Link>
        );
      })}
    </div>
  );
}
