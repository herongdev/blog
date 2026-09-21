import type { Root, RootContent } from "mdast";
import type { Plugin } from "unified";

/** Treat CJK sentence punctuation as a boundary only in bare GFM autolinks.
 * Explicit Markdown links and <autolinks> retain their authored destinations.
 */
export const remarkCjkAutolinks: Plugin<[], Root> = () => (tree, file) => {
  const source = String(file);
  function walk(parent: { children: RootContent[] }) {
    const children: RootContent[] = [];
    for (const node of parent.children) {
      if (node.type === "link") {
        const start = node.position?.start.offset;
        const end = node.position?.end.offset;
        const raw =
          start === undefined || end === undefined
            ? ""
            : source.slice(start, end);
        const label =
          node.children.length === 1 && node.children[0].type === "text"
            ? node.children[0].value
            : "";
        const boundary = label.search(/[。，！？；：、]/u);
        if (
          /^(?:https?:\/\/|www\.)/i.test(raw) &&
          raw === label &&
          boundary > 0
        ) {
          const url = label.slice(0, boundary);
          children.push({
            ...node,
            url: /^www\./i.test(url) ? `http://${url}` : url,
            children: [{ type: "text", value: url }],
          });
          children.push({ type: "text", value: label.slice(boundary) });
          continue;
        }
      } else if ("children" in node) walk(node);
      children.push(node);
    }
    parent.children = children;
  }
  walk(tree);
};
