import { requireAdminSession } from "@/lib/adminAuth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) return Response.json({ data: [], configured: false });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("yogmandu_testimonials")
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

  const testimonials = await request.json().catch(() => null);
  if (!Array.isArray(testimonials)) {
    return Response.json({ error: "Expected an array of testimonials." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const rows = testimonials.map((item, index) => {
    const stars = Math.min(5, Math.max(1, Number(item.stars) || 5));
    const displayOrder = typeof item.displayOrder === "number" ? item.displayOrder : index;
    const normalized = {
      id:           String(item.id || `rev-${Date.now()}-${index}`),
      quote:        String(item.quote || "").slice(0, 2000),
      name:         String(item.name || "").slice(0, 120),
      when:         String(item.when || "").slice(0, 60),
      stars,
      color:        String(item.color || "#F7941D").slice(0, 9),
      status:       item.status === "Hidden" ? "Hidden" : "Active",
      displayOrder,
    };
    return {
      id:            normalized.id,
      name:          normalized.name,
      stars:         normalized.stars,
      status:        normalized.status,
      display_order: displayOrder,
      data:          normalized,
      updated_at:    new Date().toISOString(),
    };
  });

  const { error } = rows.length
    ? await supabase.from("yogmandu_testimonials").upsert(rows, { onConflict: "id" })
    : { error: null };
  if (error) return Response.json({ error: error.message }, { status: 500 });

  // Drop rows the admin removed.
  const ids = rows.map((row) => row.id);
  const deleteQuery = supabase.from("yogmandu_testimonials").delete();
  const { error: deleteError } = ids.length
    ? await deleteQuery.not("id", "in", `(${ids.map((id) => JSON.stringify(id)).join(",")})`)
    : await deleteQuery.neq("id", "");

  if (deleteError) return Response.json({ error: deleteError.message }, { status: 500 });

  return Response.json({ data: rows.map((row) => row.data) });
}
