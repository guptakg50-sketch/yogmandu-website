import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// Public pricing config read by on-site components (e.g. Sound Healing cert cards).
// Degrades gracefully to an empty object if the table/row is missing.
export async function GET() {
  if (!isSupabaseConfigured) return Response.json({ data: {} });

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("yogmandu_pricing")
      .select("data")
      .eq("id", "singleton")
      .maybeSingle();

    if (error || !data) return Response.json({ data: {} });
    return Response.json({ data: data.data ?? {} });
  } catch {
    return Response.json({ data: {} });
  }
}
