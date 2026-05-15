"use client";
import dynamic from "next/dynamic";

const SingingBowl = dynamic(() => import("@/components/SingingBowl"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-24 h-24 rounded-full border-2 animate-pulse"
        style={{ borderColor: "rgba(107,45,139,0.3)" }}
      />
    </div>
  ),
});

export default SingingBowl;
