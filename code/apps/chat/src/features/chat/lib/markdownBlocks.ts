import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
const parser = unified().use(remarkParse).use(remarkGfm);
export interface MarkdownBlock {
  offset: number;
  source: string;
}
/** Reparse the last two syntax nodes; definitions can change earlier links, so they use a whole-document block. */
export class MarkdownBlocks {
  private source = "";
  private blocks: MarkdownBlock[] = [];
  parse(source: string): MarkdownBlock[] {
    if (source === this.source) return this.blocks;
    if (/^ {0,3}\[[^\]\n]+\]:/m.test(source)) {
      this.source = source;
      this.blocks = [{ offset: 0, source }];
      return this.blocks;
    }
    const reusable =
      source.startsWith(this.source) && this.blocks.length > 2
        ? this.blocks.slice(0, -2)
        : [];
    const start = reusable.length ? this.blocks[reusable.length].offset : 0;
    const tail = source.slice(start);
    const tree = parser.parse(tail);
    const blocks = tree.children.map((node, index) => {
      const offset = node.position?.start.offset ?? 0;
      const end =
        tree.children[index + 1]?.position?.start.offset ?? tail.length;
      return { offset: start + offset, source: tail.slice(offset, end) };
    });
    this.source = source;
    this.blocks = [...reusable, ...blocks];
    return this.blocks;
  }
}
