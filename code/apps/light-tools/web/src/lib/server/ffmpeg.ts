import { constants } from "node:fs";
import { access } from "node:fs/promises";
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import path from "node:path";

const require = createRequire(import.meta.url);

async function exists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

export async function resolveFfmpegPath(): Promise<string> {
  const candidates: Array<string | undefined | null> = [
    process.env.LIGHT_TOOLS_FFMPEG_PATH,
    process.env.FFMPEG_BIN,
    process.env.FFMPEG_PATH
  ];

  try {
    candidates.push(require("ffmpeg-static") as string | null);
  } catch {
    // ffmpeg-static is optional at runtime; system ffmpeg can still be used.
  }

  try {
    const packageJsonPath = require.resolve("ffmpeg-static/package.json");
    const binaryName = process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg";
    candidates.push(path.join(path.dirname(packageJsonPath), binaryName));
  } catch {
    // Some deploy targets may rely on a system FFmpeg instead.
  }

  for (const candidate of candidates) {
    if (candidate && (await exists(candidate))) {
      return candidate;
    }
  }

  return "ffmpeg";
}

export interface FfmpegResult {
  stderr: string;
}

export async function runFfmpeg(args: string[], timeoutMs = 120_000): Promise<FfmpegResult> {
  const ffmpegPath = await resolveFfmpegPath();

  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, {
      stdio: ["ignore", "ignore", "pipe"]
    });

    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error("FFmpeg 处理超时，请缩短转换时长或降低输出尺寸。"));
    }, timeoutMs);

    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString("utf8");
    });

    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });

    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) {
        resolve({ stderr });
        return;
      }

      const detail = stderr.trim().slice(-1600);
      reject(new Error(detail || `FFmpeg 退出码：${code ?? "unknown"}`));
    });
  });
}
