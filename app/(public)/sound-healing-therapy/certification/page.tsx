import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { SOUND_CERTIFICATION } from "../../service/serviceContent";

export const metadata: Metadata = {
  title: { absolute: "Sound Healing Certification in Nepal — Practitioner Training | Yogmandu" },
  description:
    "Become a certified sound healing practitioner in Kathmandu, Nepal. Multi-level Tibetan singing bowl training in technique, theory and facilitation.",
  alternates: { canonical: "https://yogmandu.com/sound-healing-therapy/certification" },
  openGraph: {
    title: "Sound Healing Certification Nepal | Yogmandu",
    description: "Learn to facilitate sound healing with Tibetan bowls. Multi-level practitioner training with a certificate on completion.",
    url: "https://yogmandu.com/sound-healing-therapy/certification",
    images: ["/opengraph-image.png"],
  },
};

export default function Page() {
  return <ServicePage config={SOUND_CERTIFICATION} />;
}
