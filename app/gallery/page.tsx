"use client";
import { useState } from "react";

const categories = ["All", "Yoga", "Sound Healing", "Nepal", "Graduates"];

const photos = [
  { id: 1, cat: "Yoga", title: "Morning Asana Practice", desc: "Sunrise session on the rooftop shala", col: "#6B2D8B", aspect: "tall" },
  { id: 2, cat: "Nepal", title: "Boudhanath Stupa", desc: "The sacred stupa in the heart of Kathmandu", col: "#F7941D", aspect: "wide" },
  { id: 3, cat: "Sound Healing", title: "Singing Bowl Session", desc: "Individual session with Himalayan bowls", col: "#8DC63F", aspect: "square" },
  { id: 4, cat: "Graduates", title: "Graduation Ceremony", desc: "2024 cohort receiving their certificates", col: "#F7941D", aspect: "wide" },
  { id: 5, cat: "Yoga", title: "Pranayama Circle", desc: "Group breathwork at dawn", col: "#6B2D8B", aspect: "square" },
  { id: 6, cat: "Nepal", title: "Himalayan View", desc: "Practicing with the mountains as witness", col: "#8DC63F", aspect: "tall" },
  { id: 7, cat: "Sound Healing", title: "Group Sound Bath", desc: "Community healing session at the shala", col: "#F7941D", aspect: "wide" },
  { id: 8, cat: "Yoga", title: "Adjustment & Alignment", desc: "Hands-on teaching methodology", col: "#6B2D8B", aspect: "square" },
  { id: 9, cat: "Nepal", title: "Temple Morning Walk", desc: "Daily practice of presence through the city", col: "#8DC63F", aspect: "square" },
  { id: 10, cat: "Graduates", title: "Transformation Stories", desc: "Students from 40+ countries", col: "#F7941D", aspect: "tall" },
  { id: 11, cat: "Yoga", title: "Philosophy Class", desc: "Exploring the Yoga Sutras", col: "#6B2D8B", aspect: "wide" },
  { id: 12, cat: "Sound Healing", title: "Bowl Collection", desc: "Hand-selected Tibetan instruments", col: "#8DC63F", aspect: "square" },
];

function PhotoCard({ photo, onClick }: { photo: typeof photos[0]; onClick: () => void }) {
  const heightMap = { tall: "h-72", wide: "h-44", square: "h-56" };
  return (
    <div
      className="card-light overflow-hidden cursor-pointer group"
      style={{ borderRadius: "1rem" }}
      onClick={onClick}
    >
      {/* Placeholder image with brand color */}
      <div
        className={`w-full ${heightMap[photo.aspect as keyof typeof heightMap]} relative overflow-hidden`}
        style={{ background: `linear-gradient(135deg, ${photo.col}22, ${photo.col}08)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
              style={{ background: `${photo.col}20`, border: `1px solid ${photo.col}30` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={photo.col} strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>
              </svg>
            </div>
            <span className="text-xs font-light" style={{ color: photo.col, opacity: 0.6 }}>Photo</span>
          </div>
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
          style={{ background: "linear-gradient(to top, rgba(15,15,15,0.85) 0%, transparent 60%)" }}>
          <div>
            <p className="text-white text-sm font-light">{photo.title}</p>
            <p className="text-xs font-light" style={{ color: "rgba(42,18,8,0.5)" }}>{photo.desc}</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm font-light" style={{ color: "rgba(42,18,8,0.7)" }}>{photo.title}</p>
        <p className="text-xs font-light mt-0.5" style={{ color: photo.col }}>{photo.cat}</p>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<typeof photos[0] | null>(null);

  const filtered = active === "All" ? photos : photos.filter(p => p.cat === active);

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 px-6" style={{ background: "#FAF6F0" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#8DC63F" }}>Visual Journey</p>
          <h1 className="text-5xl md:text-7xl font-light leading-[1.05] mb-6"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            Life at <em style={{ color: "#F7941D" }}>Yogmandu</em>
          </h1>
          <p className="text-base font-light max-w-lg" style={{ color: "rgba(42,18,8,0.45)" }}>
            A glimpse into our classes, ceremonies, and the extraordinary city that holds us all.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="px-6 pb-8 sticky top-16 z-10" style={{ background: "#FAF6F0" }}>
        <div className="max-w-5xl mx-auto flex gap-2 flex-wrap py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-light tracking-wide transition-all duration-300"
              style={{
                background: active === cat ? "#F7941D" : "rgba(255,255,255,0.05)",
                color: active === cat ? "#FAF6F0" : "rgba(42,18,8,0.5)",
                border: active === cat ? "none" : "1px solid rgba(255,255,255,0.06)",
              }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="px-6 pb-24" style={{ background: "#FAF6F0" }}>
        <div className="max-w-5xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map(photo => (
            <div key={photo.id} className="break-inside-avoid">
              <PhotoCard photo={photo} onClick={() => setLightbox(photo)} />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(10,6,2,0.92)", backdropFilter: "blur(12px)" }}
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-lg w-full card-dark p-8 text-center" onClick={e => e.stopPropagation()}>
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ background: `${lightbox.col}20`, border: `1px solid ${lightbox.col}30` }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={lightbox.col} strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>
              </svg>
            </div>
            <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>{lightbox.title}</h3>
            <p className="text-sm font-light mb-2" style={{ color: "rgba(42,18,8,0.5)" }}>{lightbox.desc}</p>
            <span className="text-xs tracking-wide" style={{ color: lightbox.col }}>{lightbox.cat}</span>
            <button onClick={() => setLightbox(null)}
              className="mt-8 block mx-auto text-xs tracking-widest uppercase font-light"
              style={{ color: "rgba(42,18,8,0.3)" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
