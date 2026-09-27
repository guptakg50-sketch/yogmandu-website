import type { Metadata } from "next";
import { withShareText } from "@/lib/seo";
import ServicePage from "../../service/ServicePage";
import { ServiceHub } from "../../service/ServiceHub";
import { getServicePageConfig, getHubConfig } from "@/lib/pageContent";
import { withTherapyBookingLinks } from "@/lib/soundTherapies";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 300;

const pageMetadata: Metadata = {
  title: { absolute: "Sound Healing Sessions Kathmandu | Yogmandu" },
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

// Share-preview text (WhatsApp/Facebook/Google) is admin-editable —
// Page Content → Share previews. Falls back to the object above.
export async function generateMetadata(): Promise<Metadata> {
  return withShareText("/sound-healing-therapy/sessions", pageMetadata);
}

export default async function Page() {
  // The individual therapies sit inside this page rather than on the Sound
  // Healing hub — the client asked for them where sessions are actually booked.
  const [config, therapies] = await Promise.all([
    getServicePageConfig("SOUND_SESSIONS"),
    getHubConfig("SOUND_THERAPIES"),
  ]);
  // withTherapyBookingLinks re-points each card at its own booking option.
  // The studio's saved copy predates those options and still carries the old
  // generic link for all twelve; everything else they typed is untouched.
  return <ServicePage config={config} hub={<ServiceHub {...withTherapyBookingLinks(therapies)} />} />;
}
