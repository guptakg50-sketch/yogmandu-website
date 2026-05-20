import { getUserSession } from "@/lib/userAuth";
import { updateUserProfile } from "@/lib/supabaseUsers";

export const dynamic = "force-dynamic";

const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export async function PATCH(request: Request) {
  const session = await getUserSession();
  if (!session) return Response.json({ error: "Not authenticated." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "Invalid request." }, { status: 400 });

  const updates: Record<string, string> = {};

  if (typeof body.full_name === "string") {
    const name = body.full_name.trim().slice(0, 100);
    if (name.length < 2) return Response.json({ error: "Name must be at least 2 characters." }, { status: 400 });
    updates.full_name = name;
  }
  if (typeof body.phone === "string") {
    updates.phone = body.phone.trim().slice(0, 20);
  }
  if (typeof body.nationality === "string") {
    updates.nationality = body.nationality.trim().slice(0, 80);
  }
  if (typeof body.bio === "string") {
    updates.bio = body.bio.trim().slice(0, 500);
  }
  if (typeof body.experience_level === "string") {
    if (!EXPERIENCE_LEVELS.includes(body.experience_level)) {
      return Response.json({ error: "Invalid experience level." }, { status: 400 });
    }
    updates.experience_level = body.experience_level;
  }

  const user = await updateUserProfile(session.userId, updates);
  if (!user) return Response.json({ error: "Update failed." }, { status: 500 });

  return Response.json({ user });
}
