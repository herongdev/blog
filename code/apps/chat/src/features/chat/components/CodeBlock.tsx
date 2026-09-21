import { useI18n } from "@/i18n/useI18n";
import { Icon } from "@/components/Icon/Icon";
import styles from "./CodeBlock.module.css";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";
function plainText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainText).join("");
  if (node && typeof node === "object" && "props" in node)
    return plainText(
      (
        node.props as {
          children?: ReactNode;
        }
      ).children,
    );
  return "";
}
export function CodeBlock({
  children,
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  const { t } = useI18n();

  const { copy, copied, failed } = useClipboard();
  return (
    <div className={styles["code-block"]}>
      <div className={styles["code-toolbar"]}>
        <span>{t("code.title")}</span>
        <button
          type="button"
          onClick={() => void copy(plainText(children))}
          aria-label={t("code.copy")}
        >
          {copied ? (
            <Icon icon={Check} size="sm" />
          ) : (
            <Icon icon={Copy} size="sm" />
          )}
          {failed
            ? t("code.manual")
            : copied
              ? t("code.copied")
              : t("code.action")}
        </button>
      </div>
      <pre {...props}>{children}</pre>
    </div>
  );
}
