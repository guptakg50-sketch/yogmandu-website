import type { Metadata } from "next";
import ServicePage from "../../service/ServicePage";
import { REIKI_HEALING } from "../../service/serviceContent";

export const metadata: Metadata = {
  title: { absolute: "Reiki Healing in Kathmandu — Energy Healing | Yogmandu" },
  description:
    "Gentle, non-invasive Reiki energy healing in Kathmandu to calm the mind and restore balance. Rest fully clothed while a practitioner channels soothing energy.",
  alternates: { canonical: "https://yogmandu.com/therapy-wellness/reiki-healing" },
  openGraph: {
    title: "Reiki Healing Kathmandu | Yogmandu",
    description: "A gentle energy-healing practice for deep relaxation and balance. Non-invasive and restorative.",
    url: "https://yogmandu.com/therapy-wellness/reiki-healing",
    images: ["/opengraph-image.png"],
  },
};

export default function Page() {
  return <ServicePage config={REIKI_HEALING} />;
}
