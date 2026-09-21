import { isIP } from "node:net";

export const DEFAULT_CHAT_TIMEOUT_MS = 120_000;
export const DEFAULT_MAX_ACTIVE_GENERATIONS = 8;

function integer(
  env: NodeJS.ProcessEnv,
  name: string,
  fallback: number,
  maximum: number,
) {
  const raw = env[name];
  if (raw === undefined || raw === "") return fallback;
  const value = Number(raw);
  if (
    !/^\d+$/.test(raw) ||
    !Number.isSafeInteger(value) ||
    value < 1 ||
    value > maximum
  )
    throw new Error(`${name} 必须是 1 到 ${maximum} 之间的整数。`);
  return value;
}

export function readRuntimeConfig(env: NodeJS.ProcessEnv = process.env) {
  const bindAddress = env.APP_BIND_ADDRESS || "127.0.0.1";
  if (bindAddress !== "localhost" && !isIP(bindAddress))
    throw new Error("APP_BIND_ADDRESS 必须是 IP 地址或 localhost。");

  let origin: string | undefined;
  if (env.APP_ORIGIN) {
    try {
      const parsed = new URL(env.APP_ORIGIN);
      if (
        !["http:", "https:"].includes(parsed.protocol) ||
        parsed.username ||
        parsed.password ||
        parsed.pathname !== "/" ||
        parsed.search ||
        parsed.hash
      )
        throw new Error("invalid origin");
      origin = parsed.origin;
    } catch {
      throw new Error(
        "APP_ORIGIN 必须是完整的 HTTP(S) 站点来源，不包含路径、查询或凭据。",
      );
    }
  }
  if (!["127.0.0.1", "::1", "localhost"].includes(bindAddress) && !origin)
    throw new Error("监听非回环地址时必须设置 APP_ORIGIN。");

  return {
    bindAddress,
    origin,
    port: integer(env, "PORT", 3001, 65_535),
    chatTimeoutMs: integer(
      env,
      "APP_CHAT_TIMEOUT_MS",
      DEFAULT_CHAT_TIMEOUT_MS,
      600_000,
    ),
    maxActiveGenerations: integer(
      env,
      "APP_MAX_ACTIVE_GENERATIONS",
      DEFAULT_MAX_ACTIVE_GENERATIONS,
      10_000,
    ),
  };
}
