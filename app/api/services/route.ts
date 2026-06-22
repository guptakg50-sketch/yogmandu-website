import { getServices } from "@/lib/publicData";

export const dynamic = "force-dynamic";

// Public endpoint consumed by the About page "Our services" grid.
// Returns only active services that have a label. When Supabase is
// unconfigured or the table is empty, returns an empty array so the
// component falls back to its built-in default list.
export async function GET() {
  const list = await getServices();
  const active = (list ?? []).filter(
    (s) =>
      (s.status ?? "Active") === "Active" &&
      (s.label ?? "").trim() !== "",
  );
  return Response.json({ data: active });
}
