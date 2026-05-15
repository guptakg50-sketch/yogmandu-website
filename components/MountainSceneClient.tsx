"use client";
import dynamic from "next/dynamic";

const MountainScene = dynamic(() => import("@/components/MountainScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border animate-pulse" style={{ borderColor: "rgba(247,148,29,0.2)" }} />
    </div>
  ),
});

export default MountainScene;
