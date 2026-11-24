import type { ServiceConfig } from "@/app/(public)/service/serviceContent";
import { yogaAllianceCredentials, YACEP_PROFILE_URL } from "@/lib/credentials";

// Course structured data for the sound healing levels, derived from the same
// admin-editable config the page renders so it can't drift from what visitors
// see (Google requires that). Fields we can't read are omitted, not guessed.

const STUDIO = {
  "@type": "Place",
  name: "Yogmandu",
  address: { "@type": "PostalAddress", streetAddress: "Miteri Marg, Mid-Baneshwor-31", addressLocality: "Kathmandu", addressCountry: "NP" },
} as const;

// Prices are often dual-currency ("NPR 35,000 / USD 350"), so each amount is
// paired with the symbol that introduces it; matching independently would
// publish "USD 35,000".
function parsePrices(text: string): { price: string; priceCurrency: string }[] {
  return [...text.matchAll(/(NPR|Rs\.?|USD|\$)\s*([\d,]+(?:\.\d+)?)/gi)].map((m) => ({
    priceCurrency: /usd|\$/i.test(m[1]) ? "USD" : "NPR",
    price: m[2].replace(/,/g, ""),
  }));
}

export function buildCourseSchema(config: ServiceConfig, url: string, credentialName: string) {
  const hours = config.heroMeta.match(/(\d+)\s*hours?/i)?.[1];
  const prices = parsePrices(config.price ?? "");
  const topics = (config.curriculum?.modules ?? []).flatMap((m) =>
    m.title ? [m.title] : m.topics.map((t) => (typeof t === "string" ? t : t.text))
  );

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${config.heroTitleA} ${config.heroTitleEm}`.replace(/\s+/g, " ").trim(),
    description: config.heroLead.length > 160 ? config.heroLead.slice(0, 159).replace(/\s+\S*$/, "") + "…" : config.heroLead,
    url,
    inLanguage: "en",
    provider: {
      "@type": "Organization",
      name: "Yogmandu",
      url: "https://yogmandu.com",
      // The YACEP designation is held by the founder, so it is attached to
      // the person and backed by the public Yoga Alliance directory entry.
      employee: {
        "@type": "Person",
        "@id": "https://yogmandu.com/teachers/arjuna-rakhal-magar#person",
        name: "Arjuna Rakhal Magar",
        url: "https://yogmandu.com/teachers/arjuna-rakhal-magar",
        sameAs: [YACEP_PROFILE_URL],
        hasCredential: yogaAllianceCredentials("YACEP"),
      },
    },
    ...(topics.length ? { teaches: topics } : {}),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      ...(hours ? { courseWorkload: `PT${hours}H` } : {}),
      location: STUDIO,
    },
    ...(prices.length
      ? {
          offers: prices.map((p) => ({
            "@type": "Offer",
            category: "Paid",
            priceCurrency: p.priceCurrency,
            price: p.price,
            availability: "https://schema.org/InStock",
            url,
          })),
        }
      : {}),
    educationalCredentialAwarded: {
      "@type": "EducationalOccupationalCredential",
      name: credentialName,
      credentialCategory: "Certificate",
      ...(config.badge ? { description: config.badge.caption } : {}),
    },
  };
}
