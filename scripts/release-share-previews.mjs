#!/usr/bin/env node
/**
 * release-share-previews.mjs
 *
 * Hands control of a page's share text (meta description, og/twitter title and
 * description) back to the code defaults in lib/shareContent.ts.
 *
 * The admin share-preview screen once saved a snapshot of all 36 pages into the
 * `content:section:SHARE_PREVIEWS` row, so the stored text still overrides the
 * code for every page (see getSharePages in lib/pageContent.ts). This removes
 * only the listed paths from that snapshot; every other page keeps exactly what
 * is stored. Run it AFTER the deploy that carries the new code defaults, or the
 * live pages fall back to the old bundle's text.
 *
 * Dry run (default) prints what would change. A JSON backup of the whole row is
 * written before any update.
 *
 *   node --env-file=.env.local scripts/release-share-previews.mjs           # dry run
 *   node --env-file=.env.local scripts/release-share-previews.mjs --apply   # write
 */

import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";

// October 2026 batch: the five optimised pages plus /sound-healing-therapy,
// whose stored description still quotes the old USD 20 session price.
const PATHS = [
  "/yoga-for-beginners",
  "/class-schedule",
  "/yoga-teacher-training",
  "/yoga-retreat-nepal",
  "/therapy-wellness/yoga-therapy",
  "/sound-healing-therapy",
];

const ROW_ID = "content:section:SHARE_PREVIEWS";
const apply = process.argv.includes("--apply");

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY          = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !KEY) {
  console.error("✗ Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY. Use --env-file=.env.local");
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, KEY, { auth: { persistSession: false } });

const { data: row, error } = await supabase
  .from("yogmandu_site_config").select("data").eq("id", ROW_ID).maybeSingle();
if (error) { console.error("✗", error.message); process.exit(1); }
if (!row?.data || !Array.isArray(row.data.pages)) {
  console.log("Nothing stored for", ROW_ID, "— code defaults already apply.");
  process.exit(0);
}

const pages = row.data.pages;
const removing = pages.filter((p) => PATHS.includes(p.path));
const keeping  = pages.filter((p) => !PATHS.includes(p.path));

console.log(`${pages.length} stored pages; releasing ${removing.length}, keeping ${keeping.length}.`);
for (const p of removing) console.log(`  - ${p.path}\n      title: ${p.title}\n      desc:  ${p.description}`);
const missing = PATHS.filter((path) => !removing.some((p) => p.path === path));
if (missing.length) console.log("  (not stored, already on code defaults):", missing.join(", "));

if (!apply) {
  console.log("\nDry run — nothing written. Re-run with --apply to update.");
  process.exit(0);
}
if (removing.length === 0) process.exit(0);

const backup = `share-previews-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
writeFileSync(backup, JSON.stringify(row.data, null, 2));
console.log(`\nBackup written: ${backup}`);

const { error: updateError } = await supabase
  .from("yogmandu_site_config")
  .update({ data: { ...row.data, pages: keeping }, updated_at: new Date().toISOString() })
  .eq("id", ROW_ID);
if (updateError) { console.error("✗", updateError.message); process.exit(1); }
console.log("✓ Released. Pages revalidate within 5 minutes; verify with");
console.log("  curl -s https://yogmandu.com/class-schedule | grep -o '<meta name=\"description\"[^>]*>'");
