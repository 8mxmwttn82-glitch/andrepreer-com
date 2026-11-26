const form = document.querySelector("#consult-form");
const success = document.querySelector("#form-success");
const successCopy = document.querySelector("#form-success-copy");
const fallback = document.querySelector("#form-fallback");
const fallbackCopy = document.querySelector("#form-fallback-copy");
const note = document.querySelector("#form-config-note");
const slot = document.querySelector("#turnstile-slot");

const params = new URLSearchParams(location.search);
const requested = params.get("type");
const select = document.querySelector("#project_type");
if (requested && select && CSS.escape && select.querySelector(`option[value="${CSS.escape(requested)}"]`)) {
  select.value = requested;
}

const fieldNames = ["name", "phone", "email", "location", "project_type", "description", "budget", "photos", "contact_method"];

function clearErrors() {
  for (const name of fieldNames) {
    const input = form?.querySelector(`[name="${name}"]`);
    const error = document.getElementById(`${name}-error`);
    input?.removeAttribute("aria-invalid");
    if (error) {
      error.hidden = true;
      error.textContent = "";
    }
  }
}

function showErrors(fields) {
  let first = null;
  for (const [name, message] of Object.entries(fields)) {
    const input = form?.querySelector(`[name="${name}"]`);
    const error = document.getElementById(`${name}-error`);
    if (input) input.setAttribute("aria-invalid", "true");
    if (error) {
      error.hidden = false;
      error.textContent = message;
    }
    if (!first && input) first = input;
  }
  first?.focus();
}

async function loadConfig() {
  try {
    const response = await fetch("/api/form-config", { headers: { accept: "application/json" } });
    if (!response.ok) return;
    const config = await response.json();
    if (note && (config.mail === "unconfigured" || config.turnstile === "misconfigured")) {
      note.hidden = false;
      note.textContent = "Email from this form is not set up yet. Please call 309-431-1805 or email belicimo8@gmail.com. If you submit, the message will not be sent.";
    }
    if (config.turnstileSiteKey && slot) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("turnstile"));
        document.head.append(script);
      });
      window.turnstile?.render(slot, { sitekey: config.turnstileSiteKey });
    }
  } catch {
    if (note) {
      note.hidden = false;
      note.textContent = "The form status could not be checked. You can still try to send, or call 309-431-1805.";
    }
  }
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form) return;
  clearErrors();
  if (fallback) fallback.hidden = true;
  const button = form.querySelector("button[type=submit]");
  if (button) button.disabled = true;
  form.setAttribute("aria-busy", "true");
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: new FormData(form),
      headers: { accept: "application/json" },
    });
    const data = await response.json().catch(() => ({ ok: false, error: "The form could not be read." }));
    if (data.ok && !data.mock) {
      form.hidden = true;
      if (success && successCopy) {
        success.hidden = false;
        successCopy.textContent = "He will follow up by the method you chose. If you would rather talk now, call.";
        success.focus();
      }
      return;
    }
    if (data.ok && data.mock) {
      form.hidden = true;
      if (success && successCopy) {
        success.hidden = false;
        successCopy.textContent = "Test mode is on, so this copy was not emailed. Call 309-431-1805 if you actually need Andre.";
        success.focus();
      }
      return;
    }
    if (data.fields) showErrors(data.fields);
    if (fallback && fallbackCopy) {
      fallback.hidden = false;
      fallbackCopy.textContent = data.error || "Call 309-431-1805 or email belicimo8@gmail.com. Nothing was delivered.";
      if (!data.fields) fallback.focus();
    }
  } catch {
    if (fallback && fallbackCopy) {
      fallback.hidden = false;
      fallbackCopy.textContent = "The message did not send. Call 309-431-1805 or email belicimo8@gmail.com.";
      fallback.focus();
    }
  } finally {
    if (button) button.disabled = false;
    form.removeAttribute("aria-busy");
  }
});

loadConfig();
