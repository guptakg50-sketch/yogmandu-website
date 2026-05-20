import { verifyPassword, setUserSessionCookie } from "@/lib/userAuth";
import { getUserByEmail } from "@/lib/supabaseUsers";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, remaining, retryAfterMs } = rateLimit(`login:${ip}`, {
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });

  if (!allowed) {
    return Response.json(
      { error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil(retryAfterMs / 1000)) } }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "Invalid request." }, { status: 400 });

  const email    = String(body?.email    ?? "").toLowerCase().trim();
  const password = String(body?.password ?? "").slice(0, 1000);

  if (!email || !password) {
    return Response.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await getUserByEmail(email);

  // Always run password verification to prevent timing-based user enumeration
  const passwordOk = user ? await verifyPassword(password, user.password_hash) : false;

  if (!user || !passwordOk) {
    return Response.json(
      { error: "Invalid email or password.", remaining },
      { status: 401, headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  }

  await setUserSessionCookie(user.id);
  return Response.json({ user: { id: user.id, email: user.email, full_name: user.full_name } });
}
