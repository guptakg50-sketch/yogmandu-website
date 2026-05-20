import { getUserSession, verifyPassword, hashPassword } from "@/lib/userAuth";
import { getUserById } from "@/lib/supabaseUsers";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getUserSession();
  if (!session) return Response.json({ error: "Not authenticated." }, { status: 401 });

  const ip = getClientIp(request);
  const { allowed } = rateLimit(`password-change:${session.userId}:${ip}`, {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });
  if (!allowed) return Response.json({ error: "Too many attempts. Try again later." }, { status: 429 });

  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "Invalid request." }, { status: 400 });

  const currentPassword = String(body.current_password ?? "").slice(0, 1000);
  const newPassword     = String(body.new_password     ?? "").slice(0, 1000);

  if (!currentPassword || !newPassword) {
    return Response.json({ error: "Both current and new password are required." }, { status: 400 });
  }
  if (newPassword.length < 8) {
    return Response.json({ error: "New password must be at least 8 characters." }, { status: 400 });
  }

  // Fetch stored hash to verify current password
  const supabase = getSupabaseAdmin();
  const { data: row } = await supabase
    .from("yogmandu_users")
    .select("password_hash")
    .eq("id", session.userId)
    .single();

  if (!row) return Response.json({ error: "User not found." }, { status: 404 });

  const ok = await verifyPassword(currentPassword, row.password_hash);
  if (!ok) return Response.json({ error: "Current password is incorrect." }, { status: 401 });

  const newHash = await hashPassword(newPassword);
  const { error } = await supabase
    .from("yogmandu_users")
    .update({ password_hash: newHash, updated_at: new Date().toISOString() })
    .eq("id", session.userId);

  if (error) return Response.json({ error: "Failed to update password." }, { status: 500 });

  return Response.json({ ok: true });
}
