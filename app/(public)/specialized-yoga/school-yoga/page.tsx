import type { Metadata } from "next";
import { withShareText } from "@/lib/seo";
import ServicePage from "../../service/ServicePage";
import { getServicePageConfig } from "@/lib/pageContent";

// Content is admin-editable (Page Content → Service Pages); re-render picks
// up saved overrides within a minute.
export const revalidate = 300;

const pageMetadata: Metadata = {
  title: { absolute: "School Yoga Programs in Kathmandu | Yogmandu" },
  description:
    "Yoga programs for schools in Kathmandu — building focus, wellbeing and resilience for students and staff. Age-appropriate, curriculum-friendly, on-site.",
  alternates: { canonical: "https://yogmandu.com/specialized-yoga/school-yoga" },
  openGraph: {
    title: "School Yoga Programs Kathmandu | Yogmandu",
    description: "Yoga for students and staff — focus, wellbeing and resilience, delivered at your school.",
    url: "https://yogmandu.com/specialized-yoga/school-yoga",
    images: ["/opengraph-image.png"],
  },
};

// Share-preview text (WhatsApp/Facebook/Google) is admin-editable —
// Page Content → Share previews. Falls back to the object above.
export async function generateMetadata(): Promise<Metadata> {
  return withShareText("/specialized-yoga/school-yoga", pageMetadata);
}

export default async function Page() {
  return <ServicePage config={await getServicePageConfig("SCHOOL_YOGA")} />;
}
