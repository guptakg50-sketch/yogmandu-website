import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

// Public endpoint read by the on-site EntryPopup component.
// Returns the active campaign or { active: false }. Being force-dynamic, an
// admin "emergency disable" takes effect on the very next page load.
export async function GET() {
  if (!isSupabaseConfigured) return Response.json({ active: false });

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("yogmandu_popup")
      .select("enabled, image_url, image_alt, link_url, start_at, end_at, version")
      .eq("id", "singleton")
      .maybeSingle();

    if (error || !data) return Response.json({ active: false });
    if (!data.enabled || !data.image_url) return Response.json({ active: false });

    const now = Date.now();
    if (data.start_at && now < Date.parse(data.start_at)) return Response.json({ active: false });
    if (data.end_at && now > Date.parse(data.end_at)) return Response.json({ active: false });

    return Response.json({
      active:   true,
      version:  data.version ?? 1,
      imageUrl: data.image_url,
      imageAlt: data.image_alt || "Announcement",
      linkUrl:  data.link_url || "",
    });
  } catch {
    return Response.json({ active: false });
  }
}
