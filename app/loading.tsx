export default function Loading() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        background: "#FFFFFF",
        fontFamily: "'DM Sans', sans-serif",
      }}
      role="status"
      aria-label="Loading"
    >
      <div style={{ position: "relative", width: 64, height: 64 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2px solid rgba(247,148,29,0.18)",
            borderTopColor: "#F7941D",
            animation: "yg-spin 1.1s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 10,
            borderRadius: "50%",
            border: "1.5px solid rgba(107,45,139,0.18)",
            borderBottomColor: "#6B2D8B",
            animation: "yg-spin 1.8s linear infinite reverse",
          }}
        />
      </div>
      <p
        style={{
          fontSize: "0.65rem",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "#9A7860",
          margin: 0,
        }}
      >
        Loading
      </p>
      <style>{`@keyframes yg-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
