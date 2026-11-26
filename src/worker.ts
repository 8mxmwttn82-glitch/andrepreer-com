import { handleContact, handleFormConfig } from "./server/handler.ts";
import type { Env } from "./server/types.ts";

function normalize(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const path = normalize(new URL(request.url).pathname);

    if (path === "/api/contact") {
      return handleContact(request, env);
    }

    if (path === "/api/form-config") {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response(JSON.stringify({ ok: false, error: "Method not allowed." }), {
          status: 405,
          headers: { "content-type": "application/json; charset=utf-8", allow: "GET, HEAD", "cache-control": "no-store" },
        });
      }
      return handleFormConfig(env);
    }

    if (path.startsWith("/api/")) {
      return new Response(JSON.stringify({ ok: false, error: "Not found." }), {
        status: 404,
        headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
      });
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  },
};
