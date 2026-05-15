import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Yogmandu — Yoga Alliance Certified Training & Sound Healing in Nepal",
  description:
    "Join Yogmandu for Yoga Alliance certified 200hr & 300hr teacher training programs and authentic Sound Healing therapy in the heart of Kathmandu, Nepal.",
  keywords: [
    "yoga teacher training Nepal",
    "sound healing Kathmandu",
    "yoga alliance certified Nepal",
    "200hr yoga training Nepal",
    "Tibetan singing bowl therapy",
  ],
  openGraph: {
    title: "Yogmandu — Yoga & Sound Healing in Nepal",
    description:
      "Yoga Alliance certified teacher training and authentic Sound Healing in Kathmandu, Nepal.",
    type: "website",
    locale: "en_US",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Yogmandu",
  description:
    "Yoga Alliance certified yoga teacher training and Sound Healing therapy center in Kathmandu, Nepal.",
  url: "https://yogmandu.com",
  telephone: "+977-1-XXXXXXX",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Thamel",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 27.7172,
    longitude: 85.324,
  },
  openingHours: "Mo-Su 06:00-20:00",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
