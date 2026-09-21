import { describe, expect, it } from "vitest";
import { zh, en } from "./catalog";
import { createTranslator, translate } from "./translate";
import { translateNotice } from "./notices";

describe("translation contracts", () => {
  it("every language has the same keys and interpolation fields", () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(zh).sort());
    const fields = (text: string) =>
      [...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
    for (const key of Object.keys(zh) as (keyof typeof zh)[]) {
      expect(en[key].trim(), key).not.toBe("");
      expect(fields(en[key]), key).toEqual(fields(zh[key]));
    }
  });
  it("formats counts and keeps externally supplied text literal", () => {
    expect(translate("en", "message.sourceOne", { count: 1 })).toBe("1 source");
    expect(translate("en", "message.sourceMany", { count: 2 })).toBe(
      "2 sources",
    );
    const t = createTranslator("zh-CN");
    expect(t("citation.labelMany", { title: "<标题>{count}", count: 2 })).toBe(
      "查看引用：<标题>{count}，共 2 个来源",
    );
    // Type-check the public API without executing invalid calls.
    const _invalidCalls = () => {
      // @ts-expect-error unknown translation key
      t("missing.key");
      // @ts-expect-error count is required
      t("message.sourceMany");
      // @ts-expect-error count cannot be replaced with another field
      t("message.sourceMany", { amount: 2 });
    };
    void _invalidCalls;
  });
  it("localizes known application notices but preserves unknown diagnostics", () => {
    const message = "等待模型响应超时，请稍后重试。";
    expect(translateNotice("zh-CN", message)).toBe(message);
    expect(translateNotice("en", message)).toContain("timed out");
    expect(
      translateNotice("en", "模型服务暂时不可用（HTTP 503），请稍后重试。"),
    ).toContain("HTTP 503");
    expect(
      translateNotice(
        "en",
        "阿里云百炼 尚未配置 API Key，请在 .env.local 中配置后重启服务。",
      ),
    ).toContain("Alibaba Cloud Bailian has no API key");
    expect(translateNotice("en", "unknown provider diagnostic 123")).toBe(
      "unknown provider diagnostic 123",
    );
  });
});
