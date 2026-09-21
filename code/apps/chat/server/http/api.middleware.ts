import type { RequestHandler } from "express";

export const apiBoundary =
  (siteOrigin?: string): RequestHandler =>
  (request, response, next) => {
    response.setHeader("Cache-Control", "no-store");
    const origin = request.headers.origin;
    if (origin) {
      let allowed = false;
      try {
        const parsed = new URL(origin);
        allowed =
          ["http:", "https:"].includes(parsed.protocol) &&
          parsed.origin === origin &&
          (siteOrigin
            ? origin === siteOrigin
            : ["127.0.0.1", "localhost", "[::1]"].includes(parsed.hostname));
      } catch {
        // Invalid origins are rejected alongside non-local origins.
      }
      if (!allowed) {
        response.status(403).json({
          error: siteOrigin
            ? "请求来源与当前站点不匹配。"
            : "仅允许本机页面访问。",
        });
        return;
      }
    }
    next();
  };
