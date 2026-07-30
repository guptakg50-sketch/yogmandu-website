import type { Metadata } from "next";
import { getSharePage } from "@/lib/pageContent";

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
  if (!share) return base;

  const title = share.title?.trim();
  const description = share.description?.trim();
  const image = share.image?.trim();

  return {
    ...base,
    ...(description ? { description } : {}),
    openGraph: {
      ...base.openGraph,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      ...base.twitter,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
  };
}
