/**
 * Assembles the Next.js standalone build into a self-contained, ready-to-run
 * tree at .next/standalone — used by both the manual cPanel package flow
 * (scripts/package-cpanel.mjs) and the GitHub Actions FTP deploy.
 *
 *   node scripts/assemble-standalone.mjs
 *
 * Next.js does NOT copy .next/static or public into the standalone output, so
 * we do it here. We also ensure a tmp/restart.txt exists — uploading a changed
 * tmp/restart.txt is how Phusion Passenger (cPanel Node.js apps) is told to
 * restart without shell access.
 */
import { existsSync, cpSync, rmSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

if (!existsSync(standalone)) {
  console.error("❌ No standalone build found. Run `npm run build` first.");
  process.exit(1);
}

// Copy static assets + public into the standalone tree.
console.log("→ Copying .next/static and public into standalone…");
rmSync(join(standalone, ".next", "static"), { recursive: true, force: true });
cpSync(join(root, ".next", "static"), join(standalone, ".next", "static"), { recursive: true });
rmSync(join(standalone, "public"), { recursive: true, force: true });
cpSync(join(root, "public"), join(standalone, "public"), { recursive: true });

// Ensure tmp/restart.txt exists (Passenger restart trigger). The deploy step
// overwrites this with the commit SHA so each deploy bumps its mtime.
const tmpDir = join(standalone, "tmp");
mkdirSync(tmpDir, { recursive: true });
const stamp = `${process.env.GITHUB_SHA || "local"} ${new Date().toISOString()}\n`;
writeFileSync(join(tmpDir, "restart.txt"), stamp);

console.log(`✅ Standalone assembled at ${standalone} (restart.txt: ${stamp.trim()})`);
