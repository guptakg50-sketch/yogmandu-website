"use client";
import dynamic from "next/dynamic";

const FloatingLotus = dynamic(() => import("@/components/FloatingLotus"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-56 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border animate-pulse" style={{ borderColor: "rgba(141,198,63,0.3)" }} />
    </div>
  ),
});

export default FloatingLotus;
