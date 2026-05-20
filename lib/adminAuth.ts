import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "yogmandu_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || process.env.YOGMANDU_ADMIN_PASSWORD || "";
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || getAdminPassword();
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function constantTimeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function createSessionValue() {
  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `admin.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

function isValidSessionValue(value: string | undefined) {
  if (!value) return false;
  const [role, expiresAt, signature] = value.split(".");
  if (role !== "admin" || !expiresAt || !signature) return false;
  if (Number(expiresAt) < Date.now()) return false;
  return constantTimeEqual(signature, sign(`${role}.${expiresAt}`));
}

export function isAdminPasswordConfigured() {
  return Boolean(getAdminPassword());
}

export function verifyAdminPassword(password: string) {
  const expected = getAdminPassword();
  return Boolean(expected) && constantTimeEqual(password, expected);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return isValidSessionValue(cookieStore.get(COOKIE_NAME)?.value);
}

export async function setAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionValue(), {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function requireAdminSession() {
  if (!isAdminPasswordConfigured()) {
    return Response.json(
      { error: "Admin password is not configured. Set ADMIN_PASSWORD to enable remote CMS APIs." },
      { status: 503 },
    );
  }

  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Admin login required." }, { status: 401 });
  }

  return null;
}
