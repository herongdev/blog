import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { I18nProvider } from "@/i18n/useI18n";
import { translate } from "@/i18n/translate";
import {
  darkQuery,
  decodePreferences,
  storageKey,
  type Preferences,
} from "./settings";
import { applyPreferences, readPreferences, savePreferences } from "./browser";

interface PreferencesContextValue {
  preferences: Preferences;
  savingFailed: boolean;
  updatePreferences: (patch: Partial<Preferences>) => void;
}
const PreferencesContext = createContext<PreferencesContextValue | null>(null);
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(readPreferences);
  const [systemDark, setSystemDark] = useState(
    () => matchMedia(darkQuery).matches,
  );
  const [savingFailed, setSavingFailed] = useState(false);
  useEffect(() => {
    const media = matchMedia(darkQuery);
    const update = () => setSystemDark(media.matches);
    update();
    media.addEventListener("change", update);
    const sync = (event: StorageEvent) => {
      if (event.key !== storageKey && event.key !== null) return;
      setPreferences(decodePreferences(event.newValue, navigator.languages));
      setSavingFailed(false);
    };
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("storage", sync);
    };
  }, []);
  useLayoutEffect(() => {
    applyPreferences(preferences, systemDark);
    document.title = translate(preferences.locale, "app.title");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        translate(preferences.locale, "app.description"),
      );
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        getComputedStyle(document.documentElement)
          .getPropertyValue("--surface")
          .trim(),
      );
  }, [preferences, systemDark]);
  const updatePreferences = useCallback(
    (patch: Partial<Preferences>) => {
      // Persist in the event handler, not a state updater (which StrictMode may replay).
      const next = { ...preferences, ...patch };
      setSavingFailed(!savePreferences(next));
      setPreferences(next);
    },
    [preferences],
  );
  const value = useMemo(
    () => ({ preferences, savingFailed, updatePreferences }),
    [preferences, savingFailed, updatePreferences],
  );
  return (
    <PreferencesContext value={value}>
      <I18nProvider locale={preferences.locale}>{children}</I18nProvider>
    </PreferencesContext>
  );
}
export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("PreferencesProvider is required");
  return context;
}
