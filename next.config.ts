import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // unsafe-inline required: GA4 init inline script + React inline styles
  // unsafe-eval required: Three.js / shader compilation
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://challenges.cloudflare.com https://cloudflareinsights.com https://static.cloudflareinsights.com",
  "media-src 'self' blob:",
  "worker-src 'self' blob:",  // Three.js workers
  "frame-src https://challenges.cloudflare.com",  // Turnstile widget
  "frame-ancestors 'none'",   // clickjacking protection (stronger than X-Frame-Options)
  "base-uri 'self'",          // prevent base-tag injection
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy",        value: CSP },
  { key: "X-Frame-Options",               value: "DENY" },
  { key: "X-Content-Type-Options",         value: "nosniff" },
  { key: "X-XSS-Protection",              value: "1; mode=block" },
  { key: "Referrer-Policy",               value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()" },
  { key: "Strict-Transport-Security",     value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-DNS-Prefetch-Control",        value: "on" },
  { key: "Cross-Origin-Opener-Policy",    value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy",  value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Self-contained server bundle for cPanel / non-Vercel Node hosting.
  // Bundles only the needed node_modules into .next/standalone so the
  // server runs without a separate `npm install` step.
  output: "standalone",

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      // Old slug → new slug (301 permanent, preserves link equity)
      { source: "/yoga-teachers-training", destination: "/yoga-teacher-training", permanent: true },
      { source: "/yoga-teachers-training/:path*", destination: "/yoga-teacher-training", permanent: true },
      { source: "/200-hours-residential-yoga-teacher-training", destination: "/yoga-teacher-training", permanent: true },
      { source: "/200-hours-residential-yoga-teacher-training/:path*", destination: "/yoga-teacher-training", permanent: true },
      { source: "/200-hours-yoga-teacher-training-non-residential-course", destination: "/yoga-teacher-training", permanent: true },
      { source: "/200-hours-yoga-teacher-training-non-residential-course/:path*", destination: "/yoga-teacher-training", permanent: true },
      { source: "/what-expect-200-hour-residential-yoga-teacher-training-course", destination: "/yoga-teacher-training", permanent: true },
      { source: "/frequently-asked-questions-for-yoga-teacher-training", destination: "/yoga-teacher-training", permanent: true },
      { source: "/sound-healing-therapy-course", destination: "/sound-healing-therapy", permanent: true },
      { source: "/sound-healing-therapy-course/:path*", destination: "/sound-healing-therapy", permanent: true },
      { source: "/foundational-sound-healing-teacher-training-course-level-1", destination: "/sound-healing-therapy", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/:path*", destination: "/about", permanent: true },
      { source: "/book-a-class", destination: "/class-schedule", permanent: true },
      { source: "/book-a-class/:path*", destination: "/class-schedule", permanent: true },
      { source: "/sessions", destination: "/class-schedule", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/blogs/:slug*", destination: "/blog/:slug*", permanent: true },
      // Legacy WordPress URLs still ranking in GSC that previously hard-404'd (added 2026-06-04)
      { source: "/200-hours-virtual-yoga-teachers-training", destination: "/yoga-teacher-training", permanent: true },
      { source: "/200-hours-virtual-yoga-teachers-training/:path*", destination: "/yoga-teacher-training", permanent: true },
      { source: "/team/:path*", destination: "/about", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/testimonials", destination: "/about", permanent: true },
      { source: "/testimonials/:path*", destination: "/about", permanent: true },
      { source: "/yoga-retreat-packages", destination: "/services", permanent: true },
      { source: "/yoga-retreat-packages/:path*", destination: "/services", permanent: true },
      // /events is a real section again as of 2026-08-21, so these no longer
      // redirect to the class timetable. Individual old event URLs fall
      // through to /events; when the team recreates one of them under the
      // same slug, its page is served directly and the redirect never fires.
      { source: "/events/free-108-om-chanting", destination: "/events", permanent: true },
      { source: "/events/ashtanga-vinyasa-with-roshan-shrestha", destination: "/events", permanent: true },
      { source: "/events/ashtanga-vinyasa-roshan-shrestha", destination: "/events", permanent: true },
      { source: "/events/kids-yoga-teacher-training-workshop", destination: "/events", permanent: true },
      { source: "/events/kids-yoga-learning-session", destination: "/events", permanent: true },
      { source: "/events/eco-yoga-hike-to-bishnudwar", destination: "/events", permanent: true },
      { source: "/events/laughter-yoga-training", destination: "/events", permanent: true },
      { source: "/events/international-womens-day-celebration-with-yogmandu", destination: "/events", permanent: true },
      { source: "/events/energy-healing-with-sound", destination: "/events", permanent: true },
      { source: "/events/21-day-meditation-practice", destination: "/events", permanent: true },
      // These two have permanent service pages, which beat the events list.
      { source: "/events/weight-loss-bootcamp", destination: "/yoga-retreat-nepal/weight-loss-bootcamp", permanent: true },
      { source: "/events/7-weeks-weight-loss-bootcamp", destination: "/yoga-retreat-nepal/weight-loss-bootcamp", permanent: true },
      { source: "/history-of-hatha-yoga", destination: "/blog/history-of-hatha-yoga", permanent: true },
      { source: "/history-of-hatha-yoga/:path*", destination: "/blog/history-of-hatha-yoga", permanent: true },
      { source: "/kids-yoga-guide-to-teaching-benefits-mindfulness", destination: "/blog/kids-yoga-guide-to-teaching-benefits-mindfulness", permanent: true },
      { source: "/kids-yoga-guide-to-teaching-benefits-mindfulness/:path*", destination: "/blog/kids-yoga-guide-to-teaching-benefits-mindfulness", permanent: true },
      // Deleted duplicate OM post → the full version kept (blog migration 2026-06-07)
      { source: "/blog/mystical-power-of-om", destination: "/blog/the-mystical-power-of-om", permanent: true },
      // Shortened the over-long weight-loss slug (blog migration 2026-06-07)
      { source: "/blog/weight-loss-myths-vs-facts-a-scientific-take-with-yogic-wisdomby-yogmandu-kathmandus-trusted-yoga-wellness-studio", destination: "/blog/weight-loss-myths-vs-facts", permanent: true },
      // ── Search Console "Not found (404)" sweep, 2026-08-17 ──────────────
      // The old WordPress site served posts at the site root (/post-slug/);
      // the new site serves them under /blog. Only two of those were mapped,
      // so the rest hard-404'd. Each entry below points at its real
      // successor rather than at a hub — a redirect to a vaguely related
      // page reads as a soft 404 and gets dropped anyway.
      { source: "/the-mystical-power-of-om", destination: "/blog/the-mystical-power-of-om", permanent: true },
      { source: "/the-mystical-power-of-om/feed", destination: "/blog/the-mystical-power-of-om", permanent: true },
      { source: "/yogic-mantra", destination: "/blog/yogic-mantra", permanent: true },
      { source: "/terms-conditions-ytt-residential-course", destination: "/blog/terms-conditions-ytt-residential-course", permanent: true },
      { source: "/digital-marketing-yogipreneurs", destination: "/blog/digital-marketing-yogipreneurs", permanent: true },
      { source: "/learning-from-a-master-is-always-of-value-says-yog-guru-kabindra-rajthala", destination: "/blog/learning-from-a-master-is-always-of-value-says-yog-guru-kabindra-rajthala", permanent: true },
      { source: "/traveling-nepal-yoga-teacher-training", destination: "/blog/traveling-nepal-yoga-teacher-training", permanent: true },
      // Devanagari slugs from the Nepali-language posts. These MUST be
      // percent-encoded: Next matches `source` against the raw (still
      // encoded) pathname, so the literal "/मन्त्र-र-त्यस्का-प्रकार" never
      // matches and the URL keeps 404ing. Verified both forms locally.
      //   /मन्त्र-र-त्यस्का-प्रकार
      { source: "/%E0%A4%AE%E0%A4%A8%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B0-%E0%A4%B0-%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE-%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%95%E0%A4%BE%E0%A4%B0", destination: "/blog/mantra-ra-tyaska-prakar", permanent: true },
      //   /कोरोनाको-भयबाट-हुने-मानस-2
      { source: "/%E0%A4%95%E0%A5%8B%E0%A4%B0%E0%A5%8B%E0%A4%A8%E0%A4%BE%E0%A4%95%E0%A5%8B-%E0%A4%AD%E0%A4%AF%E0%A4%AC%E0%A4%BE%E0%A4%9F-%E0%A4%B9%E0%A5%81%E0%A4%A8%E0%A5%87-%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A4%B8-2", destination: "/blog/niyamit-yoga-mansik-swasthya", permanent: true },
      // Course pages that now have exact equivalents.
      { source: "/foundational-sound-healing-teacher-training-course-level-2", destination: "/sound-healing-therapy/course-level-2", permanent: true },
      { source: "/200-hours-yoga-teacher-training-residential-course", destination: "/yoga-teacher-training/residential", permanent: true },
      { source: "/200-hours-virtual-yoga-teacher-training", destination: "/yoga-teacher-training/online", permanent: true },

      { source: "/contact/", destination: "/contact", permanent: true },
      { source: "/yoga-teacher-training/", destination: "/yoga-teacher-training", permanent: true },
      { source: "/sound-healing-therapy/", destination: "/sound-healing-therapy", permanent: true },
      { source: "/about/", destination: "/about", permanent: true },
      { source: "/gallery/", destination: "/gallery", permanent: true },
      { source: "/blog/", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
