import { requireAdminSession } from "@/lib/adminAuth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) return Response.json({ data: [], configured: false });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("yogmandu_services")
    .select("data")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data: data.map((row) => row.data), configured: true });
}

export async function PUT(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const services = await request.json().catch(() => null);
  if (!Array.isArray(services)) {
    return Response.json({ error: "Expected an array of services." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const rows = services.map((item, index) => {
    const displayOrder = typeof item.displayOrder === "number" ? item.displayOrder : index;
    const normalized = {
      id:           String(item.id || `svc-${Date.now()}-${index}`),
      label:        String(item.label || "").slice(0, 160),
      href:         String(item.href || "").slice(0, 500),
      status:       item.status === "Hidden" ? "Hidden" : "Active",
      displayOrder,
    };
    return {
      id:            normalized.id,
      label:         normalized.label,
      href:          normalized.href,
      status:        normalized.status,
      display_order: displayOrder,
      data:          normalized,
      updated_at:    new Date().toISOString(),
    };
  });

  const { error } = rows.length
    ? await supabase.from("yogmandu_services").upsert(rows, { onConflict: "id" })
    : { error: null };
  if (error) return Response.json({ error: error.message }, { status: 500 });

  // Drop rows the admin removed.
  const ids = rows.map((row) => row.id);
  const deleteQuery = supabase.from("yogmandu_services").delete();
  const { error: deleteError } = ids.length
    ? await deleteQuery.not("id", "in", `(${ids.map((id) => JSON.stringify(id)).join(",")})`)
    : await deleteQuery.neq("id", "");

  if (deleteError) return Response.json({ error: deleteError.message }, { status: 500 });

  return Response.json({ data: rows.map((row) => row.data) });
}
