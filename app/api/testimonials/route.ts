import { getTestimonials } from "@/lib/publicData";

export const dynamic = "force-dynamic";

// Public endpoint consumed by the homepage <Testimonials /> carousel.
// Returns only active reviews. When Supabase is unconfigured or the table
// is empty, returns an empty array so the component falls back to its
// built-in real Google reviews.
export async function GET() {
  const list = await getTestimonials();
  const active = (list ?? []).filter(
    (t) =>
      (t.status ?? "Active") === "Active" &&
      (t.quote ?? "").trim() !== "" &&
      (t.name ?? "").trim() !== "",
  );
  return Response.json({ data: active });
}
