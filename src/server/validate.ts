import { budgets, contactMethods, projectTypes } from "./options.ts";

export interface FieldInput {
  name: string;
  phone: string;
  email: string;
  location: string;
  projectType: string;
  description: string;
  budget: string;
  contactMethod: string;
  honeypot: string;
}

export interface ValidFields {
  name: string;
  phone: string;
  email: string;
  location: string;
  projectType: string;
  description: string;
  budget: string;
  contactMethod: string;
}

const projectSet = new Set<string>(projectTypes.map((item) => item.value));
const budgetSet = new Set<string>(budgets.map((item) => item.value));
const methodSet = new Set<string>(contactMethods.map((item) => item.value));

export function validateFields(
  input: FieldInput,
): { ok: true; value: ValidFields } | { ok: false; code: "spam" | "validation"; fields: Record<string, string> } {
  if (input.honeypot.trim() !== "") {
    return { ok: false, code: "spam", fields: {} };
  }

  const fields: Record<string, string> = {};
  const name = cleanLine(input.name, 80);
  const phone = cleanLine(input.phone, 30);
  const email = cleanLine(input.email, 120).toLowerCase();
  const location = cleanLine(input.location, 80);
  const projectType = cleanLine(input.projectType, 80);
  const description = cleanText(input.description, 4000);
  const budget = cleanLine(input.budget, 40);
  const contactMethod = cleanLine(input.contactMethod, 20);

  if (name.length < 2 || !/[\p{L}]/u.test(name)) {
    fields.name = "Enter your name.";
  } else if (!/^[\p{L}][\p{L}\s.'’-]{0,78}$/u.test(name)) {
    fields.name = "Use letters, spaces, hyphens, or apostrophes.";
  }

  const digits = phone.replace(/\D/g, "");
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (national.length !== 10) {
    fields.phone = "Enter a phone number Andre can call.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.includes(",") || email.includes(";")) {
    fields.email = "Enter a valid email address.";
  }

  if (location.length < 2) {
    fields.location = "Enter the city or town where the project is.";
  }

  if (!projectSet.has(projectType)) {
    fields.projectType = "Choose a project type.";
  }

  if (description.length < 20) {
    fields.description = "Describe the project in at least a sentence or two.";
  }

  if (budget && !budgetSet.has(budget)) {
    fields.budget = "Choose a budget range, or leave it blank.";
  }

  if (!methodSet.has(contactMethod)) {
    fields.contactMethod = "Choose how you want to be reached.";
  }

  if (Object.keys(fields).length > 0) {
    return { ok: false, code: "validation", fields };
  }

  return {
    ok: true,
    value: { name, phone, email, location, projectType, description, budget, contactMethod },
  };
}

function cleanLine(value: string, max: number): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanText(value: string, max: number): string {
  return value.replace(/\r\n/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}
