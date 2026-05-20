import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const posts = [
  {
    slug: "what-yoga-alliance-certification-actually-means",
    category: "Teacher Training",
    title: "What Yoga Alliance Certification Actually Means — And What It Doesn't",
    excerpt: "The RYS 200 stamp is everywhere. But what does it guarantee, what does it leave open, and how should a student actually evaluate a teacher training program?",
    readTime: "6 min",
    date: "April 2025",
    color: "#6B2D8B",
    author: "Dr. Chintamani Gautam",
  },
  {
    slug: "tibetan-singing-bowls-science-of-sound",
    category: "Sound Healing",
    title: "The Science Behind Tibetan Singing Bowls: What Research Actually Says",
    excerpt: "Sound healing is ancient. But modern neuroscience is beginning to understand why it works. Here's what the evidence shows about brainwave entrainment and the autonomic nervous system.",
    readTime: "8 min",
    date: "March 2025",
    color: "#F7941D",
    author: "Dr. Chintamani Gautam",
  },
  {
    slug: "kathmandu-yoga-travel-guide",
    category: "Nepal",
    title: "Kathmandu for the Yoga Traveller: A Practical and Soulful Guide",
    excerpt: "Where to stay, what to visit, which temples to walk through at dawn, and how to begin integrating this extraordinary city into your practice.",
    readTime: "10 min",
    date: "February 2025",
    color: "#8DC63F",
    author: "Yogi Arjun Rakhal",
  },
  {
    slug: "pranayama-beyond-breathwork",
    category: "Practice",
    title: "Pranayama Is Not Breathwork: Understanding the Difference",
    excerpt: "The word 'breathwork' has colonised yoga spaces worldwide. But pranayama is something older, more precise, and more demanding. Here's the distinction that matters.",
    readTime: "7 min",
    date: "January 2025",
    color: "#6B2D8B",
    author: "Dr. Chintamani Gautam",
  },
  {
    slug: "why-small-yoga-teacher-training-groups",
    category: "Teacher Training",
    title: "Why We Keep Our Training Groups Small — And Why It Costs You Less Than You Think",
    excerpt: "We limit every cohort to 12 students. Here's the pedagogical reasoning, and why a small group is actually better value than a 40-person intensive.",
    readTime: "5 min",
    date: "December 2024",
    color: "#F7941D",
    author: "Dr. Chintamani Gautam",
  },
  {
    slug: "sound-healing-trauma",
    category: "Sound Healing",
    title: "Sound Healing and Trauma: What to Know Before Your First Session",
    excerpt: "Sound baths can move deep material. For people with trauma histories, that can be both profound and destabilising. What you should tell your practitioner before you begin.",
    readTime: "9 min",
    date: "November 2024",
    color: "#8DC63F",
    author: "Dr. Dipika",
  },
];

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author, url: "https://yogmandu.com/about" }],
    alternates: { canonical: `https://yogmandu.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://yogmandu.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: [post.category, "Yoga Nepal", "Kathmandu"],
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

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

  const relatedPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

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

      {/* Article */}
      <section className="px-6 pb-20" style={{ background: "#FAF6F0" }}>
        <div className="max-w-3xl mx-auto">
          {/* Lede */}
          <p className="text-xl md:text-2xl font-light leading-relaxed mb-12"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208", borderLeft: `3px solid ${post.color}`, paddingLeft: "1.5rem" }}>
            {post.excerpt}
          </p>

          {/* Coming soon placeholder */}
          <div className="rounded-2xl p-10 text-center" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(42,18,8,0.08)" }}>
            <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: `${post.color}15` }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={post.color} strokeWidth="1.5">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <p className="text-sm font-light mb-6" style={{ color: "rgba(42,18,8,0.5)" }}>
              Full article coming soon. In the meantime, reach out to our teaching team directly.
            </p>
            <a href="https://wa.me/9779862909469"
              className="inline-block px-6 py-2.5 rounded-full text-sm font-medium text-white"
              style={{ background: post.color }}>
              Ask on WhatsApp
            </a>
          </div>
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
