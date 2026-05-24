#!/usr/bin/env node
// Generates the Next.js file-convention images:
//   app/opengraph-image.png   1200x630 — social share card
//   app/twitter-image.png     1200x630 — same image, Twitter card
//   app/apple-icon.png         180x180 — iOS home screen
//   app/icon.png               512x512 — modern favicon / PWA
//
// Re-run anytime the logo or brand changes:
//   node scripts/gen-og-icons.mjs

import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LOGO = join(ROOT, "public", "logo.png");
const APP  = join(ROOT, "app");

// Brand palette
const CREAM   = "#FAF6F0";
const PURPLE  = "#6B2D8B";
const ORANGE  = "#F7941D";
const GREEN   = "#8DC63F";
const INK     = "#2A1208";

// ── Open Graph card ──────────────────────────────────────────────────────────
async function makeOG() {
  const W = 1200, H = 630;
  const bg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <radialGradient id="a" cx="20%" cy="20%" r="80%">
          <stop offset="0%"  stop-color="${ORANGE}" stop-opacity="0.18"/>
          <stop offset="60%" stop-color="${CREAM}"  stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="b" cx="85%" cy="85%" r="70%">
          <stop offset="0%"  stop-color="${PURPLE}" stop-opacity="0.18"/>
          <stop offset="55%" stop-color="${CREAM}"  stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="${CREAM}"/>
      <rect width="${W}" height="${H}" fill="url(#a)"/>
      <rect width="${W}" height="${H}" fill="url(#b)"/>

      <!-- mandala -->
      <g transform="translate(${W - 240} ${H - 240})" opacity="0.10">
        <circle cx="0" cy="0" r="200" stroke="${ORANGE}" stroke-width="1.5" fill="none"/>
        <circle cx="0" cy="0" r="150" stroke="${ORANGE}" stroke-width="1"   fill="none"/>
        <circle cx="0" cy="0" r="100" stroke="${ORANGE}" stroke-width="1"   fill="none"/>
        <circle cx="0" cy="0" r="50"  stroke="${ORANGE}" stroke-width="1"   fill="none"/>
        ${Array.from({length:12}).map((_,i)=>`<line x1="0" y1="-210" x2="0" y2="210" stroke="${ORANGE}" stroke-width="0.5" transform="rotate(${i*30})"/>`).join("")}
      </g>

      <!-- accent line -->
      <rect x="120" y="${H/2 + 60}" width="60" height="3" fill="${ORANGE}"/>

      <!-- text -->
      <text x="120" y="${H/2 - 60}" font-family="Georgia, 'Cormorant Garamond', serif"
            font-size="38" fill="${PURPLE}" font-weight="500" letter-spacing="6">
        YOGMANDU
      </text>
      <text x="120" y="${H/2 + 20}" font-family="Georgia, 'Cormorant Garamond', serif"
            font-size="72" fill="${INK}" font-weight="300">
        Yoga Teacher Training
      </text>
      <text x="120" y="${H/2 + 105}" font-family="Georgia, 'Cormorant Garamond', serif"
            font-size="72" fill="${ORANGE}" font-style="italic" font-weight="300">
        &amp; Sound Healing · Nepal
      </text>
      <text x="120" y="${H - 80}" font-family="Helvetica, Arial, sans-serif"
            font-size="22" fill="${INK}" opacity="0.55">
        Yoga Alliance RYS 200 &amp; 300 · Kathmandu · Since 2015
      </text>
    </svg>
  `;

  const out = join(APP, "opengraph-image.png");
  await sharp(Buffer.from(bg)).png().toFile(out);
  console.log("✓", out);

  // Twitter card uses the same image
  const twitter = join(APP, "twitter-image.png");
  await sharp(Buffer.from(bg)).png().toFile(twitter);
  console.log("✓", twitter);
}

// ── Square icons (Apple touch + general icon) ────────────────────────────────
async function makeIcon(size, name) {
  // Logo trimmed to its visible bounds and centered on a cream square
  const trimmed = await sharp(LOGO).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const meta = await sharp(trimmed).metadata();

  // Scale logo to fit ~70% of the canvas
  const targetW = Math.round(size * 0.72);
  const scaledLogo = await sharp(trimmed)
    .resize({
      width:  meta.width  >= meta.height ? targetW : null,
      height: meta.width  <  meta.height ? targetW : null,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const bg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="65%">
          <stop offset="0%"  stop-color="${CREAM}"/>
          <stop offset="100%" stop-color="#F0E8DC"/>
        </radialGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#g)"/>
    </svg>
  `;

  const composed = await sharp(Buffer.from(bg))
    .composite([{ input: scaledLogo, gravity: "center" }])
    .png()
    .toBuffer();

  const out = join(APP, name);
  await sharp(composed).png().toFile(out);
  console.log("✓", out);
}

async function main() {
  await makeOG();
  await makeIcon(180, "apple-icon.png");
  await makeIcon(512, "icon.png");
  console.log("Done.");
}

main().catch(e => { console.error(e); process.exit(1); });
