import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { PRENATAL } from "../../service/serviceContent";

export const metadata: Metadata = {
  title: { absolute: "Prenatal & Postnatal Yoga in Kathmandu | Yogmandu" },
  description:
    "Gentle, safe prenatal and postnatal yoga in Kathmandu. Support your body through pregnancy and recovery with trimester-safe, expertly guided classes.",
  alternates: { canonical: "https://yogmandu.com/specialized-yoga/prenatal" },
  openGraph: {
    title: "Prenatal & Postnatal Yoga Kathmandu | Yogmandu",
    description: "Gentle, trimester-safe yoga to support you through pregnancy and recovery, guided every step of the way.",
    url: "https://yogmandu.com/specialized-yoga/prenatal",
    images: ["/opengraph-image.png"],
  },
};

export default function Page() {
  return <ServicePage config={PRENATAL} />;
}
