import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL     = process.env.EMAIL_FROM     || "Yogmandu <no-reply@yogmandu.com>";
// EMAIL_NOTIFY accepts a single address or a comma-separated list — sends to all.
const NOTIFY_EMAIL: string[] = (process.env.EMAIL_NOTIFY || "yogmandu@gmail.com")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

// Where a customer's reply should land. Mail is sent from the no-reply address
// on yogmandu.com, whose mailbox is out of service — so every message we send
// to a customer must carry a reply-to the studio actually reads, or pressing
// Reply silently loses the enquiry.
const REPLY_TO = NOTIFY_EMAIL[0];
const SITE_URL       = process.env.NEXT_PUBLIC_SITE_URL || "https://yogmandu.com";

export const isEmailConfigured = Boolean(RESEND_API_KEY);

let _resend: Resend | null = null;
function getClient(): Resend {
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured.");
  if (!_resend) _resend = new Resend(RESEND_API_KEY);
  return _resend;
}

async function send(opts: {
  to:      string | string[];
  subject: string;
  html:    string;
  text:    string;
  replyTo?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!isEmailConfigured) {
    console.warn("[email] skipped (RESEND_API_KEY not set):", opts.subject);
    return { ok: false, error: "email-not-configured" };
  }
  try {
    const resend = getClient();
    const { error } = await resend.emails.send({
      from:    FROM_EMAIL,
      to:      opts.to,
      subject: opts.subject,
      html:    opts.html,
      text:    opts.text,
      replyTo: opts.replyTo,
    });
    if (error) {
      console.error("[email] resend error:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] threw:", err);
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}

// ─── HTML template wrapper ──────────────────────────────────────────────────
function wrap(opts: { preheader?: string; title: string; bodyHtml: string; ctaHref?: string; ctaLabel?: string }): string {
  // Brand palette. Kept here so every email stays consistent with the site.
  const PURPLE = "#6B2D8B";
  const GREEN  = "#4A6418";   // darker than the site's #8DC63F so it passes
                              // contrast on a light background
  const BEIGE  = "#FAF6F0";
  const SAND   = "#EFE7DA";
  const INK    = "#4A2E1A";

  const preheader = opts.preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${BEIGE};opacity:0">${opts.preheader}</div>`
    : "";

  // Buttons are a table, not a styled <a>: Outlook ignores padding on inline
  // elements and the button collapses to bare text.
  const cta = opts.ctaHref && opts.ctaLabel
    ? `<table role="presentation" cellspacing="0" cellpadding="0" style="margin:30px 0 4px">
         <tr>
           <td align="center" style="background:${PURPLE};border-radius:999px">
             <a href="${opts.ctaHref}" style="display:inline-block;padding:14px 34px;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;font-family:'DM Sans',Helvetica,Arial,sans-serif">
               ${opts.ctaLabel}
             </a>
           </td>
         </tr>
       </table>`
    : "";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light only" />
<title>${opts.title}</title>
</head>
<body style="margin:0;padding:0;background:${SAND};font-family:'DM Sans',Helvetica,Arial,sans-serif;color:${INK};-webkit-font-smoothing:antialiased">
${preheader}
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${SAND};padding:32px 12px">
  <tr>
    <td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;width:100%;background:#FFFFFF;border-radius:18px;overflow:hidden;border:1px solid rgba(107,45,139,0.10)">

        <!-- Logo band -->
        <tr>
          <td align="center" style="background:${BEIGE};padding:28px 40px 22px">
            <img src="${SITE_URL}/email-logo.png" width="190" alt="Yogmandu"
                 style="display:block;width:190px;max-width:60%;height:auto;border:0;outline:none;text-decoration:none" />
            <p style="margin:10px 0 0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:${GREEN};font-weight:600">
              Yoga &amp; Sound Healing &middot; Nepal
            </p>
          </td>
        </tr>

        <!-- Green rule -->
        <tr><td style="height:3px;line-height:3px;font-size:0;background:${GREEN}">&nbsp;</td></tr>

        <!-- Title + body -->
        <tr>
          <td style="padding:32px 40px 8px">
            <h1 style="font-family:Georgia,'Cormorant Garamond',serif;font-size:26px;font-weight:500;color:${PURPLE};margin:0;line-height:1.25">${opts.title}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:6px 40px 36px;color:${INK};font-size:15px;line-height:1.7">
            ${opts.bodyHtml}
            ${cta}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:22px 40px 26px;border-top:1px solid rgba(107,45,139,0.12);background:${BEIGE};color:#7A5840;font-size:12px;line-height:1.7">
            <strong style="color:${PURPLE};font-size:13px">Yogmandu</strong><br />
            Miteri Marg, Mid-Baneshwor-31, Kathmandu, Nepal<br />
            <a href="${SITE_URL}" style="color:${PURPLE};text-decoration:none;font-weight:600">yogmandu.com</a>
            <span style="color:${GREEN}">&nbsp;&bull;&nbsp;</span>
            <a href="mailto:yogmandu@gmail.com" style="color:${PURPLE};text-decoration:none;font-weight:600">yogmandu@gmail.com</a>
            <span style="color:${GREEN}">&nbsp;&bull;&nbsp;</span>
            <a href="tel:+9779810263277" style="color:${PURPLE};text-decoration:none;font-weight:600">+977-9810263277</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ─── Public senders ─────────────────────────────────────────────────────────

export function sendWelcomeEmail(opts: { to: string; fullName: string; verifyUrl?: string }) {
  const greeting = opts.fullName.split(" ")[0] || "there";
  const verifyBlock = opts.verifyUrl
    ? `<p style="margin:0 0 12px">To get started, please confirm your email address:</p>`
    : "";
  return send({
    to: opts.to,
    replyTo: REPLY_TO,
    subject: "Welcome to Yogmandu",
    html: wrap({
      title: `Welcome, ${greeting} 🙏`,
      preheader: "Your Yogmandu account is ready.",
      bodyHtml: `
        <p style="margin:0 0 16px">Namaste ${greeting},</p>
        <p style="margin:0 0 16px">Your Yogmandu account is ready. We're delighted to have you with us.</p>
        ${verifyBlock}
        <p style="margin:0 0 16px">From here you can explore our class schedule, learn about our Yoga Alliance certified 200hr and 300hr teacher training, and book Tibetan sound-healing sessions.</p>
        <p style="margin:0">Questions? Just reply to this email or <a href="https://wa.me/9779810263277" style="color:#6B2D8B">message us on WhatsApp</a>.</p>
      `,
      ctaHref: opts.verifyUrl || `${SITE_URL}/account`,
      ctaLabel: opts.verifyUrl ? "Verify email address" : "Go to your account",
    }),
    text:
      `Namaste ${greeting},\n\n` +
      `Your Yogmandu account is ready.\n\n` +
      (opts.verifyUrl ? `Please confirm your email: ${opts.verifyUrl}\n\n` : `Visit your account: ${SITE_URL}/account\n\n`) +
      `Questions? Reply here or message us on WhatsApp: https://wa.me/9779810263277\n\n` +
      `— Yogmandu, Kathmandu, Nepal`,
  });
}

export function sendVerifyEmail(opts: { to: string; fullName: string; verifyUrl: string }) {
  const greeting = opts.fullName.split(" ")[0] || "there";
  return send({
    to: opts.to,
    replyTo: REPLY_TO,
    subject: "Confirm your Yogmandu email",
    html: wrap({
      title: "Confirm your email",
      preheader: "Tap the button to verify your email address.",
      bodyHtml: `
        <p style="margin:0 0 16px">Hi ${greeting},</p>
        <p style="margin:0 0 16px">Please confirm this is your email address so we can keep your account secure and send you important updates.</p>
        <p style="margin:0 0 8px;color:#9A7860;font-size:13px">This link expires in 24 hours. If you didn't create an account, you can ignore this email.</p>
      `,
      ctaHref: opts.verifyUrl,
      ctaLabel: "Verify email",
    }),
    text:
      `Hi ${greeting},\n\n` +
      `Please confirm your email by opening this link:\n${opts.verifyUrl}\n\n` +
      `This link expires in 24 hours.\n\nIf you didn't create an account, ignore this email.\n\n— Yogmandu`,
  });
}

export function sendPasswordResetEmail(opts: { to: string; fullName: string; resetUrl: string }) {
  const greeting = opts.fullName?.split(" ")[0] || "there";
  return send({
    to: opts.to,
    replyTo: REPLY_TO,
    subject: "Reset your Yogmandu password",
    html: wrap({
      title: "Reset your password",
      preheader: "Use the button below to set a new password.",
      bodyHtml: `
        <p style="margin:0 0 16px">Hi ${greeting},</p>
        <p style="margin:0 0 16px">We received a request to reset the password on your Yogmandu account. Use the button below to choose a new one.</p>
        <p style="margin:0 0 8px;color:#9A7860;font-size:13px">This link expires in 1 hour and can only be used once. If you didn't request this, you can safely ignore this email — your password won't change.</p>
      `,
      ctaHref: opts.resetUrl,
      ctaLabel: "Set new password",
    }),
    text:
      `Hi ${greeting},\n\n` +
      `Reset your Yogmandu password using this link (expires in 1 hour):\n${opts.resetUrl}\n\n` +
      `If you didn't request this, ignore this email — your password won't change.\n\n— Yogmandu`,
  });
}

export function sendContactAck(opts: { to: string; name: string; program: string; message: string }) {
  const greeting = opts.name.split(" ")[0] || "there";
  return send({
    to: opts.to,
    replyTo: REPLY_TO,
    subject: "We received your message — Yogmandu",
    html: wrap({
      title: "Thank you for reaching out",
      preheader: "We'll reply within 24 hours.",
      bodyHtml: `
        <p style="margin:0 0 16px">Namaste ${greeting},</p>
        <p style="margin:0 0 16px">Thank you for getting in touch with Yogmandu. We've received your message and will reply within 24 hours.</p>

        <div style="margin:20px 0;padding:18px 20px;background:#FAF6F0;border-radius:12px;border:1px solid rgba(107,45,139,0.12)">
          <p style="margin:0 0 6px;font-size:12px;color:#9A7860;text-transform:uppercase;letter-spacing:0.1em">Your Enquiry</p>
          ${opts.program ? `<p style="margin:0 0 10px;font-size:16px;font-weight:600;color:#6B2D8B">${escapeHtml(opts.program)}</p>` : ""}
          <p style="margin:0;font-size:14px;color:#4A2E1A;line-height:1.6;white-space:pre-wrap">${escapeHtml(opts.message)}</p>
        </div>

        <p style="margin:0">Need a faster reply? Message us directly on <a href="https://wa.me/9779810263277" style="color:#6B2D8B">WhatsApp</a>.</p>
      `,
      ctaHref: "https://wa.me/9779810263277",
      ctaLabel: "Chat on WhatsApp",
    }),
    text:
      `Namaste ${greeting},\n\n` +
      `Thank you for getting in touch. We'll reply within 24 hours.\n\n` +
      (opts.program ? `Interested in: ${opts.program}\n\n` : "") +
      `Your message:\n${opts.message}\n\n` +
      `Faster reply: https://wa.me/9779810263277\n\n— Yogmandu`,
  });
}

export function sendContactNotify(opts: { name: string; email: string; program: string; message: string }) {
  return send({
    to: NOTIFY_EMAIL,
    replyTo: opts.email,
    subject: `New enquiry · ${opts.program || "General"} · ${opts.name}`,
    html: wrap({
      title: "New website enquiry",
      preheader: `${opts.name} — ${opts.program || "General Inquiry"}`,
      bodyHtml: `
        <p style="margin:0 0 4px;color:#9A7860;font-size:13px;text-transform:uppercase;letter-spacing:0.1em">From</p>
        <p style="margin:0 0 16px;font-size:15px"><strong>${escapeHtml(opts.name)}</strong><br /><a href="mailto:${opts.email}" style="color:#6B2D8B">${escapeHtml(opts.email)}</a></p>

        <p style="margin:0 0 4px;color:#9A7860;font-size:13px;text-transform:uppercase;letter-spacing:0.1em">Program</p>
        <p style="margin:0 0 16px;font-size:15px">${escapeHtml(opts.program || "—")}</p>

        <p style="margin:0 0 4px;color:#9A7860;font-size:13px;text-transform:uppercase;letter-spacing:0.1em">Message</p>
        <div style="padding:14px 18px;background:#FAF6F0;border-left:3px solid #F7941D;border-radius:8px;font-size:14px;color:#2A1208;white-space:pre-wrap">${escapeHtml(opts.message)}</div>
      `,
      ctaHref: `mailto:${opts.email}`,
      ctaLabel: "Reply by email",
    }),
    text:
      `New website enquiry\n\n` +
      `From: ${opts.name} <${opts.email}>\n` +
      `Program: ${opts.program || "—"}\n\n` +
      `Message:\n${opts.message}\n`,
  });
}

// ─── Booking emails ─────────────────────────────────────────────────────────

export function sendBookingNotify(opts: {
  name: string; email: string; phone: string; serviceTitle: string;
  preferredDate: string; message: string;
}) {
  const dateStr = opts.preferredDate
    ? new Date(opts.preferredDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "Not specified";
  return send({
    to: NOTIFY_EMAIL,
    replyTo: opts.email,
    subject: `New booking request · ${opts.serviceTitle} · ${opts.name}`,
    html: wrap({
      title: "New booking request",
      preheader: `${opts.name} wants to book: ${opts.serviceTitle}`,
      bodyHtml: `
        <p style="margin:0 0 4px;color:#9A7860;font-size:13px;text-transform:uppercase;letter-spacing:0.1em">From</p>
        <p style="margin:0 0 16px;font-size:15px"><strong>${escapeHtml(opts.name)}</strong><br />
          <a href="mailto:${opts.email}" style="color:#6B2D8B">${escapeHtml(opts.email)}</a>
          ${opts.phone ? `&nbsp;·&nbsp;<a href="tel:${escapeHtml(opts.phone)}" style="color:#6B2D8B">${escapeHtml(opts.phone)}</a>` : ""}
        </p>

        <p style="margin:0 0 4px;color:#9A7860;font-size:13px;text-transform:uppercase;letter-spacing:0.1em">Service</p>
        <p style="margin:0 0 16px;font-size:15px;font-weight:600;color:#6B2D8B">${escapeHtml(opts.serviceTitle)}</p>

        <p style="margin:0 0 4px;color:#9A7860;font-size:13px;text-transform:uppercase;letter-spacing:0.1em">Preferred Date</p>
        <p style="margin:0 0 16px;font-size:15px">${escapeHtml(dateStr)}</p>

        ${opts.message ? `
        <p style="margin:0 0 4px;color:#9A7860;font-size:13px;text-transform:uppercase;letter-spacing:0.1em">Notes</p>
        <div style="padding:14px 18px;background:#FAF6F0;border-left:3px solid #F7941D;border-radius:8px;font-size:14px;color:#2A1208;white-space:pre-wrap">${escapeHtml(opts.message)}</div>
        ` : ""}
      `,
      ctaHref: `mailto:${opts.email}`,
      ctaLabel: "Reply to this booking",
    }),
    text:
      `New booking request\n\n` +
      `From: ${opts.name} <${opts.email}>${opts.phone ? ` · ${opts.phone}` : ""}\n` +
      `Service: ${opts.serviceTitle}\n` +
      `Preferred date: ${dateStr}\n` +
      (opts.message ? `\nNotes:\n${opts.message}\n` : ""),
  });
}

export function sendBookingAck(opts: {
  to: string; name: string; serviceTitle: string; preferredDate: string;
}) {
  const greeting = opts.name.split(" ")[0] || "there";
  const dateStr = opts.preferredDate
    ? new Date(opts.preferredDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : "";
  return send({
    to: opts.to,
    replyTo: REPLY_TO,
    subject: `Booking request received — ${opts.serviceTitle} | Yogmandu`,
    html: wrap({
      title: "We've received your booking",
      preheader: "Our team will confirm your session within 24 hours.",
      bodyHtml: `
        <p style="margin:0 0 16px">Namaste ${escapeHtml(greeting)},</p>
        <p style="margin:0 0 16px">Thank you for booking with Yogmandu. We've received your request and our team will confirm your session within 24 hours.</p>

        <div style="margin:20px 0;padding:18px 20px;background:#FAF6F0;border-radius:12px;border:1px solid rgba(107,45,139,0.12)">
          <p style="margin:0 0 6px;font-size:12px;color:#9A7860;text-transform:uppercase;letter-spacing:0.1em">Booking Summary</p>
          <p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#6B2D8B">${escapeHtml(opts.serviceTitle)}</p>
          ${dateStr ? `<p style="margin:0;font-size:13px;color:#4A2E1A">${escapeHtml(dateStr)}</p>` : ""}
        </div>

        <p style="margin:0 0 16px">Need to confirm sooner or have a question? Reach us directly on <a href="https://wa.me/9779810263277" style="color:#6B2D8B">WhatsApp</a>.</p>
        <p style="margin:0">We look forward to practising with you. 🙏</p>
      `,
      ctaHref: "https://wa.me/9779810263277",
      ctaLabel: "Chat on WhatsApp",
    }),
    text:
      `Namaste ${greeting},\n\n` +
      `We've received your booking request for: ${opts.serviceTitle}\n` +
      (dateStr ? `Preferred date: ${dateStr}\n` : "") +
      `\nOur team will confirm within 24 hours.\n\n` +
      `Faster response: https://wa.me/9779810263277\n\n` +
      `— Yogmandu, Kathmandu, Nepal`,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
