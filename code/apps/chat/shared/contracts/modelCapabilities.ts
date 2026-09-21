import type { ProviderId } from "./chat";

// Verified API adapters, not guesses based on a provider's name. Unknown models
// keep their upstream defaults until their capability is explicitly supported.
// Sources and verification date: docs/模型选择与能力.md.
export function supportsThinkingToggle(
  provider: ProviderId,
  model: string,
): boolean {
  if (provider === "deepseek") {
    return [
      "deepseek-v4-flash",
      "deepseek-v4-pro",
      "deepseek-v4-flash-vision-exp",
    ].includes(model);
  }
  if (provider === "aliyun") {
    return [
      "qwen-plus",
      "qwen-plus-latest",
      "qwen-flash",
      "qwen3-vl-plus",
      "qwen3-vl-flash",
    ].includes(model);
  }
  return false;
}
