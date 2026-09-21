import type { Root, RootContent, PhrasingContent } from "mdast";
import type { Plugin } from "unified";

const nestedCitation = /\[(?:\[\d+_\d+\])+\]/g;
const flatCitation = /\[(?:\d+_\d+)(?:\s*,\s*\d+_\d+)*\]/g;

export function citationIds(value: string): string[] {
  return [...new Set(value.match(/\d+_\d+/g) ?? [])];
}

/** Hide only a plausible incomplete citation at the stream tail; leave ordinary Markdown intact. */
export function readableMarkdown(value: string): string {
  const nestedStart = value.lastIndexOf("[[");
  if (nestedStart >= 0) {
    const tail = value.slice(nestedStart);
    if (/^\[(?:\[\d+_\d+\])+\]$/.test(tail)) return value;
    if (/^\[\[(?:\d+_\d+\]\[)*\d*(?:_\d*)?\]?$/.test(tail))
      return value.slice(0, nestedStart);
  }
  return value.replace(/\[\d*(?:_\d*)?(?:\s*,\s*\d*(?:_\d*)?)*$/, "");
}

export const remarkCitations: Plugin<[], Root> = () => (tree) => {
  function walk(parent: { children: RootContent[] }) {
    const children: RootContent[] = [];
    for (const node of parent.children) {
      if (node.type === "text") {
        const matcher = new RegExp(
          `${nestedCitation.source}|${flatCitation.source}`,
          "g",
        );
        let cursor = 0;
        for (const match of node.value.matchAll(matcher)) {
          if (match.index > cursor)
            children.push({
              type: "text",
              value: node.value.slice(cursor, match.index),
            });
          children.push({
            type: "link",
            url: `#citation:${citationIds(match[0]).join(",")}`,
            children: [{ type: "text", value: match[0] }],
          });
          cursor = match.index + match[0].length;
        }
        if (cursor < node.value.length)
          children.push({ type: "text", value: node.value.slice(cursor) });
      } else {
        // Existing links, inline code, code fences and HTML are not citation containers.
        if (
          "children" in node &&
          !["link", "linkReference"].includes(node.type)
        )
          walk(node as { children: RootContent[] });
        children.push(node);
      }
    }
    parent.children = children as PhrasingContent[];
  }
  walk(tree);
};

export function safeWebUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function cleanExcerpt(value: string): string {
  return value
    .replace(/\$P\$/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\u200b/g, "")
    .trim();
}
