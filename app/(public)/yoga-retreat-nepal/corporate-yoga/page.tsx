import type { Metadata } from "next";
import { withShareText } from "@/lib/seo";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 300;

const pageMetadata: Metadata = {
  title: { absolute: "Corporate Yoga & Workplace Wellness in Kathmandu | Yogmandu" },
  description:
    "Tailored corporate yoga and wellness for teams in Kathmandu — on-site or live online. Reduce stress, ease desk fatigue and boost focus. Request a proposal.",
  alternates: { canonical: "https://yogmandu.com/yoga-retreat-nepal/corporate-yoga" },
  openGraph: {
    title: "Corporate Yoga Kathmandu | Yogmandu",
    description: "Calmer, healthier, more focused teams. On-site or virtual workplace yoga tailored to your company.",
    url: "https://yogmandu.com/yoga-retreat-nepal/corporate-yoga",
    images: ["/opengraph-image.png"],
  },
};

// Share-preview text (WhatsApp/Facebook/Google) is admin-editable —
// Page Content → Share previews. Falls back to the object above.
export async function generateMetadata(): Promise<Metadata> {
  return withShareText("/yoga-retreat-nepal/corporate-yoga", pageMetadata);
}

export default async function Page() {
  return <ServicePage config={await getServicePageConfig("CORPORATE_YOGA")} />;
}
