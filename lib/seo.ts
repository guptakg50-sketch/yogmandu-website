import type { Metadata } from "next";
import { getSharePage } from "@/lib/pageContent";

const SITE_URL = "https://yogmandu.com";
const DEFAULT_SHARE_IMAGE = "/share-yoga-class.jpg";
const SHARE_IMAGE_BY_TOPIC = {
  blog: "/share-blog.jpg",
  class: "/share-yoga-class.jpg",
  event: "/share-events.jpg",
  retreat: "/share-yoga-retreat.jpg",
  sound: "/share-sound-healing.jpg",
  specialized: "/share-specialized-yoga.jpg",
  teacher: "/share-teachers.jpg",
  therapy: "/share-therapy-wellness.jpg",
  training: "/share-yoga-teacher-training.jpg",
} as const;

type ShareImage = {
  url: string;
  width: number;
  height: number;
  alt?: string;
  type: string;
};

type OpenGraphImages = NonNullable<NonNullable<Metadata["openGraph"]>["images"]>;

type ShareTopic = keyof typeof SHARE_IMAGE_BY_TOPIC;

function fallbackForTopic(topic?: ShareTopic): string {
  return topic ? SHARE_IMAGE_BY_TOPIC[topic] : DEFAULT_SHARE_IMAGE;
}

function topicForText(text: string): ShareTopic | undefined {
  const value = text.toLowerCase();
  if (value.includes("teacher training") || value.includes("ytt") || value.includes("ryt")) return "training";
  if (value.includes("sound") || value.includes("singing bowl") || value.includes("bowl")) return "sound";
  if (value.includes("retreat") || value.includes("trekking") || value.includes("bootcamp")) return "retreat";
  if (value.includes("therapy") || value.includes("reiki") || value.includes("diet")) return "therapy";
  if (value.includes("children") || value.includes("prenatal") || value.includes("senior") || value.includes("school")) return "specialized";
  if (value.includes("event") || value.includes("workshop")) return "event";
  if (value.includes("teacher")) return "teacher";
  if (value.includes("blog") || value.includes("philosophy") || value.includes("breathwork")) return "blog";
  if (value.includes("class") || value.includes("schedule") || value.includes("yoga")) return "class";
  return undefined;
}

export function shareTopicForPath(path: string): ShareTopic {
  if (path.startsWith("/blog/")) return "blog";
  if (path === "/blog") return "blog";
  if (path.startsWith("/events/")) return "event";
  if (path === "/events") return "event";
  if (path.startsWith("/teachers/")) return "teacher";
  if (path.startsWith("/yoga-teacher-training")) return "training";
  if (path.startsWith("/sound-healing-therapy")) return "sound";
  if (path.startsWith("/yoga-retreat-nepal")) return "retreat";
  if (path.startsWith("/therapy-wellness")) return "therapy";
  if (path.startsWith("/specialized-yoga")) return "specialized";
  if (path.startsWith("/class-schedule") || path === "/" || path === "/yoga-for-beginners") return "class";
  return topicForText(path) ?? "class";
}

export function shareTopicForCategory(category: string): ShareTopic {
  return topicForText(category) ?? "blog";
}

function toAbsoluteShareUrl(url: string | URL | undefined, fallback = DEFAULT_SHARE_IMAGE): string {
  const raw = String(url || fallback).trim();
  if (!raw || raw.startsWith("data:") || raw.startsWith("blob:")) {
    return `${SITE_URL}${fallback}`;
  }
  const absolute = new URL(raw, SITE_URL).toString();
  const pathname = new URL(absolute).pathname.toLowerCase();
  if (pathname === "/opengraph-image.png" || pathname === "/twitter-image.png") {
    return `${SITE_URL}${fallback}`;
  }
  if (!/\.(png|jpe?g)$/.test(pathname)) return `${SITE_URL}${fallback}`;
  return absolute;
}

function imageType(url: string): string {
  const pathname = new URL(url).pathname.toLowerCase();
  return pathname.endsWith(".png") ? "image/png" : "image/jpeg";
}

function firstImageUrl(images: OpenGraphImages | undefined): string | undefined {
  if (!images) return undefined;
  const first = Array.isArray(images) ? images[0] : images;
  if (!first) return undefined;
  if (typeof first === "string") return first;
  if (first instanceof URL) return first.toString();
  return String(first.url || "");
}

export function shareImage(url?: string | URL, alt = "Yogmandu", topic?: ShareTopic): ShareImage {
  const absoluteUrl = toAbsoluteShareUrl(url, fallbackForTopic(topic));
  return {
    url: absoluteUrl,
    width: 1200,
    height: 630,
    alt,
    type: imageType(absoluteUrl),
  };
}

export function normalizeShareMetadata(base: Metadata, topic?: ShareTopic): Metadata {
  const image = shareImage(firstImageUrl(base.openGraph?.images), "Yogmandu", topic);

  return {
    ...base,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: "Yogmandu",
      ...base.openGraph,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      ...base.twitter,
      images: [image.url],
    },
  };
}

/**
 * Overlay the admin's share-preview text onto a page's built-in metadata.
 *
 * Pages keep their own `Metadata` object (canonical URL, keywords, robots and
 * so on); this only replaces the title/description that WhatsApp, Facebook,
 * LinkedIn and Google show for a shared link, plus the preview image when one
 * has been set. If the database is unreachable the page's own metadata is
 * returned untouched, so a bad connection can never blank out a link preview.
 */
export async function withShareText(path: string, base: Metadata): Promise<Metadata> {
  const share = await getSharePage(path).catch(() => undefined);
  const topic = shareTopicForPath(path);
  const normalized = normalizeShareMetadata(base, topic);
  if (!share) return normalized;

  const title = share.title?.trim();
  const description = share.description?.trim();
  const image = share.image?.trim();
  const imageObject = shareImage(image || firstImageUrl(normalized.openGraph?.images), title || "Yogmandu", topic);

  return {
    ...normalized,
    ...(description ? { description } : {}),
    openGraph: {
      ...normalized.openGraph,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [imageObject],
    },
    twitter: {
      ...normalized.twitter,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [imageObject.url],
    },
  };
}
