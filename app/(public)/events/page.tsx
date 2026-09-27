import type { Metadata } from "next";
import Link from "next/link";
import { withShareText } from "@/lib/seo";
import { getSectionContent } from "@/lib/pageContent";
import { getPublishedEvents, splitEvents, formatEventDate, formatEventTime, formatEventPrice, type YogmanduEvent } from "@/lib/events";

export const revalidate = 300;

const pageMetadata: Metadata = {
  title: { absolute: "Yoga Events & Workshops in Kathmandu | Yogmandu" },
  description:
    "Upcoming yoga workshops, sound healing evenings, meditation courses and retreats at Yogmandu in Kathmandu, Nepal. Book a place or message us on WhatsApp.",
  keywords: [
    "yoga events Kathmandu", "yoga workshops Nepal", "meditation course Kathmandu",
    "sound healing event Nepal", "yoga retreat events Nepal",
  ],
  alternates: { canonical: "https://yogmandu.com/events" },
  openGraph: {
    title: "Yoga Events & Workshops in Kathmandu | Yogmandu",
    description: "Upcoming workshops, sound healing evenings, meditation courses and retreats at Yogmandu, Kathmandu.",
    url: "https://yogmandu.com/events",
    images: ["/opengraph-image.png"],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return withShareText("/events", pageMetadata);
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "Events", item: "https://yogmandu.com/events" },
  ],
};

function EventCard({ event, past = false }: { event: YogmanduEvent; past?: boolean }) {
  const time = formatEventTime(event);
  return (
    <Link href={`/events/${event.slug}`}
      className="group block overflow-hidden rounded-2xl transition-shadow hover:shadow-lg"
      style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(42,18,8,0.08)", opacity: past ? 0.78 : 1 }}>
      {event.featuredImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={event.featuredImage} alt={event.title} loading="lazy"
          className="h-48 w-full object-cover" style={{ display: "block" }} />
      )}
      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="text-xs tracking-[0.18em] uppercase font-light" style={{ color: "#6B2D8B" }}>
            {formatEventDate(event)}
          </span>
          {event.status === "Cancelled" && (
            <span className="rounded-full px-2 py-0.5 text-xs font-medium text-white" style={{ background: "#B4342A" }}>
              Cancelled
            </span>
          )}
        </div>
        <p className="mb-2 text-xl font-light leading-snug group-hover:opacity-70 transition-opacity"
          style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
          {event.title}
        </p>
        {event.summary && (
          <p className="mb-4 text-sm font-light leading-relaxed" style={{ color: "rgba(42,18,8,0.6)" }}>
            {event.summary}
          </p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-light" style={{ color: "rgba(42,18,8,0.45)" }}>
          {time && <span>{time}</span>}
          <span>{formatEventPrice(event)}</span>
          {event.spots && <span>{event.spots}</span>}
        </div>
      </div>
    </Link>
  );
}

export default async function EventsPage() {
  const [all, copy] = await Promise.all([
    getPublishedEvents().then((e) => e ?? []),
    getSectionContent("EVENTS_PAGE"),
  ]);
  const { upcoming, past } = splitEvents(all);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="pt-36 pb-12 px-6" style={{ background: "#FAF6F0" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase mb-5 font-light" style={{ color: "rgba(42,18,8,0.35)" }}>
            {copy.eyebrow}
          </p>
          <h1 className="text-4xl md:text-6xl font-light leading-[1.1] mb-6"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            {copy.headingA} <em style={{ color: "#F7941D" }}>{copy.headingEm}</em>
          </h1>
          <p className="max-w-2xl text-base font-light leading-relaxed" style={{ color: "rgba(42,18,8,0.6)" }}>
{copy.intro}
          </p>
        </div>
      </section>

      <section className="px-6 pb-16" style={{ background: "#FAF6F0" }}>
        <div className="max-w-5xl mx-auto">
          {upcoming.length > 0 ? (
            <>
              <p className="text-xs tracking-[0.25em] uppercase mb-6 font-light" style={{ color: "rgba(42,18,8,0.35)" }}>
                {copy.upcomingLabel}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((event) => <EventCard key={event.slug} event={event} />)}
              </div>
            </>
          ) : (
            <div className="rounded-2xl p-10 text-center"
              style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(42,18,8,0.08)" }}>
              <p className="mb-6 text-base font-light" style={{ color: "rgba(42,18,8,0.6)" }}>
{copy.emptyBody}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/class-schedule" className="inline-block rounded-full px-6 py-2.5 text-sm font-medium text-white" style={{ background: "#6B2D8B" }}>
                  See class schedule
                </Link>
                <a href="https://wa.me/9779810263277" target="_blank" rel="noopener noreferrer"
                  className="inline-block rounded-full px-6 py-2.5 text-sm font-medium"
                  style={{ border: "1px solid rgba(42,18,8,0.2)", color: "#2A1208" }}>
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="px-6 pb-28" style={{ background: "#FAF6F0" }}>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs tracking-[0.25em] uppercase mb-6 font-light" style={{ color: "rgba(42,18,8,0.35)" }}>
              {copy.pastLabel}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => <EventCard key={event.slug} event={event} past />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
