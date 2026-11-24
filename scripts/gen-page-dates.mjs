#!/usr/bin/env node
/**
 * gen-page-dates.mjs
 *
 * Writes lib/generated/pageDates.json: for every route folder under
 * app/(public), the date of the last git commit that touched a file directly
 * inside it (sub-routes are separate entries).
 *
 * Why: the sitemap used fs.statSync() for <lastmod>. That works under
 * `next dev`, but on Cloudflare Workers there is no filesystem, so every static
 * page fell back to "now" and the sitemap claimed 44 pages changed on every
 * regeneration. Google ignores lastmod on sitemaps where it is always wrong,
 * which weakens the sitemap as a signal for genuinely new or updated pages.
 *
 * Runs before `next build` (see package.json "build").
 */
import { execFileSync } from "child_process";
import { readdirSync, statSync, writeFileSync, mkdirSync } from "fs";
import { join, relative } from "path";

const ROOT = "app/(public)";
const out = {};

function lastCommit(files) {
  if (!files.length) return null;
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files], { encoding: "utf8" }).trim();
    return iso || null;
  } catch {
    return null;
  }
}

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile()).map((e) => join(dir, e.name));
  const date = lastCommit(files);
  if (date) out[relative(".", dir).replace(/\\/g, "/")] = new Date(date).toISOString();
  for (const e of entries) if (e.isDirectory()) walk(join(dir, e.name));
}

walk(ROOT);
// Site-wide fallback: the latest commit of all, so nothing ever reports "now".
out["*"] = new Date(execFileSync("git", ["log", "-1", "--format=%cI"], { encoding: "utf8" }).trim()).toISOString();

mkdirSync("lib/generated", { recursive: true });
writeFileSync("lib/generated/pageDates.json", JSON.stringify(out, null, 2) + "\n");
console.log(`gen-page-dates: ${Object.keys(out).length - 1} route folders dated`);
