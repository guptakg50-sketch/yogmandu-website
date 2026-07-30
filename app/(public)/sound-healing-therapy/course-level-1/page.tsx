import type { Metadata } from "next";
import { withShareText } from "@/lib/seo";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 300;

const pageMetadata: Metadata = {
  title: { absolute: "Sound Healing Course Level I (Foundational) in Nepal | Yogmandu" },
  description:
    "Level I foundational sound healing certification in Kathmandu, Nepal — 20 hours of Tibetan singing bowl history, technique and session basics. Certificate awarded.",
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

export default async function Page() {
  return <ServicePage config={await getServicePageConfig("SOUND_LEVEL_1")} />;
}
