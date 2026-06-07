import { requireAdminSession } from "@/lib/adminAuth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import { sanitizeDeep } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

const DEFAULTS = {
  enabled:  false,
  imageUrl: "",
  imageAlt: "",
  linkUrl:  "",
  startAt:  null as string | null,
  endAt:    null as string | null,
  version:  1,
};

export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) return Response.json({ data: DEFAULTS, configured: false });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("yogmandu_popup")
    .select("enabled, image_url, image_alt, link_url, start_at, end_at, version")
    .eq("id", "singleton")
    .maybeSingle();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  if (!data) return Response.json({ data: DEFAULTS, configured: true });

  return Response.json({
    data: {
      enabled:  Boolean(data.enabled),
      imageUrl: data.image_url || "",
      imageAlt: data.image_alt || "",
      linkUrl:  data.link_url || "",
      startAt:  data.start_at || null,
      endAt:    data.end_at || null,
      version:  data.version ?? 1,
    },
    configured: true,
  });
}

export async function PUT(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 16384) {
    return Response.json({ error: "Request too large." }, { status: 413 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const clean = sanitizeDeep(body) as Record<string, unknown>;
  const toIso = (v: unknown) => {
    const t = Date.parse(String(v ?? ""));
    return Number.isNaN(t) ? null : new Date(t).toISOString();
  };

  const supabase = getSupabaseAdmin();

  // Bump version on every save so dismissed visitors see the new campaign once.
  const { data: existing } = await supabase
    .from("yogmandu_popup")
    .select("version")
    .eq("id", "singleton")
    .maybeSingle();
  const nextVersion = (existing?.version ?? 0) + 1;

  const row = {
    id:         "singleton",
    enabled:    Boolean(clean.enabled),
    image_url:  String(clean.imageUrl ?? "").slice(0, 2000),
    image_alt:  String(clean.imageAlt ?? "").slice(0, 300),
    link_url:   String(clean.linkUrl ?? "").slice(0, 2000),
    start_at:   toIso(clean.startAt),
    end_at:     toIso(clean.endAt),
    version:    nextVersion,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("yogmandu_popup").upsert(row, { onConflict: "id" });
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ data: { ...row, version: nextVersion } });
}
