import BookClient from "./BookClient";
import { getInstructors, getActiveSessions, isInstructorVisible } from "@/lib/publicData";

// Photos come from the same admin records as the rest of the site, so a teacher
// portrait or class picture uploaded in the admin shows up on the booking form
// without any extra step.
export const revalidate = 300;

export default async function BookPage() {
  const [instructors, sessions] = await Promise.all([
    getInstructors().catch(() => null),
    getActiveSessions().catch(() => null),
  ]);

  const teachers = (instructors ?? [])
    .filter(isInstructorVisible)
    .map((i) => ({ name: i.name, photo: i.photo || i.photos?.[0] || "" }))
    .filter((t) => t.name && t.photo);

  const classPhotos = (sessions ?? [])
    .map((s) => ({ name: s.name, image: s.image || s.gallery?.[0]?.url || "" }))
    .filter((c) => c.name && c.image);

  return <BookClient teachers={teachers} classPhotos={classPhotos} />;
}
