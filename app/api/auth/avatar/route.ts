import { getUserSession } from "@/lib/userAuth";
import { updateUserProfile } from "@/lib/supabaseUsers";
import { getSupabaseAdmin, getStorageBucket } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED  = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: Request) {
  const session = await getUserSession();
  if (!session) return Response.json({ error: "Not authenticated." }, { status: 401 });

  const formData = await request.formData().catch(() => null);
  if (!formData) return Response.json({ error: "Invalid request." }, { status: 400 });

  const file = formData.get("avatar");
  if (!(file instanceof File)) return Response.json({ error: "No file provided." }, { status: 400 });

  if (!ALLOWED.includes(file.type)) {
    return Response.json({ error: "Only JPEG, PNG, WebP, or GIF images are allowed." }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return Response.json({ error: "Image must be under 5 MB." }, { status: 400 });
  }

  const ext       = file.type.split("/")[1].replace("jpeg", "jpg");
  const path      = `avatars/${session.userId}.${ext}`;
  const buffer    = Buffer.from(await file.arrayBuffer());
  const supabase  = getSupabaseAdmin();
  const bucket    = getStorageBucket();

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) return Response.json({ error: "Upload failed: " + error.message }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  // Bust cache by appending a timestamp
  const avatar_url = `${publicUrl}?t=${Date.now()}`;

  const user = await updateUserProfile(session.userId, { avatar_url });
  if (!user) return Response.json({ error: "Failed to save avatar URL." }, { status: 500 });

  return Response.json({ avatar_url });
}
