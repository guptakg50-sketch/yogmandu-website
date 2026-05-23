#!/usr/bin/env node
/**
 * gen-routes.mjs
 *
 * Generates .open-next/assets/_routes.json for Cloudflare Pages.
 *
 * Without _routes.json, Cloudflare Pages routes ALL requests through _worker.js
 * when _worker.js is present — including static files like /_next/static/*.js.
 * The Next.js worker returns HTML 404 for these, breaking the whole app.
 *
 * This script excludes all static asset paths from the worker so Cloudflare
 * serves them directly from the CDN.
 */

import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative } from 'path';

const assetsDir = '.open-next/assets';

/** Recursively collect all file paths under a directory, returning URL paths */
function collectPaths(dir, base = assetsDir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const paths = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Collect directory as a wildcard pattern
      const urlPath = '/' + relative(base, full).replace(/\\/g, '/');
      // Skip _worker.js-related entries (worker handles these)
      if (entry.name === '_next') {
        // Only exclude _next/static — _next/image is handled by worker
        paths.push(`/_next/static/*`);
      } else if (!entry.name.startsWith('_')) {
        paths.push(`${urlPath}/*`);
      }
    } else if (entry.isFile()) {
      const urlPath = '/' + relative(base, full).replace(/\\/g, '/');
      // Skip worker files — they must go through the worker
      if (
        entry.name === '_worker.js' ||
        entry.name === '_routes.json' ||
        entry.name === '_headers' ||
        entry.name === '_redirects'
      ) continue;
      // Only exclude root-level static files (not under _next/)
      if (!urlPath.startsWith('/_next/') && !urlPath.startsWith('/_worker')) {
        paths.push(urlPath);
      }
    }
  }
  return paths;
}

const exclude = collectPaths(assetsDir);

const routes = {
  version: 1,
  include: ['/*'],
  exclude,
};

const outPath = `${assetsDir}/_routes.json`;
writeFileSync(outPath, JSON.stringify(routes, null, 2) + '\n');
console.log(`✅ _routes.json written with ${exclude.length} excluded paths:`);
exclude.forEach(p => console.log(`   ${p}`));
