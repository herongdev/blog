import { imageBytes, supportsImages } from "@shared/contracts/images";
import {
  isImageAttachment,
  type Attachment,
  type TextAttachment,
} from "../types";
export type { TextAttachment } from "../types";
export type AttachmentKind = "text" | "image";
export type AttachmentError =
  | "type"
  | "size"
  | "count"
  | "read"
  | "local"
  | "imageUnsupported"
  | "modelChanged";
export const attachmentAccept = {
  text: ".txt,.md,.json",
  image: ".png,.jpg,.jpeg,.webp",
};
export function attachmentCapabilityError(
  provider: string,
  model: string,
  kind: AttachmentKind,
): AttachmentError | undefined {
  if (provider === "local") return "local";
  if (kind === "image" && !supportsImages(provider, model))
    return "imageUnsupported";
}
export const attachmentLimit = 3;
export const attachmentBytes = 16 * 1024;
export const imageFile = (file: { name: string }) =>
  /\.(png|jpe?g|webp)$/i.test(file.name);
export function attachmentFileError(file: {
  name: string;
  size: number;
}): AttachmentError | undefined {
  if (!imageFile(file) && !/\.(txt|md|json)$/i.test(file.name)) return "type";
  if (file.size > (imageFile(file) ? imageBytes : attachmentBytes))
    return "size";
}
export function attachmentMessage(
  text: string,
  attachments: Attachment[],
): string {
  return [
    text.trim(),
    ...attachments
      .filter((file): file is TextAttachment => !isImageAttachment(file))
      .map((file) => `\n[${file.name}]\n${file.content}`),
  ]
    .filter(Boolean)
    .join("\n")
    .trim();
}
