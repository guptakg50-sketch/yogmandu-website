import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import { sanitizeDeep } from "@/lib/sanitize";
import { sendBookingAck, sendBookingNotify } from "@/lib/email";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed } = rateLimit(`book:${ip}`, { limit: 10, windowMs: 60 * 60 * 1000 });
  if (!allowed) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name          = String(body.name          ?? "").trim().slice(0, 100);
  const email         = String(body.email         ?? "").toLowerCase().trim().slice(0, 200);
  const phone         = String(body.phone         ?? "").trim().slice(0, 30);
  const serviceId     = String(body.serviceId     ?? "").trim().slice(0, 60);
  const serviceTitle  = String(body.serviceTitle  ?? "").trim().slice(0, 120);
  const preferredDate = String(body.preferredDate ?? "").trim().slice(0, 20);
  const message       = String(body.message       ?? "").trim().slice(0, 1000);

  if (!name || name.length < 2)
    return Response.json({ error: "Full name is required." }, { status: 400 });
  if (!email || !EMAIL_RE.test(email))
    return Response.json({ error: "A valid email address is required." }, { status: 400 });
  if (!serviceId || !serviceTitle)
    return Response.json({ error: "Please select a service." }, { status: 400 });

  const sanitized = sanitizeDeep({ name, email, phone, serviceId, serviceTitle, preferredDate, message }) as {
    name: string; email: string; phone: string; serviceId: string; serviceTitle: string;
    preferredDate: string; message: string;
  };

  // Save to Supabase
  if (isSupabaseConfigured) {
    try {
      const supabase = getSupabaseAdmin();
      await supabase.from("yogmandu_bookings").insert({
        name:           sanitized.name,
        email:          sanitized.email,
        phone:          sanitized.phone || null,
        service_id:     sanitized.serviceId,
        service_title:  sanitized.serviceTitle,
        preferred_date: sanitized.preferredDate || null,
        message:        sanitized.message || null,
        status:         "pending",
        ip_hash:        Buffer.from(ip).toString("base64").slice(0, 32),
        created_at:     new Date().toISOString(),
      });
    } catch (err) {
      console.error("[book] supabase insert failed:", err);
      // Non-fatal — still send emails
    }
  }

  // Send emails in parallel — failures are non-fatal
  await Promise.allSettled([
    sendBookingNotify({
      name:          sanitized.name,
      email:         sanitized.email,
      phone:         sanitized.phone,
      serviceTitle:  sanitized.serviceTitle,
      preferredDate: sanitized.preferredDate,
      message:       sanitized.message,
    }),
    sendBookingAck({
      to:            sanitized.email,
      name:          sanitized.name,
      serviceTitle:  sanitized.serviceTitle,
      preferredDate: sanitized.preferredDate,
    }),
  ]);

  return Response.json({ ok: true });
}
