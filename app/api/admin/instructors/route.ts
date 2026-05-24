import { requireAdminSession } from "@/lib/adminAuth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) return Response.json({ data: [], configured: false });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("yogmandu_instructors")
    .select("data")
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data: data.map((row) => row.data), configured: true });
}

export async function PUT(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const instructors = await request.json();
  if (!Array.isArray(instructors)) {
    return Response.json({ error: "Expected an array of instructors." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const rows = instructors.map((item, index) => ({
    id:             item.id,
    name:           item.name || "",
    photo:          item.photo || "",
    bio:            item.bio || "",
    specialties:    Array.isArray(item.specialties) ? item.specialties : [],
    certifications: item.certifications || "",
    years:          typeof item.years === "number" ? item.years : 0,
    status:         item.status || "Active",
    display_order:  typeof item.displayOrder === "number" ? item.displayOrder : index,
    data:           { ...item, displayOrder: typeof item.displayOrder === "number" ? item.displayOrder : index },
    updated_at:     new Date().toISOString(),
  }));

  const { error } = rows.length
    ? await supabase.from("yogmandu_instructors").upsert(rows, { onConflict: "id" })
    : { error: null };
  if (error) return Response.json({ error: error.message }, { status: 500 });

  const ids = rows.map((row) => row.id);
  const deleteQuery = supabase.from("yogmandu_instructors").delete();
  const { error: deleteError } = ids.length
    ? await deleteQuery.not("id", "in", `(${ids.map((id) => JSON.stringify(id)).join(",")})`)
    : await deleteQuery.neq("id", "");

  if (deleteError) return Response.json({ error: deleteError.message }, { status: 500 });

  return Response.json({ data: instructors });
}
