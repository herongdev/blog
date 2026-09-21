import { chooseReplayOption } from "./fixtures";
import {
  test,
  expect,
  send,
  startSample,
  waitForAnswer,
  readingArea,
  expectAtBottom,
} from "./fixtures";

// https://github.com/ChatGPTNextWeb/NextChat/issues/4255
test("[OSS-IME-001] 输入法确认键不发送，组合结束后 Enter 才发送一次", async ({
  page,
}) => {
  await page.goto("/");
  await chooseReplayOption(page, "本地演示场景", "空结果");
  const input = page.getByRole("textbox", { name: "输入消息" });
  await input.fill("中文输入");
  await input.dispatchEvent("compositionstart", { data: "中文输入" });
  // Model the two event shapes; this does not simulate a native OS candidate window.
  await input.dispatchEvent("keydown", {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    isComposing: true,
  });
  await expect(input).toHaveValue("中文输入");
  await expect(page.getByRole("article")).toHaveCount(0);
  await input.dispatchEvent("compositionend", { data: "中文输入" });
  await input.dispatchEvent("keydown", {
    key: "Enter",
    code: "Enter",
    keyCode: 229,
    isComposing: false,
  });
  await expect(input).toHaveValue("中文输入");
  await expect(page.getByRole("article")).toHaveCount(0);
  await input.press("Shift+Enter");
  await expect(input).toHaveValue("中文输入\n");
  await input.press("Enter");
  await expect(page.getByRole("article", { name: "你的消息" })).toHaveCount(1);
  await expect(page.getByRole("article", { name: "你的消息" })).toContainText(
    "中文输入",
  );
  await expect(input).toHaveValue("");
  await waitForAnswer(page);
});

// https://github.com/stackblitz-labs/use-stick-to-bottom/issues/40
test("[OSS-SCROLL-001] 输入区变高时保持跟随，阅读历史时不抢滚动位置", async ({
  page,
}) => {
  await page.goto("/");
  await startSample(page);
  await waitForAnswer(page);
  await expectAtBottom(page);
  const viewport = readingArea(page);
  const input = page.getByRole("textbox", { name: "输入消息" });
  const height = await viewport.evaluate((el) => el.clientHeight);
  const contentHeight = await viewport.evaluate((el) => el.scrollHeight);
  const longDraft = Array.from(
    { length: 12 },
    (_, i) => `草稿第 ${i + 1} 行`,
  ).join("\n");
  await input.fill(longDraft);
  await expect
    .poll(() => viewport.evaluate((el) => el.clientHeight))
    .toBeLessThan(height - 30);
  expect(await viewport.evaluate((el) => el.scrollHeight)).toBe(contentHeight);
  await expectAtBottom(page);
  await input.fill("");
  await expect
    .poll(() => viewport.evaluate((el) => el.clientHeight))
    .toBe(height);
  await expectAtBottom(page);
  const rect = (await viewport.boundingBox())!;
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2);
  await page.mouse.wheel(0, -360);
  const back = page.getByRole("button", { name: "回到最新", exact: true });
  await expect(back).toBeVisible();
  const readingTop = await viewport.evaluate((el) => el.scrollTop);
  await input.fill(longDraft);
  await expect
    .poll(() => viewport.evaluate((el) => el.clientHeight))
    .toBeLessThan(height - 30);
  // Let ResizeObserver and the following animation frame apply any scroll adjustment.
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
  expect(
    Math.abs((await viewport.evaluate((el) => el.scrollTop)) - readingTop),
  ).toBeLessThanOrEqual(3);
  await expect(back).toBeVisible();
});

// https://github.com/vercel/streamdown/issues/343
test("[OSS-MD-004] 排版资源 404 时显示原文，回答和后续对话仍可使用", async ({
  page,
}, testInfo) => {
  let failedChunkRequests = 0;
  await page.route(
    /\/assets\/MarkdownContent-[^/]+\.js(?:\?.*)?$/,
    async (route) => {
      failedChunkRequests++;
      await route.fulfill({
        status: 404,
        contentType: "text/plain",
        body: "Missing old deployment chunk",
      });
    },
  );
  await page.goto("/");
  await chooseReplayOption(page, "回放速度", "4× 回放");
  await page
    .getByRole("button", {
      name: "让复杂内容，清楚呈现 体验代码、表格与 Markdown 排版",
    })
    .click();
  const answers = page.getByRole("article", { name: "知序的回答" });
  const raw = answers.first().getByRole("region", { name: "回答原文" });
  await expect(raw).toContainText("把复杂问题", { timeout: 5_000 });
  await waitForAnswer(page);
  await expect(raw).toContainText("function reducer(state, action)");
  await expect(raw).toContainText("下一步：动手写一个最小例子。");
  await expect(
    page.getByText("排版暂不可用，已显示原文。", { exact: true }),
  ).toBeVisible();
  const firstText = await raw.textContent();
  expect(failedChunkRequests).toBeGreaterThan(0);
  await send(page, "排版失败后继续对话");
  await expect(answers).toHaveCount(2);
  await waitForAnswer(page);
  expect(await raw.textContent()).toBe(firstText);
  await expect(
    answers.last().getByRole("region", { name: "回答原文" }),
  ).toContainText("下一步：动手写一个最小例子。");
  await testInfo.attach("排版资源失败时保留回答", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
});
