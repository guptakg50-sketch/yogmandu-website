import type { Metadata } from "next";
import ContactForm from "./ContactForm";

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Yogmandu",
  url: "https://yogmandu.com/contact",
  description: "Contact Yogmandu to book yoga classes, teacher training or sound healing sessions in Kathmandu, Nepal.",
  mainEntity: {
    "@type": "LocalBusiness",
    name: "Yogmandu",
    url: "https://yogmandu.com",
    telephone: "+977-9810263277",
    email: "info@yogmandu.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Miteri Marg, Mid-Baneshwor-31",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati Province",
      addressCountry: "NP",
    },
    geo: { "@type": "GeoCoordinates", latitude: 27.6981324, longitude: 85.3384591 },
    openingHours: "Su-Fr 05:30-18:30",
    areaServed: [
      { "@type": "Place", name: "New Baneshwor, Kathmandu" },
      { "@type": "Place", name: "Mid-Baneshwor, Kathmandu" },
      { "@type": "Place", name: "Sinamangal, Kathmandu" },
      { "@type": "Place", name: "Koteshwor, Kathmandu" },
      { "@type": "Place", name: "Lalitpur" },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://yogmandu.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://yogmandu.com/contact" },
  ],
};

export const metadata: Metadata = {
  title: { absolute: "Contact Yogmandu — Yoga in Kathmandu, Nepal" },
  description:
    "Book yoga classes, teacher training or sound healing at Yogmandu in Mid-Baneshwor, Kathmandu — near New Baneshwor. WhatsApp +977-9810263277 · info@yogmandu.com.",
  keywords: [
    "contact Yogmandu", "book yoga class Kathmandu", "yoga enquiry Nepal",
    "sound healing booking Nepal", "yoga teacher training enquiry",
    "Yogmandu WhatsApp", "yoga school contact Kathmandu",
  ],
  alternates: { canonical: "https://yogmandu.com/contact" },
  openGraph: {
    title: "Contact Yogmandu | Book Yoga & Sound Healing in Kathmandu",
    description: "WhatsApp +977-9810263277 · info@yogmandu.com · Miteri Marg, Mid-Baneshwor-31, Kathmandu, Nepal.",
    url: "https://yogmandu.com/contact",
    images: ["/opengraph-image.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ContactForm />
    </>
  );
}
