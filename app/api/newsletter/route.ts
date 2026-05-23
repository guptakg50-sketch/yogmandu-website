import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { verifyTurnstile } from "@/lib/turnstile";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`newsletter:${ip}`, { limit: 10, windowMs: 60 * 60 * 1000 });
  if (!allowed) {
    return Response.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "Invalid request." }, { status: 400 });

  const captcha = await verifyTurnstile(body?.captchaToken, ip);
  if (!captcha.ok) return Response.json({ error: captcha.error }, { status: 400 });

  const email  = String(body?.email  ?? "").toLowerCase().trim().slice(0, 200);
  const source = String(body?.source ?? "footer").slice(0, 40);

  if (!email || !EMAIL_RE.test(email)) {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (!isSupabaseConfigured) {
    // Acknowledge but log — site still works without Supabase.
    console.warn("[newsletter] Supabase not configured; subscription dropped:", email);
    return Response.json({ ok: true });
  }

  const supabase = getSupabaseAdmin();
  const { error, data } = await supabase
    .from("yogmandu_newsletter_subscribers")
    .upsert(
      { email, source, ip_hash: Buffer.from(ip).toString("base64").slice(0, 32) },
      { onConflict: "email", ignoreDuplicates: false }
    )
    .select("created_at")
    .single();

  if (error) {
    console.error("[newsletter] insert failed:", error.message);
    // Don't reveal duplicate detection — treat as success.
    return Response.json({ ok: true });
  }

  // If created_at is older than a couple of seconds, this was an existing subscriber.
  const alreadySubscribed = data?.created_at
    ? Date.now() - new Date(data.created_at).getTime() > 5000
    : false;

  return Response.json({ ok: true, alreadySubscribed });
}
