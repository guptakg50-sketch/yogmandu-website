import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { YOGA_THERAPY } from "../../service/serviceContent";

export const metadata: Metadata = {
  title: { absolute: "Yoga Therapy in Kathmandu — One-to-One | Yogmandu" },
  description:
    "One-to-one yoga therapy in Kathmandu to ease pain, restore balance and support healing. Personalised therapeutic practice guided by senior faculty.",
  alternates: { canonical: "https://yogmandu.com/therapy-wellness/yoga-therapy" },
  openGraph: {
    title: "Yoga Therapy Kathmandu | Yogmandu",
    description: "Yoga applied with precision to your body — a therapeutic, one-to-one approach to pain, stress and recovery.",
    url: "https://yogmandu.com/therapy-wellness/yoga-therapy",
    images: ["/opengraph-image.png"],
  },
};

export default function Page() {
  return <ServicePage config={YOGA_THERAPY} />;
}
