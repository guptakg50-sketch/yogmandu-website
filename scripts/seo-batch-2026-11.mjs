#!/usr/bin/env node
/**
 * seo-batch-2026-11.mjs — November 2026 SEO batch (prod Supabase writes).
 *
 *   node --env-file=.env.local scripts/seo-batch-2026-11.mjs            # dry run
 *   node --env-file=.env.local scripts/seo-batch-2026-11.mjs --apply    # write
 *
 * 1. Inserts the new blog posts from ~/clients/yogmandu/blogs/04-08 as DRAFT
 *    (never Published; publish from the admin after review). Skips any slug
 *    that already exists.
 * 2. Sets seoTitle / metaDescription on older posts so they target what people
 *    actually search, without changing the headline on the page. Needs the
 *    blog/[slug] code change that reads seoTitle (deployed first).
 * 3. Fixes the weight-loss post's headline, which had the byline glued on
 *    ("...Yogic WisdomBy Yogmandu, Kathmandu's Trusted...").
 *
 * Every touched row is backed up to a JSON file before any write.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "fs";
import { homedir } from "os";

const apply = process.argv.includes("--apply");
const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const DIR = `${homedir()}/clients/yogmandu/blogs`;
const NEW_POSTS = [
  "04-yoga-in-nepal-guide.md",
  "05-ytt-nepal-vs-india.md",
  "06-yoga-poses-for-beginners.md",
  "07-meditation-for-anxiety.md",
  "08-yog-bhaneko-ke-ho.md",
];

// seoTitle ≤ ~50 chars so " | Yogmandu" still fits in 60.
const SEO_UPDATES = {
  "the-mystical-power-of-om": {
    seoTitle: "Om Meaning: The Power of the Om Mantra",
    metaDescription: "What Om means, where the sacred syllable comes from in the Vedas and Upanishads, and how to chant Om in yoga and meditation for calm and focus.",
  },
  "yogic-mantra": {
    seoTitle: "योग मन्त्र अर्थसहित: सोऽहम्, त्वमेव माता, कर्पूरगौरं",
    metaDescription: "सोऽहम्, त्वमेव माता च पिता त्वमेव र कर्पूरगौरं करुणावतारं लगायत योग तथा ध्यानमा जपिने मन्त्रहरू, नेपाली अर्थ र भावसहित।",
  },
  "history-of-hatha-yoga": {
    seoTitle: "History of Hatha Yoga: From Shiva to Today",
    metaDescription: "Where Hatha Yoga came from: Shiva as Adi Yogi, the Vedic, classical and post-classical eras, Patanjali, and how Hatha became the yoga taught today.",
  },
  "desk-yoga-back-pain": {
    seoTitle: "Yoga Poses for Back Pain You Can Do at a Desk",
    metaDescription: "Gentle yoga poses for back, neck and shoulder pain that you can do at your desk, with safe technique, warning signs, and when to see a doctor first.",
  },
};
const TITLE_FIXES = {
  "weight-loss-myths-vs-facts": "Weight Loss Myths vs. Facts: A Scientific Take with Yogic Wisdom",
};

function parseDraft(file) {
  const raw = readFileSync(`${DIR}/${file}`, "utf8");
  const [head, ...rest] = raw.split(/\n---\n/);
  const body = rest.join("\n---\n").trim();
  const field = (k) => (head.match(new RegExp(`^${k}(?: \\([^)]*\\))?: (.*)$`, "m")) || [])[1]?.trim() ?? "";
  const img = field("FEATURED IMAGE");
  return {
    title: field("TITLE"),
    slug: field("SLUG"),
    category: field("CATEGORY"),
    seoTitle: field("SEO TITLE").replace(/\s*\|\s*Yogmandu$/, ""),
    excerpt: field("EXCERPT"),
    featuredImage: img.startsWith("http") ? img : "",
    body,
  };
}

const now = new Date().toISOString();
const plan = { inserts: [], updates: [] };

// 1. New drafts
for (const f of NEW_POSTS) {
  const p = parseDraft(f);
  const { data: existing } = await sb.from("yogmandu_blogs").select("id").eq("slug", p.slug).maybeSingle();
  if (existing) { console.log(`skip (exists): ${p.slug}`); continue; }
  const id = `post_${p.slug.replace(/-/g, "_")}`;
  const words = p.body.split(/\s+/).length;
  const data = {
    id, slug: p.slug, title: p.title, status: "Draft", author: "Yogmandu Team",
    category: p.category, tags: [], featured: false,
    excerpt: p.excerpt, metaDescription: p.excerpt,
    seoTitle: p.seoTitle === p.title ? "" : p.seoTitle,
    body: p.body, featuredImage: p.featuredImage, ogImage: p.featuredImage,
    publishDate: "", readingTime: Math.max(1, Math.ceil(words / 200)),
    createdAt: now, lastSavedAt: now, revisions: [],
  };
  plan.inserts.push({ id, slug: p.slug, title: p.title, status: "Draft", data });
  console.log(`INSERT draft: ${p.slug}  (${words} words, image: ${p.featuredImage ? "yes" : "NONE"})\n   title: ${p.title}\n   seo:   ${data.seoTitle || "(= title)"}`);
}

// 2 + 3. Updates to existing posts
const slugs = [...Object.keys(SEO_UPDATES), ...Object.keys(TITLE_FIXES)];
const { data: rows } = await sb.from("yogmandu_blogs").select("*").in("slug", slugs);
for (const row of rows ?? []) {
  const patch = { ...(SEO_UPDATES[row.slug] ?? {}) };
  if (TITLE_FIXES[row.slug]) patch.title = TITLE_FIXES[row.slug];
  plan.updates.push({ row, patch });
  console.log(`UPDATE ${row.slug}`);
  for (const [k, v] of Object.entries(patch)) console.log(`   ${k}: ${JSON.stringify(row.data[k] ?? "")}\n     -> ${JSON.stringify(v)}`);
}

if (!apply) { console.log("\nDry run — nothing written. Re-run with --apply."); process.exit(0); }

const backup = `blog-backup-${now.replace(/[:.]/g, "-")}.json`;
writeFileSync(backup, JSON.stringify(plan.updates.map((u) => u.row), null, 2));
console.log(`\nBackup of updated rows: ${backup}`);

for (const ins of plan.inserts) {
  const { error } = await sb.from("yogmandu_blogs").insert({ id: ins.id, slug: ins.slug, title: ins.title, status: "Draft", data: ins.data });
  console.log(error ? `✗ insert ${ins.slug}: ${error.message}` : `✓ inserted draft ${ins.slug}`);
}
for (const { row, patch } of plan.updates) {
  const update = { data: { ...row.data, ...patch, lastSavedAt: now }, updated_at: now };
  if (patch.title) update.title = patch.title;
  const { error } = await sb.from("yogmandu_blogs").update(update).eq("id", row.id);
  console.log(error ? `✗ update ${row.slug}: ${error.message}` : `✓ updated ${row.slug}`);
}
