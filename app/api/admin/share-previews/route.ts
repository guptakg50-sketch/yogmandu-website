import { requireAdminSession } from "@/lib/adminAuth";
import { getSharePages, writeContent, SHARE_OVERRIDE_FIELDS } from "@/lib/pageContent";
import { SHARE_PAGES } from "@/lib/shareContent";
import { sanitizeDeep } from "@/lib/sanitize";
import { isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const CONTENT_KEY = "section:SHARE_PREVIEWS";

type StoredOverride = { path: string; title?: string; description?: string; image?: string };

/**
 * The share-preview editor.
 *
 * The admin screen used to read and write the raw override record, which meant
 * it only listed pages that happened to be in the last save, and every save
 * wrote a snapshot of all of them — freezing the whole site's share text at
 * that moment. This route shows the effective text for every page the code
 * knows about, and on save keeps only the fields that actually differ from the
 * code default. Anything the client has not personally changed stays owned by
 * the code and keeps improving with it.
 */
export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;

  const pages = await getSharePages();
  const defaults = new Map(SHARE_PAGES.map((page) => [page.path, page]));

  return Response.json({
    configured: isSupabaseConfigured,
    pages: pages.map((page) => {
      const base = defaults.get(page.path);
      return {
        ...page,
        // Lets the screen mark which text the client owns and offer a revert.
        edited: SHARE_OVERRIDE_FIELDS.filter((field) => (page[field] ?? "") !== (base?.[field] ?? "")),
      };
    }),
  });
}

export async function PUT(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 131072) return Response.json({ error: "Payload too large." }, { status: 400 });

  const body = await request.json().catch(() => null);
  const incoming = (body as { pages?: unknown } | null)?.pages;
  if (!Array.isArray(incoming)) {
    return Response.json({ error: "Expected { pages: [...] }." }, { status: 400 });
  }

  const defaults = new Map(SHARE_PAGES.map((page) => [page.path, page]));
  const overrides: StoredOverride[] = [];

  for (const raw of incoming) {
    const page = sanitizeDeep(raw) as Record<string, unknown>;
    const path = typeof page.path === "string" ? page.path : "";
    const base = defaults.get(path);
    // A path the code no longer lists has nothing left to override.
    if (!base) continue;

    const override: StoredOverride = { path };
    for (const field of SHARE_OVERRIDE_FIELDS) {
      const value = typeof page[field] === "string" ? (page[field] as string).trim() : "";
      if (value && value !== (base[field] ?? "")) override[field] = value;
    }
    // Only store a page the client has genuinely changed.
    if (Object.keys(override).length > 1) overrides.push(override);
  }

  const ok = await writeContent(CONTENT_KEY, { pages: overrides });
  if (!ok) return Response.json({ error: "Failed to save to Supabase." }, { status: 500 });

  return Response.json({ ok: true, overridden: overrides.length });
}
