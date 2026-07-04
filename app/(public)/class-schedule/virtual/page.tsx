import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { VIRTUAL_YOGA } from "../../service/serviceContent";

export const metadata: Metadata = {
  title: { absolute: "Virtual Live Yoga Classes Online | Yogmandu Nepal" },
  description:
    "Live, interactive online yoga classes with Yogmandu's Kathmandu teachers. Real-time guidance and corrections from anywhere in the world. All levels.",
  alternates: { canonical: "https://yogmandu.com/class-schedule/virtual" },
  openGraph: {
    title: "Virtual Live Yoga Online | Yogmandu Nepal",
    description: "Practise live with our Himalayan teachers from home. Real-time, interactive classes from NPR 500.",
    url: "https://yogmandu.com/class-schedule/virtual",
    images: ["/opengraph-image.png"],
  },
};

export default function Page() {
  return <ServicePage config={VIRTUAL_YOGA} />;
}
