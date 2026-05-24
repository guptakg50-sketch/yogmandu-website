// Small inline spinner — drop next to button text for "this is working" feedback.
// Defaults to currentColor so it inherits the button's text color.
export default function Spinner({ size = 14, stroke = 2 }: { size?: number; stroke?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ display: "inline-block", verticalAlign: "-2px", marginRight: 6 }}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth={stroke} />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        style={{ transformOrigin: "12px 12px", animation: "spinner-rot 0.8s linear infinite" }}
      />
      <style>{`@keyframes spinner-rot { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}
