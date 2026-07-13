import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: "Yoga for Senior Citizens in Kathmandu | Yogmandu" },
  description:
    "Gentle, low-impact yoga for seniors in Kathmandu to improve balance, mobility and strength. Chair-supported options make every class accessible.",
  alternates: { canonical: "https://yogmandu.com/specialized-yoga/senior-yoga" },
  openGraph: {
    title: "Senior Citizens' Yoga Kathmandu | Yogmandu",
    description: "Gentle, low-impact yoga to stay mobile, steady and strong — chair-supported options available.",
    url: "https://yogmandu.com/specialized-yoga/senior-yoga",
    images: ["/opengraph-image.png"],
  },
};

export default async function Page() {
  return <ServicePage config={await getServicePageConfig("SENIOR_YOGA")} />;
}
