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

  // Drop-in is the only service booked for a specific slot, so the studio
  // needs to know which one. Built from the live schedule: one entry per
  // class per day it runs, ordered the way the timetable reads.
  const DAY_ORDER = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const to12h = (t: string) => {
    const [h, m] = (t || "").split(":").map(Number);
    if (Number.isNaN(h)) return t;
    const suffix = h < 12 ? "AM" : "PM";
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${String(m ?? 0).padStart(2, "0")} ${suffix}`;
  };
  const dropInClasses = (sessions ?? [])
    .flatMap((s) => (s.days ?? []).map((day) => ({
      day,
      startTime: s.startTime,
      label: `${day} · ${to12h(s.startTime)}${s.endTime ? `–${to12h(s.endTime)}` : ""} · ${s.name}`,
    })))
    .filter((c) => c.day && c.startTime)
    .sort((a, b) =>
      (DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)) ||
      a.startTime.localeCompare(b.startTime))
    .map((c) => c.label);

  return <BookClient teachers={teachers} classPhotos={classPhotos} dropInClasses={dropInClasses} />;
}
