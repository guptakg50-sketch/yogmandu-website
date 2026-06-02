import sharp from "sharp";

export interface OptimizedImage {
  /** The bytes to upload (WebP-compressed, or the original if untouched). */
  buffer: Buffer;
  /** MIME type to store the object as. */
  contentType: string;
  /** File extension (no dot) to use in the storage path. */
  extension: string;
}

interface Options {
  /** Longest-side cap in px. Bigger images are scaled down (never up). */
  maxDimension?: number;
  /** WebP quality, 1–100. */
  quality?: number;
}

/**
 * Compress an uploaded image to a web-optimized WebP using sharp:
 * auto-rotated to its EXIF orientation, downscaled to fit `maxDimension`,
 * metadata stripped. This is how we keep Supabase storage usage low and the
 * site fast no matter how large the source photo is.
 *
 * SVG and (animated) GIF are passed through untouched — converting them to a
 * static WebP would lose their vector/animation behavior. If sharp can't
 * decode the input for any reason, the original bytes are returned so an
 * upload never fails just because optimization didn't apply.
 */
export async function optimizeImage(
  input: Buffer,
  declaredType: string,
  fallbackExt: string,
  { maxDimension = 2000, quality = 80 }: Options = {},
): Promise<OptimizedImage> {
  const type = (declaredType || "").toLowerCase();
  if (type === "image/svg+xml") {
    return { buffer: input, contentType: "image/svg+xml", extension: "svg" };
  }
  if (type === "image/gif") {
    return { buffer: input, contentType: "image/gif", extension: "gif" };
  }

  try {
    const buffer = await sharp(input, { failOn: "none" })
      .rotate()
      .resize({ width: maxDimension, height: maxDimension, fit: "inside", withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    return { buffer, contentType: "image/webp", extension: "webp" };
  } catch {
    return {
      buffer: input,
      contentType: declaredType || "application/octet-stream",
      extension: (fallbackExt || "bin").toLowerCase(),
    };
  }
}
