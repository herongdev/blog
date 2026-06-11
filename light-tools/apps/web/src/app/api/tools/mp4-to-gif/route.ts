import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { runFfmpeg } from "@/lib/server/ffmpeg";
import { assertMp4Upload, UploadValidationError } from "@/lib/server/upload-security";

export const runtime = "nodejs";
export const maxDuration = 120;

const MAX_UPLOAD_BYTES = 50 * 1024 * 1024;
const BYTES_IN_MB = 1024 * 1024;

interface ConversionAttempt {
  width: number;
  height: number;
  fps: number;
  colors: number;
}

function jsonError(message: string, status = 400, detail?: string) {
  return NextResponse.json({ ok: false, message, detail }, { status });
}

function parseNumber(
  formData: FormData,
  key: string,
  fallback: number,
  min: number,
  max: number
): number {
  const value = Number(formData.get(key));
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function buildAttempts(width: number, height: number, fps: number): ConversionAttempt[] {
  const scales = [1, 0.85, 0.7, 0.55];
  const colors = [128, 96, 64, 48];

  return scales.map((scale, index) => ({
    width: Math.max(120, Math.round((width * scale) / 2) * 2),
    height: Math.max(120, Math.round((height * scale) / 2) * 2),
    fps: Math.max(5, Math.round(fps - index * 2)),
    colors: colors[index] ?? 64
  }));
}

function buildGifFilter(attempt: ConversionAttempt): string {
  const prepare = [
    `fps=${attempt.fps}`,
    `scale=${attempt.width}:${attempt.height}:force_original_aspect_ratio=decrease:flags=lanczos`,
    "setsar=1",
    "split[s0][s1]"
  ].join(",");

  return `${prepare};[s0]palettegen=max_colors=${attempt.colors}[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5`;
}

async function convertAttempt(inputPath: string, outputPath: string, attempt: ConversionAttempt, start: number, duration: number) {
  await runFfmpeg([
    "-y",
    "-hide_banner",
    "-ss",
    String(start),
    "-i",
    inputPath,
    "-t",
    String(duration),
    "-an",
    "-vf",
    buildGifFilter(attempt),
    outputPath
  ]);
}

export async function POST(request: Request) {
  let tempDir: string | undefined;

  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("multipart/form-data")) {
      return jsonError("请先选择一个 MP4 文件。");
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return jsonError("请先选择一个 MP4 文件。");
    }

    const inputBuffer = await assertMp4Upload(file, MAX_UPLOAD_BYTES);

    const width = parseNumber(formData, "width", 480, 120, 1280);
    const height = parseNumber(formData, "height", 270, 120, 1280);
    const fps = parseNumber(formData, "fps", 12, 5, 24);
    const startSeconds = parseNumber(formData, "startSeconds", 0, 0, 600);
    const durationSeconds = parseNumber(formData, "durationSeconds", 6, 1, 30);
    const targetSizeMb = parseNumber(formData, "targetSizeMb", 5, 0.5, 20);
    const targetBytes = Math.round(targetSizeMb * BYTES_IN_MB);

    tempDir = path.join(os.tmpdir(), `light-tools-${randomUUID()}`);
    await mkdir(tempDir, { recursive: true });

    const inputPath = path.join(tempDir, "input.mp4");
    const outputPath = path.join(tempDir, "output.gif");

    await writeFile(inputPath, inputBuffer);

    const attempts = buildAttempts(width, height, fps);
    let selectedAttempt = attempts[0]!;
    let outputBytes = 0;

    for (const attempt of attempts) {
      selectedAttempt = attempt;
      await convertAttempt(inputPath, outputPath, attempt, startSeconds, durationSeconds);
      outputBytes = (await stat(outputPath)).size;
      if (outputBytes <= targetBytes) break;
    }

    const gif = await readFile(outputPath);
    const warning =
      outputBytes > targetBytes
        ? "已自动压缩多轮，但 GIF 仍超过目标体积。建议缩短时长或降低尺寸。"
        : "";

    return new Response(gif, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
        "Content-Disposition": `attachment; filename="converted-${Date.now()}.gif"`,
        "Cache-Control": "no-store",
        "X-Output-Size-Bytes": String(outputBytes),
        "X-Target-Size-Bytes": String(targetBytes),
        "X-Output-Width": String(selectedAttempt.width),
        "X-Output-Height": String(selectedAttempt.height),
        "X-Output-Fps": String(selectedAttempt.fps),
        "X-Compression-Warning": encodeURIComponent(warning)
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "未知错误";
    if (error instanceof UploadValidationError) {
      return jsonError(message);
    }

    const isFfmpegError =
      message.includes("spawn") ||
      message.includes("Library not loaded") ||
      message.includes("FFmpeg");

    return jsonError(
      isFfmpegError
        ? "FFmpeg 不可用或转换失败，请检查服务器 FFmpeg 配置。"
        : "转换失败，请换一个短视频再试。",
      500,
      message
    );
  } finally {
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true });
    }
  }
}
