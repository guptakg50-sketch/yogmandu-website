/**
 * Seed script — pushes the correct Yogmandu class schedule into Supabase.
 * Run once (or whenever the schedule changes):
 *   node scripts/seed-sessions.mjs
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
function slug(id) { return id; }

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

function typeFor(name) {
  if (name.includes("Training"))            return "Training";
  if (name.includes("Online"))              return "Online";
  return "Drop-in";
}

function levelFor(name, instructor) {
  if (name.includes("Training"))            return "Advanced";
  if (name.includes("Ashtanga") || name.includes("Power")) return "Intermediate";
  return "All levels";
}

function make(id, day, timeDisplay, name, instructor, duration, priority) {
  return {
    id,
    slug: id,
    name,
    shortDescription: `${name} with ${instructor}`,
    type: typeFor(name),
    styles: styleFor(name),
    level: levelFor(name),
    days: [day],
    startTime: timeDisplay,   // full range string for display
    endTime: "",
    duration,
    instructorId: instructor, // resolveInstructor falls back to the raw string
    price: name.includes("Training") ? 0 : 500,
    status: "Active",
    featured: false,
    homepage: false,
    priority,
  };
}

// ── Schedule data (from yogmandu.com/book-a-class, May 2026) ─────────────────
const sessions = [
  // ── Sunday ─────────────────────────────────────────────────────────────────
  make("sun-0530-flexibility",      "Sun", "5:30 – 6:30 AM",          "Flexibility Yoga",           "Baikuntha Paudel",      60,  10),
  make("sun-0630-ashtanga",         "Sun", "6:30 – 7:30 AM",          "Ashtanga Vinyasa Yoga",      "Baikuntha Paudel",      60,  20),
  make("sun-0630-asana-online",     "Sun", "6:30 – 7:30 AM (Online)", "Asana & Meditation",         "Sudha Rajouria",        60,  25),
  make("sun-0630-training",         "Sun", "6:30 – 9:00 AM",          "Yoga Teacher's Training",    "Dr. Chintamani Gautam", 150, 30),
  make("sun-0930-power",            "Sun", "9:30 – 10:30 AM",         "Power Yoga",                 "Soniya Shahi",          60,  40),
  make("sun-1500-training",         "Sun", "3:00 – 5:30 PM",          "Yoga Teacher's Training",    "Arjun Rakhal Magar",    150, 50),
  make("sun-1730-hatha",            "Sun", "5:30 – 6:30 PM",          "Hatha Yoga",                 "Love Thakur",           60,  60),
  make("sun-2030-meditation",       "Sun", "8:30 – 9:30 PM",          "Online Zoom Meditation",     "Bhadra Rana",           60,  70),

  // ── Monday ─────────────────────────────────────────────────────────────────
  make("mon-0530-hatha",            "Mon", "5:30 – 6:30 AM",          "Hatha Yoga",                 "Soniya Shahi",          60,  10),
  make("mon-0630-flexibility",      "Mon", "6:30 – 7:30 AM",          "Flexibility Yoga",           "Soniya Shahi",          60,  20),
  make("mon-0630-power-online",     "Mon", "6:30 – 7:30 AM (Online)", "Power Yoga",                 "Kanchan Manandhar",     60,  25),
  make("mon-0630-training",         "Mon", "6:30 – 9:00 AM",          "Yoga Teachers Training",     "Dr. Chintamani Gautam", 150, 30),
  make("mon-0930-pranayama",        "Mon", "9:30 – 10:30 AM",         "Pranayama & Surya Namaskar", "Sushmita Lama",         60,  40),
  make("mon-1500-training",         "Mon", "3:00 – 5:30 PM",          "Yoga Teachers Training",     "Arjun Rakhal Magar",    150, 50),
  make("mon-1730-pranayama",        "Mon", "5:30 – 6:30 PM",          "Pranayama & Surya Namaskar", "Baikuntha Paudel",      60,  60),
  make("mon-2030-meditation",       "Mon", "8:30 – 9:30 PM",          "Online Zoom Meditation",     "Paribesh Malla",        60,  70),

  // ── Tuesday ────────────────────────────────────────────────────────────────
  make("tue-0530-power",            "Tue", "5:30 – 6:30 AM",          "Power Yoga",                 "Arjun Neupane",         60,  10),
  make("tue-0630-hatha",            "Tue", "6:30 – 7:30 AM",          "Hatha Yoga",                 "Arjun Neupane",         60,  20),
  make("tue-0630-ashtanga-online",  "Tue", "6:30 – 7:30 AM (Online)", "Ashtanga Vinyasa",           "Soniya Shahi",          60,  25),
  make("tue-0630-training",         "Tue", "6:30 – 9:00 AM",          "Yoga Teachers Training",     "Arjun Rakhal Magar",    150, 30),
  make("tue-0930-flexibility",      "Tue", "9:30 – 10:30 AM",         "Flexibility Yoga",           "Biku Magar",            60,  40),
  make("tue-1500-training",         "Tue", "3:00 – 5:30 PM",          "Yoga Teachers Training",     "Dr. Chintamani Gautam", 150, 50),
  make("tue-1730-asana-flow",       "Tue", "5:30 – 6:30 PM",          "Asana Flow & Meditation",    "Arjun Rakhal Magar",    60,  60),
  make("tue-2030-meditation",       "Tue", "8:30 – 9:30 PM",          "Online Zoom Meditation",     "Sweta Thieng",          60,  70),

  // ── Wednesday ──────────────────────────────────────────────────────────────
  make("wed-0530-vinyasa",          "Wed", "5:30 – 6:30 AM",          "Vinyasa Flow",               "Neelina Nakarmi",       60,  10),
  make("wed-0630-power",            "Wed", "6:30 – 7:30 AM",          "Power Yoga",                 "Neelina Nakarmi",       60,  20),
  make("wed-0630-hatha-online",     "Wed", "6:30 – 7:30 AM (Online)", "Hatha Yoga",                 "Bandana Thapa",         60,  25),
  make("wed-0630-training",         "Wed", "6:30 – 9:00 AM",          "Yoga Teachers Training",     "Dr. Dipika Hada",       150, 30),
  make("wed-0930-asana-flow",       "Wed", "9:30 – 10:30 AM",         "Asana Flow & Meditation",    "Arjun Rakhal Magar",    60,  40),
  make("wed-1500-training",         "Wed", "3:00 – 5:30 PM",          "Yoga Teachers Training",     "Dr. Geeta K.C",         150, 50),
  make("wed-1730-flexibility",      "Wed", "5:30 – 6:30 PM",          "Flexibility Yoga",           "Biku Magar",            60,  60),
  make("wed-2030-meditation",       "Wed", "8:30 – 9:30 PM",          "Online Zoom Meditation",     "Arjun Rakhal Magar",    60,  70),

  // ── Thursday ───────────────────────────────────────────────────────────────
  make("thu-0530-pranayama",        "Thu", "5:30 – 6:30 AM",          "Pranayama & Surya Namaskar", "Arjun Rakhal Magar",    60,  10),
  make("thu-0630-asana-flow",       "Thu", "6:30 – 7:30 AM",          "Asana Flow & Meditation",    "Arjun Rakhal Magar",    60,  20),
  make("thu-0630-asana-online",     "Thu", "6:30 – 7:30 AM (Online)", "Asana & Pranayama",          "Sandhya Gyawali",       60,  25),
  make("thu-0630-training",         "Thu", "6:30 – 9:00 AM",          "Yoga Teachers Training",     "Dr. Geeta K.C",         150, 30),
  make("thu-0930-ashtanga",         "Thu", "9:30 – 10:30 AM",         "Ashtanga Vinyasa",           "Ushma Pandey",          60,  40),
  make("thu-1500-training",         "Thu", "3:00 – 5:30 PM",          "Yoga Teachers Training",     "Dr. Dipika Hada",       150, 50),
  make("thu-1730-vinyasa",          "Thu", "5:30 – 6:30 PM",          "Vinyasa Flow",               "Manju Lama",            60,  60),
  make("thu-2030-meditation",       "Thu", "8:30 – 9:30 PM",          "Online Zoom Meditation",     "Bandana Thapa",         60,  70),

  // ── Friday ─────────────────────────────────────────────────────────────────
  make("fri-0530-asana-flow",       "Fri", "5:30 – 6:30 AM",          "Asana Flow & Meditation",    "Arjun Rakhal Magar",    60,  10),
  make("fri-0630-pranayama",        "Fri", "6:30 – 7:30 AM",          "Pranayama & Surya Namaskar", "Arjun Rakhal Magar",    60,  20),
  make("fri-0630-power-online",     "Fri", "6:30 – 7:30 AM (Online)", "Power Yoga",                 "Mukesh Shrestha",       60,  25),
  make("fri-0630-training",         "Fri", "6:30 – 9:00 AM",          "Yoga Teachers Training",     "Arjun Neupane",         150, 30),
  make("fri-0930-hatha",            "Fri", "9:30 – 10:30 AM",         "Hatha Yoga",                 "Baikuntha Paudel",      60,  40),
  make("fri-1500-training",         "Fri", "3:00 – 5:30 PM",          "Yoga Teachers Training",     "Arjun Neupane",         150, 50),
  make("fri-1730-power",            "Fri", "5:30 – 6:30 PM",          "Power Yoga",                 "Ushma Pandey",          60,  60),
  make("fri-2030-meditation",       "Fri", "8:30 – 9:30 PM",          "Online Zoom Meditation",     "Baikuntha Paudel",      60,  70),

  // ── Saturday ───────────────────────────────────────────────────────────────
  make("sat-2030-meditation",       "Sat", "8:30 – 9:30 PM",          "Online Meditation",          "Paribesh Malla",        60,  10),
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
  console.log("   The admin panel can now edit them at /admin → Sessions.");
}

seed();
