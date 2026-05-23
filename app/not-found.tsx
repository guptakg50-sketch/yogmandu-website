import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you’re looking for doesn’t exist. Find your way back to Yogmandu.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
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
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 48 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6B2D8B, #F7941D)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 24px rgba(107,45,139,0.3)",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 26 26" fill="none">
            <path d="M13 2C13 2 7 7 7 13C7 16.9 9.8 20.1 13 21.2C16.2 20.1 19 16.9 19 13C19 7 13 2 13 2Z" fill="white" />
            <circle cx="13" cy="13" r="2.5" fill="rgba(247,148,29,0.9)" />
          </svg>
        </div>
        <span style={{ fontSize: 26, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: "#2A1208" }}>
          Yogmandu
        </span>
      </Link>

      <p
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "#8DC63F",
          fontWeight: 500,
          marginBottom: 12,
        }}
      >
        404 · Not Found
      </p>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(2.5rem, 6vw, 4rem)",
          fontWeight: 300,
          lineHeight: 1.1,
          color: "#2A1208",
          margin: 0,
          marginBottom: 20,
        }}
      >
        This path has not yet
        <br />
        <em style={{ color: "#F7941D" }}>been walked.</em>
      </h1>
      <p style={{ fontSize: 16, color: "#5C3D2E", maxWidth: 440, marginBottom: 36, lineHeight: 1.7 }}>
        The page you’re looking for may have moved, or it never existed. Take a breath — and find your way back.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        <Link
          href="/"
          style={{
            padding: "12px 28px",
            background: "#F7941D",
            color: "#fff",
            borderRadius: 999,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
            boxShadow: "0 6px 20px rgba(247,148,29,0.35)",
          }}
        >
          Return home
        </Link>
        <Link
          href="/class-schedule"
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
          View classes
        </Link>
        <Link
          href="/contact"
          style={{
            padding: "12px 28px",
            background: "transparent",
            color: "#6B2D8B",
            borderRadius: 999,
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Get in touch →
        </Link>
      </div>
    </main>
  );
}
