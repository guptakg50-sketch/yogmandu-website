import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://yogmandu.com";
  const now  = new Date();

  return [
    { url: base,                                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/yoga-teacher-training`,         lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/sound-healing-therapy`,         lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/class-schedule`,                lastModified: now, changeFrequency: "weekly",  priority: 0.85 },
    { url: `${base}/about`,                         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,                       lastModified: now, changeFrequency: "yearly",  priority: 0.75 },
    { url: `${base}/gallery`,                       lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/blog`,                          lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
  ];
}
