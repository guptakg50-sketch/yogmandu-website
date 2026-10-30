import type { Metadata } from "next";
import { withShareText } from "@/lib/seo";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 300;

const pageMetadata: Metadata = {
  title: { absolute: "Yoga Therapy in Kathmandu — Yogic Therapy 1-to-1 | Yogmandu" },
  description:
    "One-to-one yogic therapy in Kathmandu for back and neck pain, stiffness, stress, poor sleep and injury recovery. Assessment, personal plan and home routine.",
  keywords: [
    "yoga therapy Kathmandu",
    "yogic therapy in Kathmandu",
    "therapeutic yoga Nepal",
    "yoga for back pain Kathmandu",
    "one-to-one yoga therapy",
    "yoga therapy Baneshwor",
  ],
  alternates: { canonical: "https://yogmandu.com/therapy-wellness/yoga-therapy" },
  openGraph: {
    title: "Yoga Therapy in Kathmandu — Yogic Therapy 1-to-1 | Yogmandu",
    description: "One-to-one yogic therapy in Kathmandu for back and neck pain, stiffness, stress, poor sleep and injury recovery. Assessment, personal plan and home routine.",
    url: "https://yogmandu.com/therapy-wellness/yoga-therapy",
    images: ["/opengraph-image.png"],
  },
};

// Share-preview text (WhatsApp/Facebook/Google) is admin-editable —
// Page Content → Share previews. Falls back to the object above.
export async function generateMetadata(): Promise<Metadata> {
  return withShareText("/therapy-wellness/yoga-therapy", pageMetadata);
}

export default async function Page() {
  return <ServicePage config={await getServicePageConfig("YOGA_THERAPY")} />;
}
