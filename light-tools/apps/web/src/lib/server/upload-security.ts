const DANGEROUS_SIGNATURES: Array<{ name: string; bytes: number[] }> = [
  { name: "Windows 可执行文件", bytes: [0x4d, 0x5a] },
  { name: "Linux 可执行文件", bytes: [0x7f, 0x45, 0x4c, 0x46] },
  { name: "macOS 可执行文件", bytes: [0xcf, 0xfa, 0xed, 0xfe] },
  { name: "macOS 可执行文件", bytes: [0xca, 0xfe, 0xba, 0xbe] },
  { name: "Shell 脚本", bytes: [0x23, 0x21] }
];

const DISGUISED_FILE_SIGNATURES: Array<{ name: string; bytes: number[] }> = [
  { name: "PDF", bytes: [0x25, 0x50, 0x44, 0x46] },
  { name: "PNG", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { name: "JPEG", bytes: [0xff, 0xd8, 0xff] },
  { name: "GIF", bytes: [0x47, 0x49, 0x46, 0x38] },
  { name: "ZIP", bytes: [0x50, 0x4b, 0x03, 0x04] }
];

export class UploadValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadValidationError";
  }
}

function startsWithBytes(buffer: Buffer, bytes: number[]): boolean {
  if (buffer.length < bytes.length) return false;
  return bytes.every((byte, index) => buffer[index] === byte);
}

function findSignature(buffer: Buffer, signatures: Array<{ name: string; bytes: number[] }>) {
  return signatures.find((signature) => startsWithBytes(buffer, signature.bytes));
}

function hasMp4FtypBox(buffer: Buffer): boolean {
  const signature = Buffer.from("ftyp", "ascii");
  const index = buffer.indexOf(signature);

  return index >= 4 && index <= 16;
}

export function assertSafeUploadName(fileName: string, expectedExtension: string): void {
  const normalizedName = fileName.trim().toLowerCase();
  const extension = expectedExtension.startsWith(".")
    ? expectedExtension
    : `.${expectedExtension}`;

  if (!normalizedName.endsWith(extension)) {
    throw new UploadValidationError(`文件扩展名必须是 ${extension}。`);
  }

  if (normalizedName.includes("/") || normalizedName.includes("\\") || normalizedName.includes("\0")) {
    throw new UploadValidationError("文件名包含不安全字符，请重命名后再上传。");
  }
}

export function assertUploadSize(file: File, maxBytes: number): void {
  if (file.size <= 0) {
    throw new UploadValidationError("文件为空，请重新选择。");
  }

  if (file.size > maxBytes) {
    throw new UploadValidationError(`当前单个文件最大支持 ${Math.floor(maxBytes / 1024 / 1024)}MB。`);
  }
}

export async function assertMp4Upload(file: File, maxBytes: number): Promise<Buffer> {
  assertUploadSize(file, maxBytes);
  assertSafeUploadName(file.name, ".mp4");

  const header = Buffer.from(await file.slice(0, 64).arrayBuffer());
  const dangerousSignature = findSignature(header, DANGEROUS_SIGNATURES);
  if (dangerousSignature) {
    throw new UploadValidationError(`检测到疑似${dangerousSignature.name}，已拒绝上传。`);
  }

  const disguisedSignature = findSignature(header, DISGUISED_FILE_SIGNATURES);
  if (disguisedSignature) {
    throw new UploadValidationError(`文件内容像 ${disguisedSignature.name}，不是 MP4。`);
  }

  if (!hasMp4FtypBox(header)) {
    throw new UploadValidationError("文件头校验失败，请上传有效的 MP4 文件。");
  }

  const normalizedType = file.type.toLowerCase();
  const isAcceptableMime =
    normalizedType === "" ||
    normalizedType === "video/mp4" ||
    normalizedType === "application/mp4" ||
    normalizedType === "application/octet-stream";

  if (!isAcceptableMime) {
    throw new UploadValidationError("文件 MIME 类型不是 MP4。");
  }

  return Buffer.from(await file.arrayBuffer());
}
