import { readSiteConfig, writeSiteConfig } from "@/lib/siteConfigStore";
import { requireAdminSession } from "@/lib/adminAuth";
import { sanitizeDeep } from "@/lib/sanitize";
import { isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// Public GET only exposes the nav/footer shape needed by the frontend — never internal config
export async function GET() {
  const config = await readSiteConfig();
  const { nav, footer } = config as Record<string, unknown>;
  return Response.json({ nav, footer });
}

export async function PUT(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;

  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  // Enforce request size limit (64 KB)
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 65536) {
    return Response.json({ error: "Request too large." }, { status: 413 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Sanitize all values before writing to the database
  const sanitized = sanitizeDeep(body) as Record<string, unknown>;

  const ok = await writeSiteConfig(sanitized);
  if (!ok) return Response.json({ error: "Failed to save config to Supabase." }, { status: 500 });

  return Response.json({ ok: true });
}
