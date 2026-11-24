import type { MetadataRoute } from "next";
import pageDates from "@/lib/generated/pageDates.json";
import {
  getPublishedBlogs,
  getCustomSitemapUrls,
  getGalleryItems,
  getInstructors,
  isInstructorVisible,
  instructorSlug,
} from "@/lib/publicData";
import { getPublishedEvents, isPastEvent } from "@/lib/events";
import { resolveGalleryPhotos, toAbsoluteSrc } from "./(public)/gallery/galleryData";

// Re-generate at most once every 5 minutes, matching the public pages.
//
// Without this the sitemap is baked at build time, so a post published from
// the admin never appears in it until someone redeploys — new content was
// silently undiscoverable by Google. Blog posts, events and admin-managed
// custom URLs all come from the database, so this route must revalidate too.
export const revalidate = 300;

// <lastmod> for code-defined pages comes from git (lib/generated/pageDates.json,
// written by scripts/gen-page-dates.mjs before each build). This used to call
// fs.statSync(), which has no filesystem to read on Cloudflare Workers, so
// every static page reported "now" — 44 URLs claiming to change on every
// sitemap regeneration. Google discounts lastmod on sitemaps like that.
const DATES = pageDates as Record<string, string>;

// Fallback for anything without its own date: the last commit of the whole
// site. Stable between deploys, never "now".
const BUILD_DATE = new Date(DATES["*"]);

function mtime(relPath: string): Date {
  const dir = relPath.replace(/\/[^/]+$/, "");
  const iso = DATES[dir];
  return iso ? new Date(iso) : BUILD_DATE;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://yogmandu.com";

  // Gallery photos as <image:image> entries so Google can discover them directly.
  const galleryItems  = await getGalleryItems().catch(() => null);
  const galleryImages = resolveGalleryPhotos(galleryItems).map((p) => toAbsoluteSrc(p.src));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                                    lastModified: mtime("app/(public)/page.tsx"),                       changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/yoga-teacher-training`,         lastModified: mtime("app/(public)/yoga-teacher-training/page.tsx"), changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/yoga-teacher-training/commuter`, lastModified: mtime("app/(public)/yoga-teacher-training/commuter/page.tsx"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/yoga-teacher-training/residential`, lastModified: mtime("app/(public)/yoga-teacher-training/residential/page.tsx"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/yoga-teacher-training/online`, lastModified: mtime("app/(public)/yoga-teacher-training/online/page.tsx"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/yoga-teacher-training/300-hour`, lastModified: mtime("app/(public)/yoga-teacher-training/300-hour/page.tsx"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/yoga-teacher-training/500-hour`, lastModified: mtime("app/(public)/yoga-teacher-training/500-hour/page.tsx"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/sound-healing-therapy`,         lastModified: mtime("app/(public)/sound-healing-therapy/page.tsx"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/class-schedule`,                lastModified: mtime("app/(public)/class-schedule/page.tsx"),        changeFrequency: "weekly",  priority: 0.85 },
    { url: `${base}/yoga-for-beginners`,            lastModified: mtime("app/(public)/yoga-for-beginners/page.tsx"),    changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/yoga-retreat-nepal`,            lastModified: mtime("app/(public)/yoga-retreat-nepal/page.tsx"),    changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`,                      lastModified: mtime("app/(public)/services/page.tsx"),              changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/about`,                         lastModified: mtime("app/(public)/about/page.tsx"),                 changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,                       lastModified: mtime("app/(public)/contact/page.tsx"),               changeFrequency: "yearly",  priority: 0.75 },
    { url: `${base}/gallery`,                       lastModified: mtime("app/(public)/gallery/page.tsx"),               changeFrequency: "monthly", priority: 0.65, images: galleryImages },
    { url: `${base}/gallery/all`,                   lastModified: mtime("app/(public)/gallery/all/page.tsx"),           changeFrequency: "monthly", priority: 0.6,  images: galleryImages },
    { url: `${base}/events`,                        lastModified: mtime("app/(public)/events/page.tsx"),                changeFrequency: "weekly",  priority: 0.75 },
    { url: `${base}/blog`,                          lastModified: mtime("app/(public)/blog/page.tsx"),                  changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/privacy`,                       lastModified: mtime("app/(public)/privacy/page.tsx"),               changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/accessibility`,                 lastModified: mtime("app/(public)/accessibility/page.tsx"),         changeFrequency: "yearly",  priority: 0.35 },
    { url: `${base}/terms`,                         lastModified: mtime("app/(public)/terms/page.tsx"),                 changeFrequency: "yearly",  priority: 0.3 },

    // ── Service category hubs & individual service pages ──
    { url: `${base}/therapy-wellness`,                        lastModified: mtime("app/(public)/therapy-wellness/page.tsx"),                        changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/specialized-yoga`,                        lastModified: mtime("app/(public)/specialized-yoga/page.tsx"),                        changeFrequency: "monthly", priority: 0.8 },

    { url: `${base}/class-schedule/drop-in`,                  lastModified: mtime("app/(public)/class-schedule/drop-in/page.tsx"),                  changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/class-schedule/virtual`,                  lastModified: mtime("app/(public)/class-schedule/virtual/page.tsx"),                  changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/class-schedule/private`,                  lastModified: mtime("app/(public)/class-schedule/private/page.tsx"),                  changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/class-schedule/home`,                     lastModified: mtime("app/(public)/class-schedule/home/page.tsx"),                     changeFrequency: "monthly", priority: 0.7 },

    { url: `${base}/sound-healing-therapy/sessions`,         lastModified: mtime("app/(public)/sound-healing-therapy/sessions/page.tsx"),          changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sound-healing-therapy/course-level-1`,   lastModified: mtime("app/(public)/sound-healing-therapy/course-level-1/page.tsx"),    changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sound-healing-therapy/course-level-2`,   lastModified: mtime("app/(public)/sound-healing-therapy/course-level-2/page.tsx"),    changeFrequency: "monthly", priority: 0.7 },

    { url: `${base}/yoga-retreat-nepal/weight-loss-bootcamp`, lastModified: mtime("app/(public)/yoga-retreat-nepal/weight-loss-bootcamp/page.tsx"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/yoga-retreat-nepal/corporate-yoga`,      lastModified: mtime("app/(public)/yoga-retreat-nepal/corporate-yoga/page.tsx"),       changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/yoga-retreat-nepal/yoga-trekking`,       lastModified: mtime("app/(public)/yoga-retreat-nepal/yoga-trekking/page.tsx"),        changeFrequency: "monthly", priority: 0.7 },

    { url: `${base}/therapy-wellness/yoga-therapy`,          lastModified: mtime("app/(public)/therapy-wellness/yoga-therapy/page.tsx"),           changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/therapy-wellness/reiki-healing`,         lastModified: mtime("app/(public)/therapy-wellness/reiki-healing/page.tsx"),          changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/therapy-wellness/diet-consultation`,     lastModified: mtime("app/(public)/therapy-wellness/diet-consultation/page.tsx"),      changeFrequency: "monthly", priority: 0.7 },

    { url: `${base}/specialized-yoga/prenatal`,              lastModified: mtime("app/(public)/specialized-yoga/prenatal/page.tsx"),               changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/specialized-yoga/childrens-yoga`,        lastModified: mtime("app/(public)/specialized-yoga/childrens-yoga/page.tsx"),         changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/specialized-yoga/senior-yoga`,           lastModified: mtime("app/(public)/specialized-yoga/senior-yoga/page.tsx"),            changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/specialized-yoga/school-yoga`,           lastModified: mtime("app/(public)/specialized-yoga/school-yoga/page.tsx"),            changeFrequency: "monthly", priority: 0.7 },
  ];

  // Dynamically add published blog posts
  const blogs = await getPublishedBlogs().catch(() => null);
  const blogRoutes: MetadataRoute.Sitemap = (blogs ?? []).map((post) => ({
    url:             `${base}/blog/${post.slug}`,
    lastModified:    post.publishDate ? new Date(post.publishDate) : BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority:        0.6,
  }));

  // Fallback static blog slugs if Supabase isn't configured (still uses real mtime)
  const fallbackBlogSlugs = [
    "what-yoga-alliance-certification-actually-means",
    "tibetan-singing-bowls-science-of-sound",
    "kathmandu-yoga-travel-guide",
    "pranayama-beyond-breathwork",
    "why-small-yoga-teacher-training-groups",
    "sound-healing-trauma",
  ];
  const fallbackRoutes: MetadataRoute.Sitemap = blogRoutes.length === 0
    ? fallbackBlogSlugs.map((slug) => ({
        url: `${base}/blog/${slug}`,
        lastModified: mtime("app/(public)/blog/[slug]/page.tsx"),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    : [];

  // Published events. Upcoming ones change often and are the point of the
  // page, so they rank above the past archive.
  const events = await getPublishedEvents().catch(() => null);
  const eventRoutes: MetadataRoute.Sitemap = (events ?? []).map((event) => ({
    url:             `${base}/events/${event.slug}`,
    lastModified:    BUILD_DATE,
    changeFrequency: isPastEvent(event) ? ("yearly" as const) : ("weekly" as const),
    priority:        isPastEvent(event) ? 0.4 : 0.7,
  }));

  // Teacher profile pages. They were live and already earning impressions in
  // Search Console, but were only reachable through the About page cards, so
  // Google found them late. Listing them here helps the instructor (E-E-A-T)
  // pages get crawled with the rest of the site.
  const instructors = await getInstructors().catch(() => null);
  const teacherRoutes: MetadataRoute.Sitemap = (instructors ?? [])
    .filter(isInstructorVisible)
    .map((t) => ({
      url:             `${base}/teachers/${instructorSlug(t.name)}`,
      lastModified:    BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority:        0.5,
    }));

  // Admin-managed custom URLs (Supabase). Degrades gracefully if unavailable.
  const custom = await getCustomSitemapUrls().catch(() => null);
  const customRoutes: MetadataRoute.Sitemap = (custom ?? []).map((row) => ({
    url:             `${base}${row.path}`,
    lastModified:    BUILD_DATE,
    changeFrequency: row.change_frequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority:        row.priority,
  }));

  return [...staticRoutes, ...blogRoutes, ...fallbackRoutes, ...eventRoutes, ...teacherRoutes, ...customRoutes];
}
