import type { Metadata } from "next";

// Admin screens must never surface in search results. The root layout sets
// `index, follow` for the public site, and metadata is merged shallowly
// between segments, so without this every /admin route inherited it — both
// /admin and /admin/login were serving `index, follow`.
//
// The page components below are client components and cannot export metadata
// themselves, so it is declared here and applies to the whole /admin subtree.
//
// Note this is defence in depth rather than an immediate de-index: robots.txt
// already disallows /admin, and a crawler that honours the disallow never
// fetches the page and so never sees this tag. It matters if the URL is ever
// reached anyway — a stray external link, or the disallow being relaxed later.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
