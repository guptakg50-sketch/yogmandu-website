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

// sharp is a native (libvips) module. It works under Node (local dev, cPanel),
// but it CANNOT load in the Cloudflare Workers runtime — importing it there
// throws. So we load it lazily and cache the result; if it's unavailable we
// simply skip optimization and store the original bytes. This keeps uploads
// working on Workers instead of returning a 500 (which used to make the admin
// fall back to an oversized base64 data URL and hit the request-size limit).
type SharpModule = typeof import("sharp");
let sharpPromise: Promise<SharpModule | null> | null = null;

function loadSharp(): Promise<SharpModule | null> {
  if (!sharpPromise) {
    sharpPromise = import("sharp")
      .then((m) => (m.default ?? m) as SharpModule)
      .catch(() => null);
  }
  return sharpPromise;
}

/**
 * Compress an uploaded image to a web-optimized WebP using sharp when it's
 * available: auto-rotated to its EXIF orientation, downscaled to fit
 * `maxDimension`, metadata stripped.
 *
 * SVG and (animated) GIF are passed through untouched. If sharp is unavailable
 * (e.g. the Cloudflare Workers runtime) or can't decode the input, the original
 * bytes are returned so an upload never fails just because optimization didn't
 * apply.
 */
export async function optimizeImage(
  input: Buffer,
  declaredType: string,
  fallbackExt: string,
  { maxDimension = 2000, quality = 80 }: Options = {},
): Promise<OptimizedImage> {
  const type = (declaredType || "").toLowerCase();

  const passthrough = (): OptimizedImage => ({
    buffer: input,
    contentType: declaredType || "application/octet-stream",
    extension: (fallbackExt || "bin").toLowerCase(),
  });

  if (type === "image/svg+xml") {
    return { buffer: input, contentType: "image/svg+xml", extension: "svg" };
  }
  if (type === "image/gif") {
    return { buffer: input, contentType: "image/gif", extension: "gif" };
  }

  const sharp = await loadSharp();
  if (!sharp) return passthrough();

  try {
    const buffer = await sharp(input, { failOn: "none" })
      .rotate()
      .resize({ width: maxDimension, height: maxDimension, fit: "inside", withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    return { buffer, contentType: "image/webp", extension: "webp" };
  } catch {
    return passthrough();
  }
}
