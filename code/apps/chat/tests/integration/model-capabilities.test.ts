import { describe, expect, it } from "vitest";
import { supportsThinkingToggle } from "../../shared/contracts/modelCapabilities";
import { upstreamBody } from "../../server/model-providers/upstream";

describe("model-specific thinking controls", () => {
  it("recognizes verified models without assuming support for custom models", () => {
    expect(supportsThinkingToggle("local", "sample")).toBe(false);
    expect(supportsThinkingToggle("deepseek", "deepseek-v4-pro")).toBe(true);
    expect(supportsThinkingToggle("aliyun", "qwen-plus")).toBe(true);
    expect(supportsThinkingToggle("aliyun", "qwen-plus-unknown")).toBe(false);
    expect(supportsThinkingToggle("deepseek", "custom-model")).toBe(false);
  });
  it("omits unsupported vendor parameters even if the client requests thinking", () => {
    for (const provider of ["deepseek", "aliyun"] as const) {
      const body = upstreamBody(
        {
          provider,
          model: "custom-model",
          thinking: true,
          messages: [{ role: "user", content: "test" }],
        },
        "test",
      );
      expect(body).not.toHaveProperty("thinking");
      expect(body).not.toHaveProperty("enable_thinking");
      expect(body).not.toHaveProperty("service_tier");
    }
  });
});
