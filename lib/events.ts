import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

/**
 * Events — dated occurrences (a workshop, a hike, a 7-week bootcamp).
 *
 * Distinct from service pages, which describe what Yogmandu offers
 * permanently. An event that runs a service on a specific date links to that
 * service page rather than duplicating its copy, so the two never compete for
 * the same search terms.
 *
 * Stored in `yogmandu_events` with the same shape as `yogmandu_blogs`: real
 * columns for the fields we filter and sort on, plus a `data` jsonb column
 * holding the whole record.
 */

export type EventStatus = "Draft" | "Published" | "Cancelled";
export type BookingMode = "website" | "whatsapp" | "none";

export interface YogmanduEvent {
  id: string;
  slug: string;
  title: string;
  /** Short line for cards and the meta description. */
  summary: string;
  /** Markdown, rendered with the same renderer as blog posts. */
  body: string;
  status: EventStatus;

  /** YYYY-MM-DD. Required. */
  startDate: string;
  /** YYYY-MM-DD. Optional — set for multi-day and multi-week programmes. */
  endDate?: string;
  /** "18:00" in Nepal time, or empty when the time is not fixed. */
  startTime?: string;
  endTime?: string;

  /** Blank means the studio; see STUDIO_LOCATION. */
  locationName?: string;
  locationAddress?: string;

  /** Both optional — an event with neither is shown as Free. */
  priceNpr?: string;
  priceUsd?: string;

  /** Free text, e.g. "Limited to 20 places". */
  spots?: string;

  featuredImage?: string;
  gallery?: { url: string; caption?: string }[];

  bookingMode?: BookingMode;
  /** Shown on the page when the event is Cancelled or moved. */
  statusNote?: string;

  /** Optional link to the permanent service page this event runs. */
  relatedService?: string;
}

/** Default location — every event happens here unless told otherwise. */
export const STUDIO_LOCATION = {
  name: "Yogmandu",
  street: "Miteri Marg, Mid-Baneshwor-31",
  city: "Kathmandu",
  country: "NP",
} as const;

/** Nepal Standard Time is UTC+05:45 — an offset naive date maths gets wrong. */
export const NEPAL_TZ = "Asia/Kathmandu";

/** Today's date in Kathmandu as YYYY-MM-DD, so "past" means past *there*. */
export function todayInNepal(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: NEPAL_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** An event is past once its last day has gone by in Nepal. */
export function isPastEvent(event: YogmanduEvent, today = todayInNepal()): boolean {
  const last = event.endDate || event.startDate;
  return Boolean(last) && last < today;
}

/** Upcoming soonest-first; past most-recent-first. */
export function splitEvents(events: YogmanduEvent[], today = todayInNepal()) {
  const upcoming: YogmanduEvent[] = [];
  const past: YogmanduEvent[] = [];
  for (const e of events) (isPastEvent(e, today) ? past : upcoming).push(e);
  upcoming.sort((a, b) => a.startDate.localeCompare(b.startDate));
  past.sort((a, b) => (b.endDate || b.startDate).localeCompare(a.endDate || a.startDate));
  return { upcoming, past };
}

/** "12 September 2026", or "12–18 September 2026" for a range. */
export function formatEventDate(event: YogmanduEvent): string {
  const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) => {
    const [y, m, d] = iso.split("-").map(Number);
    if (!y || !m || !d) return iso;
    return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...opts }).format(Date.UTC(y, m - 1, d));
  };
  const full: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  if (!event.endDate || event.endDate === event.startDate) return fmt(event.startDate, full);

  const [sy, sm] = event.startDate.split("-");
  const [ey, em] = event.endDate.split("-");
  // Same month and year: "12–18 September 2026". Otherwise spell both out.
  if (sy === ey && sm === em) {
    return `${fmt(event.startDate, { day: "numeric" })}–${fmt(event.endDate, full)}`;
  }
  return `${fmt(event.startDate, sy === ey ? { day: "numeric", month: "long" } : full)} – ${fmt(event.endDate, full)}`;
}

/** "6:00 PM–7:30 PM NPT", or "" when no time is set. */
export function formatEventTime(event: YogmanduEvent): string {
  const to12 = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    if (Number.isNaN(h)) return hhmm;
    const suffix = h >= 12 ? "PM" : "AM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${String(m ?? 0).padStart(2, "0")} ${suffix}`;
  };
  if (!event.startTime) return "";
  const range = event.endTime ? `${to12(event.startTime)}–${to12(event.endTime)}` : to12(event.startTime);
  return `${range} NPT`;
}

/** Display price, or "Free" when neither currency is set. */
export function formatEventPrice(event: YogmanduEvent): string {
  const parts = [
    event.priceNpr ? `NPR ${event.priceNpr}` : "",
    event.priceUsd ? `USD ${event.priceUsd}` : "",
  ].filter(Boolean);
  return parts.length ? parts.join(" / ") : "Free";
}

// ── Data access ───────────────────────────────────────────────────────────────
// Every reader returns null on failure rather than throwing, so a missing
// table or an unreachable database degrades to "no events" instead of a 500.

export async function getPublishedEvents(): Promise<YogmanduEvent[] | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("yogmandu_events")
      .select("data")
      .in("status", ["Published", "Cancelled"])
      .order("start_date", { ascending: true });
    if (error) return null;
    return (data ?? []).map((row) => row.data as YogmanduEvent);
  } catch {
    return null;
  }
}

export async function getEventBySlug(slug: string): Promise<YogmanduEvent | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("yogmandu_events")
      .select("data")
      .eq("slug", slug)
      .in("status", ["Published", "Cancelled"])
      .single();
    if (error) return null;
    return (data?.data as YogmanduEvent) ?? null;
  } catch {
    return null;
  }
}
