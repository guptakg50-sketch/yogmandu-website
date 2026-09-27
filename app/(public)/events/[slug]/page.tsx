import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ShareButtons from "@/components/ShareButtons";
import { renderMarkdown, stripMarkdown, trimTo } from "@/lib/markdown";
import { shareImage, shareTopicForCategory } from "@/lib/seo";
import {
  getEventBySlug, getPublishedEvents, isPastEvent, splitEvents,
  formatEventDate, formatEventTime, formatEventPrice,
  STUDIO_LOCATION, type YogmanduEvent,
} from "@/lib/events";

export const revalidate = 300;
export const dynamicParams = true;

const ACCENT = "#6B2D8B";
const WHATSAPP = "https://wa.me/9779810263277";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const events = (await getPublishedEvents()) ?? [];
  return events.map((e) => ({ slug: e.slug }));
}

/** Same rules as blog posts: ~60-char title, 120–158-char description. */
function buildTitle(title: string): string {
  const brand = " | Yogmandu";
  if (title.length + brand.length <= 60) return title + brand;
  if (title.length <= 60) return title;
  return trimTo(title, 60);
}

function buildDescription(event: YogmanduEvent): string {
  const summary = stripMarkdown(event.summary ?? "");
  const dated = `${formatEventDate(event)} in Kathmandu, Nepal.`;
  if (summary.length >= 80) return trimTo(summary, 155);
  const prose = stripMarkdown(event.body ?? "");
  const base = summary ? `${summary} ${dated}` : `${dated} ${prose}`;
  return trimTo(base.trim(), 155);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};

  const topic = shareTopicForCategory(`${event.relatedService || ""} ${event.title}`);
  const previewImage = event.featuredImage || "";
  const title = buildTitle(event.title);
  const description = buildDescription(event);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `https://yogmandu.com/events/${event.slug}` },
    openGraph: {
      title,
      description,
      url: `https://yogmandu.com/events/${event.slug}`,
      siteName: "Yogmandu",
      locale: "en_US",
      type: "article",
      images: [shareImage(previewImage, event.title, topic)],
    },
    twitter: { card: "summary_large_image", title, description, images: [shareImage(previewImage, event.title, topic).url] },
  };
}

/**
 * Google's Event structured data, built from the real fields so it can never
 * disagree with the visible page. Times are Nepal time (UTC+05:45); when no
 * time is set the date alone is emitted, which schema.org permits.
 */
function buildEventSchema(event: YogmanduEvent) {
  const NPT = "+05:45";
  const startsAt = event.startTime ? `${event.startDate}T${event.startTime}:00${NPT}` : event.startDate;
  const endDate = event.endDate || event.startDate;
  const endsAt = event.endTime ? `${endDate}T${event.endTime}:00${NPT}` : endDate;

  const offers = [
    event.priceNpr ? { "@type": "Offer", priceCurrency: "NPR", price: event.priceNpr.replace(/,/g, "") } : null,
    event.priceUsd ? { "@type": "Offer", priceCurrency: "USD", price: event.priceUsd.replace(/,/g, "") } : null,
  ].filter(Boolean);
  // No price set means the event is free — say so explicitly rather than
  // omitting offers, which reads as "price unknown".
  if (offers.length === 0) offers.push({ "@type": "Offer", priceCurrency: "NPR", price: "0" });

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: stripMarkdown(event.summary || event.body || "").slice(0, 300),
    startDate: startsAt,
    endDate: endsAt,
    eventStatus: event.status === "Cancelled"
      ? "https://schema.org/EventCancelled"
      : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.locationName || STUDIO_LOCATION.name,
      address: event.locationAddress
        ? { "@type": "PostalAddress", streetAddress: event.locationAddress, addressLocality: STUDIO_LOCATION.city, addressCountry: STUDIO_LOCATION.country }
        : { "@type": "PostalAddress", streetAddress: STUDIO_LOCATION.street, addressLocality: STUDIO_LOCATION.city, addressCountry: STUDIO_LOCATION.country },
    },
    organizer: { "@type": "Organization", name: "Yogmandu", url: "https://yogmandu.com" },
    ...(event.featuredImage ? { image: [event.featuredImage] } : {}),
    offers: offers.map((o) => ({ ...o, availability: "https://schema.org/InStock", url: `https://yogmandu.com/events/${event.slug}` })),
    url: `https://yogmandu.com/events/${event.slug}`,
  };
}

export default async function EventPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [event, all] = await Promise.all([getEventBySlug(slug), getPublishedEvents()]);
  if (!event) notFound();

  const past = isPastEvent(event);
  const cancelled = event.status === "Cancelled";
  const time = formatEventTime(event);
  const locationName = event.locationName || STUDIO_LOCATION.name;
  const locationAddress = event.locationAddress || STUDIO_LOCATION.street;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
      { "@type": "ListItem", position: 2, name: "Events", item: "https://yogmandu.com/events" },
      { "@type": "ListItem", position: 3, name: event.title, item: `https://yogmandu.com/events/${event.slug}` },
    ],
  };

  const others = splitEvents((all ?? []).filter((e) => e.slug !== event.slug)).upcoming.slice(0, 3);
  const bookingMode = event.bookingMode ?? "website";
  const canBook = !past && !cancelled && bookingMode !== "none";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildEventSchema(event)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="pt-36 pb-10 px-6" style={{ background: "#FAF6F0" }}>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex items-center gap-3">
            <Link href="/events" className="text-xs font-light tracking-wide" style={{ color: "rgba(42,18,8,0.4)" }}>
              ← All events
            </Link>
            <span style={{ color: "rgba(42,18,8,0.2)" }}>·</span>
            <span className="text-xs tracking-[0.2em] uppercase font-light" style={{ color: ACCENT }}>
              {past ? "Past event" : "Upcoming"}
            </span>
          </div>

          <h1 className="mb-6 text-4xl md:text-6xl font-light leading-[1.1]"
            style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
            {event.title}
          </h1>

          {(cancelled || event.statusNote) && (
            <div className="mb-8 rounded-xl p-4"
              style={{ background: cancelled ? "rgba(180,52,42,0.08)" : "rgba(247,148,29,0.1)", border: `1px solid ${cancelled ? "rgba(180,52,42,0.25)" : "rgba(247,148,29,0.3)"}` }}>
              <p className="text-sm font-medium" style={{ color: cancelled ? "#B4342A" : "#8A5200" }}>
                {cancelled ? "This event has been cancelled." : "Please note"}
              </p>
              {event.statusNote && (
                <p className="mt-1 text-sm font-light" style={{ color: "rgba(42,18,8,0.7)" }}>{event.statusNote}</p>
              )}
            </div>
          )}

          {/* Key facts */}
          <dl className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {[
              ["When", `${formatEventDate(event)}${time ? ` · ${time}` : ""}`],
              ["Where", `${locationName} — ${locationAddress}`],
              ["Price", formatEventPrice(event)],
              ...(event.spots ? [["Places", event.spots]] : []),
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="mb-1 text-xs tracking-[0.18em] uppercase font-light" style={{ color: "rgba(42,18,8,0.35)" }}>{label}</dt>
                <dd className="text-sm font-light" style={{ color: "#2A1208" }}>{value}</dd>
              </div>
            ))}
          </dl>

          {canBook && (
            <div className="flex flex-wrap gap-3">
              {bookingMode === "website" ? (
                <Link href={`/book?service=${encodeURIComponent(event.slug)}`}
                  className="inline-block rounded-full px-7 py-3 text-sm font-medium text-white" style={{ background: ACCENT }}>
                  Book your place
                </Link>
              ) : (
                <a href={`${WHATSAPP}?text=${encodeURIComponent(`Hi Yogmandu, I'd like to join "${event.title}" on ${formatEventDate(event)}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-block rounded-full px-7 py-3 text-sm font-medium text-white" style={{ background: "#25D366" }}>
                  Book on WhatsApp
                </a>
              )}
              {event.relatedService && (
                <Link href={event.relatedService}
                  className="inline-block rounded-full px-7 py-3 text-sm font-medium"
                  style={{ border: "1px solid rgba(42,18,8,0.2)", color: "#2A1208" }}>
                  About this program
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {event.featuredImage && (
        <section className="px-6 pb-4" style={{ background: "#FAF6F0" }}>
          <div className="max-w-3xl mx-auto overflow-hidden rounded-2xl" style={{ boxShadow: "0 12px 36px rgba(42,18,8,0.14)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={event.featuredImage} alt={event.title} loading="eager"
              className="w-full object-cover" style={{ maxHeight: 460, display: "block" }} />
          </div>
        </section>
      )}

      {/* Body */}
      <section className="px-6 pb-20" style={{ background: "#FAF6F0" }}>
        <div className="max-w-3xl mx-auto">
          {event.summary && (
            <p className="mb-12 text-xl md:text-2xl font-light leading-relaxed"
              style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208", borderLeft: `3px solid ${ACCENT}`, paddingLeft: "1.5rem" }}>
              {event.summary}
            </p>
          )}

          {event.body && (
            <div className="prose-yogmandu">
              {renderMarkdown(event.body, { accent: ACCENT, skipImage: event.featuredImage || "" })}
            </div>
          )}

          {event.gallery && event.gallery.length > 0 && (
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
              {event.gallery.map((photo, i) => (
                <figure key={i} className="overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.url} alt={photo.caption || event.title} loading="lazy"
                    className="h-40 w-full object-cover" style={{ display: "block" }} />
                </figure>
              ))}
            </div>
          )}

          <ShareButtons url={`https://yogmandu.com/events/${event.slug}`} title={event.title} color={ACCENT} />
        </div>
      </section>

      {others.length > 0 && (
        <section className="px-6 pb-28" style={{ background: "#FAF6F0" }}>
          <div className="max-w-3xl mx-auto">
            <p className="mb-8 text-xs tracking-[0.25em] uppercase font-light" style={{ color: "rgba(42,18,8,0.35)" }}>
              More events
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {others.map((other) => (
                <Link key={other.slug} href={`/events/${other.slug}`} className="group rounded-xl p-6"
                  style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(42,18,8,0.07)" }}>
                  <span className="mb-3 block text-xs tracking-[0.18em] uppercase font-light" style={{ color: ACCENT }}>
                    {formatEventDate(other)}
                  </span>
                  <p className="text-base font-light leading-snug transition-opacity group-hover:opacity-70"
                    style={{ fontFamily: "Cormorant Garamond, serif", color: "#2A1208" }}>
                    {other.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
