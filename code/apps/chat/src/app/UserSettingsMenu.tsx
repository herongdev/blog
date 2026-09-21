import { useRef, useState } from "react";
import {
  FloatingFocusManager,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
} from "@floating-ui/react";
import {
  Archive,
  ChevronUp,
  Languages,
  Settings2,
  UserRound,
} from "lucide-react";
import { Icon } from "@/components/Icon/Icon";
import { useI18n } from "@/i18n/useI18n";
import styles from "./UserSettingsMenu.module.css";

export function UserSettingsMenu({
  onPreferences,
  onSettings,
  onArchive,
}: {
  onPreferences: () => void;
  onSettings: () => void;
  onArchive: () => void;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const items = useRef<Array<HTMLButtonElement | null>>([]);
  const { refs, context } = useFloating<HTMLButtonElement>({
    open,
    onOpenChange: setOpen,
  });
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useClick(context),
      useDismiss(context),
      useRole(context, { role: "menu" }),
      useListNavigation(context, {
        listRef: items,
        activeIndex,
        onNavigate: setActiveIndex,
        loop: true,
      }),
    ],
  );
  const options = [
    { label: t("preferences.open"), icon: Languages, action: onPreferences },
    { label: t("settings.models"), icon: Settings2, action: onSettings },
    { label: t("conversation.archived"), icon: Archive, action: onArchive },
  ];
  function select(action: () => void) {
    // Native dialogs restore focus to this persistent trigger, not a removed menu item.
    refs.domReference.current?.focus();
    setOpen(false);
    action();
  }
  return (
    <div className={styles.root}>
      <button
        ref={refs.setReference}
        type="button"
        className={styles.trigger}
        aria-label={t("settings.userMenu")}
        {...getReferenceProps()}
      >
        <span className={styles.avatar}>
          <Icon icon={UserRound} size="md" />
        </span>
        <span>{t("settings.userMenu")}</span>
        <Icon icon={ChevronUp} size="sm" />
      </button>
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            className={styles.menu}
            aria-label={t("settings.userMenu")}
            {...getFloatingProps()}
          >
            {options.map((option, index) => (
              <button
                key={index}
                ref={(node) => {
                  items.current[index] = node;
                }}
                type="button"
                role="menuitem"
                className={styles.item}
                tabIndex={activeIndex === index ? 0 : -1}
                {...getItemProps({ onClick: () => select(option.action) })}
              >
                <Icon icon={option.icon} size="md" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </FloatingFocusManager>
      )}
    </div>
  );
}
