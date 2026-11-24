import type { Metadata } from "next";
import { withShareText } from "@/lib/seo";
import ServicePage from "../../service/ServicePage";
import { buildCourseSchema } from "@/lib/courseSchema";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 300;

// Title kept to ~53 chars so it isn't truncated; "certification" leads
// because that is the buying phrase people search on.
const pageMetadata: Metadata = {
  title: { absolute: "Sound Healing Certification Level I, Nepal | Yogmandu" },
  description:
    "Level I foundational sound healing certification in Kathmandu, Nepal. 20 hours: science of sound, chakras, singing bowls and client session basics.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCourseSchema(config, "https://yogmandu.com/sound-healing-therapy/course-level-1", "Yogmandu Sound Healing Certificate — Level I")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ServicePage config={config} />
    </>
  );
}
