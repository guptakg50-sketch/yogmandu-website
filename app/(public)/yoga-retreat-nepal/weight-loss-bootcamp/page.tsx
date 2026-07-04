import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { WEIGHT_LOSS_BOOTCAMP } from "../../service/serviceContent";

export const metadata: Metadata = {
  title: { absolute: "Weight-Loss Yoga Bootcamp in Kathmandu | Yogmandu" },
  description:
    "A structured weight-loss yoga bootcamp in Kathmandu pairing dynamic daily yoga with mindful nutrition for sustainable, lasting results. All levels.",
  alternates: { canonical: "https://yogmandu.com/yoga-retreat-nepal/weight-loss-bootcamp" },
  openGraph: {
    title: "Weight-Loss Yoga Bootcamp Kathmandu | Yogmandu",
    description: "Dynamic yoga + mindful nutrition for a sustainable reset. Guided, progressive, and beginner-friendly.",
    url: "https://yogmandu.com/yoga-retreat-nepal/weight-loss-bootcamp",
    images: ["/opengraph-image.png"],
  },
};

export default function Page() {
  return <ServicePage config={WEIGHT_LOSS_BOOTCAMP} />;
}
