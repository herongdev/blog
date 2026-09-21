import { z } from "zod";
import { imageDataUrlSchema } from "@shared/contracts/images";
import type { Conversation } from "../types";

const id = z.string().min(1);
const activity = z.object({
  id,
  kind: z.enum(["reasoning", "tool"]),
  title: z.string(),
  content: z.string(),
  status: z.enum(["running", "complete", "stopped", "error"]),
});
const reference = z.object({
  id,
  title: z.string(),
  content: z.string(),
  link: z.string(),
  media: z.string().optional(),
  icon: z.string().optional(),
});
const image = z
  .object({
    id,
    kind: z.literal("image"),
    name: z.string(),
    dataUrl: z.union([imageDataUrlSchema, z.literal("")]),
    assetId: id.optional(),
    encodedSize: z.number().nonnegative().optional(),
    width: z.number().positive(),
    height: z.number().positive(),
  })
  .refine((value) => !!value.dataUrl || !!value.assetId);
const message = z.object({
  id,
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  status: z.enum([
    "waiting",
    "streaming",
    "complete",
    "stopped",
    "error",
    "empty",
  ]),
  activities: z.array(activity),
  references: z.record(z.string(), reference),
  createdAt: z.number().nonnegative(),
  finishedAt: z.number().nonnegative().optional(),
  sourceDurationMs: z.number().nonnegative().optional(),
  error: z.string().optional(),
  recordId: z.string().optional(),
  requestId: z.string().optional(),
  interrupted: z.boolean().optional(),
  contextLimited: z.boolean().optional(),
  images: z.array(image).optional(),
});
const conversation = z
  .object({
    id,
    title: z.string(),
    projectId: id.optional(),
    titleEdited: z.boolean().optional(),
    pinnedAt: z.number().nonnegative().optional(),
    archived: z.boolean().optional(),
    deleted: z.boolean().optional(),
    provider: z.enum(["local", "deepseek", "aliyun"]),
    model: id,
    messages: z.array(message),
    draft: z.string().optional(),
    hasDraft: z.boolean().optional(),
    attachments: z
      .array(
        z.union([
          image,
          z.object({ id, name: z.string(), content: z.string() }),
        ]),
      )
      .optional(),
  })
  .refine(
    (value) =>
      new Set(value.messages.map((m) => m.id)).size === value.messages.length,
  );

export const storedConversationSchema = z
  .object({
    version: z.literal(1),
    id,
    revision: id,
    updatedAt: z.number().nonnegative(),
    conversation,
  })
  .refine((value) => value.id === value.conversation.id);
export type StoredConversation = z.infer<typeof storedConversationSchema>;
export type PendingConversation = StoredConversation & {
  baseRevisions: string[];
};

export const projectSchema = z
  .object({
    revision: id.optional(),
    pinnedAt: z.number().nonnegative().optional(),
    deleted: z.boolean().optional(),
    id,
    name: z.string().trim().max(80),
    createdAt: z.number().nonnegative(),
  })
  .refine((project) => project.deleted || project.name.length > 0);
export const storedProjectSchema = z.object({
  version: z.literal(1),
  kind: z.literal("project"),
  project: projectSchema,
});

export const journalSchema = z.object({
  version: z.literal(1),
  activeId: id,
  projects: z.array(projectSchema).default([]),
  projectBases: z.record(z.string(), z.array(z.string())).default({}),
  records: z.array(
    z.object({ record: storedConversationSchema, baseRevisions: z.array(id) }),
  ),
});

/** Persisted content is untrusted. Interrupted runs must never resume by themselves. */
export function restoreConversation(record: StoredConversation): Conversation {
  return {
    ...record.conversation,
    hasDraft: Boolean(
      record.conversation.draft?.trim() ||
      record.conversation.attachments?.length,
    ),
    messages: record.conversation.messages.map((message) => {
      const interrupted =
        message.status === "waiting" || message.status === "streaming";
      return {
        ...message,
        ...(interrupted
          ? {
              status: "stopped" as const,
              interrupted: true,
              finishedAt: record.updatedAt,
            }
          : {}),
        activities: message.activities.map((item) =>
          item.status === "running"
            ? { ...item, status: "stopped" as const }
            : item,
        ),
      };
    }),
  };
}
