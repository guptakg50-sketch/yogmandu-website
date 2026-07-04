import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { SCHOOL_YOGA } from "../../service/serviceContent";

export const metadata: Metadata = {
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

export default function Page() {
  return <ServicePage config={SCHOOL_YOGA} />;
}
