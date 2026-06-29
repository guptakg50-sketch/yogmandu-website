"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Deployment-skew recovery: after a redeploy, an already-open tab holds the
    // previous build's HTML and tries to lazy-load chunk hashes that no longer
    // exist → ChunkLoadError. Hard-reload once to pick up the fresh build. A
    // sessionStorage timestamp guards against a reload loop if the chunk is
    // genuinely missing (then we fall through to the error UI below).
    if (typeof window !== "undefined") {
      const isChunkError =
        error?.name === "ChunkLoadError" ||
        /Loading chunk [\w-]+ failed|Loading CSS chunk|dynamically imported module|Importing a module script failed/i.test(
          error?.message || ""
        );
      if (isChunkError) {
        const KEY = "chunk-reload-ts";
        const last = Number(sessionStorage.getItem(KEY) || 0);
        if (Date.now() - last > 10000) {
          sessionStorage.setItem(KEY, String(Date.now()));
          window.location.reload();
          return;
        }
      }
    }

    if (typeof window !== "undefined" && "gtag" in window) {
      // Best-effort error reporting to GA4
      try {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "exception", {
          description: error.message,
          fatal: false,
          digest: error.digest,
        });
      } catch {
        /* noop */
      }
    }
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(160deg, #fdf8f4 0%, #f5f0fa 50%, #fff8f0 100%)",
        fontFamily: "'DM Sans', sans-serif",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "#F7941D",
          fontWeight: 500,
          marginBottom: 12,
        }}
      >
        Something went wrong
      </p>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
          fontWeight: 300,
          lineHeight: 1.15,
          color: "#2A1208",
          margin: 0,
          marginBottom: 20,
        }}
      >
        Take a breath —<br />
        <em style={{ color: "#F7941D" }}>we’ll try again.</em>
      </h1>
      <p style={{ fontSize: 15, color: "#5C3D2E", maxWidth: 440, marginBottom: 32, lineHeight: 1.7 }}>
        An unexpected error stopped this page from loading. Try again, or return home and start fresh.
      </p>

      {error.digest && (
        <p style={{ fontSize: 11, color: "#9A7860", marginBottom: 24, fontFamily: "monospace" }}>
          Reference: {error.digest}
        </p>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        <button
          onClick={() => unstable_retry()}
          style={{
            padding: "12px 28px",
            background: "#F7941D",
            color: "#fff",
            border: "none",
            borderRadius: 999,
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 500,
            boxShadow: "0 6px 20px rgba(247,148,29,0.35)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{
            padding: "12px 28px",
            background: "transparent",
            color: "#6B2D8B",
            border: "1.5px solid #6B2D8B",
            borderRadius: 999,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
