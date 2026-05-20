"use client";
import Link from "next/link";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const schedule: Record<string, { time: string; name: string; level: string; duration: string; instructor: string; accent: string }[]> = {
  Monday: [
    { time: "06:30", name: "Morning Hatha Flow",      level: "All levels",    duration: "90 min", instructor: "Yogi Arjun",      accent: "#F7941D" },
    { time: "09:00", name: "Pranayama & Meditation",  level: "All levels",    duration: "60 min", instructor: "Dr. Dipika",      accent: "#6B2D8B" },
    { time: "17:00", name: "Vinyasa Flow",             level: "Intermediate", duration: "75 min", instructor: "Yogi Arjun",      accent: "#F7941D" },
    { time: "19:00", name: "Restorative Yoga",         level: "All levels",    duration: "60 min", instructor: "Dr. Dipika",      accent: "#8DC63F" },
  ],
  Tuesday: [
    { time: "06:30", name: "Ashtanga Primary Series", level: "Intermediate",  duration: "90 min", instructor: "Yogi Arjun",      accent: "#F7941D" },
    { time: "10:00", name: "Sound Healing Session",   level: "All levels",    duration: "60 min", instructor: "Dr. Chintamani", accent: "#6B2D8B" },
    { time: "17:30", name: "Yin Yoga",                level: "All levels",    duration: "75 min", instructor: "Dr. Dipika",      accent: "#8DC63F" },
  ],
  Wednesday: [
    { time: "06:30", name: "Morning Hatha Flow",      level: "All levels",    duration: "90 min", instructor: "Yogi Arjun",      accent: "#F7941D" },
    { time: "09:00", name: "Pranayama & Meditation",  level: "All levels",    duration: "60 min", instructor: "Dr. Dipika",      accent: "#6B2D8B" },
    { time: "11:00", name: "Tibetan Bowl Healing",    level: "All levels",    duration: "90 min", instructor: "Dr. Chintamani", accent: "#6B2D8B" },
    { time: "17:00", name: "Vinyasa Flow",             level: "Intermediate", duration: "75 min", instructor: "Yogi Arjun",      accent: "#F7941D" },
    { time: "19:00", name: "Yoga Nidra",               level: "All levels",    duration: "45 min", instructor: "Dr. Dipika",      accent: "#8DC63F" },
  ],
  Thursday: [
    { time: "06:30", name: "Ashtanga Primary Series", level: "Intermediate",  duration: "90 min", instructor: "Yogi Arjun",      accent: "#F7941D" },
    { time: "09:00", name: "Pranayama & Breathwork",  level: "All levels",    duration: "60 min", instructor: "Dr. Dipika",      accent: "#6B2D8B" },
    { time: "17:30", name: "Yin & Yang Yoga",          level: "All levels",    duration: "90 min", instructor: "Dr. Dipika",      accent: "#8DC63F" },
  ],
  Friday: [
    { time: "06:30", name: "Morning Hatha Flow",      level: "All levels",    duration: "90 min", instructor: "Yogi Arjun",      accent: "#F7941D" },
    { time: "10:00", name: "Sound Healing Session",   level: "All levels",    duration: "60 min", instructor: "Dr. Chintamani", accent: "#6B2D8B" },
    { time: "17:00", name: "Vinyasa Flow",             level: "Intermediate", duration: "75 min", instructor: "Yogi Arjun",      accent: "#F7941D" },
    { time: "19:00", name: "Restorative & Nidra",      level: "All levels",    duration: "75 min", instructor: "Dr. Dipika",      accent: "#8DC63F" },
  ],
  Saturday: [
    { time: "07:00", name: "Weekend Ashtanga",        level: "All levels",    duration: "120 min", instructor: "Yogi Arjun",      accent: "#F7941D" },
    { time: "10:00", name: "Group Sound Healing",     level: "All levels",    duration: "90 min",  instructor: "Dr. Chintamani", accent: "#6B2D8B" },
    { time: "16:00", name: "Gentle Yoga & Stretch",   level: "Beginner",      duration: "60 min",  instructor: "Dr. Dipika",      accent: "#8DC63F" },
  ],
  Sunday: [
    { time: "07:30", name: "Sunrise Meditation",      level: "All levels",    duration: "45 min",  instructor: "Dr. Dipika",      accent: "#6B2D8B" },
    { time: "09:00", name: "Slow Flow Hatha",          level: "All levels",    duration: "90 min",  instructor: "Yogi Arjun",      accent: "#F7941D" },
    { time: "15:00", name: "Tibetan Bowl Healing",    level: "All levels",    duration: "90 min",  instructor: "Dr. Chintamani", accent: "#6B2D8B" },
  ],
};

const levelColor = (level: string) => {
  if (level === "Beginner")     return { bg: "rgba(141,198,63,0.1)",  text: "#5A7A20",  border: "rgba(141,198,63,0.3)" };
  if (level === "Intermediate") return { bg: "rgba(247,148,29,0.1)",  text: "#B86010",  border: "rgba(247,148,29,0.3)" };
  return                               { bg: "rgba(107,45,139,0.08)", text: "#6B2D8B",  border: "rgba(107,45,139,0.2)" };
};

function ScheduleCard({ cls }: { cls: typeof schedule[string][0] }) {
  const lc = levelColor(cls.level);
  return (
    <div
      style={{
        padding: "1.25rem 1.4rem",
        borderRadius: "1rem",
        border: `1.5px solid ${cls.accent}20`,
        background: "#FFFFFF",
        boxShadow: "0 2px 12px rgba(42,18,8,0.05)",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = `0 8px 28px ${cls.accent}22`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 2px 12px rgba(42,18,8,0.05)";
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${cls.accent}, ${cls.accent}44)` }} />
      <div style={{ fontSize: "1.1rem", fontFamily: "Cormorant Garamond, serif",
        fontWeight: 400, color: cls.accent, marginBottom: 6, marginTop: 4 }}>
        {cls.time}
      </div>
      <div style={{ fontSize: "1rem", fontWeight: 500, color: "#2A1208", marginBottom: 8, lineHeight: 1.3 }}>
        {cls.name}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 500, padding: "2px 10px", borderRadius: 999,
          background: lc.bg, color: lc.text, border: `1px solid ${lc.border}` }}>
          {cls.level}
        </span>
        <span style={{ fontSize: "0.72rem", color: "#7A5840", display: "flex", alignItems: "center", gap: 3 }}>
          ⏱ {cls.duration}
        </span>
      </div>
      <div style={{ fontSize: "0.78rem", color: "#7A5840" }}>👤 {cls.instructor}</div>
    </div>
  );
}

export default function ScheduleGrid() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem" }}>
      {DAYS.map(day => (
        <div key={day} style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem",
              fontWeight: 400, color: "#2A1208", margin: 0 }}>
              {day}
            </h2>
            <div style={{ flex: 1, height: 1, background: "rgba(107,45,139,0.1)" }} />
            <span style={{ fontSize: "0.7rem", color: "#9A7860", letterSpacing: "0.12em" }}>
              {schedule[day].length} {schedule[day].length === 1 ? "class" : "classes"}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
            {schedule[day].map((cls, i) => <ScheduleCard key={i} cls={cls} />)}
          </div>
        </div>
      ))}

      {/* CTA strip */}
      <div style={{
        background: "linear-gradient(135deg, #F7941D 0%, #E07800 100%)",
        padding: "3.5rem 2rem", textAlign: "center",
        borderRadius: "1.5rem", marginTop: "1rem",
      }}>
        <h2 style={{ fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 300,
          color: "#FFFFFF", margin: "0 0 12px" }}>
          Ready to join a class?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.95rem", marginBottom: 24 }}>
          Drop in any time — or get in touch to reserve your spot.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" className="cta-lift" style={{
            padding: "0.8rem 2rem", borderRadius: 999, background: "#FFFFFF",
            color: "#F7941D", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}>
            Book Now
          </Link>
          <Link href="/yoga-teacher-training" className="cta-lift" style={{
            padding: "0.8rem 2rem", borderRadius: 999,
            border: "2px solid rgba(255,255,255,0.6)", color: "#FFFFFF",
            fontSize: "0.9rem", fontWeight: 400, textDecoration: "none" }}>
            Teacher Training
          </Link>
          <Link href="/sound-healing-therapy" className="cta-lift" style={{
            padding: "0.8rem 2rem", borderRadius: 999,
            border: "2px solid rgba(255,255,255,0.6)", color: "#FFFFFF",
            fontSize: "0.9rem", fontWeight: 400, textDecoration: "none" }}>
            Sound Healing
          </Link>
        </div>
      </div>
    </div>
  );
}
