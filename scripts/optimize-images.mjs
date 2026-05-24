#!/usr/bin/env node
// One-shot image optimizer: generates .webp siblings for every JPG/PNG under
// /public/images, plus a re-encoded smaller JPG fallback. Idempotent — skips
// up-to-date outputs based on mtime.
//
// Usage: node scripts/optimize-images.mjs
//        node scripts/optimize-images.mjs --force   (regenerate everything)

import sharp from "sharp";
import { readdir, stat, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "public", "images");
const FORCE = process.argv.includes("--force");

const WEBP_QUALITY = 78;
const JPG_QUALITY = 82;

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

function isSource(p) {
  const e = extname(p).toLowerCase();
  return e === ".jpg" || e === ".jpeg" || e === ".png";
}

async function isUpToDate(src, dest) {
  if (FORCE || !existsSync(dest)) return false;
  const [s, d] = await Promise.all([stat(src), stat(dest)]);
  return d.mtimeMs >= s.mtimeMs;
}

async function processFile(src) {
  const dir = dirname(src);
  const base = basename(src, extname(src));
  const webp = join(dir, `${base}.webp`);

  let made = [];
  if (!(await isUpToDate(src, webp))) {
    await sharp(src)
      .resize({ width: 1800, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 5 })
      .toFile(webp);
    made.push("webp");
  }

  // Also re-encode the JPG fallback (in place) if it's clearly oversized.
  const ext = extname(src).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") {
    const tmp = `${src}.tmp`;
    await sharp(src)
      .resize({ width: 1800, withoutEnlargement: true })
      .jpeg({ quality: JPG_QUALITY, mozjpeg: true, progressive: true })
      .toFile(tmp);
    const [orig, fresh] = await Promise.all([stat(src), stat(tmp)]);
    if (fresh.size < orig.size * 0.95) {
      const { rename } = await import("node:fs/promises");
      await rename(tmp, src);
      made.push(`jpg(-${Math.round((1 - fresh.size / orig.size) * 100)}%)`);
    } else {
      const { unlink } = await import("node:fs/promises");
      await unlink(tmp);
    }
  }
  return made;
}

async function main() {
  if (!existsSync(ROOT)) {
    console.error("Missing", ROOT);
    process.exit(1);
  }
  const files = (await walk(ROOT)).filter(isSource);
  console.log(`Scanning ${files.length} images under ${ROOT}…`);

  let touched = 0;
  let bytesBefore = 0;
  let bytesAfter = 0;

  for (const f of files) {
    const before = (await stat(f)).size;
    bytesBefore += before;
    const actions = await processFile(f);
    const after = (await stat(f)).size;
    bytesAfter += after;
    if (actions.length) {
      touched++;
      console.log(`  ${f.replace(ROOT, "")}  ->  ${actions.join(", ")}`);
    }
  }

  console.log(
    `\nDone. Processed ${touched}/${files.length} files. JPG: ${(bytesBefore / 1024).toFixed(0)} KB -> ${(bytesAfter / 1024).toFixed(0)} KB.`
  );
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
