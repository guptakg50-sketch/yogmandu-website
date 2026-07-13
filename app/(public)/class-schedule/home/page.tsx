import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "Yoga at Home in Kathmandu — Teacher Comes to You | Yogmandu" },
  description:
    "Private yoga at home in Kathmandu. An experienced Yogmandu teacher comes to your space for a personalised session — ideal for families and busy schedules.",
  alternates: { canonical: "https://yogmandu.com/class-schedule/home" },
  openGraph: {
    title: "Yoga at Home Kathmandu | Yogmandu",
    description: "Our teacher comes to you — practise privately at home in and around Kathmandu.",
    url: "https://yogmandu.com/class-schedule/home",
    images: ["/opengraph-image.png"],
  },
};

export default async function Page() {
  return <ServicePage config={await getServicePageConfig("YOGA_AT_HOME")} />;
}
