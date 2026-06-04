import type { Metadata } from "next";
import ServicesGrid from "./ServicesGrid";

export const metadata: Metadata = {
  title: { absolute: "Our Services — Yoga, Sound Healing & Retreats | Yogmandu" },
  description:
    "Yogmandu's services in Kathmandu, Nepal: yoga teacher training, daily classes, private & corporate yoga, retreats, yoga therapy and Tibetan sound healing.",
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
    images: ["/opengraph-image.png"],
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
