import type { Metadata } from "next";
import { withShareText } from "@/lib/seo";
import ServicePage from "../../service/ServicePage";
import type { ServiceConfig } from "../../service/serviceContent";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 300;

// Title kept to ~53 chars so it isn't truncated; "certification" leads
// because that is the buying phrase people search on.
const pageMetadata: Metadata = {
  title: { absolute: "Sound Healing Certification Level I, Nepal | Yogmandu" },
  description:
    "Level I foundational sound healing certification in Kathmandu, Nepal. 20 hours of Tibetan singing bowl history, technique and session basics.",
  keywords: [
    "sound healing course Nepal",
    "sound healing certification Kathmandu",
    "Tibetan singing bowl training Nepal",
    "foundational sound healing course",
    "singing bowl certification Nepal",
  ],
  alternates: { canonical: "https://yogmandu.com/sound-healing-therapy/course-level-1" },
  openGraph: {
    title: "Sound Healing Course — Level I | Yogmandu",
    description: "The 20-hour foundational course in Tibetan singing bowls. Internationally recognised certificate.",
    url: "https://yogmandu.com/sound-healing-therapy/course-level-1",
    images: ["/opengraph-image.png"],
  },
};

// Share-preview text (WhatsApp/Facebook/Google) is admin-editable —
// Page Content → Share previews. Falls back to the object above.
export async function generateMetadata(): Promise<Metadata> {
  return withShareText("/sound-healing-therapy/course-level-1", pageMetadata);
}

const STUDIO = {
  "@type": "Place",
  name: "Yogmandu",
  address: { "@type": "PostalAddress", streetAddress: "Miteri Marg, Mid-Baneshwor-31", addressLocality: "Kathmandu", addressCountry: "NP" },
} as const;

// This page previously carried no structured data at all, unlike every YTT
// page. The markup is derived from the same admin-editable config the page
// renders, so hours and price can't drift from the visible content when the
// client edits Page Content → Service Pages — Google requires structured data
// to match what the user actually sees. Fields we can't read stay omitted
// rather than being guessed.
// Prices are written for humans and are often dual-currency
// ("NPR 35,000 / USD 350"), so each amount must be paired with the symbol
// that introduces it. Matching currency and amount independently reads the
// first number with the last currency and publishes "USD 35,000".
function parsePrices(text: string): { price: string; priceCurrency: string }[] {
  return [...text.matchAll(/(NPR|Rs\.?|USD|\$)\s*([\d,]+(?:\.\d+)?)/gi)].map((m) => ({
    priceCurrency: /usd|\$/i.test(m[1]) ? "USD" : "NPR",
    price: m[2].replace(/,/g, ""),
  }));
}

function buildCourseSchema(config: ServiceConfig) {
  const hours = config.heroMeta.match(/(\d+)\s*hours?/i)?.[1];
  const prices = parsePrices(config.price ?? "");

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${config.heroTitleA} ${config.heroTitleEm}`.replace(/\s+/g, " ").trim(),
    description: config.heroLead.length > 160 ? config.heroLead.slice(0, 159).replace(/\s+\S*$/, "") + "…" : config.heroLead,
    provider: { "@type": "Organization", name: "Yogmandu", sameAs: "https://yogmandu.com" },
    courseMode: "onsite",
    location: STUDIO,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      ...(hours ? { courseWorkload: `PT${hours}H` } : {}),
      location: STUDIO,
    },
    ...(prices.length
      ? {
          offers: prices.map((p) => ({
            "@type": "Offer",
            priceCurrency: p.priceCurrency,
            price: p.price,
            availability: "https://schema.org/InStock",
            url: "https://yogmandu.com/sound-healing-therapy/course-level-1",
          })),
        }
      : {}),
    educationalCredentialAwarded: "Yogmandu Sound Healing Certificate — Level I",
  };
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "Sound Healing Therapy", item: "https://yogmandu.com/sound-healing-therapy" },
    { "@type": "ListItem", position: 3, name: "Course Level I", item: "https://yogmandu.com/sound-healing-therapy/course-level-1" },
  ],
};

export default async function Page() {
  const config = await getServicePageConfig("SOUND_LEVEL_1");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCourseSchema(config)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ServicePage config={config} />
    </>
  );
}
