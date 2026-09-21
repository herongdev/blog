import type { Locale } from "@/i18n/catalog";

export type ThemePreference = "light" | "dark" | "system";
export type DensityPreference = "compact" | "standard" | "comfortable";
export interface Preferences {
  locale: Locale;
  theme: ThemePreference;
  density: DensityPreference;
}
export const storageKey = "zhixu.preferences.v1";
export const darkQuery = "(prefers-color-scheme: dark)";
export function detectLocale(languages: readonly string[]): Locale {
  const supported = languages.find((language) =>
    /^(zh|en)(-|$)/i.test(language),
  );
  return supported?.toLowerCase().startsWith("en") ? "en" : "zh-CN";
}
export function decodePreferences(
  raw: string | null,
  languages: readonly string[],
): Preferences {
  const defaults: Preferences = {
    locale: detectLocale(languages),
    theme: "system",
    density: "standard",
  };
  try {
    const data: unknown = JSON.parse(raw ?? "null");
    if (
      !data ||
      typeof data !== "object" ||
      !("version" in data) ||
      data.version !== 1
    )
      return defaults;
    return {
      locale:
        "locale" in data && (data.locale === "zh-CN" || data.locale === "en")
          ? data.locale
          : defaults.locale,
      theme:
        "theme" in data &&
        (data.theme === "light" ||
          data.theme === "dark" ||
          data.theme === "system")
          ? data.theme
          : defaults.theme,
      // Additive v1 field: older saved preferences retain their language and theme.
      density:
        "density" in data &&
        (data.density === "compact" ||
          data.density === "standard" ||
          data.density === "comfortable")
          ? data.density
          : defaults.density,
    };
  } catch {
    return defaults;
  }
}
export const resolveTheme = (theme: ThemePreference, systemDark: boolean) =>
  theme === "system" ? (systemDark ? "dark" : "light") : theme;
