import { requireAdminSession } from "@/lib/adminAuth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// Shape one admin instructor object into a table row. Writes both the queryable
// top-level columns and the `data` JSON blob (the display source) so they stay
// consistent — mirrors how the public site reads `row.data`.
function shapeRow(item: Record<string, unknown>, displayOrder: number) {
  return {
    id:             item.id,
    name:           (item.name as string) || "",
    photo:          (item.photo as string) || "",
    bio:            (item.bio as string) || "",
    specialties:    Array.isArray(item.specialties) ? item.specialties : [],
    certifications: (item.certifications as string) || "",
    years:          typeof item.years === "number" ? item.years : 0,
    status:         (item.status as string) || "Active",
    display_order:  displayOrder,
    data:           { ...item, displayOrder },
    updated_at:     new Date().toISOString(),
  };
}

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

// Upsert a SINGLE instructor by id. Scoped to one row — adding or editing a
// teacher can never delete or overwrite any other row. (Replaces the previous
// full-replace PUT, which deleted every row not in the submitted list.)
export async function POST(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const item = await request.json();
  if (!item || typeof item !== "object" || Array.isArray(item) || !item.id) {
    return Response.json({ error: "Expected a single instructor object with an id." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // Explicit displayOrder wins; otherwise append a brand-new teacher after the
  // current maximum so they land at the end rather than jumping to the top.
  let displayOrder: number;
  if (typeof item.displayOrder === "number") {
    displayOrder = item.displayOrder;
  } else {
    const { data: last } = await supabase
      .from("yogmandu_instructors")
      .select("display_order")
      .order("display_order", { ascending: false })
      .limit(1)
      .maybeSingle();
    displayOrder = (last?.display_order ?? -1) + 1;
  }

  const row = shapeRow(item, displayOrder);
  const { error } = await supabase
    .from("yogmandu_instructors")
    .upsert(row, { onConflict: "id" });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data: row.data });
}

// Permanently delete a SINGLE instructor by id (?id=...). Scoped to one row.
export async function DELETE(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return Response.json({ error: "Missing instructor id." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("yogmandu_instructors").delete().eq("id", id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, id });
}
