import { handleContact } from "../../src/server/handler.ts";
import type { Env } from "../../src/server/types.ts";

interface PagesContext {
  request: Request;
  env: Env;
}

export async function onRequest(context: PagesContext): Promise<Response> {
  return handleContact(context.request, context.env);
}
