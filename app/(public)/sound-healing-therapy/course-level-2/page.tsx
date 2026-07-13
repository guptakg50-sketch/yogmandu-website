import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "Sound Healing Course Level II (Advanced) in Nepal | Yogmandu" },
  description:
    "Level II advanced sound healing certification in Kathmandu, Nepal — chakra mapping, client work and professional facilitation. Level I required. Certificate awarded.",
  alternates: { canonical: "https://yogmandu.com/sound-healing-therapy/course-level-2" },
  openGraph: {
    title: "Sound Healing Course — Level II | Yogmandu",
    description: "The advanced course in professional sound healing facilitation. Internationally recognised certificate.",
    url: "https://yogmandu.com/sound-healing-therapy/course-level-2",
    images: ["/opengraph-image.png"],
  },
};

export default async function Page() {
  return <ServicePage config={await getServicePageConfig("SOUND_LEVEL_2")} />;
}
