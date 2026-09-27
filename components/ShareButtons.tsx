"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

// Share row for blog posts. Plain link-outs only — no network SDKs, no
// tracking pixels, nothing that needs cookie consent.

type Props = {
  /** Absolute URL of the post — share endpoints reject relative paths. */
  url: string;
  title: string;
  /** Category accent colour, used for the hover fill. */
  color: string;
};

const ICON = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "currentColor" } as const;

const FacebookIcon = () => (
  <svg {...ICON} aria-hidden="true">
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg {...ICON} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const XIcon = () => (
  <svg {...ICON} aria-hidden="true">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export default function ShareButtons({ url, title, color }: Props) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: <FacebookIcon /> },
    { name: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, icon: <WhatsAppIcon /> },
    { name: "X",        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, icon: <XIcon /> },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // clipboard API needs a secure context — fall back to a hidden textarea
      const field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "absolute";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      document.body.removeChild(field);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const buttonStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(42,18,8,0.1)",
    color: "rgba(42,18,8,0.55)",
  };

  // Fill with the post's accent colour on hover, then hand the styles back.
  const hoverIn = (el: HTMLElement) => {
    el.style.background = color;
    el.style.borderColor = color;
    el.style.color = "#FFFFFF";
  };
  const hoverOut = (el: HTMLElement) => {
    el.style.background = buttonStyle.background as string;
    el.style.borderColor = "rgba(42,18,8,0.1)";
    el.style.color = buttonStyle.color as string;
  };

  return (
    <div
      className="mt-14 pt-8 pb-2"
      style={{ borderTop: "1px solid rgba(42,18,8,0.08)" }}
    >
      <p
        className="text-xs tracking-[0.25em] uppercase mb-5 font-light"
        style={{ color: "rgba(42,18,8,0.35)" }}
      >
        Share this article
      </p>

      <div className="flex items-center gap-3">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            title={`Share on ${link.name}`}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={buttonStyle}
            onMouseEnter={(e) => hoverIn(e.currentTarget)}
            onMouseLeave={(e) => hoverOut(e.currentTarget)}
          >
            {link.icon}
          </a>
        ))}

        <button
          type="button"
          onClick={copyLink}
          aria-label={copied ? "Link copied" : "Copy link"}
          title={copied ? "Link copied" : "Copy link"}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          style={copied ? { background: color, borderColor: color, color: "#FFFFFF" } : buttonStyle}
          onMouseEnter={(e) => !copied && hoverIn(e.currentTarget)}
          onMouseLeave={(e) => !copied && hoverOut(e.currentTarget)}
        >
          {copied ? <Check size={15} /> : <Link2 size={15} />}
        </button>

        <span
          className="text-xs font-light transition-opacity duration-200"
          style={{ color: "rgba(42,18,8,0.4)", opacity: copied ? 1 : 0 }}
          aria-live="polite"
        >
          {copied ? "Link copied" : ""}
        </span>
      </div>
    </div>
  );
}
