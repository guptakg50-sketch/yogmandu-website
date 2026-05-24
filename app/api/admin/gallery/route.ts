import { requireAdminSession } from "@/lib/adminAuth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) return Response.json({ data: [], configured: false });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("yogmandu_gallery_items")
    .select("data")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data: data.map((row) => row.data), configured: true });
}

export async function PUT(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const items = await request.json();
  if (!Array.isArray(items)) {
    return Response.json({ error: "Expected an array of gallery items." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const rows = items.map((item, index) => ({
    id:            item.id,
    url:           item.url,
    path:          item.path || "",
    title:         item.title || "",
    category:      item.category || "Yoga",
    display_order: typeof item.displayOrder === "number" ? item.displayOrder : index,
    data:          { ...item, displayOrder: typeof item.displayOrder === "number" ? item.displayOrder : index },
    updated_at:    new Date().toISOString(),
  }));

  const { error } = rows.length
    ? await supabase.from("yogmandu_gallery_items").upsert(rows, { onConflict: "id" })
    : { error: null };
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const ids = rows.map((row) => row.id);
  const deleteQuery = supabase.from("yogmandu_gallery_items").delete();
  const { error: deleteError } = ids.length
    ? await deleteQuery.not("id", "in", `(${ids.map((id) => JSON.stringify(id)).join(",")})`)
    : await deleteQuery.neq("id", "");

  if (deleteError) return Response.json({ error: deleteError.message }, { status: 500 });

  return Response.json({ data: items });
}
