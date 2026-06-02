'use strict';
// Phusion Passenger entry point — cPanel Node.js hosting.
// Loads .env (cPanel's env-var injection is unreliable with Passenger),
// then delegates to the Next.js standalone server, which bundles its own
// minimal node_modules (no separate `npm install` needed on the server).
const fs   = require('fs');
const path = require('path');

// --- Minimal .env loader (no dependency) ---
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val   = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  }
} catch (err) {
  console.error('Failed to load .env:', err);
}

process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '3000';
process.chdir(__dirname);
require('./server.js');
