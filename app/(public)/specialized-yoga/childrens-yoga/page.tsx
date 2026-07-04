import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { CHILDRENS_YOGA } from "../../service/serviceContent";

export const metadata: Metadata = {
  title: { absolute: "Children's Yoga in Kathmandu — Kids Yoga Classes | Yogmandu" },
  description:
    "Playful, story-led children's yoga in Kathmandu that builds strength, balance, focus and calm. Fun, safe and age-appropriate classes for kids.",
  alternates: { canonical: "https://yogmandu.com/specialized-yoga/childrens-yoga" },
  openGraph: {
    title: "Children's Yoga Kathmandu | Yogmandu",
    description: "Playful, story-led yoga that helps kids build strength, focus and calm — while having fun.",
    url: "https://yogmandu.com/specialized-yoga/childrens-yoga",
    images: ["/opengraph-image.png"],
  },
};

export default function Page() {
  return <ServicePage config={CHILDRENS_YOGA} />;
}
