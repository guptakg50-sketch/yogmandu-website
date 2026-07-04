import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { CORPORATE_YOGA } from "../../service/serviceContent";

export const metadata: Metadata = {
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

export default function Page() {
  return <ServicePage config={CORPORATE_YOGA} />;
}
