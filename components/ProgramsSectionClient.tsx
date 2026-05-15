"use client";
import dynamic from "next/dynamic";

const ProgramsSection = dynamic(() => import("./ProgramsSection"), {
  ssr: false,
  loading: () => (
    <div className="py-24 px-6" style={{ background: "#FFF4E8", minHeight: 480 }} />
  ),
});

export default function ProgramsSectionClient() {
  return <ProgramsSection />;
}
