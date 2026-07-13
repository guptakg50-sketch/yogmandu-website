import Link from "next/link";
import { getSectionContent } from "@/lib/pageContent";

/**
 * Site-wide notice that class/session times are not fixed and should be
 * confirmed on WhatsApp before visiting. Dropped onto every page that shows
 * times (class schedule, teacher-training, sound-healing sessions).
 * Wording is admin-editable (Page Content → Timing notice).
 *
 * `variant`:
 *  - "banner" (default) — full callout card, for schedule/landing pages.
 *  - "inline" — slimmer, quieter note for use inside a content page.
 */
export default async function TimingNotice({
  variant = "banner",
  className = "",
}: {
  variant?: "banner" | "inline";
  className?: string;
}) {
  const inline = variant === "inline";
  const notice = await getSectionContent("TIMING_NOTICE");
  return (
    <div
      className={className}
      style={{
        maxWidth: inline ? 720 : 1100,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        gap: inline ? 12 : 16,
        flexWrap: "wrap",
        justifyContent: "center",
        textAlign: "left",
        padding: inline ? "0.9rem 1.1rem" : "1.1rem 1.5rem",
        borderRadius: 16,
        background: "linear-gradient(135deg, rgba(247,148,29,0.10) 0%, rgba(247,148,29,0.04) 100%)",
        border: "1px solid rgba(247,148,29,0.32)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 38,
          height: 38,
          flexShrink: 0,
          borderRadius: 10,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.15rem",
          background: "rgba(247,148,29,0.16)",
          border: "1px solid rgba(247,148,29,0.35)",
        }}
      >
        ⏰
      </span>
      <p
        style={{
          flex: "1 1 260px",
          margin: 0,
          fontSize: inline ? "0.85rem" : "0.92rem",
          lineHeight: 1.55,
          color: "#7A4A10",
        }}
      >
        <strong style={{ color: "#8A4A00" }}>{notice.lead}</strong> {notice.body}
      </p>
      <Link
        href={notice.ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-lift"
        style={{
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: inline ? "0.5rem 1.1rem" : "0.62rem 1.35rem",
          borderRadius: 999,
          background: "#25D366",
          color: "#0A2E17",
          fontSize: "0.85rem",
          fontWeight: 600,
          textDecoration: "none",
          boxShadow: "0 6px 18px rgba(37,211,102,0.3)",
          whiteSpace: "nowrap",
        }}
      >
        <span aria-hidden="true">💬</span> {notice.ctaLabel}
      </Link>
    </div>
  );
}
