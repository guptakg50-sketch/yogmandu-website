import type { Metadata } from "next";
import CategoryHub from "../service/CategoryHub";
import { getHubConfig } from "@/lib/pageContent";

// Hub cards are admin-editable (Page Content → Cards & Pricing).
export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "Prenatal, Kids, Senior & School Yoga in Kathmandu | Yogmandu" },
  description:
    "Yoga adapted for every stage of life at Yogmandu, Kathmandu — prenatal & postnatal yoga, children's yoga, senior citizens' yoga and school programs.",
  alternates: { canonical: "https://yogmandu.com/specialized-yoga" },
  openGraph: {
    title: "Specialized Yoga — Prenatal, Kids, Seniors, Schools | Yogmandu",
    description: "Yoga for every stage of life: expecting mothers, children, seniors and schools. Kathmandu, Nepal.",
    url: "https://yogmandu.com/specialized-yoga",
    images: ["/opengraph-image.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "For Specific Groups", item: "https://yogmandu.com/specialized-yoga" },
  ],
};

export default async function Page() {
  const hub = await getHubConfig("SPECIALIZED");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CategoryHub config={{
        eyebrow: "For Specific Groups",
        titleA: "Yoga for",
        titleEm: "every stage of life",
        lead: "Specially adapted classes for expecting mothers, children, seniors and schools — safe, gentle and tailored to each group's needs.",
        primaryCta: { href: "/book?service=prenatal", label: "Find Your Class" },
        hub,
        accent: "#6B2D8B",
      }} />
    </>
  );
}
