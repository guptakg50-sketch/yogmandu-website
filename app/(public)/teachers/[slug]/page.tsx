import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getInstructors,
  getInstructorBySlug,
  instructorSlug,
  styleToAccent,
} from "@/lib/publicData";

// Re-fetch from Supabase at most once a minute so admin edits to a teacher
// appear without a redeploy. New slugs are rendered on first request.
export const revalidate = 60;
export const dynamicParams = true;

type Params = Promise<{ slug: string }>;

const HONORIFICS = new Set(["dr", "dr.", "yogi", "mr", "mr.", "ms", "ms.", "mrs", "mrs.", "sri", "prof", "prof."]);
function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/);
  const meaningful = words.filter((w) => !HONORIFICS.has(w.toLowerCase()));
  const pick = (meaningful.length ? meaningful : words).slice(0, 2);
  return pick.map((w) => w[0]?.toUpperCase() ?? "").join("") || "·";
}

export async function generateStaticParams() {
  const list = await getInstructors().catch(() => null);
  return (list ?? []).map((i) => ({ slug: instructorSlug(i.name) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const t = await getInstructorBySlug(slug).catch(() => null);
  if (!t) return { title: { absolute: "Teacher — Yogmandu" } };

  const role = t.role ? ` — ${t.role}` : "";
  const desc = (t.bio || `${t.name} teaches at Yogmandu Yoga & Sound Healing in Kathmandu, Nepal.`)
    .replace(/\s+/g, " ")
    .slice(0, 158);
  const url = `https://yogmandu.com/teachers/${slug}`;

  return {
    title: { absolute: `${t.name}${role} | Yogmandu` },
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: `${t.name} | Yogmandu`,
      description: desc,
      url,
      images: t.photo ? [t.photo] : ["/opengraph-image.png"],
    },
    twitter: { title: `${t.name} | Yogmandu`, description: desc },
  };
}

export default async function TeacherPage({ params }: { params: Params }) {
  const { slug } = await params;
  const t = await getInstructorBySlug(slug).catch(() => null);
  if (!t) notFound();

  const specialties = Array.isArray(t.specialties) ? t.specialties : [];
  const accent      = styleToAccent(specialties);
  const photos      = Array.isArray(t.photos) && t.photos.length ? t.photos : (t.photo ? [t.photo] : []);
  const website     = t.social?.website ?? "";
  const initials    = initialsOf(t.name);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: t.name,
    jobTitle: t.role || "Yoga Teacher",
    description: t.bio || "",
    url: `https://yogmandu.com/teachers/${slug}`,
    image: photos[0] ? `https://yogmandu.com${photos[0]}` : undefined,
    worksFor: { "@type": "Organization", name: "Yogmandu", url: "https://yogmandu.com" },
    knowsAbout: specialties,
    ...(website ? { sameAs: [website] } : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://yogmandu.com/about" },
      { "@type": "ListItem", position: 3, name: t.name, item: `https://yogmandu.com/teachers/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main style={{ background: "#FBF7F2", minHeight: "100vh", paddingTop: 120, paddingBottom: 90 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 1.5rem" }}>
          <Link
            href="/about#teachers"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.04em", color: "#8A6A52", textDecoration: "none", marginBottom: 28 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            Back to the team
          </Link>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: "3rem", alignItems: "start" }}>
            {/* ── Portrait ── */}
            <div>
              {photos[0] ? (
                <img
                  src={photos[0]}
                  alt={t.name}
                  style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", borderRadius: "1.5rem", boxShadow: "0 28px 70px rgba(42,18,8,0.2)", borderTop: `3px solid ${accent}` }}
                />
              ) : (
                <div style={{ width: "100%", aspectRatio: "4 / 5", borderRadius: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(150deg, ${accent} 0%, #160a12 130%)`, fontFamily: "Cormorant Garamond, serif", fontSize: "5rem", fontWeight: 300, color: "rgba(255,255,255,0.92)", boxShadow: "0 28px 70px rgba(42,18,8,0.2)" }}>
                  {initials}
                </div>
              )}

              {photos.length > 1 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))", gap: 8, marginTop: 12 }}>
                  {photos.slice(1).map((src, i) => (
                    <img key={`${src}-${i}`} src={src} alt={`${t.name} — photo ${i + 2}`} loading="lazy"
                      style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: "0.75rem" }} />
                  ))}
                </div>
              ) : null}
            </div>

            {/* ── Detail ── */}
            <div style={{ paddingTop: 6 }}>
              {t.role ? (
                <p style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: accent, marginBottom: 12 }}>{t.role}</p>
              ) : null}

              <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 300, color: "#2A1208", lineHeight: 1.05, marginBottom: 14 }}>{t.name}</h1>

              <div style={{ width: 54, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, marginBottom: 22 }} />

              {t.certifications ? (
                <p style={{ fontSize: "0.92rem", lineHeight: 1.55, color: "#7A5840", marginBottom: 18, fontWeight: 500 }}>{t.certifications}</p>
              ) : null}

              {t.bio ? (
                <p style={{ fontSize: "1.02rem", lineHeight: 1.8, color: "#4A2E1A", marginBottom: 24, whiteSpace: "pre-line" }}>{t.bio}</p>
              ) : null}

              {specialties.length ? (
                <div style={{ marginBottom: 28 }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9A7860", marginBottom: 10 }}>Specialties</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {specialties.map((s) => (
                      <span key={s} style={{ fontSize: "0.82rem", padding: "5px 14px", borderRadius: "3rem", background: "#fff", border: `1px solid ${accent}44`, color: "#5A3A22", fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                <Link href="/book" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.8rem 1.6rem", borderRadius: "3rem", background: accent, color: "#fff", fontSize: "0.86rem", fontWeight: 600, textDecoration: "none", boxShadow: `0 10px 24px ${accent}40` }}>
                  Book a class
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>

                {website ? (
                  <a href={website} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "0.8rem 1.4rem", borderRadius: "3rem", border: `1.5px solid ${accent}55`, color: accent, fontSize: "0.86rem", fontWeight: 600, textDecoration: "none" }}>
                    View full profile
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M7 7h10v10" /></svg>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
