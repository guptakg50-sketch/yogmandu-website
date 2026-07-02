// Google Maps links for the studio. Built from an editable "map query" (the
// business name + address) so the pin resolves to the Yogmandu listing instead
// of a chooser. The query is admin-editable via Site Layout → Footer
// (footer.mapQuery); these helpers turn that value into the link + embed URLs.
//
// A full Google Maps URL (e.g. a "Share" link) can also be pasted — it's used
// as-is for the directions link.

export const DEFAULT_MAP_QUERY = "Yogmandu, Miteri Marg, Mid-Baneshwor, Kathmandu";

const isUrl = (v: string) => /^https?:\/\//i.test(v);

/** Directions / "open in Maps" link for the given location query (or a pasted URL). */
export function mapLinkFor(query?: string | null): string {
  const q = (query || "").trim() || DEFAULT_MAP_QUERY;
  if (isUrl(q)) return q;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

/** Embeddable iframe src for the given location query. */
export function mapEmbedFor(query?: string | null): string {
  const q = (query || "").trim() || DEFAULT_MAP_QUERY;
  if (isUrl(q)) {
    if (/[?&]output=embed/.test(q)) return q;
    // Short/place URLs can't be embedded reliably — fall back to the default
    // query so the iframe still shows the correct area.
    return `https://www.google.com/maps?q=${encodeURIComponent(DEFAULT_MAP_QUERY)}&output=embed`;
  }
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
}

// Defaults for server/SEO usage and as fallbacks.
export const MAP_LINK  = mapLinkFor();
export const MAP_EMBED = mapEmbedFor();
