import { getGalleryItems } from "@/lib/publicData";

export const dynamic = "force-dynamic";

// Public endpoint consumed by the home-page photo carousel.
// Returns admin-managed gallery items (Supabase). When Supabase is
// unconfigured or the table is empty, returns an empty array so the
// carousel falls back to its built-in static gallery set.
export async function GET() {
  const items = await getGalleryItems();
  return Response.json({ data: items ?? [] });
}
