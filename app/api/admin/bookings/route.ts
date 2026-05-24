import { requireAdminSession } from "@/lib/adminAuth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) return Response.json({ data: [], configured: false });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("yogmandu_bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ data: data ?? [], configured: true });
}

export async function PATCH(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured)
    return Response.json({ error: "Supabase not configured." }, { status: 503 });

  const body = await request.json().catch(() => null);
  if (!body?.id || !body?.status)
    return Response.json({ error: "id and status required." }, { status: 400 });

  const allowed = ["pending", "confirmed", "cancelled"];
  if (!allowed.includes(body.status))
    return Response.json({ error: "Invalid status." }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("yogmandu_bookings")
    .update({ status: body.status })
    .eq("id", body.id);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured)
    return Response.json({ error: "Supabase not configured." }, { status: 503 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "id required." }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("yogmandu_bookings").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
