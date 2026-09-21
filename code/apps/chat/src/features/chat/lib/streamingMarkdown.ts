import remend from "@vendor/remend";
import { readableMarkdown } from "./citations";

/** A citation-like suffix inside a code span is source code, not a reference being streamed. */
function codeContext(value: string, offset: number) {
  let delimiter = "";
  let fence = "";
  for (const line of value.slice(0, offset).split("\n")) {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (fence) {
      if (
        marker &&
        marker[1][0] === fence[0] &&
        marker[1].length >= fence.length &&
        !marker[2].trim()
      )
        fence = "";
      continue;
    }
    if (
      !delimiter &&
      marker &&
      (marker[1][0] === "~" || !marker[2].includes("`"))
    ) {
      fence = marker[1];
      continue;
    }
    if (!delimiter && /^(?: {4}|\t)/.test(line)) continue;
    for (const match of line.matchAll(/`+/g)) {
      if (delimiter) {
        if (match[0] === delimiter) delimiter = "";
      } else {
        const escapes =
          line.slice(0, match.index).match(/\\+$/)?.[0].length ?? 0;
        if (escapes % 2 === 0) delimiter = match[0];
      }
    }
  }
  return { delimiter, fenced: Boolean(fence) };
}

/** Repair the display copy while streaming; never write repaired Markdown back to message history. */
export function prepareMarkdown(content: string, streaming: boolean): string {
  if (!streaming) return content;
  const visible = readableMarkdown(content);
  const context = codeContext(content, visible.length);
  const codeTail =
    visible !== content &&
    (context.fenced ||
      context.delimiter ||
      /^(?: {4}|\t)/.test(content.slice(content.lastIndexOf("\n") + 1)));
  // Code has literal brackets; neither citation buffering nor link repair may consume them.
  if (codeTail) return content;
  // Close the inner code span before repairing outer emphasis (Streamdown #424).
  // Otherwise an inserted ** can become literal code and change copied code text.
  // Open fences already render incrementally in CommonMark; their contents are literal.
  if (
    context.fenced ||
    /^(?: {4}|\t)/.test(visible.slice(visible.lastIndexOf("\n") + 1))
  )
    return visible;
  return remend(visible + context.delimiter, {
    linkMode: "text-only",
    // This app does not render math. Preserve currency and ordinary dollar signs.
    katex: false,
    inlineKatex: false,
  });
}
