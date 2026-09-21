import { AttachmentMenuItem } from "./AttachmentMenuItem";
import type { AttachmentKind } from "../lib/attachments";
import { FloatingFocusManager, FloatingPortal } from "@floating-ui/react";
import { Brain, Check, ImagePlus, Paperclip, Plus, X } from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { useI18n } from "@/i18n/useI18n";
import { useComposerTools } from "../hooks/useComposerTools";
import styles from "./ComposerTools.module.css";

export function ComposerTools({
  disabled,
  textDisabledReason,
  imageDisabledReason,
  onAttach,
  thinking,
  onThinking,
}: {
  disabled: boolean;
  textDisabledReason?: string;
  imageDisabledReason?: string;
  onAttach: (kind: AttachmentKind) => void;
  thinking: boolean;
  onThinking?: () => void;
}) {
  const { t } = useI18n();
  const menu = useComposerTools(disabled);
  const { floatingStyles } = menu;
  return (
    <div className={styles.tools}>
      <button
        ref={menu.refs.setReference}
        type="button"
        className={styles.trigger}
        aria-label={t("composer.tools")}
        title={t("composer.tools")}
        disabled={disabled}
        {...menu.getReferenceProps()}
      >
        <Icon icon={Plus} size="lg" />
      </button>
      {onThinking && thinking && (
        <button
          type="button"
          className={styles.chip}
          aria-label={t("composer.disableThinking")}
          title={t("composer.disableThinking")}
          disabled={disabled}
          onClick={() => menu.select(onThinking)}
        >
          <Icon icon={Brain} size="md" />
          <span>{t("composer.thinking")}</span>
          <Icon icon={X} size="sm" />
        </button>
      )}
      {menu.open && (
        <FloatingPortal>
          <FloatingFocusManager context={menu.context} modal={false}>
            <div
              ref={menu.refs.setFloating}
              style={floatingStyles}
              className={styles.menu}
              aria-label={t("composer.tools")}
              {...menu.getFloatingProps()}
            >
              {(
                [
                  {
                    kind: "text",
                    label: t("composer.addText"),
                    icon: Paperclip,
                    reason: textDisabledReason,
                  },
                  {
                    kind: "image",
                    label: t("composer.addImage"),
                    icon: ImagePlus,
                    reason: imageDisabledReason,
                  },
                ] as const
              ).map((item, index) => (
                <AttachmentMenuItem
                  key={item.kind}
                  label={item.label}
                  icon={item.icon}
                  disabledReason={item.reason}
                  itemRef={(node) => {
                    menu.list.current[index] = node;
                  }}
                  tabIndex={menu.activeIndex === index ? 0 : -1}
                  itemProps={menu.getItemProps()}
                  onSelect={() => menu.select(() => onAttach(item.kind))}
                />
              ))}
              {onThinking && (
                <button
                  ref={(node) => {
                    menu.list.current[2] = node;
                  }}
                  type="button"
                  role="menuitemcheckbox"
                  aria-checked={thinking}
                  className={styles.item}
                  tabIndex={menu.activeIndex === 2 ? 0 : -1}
                  {...menu.getItemProps({
                    onClick: () => menu.select(onThinking),
                  })}
                >
                  <Icon icon={Brain} size="md" />
                  <span>{t("composer.thinking")}</span>
                  {thinking && <Icon icon={Check} size="sm" />}
                </button>
              )}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
}
