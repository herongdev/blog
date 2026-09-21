import { describe, expect, it } from "vitest";
import {
  decodePreferences,
  detectLocale,
  resolveTheme,
  type ThemePreference,
} from "./settings";

describe("preference policy", () => {
  it("chooses a supported browser language and a deterministic fallback", () => {
    expect(detectLocale(["fr-FR", "en-GB", "zh-CN"])).toBe("en");
    expect(detectLocale(["zh-TW", "en-US"])).toBe("zh-CN");
    expect(detectLocale(["fr-FR"])).toBe("zh-CN");
    expect(detectLocale([])).toBe("zh-CN");
  });
  it("invalid or unavailable storage cannot break startup", () => {
    for (const raw of [
      null,
      "broken",
      "null",
      "[]",
      "true",
      '{"version":99,"locale":"en","theme":"dark"}',
    ]) {
      expect(decodePreferences(raw, ["zh-CN"])).toEqual({
        locale: "zh-CN",
        theme: "system",
        density: "standard",
      });
    }
    expect(
      decodePreferences('{"version":1,"locale":"invalid","theme":"dark"}', [
        "en-US",
      ]),
    ).toEqual({ locale: "en", theme: "dark", density: "standard" });
    expect(
      decodePreferences('{"version":1,"locale":"zh-CN","theme":"invalid"}', [
        "en-US",
      ]),
    ).toEqual({ locale: "zh-CN", theme: "system", density: "standard" });
    expect(
      decodePreferences('{"version":1,"locale":"en","theme":"light"}', [
        "zh-CN",
      ]),
    ).toEqual({ locale: "en", theme: "light", density: "standard" });
  });
  it("adds density without losing older preferences and rejects unsupported values", () => {
    for (const density of [
      "compact",
      "standard",
      "comfortable",
      "dense",
      null,
      0,
    ]) {
      expect(
        decodePreferences(
          JSON.stringify({
            version: 1,
            locale: "en",
            theme: "dark",
            density,
          }),
          ["zh-CN"],
        ),
      ).toEqual({
        locale: "en",
        theme: "dark",
        density: ["compact", "standard", "comfortable"].includes(
          density as string,
        )
          ? density
          : "standard",
      });
    }
  });
  it.each<[ThemePreference, boolean, string]>([
    ["system", true, "dark"],
    ["system", false, "light"],
    ["light", true, "light"],
    ["light", false, "light"],
    ["dark", true, "dark"],
    ["dark", false, "dark"],
  ])("resolves %s with system dark=%s to %s", (theme, dark, expected) => {
    expect(resolveTheme(theme, dark)).toBe(expected);
  });
});
