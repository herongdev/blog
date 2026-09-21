import {
  darkQuery,
  decodePreferences,
  resolveTheme,
  storageKey,
  type Preferences,
} from "./settings";

export function readPreferences(): Preferences {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(storageKey);
  } catch {
    /* Storage can be unavailable in private/restricted contexts. */
  }
  return decodePreferences(raw, navigator.languages);
}
export function savePreferences(preferences: Preferences): boolean {
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ version: 1, ...preferences }),
    );
    return true;
  } catch {
    return false;
  }
}
export function applyPreferences(
  preferences: Preferences,
  systemDark = matchMedia(darkQuery).matches,
) {
  const root = document.documentElement;
  root.lang = preferences.locale;
  root.dataset.theme = resolveTheme(preferences.theme, systemDark);
  root.dataset.themePreference = preferences.theme;
  root.dataset.density = preferences.density;
}
