import type { Metadata } from "next";
import { withShareText } from "@/lib/seo";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 300;

const pageMetadata: Metadata = {
  title: { absolute: "Diet & Nutrition Consultation in Kathmandu | Yogmandu" },
  description:
    "Personalised diet and nutrition consultation in Kathmandu, grounded in Ayurvedic principles. Practical, sustainable guidance tailored to your body and goals.",
  alternates: { canonical: "https://yogmandu.com/therapy-wellness/diet-consultation" },
  openGraph: {
    title: "Diet Consultation Kathmandu | Yogmandu",
    description: "Eat in a way that suits your body — personalised, Ayurvedic-informed nutrition guidance you can sustain.",
    url: "https://yogmandu.com/therapy-wellness/diet-consultation",
    images: ["/opengraph-image.png"],
  },
};

// Share-preview text (WhatsApp/Facebook/Google) is admin-editable —
// Page Content → Share previews. Falls back to the object above.
export async function generateMetadata(): Promise<Metadata> {
  return withShareText("/therapy-wellness/diet-consultation", pageMetadata);
}

export default async function Page() {
  return <ServicePage config={await getServicePageConfig("DIET_CONSULTATION")} />;
}
