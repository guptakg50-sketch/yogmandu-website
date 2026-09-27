import { requireAdminSession } from "@/lib/adminAuth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

/**
 * Events admin API — per-row add/edit/delete.
 *
 * Deliberately NOT the full-replace PUT the blogs route still uses: that
 * pattern rewrites every row on each save and deletes anything missing from
 * the payload, so one stale browser tab can wipe rows it never knew about.
 * The instructors route was moved off it in July for that reason.
 */

/** Shape one admin event into a table row: queryable columns + the full blob. */
function shapeRow(event: Record<string, unknown>) {
  return {
    id:         String(event.id ?? ""),
    slug:       String(event.slug ?? ""),
    status:     String(event.status ?? "Draft"),
    start_date: (event.startDate as string) || null,
    end_date:   (event.endDate as string) || null,
    data:       event,
    updated_at: new Date().toISOString(),
  };
}

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

export async function GET() {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) return Response.json({ data: [], configured: false });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("yogmandu_events")
    .select("data")
    .order("start_date", { ascending: false });

  // A missing table is the expected state until 014_events.sql has been run —
  // report it as "not configured" rather than a 500 so the admin screen can
  // show a helpful message instead of an error.
  if (error) {
    const missingTable = /relation .* does not exist|schema cache/i.test(error.message);
    if (missingTable) return Response.json({ data: [], configured: false, needsMigration: true });
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ data: (data ?? []).map((row) => row.data), configured: true });
}

/** Create or update a single event. */
export async function POST(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) return Response.json({ error: "Supabase is not configured." }, { status: 503 });

  const event = await request.json().catch(() => null);
  if (!event || typeof event !== "object" || Array.isArray(event)) return badRequest("Expected a single event object.");
  if (!event.id) return badRequest("Event is missing an id.");
  if (!event.slug) return badRequest("Event needs a slug.");
  if (!event.title) return badRequest("Event needs a title.");
  if (!event.startDate) return badRequest("Event needs a start date.");
  if (event.endDate && event.endDate < event.startDate) return badRequest("End date cannot be before the start date.");
  if (!["Draft", "Published", "Cancelled"].includes(event.status ?? "Draft")) return badRequest("Unknown status.");

  const supabase = getSupabaseAdmin();

  // Slugs are the public URL and must be unique — reject a clash against a
  // *different* event rather than letting the database throw a raw constraint
  // error at the user.
  const { data: clash } = await supabase
    .from("yogmandu_events").select("id").eq("slug", event.slug).maybeSingle();
  if (clash && clash.id !== event.id) {
    return badRequest(`Another event already uses the slug "${event.slug}".`);
  }

  const { error } = await supabase
    .from("yogmandu_events")
    .upsert(shapeRow(event), { onConflict: "id" });
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ data: event });
}

/** Delete a single event by id. */
export async function DELETE(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) return Response.json({ error: "Supabase is not configured." }, { status: 503 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return badRequest("Missing event id.");

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("yogmandu_events").delete().eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ ok: true });
}
