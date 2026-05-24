import type { Metadata } from "next";

// Account pages (login, register, profile, password flows, email verification)
// are personal — block search engines from indexing them. The Cloudflare worker
// still serves them; this only hides them from Google.
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
