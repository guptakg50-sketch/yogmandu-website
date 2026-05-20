import { readSiteConfig, writeSiteConfig } from "@/lib/siteConfigStore";
import { requireAdminSession } from "@/lib/adminAuth";
import { sanitizeDeep } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

// Public GET only exposes the nav/footer shape needed by the frontend — never internal config
export async function GET() {
  const config = readSiteConfig();
  const { nav, footer } = config as Record<string, unknown>;
  return Response.json({ nav, footer });
}

export async function PUT(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;

  // Enforce request size limit (64 KB)
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 65536) {
    return Response.json({ error: "Request too large." }, { status: 413 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Sanitize all values before writing to disk
  const sanitized = sanitizeDeep(body) as Record<string, unknown>;

  const ok = writeSiteConfig(sanitized);
  if (!ok) return Response.json({ error: "Failed to write config" }, { status: 500 });

  return Response.json({ ok: true });
}
