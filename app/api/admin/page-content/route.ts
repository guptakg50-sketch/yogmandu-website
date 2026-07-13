import { listContent, writeContent, resetContent, isKnownContentKey } from "@/lib/pageContent";
import { requireAdminSession } from "@/lib/adminAuth";
import { sanitizeDeep } from "@/lib/sanitize";
import { isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// All editable page-content documents (merged with code defaults) for the
// admin "Page Content" editor. Admin-only: defaults include full page copy,
// and there is no public consumer — pages read via lib/pageContent directly.
export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;
  const items = await listContent();
  return Response.json({ items, configured: isSupabaseConfigured });
}

async function parseBody(request: Request): Promise<{ key?: string; data?: unknown } | null> {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 131072) return null; // 128 KB — largest doc (hub tiers) is a few KB
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return null;
  return body as { key?: string; data?: unknown };
}

// Save one document's override row.
export async function PUT(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const body = await parseBody(request);
  if (!body) return Response.json({ error: "Invalid or oversized JSON" }, { status: 400 });

  const { key, data } = body;
  if (typeof key !== "string" || !isKnownContentKey(key)) {
    return Response.json({ error: "Unknown content key." }, { status: 400 });
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return Response.json({ error: "Content must be an object." }, { status: 400 });
  }

  const sanitized = sanitizeDeep(data) as object;
  const ok = await writeContent(key, sanitized);
  if (!ok) return Response.json({ error: "Failed to save to Supabase." }, { status: 500 });
  return Response.json({ ok: true });
}

// Reset one document to its code default (removes the override row).
export async function DELETE(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const body = await parseBody(request);
  const key = body?.key;
  if (typeof key !== "string" || !isKnownContentKey(key)) {
    return Response.json({ error: "Unknown content key." }, { status: 400 });
  }

  const ok = await resetContent(key);
  if (!ok) return Response.json({ error: "Failed to reset." }, { status: 500 });
  return Response.json({ ok: true });
}
