export interface Attachment {
  filename: string;
  type: string;
  base64: string;
  bytes: number;
}

export interface CleanSubmission {
  name: string;
  phone: string;
  email: string;
  location: string;
  projectType: string;
  description: string;
  budget: string;
  contactMethod: string;
  attachments: Attachment[];
}

export interface EmailBindingMessage {
  to: string | { email: string; name: string };
  from: string | { email: string; name: string };
  replyTo?: string | { email: string; name: string };
  subject: string;
  html?: string;
  text?: string;
  attachments?: {
    content: string;
    filename: string;
    type: string;
    disposition: "attachment" | "inline";
  }[];
}

export interface Env {
  ASSETS?: { fetch(input: Request | string): Promise<Response> };
  EMAIL?: {
    send(message: EmailBindingMessage): Promise<{ messageId?: string }>;
  };
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  MAIL_PROVIDER?: string;
  ALLOW_MOCK_EMAIL?: string;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
}
