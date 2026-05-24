import type { Metadata } from "next";

// Booking form — no SEO value, block search indexing. Customers reach it via
// CTAs from service pages, not from search.
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
