import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { YOGA_AT_HOME } from "../../service/serviceContent";

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

export default function Page() {
  return <ServicePage config={YOGA_AT_HOME} />;
}
