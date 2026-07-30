import type { Metadata } from "next";
import { withShareText } from "@/lib/seo";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 300;

const pageMetadata: Metadata = {
  title: { absolute: "Private One-to-One Yoga Classes in Kathmandu | Yogmandu" },
  description:
    "Personalised private yoga classes in Kathmandu — one-to-one attention, a practice built around your body and goals. Studio or at your location.",
  alternates: { canonical: "https://yogmandu.com/class-schedule/private" },
  openGraph: {
    title: "Private Yoga Classes Kathmandu | Yogmandu",
    description: "One-to-one yoga tailored to you — faster progress with a teacher's full attention. Studio or your location.",
    url: "https://yogmandu.com/class-schedule/private",
    images: ["/opengraph-image.png"],
  },
};

// Share-preview text (WhatsApp/Facebook/Google) is admin-editable —
// Page Content → Share previews. Falls back to the object above.
export async function generateMetadata(): Promise<Metadata> {
  return withShareText("/class-schedule/private", pageMetadata);
}

export default async function Page() {
  return <ServicePage config={await getServicePageConfig("PRIVATE_YOGA")} />;
}
