import Link from "next/link";
import { getPublishedBlogs } from "@/lib/publicData";

/**
 * "Further reading" band of blog cards for service pages.
 *
 * Search Console showed every long post published since August sitting in
 * "Discovered – currently not indexed": nothing on the site linked to them
 * except the /blog index. A link from the service page each post supports
 * tells Google the post matters and what it is about.
 *
 * Pass `slugs` to pick posts (the first three published ones, in that order,
 * so a fallback can follow a post still in draft), or `latest` to show the
 * newest posts. Renders nothing when no
 * post qualifies, so a draft never produces an empty band or a dead link.
 */
export default async function FurtherReading({
  slugs,
  latest,
  eyebrow = "Further Reading",
  title = "From the Yogmandu blog",
  background = "#FFFFFF",
}: {
  slugs?: string[];
  latest?: number;
  eyebrow?: string;
  title?: string;
  background?: string;
}) {
  const all = (await getPublishedBlogs().catch(() => null)) ?? [];
  const posts = slugs
    ? slugs.map((s) => all.find((p) => p.slug === s)).filter((p) => p !== undefined).slice(0, 3)
    : [...all]
        // Some posts were saved without a publish date and the query's
        // published_at ordering puts them first; fall back to createdAt.
        .sort((a, b) => (b.publishDate || b.createdAt || "").localeCompare(a.publishDate || a.createdAt || ""))
        .slice(0, latest ?? 3);
  if (posts.length === 0) return null;

  return (
    <section className="py-20 px-6" style={{ background }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase mb-4 font-medium" style={{ color: "#8DC63F" }}>{eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            {title}
          </h2>
          <div className="section-divider mt-6" />
        </div>
        {/* Flex rather than a 3-column grid so one or two cards sit centred. */}
        <div className="flex flex-wrap justify-center gap-6">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`}
              className="lift-3d rounded-2xl overflow-hidden flex flex-col group w-full md:w-[calc((100%-3rem)/3)]"
              style={{ background: "#FFFFFF", border: "1.5px solid rgba(107,45,139,0.12)" }}>
              <div className="overflow-hidden" style={{ height: 170 }}>
                {p.featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.featuredImage} alt={p.title} loading="lazy" decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #6B2D8B22 0%, #6B2D8B0a 100%)" }}>
                    <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", color: "#6B2D8B99" }}>ॐ</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#B86010" }}>{p.category}</span>
                <h3 className="text-xl font-light leading-snug mb-3 flex-1"
                  style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>{p.title}</h3>
                <span className="text-sm font-medium" style={{ color: "#6B2D8B" }}>Read the article →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
