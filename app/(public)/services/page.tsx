import type { Metadata } from "next";
import ServicesGrid from "./ServicesGrid";

export const metadata: Metadata = {
  title: "Yogmandu Services | Yoga, Sound Healing, Retreats & Therapy Nepal",
  description:
    "Every Yogmandu service: drop-in yoga, virtual classes, home yoga, private 1-on-1, corporate yoga, retreats, weight-loss bootcamp, yoga therapy, diet consultation, sound healing, Reiki, and more — all in Kathmandu.",
  keywords: [
    "yoga services Kathmandu",
    "private yoga Nepal",
    "corporate yoga Nepal",
    "yoga retreat Nepal",
    "yoga therapy Kathmandu",
    "weight loss bootcamp Nepal",
    "virtual yoga Nepal",
    "Reiki Kathmandu",
    "prenatal yoga Kathmandu",
    "children yoga Nepal",
  ],
  alternates: { canonical: "https://yogmandu.com/services" },
  openGraph: {
    title: "All Yogmandu Services — Yoga, Sound Healing, Therapy, Retreats",
    description: "The full range of Yogmandu programs: drop-in classes, virtual live yoga, retreats, corporate yoga, yoga therapy, sound healing, diet consultation, and more.",
    url: "https://yogmandu.com/services",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",     item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://yogmandu.com/services" },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ServicesGrid />
    </>
  );
}
