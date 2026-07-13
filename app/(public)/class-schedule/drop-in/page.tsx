import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "Drop-In Yoga Classes in Baneshwor, Kathmandu | Yogmandu" },
  description:
    "Pay-as-you-go drop-in yoga classes at Yogmandu, Mid-Baneshwor, Kathmandu. All levels welcome — Hatha, Vinyasa, Yin, pranayama & meditation. Mats provided.",
  alternates: { canonical: "https://yogmandu.com/class-schedule/drop-in" },
  openGraph: {
    title: "Drop-In Yoga Classes Kathmandu | Yogmandu",
    description: "No membership needed — join any class on our weekly timetable. From NPR 600 per class in Mid-Baneshwor, Kathmandu.",
    url: "https://yogmandu.com/class-schedule/drop-in",
    images: ["/opengraph-image.png"],
  },
};

export default async function Page() {
  return <ServicePage config={await getServicePageConfig("DROP_IN")} />;
}
