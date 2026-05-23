import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { hashToken } from "@/lib/tokens";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`verify:${ip}`, { limit: 20, windowMs: 60 * 60 * 1000 });
  if (!allowed) {
    return Response.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const token = String(body?.token ?? "");
  if (!token || token.length < 32) {
    return Response.json({ error: "Invalid verification link." }, { status: 400 });
  }

  const hash = hashToken(token);
  const supabase = getSupabaseAdmin();

  const { data: user } = await supabase
    .from("yogmandu_users")
    .select("id, email_verified, verification_token_expires_at")
    .eq("verification_token_hash", hash)
    .single();

  if (!user) {
    return Response.json({ error: "This verification link is invalid or has expired." }, { status: 400 });
  }
  if (user.email_verified) {
    return Response.json({ ok: true, alreadyVerified: true });
  }
  if (
    user.verification_token_expires_at &&
    new Date(user.verification_token_expires_at).getTime() < Date.now()
  ) {
    return Response.json({ error: "This verification link has expired." }, { status: 400 });
  }

  const { error } = await supabase
    .from("yogmandu_users")
    .update({
      email_verified: true,
      email_verified_at: new Date().toISOString(),
      verification_token_hash: "",
      verification_token_expires_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return Response.json({ error: "Failed to verify email." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
