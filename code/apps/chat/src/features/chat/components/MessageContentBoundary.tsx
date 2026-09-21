import { useI18n } from "@/i18n/useI18n";
import { Component, type ReactNode } from "react";
import styles from "./MessageContentBoundary.module.css";

interface Props {
  content: string;
  children: ReactNode;
}
interface State {
  failed: boolean;
}

/** Keep streaming raw text if a lazy chunk or renderer fails; never discard the conversation. */
export class MessageContentBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return <RawMessage content={this.props.content} />;
  }
}

function RawMessage({ content }: { content: string }) {
  const { t } = useI18n();
  return (
    <>
      <p role="status" className={styles.notice}>
        {t("message.formatFailed")}
      </p>
      <div role="region" aria-label={t("message.raw")} className={styles.raw}>
        {content}
      </div>
    </>
  );
}
