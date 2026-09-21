import { z } from "zod";

export const imageBytes = 4 * 1024 * 1024;
export const imageDataUrlLimit = Math.ceil(imageBytes / 3) * 4 + 64;
export const requestImageBudget = 16 * 1024 * 1024;
export const imageDataUrlSchema = z
  .string()
  .max(imageDataUrlLimit)
  .regex(/^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/);

/** Explicit, conservative capability list, shared by both request boundaries. */
export function supportsImages(provider: string, model: string): boolean {
  if (provider === "deepseek") return model === "deepseek-v4-flash-vision-exp";
  return (
    provider === "aliyun" &&
    /^qwen(?:2(?:\.5)?|3)?-vl-(?:plus|max|\d+b)(?:-|$)/i.test(model)
  );
}
