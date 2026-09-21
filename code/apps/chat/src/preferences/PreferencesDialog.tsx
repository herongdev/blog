import { useEffect, useId, useRef } from "react";
import { Languages, Monitor, Moon, Sun, X } from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { useI18n } from "@/i18n/useI18n";
import type {
  DensityPreference,
  Preferences,
  ThemePreference,
} from "./settings";
import type { Locale } from "@/i18n/catalog";
import primitives from "@/styles/primitives.module.css";
import styles from "./PreferencesDialog.module.css";

const densities: DensityPreference[] = ["compact", "standard", "comfortable"];

export function PreferencesDialog({
  open,
  onClose,
  preferences,
  onChange,
  savingFailed,
}: {
  open: boolean;
  onClose: () => void;
  preferences: Preferences;
  onChange: (patch: Partial<Preferences>) => void;
  savingFailed: boolean;
}) {
  const { t } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);
  const languages: { value: Locale; label: string }[] = [
    { value: "zh-CN", label: "简体中文" },
    { value: "en", label: "English" },
  ];
  const themes: { value: ThemePreference; label: string; icon: typeof Sun }[] =
    [
      { value: "light", label: t("preferences.light"), icon: Sun },
      { value: "dark", label: t("preferences.dark"), icon: Moon },
      { value: "system", label: t("preferences.system"), icon: Monitor },
    ];
  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby={`${id}-title`}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.content}>
        <div className={styles.heading}>
          <h2 id={`${id}-title`}>{t("preferences.title")}</h2>
          <button
            type="button"
            className={primitives["icon-button"]}
            aria-label={t("preferences.close")}
            onClick={onClose}
          >
            <Icon icon={X} />
          </button>
        </div>
        <fieldset className={styles.section}>
          <legend>{t("preferences.language")}</legend>
          <p>{t("preferences.languageDescription")}</p>
          <div className={styles.options}>
            {languages.map(({ value, label }) => (
              <label key={value} className={styles.option}>
                <input
                  type="radio"
                  name={`${id}-locale`}
                  value={value}
                  checked={preferences.locale === value}
                  onChange={() => onChange({ locale: value })}
                />
                <span>
                  <Icon icon={Languages} size="md" />
                  <span lang={value}>{label}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className={styles.section}>
          <legend>{t("preferences.theme")}</legend>
          <p>{t("preferences.themeDescription")}</p>
          <div className={styles.options}>
            {themes.map(({ value, label, icon }) => (
              <label key={value} className={styles.option}>
                <input
                  type="radio"
                  name={`${id}-theme`}
                  value={value}
                  checked={preferences.theme === value}
                  onChange={() => onChange({ theme: value })}
                />
                <span>
                  <Icon icon={icon} size="md" />
                  {label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className={styles.section}>
          <legend>{t("preferences.density")}</legend>
          <p>{t("preferences.densityDescription")}</p>
          <div className={`${styles.options} ${styles["density-options"]}`}>
            {densities.map((value) => (
              <label
                key={value}
                className={`${styles.option} ${styles["density-option"]}`}
                data-value={value}
              >
                <input
                  type="radio"
                  name={`${id}-density`}
                  value={value}
                  checked={preferences.density === value}
                  onChange={() => onChange({ density: value })}
                />
                <span>
                  <span
                    className={styles["density-preview"]}
                    aria-hidden="true"
                  >
                    <i />
                    <i />
                    <i />
                  </span>
                  {t(`preferences.${value}`)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {savingFailed && (
          <p className={styles.notice} role="status">
            {t("preferences.storageError")}
          </p>
        )}
        <div className={styles.footer}>
          <button type="button" className={styles.done} onClick={onClose}>
            {t("common.done")}
          </button>
        </div>
      </div>
    </dialog>
  );
}
