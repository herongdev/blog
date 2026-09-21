import { imageFile } from "../lib/attachments";
import type { Attachment } from "../types";

/** Decode locally before accepting a file; never fetch dragged remote URLs. */
export async function readAttachment(file: File): Promise<Attachment> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const base = { id: crypto.randomUUID(), name: file.name };
  if (!imageFile(file)) {
    const content = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    if (
      !content.trim() ||
      Array.from(content).some(
        (char) =>
          char.charCodeAt(0) < 32 && ![9, 10, 13].includes(char.charCodeAt(0)),
      )
    )
      throw new Error("Invalid text");
    return { ...base, content };
  }
  const mime =
    bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71
      ? "image/png"
      : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255
        ? "image/jpeg"
        : new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF" &&
            new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP"
          ? "image/webp"
          : undefined;
  if (!mime) throw new Error("Invalid image");
  const blob = new Blob([bytes], { type: mime });
  const bitmap = await createImageBitmap(blob);
  let width: number, height: number;
  try {
    width = bitmap.width;
    height = bitmap.height;
    if (
      !width ||
      !height ||
      width > 8192 ||
      height > 8192 ||
      width * height > 32_000_000
    )
      throw new Error("Image dimensions too large");
  } finally {
    bitmap.close();
  }
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Cannot read image"));
    reader.readAsDataURL(blob);
  });
  return { ...base, kind: "image", dataUrl, width, height };
}
