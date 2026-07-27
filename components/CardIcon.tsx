// Line icons for the homepage/quick-link cards.
//
// These replace the emoji that used to sit on those cards: emoji are rendered by
// the operating system, so the same card looked different (and often clashed)
// on Windows, Android and iOS. These are plain inline SVG paths that inherit
// `currentColor`, so they match the card's accent colour everywhere.
//
// `name` is stored in the database and chosen in the admin. Anything that is not
// a known name is rendered as-is, which keeps old emoji values working.

export const CARD_ICONS: Record<string, string> = {
  calendar:  "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  lotus:     "M12 21c-4.5 0-8-2.7-8-6 0-1 .3-2 .9-2.8 1.4.3 2.6 1 3.5 1.9M12 21c4.5 0 8-2.7 8-6 0-1-.3-2-.9-2.8-1.4.3-2.6 1-3.5 1.9M12 21c-2.8 0-5-3.4-5-7.5S9.2 3 12 3s5 3.4 5 10.5S14.8 21 12 21Z",
  sound:     "M9 18V7l10-3v11M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm10-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  bowl:      "M3 11h18a9 9 0 0 1-18 0ZM12 3v4M9.5 4.5 12 7l2.5-2.5",
  sparkle:   "M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4L12 3Zm6.5 8.5.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z",
  sunrise:   "M12 2v4M4.9 6.9 7.8 9.8M2 14h4M18 14h4M16.2 9.8l2.9-2.9M2 20h20M8 14a4 4 0 0 1 8 0",
  camera:    "M14.5 4h-5L8 6.5H5a2 2 0 0 0-2 2V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a2 2 0 0 0-2-2h-3L14.5 4ZM12 16.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z",
  mountain:  "M3 20h18L14.5 7 11 13.5 8.5 10 3 20Z",
  heart:     "M12 20s-7-4.4-7-9.3A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7 2.7C19 15.6 12 20 12 20Z",
  leaf:      "M4 20C3 12 8 5 20 4c1 10-5 15-12 15-1.5 0-3 .3-4 1ZM8 16c2-4 5-6 9-7",
  users:     "M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.9M16 2.1a4 4 0 0 1 0 7.8",
  teacher:   "M12 3 2 8l10 5 10-5-10-5ZM6 10.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5",
  clock:     "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3.5 2",
  chat:      "M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12Z",
  home:      "M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5M10 20v-5h4v5",
  laptop:    "M4 6h16v10H4V6Zm-2 14h20M9.5 20h5",
  star:      "M12 3.5 14.6 9l6.1.9-4.4 4.3 1 6.1-5.3-2.9-5.3 2.9 1-6.1L3.3 9.9 9.4 9 12 3.5Z",
  scroll:    "M6 3h11a2 2 0 0 1 2 2v13a3 3 0 0 0 3 3H8a3 3 0 0 1-3-3V5a2 2 0 0 1 1-2Zm0 0a2 2 0 0 0-2 2v3h3M9 8h7M9 12h7M9 16h4",
  fire:      "M12 21c3.9 0 6-2.4 6-5.5 0-4-3.5-5.5-3-10.5-3 1.5-4.5 4-4.5 6.5C10.5 9 9 8 9 6c-1.9 1.7-3 4-3 6.5C6 17 8.1 21 12 21Z",
  briefcase: "M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm6 0V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M3 13h18",
};

export type CardIconName = keyof typeof CARD_ICONS;

/** Names offered in the admin picker. */
export const CARD_ICON_NAMES = Object.keys(CARD_ICONS);

/**
 * A card's icon can also be a picture the client uploaded in the admin, in
 * which case the stored value is a path or URL rather than an icon name.
 */
export function isImageIcon(value?: string): boolean {
  if (!value) return false;
  return value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://") || value.startsWith("data:");
}

export default function CardIcon({
  name,
  size = 32,
  strokeWidth = 1.5,
  className,
  style,
  alt = "",
}: {
  name?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}) {
  // An uploaded picture. Boxed to the icon's size and centred, so a photo of any
  // dimensions sits in the card exactly where the icon would and can never
  // stretch the layout.
  if (isImageIcon(name)) {
    return (
      <img
        src={name}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        className={className}
        style={{
          display: "block",
          width: size,
          height: size,
          objectFit: "contain",
          ...style,
        }}
      />
    );
  }

  const path = name ? CARD_ICONS[name] : undefined;

  // Not a known icon name — most likely a legacy emoji, so show it verbatim
  // rather than dropping the card's visual entirely.
  if (!path) {
    return (
      <span className={className} style={{ fontSize: size, lineHeight: 1, display: "block", ...style }} aria-hidden="true">
        {name || "•"}
      </span>
    );
  }

  return (
    <svg
      className={className}
      style={{ display: "block", ...style }}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}
