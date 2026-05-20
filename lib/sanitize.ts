// Strip HTML tags and dangerous characters from strings
function sanitizeString(value: string, maxLength = 500): string {
  return value
    .replace(/[<>]/g, "")              // strip angle brackets (breaks HTML injection)
    .replace(/javascript:/gi, "")      // strip javascript: protocol
    .replace(/on\w+\s*=/gi, "")        // strip inline event handlers
    .replace(/\0/g, "")               // strip null bytes
    .trim()
    .slice(0, maxLength);
}

function sanitizeUrl(value: string): string {
  const trimmed = value.trim().slice(0, 2048);
  // Only allow http, https, tel, mailto, and relative URLs
  if (trimmed && !/^(https?:\/\/|tel:|mailto:|\/|#)/.test(trimmed)) return "";
  return sanitizeString(trimmed, 2048);
}

// Recursively sanitize any object/array/string value
export function sanitizeDeep(value: unknown, depth = 0): unknown {
  if (depth > 10) return null; // prevent deep recursion attacks

  if (typeof value === "string") return sanitizeString(value);
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "boolean") return value;
  if (value === null || value === undefined) return value;

  if (Array.isArray(value)) {
    return value.slice(0, 200).map(item => sanitizeDeep(item, depth + 1));
  }

  if (typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const cleanKey = sanitizeString(k, 100);
      if (cleanKey) result[cleanKey] = sanitizeDeep(v, depth + 1);
    }
    return result;
  }

  return null;
}

// Specifically sanitize nav/footer links where href must be a URL
export function sanitizeNavLinks(links: unknown): Array<{ label: string; href: string }> {
  if (!Array.isArray(links)) return [];
  return links
    .slice(0, 50)
    .filter(item => item && typeof item === "object")
    .map(item => {
      const obj = item as Record<string, unknown>;
      return {
        label: sanitizeString(String(obj.label ?? ""), 80),
        href: sanitizeUrl(String(obj.href ?? "")),
      };
    })
    .filter(link => link.label && link.href);
}
