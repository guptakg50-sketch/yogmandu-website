/**
 * Packages the Next.js standalone build into a single tarball for cPanel.
 *
 *   npm run deploy:cpanel
 *
 * Produces /tmp/yogmandu-deploy.tar.gz — upload to the `yogmandu-next`
 * folder in cPanel File Manager, Extract into `yogmandu-next`, then
 * Restart the Node.js app. The .env and app.js already on the server are
 * preserved (this archive does not overwrite them).
 *
 * NOTE: This is the MANUAL fallback. The normal path is now automatic —
 * push to master and the GitHub Actions workflow (.github/workflows/deploy.yml)
 * builds and FTP-deploys for you. See AGENTS.md / cpanel-deployment memory.
 */
import { execSync } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next", "standalone");

// Copy static + public into the standalone tree, ensure tmp/restart.txt.
execSync("node scripts/assemble-standalone.mjs", { stdio: "inherit" });

// Package everything EXCEPT app.js and .env (those live on the server, don't clobber them)
const out = "/tmp/yogmandu-deploy.tar.gz";
console.log(`→ Creating ${out}…`);
execSync(
  `tar --exclude=./app.js --exclude=./.env -czf ${out} -C ${standalone} .`,
  { stdio: "inherit" }
);

console.log(`\n✅ Done: ${out}`);
console.log("   Upload to the `yogmandu-next` folder in cPanel → Extract → Restart Node.js app.");
console.log("   (app.js and .env on the server are NOT touched.)");
