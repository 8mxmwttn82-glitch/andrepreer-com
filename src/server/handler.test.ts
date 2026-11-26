import assert from "node:assert/strict";
import test from "node:test";
import { buildEmail } from "./email.ts";
import { handleContact, handleFormConfig } from "./handler.ts";
import worker from "../worker.ts";
import type { Env } from "./types.ts";

const valid = {
  name: "Jordan Hale",
  phone: "(217) 555-0148",
  email: "jordan@example.com",
  location: "Springfield",
  project_type: "limestone-walls-stonework",
  description: "The side yard slopes toward the neighbor and needs a low limestone wall and a walk to the back door.",
  budget: "5000-15000",
  contact_method: "phone",
  company_website: "",
};

function formRequest(fields: Record<string, string | Blob>, accept = "application/json"): Request {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) form.append(key, value);
  return new Request("https://andrepreer.com/api/contact", { method: "POST", body: form, headers: { accept } });
}

function jpeg(size = 32): File {
  const bytes = new Uint8Array(size);
  bytes[0] = 0xff;
  bytes[1] = 0xd8;
  bytes[2] = 0xff;
  bytes[3] = 0xd9;
  return new File([bytes], "yard photo.jpg", { type: "image/jpeg" });
}

test("validation rejects an incomplete submission", async () => {
  const response = await handleContact(formRequest({ ...valid, email: "nope", description: "too short" }), {});
  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.code, "validation");
  assert.match(body.fields.email, /email/i);
  assert.match(body.fields.description, /sentence/i);
});

test("honeypot does not send mail", async () => {
  let called = false;
  const response = await handleContact(formRequest({ ...valid, company_website: "https://spam.test" }), {}, {
    fetch: async () => {
      called = true;
      return new Response("no");
    },
  });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).code, "spam");
  assert.equal(called, false);
});

test("unconfigured provider tells the visitor to call", async () => {
  const response = await handleContact(formRequest(valid), { CONTACT_TO: "belicimo8@gmail.com" });
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.equal(body.ok, false);
  assert.equal(body.code, "unconfigured");
  assert.match(body.error, /309-431-1805/);
  assert.match(body.error, /Nothing was sent/);
});

test("mock provider is refused unless explicitly allowed", async () => {
  const response = await handleContact(formRequest(valid), { MAIL_PROVIDER: "mock", CONTACT_TO: "a@b.co", CONTACT_FROM: "c@d.co" });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, "unconfigured");
});

test("mock provider accepts a submission and reports that it did not deliver", async () => {
  const form = new FormData();
  for (const [key, value] of Object.entries(valid)) form.append(key, value);
  form.append("photos", jpeg());
  const response = await handleContact(
    new Request("https://andrepreer.com/api/contact", { method: "POST", body: form, headers: { accept: "application/json" } }),
    {
      MAIL_PROVIDER: "mock",
      ALLOW_MOCK_EMAIL: "true",
      CONTACT_TO: "belicimo8@gmail.com",
      CONTACT_FROM: "Andre Preer <consultations@andrepreer.com>",
    },
  );
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.ok, true);
  assert.equal(body.mock, true);
  assert.equal(body.attachmentCount, 1);
});

test("resend success sends escaped html, reply-to, and the photo", async () => {
  let payload: Record<string, unknown> | null = null;
  const response = await handleContact(
    formRequest({ ...valid, name: "Ann <script>", description: "Please look at the slope beside the garage and the bed along the walk." }),
    { MAIL_PROVIDER: "resend", RESEND_API_KEY: "re_test", CONTACT_TO: "belicimo8@gmail.com", CONTACT_FROM: "Site <consultations@andrepreer.com>" },
    {
      fetch: async (_url, init) => {
        payload = JSON.parse(String(init?.body));
        return new Response(JSON.stringify({ id: "email_1" }), { status: 200 });
      },
    },
  );
  assert.equal(response.status, 400);
  const env: Env = {
    MAIL_PROVIDER: "resend",
    RESEND_API_KEY: "re_test",
    CONTACT_TO: "belicimo8@gmail.com",
    CONTACT_FROM: "Site <consultations@andrepreer.com>",
  };
  const form = new FormData();
  for (const [key, value] of Object.entries({
    ...valid,
    description: "Please look at the slope beside the garage and the bed along the walk.",
  })) {
    form.append(key, value);
  }
  form.append("photos", jpeg());
  const sent = await handleContact(
    new Request("https://andrepreer.com/api/contact", { method: "POST", body: form, headers: { accept: "application/json" } }),
    env,
    {
      fetch: async (url, init) => {
        assert.equal(url, "https://api.resend.com/emails");
        payload = JSON.parse(String(init?.body));
        return new Response(JSON.stringify({ id: "email_1" }), { status: 200 });
      },
    },
  );
  assert.equal(sent.status, 200);
  assert.equal(payload?.reply_to, valid.email);
  assert.equal(payload?.from, "Site <consultations@andrepreer.com>");
  const attachments = payload?.attachments as { filename: string; content: string }[];
  assert.equal(attachments.length, 1);
  assert.equal(attachments[0].filename, "yard-photo.jpg");
  assert.equal((payload?.html as string).includes("<script>"), false);
});

test("name with a bracket fails validation before send", async () => {
  const response = await handleContact(formRequest({ ...valid, name: "Ann <script>" }), {
    MAIL_PROVIDER: "mock",
    ALLOW_MOCK_EMAIL: "true",
    CONTACT_TO: "a@b.co",
    CONTACT_FROM: "c@d.co",
  });
  assert.equal(response.status, 400);
});

test("resend failure does not claim success", async () => {
  const response = await handleContact(formRequest(valid), {
    MAIL_PROVIDER: "resend",
    RESEND_API_KEY: "re_test",
    CONTACT_TO: "belicimo8@gmail.com",
    CONTACT_FROM: "consultations@andrepreer.com",
  }, { fetch: async () => new Response("nope", { status: 422 }) });
  assert.equal(response.status, 502);
  assert.equal((await response.json()).ok, false);
});

test("cloudflare email binding receives the attachment", async () => {
  let message: { subject: string; attachments?: { filename: string }[]; replyTo?: { email: string } } | null = null;
  const form = new FormData();
  for (const [key, value] of Object.entries(valid)) form.append(key, value);
  form.append("photos", jpeg());
  const response = await handleContact(
    new Request("https://andrepreer.com/api/contact", { method: "POST", body: form, headers: { accept: "application/json" } }),
    {
      MAIL_PROVIDER: "cloudflare",
      CONTACT_TO: "belicimo8@gmail.com",
      CONTACT_FROM: "consultations@andrepreer.com",
      EMAIL: {
        async send(value) {
          message = value as typeof message;
          return { messageId: "m1" };
        },
      },
    },
  );
  assert.equal(response.status, 200);
  assert.match(message?.subject || "", /Jordan Hale/);
  assert.equal(message?.attachments?.[0].filename, "yard-photo.jpg");
  assert.equal(message?.replyTo?.email, valid.email);
});

test("turnstile is required only when both keys exist", async () => {
  const env: Env = {
    MAIL_PROVIDER: "mock",
    ALLOW_MOCK_EMAIL: "true",
    CONTACT_TO: "a@b.co",
    CONTACT_FROM: "c@d.co",
    TURNSTILE_SITE_KEY: "site",
    TURNSTILE_SECRET_KEY: "secret",
  };
  const missing = await handleContact(formRequest(valid), env, { fetch: async () => new Response("{}") });
  assert.equal((await missing.json()).code, "turnstile");

  let verified = false;
  const passed = await handleContact(formRequest({ ...valid, "cf-turnstile-response": "tok" }), env, {
    fetch: async () => {
      verified = true;
      return new Response(JSON.stringify({ success: true }));
    },
  });
  assert.equal(passed.status, 200);
  assert.equal(verified, true);

  const half = await handleContact(formRequest(valid), { ...env, TURNSTILE_SECRET_KEY: "" });
  assert.equal((await half.json()).code, "turnstile");
});

test("a non-image upload is rejected", async () => {
  const form = new FormData();
  for (const [key, value] of Object.entries(valid)) form.append(key, value);
  form.append("photos", new File([new Uint8Array([1, 2, 3, 4])], "notes.txt", { type: "text/plain" }));
  const response = await handleContact(
    new Request("https://andrepreer.com/api/contact", { method: "POST", body: form, headers: { accept: "application/json" } }),
    { MAIL_PROVIDER: "mock", ALLOW_MOCK_EMAIL: "true", CONTACT_TO: "a@b.co", CONTACT_FROM: "c@d.co" },
  );
  assert.equal(response.status, 400);
  assert.match((await response.json()).fields.photos, /JPEG/);
});

test("html form post renders a fallback page instead of pretending success", async () => {
  const response = await handleContact(formRequest(valid, "text/html"), {});
  assert.equal(response.status, 503);
  const html = await response.text();
  assert.match(html, /Nothing was sent|cannot email/i);
  assert.match(html, /309-431-1805/);
  assert.doesNotMatch(html, /Andre has your request/);
});

test("form config exposes the site key only and never the secret", () => {
  const response = handleFormConfig({
    TURNSTILE_SITE_KEY: "site-key",
    TURNSTILE_SECRET_KEY: "secret-key",
    RESEND_API_KEY: "re_secret",
    CONTACT_TO: "a@b.co",
    CONTACT_FROM: "c@d.co",
    MAIL_PROVIDER: "resend",
  });
  return response.json().then((body) => {
    assert.equal(body.turnstileSiteKey, "site-key");
    assert.equal(body.mail, "ready");
    const raw = JSON.stringify(body);
    assert.equal(raw.includes("secret"), false);
    assert.equal(raw.includes("re_secret"), false);
  });
});

test("worker sends other paths to the asset binding", async () => {
  let fetched = "";
  const response = await worker.fetch(new Request("https://andrepreer.com/about/"), {
    ASSETS: {
      fetch: async (input: Request | string) => {
        fetched = typeof input === "string" ? input : input.url;
        return new Response("about", { status: 200, headers: { "content-type": "text/html" } });
      },
    },
  });
  assert.equal(response.status, 200);
  assert.match(fetched, /\/about\/$/);
  const missing = await worker.fetch(new Request("https://andrepreer.com/api/unknown"), {});
  assert.equal(missing.status, 404);
});

test("email body escapes markup in the description", () => {
  const email = buildEmail({
    name: "Jordan Hale",
    phone: "217-555-0148",
    email: "jordan@example.com",
    location: "Chatham",
    projectType: "fire-features",
    description: "A fire pit <script>alert(1)</script> near the patio.",
    budget: "",
    contactMethod: "either",
    attachments: [],
  });
  assert.equal(email.html.includes("<script>"), false);
  assert.match(email.html, /&lt;script&gt;/);
  assert.match(email.text, /Not given/);
});
