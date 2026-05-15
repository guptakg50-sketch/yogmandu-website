"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#FAF6F0", color: "#2A1208", position: "relative", overflow: "hidden" }}>

      {/* Subtle bg glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: -80, left: -80, width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(247,148,29,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -60, right: -60, width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,45,139,0.07) 0%, transparent 70%)" }} />
        {/* Mandala watermark */}
        <svg style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%)", opacity: 0.04 }}
          width="280" height="280" viewBox="0 0 280 280" fill="none">
          <circle cx="140" cy="140" r="130" stroke="#F7941D" strokeWidth="1"/>
          <circle cx="140" cy="140" r="100" stroke="#F7941D" strokeWidth="1"/>
          <circle cx="140" cy="140" r="70"  stroke="#F7941D" strokeWidth="1"/>
          <circle cx="140" cy="140" r="40"  stroke="#F7941D" strokeWidth="1"/>
          {[0,30,60,90,120,150,180,210,240,270,300,330].map(d => (
            <line key={d} x1="140" y1="10" x2="140" y2="270"
              stroke="#F7941D" strokeWidth="0.5"
              transform={`rotate(${d} 140 140)`}/>
          ))}
        </svg>
      </div>

      {/* ── CTA row ── */}
      <div style={{ borderBottom: "1px solid rgba(42,18,8,0.07)", padding: "3rem 2rem", position: "relative" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
          <div>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase",
              color: "#8DC63F", marginBottom: 8 }}>Begin your journey</p>
            <h3 style={{ fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, lineHeight: 1.15, margin: 0, color: "#2A1208" }}>
              Nepal is calling.<br />
              <em style={{ color: "#F7941D" }}>Are you ready?</em>
            </h3>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/yoga-teacher-training" className="cta-lift" style={{
              padding: "0.7rem 1.6rem", borderRadius: 999, background: "#F7941D",
              color: "#fff", fontSize: "0.83rem", fontWeight: 500,
              boxShadow: "0 6px 24px rgba(247,148,29,0.35)", textDecoration: "none" }}>
              View Programs
            </Link>
            <Link href="/contact" className="cta-lift" style={{
              padding: "0.7rem 1.6rem", borderRadius: 999,
              border: "1.5px solid #6B2D8B", color: "#6B2D8B",
              fontSize: "0.83rem", fontWeight: 300, textDecoration: "none" }}>
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3.5rem 2rem 2rem",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2.5rem" }}>

        {/* Brand */}
        <div style={{ gridColumn: "span 2" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
              backgroundImage: "url('/logo.png')",
              backgroundSize: "cover", backgroundPosition: "center",
            }} />
            <div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.45rem", fontWeight: 400 }}>
                <span style={{ color: "#F7941D" }}>Yog</span>
                <span style={{ color: "#6B2D8B" }}>mandu</span>
              </div>
              <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(42,18,8,0.35)", marginTop: 2 }}>
                Yoga &amp; Sound Healing · Nepal
              </div>
            </div>
          </div>
          <p style={{ fontSize: "0.83rem", lineHeight: 1.75, color: "rgba(42,18,8,0.45)",
            maxWidth: 260, fontWeight: 300, marginBottom: 24 }}>
            Yoga Alliance certified teacher training &amp; authentic Tibetan Sound Healing in Kathmandu, Nepal. Transforming practitioners since 2014.
          </p>
          {/* Socials */}
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { label: "Instagram", href: "https://instagram.com/yogmandu",
                d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
              { label: "Facebook", href: "https://facebook.com/yogmandu",
                d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
              { label: "WhatsApp", href: "https://wa.me/9779800000000",
                d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                style={{ width: 36, height: 36, borderRadius: "50%", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  background: "rgba(42,18,8,0.05)", border: "1px solid rgba(42,18,8,0.1)",
                  color: "rgba(42,18,8,0.35)", transition: "all 0.25s" }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(247,148,29,0.1)";
                  el.style.borderColor = "rgba(247,148,29,0.4)";
                  el.style.color = "#F7941D";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "rgba(42,18,8,0.05)";
                  el.style.borderColor = "rgba(42,18,8,0.1)";
                  el.style.color = "rgba(42,18,8,0.35)";
                }}>
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                  <path d={s.d}/>
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Programs */}
        <div>
          <h4 style={{ fontSize: "0.62rem", letterSpacing: "0.26em", textTransform: "uppercase",
            color: "#F7941D", marginBottom: 20, fontWeight: 400 }}>Programs</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
            {[
              { href: "/yoga-teacher-training", label: "200hr Teacher Training" },
              { href: "/yoga-teacher-training", label: "300hr Advanced Training" },
              { href: "/sound-healing-therapy", label: "Sound Healing Sessions" },
              { href: "/sound-healing-therapy", label: "Sound Healing Cert." },
            ].map(l => (
              <li key={l.label}>
                <Link href={l.href} style={{ fontSize: "0.83rem", fontWeight: 300,
                  color: "rgba(42,18,8,0.45)", textDecoration: "none",
                  display: "flex", alignItems: "center", gap: 8, transition: "color 0.2s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#F7941D")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(42,18,8,0.45)")}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%",
                    background: "#F7941D", opacity: 0.5, flexShrink: 0 }} />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontSize: "0.62rem", letterSpacing: "0.26em", textTransform: "uppercase",
            color: "#8DC63F", marginBottom: 20, fontWeight: 400 }}>Company</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
            {[
              { href: "/about",   label: "About Us" },
              { href: "/gallery", label: "Gallery" },
              { href: "/blog",    label: "Blog" },
              { href: "/contact", label: "Contact" },
            ].map(l => (
              <li key={l.label}>
                <Link href={l.href} style={{ fontSize: "0.83rem", fontWeight: 300,
                  color: "rgba(42,18,8,0.45)", textDecoration: "none",
                  display: "flex", alignItems: "center", gap: 8, transition: "color 0.2s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#8DC63F")}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(42,18,8,0.45)")}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%",
                    background: "#8DC63F", opacity: 0.5, flexShrink: 0 }} />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: "0.62rem", letterSpacing: "0.26em", textTransform: "uppercase",
            color: "rgba(42,18,8,0.35)", marginBottom: 20, fontWeight: 400 }}>Find Us</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { icon: "📍", text: "Thamel, Kathmandu, Nepal" },
              { icon: "📞", text: "+977 98-XXXXXXXX" },
              { icon: "✉️", text: "hello@yogmandu.com" },
              { icon: "🕐", text: "Mon–Sun · 6:00–20:00" },
            ].map(c => (
              <li key={c.text} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: "0.85rem" }}>{c.icon}</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 300, color: "rgba(42,18,8,0.4)", lineHeight: 1.5 }}>
                  {c.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(42,18,8,0.07)", padding: "1.2rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap",
          justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <p style={{ fontSize: "0.7rem", color: "rgba(42,18,8,0.25)", fontWeight: 300, margin: 0 }}>
            © {new Date().getFullYear()} Yogmandu. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8DC63F", opacity: 0.7 }} />
            <span style={{ fontSize: "0.7rem", color: "rgba(141,198,63,0.7)", fontWeight: 300, letterSpacing: "0.08em" }}>
              Yoga Alliance RYS 200 &amp; 300 · Kathmandu, Nepal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
