import type { Metadata } from "next";
import { withShareText } from "@/lib/seo";
import ServicePage from "../../service/ServicePage";
import { buildCourseSchema } from "@/lib/courseSchema";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 300;

const pageMetadata: Metadata = {
  title: { absolute: "Sound Healing Course Level II (Advanced) in Nepal | Yogmandu" },
  description:
    "Level II advanced sound healing certification in Kathmandu, Nepal — gongs, tuning forks, biofield clearing and sound baths. Level I required.",
  alternates: { canonical: "https://yogmandu.com/sound-healing-therapy/course-level-2" },
  openGraph: {
    title: "Sound Healing Course — Level II | Yogmandu",
    description: "The advanced course in professional sound healing facilitation. Internationally recognised certificate.",
    url: "https://yogmandu.com/sound-healing-therapy/course-level-2",
    images: ["/opengraph-image.png"],
  },
};

// Share-preview text (WhatsApp/Facebook/Google) is admin-editable —
// Page Content → Share previews. Falls back to the object above.
export async function generateMetadata(): Promise<Metadata> {
  return withShareText("/sound-healing-therapy/course-level-2", pageMetadata);
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "Sound Healing Therapy", item: "https://yogmandu.com/sound-healing-therapy" },
    { "@type": "ListItem", position: 3, name: "Course Level II", item: "https://yogmandu.com/sound-healing-therapy/course-level-2" },
  ],
};

export default async function Page() {
  const config = await getServicePageConfig("SOUND_LEVEL_2");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCourseSchema(config, "https://yogmandu.com/sound-healing-therapy/course-level-2", "Yogmandu Sound Healing Certificate — Level II")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ServicePage config={config} />
    </>
  );
}
