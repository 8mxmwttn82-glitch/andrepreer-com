import { buildEmail, deliverEmail, escapeHtml, resolveProvider, turnstileMode } from "./email.ts";
import type { Attachment, CleanSubmission, Env } from "./types.ts";
import { validateFields } from "./validate.ts";

export const MAX_FILES = 3;
export const MAX_FILE_BYTES = 2 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 6 * 1024 * 1024;

const PHONE_DISPLAY = "309-431-1805";
const PHONE_TEL = "+13094311805";
const ALT_DISPLAY = "702-232-6150";
const ALT_TEL = "+17022326150";
const EMAIL = "belicimo8@gmail.com";

export interface HandlerDeps {
  fetch?: typeof fetch;
}

export async function handleContact(request: Request, env: Env, deps: HandlerDeps = {}): Promise<Response> {
  const fetchImpl = deps.fetch ?? fetch;
  const html = wantsHtml(request);

  if (request.method !== "POST") {
    return respond(html, { ok: false, code: "method", error: "Use the consultation form to send a request." }, 405);
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data") && !contentType.includes("application/x-www-form-urlencoded")) {
    return respond(html, { ok: false, code: "type", error: "Submit the consultation form from andrepreer.com." }, 415);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond(html, { ok: false, code: "type", error: "The form could not be read. Call Andre or try again." }, 400);
  }

  const validated = validateFields({
    name: stringField(form, "name"),
    phone: stringField(form, "phone"),
    email: stringField(form, "email"),
    location: stringField(form, "location"),
    projectType: stringField(form, "project_type"),
    description: stringField(form, "description"),
    budget: stringField(form, "budget"),
    contactMethod: stringField(form, "contact_method"),
    honeypot: stringField(form, "company_website"),
  });

  if (!validated.ok) {
    if (validated.code === "spam") {
      return respond(html, { ok: false, code: "spam", error: "The request could not be sent." }, 400);
    }
    return respond(
      html,
      { ok: false, code: "validation", error: "Check the highlighted fields and try again.", fields: validated.fields },
      400,
    );
  }

  const files = await readPhotos(form);
  if (!files.ok) {
    return respond(html, { ok: false, code: "validation", error: files.error, fields: { photos: files.error } }, 400);
  }

  const mode = turnstileMode(env);
  if (mode === "misconfigured") {
    return respond(html, fallbackBody("turnstile"), 503);
  }
  if (mode === "on") {
    const token = stringField(form, "cf-turnstile-response");
    if (!token) {
      return respond(
        html,
        { ok: false, code: "turnstile", error: "The spam check did not finish. Try again, or call Andre." },
        400,
      );
    }
    const passed = await verifyTurnstile(env, token, request, fetchImpl);
    if (!passed) {
      return respond(
        html,
        { ok: false, code: "turnstile", error: "The spam check failed. Try again, or call Andre." },
        400,
      );
    }
  }

  if (resolveProvider(env) === "unconfigured") {
    return respond(html, fallbackBody("unconfigured"), 503);
  }

  const submission: CleanSubmission = { ...validated.value, attachments: files.attachments };
  try {
    const delivered = await deliverEmail(env, submission, fetchImpl);
    if (!delivered.ok) {
      return respond(html, fallbackBody(delivered.code), delivered.code === "unconfigured" ? 503 : 502);
    }
    return respond(
      html,
      {
        ok: true,
        mock: Boolean(delivered.mock),
        attachmentCount: submission.attachments.length,
      },
      200,
    );
  } catch (error) {
    console.error("Contact handler failed", error instanceof Error ? error.message : "unknown");
    return respond(html, fallbackBody("delivery_failed"), 502);
  }
}

export function handleFormConfig(env: Env): Response {
  const mode = turnstileMode(env);
  const provider = resolveProvider(env);
  const body = {
    turnstileSiteKey: mode === "on" ? env.TURNSTILE_SITE_KEY : null,
    turnstile: mode === "misconfigured" ? "misconfigured" : mode,
    mail: provider === "unconfigured" ? "unconfigured" : "ready",
  };
  return json(body, 200);
}

function fallbackBody(code: string) {
  return {
    ok: false as const,
    code,
    error: `This form cannot email Andre right now. Call ${PHONE_DISPLAY} or email ${EMAIL}. Nothing was sent.`,
  };
}

async function verifyTurnstile(env: Env, token: string, request: Request, fetchImpl: typeof fetch): Promise<boolean> {
  const body = new URLSearchParams();
  body.set("secret", env.TURNSTILE_SECRET_KEY || "");
  body.set("response", token);
  const ip = request.headers.get("cf-connecting-ip");
  if (ip) body.set("remoteip", ip);
  try {
    const response = await fetchImpl("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

async function readPhotos(
  form: FormData,
): Promise<{ ok: true; attachments: Attachment[] } | { ok: false; error: string }> {
  const entries = form.getAll("photos").filter((entry): entry is File => entry instanceof File && (entry.size > 0 || entry.name !== ""));
  if (entries.length > MAX_FILES) {
    return { ok: false, error: `Attach up to ${MAX_FILES} photos.` };
  }
  const attachments: Attachment[] = [];
  let total = 0;
  for (const file of entries) {
    if (file.size === 0) return { ok: false, error: "One of the photos was empty. Remove it and try again." };
    if (file.size > MAX_FILE_BYTES) return { ok: false, error: "Each photo must be 2 MB or smaller." };
    total += file.size;
    if (total > MAX_TOTAL_BYTES) return { ok: false, error: "The photos together must be 6 MB or smaller." };
    const bytes = new Uint8Array(await file.arrayBuffer());
    const type = sniffImage(bytes);
    if (!type) return { ok: false, error: "Photos must be JPEG, PNG, or WebP." };
    attachments.push({
      filename: safeFilename(file.name, type),
      type,
      bytes: bytes.byteLength,
      base64: bytesToBase64(bytes),
    });
  }
  return { ok: true, attachments };
}

function sniffImage(bytes: Uint8Array): string | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "image/png";
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  return null;
}

function safeFilename(name: string, type: string): string {
  const ext = type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
  const base = name.split(/[/\\]/).pop() || "photo";
  const stem = base.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);
  return `${stem || "photo"}.${ext}`;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let index = 0; index < bytes.length; index += chunk) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
  }
  return btoa(binary);
}

function stringField(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

function wantsHtml(request: Request): boolean {
  const accept = request.headers.get("accept") || "";
  if (accept.includes("application/json")) return false;
  return accept.includes("text/html");
}

function respond(html: boolean, body: Record<string, unknown>, status: number): Response {
  if (!html) return json(body, status);
  return new Response(resultPage(body, status), {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

function resultPage(body: Record<string, unknown>, status: number): string {
  const ok = body.ok === true;
  const mock = body.mock === true;
  const fields = (body.fields || {}) as Record<string, string>;
  const fieldList = Object.entries(fields)
    .map(([key, message]) => `<li>${escapeHtml(message)}</li>`)
    .join("");
  const title = ok ? (mock ? "Test mode — form accepted" : "Request sent") : "Message not sent";
  const lead = ok
    ? mock
      ? "Test mode is on, so this copy was not emailed to Andre. In production, this is the page a visitor sees after a real send."
      : "Andre has your request and will follow up by the method you chose. If you would rather talk now, call him."
    : escapeHtml(String(body.error || "The message was not sent."));
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | Andre Preer</title>
  <meta name="robots" content="noindex">
  <link rel="stylesheet" href="/form-result.css">
</head>
<body>
  <main>
    <p class="brand"><a href="/">Andre Preer</a></p>
    <h1>${title}</h1>
    <p>${ok ? lead : lead}</p>
    ${fieldList ? `<ul>${fieldList}</ul><p>Use the back button to edit what you entered. It is still in the form.</p>` : ""}
    <p class="actions"><a class="btn" href="tel:${PHONE_TEL}">Call ${PHONE_DISPLAY}</a> <a href="mailto:${EMAIL}">${EMAIL}</a></p>
    <p class="alt">Alternate line <a href="tel:${ALT_TEL}">${ALT_DISPLAY}</a></p>
    <p><a href="/contact/">Back to the consultation form</a></p>
  </main>
</body>
</html>`;
}

export { buildEmail };
