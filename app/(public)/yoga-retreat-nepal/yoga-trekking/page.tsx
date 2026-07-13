import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "Yoga Trekking in the Nepal Himalayas | Yogmandu" },
  description:
    "Combine guided Himalayan trekking with daily yoga, breathwork and meditation. Small-group yoga trekking journeys through Nepal's mountains.",
  alternates: { canonical: "https://yogmandu.com/yoga-retreat-nepal/yoga-trekking" },
  openGraph: {
    title: "Yoga Trekking Nepal | Yogmandu",
    description: "Trek the Himalayas by day, practise yoga amid the mountains. Small groups, unforgettable journeys.",
    url: "https://yogmandu.com/yoga-retreat-nepal/yoga-trekking",
    images: ["/opengraph-image.png"],
  },
};

export default async function Page() {
  return <ServicePage config={await getServicePageConfig("YOGA_TREKKING")} />;
}
