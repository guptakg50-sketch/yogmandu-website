import { getUserSession } from "@/lib/userAuth";
import { getUserById } from "@/lib/supabaseUsers";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getUserSession();
  if (!session) return Response.json({ user: null });

  const user = await getUserById(session.userId);
  if (!user) return Response.json({ user: null });

  return Response.json({ user });
}
