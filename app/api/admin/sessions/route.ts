import { requireAdminSession } from "@/lib/adminAuth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) return Response.json({ data: [], configured: false });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("yogmandu_sessions")
    .select("data")
    .order("display_order", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data: data.map((row) => row.data), configured: true });
}

export async function PUT(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const sessions = await request.json();
  if (!Array.isArray(sessions)) {
    return Response.json({ error: "Expected an array of sessions." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const rows = sessions.map((session) => ({
    id: session.id,
    slug: session.slug || session.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    name: session.name,
    type: session.type,
    status: session.status,
    display_order: session.priority || 100,
    data: session,
    updated_at: new Date().toISOString(),
  }));

  const { error } = rows.length
    ? await supabase.from("yogmandu_sessions").upsert(rows, { onConflict: "id" })
    : { error: null };
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const ids = rows.map((row) => row.id);
  const deleteQuery = supabase.from("yogmandu_sessions").delete();
  const { error: deleteError } = ids.length
    ? await deleteQuery.not("id", "in", `(${ids.map((id) => JSON.stringify(id)).join(",")})`)
    : await deleteQuery.neq("id", "");

  if (deleteError) return Response.json({ error: deleteError.message }, { status: 500 });

  return Response.json({ data: sessions });
}
