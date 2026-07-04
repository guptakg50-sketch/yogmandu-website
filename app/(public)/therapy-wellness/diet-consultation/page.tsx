import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { DIET_CONSULTATION } from "../../service/serviceContent";

export const metadata: Metadata = {
  title: { absolute: "Diet & Nutrition Consultation in Kathmandu | Yogmandu" },
  description:
    "Personalised diet and nutrition consultation in Kathmandu, grounded in Ayurvedic principles. Practical, sustainable guidance tailored to your body and goals.",
  alternates: { canonical: "https://yogmandu.com/therapy-wellness/diet-consultation" },
  openGraph: {
    title: "Diet Consultation Kathmandu | Yogmandu",
    description: "Eat in a way that suits your body — personalised, Ayurvedic-informed nutrition guidance you can sustain.",
    url: "https://yogmandu.com/therapy-wellness/diet-consultation",
    images: ["/opengraph-image.png"],
  },
};

export default function Page() {
  return <ServicePage config={DIET_CONSULTATION} />;
}
