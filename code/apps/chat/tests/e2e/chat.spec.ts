import { chooseReplayOption } from "./fixtures";
import { chooseProvider } from "./fixtures";
import { chooseOption } from "./fixtures";
import {
  test,
  expect,
  send,
  startSample,
  waitForAnswer,
  readingArea,
  expectAtBottom,
} from "./fixtures";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("streaming keeps citation pagination and isolates a stopped answer", async ({
  page,
}) => {
  await startSample(page, 1);
  await page
    .getByRole("button", { name: "查看引用：万通甲硝唑片说明书，共 2 个来源" })
    .first()
    .click({ timeout: 20_000 });
  await page.getByRole("button", { name: "下一个来源" }).click();
  const markdown = page.locator("[data-markdown]");
  const length = (await markdown.textContent())!.length;
  await expect
    .poll(async () => (await markdown.textContent())!.length)
    .toBeGreaterThan(length + 25);
  await expect(page.getByRole("dialog")).toContainText("2/2");
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "停止生成" }).click();
  await expect(page.getByText("已停止生成", { exact: true })).toBeVisible();
  const answers = page.getByRole("article", { name: "知序的回答" });
  const stoppedText = await answers.first().innerText();
  await chooseReplayOption(page, "回放速度", "4× 回放");
  await send(page, "再次发送，验证中断隔离");
  await expect(answers).toHaveCount(2);
  await waitForAnswer(page);
  expect(await answers.first().innerText()).toBe(stoppedText);
  await expect(
    answers.last().getByRole("button", { name: /^查看引用：/ }),
  ).toHaveCount(16);
});

test("[REQ-MARKDOWN] 标题、列表、块引用、表格与代码可读，复制保持原始代码", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await chooseReplayOption(page, "回放速度", "4× 回放");
  await page
    .getByRole("button", {
      name: "让复杂内容，清楚呈现 体验代码、表格与 Markdown 排版",
    })
    .click();
  await waitForAnswer(page);
  const markdown = page.locator("[data-markdown]");
  await expect(markdown.getByRole("heading", { level: 2 })).toHaveText(
    "把复杂问题，拆成清晰的步骤",
  );
  await expect(markdown.getByRole("heading", { level: 3 })).toHaveText(
    "三个实用习惯",
  );
  await expect(markdown.locator("ol > li")).toHaveCount(3);
  await expect(markdown.locator("ol > li").first()).toContainText("明确问题");
  await expect(markdown.locator("ul > li")).toHaveCount(3);
  await expect(markdown.locator("blockquote")).toHaveText(
    "理解一段代码，最好的方式是解释它为什么存在。",
  );
  await expect(
    markdown.getByRole("link", { name: "React 文档" }),
  ).toHaveAttribute("href", "https://react.dev/");
  await expect(page.getByRole("table")).toContainText("取消请求，保留已有内容");
  const originalCode = await page.locator("pre code").textContent();
  await page.getByRole("button", { name: "复制代码" }).click();
  await expect(page.getByText("已复制", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    originalCode,
  );
  expect(originalCode).toContain("function reducer(state, action)");
});

test("retry replaces the failed answer and an empty answer exits loading", async ({
  page,
}) => {
  await chooseReplayOption(page, "回放速度", "4× 回放");
  await chooseReplayOption(page, "本地演示场景", "异常恢复");
  await send(page, "测试异常恢复");
  await expect(page.getByRole("alert")).toContainText("连接暂时中断");
  await chooseReplayOption(page, "本地演示场景", "Markdown 排版");
  await page.getByRole("button", { name: "重新生成" }).click();
  await waitForAnswer(page);
  await expect(page.getByRole("article", { name: "你的消息" })).toHaveCount(1);
  await expect(page.getByRole("article", { name: "知序的回答" })).toHaveCount(
    1,
  );
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("alert")).toHaveCount(0);
  await page.getByRole("button", { name: "新聊天" }).click();
  await chooseReplayOption(page, "本地演示场景", "空结果");
  await send(page, "测试空结果");
  await expect(
    page.getByText("没有收到回答，请重新尝试。", { exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "停止生成" })).toBeHidden();
});

test("provider setup and model changes use the selected request options", async ({
  page,
}) => {
  await chooseProvider(page, "阿里云百炼");
  await page.getByRole("button", { name: "去配置" }).click();
  const settings = page.getByRole("dialog", { name: "让知序接入你的 API" });
  await expect(settings).toBeVisible();
  await page.keyboard.press("Escape");
  await chooseProvider(page, "DeepSeek");
  await send(page, "需要配置密钥");
  await expect(settings).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(0);

  await page.route("**/api/providers", (route) =>
    route.fulfill({
      json: {
        providers: [
          {
            id: "local",
            name: "本地样例",
            configured: true,
            models: ["sample"],
          },
          {
            id: "aliyun",
            name: "阿里云百炼",
            configured: true,
            models: ["qwen-test"],
          },
          {
            id: "deepseek",
            name: "DeepSeek",
            configured: true,
            models: ["deepseek-v4-flash", "deepseek-v4-pro"],
          },
        ],
      },
    }),
  );
  await settings.getByRole("button", { name: "重新检查" }).click();
  await expect(settings.getByText("已配置", { exact: true })).toHaveCount(2);
  await settings.getByRole("button", { name: "完成", exact: true }).click();
  await chooseOption(page, "选择模型", "deepseek-v4-pro");
  await page.getByRole("button", { name: "添加附件和工具" }).click();
  await expect(
    page.getByRole("menuitemcheckbox", { name: "深度思考" }),
  ).toHaveAttribute("aria-checked", "false");
  await page.keyboard.press("Escape");
  await page.route("**/api/chat", (route) =>
    route.fulfill({
      contentType: "text/event-stream",
      body: 'data: {"type":"text","delta":"模拟模型回答"}\n\ndata: {"type":"done"}\n\n',
    }),
  );
  const request = page.waitForRequest("**/api/chat");
  await send(page, "验证模型选项");
  expect((await request).postDataJSON()).toEqual({
    provider: "deepseek",
    model: "deepseek-v4-pro",
    thinking: false,
    messages: [{ role: "user", content: "验证模型选项" }],
  });
  await waitForAnswer(page);
  await expect(page.locator("[data-markdown]")).toContainText("模拟模型回答");
  await expect(page.locator("[data-citation]")).toHaveCount(0);
  await chooseOption(page, "选择模型", "deepseek-v4-flash");
  await expect(page.getByRole("article")).toHaveCount(0);
});

test("mobile sidebar and multi-source popover fit the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "打开侧栏" }).click();
  await page.getByRole("button", { name: "收起侧栏" }).click();
  await startSample(page);
  await waitForAnswer(page);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page
    .getByRole("button", { name: "查看引用：万通甲硝唑片说明书，共 2 个来源" })
    .first()
    .click();
  await page.getByRole("button", { name: "下一个来源" }).click();
  const popup = page.getByRole("dialog");
  await expect(popup).toContainText("2/2");
  await expect
    .poll(async () => {
      const rect = await popup.boundingBox();
      return (
        !!rect &&
        rect.x >= 0 &&
        rect.x + rect.width <= 390 &&
        rect.y >= 0 &&
        rect.y + rect.height <= 844
      );
    })
    .toBe(true);
  await page.keyboard.press("Escape");
  await expect(popup).toBeHidden();
});

test("streaming respects reading position and resumes following after return", async ({
  page,
}) => {
  await startSample(page);
  await waitForAnswer(page);
  await chooseReplayOption(page, "回放速度", "1× 回放");
  await send(page, "验证阅读位置");
  await expect(page.locator("[data-markdown]")).toHaveCount(2, {
    timeout: 20_000,
  });
  const latest = page.locator("[data-markdown]").last();
  await expect
    .poll(async () => (await latest.textContent())!.length)
    .toBeGreaterThan(70);
  const viewport = readingArea(page);
  const box = (await viewport.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.wheel(0, -240);
  await expect(
    page.getByRole("button", { name: "回到最新", exact: true }),
  ).toBeVisible();
  const before = await viewport.evaluate((el) => el.scrollTop);
  const length = (await latest.textContent())!.length;
  await expect
    .poll(async () => (await latest.textContent())!.length)
    .toBeGreaterThan(length + 70);
  expect(await viewport.evaluate((el) => el.scrollTop)).toBeLessThanOrEqual(
    before + 3,
  );
  await page.getByRole("button", { name: "回到最新", exact: true }).click();
  await expectAtBottom(page);
  await page.setViewportSize({ width: 1200, height: 640 });
  await expectAtBottom(page);
  await page.getByRole("button", { name: "停止生成" }).click();
  const activity = page.getByRole("button", { name: /^活动过程/ }).last();
  await activity.click();
  await activity.click();
  await expectAtBottom(page);
});
