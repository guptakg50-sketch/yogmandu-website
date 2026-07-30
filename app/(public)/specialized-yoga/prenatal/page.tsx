import type { Metadata } from "next";
import { withShareText } from "@/lib/seo";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 300;

const pageMetadata: Metadata = {
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

// Share-preview text (WhatsApp/Facebook/Google) is admin-editable —
// Page Content → Share previews. Falls back to the object above.
export async function generateMetadata(): Promise<Metadata> {
  return withShareText("/specialized-yoga/prenatal", pageMetadata);
}

export default async function Page() {
  return <ServicePage config={await getServicePageConfig("PRENATAL")} />;
}
