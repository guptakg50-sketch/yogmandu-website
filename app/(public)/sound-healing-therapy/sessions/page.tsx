import type { Metadata } from "next";
import { withShareText } from "@/lib/seo";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 300;

const pageMetadata: Metadata = {
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

// Share-preview text (WhatsApp/Facebook/Google) is admin-editable —
// Page Content → Share previews. Falls back to the object above.
export async function generateMetadata(): Promise<Metadata> {
  return withShareText("/sound-healing-therapy/sessions", pageMetadata);
}

export default async function Page() {
  return <ServicePage config={await getServicePageConfig("SOUND_SESSIONS")} />;
}
