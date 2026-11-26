import { handleFormConfig } from "../../src/server/handler.ts";
import type { Env } from "../../src/server/types.ts";

interface PagesContext {
  request: Request;
  env: Env;
}

export async function onRequestGet(context: PagesContext): Promise<Response> {
  return handleFormConfig(context.env);
}
