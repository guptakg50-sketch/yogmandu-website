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
    telephone: "+977-9862909469",
    email: "info@yogmandu.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Miteri Marg, Mid-Baneshwor-31",
      addressLocality: "Kathmandu",
      addressCountry: "NP",
    },
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
  title: "Contact Yogmandu | Book Yoga & Sound Healing in Kathmandu Nepal",
  description:
    "Contact Yogmandu to book yoga classes, teacher training or sound healing sessions. WhatsApp +977-9862909469 · info@yogmandu.com · Miteri Marg, Mid-Baneshwor-31, Kathmandu.",
  keywords: [
    "contact Yogmandu", "book yoga class Kathmandu", "yoga enquiry Nepal",
    "sound healing booking Nepal", "yoga teacher training enquiry",
    "Yogmandu WhatsApp", "yoga school contact Kathmandu",
  ],
  alternates: { canonical: "https://yogmandu.com/contact" },
  openGraph: {
    title: "Contact Yogmandu | Book Yoga & Sound Healing in Kathmandu",
    description: "WhatsApp +977-9862909469 · info@yogmandu.com · Miteri Marg, Mid-Baneshwor-31, Kathmandu, Nepal.",
    url: "https://yogmandu.com/contact",
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
