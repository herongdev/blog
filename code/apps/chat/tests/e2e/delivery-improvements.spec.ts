import { chooseProvider } from "./fixtures";
import { test, expect, send, waitForAnswer } from "./fixtures";
import { controlledChat } from "./controlled-chat";

test("[DRAFT-001] 切换会话保留各自草稿，停止与重试不提交草稿，发送仅清空当前草稿", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  const input = page.getByRole("textbox", { name: "输入消息" });
  const history = page.getByRole("navigation", { name: "聊天" });
  await send(page, "会话甲");
  await stream.waitForRequests(1);
  await stream.emit(0, { type: "text", delta: "甲的部分回答" });
  await input.fill("甲的草稿\n第二行仍未发送");
  await page.getByRole("button", { name: "新聊天" }).click();
  await expect(input).toHaveValue("");
  expect((await stream.requests())[0].aborted).toBe(false);
  await send(page, "会话乙");
  await stream.waitForRequests(2);
  await stream.emit(1, { type: "text", delta: "乙的回答" }, { type: "done" });
  await waitForAnswer(page);
  await input.fill("乙的草稿");
  await history.getByRole("button", { name: "会话甲", exact: true }).click();
  await expect(input).toHaveValue("甲的草稿\n第二行仍未发送");
  await page.getByRole("button", { name: "停止生成" }).click();
  expect((await stream.requests())[0].aborted).toBe(true);
  await expect(input).toHaveValue("甲的草稿\n第二行仍未发送");
  await page.getByRole("button", { name: "重新生成" }).click();
  await stream.waitForRequests(3);
  await stream.emit(
    2,
    { type: "text", delta: "甲的重试回答" },
    { type: "done" },
  );
  await waitForAnswer(page);
  await expect(input).toHaveValue("甲的草稿\n第二行仍未发送");
  expect((await stream.requests())[2].body.messages).toEqual([
    { role: "user", content: "会话甲" },
  ]);
  await page.getByRole("button", { name: "发送消息", exact: true }).click();
  await stream.waitForRequests(4);
  await expect(input).toHaveValue("");
  expect((await stream.requests())[3].body.messages.at(-1)?.content).toBe(
    "甲的草稿\n第二行仍未发送",
  );
  await page.getByRole("button", { name: "停止生成" }).click();
  await history.getByRole("button", { name: "会话乙", exact: true }).click();
  await expect(input).toHaveValue("乙的草稿");
  await history.getByRole("button", { name: "会话甲", exact: true }).click();
  await expect(input).toHaveValue("");
  expect(await stream.requests()).toHaveLength(4);
});

test("[DRAFT-002] 未配置时保留草稿，空会话切换来源延续草稿，刷新恢复", async ({
  page,
}) => {
  await page.goto("/");
  const input = page.getByRole("textbox", { name: "输入消息" });
  await input.fill("本地未发送");
  await chooseProvider(page, "DeepSeek");
  await expect(input).toHaveValue("本地未发送");
  await input.fill("尚未配置的提问");
  await page.getByRole("button", { name: "发送消息", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(input).toHaveValue("尚未配置的提问");
  await page.getByRole("button", { name: "完成", exact: true }).click();
  const history = page.getByRole("navigation", { name: "聊天" });
  const drafts = history.getByRole("button", {
    name: "未发送草稿",
    exact: true,
  });
  await expect(drafts).toHaveCount(1);
  await drafts.click();
  await expect(input).toHaveValue("尚未配置的提问");
  await expect(history.getByRole("group")).toHaveCount(1);
  await page.reload();
  await expect(input).toHaveValue("尚未配置的提问");
});

test("[DIAG-UI-001] 流错误编号可复制，重试使用新编号，窄屏详情不溢出", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const stream = await controlledChat(page);
  await send(page, "模拟模型中断");
  await stream.waitForRequests(1);
  await stream.emit(
    0,
    { type: "text", delta: "已经收到的答案仍然保留。" },
    { type: "error", message: "模型暂时不可用，请稍后重试。" },
  );
  await waitForAnswer(page);
  const id = (await stream.requests())[0].requestId;
  await expect(page.locator("[data-markdown]")).toHaveText(
    "已经收到的答案仍然保留。",
  );
  await expect(page.getByText(id, { exact: true })).toBeHidden();
  await page.getByText("问题详情", { exact: true }).click();
  await expect(page.getByText(id, { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "复制问题编号", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(id);
  await expect(page.getByRole("status")).toHaveText("已复制问题编号");
  await page.screenshot({
    path: "output/playwright/diagnostics-desktop.png",
    animations: "disabled",
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByText(id, { exact: true })).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page.screenshot({
    path: "output/playwright/diagnostics-mobile.png",
    animations: "disabled",
  });
  await page.getByRole("button", { name: "重新生成" }).click();
  await stream.waitForRequests(2);
  await stream.emit(0, { type: "error", message: "迟到错误" });
  await stream.emit(1, { type: "error", message: "第二次失败" });
  await waitForAnswer(page);
  const retryId = (await stream.requests())[1].requestId;
  expect(retryId).not.toBe(id);
  await page.getByText("问题详情", { exact: true }).click();
  await expect(page.getByText(retryId, { exact: true })).toBeVisible();
  await expect(page.getByText(id, { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "重新生成" }).click();
  await stream.waitForRequests(3);
  await stream.emit(2, { type: "text", delta: "恢复成功" }, { type: "done" });
  await waitForAnswer(page);
  await expect(page.getByText("问题详情", { exact: true })).toHaveCount(0);
});

test("[DIAG-UI-002] 编译后的 Nest 在 SSE 之前拒绝请求，页面编号与响应头一致", async ({
  page,
}) => {
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
            id: "deepseek",
            name: "DeepSeek",
            configured: true,
            models: ["test-model"],
          },
          {
            id: "aliyun",
            name: "阿里云百炼",
            configured: false,
            models: ["qwen-test"],
          },
        ],
      },
    }),
  );
  // The isolated Nest server has env: {} and forbids external fetches.
  await page.route("**/api/chat", (route) => route.continue());
  await page.goto("/");
  await chooseProvider(page, "DeepSeek");
  const responsePromise = page.waitForResponse("**/api/chat");
  await send(page, "配置在发送前已失效");
  const response = await responsePromise;
  expect(response.status()).toBe(503);
  const id = response.headers()["x-request-id"];
  expect(id).toBeTruthy();
  await expect(page.getByRole("alert")).toContainText("尚未配置");
  await page.getByText("问题详情", { exact: true }).click();
  await expect(page.getByText(id, { exact: true })).toBeVisible();
});

test("[DIAG-UI-003] 区分请求发送和等待模型，思考与正文到达后替换等待提示", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await page.evaluate(() => {
    const original = window.fetch;
    let release!: () => void;
    const ready = new Promise<void>((resolve) => {
      release = resolve;
    });
    Object.assign(window, { releaseChatHeaders: release });
    window.fetch = async (input, init) => {
      if (String(input) === "/api/chat") await ready;
      return original(input, init);
    };
  });
  await send(page, "等待模型时应显示真实阶段");
  await expect(page.getByText("正在发送请求", { exact: true })).toBeVisible();
  await expect(
    page.getByText("正在等待模型响应", { exact: true }),
  ).toBeHidden();
  await page.evaluate(() =>
    (
      window as unknown as { releaseChatHeaders: () => void }
    ).releaseChatHeaders(),
  );
  await stream.waitForRequests(1);
  await expect(
    page.getByText("正在等待模型响应", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText("正在发送请求", { exact: true })).toBeHidden();
  await stream.emit(0, {
    type: "reasoning",
    id: "reasoning-1",
    delta: "分析中",
  });
  await expect(
    page.getByText("正在等待模型响应", { exact: true }),
  ).toBeHidden();
  await stream.emit(0, { type: "text", delta: "最终答案" }, { type: "done" });
  await waitForAnswer(page);
  await expect(page.locator("[data-markdown]")).toHaveText("最终答案");
});
