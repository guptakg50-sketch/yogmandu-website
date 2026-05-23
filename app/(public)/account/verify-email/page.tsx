"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type State = "loading" | "success" | "already" | "error";

function VerifyEmailContent() {
  const params = useSearchParams();
  const token  = params.get("token") || "";
  const [state, setState]   = useState<State>("loading");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!token) { setState("error"); setErrMsg("Missing verification token."); return; }
    fetch("/api/auth/verify-email", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ token }),
    })
      .then(async r => {
        const data = await r.json();
        if (r.ok) setState(data.alreadyVerified ? "already" : "success");
        else { setState("error"); setErrMsg(data.error || "Verification failed."); }
      })
      .catch(() => { setState("error"); setErrMsg("Network error. Try again."); });
  }, [token]);

  return (
    <div style={pageStyle}>
      <div style={{ width: "100%", maxWidth: 440, textAlign: "center" }}>
        <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: 32 }}>
          <div style={logoRow}>
            <div style={logoBubble}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M13 2C13 2 7 7 7 13C7 16.9 9.8 20.1 13 21.2C16.2 20.1 19 16.9 19 13C19 7 13 2 13 2Z" fill="white"/>
                <circle cx="13" cy="13" r="2.5" fill="rgba(247,148,29,0.9)"/>
              </svg>
            </div>
            <span style={brandText}>Yogmandu</span>
          </div>
        </Link>

        <div style={cardStyle}>
          {state === "loading" && (
            <>
              <div style={{ width: 48, height: 48, borderRadius: "50%", border: "3px solid #e8ddf5", borderTopColor: "#6B2D8B", margin: "0 auto 18px", animation: "spin 0.8s linear infinite" }} />
              <p style={{ color: "#7A5840", fontSize: 14, margin: 0 }}>Verifying your email…</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </>
          )}

          {state === "success" && (
            <>
              <div style={successBubble}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 style={{ fontSize: 26, fontFamily: "'Cormorant Garamond', Georgia, serif", margin: "0 0 8px", color: "#2A1208" }}>Email verified 🙏</h1>
              <p style={{ fontSize: 14, color: "#5C3D2E", margin: "0 0 24px", lineHeight: 1.7 }}>
                Your account is fully set up. Welcome to Yogmandu.
              </p>
              <Link href="/account" style={primaryLink}>Go to your account →</Link>
            </>
          )}

          {state === "already" && (
            <>
              <div style={{ ...successBubble, background: "linear-gradient(135deg, #F7941D, #8DC63F)" }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 style={{ fontSize: 24, fontFamily: "'Cormorant Garamond', Georgia, serif", margin: "0 0 8px", color: "#2A1208" }}>Already verified</h1>
              <p style={{ fontSize: 14, color: "#5C3D2E", margin: "0 0 24px" }}>
                Your email was confirmed earlier. You're all set.
              </p>
              <Link href="/account" style={primaryLink}>Go to your account →</Link>
            </>
          )}

          {state === "error" && (
            <>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(192,57,43,0.1)", border: "1.5px solid rgba(192,57,43,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="9" y1="9" x2="19" y2="19" /><line x1="19" y1="9" x2="9" y2="19" />
                </svg>
              </div>
              <h1 style={{ fontSize: 22, fontFamily: "'Cormorant Garamond', Georgia, serif", margin: "0 0 8px", color: "#2A1208" }}>Verification failed</h1>
              <p style={{ fontSize: 14, color: "#5C3D2E", margin: "0 0 24px", lineHeight: 1.7 }}>{errMsg}</p>
              <Link href="/account" style={primaryLink}>Open your account →</Link>
              <p style={{ fontSize: 12, color: "#9A7860", marginTop: 14 }}>
                Sign in to request a new verification email.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div style={pageStyle}><div>Verifying…</div></div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(160deg, #fdf8f4 0%, #f5f0fa 50%, #fff8f0 100%)",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontFamily: "'DM Sans', sans-serif",
  padding: "40px 20px",
  paddingTop: "104px",
};
const logoRow: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 10 };
const logoBubble: React.CSSProperties = {
  width: 48, height: 48, borderRadius: "50%",
  background: "linear-gradient(135deg, #6B2D8B, #F7941D)",
  display: "flex", alignItems: "center", justifyContent: "center",
  boxShadow: "0 4px 16px rgba(107,45,139,0.35)",
};
const brandText: React.CSSProperties = {
  fontSize: 22, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: "#2A1208",
};
const cardStyle: React.CSSProperties = {
  background: "#fff", borderRadius: 20, padding: "44px 32px",
  boxShadow: "0 4px 40px rgba(107,45,139,0.1), 0 1px 4px rgba(0,0,0,0.06)",
  border: "1px solid rgba(107,45,139,0.08)",
};
const successBubble: React.CSSProperties = {
  width: 64, height: 64, borderRadius: "50%",
  background: "linear-gradient(135deg, #6B2D8B, #8DC63F)",
  display: "flex", alignItems: "center", justifyContent: "center",
  margin: "0 auto 20px",
  boxShadow: "0 8px 24px rgba(107,45,139,0.3)",
};
const primaryLink: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 26px",
  background: "linear-gradient(135deg, #6B2D8B 0%, #8B3DAB 100%)",
  borderRadius: 999,
  color: "#fff",
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "'DM Sans', sans-serif",
  boxShadow: "0 6px 20px rgba(107,45,139,0.35)",
};
