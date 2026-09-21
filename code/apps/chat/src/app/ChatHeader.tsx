import { useI18n } from "@/i18n/useI18n";
import { Icon } from "@/components/Icon/Icon";
import primitives from "../styles/primitives.module.css";
import styles from "./ChatHeader.module.css";
import { PanelLeft } from "lucide-react";
import type { Ref } from "react";
interface ChatHeaderProps {
  projectName?: string;
  onOpenSidebar: () => void;
  sidebarId: string;
  sidebarOpen: boolean;
  mobile: boolean;
  sidebarButtonRef: Ref<HTMLButtonElement>;
}
export function ChatHeader({
  projectName,
  onOpenSidebar,
  sidebarId,
  sidebarOpen,
  mobile,
  sidebarButtonRef,
}: ChatHeaderProps) {
  const { t } = useI18n();
  const showSidebarButton = !sidebarOpen || mobile;

  return (
    <header className={styles["topbar"]}>
      <div className={styles["page-title"]}>
        <span
          className={styles["sidebar-toggle-slot"]}
          data-visible={showSidebarButton}
          inert={!showSidebarButton}
          aria-hidden={!showSidebarButton}
        >
          <button
            ref={sidebarButtonRef}
            type="button"
            className={
              primitives["icon-button"] + " " + styles["sidebar-toggle"]
            }
            aria-label={t("nav.openSidebar")}
            title={t("nav.openSidebar")}
            aria-controls={sidebarId}
            aria-expanded={sidebarOpen}
            onClick={onOpenSidebar}
          >
            <Icon icon={PanelLeft} size="lg" weight="light" />
          </button>
        </span>
        <span className={styles["breadcrumbs"]} data-project={!!projectName}>
          <span className={styles["topbar-context"]}>
            {projectName ?? t("nav.workspace")}
          </span>
          <span className={styles["topbar-slash"]}>/</span>
          <span>{t("nav.chat")}</span>
        </span>
      </div>
    </header>
  );
}
