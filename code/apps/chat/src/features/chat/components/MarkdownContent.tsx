import { MessageViewContext } from "../hooks/useMessageViewState";
import { MessageViewBoundary } from "./MessageViewBoundary";
import { MarkdownBlocks } from "../lib/markdownBlocks";
import { useI18n } from "@/i18n/useI18n";
import styles from "./MarkdownContent.module.css";
import { createContext, memo, useContext, useState } from "react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { CodeBlock } from "./CodeBlock";
import { MarkdownTable } from "./MarkdownTable";
import type { Reference } from "@shared/contracts/chat";
import { citationIds, remarkCitations, safeWebUrl } from "../lib/citations";
import { Citation } from "./Citation";
import { prepareMarkdown } from "../lib/streamingMarkdown";
import { remarkCjkAutolinks } from "../lib/remarkCjkAutolinks";
const emptyReferences: Record<string, Reference> = {};
const ReferencesContext = createContext(emptyReferences);
// Stable component types are essential even when a references event replaces the map.
// Context updates the data without remounting open citations or code-copy controls.
const components: Components = {
  a: function MarkdownLink({ href, children }) {
    const references = useContext(ReferencesContext);
    if (href?.startsWith("#citation:"))
      return <Citation ids={citationIds(href)} references={references} />;
    const safe = safeWebUrl(href);
    return safe ? (
      <a href={safe} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <span>{children}</span>
    );
  },
  pre({ children }) {
    return <CodeBlock>{children}</CodeBlock>;
  },
  table: MarkdownTable,
  img: ImagePlaceholder,
};
function ImagePlaceholder({ alt }: { alt?: string }) {
  const { t } = useI18n();
  return (
    <span className={styles["image-placeholder"]}>
      {alt ? t("image.alt", { alt }) : t("image.label")}
    </span>
  );
}
export const MarkdownContent = memo(function MarkdownContent({
  content,
  references = emptyReferences,
  streaming = false,
}: {
  content: string;
  references?: Record<string, Reference>;
  streaming?: boolean;
}) {
  const [parser] = useState(() => new MarkdownBlocks());
  const blocks = parser.parse(content);
  return (
    <ReferencesContext value={references}>
      <div className={styles["markdown"]} data-markdown>
        {blocks.map((block, index) => (
          <MarkdownBlock
            key={block.offset}
            offset={block.offset}
            source={block.source}
            streaming={streaming && index === blocks.length - 1}
          />
        ))}
      </div>
    </ReferencesContext>
  );
});

const MarkdownBlock = memo(function MarkdownBlock({
  source,
  streaming,
  offset,
}: {
  source: string;
  streaming: boolean;
  offset: number;
}) {
  const scope = useContext(MessageViewContext);
  const content = (
    <Markdown
      remarkPlugins={[remarkGfm, remarkCjkAutolinks, remarkCitations]}
      rehypePlugins={
        source.length < 20000 ? [[rehypeHighlight, { detect: false }]] : []
      }
      skipHtml
      components={components}
    >
      {prepareMarkdown(source, streaming)}
    </Markdown>
  );
  return scope ? (
    <MessageViewBoundary
      cache={scope.cache}
      prefix={`${scope.prefix}:block:${offset}`}
    >
      {content}
    </MessageViewBoundary>
  ) : (
    content
  );
});
