import { test, expect, send, waitForAnswer } from "./fixtures";
import { controlledChat } from "./controlled-chat";

interface ClipboardAttempt {
  text: string;
  resolve: () => void;
  reject: () => void;
}
declare global {
  interface Window {
    __clipboardAttempts: ClipboardAttempt[];
  }
}

test("[OSS-COPY-001] 复制权限失败有提示，后一次结果不被先前 Promise 覆盖（#2367/#557）", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.__clipboardAttempts = [];
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: (text: string) =>
          new Promise<void>((resolve, reject) => {
            window.__clipboardAttempts.push({
              text,
              resolve,
              reject: () =>
                reject(new DOMException("Denied", "NotAllowedError")),
            });
          }),
      },
    });
  });
  const stream = await controlledChat(page);
  await send(page, "代码复制");
  await stream.waitForRequests(1);
  await stream.emit(
    0,
    { type: "text", delta: "```js\nconst a = 1;\nconst b = 2;\n```" },
    { type: "done" },
  );
  await waitForAnswer(page);
  const copy = page.getByRole("button", { name: "复制代码", exact: true });
  await copy.click();
  await expect(copy).not.toContainText("已复制");
  await page.evaluate(() => window.__clipboardAttempts[0].reject());
  await expect(copy).toContainText("请手动选择复制");
  await copy.click();
  await copy.click();
  await page.evaluate(() => window.__clipboardAttempts[2].resolve());
  await expect(copy).toContainText("已复制");
  await page.evaluate(() => window.__clipboardAttempts[1].reject());
  await expect(copy).toContainText("已复制");
  expect(
    await page.evaluate(() => window.__clipboardAttempts.map((a) => a.text)),
  ).toEqual(Array(3).fill("const a = 1;\nconst b = 2;\n"));
});

test("[OSS-COPY-002] Clipboard API 缺失时，回答和代码均提示手动复制（#557）", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      configurable: true,
    }),
  );
  const stream = await controlledChat(page);
  await send(page, "浏览器不支持复制");
  await stream.waitForRequests(1);
  await stream.emit(
    0,
    { type: "text", delta: "```text\n字面代码\n```" },
    { type: "done" },
  );
  await waitForAnswer(page);
  await page.getByRole("button", { name: "复制代码", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "复制代码", exact: true }),
  ).toContainText("请手动选择复制");
  await page.getByRole("button", { name: "复制回答", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("复制失败，请手动选择文字");
  await expect(
    page.getByRole("button", { name: "已复制回答", exact: true }),
  ).toHaveCount(0);
});

test("[OSS-LAYOUT-001] 窄屏长代码和宽表格局部滚动，复制按钮仍可点击（#494/#532；#442 为功能建议）", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.setViewportSize({ width: 360, height: 740 });
  const stream = await controlledChat(page);
  const code = `const long = '${"abc".repeat(100)}';\nconsole.log(long);\n`;
  const table = `| ${Array(8).fill("列名").join(" | ")} |\n| ${Array(8).fill("---").join(" | ")} |\n| ${Array(8).fill("单元格内容").join(" | ")} |`;
  await send(page, "移动端宽内容");
  await stream.waitForRequests(1);
  await stream.emit(
    0,
    {
      type: "text",
      delta:
        "```js\n" +
        code +
        "```\n\n" +
        table +
        "\n\nhttps://example.com/" +
        "path".repeat(100),
    },
    { type: "done" },
  );
  await waitForAnswer(page);
  const pre = page.locator("[data-markdown] pre");
  await expect(pre).toBeVisible();
  const tableScroll = page.getByRole("table").locator("..");
  for (const container of [pre.locator("code"), tableScroll]) {
    await expect(container).toBeVisible();
    await expect
      .poll(() => container.evaluate((el) => el.scrollWidth > el.clientWidth))
      .toBe(true);
    await container.evaluate((el) => {
      el.scrollLeft = el.scrollWidth;
    });
    expect(await container.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  }
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(360);
  expect(await pre.evaluate((el) => getComputedStyle(el).whiteSpace)).toBe(
    "pre",
  );
  await page.getByRole("button", { name: "复制代码", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(code);
});
