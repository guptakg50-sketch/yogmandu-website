import { clearUserSessionCookie } from "@/lib/userAuth";

export const dynamic = "force-dynamic";

export async function POST() {
  await clearUserSessionCookie();
  return Response.json({ ok: true });
}
