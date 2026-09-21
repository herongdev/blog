import { z } from "zod";
import type { ChatEvent } from "./chat";

const requestIdSchema = z.string().uuid();
export function parseRequestId(value: string | null): string | undefined {
  const result = requestIdSchema.safeParse(value);
  return result.success ? result.data : undefined;
}

const referenceSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  content: z.string(),
  link: z.string(),
  media: z.string().optional(),
  icon: z.string().optional(),
});

/** Network data must satisfy the same event contract as the local adapter before it reaches React. */
const chatEventSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("text"), delta: z.string() }),
  z.object({
    type: z.literal("reasoning"),
    id: z.string().min(1),
    delta: z.string(),
  }),
  z.object({
    type: z.literal("tool"),
    id: z.string().min(1),
    title: z.string(),
    content: z.string(),
    status: z.enum(["running", "complete", "stopped", "error"]),
  }),
  z.object({ type: z.literal("references"), items: z.array(referenceSchema) }),
  z.object({
    type: z.literal("metadata"),
    requestId: requestIdSchema.optional(),
    requestStage: z.enum(["preparing", "sending", "waiting"]).optional(),
    recordId: z.string().optional(),
    title: z.string().optional(),
    sourceDurationMs: z.number().nonnegative().optional(),
  }),
  z.object({ type: z.literal("done") }),
  z.object({ type: z.literal("error"), message: z.string() }),
]) satisfies z.ZodType<ChatEvent>;

export function parseChatEvent(data: string): ChatEvent {
  let value: unknown;
  try {
    value = JSON.parse(data);
  } catch {
    throw new Error("收到无法解析的消息数据，请重试。");
  }
  const result = chatEventSchema.safeParse(value);
  if (!result.success)
    throw new Error("消息数据格式不符合约定，请刷新页面后重试。");
  return result.data;
}
