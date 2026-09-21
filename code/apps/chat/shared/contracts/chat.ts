import type { ChatRequest } from "./chatRequestSchema";

export type { ChatRequest } from "./chatRequestSchema";

export type ActivityStatus = "running" | "complete" | "stopped" | "error";

export type ProviderId = "local" | ChatRequest["provider"];

export interface Reference {
  id: string;
  title: string;
  content: string;
  link: string;
  media?: string;
  icon?: string;
}

/** Every source is translated into this protocol; views never depend on vendor fields. */
export type ChatEvent =
  | { type: "text"; delta: string }
  | { type: "reasoning"; id: string; delta: string }
  | {
      type: "tool";
      id: string;
      title: string;
      content: string;
      status: ActivityStatus;
    }
  | { type: "references"; items: Reference[] }
  | {
      type: "metadata";
      requestId?: string;
      requestStage?: "preparing" | "sending" | "waiting";
      recordId?: string;
      title?: string;
      sourceDurationMs?: number;
    }
  | { type: "done" }
  | { type: "error"; message: string };

export interface ProviderInfo {
  id: ProviderId;
  name: string;
  configured: boolean;
  models: string[];
}
