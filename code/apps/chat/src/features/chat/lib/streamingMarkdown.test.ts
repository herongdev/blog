import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { prepareMarkdown } from "./streamingMarkdown";
import { MarkdownContent } from "../components/MarkdownContent";

const render = (content: string, streaming = true) =>
  renderToStaticMarkup(createElement(MarkdownContent, { content, streaming }));

describe("开源 issue 回归", () => {
  // https://github.com/vercel/streamdown/issues/118
  it("[OSS-MD-001] 单词内部和转义的下划线不应被补成斜体", () => {
    for (const source of [
      "hello_world",
      "user_profile_id",
      "CONSTANT_NAME",
      String.raw`escaped\_separator`,
    ]) {
      expect(prepareMarkdown(source, true), source).toBe(source);
      expect(render(source), source).not.toContain("<em>");
    }
    expect(render("_真正的斜体")).toContain("<em>真正的斜体</em>");
  });

  // https://github.com/vercel/streamdown/issues/137
  it.each(["pinescript", "not-a-registered-language"])(
    "[OSS-MD-002] 未知代码语言 %s 降级展示，后续正文继续渲染",
    (language) => {
      const source = `\`\`\`${language}\nprint(42)\n\`\`\`\n\n后续正文`;
      const html = render(source);
      expect(html).toContain("<pre>");
      expect(html).toContain("print(42)");
      expect(html).toContain("<p>后续正文</p>");
    },
  );

  // https://github.com/vercel/streamdown/issues/433
  it("[OSS-MD-003] 语言名和代码逐字符到达时，每个前缀都能渲染", () => {
    const source = '```rust\nfn main() { println!("你好"); }\n```\n\n回答继续';
    for (let end = 1; end <= source.length; end++) {
      expect(
        () => render(source.slice(0, end)),
        `前缀长度 ${end}`,
      ).not.toThrow();
    }
    const html = render(source, false);
    expect(html).toContain("你好");
    expect(html).toContain("<p>回答继续</p>");
  });
});

describe("streaming display without changing the stored answer", () => {
  it("renders an unfinished emphasis immediately, but keeps final source literal", () => {
    expect(render("**正在生成")).toContain("<strong>正在生成</strong>");
    expect(prepareMarkdown("**正在生成", false)).toBe("**正在生成");
    expect(render("**正在生成", false)).not.toContain("<strong>");
  });

  it("keeps a partial link non-clickable until the destination finishes", () => {
    expect(render("[文档](https://example")).not.toContain("<a ");
    expect(render("[文档](https://example.com)")).toContain(
      'href="https://example.com/"',
    );
  });

  it("still buffers every partial custom citation and renders the complete group", () => {
    const marker = "[[1_0][1_2]]";
    for (let end = 1; end < marker.length; end++)
      expect(prepareMarkdown(`正文${marker.slice(0, end)}`, true)).toBe("正文");
    expect(render(`正文${marker}`)).toContain("citation-badge");
    expect(prepareMarkdown(`正文${marker}`, false)).toBe(`正文${marker}`);
  });

  it.each(["`数组[1", "```js\nconst a = [1", "    const a = [1"])(
    "keeps citation-like code at the stream tail: %s",
    (content) => {
      expect(render(content).replace(/<[^>]+>/g, "")).toContain("[1");
      expect(render(content)).not.toContain("citation-badge");
    },
  );

  it("does not turn executable links or raw HTML into active elements", () => {
    const html = render(
      "[危险](javascript:alert%281%29)\n\n<script>alert(1)</script>",
    );
    expect(html).not.toContain("javascript:");
    expect(html).not.toContain("<script");
  });

  it("keeps finished tables, code and ordinary links compatible with the renderer", () => {
    const html = render(
      "| 名称 |\n| --- |\n| React |\n\n```js\nconst a = 1;\n```\n\n[文档](https://example.com)",
      false,
    );
    expect(html).toContain("<table>");
    expect(html).toContain("复制代码");
    expect(html).toContain('href="https://example.com/"');
  });
});
