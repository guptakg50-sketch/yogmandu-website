import Link from "next/link";
import { getSectionContent } from "@/lib/pageContent";
import { getPublishedEvents, splitEvents, formatEventDate, formatEventTime } from "@/lib/events";

/**
 * Homepage strip of the next few events.
 *
 * Renders nothing at all when there is nothing upcoming — an empty "Events"
 * band on the homepage looks worse than no band, and a stale one is worse
 * still. Also returns null if the database is unreachable, so the homepage
 * can never fail because of this section.
 */
export default async function UpcomingEvents({ limit = 3 }: { limit?: number }) {
  const [all, copy] = await Promise.all([
    getPublishedEvents().catch(() => null),
    getSectionContent("EVENTS_PAGE"),
  ]);
  if (!all || all.length === 0) return null;

  const { upcoming } = splitEvents(all);
  const events = upcoming.filter((e) => e.status !== "Cancelled").slice(0, limit);
  if (events.length === 0) return null;

  return (
    <section className="px-6 py-20" style={{ background: "#FAF6F0" }}>
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs tracking-[0.25em] uppercase font-light" style={{ color: "rgba(42,18,8,0.35)" }}>
              {copy.homeEyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-light leading-tight"
              style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
              {copy.homeHeadingA} <em style={{ color: "#F7941D" }}>{copy.homeHeadingEm}</em>
            </h2>
          </div>
          <Link href="/events" className="text-sm font-light underline" style={{ color: "#6B2D8B" }}>
            {copy.homeLinkLabel}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => {
            const time = formatEventTime(event);
            return (
              <Link key={event.slug} href={`/events/${event.slug}`}
                className="group block overflow-hidden rounded-2xl transition-shadow hover:shadow-lg"
                style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(42,18,8,0.08)" }}>
                {event.featuredImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={event.featuredImage} alt={event.title} loading="lazy"
                    className="h-40 w-full object-cover" style={{ display: "block" }} />
                )}
                <div className="p-5">
                  <p className="mb-2 text-xs tracking-[0.18em] uppercase font-light" style={{ color: "#6B2D8B" }}>
                    {formatEventDate(event)}
                  </p>
                  <p className="mb-1 text-lg font-light leading-snug transition-opacity group-hover:opacity-70"
                    style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
                    {event.title}
                  </p>
                  {time && <p className="text-xs font-light" style={{ color: "rgba(42,18,8,0.45)" }}>{time}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
