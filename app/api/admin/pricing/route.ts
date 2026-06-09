import { requireAdminSession } from "@/lib/adminAuth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import { sanitizeDeep } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

const DEFAULTS = {
  soundCert: {
    level1: { price: "", note: "" },
    level2: { price: "", note: "" },
  },
};

export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) return Response.json({ data: DEFAULTS, configured: false });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("yogmandu_pricing")
    .select("data")
    .eq("id", "singleton")
    .maybeSingle();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data: { ...DEFAULTS, ...(data?.data ?? {}) }, configured: true });
}

export async function PUT(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 32768) {
    return Response.json({ error: "Request too large." }, { status: 413 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const clean = sanitizeDeep(body) as Record<string, unknown>;
  const supabase = getSupabaseAdmin();

  const row = {
    id: "singleton",
    data: clean,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("yogmandu_pricing").upsert(row, { onConflict: "id" });
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ data: clean });
}
