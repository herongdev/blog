import { z } from "zod";
import { imageDataUrlSchema, requestImageBudget } from "./images";

export const chatRequestSchema = z
  .object({
    provider: z.enum(["aliyun", "deepseek"]),
    model: z.string().min(1).max(120),
    thinking: z.boolean(),
    messages: z
      .array(
        z
          .object({
            role: z.enum(["user", "assistant"]),
            content: z.string().max(100_000),
            images: z.array(imageDataUrlSchema).min(1).max(3).optional(),
            reasoning_content: z.string().max(200_000).optional(),
          })
          .strict()
          .refine(
            (message) =>
              (message.content.length > 0 || !!message.images?.length) &&
              (!message.images || message.role === "user"),
          ),
      )
      .min(1)
      .max(100),
  })
  .strict()
  .refine(
    (request) =>
      request.messages.reduce(
        (sum, message) =>
          sum + (message.images?.reduce((n, url) => n + url.length, 0) ?? 0),
        0,
      ) <= requestImageBudget,
    "图片上下文过大，请开启新对话。",
  );

export type ChatRequest = z.infer<typeof chatRequestSchema>;
