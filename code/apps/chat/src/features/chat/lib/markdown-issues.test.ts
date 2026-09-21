import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MarkdownContent } from "../components/MarkdownContent";
import { prepareMarkdown } from "./streamingMarkdown";

const render = (content: string, streaming = true) =>
  renderToStaticMarkup(createElement(MarkdownContent, { content, streaming }));
const text = (html: string) => html.replace(/<[^>]*>/g, "");

describe("第二批 Markdown issue 回归（来源见回归覆盖矩阵）", () => {
  it("[OSS-MD-005] 行内代码的格式标记不泄漏到外部（Streamdown #424）", () => {
    for (const source of ["`**bold`", "`*italic`", "`~~strike`", "`_snake`"])
      expect(prepareMarkdown(source, true)).toBe(source);
    expect(render("**bold `code")).toContain(
      "<strong>bold <code>code</code></strong>",
    );
  });
  it("[OSS-MD-006] 已闭合的粗斜体不多补星号（Streamdown #265）", () => {
    const source = "**bold and *bold-italic***";
    expect(prepareMarkdown(source, true)).toBe(source);
    expect(render(source)).toContain(
      "<strong>bold and <em>bold-italic</em></strong>",
    );
  });
  it("[APP-MD-001] 内层代码补全不修改围栏、转义反引号或不同长度的代码分隔符", () => {
    for (const source of [
      "~~~text\n**bold `code",
      "````text\n**bold `code",
      "~~~text\n数组[1",
      "    **bold `code",
    ])
      expect(prepareMarkdown(source, true)).toBe(source);
    const escaped = "转义 \\`";
    expect(prepareMarkdown(escaped, true)).toBe(escaped);
    expect(text(render("**bold ``a ` b"))).toContain("bold a ` b");
  });
  it("[OSS-MD-007] 代码中的方括号和终端转义序列不变成链接（#227）", () => {
    const code = String.raw`echo -e "\e[?1049h"`;
    for (const source of ["```bash\n" + code + "\n```", "`" + code + "`"])
      for (const streaming of [true, false]) {
        const html = render(source, streaming);
        expect(text(html)).toContain(String.raw`\e[?1049h`);
        expect(html).not.toContain("incomplete-link");
        expect(html).not.toContain("<a ");
      }
  });
  it("[OSS-MD-008] 长链接文字逐步可见，目标未闭合时不能点击（#73）", () => {
    for (const source of [
      "[这是一段正在返回的链接文字",
      "[这是一段正在返回的链接文字](https://example",
    ]) {
      const html = render(source);
      expect(text(html)).toContain("这是一段正在返回的链接文字");
      expect(html).not.toContain("<a ");
    }
  });
  it.each(["。谢谢", "，继续阅读", "！注意", "；下一项"])(
    "[OSS-MD-009] 自动链接不吞中文标点和正文 %s（#326）",
    (suffix) => {
      const html = render(`请访问 https://example.com${suffix}`, false);
      expect(html).toContain('href="https://example.com/"');
      expect(html).toContain(`</a>${suffix}`);
    },
  );
  it("[OSS-MD-009] 明确链接、中文路径和代码不被自动链接修正规则误改", () => {
    expect(render("[原文](https://example.com/路径。参数)", false)).toContain(
      "%E3%80%82",
    );
    expect(render("https://example.com/中文路径", false)).toContain(
      "%E4%B8%AD%E6%96%87",
    );
    expect(text(render("`https://example.com。字面代码`"))).toContain(
      "https://example.com。字面代码",
    );
  });
  it("[OSS-MD-010] 未闭合代码围栏也展示已经收到的每一行（#473/#532）", () => {
    const first = "```text\n第一行";
    expect(text(render(first))).toContain("第一行");
    const html = render(first + "\n第二行");
    expect(html).toContain("<pre>");
    expect(text(html)).toContain("第一行\n第二行");
  });
  // #185 requests a CommonMark dialect extension, not a crash fix. Keep the limit explicit.
  it("[LIMIT-MD-001] CJK 紧邻标点的强调遵循现有 CommonMark，原文不能丢失（#185）", () => {
    const source = "**中文句子。**后续文字";
    expect(text(render(source, false))).toBe(source);
    expect(render("**中文句子。** 后续文字", false)).toContain(
      "<strong>中文句子。</strong>",
    );
  });
});
