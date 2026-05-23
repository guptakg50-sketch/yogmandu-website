import { getUserSession } from "@/lib/userAuth";
import { getUserById } from "@/lib/supabaseUsers";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { generateToken } from "@/lib/tokens";
import { sendVerifyEmail } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const VERIFY_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yogmandu.com";

export async function POST(request: Request) {
  const session = await getUserSession();
  if (!session) return Response.json({ error: "Not authenticated." }, { status: 401 });

  const ip = getClientIp(request);
  const { allowed } = rateLimit(`resend-verify:${session.userId}:${ip}`, {
    limit: 3,
    windowMs: 60 * 60 * 1000,
  });
  if (!allowed) {
    return Response.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  const user = await getUserById(session.userId);
  if (!user) return Response.json({ error: "User not found." }, { status: 404 });

  const supabase = getSupabaseAdmin();
  // If already verified, refresh nothing.
  const { data: row } = await supabase
    .from("yogmandu_users")
    .select("email_verified")
    .eq("id", user.id)
    .single();
  if (row?.email_verified) {
    return Response.json({ ok: true, alreadyVerified: true });
  }

  const { token, hash } = generateToken();
  const expiresAt = new Date(Date.now() + VERIFY_TTL_MS).toISOString();

  const { error } = await supabase
    .from("yogmandu_users")
    .update({
      verification_token_hash: hash,
      verification_token_expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return Response.json({ error: "Failed to issue verification token." }, { status: 500 });
  }

  await sendVerifyEmail({
    to:        user.email,
    fullName:  user.full_name,
    verifyUrl: `${SITE_URL}/account/verify-email?token=${token}`,
  });

  return Response.json({ ok: true });
}
