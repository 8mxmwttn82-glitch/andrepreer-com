import { budgetLabel, contactMethodLabel, projectTypeLabel } from "./options.ts";
import type { Attachment, CleanSubmission, Env } from "./types.ts";

export interface BuiltEmail {
  subject: string;
  text: string;
  html: string;
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

export function parseMailbox(value: string): { email: string; name: string } | null {
  const trimmed = value.replace(/[\r\n]/g, "").trim();
  const wrapped = trimmed.match(/^(.*)<([^<>]+)>$/);
  const email = (wrapped ? wrapped[2] : trimmed).trim();
  const name = wrapped ? wrapped[1].replace(/["']/g, "").trim() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return { email, name };
}

export function buildEmail(submission: CleanSubmission): BuiltEmail {
  const type = projectTypeLabel(submission.projectType);
  const budget = submission.budget ? budgetLabel(submission.budget) : "Not given";
  const method = contactMethodLabel(submission.contactMethod);
  const sent = new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "full",
    timeStyle: "short",
  });
  const subject = oneLine(`Consultation request — ${submission.name} (${submission.location})`);
  const photoLine =
    submission.attachments.length === 0
      ? "No photos attached."
      : `${submission.attachments.length} photo${submission.attachments.length === 1 ? "" : "s"} attached: ${submission.attachments.map((file) => file.filename).join(", ")}`;

  const text = [
    "New consultation request from andrepreer.com",
    "",
    `Name: ${submission.name}`,
    `Phone: ${submission.phone}`,
    `Email: ${submission.email}`,
    `Project location: ${submission.location}`,
    `Project type: ${type}`,
    `Budget range: ${budget}`,
    `Preferred contact: ${method}`,
    photoLine,
    "",
    "Description:",
    submission.description,
    "",
    `Sent: ${sent} (Central Time)`,
  ].join("\n");

  const rows: [string, string][] = [
    ["Name", submission.name],
    ["Phone", submission.phone],
    ["Email", submission.email],
    ["Project location", submission.location],
    ["Project type", type],
    ["Budget range", budget],
    ["Preferred contact", method],
    ["Photos", photoLine],
  ];

  const html = `<!doctype html><html><body style="font-family:Georgia,serif;color:#1b1916;line-height:1.5">
<p style="letter-spacing:.12em;text-transform:uppercase;font-family:Arial,sans-serif;font-size:12px;color:#6a3e24">AndrePreer.com</p>
<h1 style="font-weight:500;font-size:24px">Consultation request</h1>
<table style="border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><th style="text-align:left;padding:6px 16px 6px 0;vertical-align:top;font-family:Arial,sans-serif;font-size:13px;color:#5c564c">${escapeHtml(label)}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>
<h2 style="font-size:18px;font-weight:500">Description</h2>
<p style="white-space:pre-wrap">${escapeHtml(submission.description)}</p>
<p style="font-family:Arial,sans-serif;font-size:13px;color:#5c564c">Sent ${escapeHtml(sent)} (Central Time). Reply to this message to reach ${escapeHtml(submission.name)}.</p>
</body></html>`;

  return { subject, text, html };
}

export type Provider = "resend" | "cloudflare" | "mock" | "unconfigured";

export function resolveProvider(env: Env): Provider {
  const choice = (env.MAIL_PROVIDER || "auto").trim().toLowerCase();
  const resendReady = Boolean(env.RESEND_API_KEY && env.CONTACT_TO && env.CONTACT_FROM && parseMailbox(env.CONTACT_FROM) && parseMailbox(env.CONTACT_TO));
  const cloudflareReady = Boolean(env.EMAIL && env.CONTACT_TO && env.CONTACT_FROM && parseMailbox(env.CONTACT_FROM) && parseMailbox(env.CONTACT_TO));

  if (choice === "mock") {
    return env.ALLOW_MOCK_EMAIL === "true" ? "mock" : "unconfigured";
  }
  if (choice === "resend") return resendReady ? "resend" : "unconfigured";
  if (choice === "cloudflare" || choice === "email") return cloudflareReady ? "cloudflare" : "unconfigured";
  if (resendReady) return "resend";
  if (cloudflareReady) return "cloudflare";
  return "unconfigured";
}

export function turnstileMode(env: Env): "off" | "on" | "misconfigured" {
  const site = Boolean(env.TURNSTILE_SITE_KEY);
  const secret = Boolean(env.TURNSTILE_SECRET_KEY);
  if (site && secret) return "on";
  if (!site && !secret) return "off";
  return "misconfigured";
}

export async function deliverEmail(
  env: Env,
  submission: CleanSubmission,
  fetchImpl: typeof fetch,
): Promise<{ ok: true; mock?: boolean } | { ok: false; code: "unconfigured" | "delivery_failed" }> {
  const provider = resolveProvider(env);
  if (provider === "unconfigured") return { ok: false, code: "unconfigured" };
  const message = buildEmail(submission);

  if (provider === "mock") {
    return { ok: true, mock: true };
  }

  if (provider === "resend") {
    const from = parseMailbox(env.CONTACT_FROM || "");
    const to = parseMailbox(env.CONTACT_TO || "");
    if (!from || !to) return { ok: false, code: "unconfigured" };
    const response = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: from.name ? `${from.name} <${from.email}>` : from.email,
        to: [to.email],
        reply_to: submission.email,
        subject: message.subject,
        html: message.html,
        text: message.text,
        attachments: submission.attachments.map((file) => ({
          filename: file.filename,
          content: file.base64,
          content_type: file.type,
        })),
      }),
    });
    if (!response.ok) {
      console.error("Resend delivery failed", response.status);
      return { ok: false, code: "delivery_failed" };
    }
    return { ok: true };
  }

  const from = parseMailbox(env.CONTACT_FROM || "");
  const to = parseMailbox(env.CONTACT_TO || "");
  if (!from || !to || !env.EMAIL) return { ok: false, code: "unconfigured" };
  try {
    await env.EMAIL.send({
      to: { email: to.email, name: to.name || "Andre Preer" },
      from: { email: from.email, name: from.name || "Andre Preer website" },
      replyTo: { email: submission.email, name: submission.name },
      subject: message.subject,
      html: message.html,
      text: message.text,
      attachments: submission.attachments.map((file: Attachment) => ({
        content: file.base64,
        filename: file.filename,
        type: file.type,
        disposition: "attachment" as const,
      })),
    });
    return { ok: true };
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? String((error as { code?: string }).code) : "";
    console.error("Cloudflare Email delivery failed", code || (error instanceof Error ? error.message : "unknown"));
    return { ok: false, code: "delivery_failed" };
  }
}

function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, 180);
}
