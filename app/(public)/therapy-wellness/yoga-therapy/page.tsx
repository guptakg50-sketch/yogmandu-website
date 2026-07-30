import type { Metadata } from "next";
import { withShareText } from "@/lib/seo";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 300;

const pageMetadata: Metadata = {
  title: { absolute: "Yoga Therapy in Kathmandu — One-to-One | Yogmandu" },
  description:
    "One-to-one yoga therapy in Kathmandu to ease pain, restore balance and support healing. Personalised therapeutic practice guided by senior faculty.",
  alternates: { canonical: "https://yogmandu.com/therapy-wellness/yoga-therapy" },
  openGraph: {
    title: "Yoga Therapy Kathmandu | Yogmandu",
    description: "Yoga applied with precision to your body — a therapeutic, one-to-one approach to pain, stress and recovery.",
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
