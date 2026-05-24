"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MountainScene = dynamic(() => import("@/components/MountainScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border animate-pulse" style={{ borderColor: "rgba(247,148,29,0.2)" }} />
    </div>
  ),
});

/** Pure SVG mountains — zero Three.js, renders instantly on mobile */
function SVGMountains() {
  return (
    <div style={{ width: "100%", height: 280, position: "relative", overflow: "hidden" }} aria-hidden>
      <svg
        viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {/* Back range */}
        <polygon points="0,280 60,140 130,280"  fill="rgba(107,45,139,0.12)" />
        <polygon points="40,280 170,90  300,280" fill="rgba(107,45,139,0.18)" />
        <polygon points="110,280 240,65 370,280" fill="rgba(61,21,96,0.22)" />
        {/* Mid range */}
        <polygon points="0,280 90,168  185,280"  fill="rgba(61,21,96,0.3)" />
        <polygon points="80,280 220,110 340,280"  fill="rgba(40,12,70,0.35)" />
        {/* Front range */}
        <polygon points="0,280 130,185 260,280"  fill="rgba(29,10,50,0.42)" />
        <polygon points="140,280 290,130 400,280 400,280 0,280" fill="rgba(25,8,45,0.52)" />
        {/* Snow caps */}
        <polygon points="168,90  192,65  216,88"  fill="rgba(255,255,255,0.55)" />
        <polygon points="42,140  60,118  78,138"  fill="rgba(255,255,255,0.38)" />
        <polygon points="218,110 235,92  252,108" fill="rgba(255,255,255,0.42)" />
        {/* Star field (top quarter) */}
        {[[18,14],[55,22],[90,8],[130,18],[168,6],[202,20],[235,10],[270,16],[305,5],[340,20],[375,12],
          [30,40],[75,55],[112,35],[155,48],[195,30],[230,50],[268,38],[310,45],[355,32]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r={i%3===0?1.1:0.65} fill="rgba(255,255,255,0.7)" opacity={0.6+Math.random()*0.3}/>
        ))}
        {/* Bottom gradient fade into section bg */}
        <defs>
          <linearGradient id="mtn-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3D1560" stopOpacity="0" />
            <stop offset="100%" stopColor="#3D1560" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="400" height="280" fill="url(#mtn-fade)" />
      </svg>
    </div>
  );
}

/**
 * Mobile (<768px): SVG mountain silhouette — Three.js never downloads.
 * Desktop: full 3-D MountainScene loaded when scrolled into view.
 */
export default function MountainSceneClient() {
  const [mobile, setMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setMobile(window.innerWidth < 768);
  }, []);

  if (mobile === null) return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border animate-pulse" style={{ borderColor: "rgba(247,148,29,0.2)" }} />
    </div>
  );
  if (mobile) return <SVGMountains />;
  return <MountainScene />;
}
