/**
 * Seed script — pushes the correct Yogmandu class schedule into Supabase.
 * Re-run whenever the schedule changes (upserts by ID — no duplicates):
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/seed-sessions.mjs
 *
 * startTime / endTime use 24-hour HH:MM so they work with the admin editor's
 * <input type="time"> fields. The schedule page formats them for display automatically.
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env");
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ── helpers ───────────────────────────────────────────────────────────────────
function styleFor(name) {
  if (name.includes("Hatha"))               return ["Hatha"];
  if (name.includes("Ashtanga Vinyasa"))    return ["Ashtanga Vinyasa"];
  if (name.includes("Ashtanga"))            return ["Ashtanga"];
  if (name.includes("Vinyasa Flow"))        return ["Vinyasa Flow"];
  if (name.includes("Vinyasa"))             return ["Vinyasa"];
  if (name.includes("Power Yoga"))          return ["Power Yoga"];
  if (name.includes("Flexibility"))         return ["Flexibility Yoga"];
  if (name.includes("Pranayama & Surya"))   return ["Pranayama & Surya Namaskar"];
  if (name.includes("Asana Flow"))          return ["Asana Flow & Meditation"];
  if (name.includes("Asana & Meditation"))  return ["Asana & Meditation"];
  if (name.includes("Asana & Pranayama"))   return ["Asana & Pranayama"];
  if (name.includes("Teacher"))             return ["Yoga Teachers Training"];
  if (name.includes("Meditation"))          return ["Meditation"];
  return ["Yoga"];
}

function typeFor(name, location) {
  if (name.includes("Training"))            return "Training";
  if (location === "Online")                return "Online";
  return "Drop-in";
}

function levelFor(name) {
  if (name.includes("Training"))            return "Advanced";
  if (name.includes("Ashtanga") || name.includes("Power")) return "Intermediate";
  return "All levels";
}

/**
 * @param {string} id        unique session ID
 * @param {string} day       "Sun" | "Mon" | ... | "Sat"
 * @param {string} startTime HH:MM 24-hour (e.g. "05:30")
 * @param {string} endTime   HH:MM 24-hour (e.g. "06:30")
 * @param {string} name      class name
 * @param {string} instructor full instructor name (used as instructorId)
 * @param {number} duration  minutes
 * @param {string} location  "In-studio" | "Online"
 * @param {number} priority  display order within the day
 */
function make(id, day, startTime, endTime, name, instructor, duration, location, priority) {
  return {
    id,
    slug:             id,
    name,
    shortDescription: `${name} with ${instructor}`,
    type:             typeFor(name, location),
    styles:           styleFor(name),
    level:            levelFor(name),
    days:             [day],
    startTime,        // HH:MM — admin editor <input type="time"> compatible
    endTime,          // HH:MM
    duration,
    instructorId:     instructor, // resolveInstructor() shows name directly as fallback
    location,
    price:            name.includes("Training") ? 0 : 500,
    status:           "Active",
    featured:         false,
    homepage:         false,
    priority,
  };
}

// ── Schedule data — from yogmandu.com/book-a-class (May 2026) ─────────────────
// Times are 24-hour HH:MM.  Online classes have location="Online".
const sessions = [
  // ── Sunday ─────────────────────────────────────────────────────────────────
  make("sun-0530-flexibility",      "Sun", "05:30","06:30", "Flexibility Yoga",           "Baikuntha Paudel",      60, "In-studio", 10),
  make("sun-0630-ashtanga",         "Sun", "06:30","07:30", "Ashtanga Vinyasa Yoga",      "Baikuntha Paudel",      60, "In-studio", 20),
  make("sun-0630-asana-online",     "Sun", "06:30","07:30", "Asana & Meditation",         "Sudha Rajouria",        60, "Online",    25),
  make("sun-0630-training",         "Sun", "06:30","09:00", "Yoga Teacher's Training",    "Dr. Chintamani Gautam", 150,"In-studio", 30),
  make("sun-0930-power",            "Sun", "09:30","10:30", "Power Yoga",                 "Soniya Shahi",          60, "In-studio", 40),
  make("sun-1500-training",         "Sun", "15:00","17:30", "Yoga Teacher's Training",    "Arjun Rakhal Magar",    150,"In-studio", 50),
  make("sun-1730-hatha",            "Sun", "17:30","18:30", "Hatha Yoga",                 "Love Thakur",           60, "In-studio", 60),
  make("sun-2030-meditation",       "Sun", "20:30","21:30", "Online Zoom Meditation",     "Bhadra Rana",           60, "Online",    70),

  // ── Monday ─────────────────────────────────────────────────────────────────
  make("mon-0530-hatha",            "Mon", "05:30","06:30", "Hatha Yoga",                 "Soniya Shahi",          60, "In-studio", 10),
  make("mon-0630-flexibility",      "Mon", "06:30","07:30", "Flexibility Yoga",           "Soniya Shahi",          60, "In-studio", 20),
  make("mon-0630-power-online",     "Mon", "06:30","07:30", "Power Yoga",                 "Kanchan Manandhar",     60, "Online",    25),
  make("mon-0630-training",         "Mon", "06:30","09:00", "Yoga Teachers Training",     "Dr. Chintamani Gautam", 150,"In-studio", 30),
  make("mon-0930-pranayama",        "Mon", "09:30","10:30", "Pranayama & Surya Namaskar", "Sushmita Lama",         60, "In-studio", 40),
  make("mon-1500-training",         "Mon", "15:00","17:30", "Yoga Teachers Training",     "Arjun Rakhal Magar",    150,"In-studio", 50),
  make("mon-1730-pranayama",        "Mon", "17:30","18:30", "Pranayama & Surya Namaskar", "Baikuntha Paudel",      60, "In-studio", 60),
  make("mon-2030-meditation",       "Mon", "20:30","21:30", "Online Zoom Meditation",     "Paribesh Malla",        60, "Online",    70),

  // ── Tuesday ────────────────────────────────────────────────────────────────
  make("tue-0530-power",            "Tue", "05:30","06:30", "Power Yoga",                 "Arjun Neupane",         60, "In-studio", 10),
  make("tue-0630-hatha",            "Tue", "06:30","07:30", "Hatha Yoga",                 "Arjun Neupane",         60, "In-studio", 20),
  make("tue-0630-ashtanga-online",  "Tue", "06:30","07:30", "Ashtanga Vinyasa",           "Soniya Shahi",          60, "Online",    25),
  make("tue-0630-training",         "Tue", "06:30","09:00", "Yoga Teachers Training",     "Arjun Rakhal Magar",    150,"In-studio", 30),
  make("tue-0930-flexibility",      "Tue", "09:30","10:30", "Flexibility Yoga",           "Biku Magar",            60, "In-studio", 40),
  make("tue-1500-training",         "Tue", "15:00","17:30", "Yoga Teachers Training",     "Dr. Chintamani Gautam", 150,"In-studio", 50),
  make("tue-1730-asana-flow",       "Tue", "17:30","18:30", "Asana Flow & Meditation",    "Arjun Rakhal Magar",    60, "In-studio", 60),
  make("tue-2030-meditation",       "Tue", "20:30","21:30", "Online Zoom Meditation",     "Sweta Thieng",          60, "Online",    70),

  // ── Wednesday ──────────────────────────────────────────────────────────────
  make("wed-0530-vinyasa",          "Wed", "05:30","06:30", "Vinyasa Flow",               "Neelina Nakarmi",       60, "In-studio", 10),
  make("wed-0630-power",            "Wed", "06:30","07:30", "Power Yoga",                 "Neelina Nakarmi",       60, "In-studio", 20),
  make("wed-0630-hatha-online",     "Wed", "06:30","07:30", "Hatha Yoga",                 "Bandana Thapa",         60, "Online",    25),
  make("wed-0630-training",         "Wed", "06:30","09:00", "Yoga Teachers Training",     "Dr. Dipika Hada",       150,"In-studio", 30),
  make("wed-0930-asana-flow",       "Wed", "09:30","10:30", "Asana Flow & Meditation",    "Arjun Rakhal Magar",    60, "In-studio", 40),
  make("wed-1500-training",         "Wed", "15:00","17:30", "Yoga Teachers Training",     "Dr. Geeta K.C",         150,"In-studio", 50),
  make("wed-1730-flexibility",      "Wed", "17:30","18:30", "Flexibility Yoga",           "Biku Magar",            60, "In-studio", 60),
  make("wed-2030-meditation",       "Wed", "20:30","21:30", "Online Zoom Meditation",     "Arjun Rakhal Magar",    60, "Online",    70),

  // ── Thursday ───────────────────────────────────────────────────────────────
  make("thu-0530-pranayama",        "Thu", "05:30","06:30", "Pranayama & Surya Namaskar", "Arjun Rakhal Magar",    60, "In-studio", 10),
  make("thu-0630-asana-flow",       "Thu", "06:30","07:30", "Asana Flow & Meditation",    "Arjun Rakhal Magar",    60, "In-studio", 20),
  make("thu-0630-asana-online",     "Thu", "06:30","07:30", "Asana & Pranayama",          "Sandhya Gyawali",       60, "Online",    25),
  make("thu-0630-training",         "Thu", "06:30","09:00", "Yoga Teachers Training",     "Dr. Geeta K.C",         150,"In-studio", 30),
  make("thu-0930-ashtanga",         "Thu", "09:30","10:30", "Ashtanga Vinyasa",           "Ushma Pandey",          60, "In-studio", 40),
  make("thu-1500-training",         "Thu", "15:00","17:30", "Yoga Teachers Training",     "Dr. Dipika Hada",       150,"In-studio", 50),
  make("thu-1730-vinyasa",          "Thu", "17:30","18:30", "Vinyasa Flow",               "Manju Lama",            60, "In-studio", 60),
  make("thu-2030-meditation",       "Thu", "20:30","21:30", "Online Zoom Meditation",     "Bandana Thapa",         60, "Online",    70),

  // ── Friday ─────────────────────────────────────────────────────────────────
  make("fri-0530-asana-flow",       "Fri", "05:30","06:30", "Asana Flow & Meditation",    "Arjun Rakhal Magar",    60, "In-studio", 10),
  make("fri-0630-pranayama",        "Fri", "06:30","07:30", "Pranayama & Surya Namaskar", "Arjun Rakhal Magar",    60, "In-studio", 20),
  make("fri-0630-power-online",     "Fri", "06:30","07:30", "Power Yoga",                 "Mukesh Shrestha",       60, "Online",    25),
  make("fri-0630-training",         "Fri", "06:30","09:00", "Yoga Teachers Training",     "Arjun Neupane",         150,"In-studio", 30),
  make("fri-0930-hatha",            "Fri", "09:30","10:30", "Hatha Yoga",                 "Baikuntha Paudel",      60, "In-studio", 40),
  make("fri-1500-training",         "Fri", "15:00","17:30", "Yoga Teachers Training",     "Arjun Neupane",         150,"In-studio", 50),
  make("fri-1730-power",            "Fri", "17:30","18:30", "Power Yoga",                 "Ushma Pandey",          60, "In-studio", 60),
  make("fri-2030-meditation",       "Fri", "20:30","21:30", "Online Zoom Meditation",     "Baikuntha Paudel",      60, "Online",    70),

  // ── Saturday ───────────────────────────────────────────────────────────────
  make("sat-2030-meditation",       "Sat", "20:30","21:30", "Online Meditation",          "Paribesh Malla",        60, "Online",    10),
];

// ── Upsert into Supabase ──────────────────────────────────────────────────────
async function seed() {
  console.log(`Seeding ${sessions.length} sessions…`);

  const rows = sessions.map((s) => ({
    id:            s.id,
    slug:          s.slug,
    name:          s.name,
    type:          s.type,
    status:        s.status,
    display_order: s.priority,
    data:          s,
    updated_at:    new Date().toISOString(),
  }));

  const { error } = await sb.from("yogmandu_sessions").upsert(rows, { onConflict: "id" });

  if (error) {
    console.error("❌ Upsert failed:", error.message);
    process.exit(1);
  }

  console.log(`✅ ${sessions.length} sessions written to Supabase.`);
  console.log("   Start/end times are now HH:MM — admin editor time fields work correctly.");
}

seed();
