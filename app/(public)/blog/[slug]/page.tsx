import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/publicData";
import { renderMarkdown, stripMarkdown, trimTo } from "@/lib/markdown";
import ShareButtons from "@/components/ShareButtons";
import { shareImage, shareTopicForCategory } from "@/lib/seo";

// Re-fetch from Supabase at most once a minute so edits made in the admin
// Blog Manager appear on the live site without a rebuild/redeploy. New slugs
// not returned by generateStaticParams are rendered on first request.
export const revalidate = 300;
export const dynamicParams = true;

const CATEGORY_COLORS: Record<string, string> = {
  "Teacher Training": "#6B2D8B",
  "Sound Healing":    "#F7941D",
  "Nepal":            "#8DC63F",
  "Practice":         "#6B2D8B",
  "Breathwork":       "#6B2D8B",
  "Community":        "#8DC63F",
  "Restorative":      "#8DC63F",
  "Yoga Philosophy":  "#F7941D",
};

const FALLBACK_POSTS = [
  { slug: "what-yoga-alliance-certification-actually-means", category: "Teacher Training", title: "What Yoga Alliance Certification Actually Means — And What It Doesn't", excerpt: "The RYS 200 stamp is everywhere. But what does it guarantee, what does it leave open, and how should a student actually evaluate a teacher training program?", readTime: "6 min", date: "April 2025", color: "#6B2D8B", author: "Dr. Chintamani Gautam", body: "" },
  { slug: "tibetan-singing-bowls-science-of-sound", category: "Sound Healing", title: "The Science Behind Tibetan Singing Bowls: What Research Actually Says", excerpt: "Sound healing is ancient. But modern neuroscience is beginning to understand why it works.", readTime: "8 min", date: "March 2025", color: "#F7941D", author: "Dr. Chintamani Gautam", body: "" },
  { slug: "kathmandu-yoga-travel-guide", category: "Nepal", title: "Kathmandu for the Yoga Traveller: A Practical and Soulful Guide", excerpt: "Where to stay, what to visit, which temples to walk through at dawn.", readTime: "10 min", date: "February 2025", color: "#8DC63F", author: "Arjun Rakhal Magar", body: "" },
  { slug: "pranayama-beyond-breathwork", category: "Practice", title: "Pranayama Is Not Breathwork: Understanding the Difference", excerpt: "Pranayama is something older, more precise, and more demanding.", readTime: "7 min", date: "January 2025", color: "#6B2D8B", author: "Dr. Chintamani Gautam", body: "" },
  { slug: "why-small-yoga-teacher-training-groups", category: "Teacher Training", title: "Why We Keep Our Training Groups Small", excerpt: "We limit every cohort to 12 students.", readTime: "5 min", date: "December 2024", color: "#F7941D", author: "Dr. Chintamani Gautam", body: "" },
  { slug: "sound-healing-trauma", category: "Sound Healing", title: "Sound Healing and Trauma: What to Know Before Your First Session", excerpt: "Sound baths can move deep material. What you should tell your practitioner before you begin.", readTime: "9 min", date: "November 2024", color: "#8DC63F", author: "Arjun Neupane", body: "" },
];

type Params = Promise<{ slug: string }>;

// Google truncates the title link to fit the device width. Post titles are
// admin-authored and can run long — the Pashupati post produced an 86-char
// tag once the root layout's "| Yogmandu Nepal" template was appended — so
// build the tag directly and keep the brand suffix only when it still fits.
function buildBlogTitle(title: string): string {
  const brand = " | Yogmandu";
  if (title.length + brand.length <= 60) return title + brand;
  if (title.length <= 60) return title;
  return trimTo(title, 60);
}

// The description used to be the raw excerpt, but excerpts can be a single
// line — "🕉 Om Namah Shivaya" is a real one — which makes a useless snippet.
// Fall back to the opening prose of the body when the excerpt is too thin.
function buildBlogDescription(excerpt: string, body: string, title: string): string {
  const clean = stripMarkdown(excerpt);
  if (clean.length >= 80) return trimTo(clean, 155);
  // Several posts open by repeating their own headline; drop that so the
  // snippet starts on real prose instead of echoing the title above it.
  let prose = stripMarkdown(body);
  const heading = stripMarkdown(title);
  if (heading && prose.toLowerCase().startsWith(heading.toLowerCase())) {
    prose = prose.slice(heading.length).replace(/^[\s\p{P}]+/u, "");
  }
  return prose ? trimTo(prose, 155) : clean;
}

export async function generateStaticParams() {
  const db = await getPublishedBlogs();
  const slugs = db && db.length > 0
    ? db.map((p) => p.slug)
    : FALLBACK_POSTS.map((p) => p.slug);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const db = await getBlogBySlug(slug);
  const post = db
    ? { ...db, color: CATEGORY_COLORS[db.category] ?? "#6B2D8B", readTime: `${Math.max(1, Math.ceil((db.body ?? "").split(/\s+/).length / 200))} min`, date: db.publishDate ? new Date(db.publishDate).toLocaleDateString("en", { month: "long", year: "numeric" }) : "" }
    : FALLBACK_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  // Facebook/WhatsApp/X show the post's own featured photo; posts without one
  // fall back to the site card. Metadata is merged *shallowly* between
  // segments, so an openGraph/twitter object here replaces the root layout's
  // entirely — siteName, locale and twitter.card must be restated or they are
  // dropped from the share preview.
  const topic = shareTopicForCategory(post.category);
  const previewImage = (post as { featuredImage?: string }).featuredImage || "";
  const metaTitle = buildBlogTitle(post.title);
  const metaDescription = buildBlogDescription(post.excerpt ?? "", (post as { body?: string }).body ?? "", post.title);

  return {
    title: { absolute: metaTitle },
    description: metaDescription,
    authors: [{ name: post.author, url: "https://yogmandu.com/about" }],
    alternates: { canonical: `https://yogmandu.com/blog/${post.slug}` },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://yogmandu.com/blog/${post.slug}`,
      siteName: "Yogmandu",
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category, "Yoga Nepal", "Kathmandu"],
      images: [shareImage(previewImage, post.title, topic)],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [shareImage(previewImage, post.title, topic).url],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [db, allDb] = await Promise.all([getBlogBySlug(slug), getPublishedBlogs()]);
  const post = db
    ? { ...db, color: CATEGORY_COLORS[db.category] ?? "#6B2D8B", readTime: `${Math.max(1, Math.ceil((db.body ?? "").split(/\s+/).length / 200))} min`, date: db.publishDate ? new Date(db.publishDate).toLocaleDateString("en", { month: "long", year: "numeric" }) : "" }
    : FALLBACK_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const heroImage = (post as { featuredImage?: string }).featuredImage || "";

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://yogmandu.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Yogmandu",
      url: "https://yogmandu.com",
      logo: { "@type": "ImageObject", url: "https://yogmandu.com/logo.png" },
    },
    datePublished: post.date,
    url: `https://yogmandu.com/blog/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://yogmandu.com/blog/${post.slug}` },
    keywords: [post.category, "Yoga Nepal", "Yogmandu", "Kathmandu yoga"],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://yogmandu.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://yogmandu.com/blog/${post.slug}` },
    ],
  };

  // Prefer DB posts for related articles; fall back to static list
  const relatedPosts = allDb && allDb.length > 1
    ? allDb
        .filter((p) => p.slug !== post.slug)
        .slice(0, 3)
        .map((p) => ({
          slug:     p.slug,
          category: p.category,
          title:    p.title,
          color:    CATEGORY_COLORS[p.category] ?? "#6B2D8B",
        }))
    : FALLBACK_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="pt-36 pb-16 px-6" style={{ background: "#FAF6F0" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/blog" className="text-xs font-light tracking-wide"
              style={{ color: "rgba(42,18,8,0.4)" }}>
              ← Back to Blog
            </Link>
            <span style={{ color: "rgba(42,18,8,0.2)" }}>·</span>
            <span className="text-xs tracking-[0.2em] uppercase font-light" style={{ color: post.color }}>
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-light leading-[1.1] mb-6"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            {post.title}
          </h1>

          <div className="flex items-center gap-6 mb-10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium text-white"
                style={{ background: post.color }}>
                {post.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </div>
              <span className="text-sm font-light" style={{ color: "rgba(42,18,8,0.6)" }}>{post.author}</span>
            </div>
            <span style={{ color: "rgba(42,18,8,0.2)" }}>·</span>
            <span className="text-xs font-light" style={{ color: "rgba(42,18,8,0.4)" }}>{post.date}</span>
            <span style={{ color: "rgba(42,18,8,0.2)" }}>·</span>
            <span className="text-xs font-light" style={{ color: "rgba(42,18,8,0.4)" }}>{post.readTime} read</span>
          </div>
        </div>
      </section>

      {/* Featured image */}
      {heroImage && (
        <section className="px-6 pb-4" style={{ background: "#FAF6F0" }}>
          <div className="max-w-3xl mx-auto overflow-hidden rounded-2xl" style={{ boxShadow: "0 12px 36px rgba(42,18,8,0.14)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage} alt={post.title} loading="eager"
              className="w-full object-cover" style={{ maxHeight: 460, display: "block" }} />
          </div>
        </section>
      )}

      {/* Article */}
      <section className="px-6 pb-20" style={{ background: "#FAF6F0" }}>
        <div className="max-w-3xl mx-auto">
          {/* Lede */}
          <p className="text-xl md:text-2xl font-light leading-relaxed mb-12"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208", borderLeft: `3px solid ${post.color}`, paddingLeft: "1.5rem" }}>
            {post.excerpt}
          </p>

          {/* Article body */}
          {"body" in post && post.body ? (
            <div className="prose-yogmandu">
              {renderMarkdown(post.body, { accent: post.color, skipImage: heroImage })}
            </div>
          ) : (
            <div className="rounded-2xl p-10 text-center" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(42,18,8,0.08)" }}>
              <p className="text-sm font-light mb-6" style={{ color: "rgba(42,18,8,0.5)" }}>
                Full article coming soon. In the meantime, reach out to our teaching team directly.
              </p>
              <a href="https://wa.me/9779810263277"
                className="inline-block px-6 py-2.5 rounded-full text-sm font-medium text-white"
                style={{ background: post.color }}>
                Ask on WhatsApp
              </a>
            </div>
          )}

          <ShareButtons
            url={`https://yogmandu.com/blog/${post.slug}`}
            title={post.title}
            color={post.color}
          />
        </div>
      </section>

      {/* Related posts */}
      <section className="px-6 pb-28" style={{ background: "#FAF6F0" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase mb-8 font-light" style={{ color: "rgba(42,18,8,0.35)" }}>
            More from the blog
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedPosts.map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`}
                className="p-6 rounded-xl group"
                style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(42,18,8,0.07)" }}>
                <span className="text-xs tracking-[0.18em] uppercase font-light block mb-3" style={{ color: related.color }}>
                  {related.category}
                </span>
                <p className="text-base font-light leading-snug group-hover:opacity-70 transition-opacity"
                  style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
                  {related.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
