"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/yoga-teacher-training", label: "Teacher Training" },
  { href: "/sound-healing-therapy", label: "Sound Healing" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: "#FAF6F0",
        borderBottom: scrolled
          ? "1px solid rgba(247,148,29,0.2)"
          : "1px solid rgba(107,45,139,0.08)",
        boxShadow: scrolled ? "0 4px 24px rgba(42,18,8,0.08)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
            backgroundImage: "url('/logo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }} />
          <div className="flex flex-col leading-none">
            <span
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "1.5rem",
                fontWeight: 400,
                letterSpacing: "0.01em",
              }}
            >
              <span style={{ color: "#F7941D" }}>Yog</span>
              <span style={{ color: "#6B2D8B" }}>mandu</span>
            </span>
            <span
              className="text-[8px] tracking-[0.22em] uppercase"
              style={{ color: "rgba(42,18,8,0.38)" }}
            >
              Yoga &amp; Sound Healing · Nepal
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-light">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{
                  color:
                    pathname === l.href ? "#F7941D" : "rgba(42,18,8,0.62)",
                  borderBottom:
                    pathname === l.href
                      ? "1px solid rgba(247,148,29,0.5)"
                      : "1px solid transparent",
                  paddingBottom: "2px",
                  transition: "color 0.25s, border-color 0.25s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#6B2D8B";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color =
                    pathname === l.href ? "#F7941D" : "rgba(42,18,8,0.62)";
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              style={{
                color: "rgba(42,18,8,0.62)",
                paddingBottom: "2px",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#6B2D8B";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "rgba(42,18,8,0.62)";
              }}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="cta-lift px-5 py-2 rounded-full text-sm font-medium"
              style={{
                background: "#F7941D",
                color: "#fff",
                boxShadow: "0 4px 14px rgba(247,148,29,0.35)",
              }}
            >
              Book Now
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
            style={{ background: "#2A1208" }}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${open ? "opacity-0" : ""}`}
            style={{ background: "#2A1208" }}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}
            style={{ background: "#2A1208" }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 space-y-1 text-sm font-light"
          style={{ background: "#FAF6F0", borderTop: "1px solid rgba(247,148,29,0.12)" }}
        >
          {[...links, { href: "/contact", label: "Contact" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3"
              style={{
                borderBottom: "1px solid rgba(42,18,8,0.06)",
                color:
                  pathname === l.href ? "#F7941D" : "rgba(42,18,8,0.68)",
              }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block text-center py-3 rounded-full font-medium mt-4"
            style={{ background: "#F7941D", color: "#fff" }}
            onClick={() => setOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
