import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { SOUND_LEVEL_2 } from "../../service/serviceContent";

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

export default function Page() {
  return <ServicePage config={SOUND_LEVEL_2} />;
}
