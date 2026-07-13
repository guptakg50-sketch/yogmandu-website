import type { Metadata } from "next";
import CategoryHub from "../service/CategoryHub";
import { getHubConfig } from "@/lib/pageContent";

// Hub cards are admin-editable (Page Content → Cards & Pricing).
export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "Yoga Therapy, Reiki & Diet Consultation in Kathmandu | Yogmandu" },
  description:
    "One-to-one therapy and wellness at Yogmandu, Kathmandu — yoga therapy, Reiki energy healing and personalised Ayurvedic diet consultation.",
  alternates: { canonical: "https://yogmandu.com/therapy-wellness" },
  openGraph: {
    title: "Therapy & Wellness — Yoga Therapy, Reiki, Diet | Yogmandu",
    description: "Personalised healing and wellbeing: yoga therapy, Reiki and nutrition guidance in Kathmandu, Nepal.",
    url: "https://yogmandu.com/therapy-wellness",
    images: ["/opengraph-image.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "Therapy & Wellness", item: "https://yogmandu.com/therapy-wellness" },
  ],
};

export default async function Page() {
  const hub = await getHubConfig("THERAPY_WELLNESS");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CategoryHub config={{
        eyebrow: "Therapy & Wellness",
        titleA: "Healing &",
        titleEm: "wellbeing",
        lead: "One-to-one therapeutic care in Kathmandu — yoga therapy for the body, Reiki for the energy, and personalised nutrition for the whole of you.",
        primaryCta: { href: "/book?service=therapy", label: "Book a Consultation" },
        hub,
        accent: "#6B2D8B",
      }} />
    </>
  );
}
