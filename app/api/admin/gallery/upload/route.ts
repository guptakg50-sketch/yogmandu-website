import { requireAdminSession } from "@/lib/adminAuth";
import { getStorageBucket, getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const ALLOWED_CATEGORIES = ["Yoga", "Sound Healing", "Certificates"] as const;
type Category = (typeof ALLOWED_CATEGORIES)[number];

function sanitizeCategory(value: string): Category {
  return (ALLOWED_CATEGORIES as readonly string[]).includes(value) ? (value as Category) : "Yoga";
}

export async function POST(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const formData = await request.formData();
  const file     = formData.get("file");
  const title    = String(formData.get("title") || "").slice(0, 120);
  const category = sanitizeCategory(String(formData.get("category") || "Yoga"));

  if (!(file instanceof File)) {
    return Response.json({ error: "Missing image file." }, { status: 400 });
  }

  const supabase  = getSupabaseAdmin();
  const bucket    = getStorageBucket();
  const extension = file.name.split(".").pop() || "jpg";
  const path      = `gallery/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "31536000",
      contentType:  file.type,
      upsert:       false,
    });

  if (uploadError) return Response.json({ error: uploadError.message }, { status: 500 });

  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(path);

  const { count } = await supabase
    .from("yogmandu_gallery_items")
    .select("id", { count: "exact", head: true });

  const item = {
    id:           crypto.randomUUID(),
    url:          publicUrlData.publicUrl,
    path,
    title:        title || "Untitled",
    category,
    displayOrder: count ?? 0,
    createdAt:    new Date().toISOString(),
  };

  const { error: insertError } = await supabase.from("yogmandu_gallery_items").insert({
    id:            item.id,
    url:           item.url,
    path:          item.path,
    title:         item.title,
    category:      item.category,
    display_order: item.displayOrder,
    data:          item,
  });

  if (insertError) return Response.json({ error: insertError.message }, { status: 500 });

  return Response.json({ data: item });
}
