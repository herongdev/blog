import type { ChatRequest, ProviderInfo } from "../../shared/contracts/chat";

export interface ProviderConfig extends ProviderInfo {
  id: ChatRequest["provider"];
  baseUrl: string;
  apiKey: string;
}
function configuredModels(
  value: string | undefined,
  fallback: string[],
): string[] {
  const models = [
    ...new Set(
      (value ?? "")
        .split(",")
        .map((model) => model.trim())
        .filter(Boolean),
    ),
  ];
  return models.length ? models : fallback;
}
export function getProviders(
  env: NodeJS.ProcessEnv = process.env,
): ProviderConfig[] {
  return [
    {
      id: "aliyun",
      name: "阿里云百炼",
      baseUrl:
        env.DASHSCOPE_BASE_URL ||
        "https://dashscope.aliyuncs.com/compatible-mode/v1",
      apiKey: env.DASHSCOPE_API_KEY || "",
      configured: Boolean(env.DASHSCOPE_API_KEY?.trim()),
      models: configuredModels(env.DASHSCOPE_MODELS, [
        "qwen-plus",
        "qwen-flash",
        "qwen3-vl-plus",
      ]),
    },
    {
      id: "deepseek",
      name: "DeepSeek",
      baseUrl: env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
      apiKey: env.DEEPSEEK_API_KEY || "",
      configured: Boolean(env.DEEPSEEK_API_KEY?.trim()),
      models: configuredModels(env.DEEPSEEK_MODELS, [
        "deepseek-v4-flash",
        "deepseek-v4-pro",
        "deepseek-v4-flash-vision-exp",
      ]),
    },
  ];
}

export function publicProvider({
  id,
  name,
  models,
  configured,
}: ProviderConfig): ProviderInfo {
  return { id, name, models, configured };
}
