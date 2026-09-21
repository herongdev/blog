import { useI18n } from "@/i18n/useI18n";
import { Icon } from "@/components/Icon/Icon";
import styles from "./Welcome.module.css";
import {
  ArrowUpRight,
  BookOpen,
  CircleHelp,
  FileText,
  FolderOpen,
  Sparkles,
  Terminal,
} from "lucide-react";
import type { ProviderInfo } from "@shared/contracts/chat";
import type { Scenario } from "../types";
interface WelcomeProps {
  projectName?: string;
  provider: ProviderInfo;
  onSend: (text: string, scenario?: Scenario) => void;
  onConfigure: () => void;
}
export function Welcome({
  projectName,
  provider,
  onSend,
  onConfigure,
}: WelcomeProps) {
  const { t, providerName } = useI18n();

  return (
    <div className={styles["welcome"]}>
      <div className={styles["welcome-symbol"]}>
        <Icon
          icon={projectName ? FolderOpen : Sparkles}
          size="hero"
          weight="light"
        />
      </div>
      <h1>{projectName ?? t("welcome.title")}</h1>
      {!projectName && (
        <div className={styles["suggestion-grid"]}>
          {provider.id === "local" ? (
            <>
              <button
                className={styles["suggestion-card"]}
                onClick={() => onSend(t("welcome.samplePrompt"), "sample")}
              >
                <Icon icon={FileText} size="lg" />
                <strong>{t("welcome.sampleTitle")}</strong>
                <span>{t("welcome.samplePrompt")}</span>
                <Icon icon={ArrowUpRight} size="md" />
              </button>
              <button
                className={styles["suggestion-card"]}
                onClick={() => onSend(t("welcome.markdownPrompt"), "markdown")}
              >
                <Icon icon={Terminal} size="lg" />
                <strong>{t("welcome.markdownTitle")}</strong>
                <span>{t("welcome.markdownDescription")}</span>
                <Icon icon={ArrowUpRight} size="md" />
              </button>
            </>
          ) : (
            <>
              <button
                className={styles["suggestion-card"]}
                onClick={() => onSend(t("welcome.conceptPrompt"))}
              >
                <Icon icon={Terminal} size="lg" />
                <strong>{t("welcome.conceptTitle")}</strong>
                <span>{t("welcome.conceptDescription")}</span>
                <Icon icon={ArrowUpRight} size="md" />
              </button>
              <button
                className={styles["suggestion-card"]}
                onClick={() => onSend(t("welcome.planPrompt"))}
              >
                <Icon icon={BookOpen} size="lg" />
                <strong>{t("welcome.planTitle")}</strong>
                <span>{t("welcome.planDescription")}</span>
                <Icon icon={ArrowUpRight} size="md" />
              </button>
            </>
          )}
        </div>
      )}
      {!provider.configured && (
        <div className={styles["connection-hint"]}>
          <Icon icon={CircleHelp} size="md" />
          <span>
            {t("welcome.configure", { provider: providerName(provider.id) })}
          </span>
          <button onClick={onConfigure}>
            {t("welcome.configureAction")}
            <Icon icon={ArrowUpRight} size="xs" />
          </button>
        </div>
      )}
    </div>
  );
}
