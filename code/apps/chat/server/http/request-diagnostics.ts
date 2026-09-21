import { randomUUID } from "node:crypto";
import { performance } from "node:perf_hooks";
import type { RequestHandler, Response } from "express";
import type { ChatRequest, ChatEvent } from "../../shared/contracts/chat";

type StreamOutcome =
  "completed" | "empty" | "upstream_error" | "timeout" | "incomplete";

export interface ApiRequestLog {
  event: "api_request";
  at: string;
  requestId: string;
  method: "GET" | "POST" | "OTHER";
  route: "/api/chat" | "/api/providers" | "/api/healthz" | "/api/other";
  statusCode: number;
  outcome:
    StreamOutcome | "success" | "rejected" | "http_error" | "disconnected";
  durationMs: number;
  firstTextMs?: number;
  firstActivityMs?: number;
  acceptedMs?: number;
  upstreamHeadersMs?: number;
  upstreamStatus?: number;
  provider?: ChatRequest["provider"];
  model?: string;
  thinking?: boolean;
  messageCount?: number;
  imageCount?: number;
  imageBytes?: number;
  textBytes?: number;
}

export type RequestLogger = (entry: ApiRequestLog) => void;

interface RequestTrace {
  accept: (request: ChatRequest) => void;
  upstreamHeaders: (status: number) => void;
  observe: (event: ChatEvent) => void;
  fail: (outcome: "upstream_error" | "timeout" | "incomplete") => void;
}

const traces = new WeakMap<Response, RequestTrace>();
export const requestTrace = (response: Response) => traces.get(response);

/** Only validated public model metadata, counts and timings; never content, keys or raw errors. */
export function requestDiagnostics(logger?: RequestLogger): RequestHandler {
  return (request, response, next) => {
    const requestId = randomUUID();
    const started = performance.now();
    const at = new Date().toISOString();
    let firstTextMs: number | undefined;
    let outcome: StreamOutcome | undefined;
    const metrics: Partial<ApiRequestLog> = {};
    const elapsed = () => Math.round(performance.now() - started);
    // Generate our own ID: caller-provided headers must not control log correlation.
    response.setHeader("X-Request-Id", requestId);
    traces.set(response, {
      // Called only after provider configuration and message validation succeed.
      accept(request) {
        Object.assign(metrics, {
          acceptedMs: elapsed(),
          provider: request.provider,
          model: request.model,
          thinking: request.thinking,
          messageCount: request.messages.length,
          imageCount: request.messages.reduce(
            (sum, m) => sum + (m.images?.length ?? 0),
            0,
          ),
          imageBytes: request.messages.reduce(
            (sum, m) =>
              sum + (m.images?.reduce((n, image) => n + image.length, 0) ?? 0),
            0,
          ),
          textBytes: request.messages.reduce(
            (sum, m) => sum + Buffer.byteLength(m.content, "utf8"),
            0,
          ),
        });
      },
      upstreamHeaders(status) {
        metrics.upstreamHeadersMs = elapsed();
        metrics.upstreamStatus = status;
      },
      observe(event) {
        if (
          metrics.firstActivityMs === undefined &&
          (((event.type === "text" || event.type === "reasoning") &&
            event.delta.trim()) ||
            event.type === "tool")
        )
          metrics.firstActivityMs = elapsed();
        if (
          event.type === "text" &&
          event.delta.trim() &&
          firstTextMs === undefined
        )
          firstTextMs = elapsed();
        if (event.type === "done")
          outcome = firstTextMs === undefined ? "empty" : "completed";
        if (event.type === "error") outcome = "upstream_error";
      },
      fail(value) {
        outcome = value;
      },
    });
    // Capture a small route allowlist before Express rewrites the mounted path.
    const route =
      request.path === "/chat" ||
      request.path === "/providers" ||
      request.path === "/healthz"
        ? (`/api${request.path}` as ApiRequestLog["route"])
        : "/api/other";
    const record = () => {
      response.off("finish", record);
      response.off("close", record);
      traces.delete(response);
      const statusCode = response.statusCode;
      const result =
        !response.writableFinished && outcome !== "timeout"
          ? "disconnected"
          : (outcome ??
            (statusCode >= 500
              ? "http_error"
              : statusCode >= 400
                ? "rejected"
                : "success"));
      try {
        logger?.({
          event: "api_request",
          at,
          requestId,
          method:
            request.method === "GET" || request.method === "POST"
              ? request.method
              : "OTHER",
          route,
          statusCode,
          outcome: result,
          durationMs: elapsed(),
          ...(firstTextMs === undefined ? {} : { firstTextMs }),
          ...metrics,
        });
      } catch {
        // A failing diagnostic sink must not crash a request or echo private data.
      }
    };
    response.once("finish", record);
    response.once("close", record);
    next();
  };
}
