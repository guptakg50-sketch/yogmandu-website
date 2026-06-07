"use client";

import { useEffect, useRef, useState } from "react";

type PopupData = {
  active: boolean;
  version?: number;
  imageUrl?: string;
  imageAlt?: string;
  linkUrl?: string;
};

const SEEN_KEY = "yogmandu_popup_seen";

export default function EntryPopup() {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false); // drives the fade-in
  const closeRef = useRef<HTMLButtonElement>(null);

  // Fetch the active campaign once on mount.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/popup")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: PopupData | null) => {
        if (cancelled || !data?.active || !data.imageUrl) return;
        let seen: string | null = null;
        try {
          seen = window.localStorage.getItem(SEEN_KEY);
        } catch {
          /* private mode / storage blocked — treat as not seen */
        }
        if (seen === String(data.version)) return; // already dismissed this campaign
        setPopup(data);
        setVisible(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Lock scroll, focus the close button, trigger fade-in, and wire ESC.
  useEffect(() => {
    if (!visible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setShown(true));
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function close() {
    if (popup?.version != null) {
      try {
        window.localStorage.setItem(SEEN_KEY, String(popup.version));
      } catch {
        /* ignore */
      }
    }
    setShown(false);
    // let the fade-out play before unmounting
    setTimeout(() => setVisible(false), 200);
  }

  if (!visible || !popup?.imageUrl) return null;

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={popup.imageUrl}
      alt={popup.imageAlt || "Announcement"}
      className="block h-auto w-full rounded-xl object-contain shadow-2xl"
      style={{ maxHeight: "82vh" }}
    />
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={popup.imageAlt || "Announcement"}
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 4vw, 40px)",
        background: "rgba(20, 10, 4, 0.66)",
        backdropFilter: "blur(4px)",
        opacity: shown ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "clamp(280px, 92vw, 560px)",
          transform: shown ? "scale(1) translateY(0)" : "scale(0.96) translateY(8px)",
          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <button
          ref={closeRef}
          onClick={close}
          aria-label="Close"
          style={{
            position: "absolute",
            top: -14,
            right: -14,
            zIndex: 2,
            width: 40,
            height: 40,
            borderRadius: "9999px",
            background: "#FFFFFF",
            color: "#2A1208",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 6px 18px rgba(0,0,0,0.28)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 20,
            lineHeight: 1,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {popup.linkUrl ? (
          <a href={popup.linkUrl} target="_blank" rel="noopener noreferrer" onClick={close} style={{ display: "block" }}>
            {img}
          </a>
        ) : (
          img
        )}
      </div>
    </div>
  );
}
