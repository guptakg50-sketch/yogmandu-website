import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { SOUND_SESSIONS } from "../../service/serviceContent";

export const metadata: Metadata = {
  title: { absolute: "Sound Healing Sessions in Kathmandu — Singing Bowls | Yogmandu" },
  description:
    "Restorative Tibetan singing bowl sound healing sessions in Baneshwor, Kathmandu. Individual or group sound baths for deep relaxation and stress relief.",
  alternates: { canonical: "https://yogmandu.com/sound-healing-therapy/sessions" },
  openGraph: {
    title: "Sound Healing Sessions Kathmandu | Yogmandu",
    description: "A restorative sound bath with authentic Tibetan singing bowls. Individual or group. From NPR 2,500.",
    url: "https://yogmandu.com/sound-healing-therapy/sessions",
    images: ["/opengraph-image.png"],
  },
};

export default function Page() {
  return <ServicePage config={SOUND_SESSIONS} />;
}
