import { requireAdminSession } from "@/lib/adminAuth";
import { getStorageBucket, getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authError = await requireAdminSession();
  if (authError) return authError;
  if (!isSupabaseConfigured) {
    return Response.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const caption = String(formData.get("caption") || "Uploaded image");
  const usedBy = String(formData.get("usedBy") || "");

  if (!(file instanceof File)) {
    return Response.json({ error: "Missing image file." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const bucket = getStorageBucket();
  const extension = file.name.split(".").pop() || "jpg";
  const path = `admin/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: "31536000",
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) return Response.json({ error: uploadError.message }, { status: 500 });

  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(path);
  const item = {
    id: crypto.randomUUID(),
    url: publicUrlData.publicUrl,
    path,
    caption,
    usedBy,
    createdAt: new Date().toISOString(),
  };

  const { error: insertError } = await supabase.from("yogmandu_media").insert({
    id: item.id,
    url: item.url,
    caption,
    used_by: usedBy,
    data: item,
  });

  if (insertError) return Response.json({ error: insertError.message }, { status: 500 });

  return Response.json({ data: item });
}
