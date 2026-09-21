import type { ProviderInfo } from "@shared/contracts/chat";

export const defaultProviders: ProviderInfo[] = [
  { id: "local", name: "本地样例", configured: true, models: ["sample"] },
  {
    id: "aliyun",
    name: "阿里云百炼",
    configured: false,
    models: ["qwen-plus"],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    configured: false,
    models: ["deepseek-v4-flash"],
  },
];

function isProvider(value: unknown): value is ProviderInfo {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    defaultProviders.some((p) => p.id === value.id) &&
    "name" in value &&
    typeof value.name === "string" &&
    Boolean(value.name.trim()) &&
    "configured" in value &&
    typeof value.configured === "boolean" &&
    "models" in value &&
    Array.isArray(value.models) &&
    value.models.length > 0 &&
    value.models.every(
      (model) => typeof model === "string" && Boolean(model.trim()),
    )
  );
}

export async function getProviderInfo(
  signal?: AbortSignal,
): Promise<ProviderInfo[]> {
  const response = await fetch("/api/providers", { signal });
  if (!response.ok)
    throw new Error("本地服务未连接，请确认已运行 npm run dev。");
  const data: unknown = await response.json().catch(() => null);
  const providers =
    typeof data === "object" && data !== null && "providers" in data
      ? data.providers
      : undefined;
  if (
    !Array.isArray(providers) ||
    !providers.every(isProvider) ||
    providers.length !== defaultProviders.length ||
    new Set(providers.map((p) => p.id)).size !== defaultProviders.length
  )
    throw new Error("模型配置数据格式异常，请检查本地服务后重试。");
  return providers.map(({ id, name, configured, models }) => ({
    id,
    name,
    configured,
    models,
  }));
}
