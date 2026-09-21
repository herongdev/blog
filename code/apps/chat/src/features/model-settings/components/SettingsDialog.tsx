import { useI18n } from "@/i18n/useI18n";
import { Icon } from "@/components/Icon/Icon";
import primitives from "@/styles/primitives.module.css";
import styles from "./SettingsDialog.module.css";
import { useEffect, useRef } from "react";
import { CheckCircle2, KeyRound, RefreshCw, X } from "lucide-react";
import type { ProviderInfo } from "@shared/contracts/chat";
export function SettingsDialog({
  open,
  onClose,
  providers,
  onRefresh,
  error,
}: {
  open: boolean;
  onClose: () => void;
  providers: ProviderInfo[];
  onRefresh: () => void;
  error?: string;
}) {
  const { t, providerName, notice } = useI18n();

  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className={styles["settings-dialog"]}
      aria-labelledby="settings-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles["settings-content"]}>
        <div className={styles["settings-heading"]}>
          <div>
            <span className={primitives["eyebrow"]}>
              {t("settings.eyebrow")}
            </span>
            <h2 id="settings-title">{t("settings.title")}</h2>
          </div>
          <button
            className={primitives["icon-button"]}
            aria-label={t("settings.close")}
            onClick={onClose}
          >
            <Icon icon={X} size="md" />
          </button>
        </div>
        <p className={styles["settings-intro"]}>
          {t("settings.introBefore")}
          <code>.env.local</code>
          {t("settings.introAfter")}
        </p>
        <div className={styles["provider-status-list"]}>
          {providers
            .filter((p) => p.id !== "local")
            .map((provider) => (
              <div className={styles["provider-status"]} key={provider.id}>
                <span
                  className={
                    styles["provider-symbol"] +
                    " " +
                    (styles[provider.id] ?? "")
                  }
                >
                  {provider.id === "aliyun" ? "Q" : "D"}
                </span>
                <div>
                  <strong>{providerName(provider.id)}</strong>
                  <small>{provider.models.join(" · ")}</small>
                </div>
                <span
                  className={
                    provider.configured
                      ? styles["configured"]
                      : styles["not-configured"]
                  }
                >
                  {provider.configured ? (
                    <>
                      <Icon icon={CheckCircle2} size="sm" />
                      {t("provider.configured")}
                    </>
                  ) : (
                    <>
                      <Icon icon={KeyRound} size="sm" />
                      {t("provider.notConfigured")}
                    </>
                  )}
                </span>
              </div>
            ))}
        </div>
        <ol className={styles["setup-steps"]}>
          <li>
            {t("settings.copyBefore")}
            <code>.env.example</code>
            {t("settings.copyBetween")}
            <code>.env.local</code>
            {t("settings.copyAfter")}
          </li>
          <li>{t("settings.keys")}</li>
          <li>
            {t("settings.restartBefore")}
            <code>npm run dev</code>
            {t("settings.restartAfter")}
          </li>
        </ol>
        <pre className={styles["env-example"]}>
          {`DASHSCOPE_API_KEY=${t("settings.keyAliyun")}\nDEEPSEEK_API_KEY=${t("settings.keyDeepseek")}`}
        </pre>
        <p className={styles["settings-note"]}>{t("settings.note")}</p>
        {error && (
          <p className={styles["settings-error"]} role="alert">
            {notice(error)}
          </p>
        )}
        <div className={styles["settings-footer"]}>
          <button className={styles["secondary-button"]} onClick={onRefresh}>
            <Icon icon={RefreshCw} size="sm" />
            {t("settings.refresh")}
          </button>
          <button className={styles["primary-button"]} onClick={onClose}>
            {t("common.done")}
          </button>
        </div>
      </div>
    </dialog>
  );
}
