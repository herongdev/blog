import { chooseProvider } from "./fixtures";
import { test, expect, send, waitForAnswer } from "./fixtures";
import { controlledChat } from "./controlled-chat";

test("[OSS-RUN-001] 首包前停止、立即发送新问题，旧请求迟到不能结束新回答（AI #13962）", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await send(page, "第一问");
  await stream.waitForRequests(1);
  await page.getByRole("button", { name: "停止生成" }).click();
  expect((await stream.requests())[0].aborted).toBe(true);
  await expect(page.getByText("已停止生成", { exact: true })).toBeVisible();
  await send(page, "第二问");
  await stream.waitForRequests(2);
  await stream.emit(
    0,
    { type: "text", delta: "旧数据不应出现" },
    { type: "done" },
  );
  await expect
    .poll(async () => (await stream.requests())[0].cancelled)
    .toBe(true);
  await stream.emit(1, { type: "text", delta: "新回答继续" });
  await expect(page.locator("[data-markdown]")).toHaveText("新回答继续");
  await expect(page.getByRole("button", { name: "停止生成" })).toBeVisible();
  await stream.emit(1, { type: "done" });
  await waitForAnswer(page);
  expect((await stream.requests())[1].body.messages).toEqual([
    { role: "user", content: "第一问" },
    { role: "user", content: "第二问" },
  ]);
});

test("[OSS-RUN-002] 切换会话保持后台生成，正文和错误各自隔离（AI #13304）", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await send(page, "会话甲");
  await stream.waitForRequests(1);
  await stream.emit(0, { type: "text", delta: "甲的部分回答" });
  await expect(page.locator("[data-markdown]")).toHaveText("甲的部分回答");
  await page.getByRole("button", { name: "新聊天" }).click();
  expect((await stream.requests())[0].aborted).toBe(false);
  await send(page, "会话乙");
  await stream.waitForRequests(2);
  await stream.emit(0, { type: "error", message: "甲的独立错误" });
  await stream.emit(1, { type: "text", delta: "乙的部分回答" });
  await expect(page.locator("[data-markdown]")).toHaveText("乙的部分回答");
  await expect(page.getByRole("alert")).toHaveCount(0);
  const history = page.getByRole("navigation", { name: "聊天" });
  await history.getByRole("button", { name: "会话甲", exact: true }).click();
  expect((await stream.requests())[1].aborted).toBe(false);
  await expect(page.locator("[data-markdown]")).toHaveText("甲的部分回答");
  await expect(page.getByRole("alert")).toHaveText("甲的独立错误");
  await stream.emit(1, { type: "text", delta: "，后台完成" }, { type: "done" });
  await history.getByRole("button", { name: "会话乙", exact: true }).click();
  await expect(page.locator("[data-markdown]")).toHaveText(
    "乙的部分回答，后台完成",
  );
  await waitForAnswer(page);
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test("[OSS-RUN-003] 错误后的重试复用原问题，不重复添加历史（NextChat #4434，迁移场景）", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  const question = "保留 {{input}} 与 **原文**";
  await send(page, question);
  await stream.waitForRequests(1);
  await stream.emit(
    0,
    { type: "text", delta: "部分回答" },
    { type: "error", message: "额度暂时受限" },
  );
  await expect(page.getByRole("alert")).toHaveText("额度暂时受限");
  await expect(page.locator("[data-markdown]")).toHaveText("部分回答");
  await page.getByRole("button", { name: "重新生成" }).click();
  await stream.waitForRequests(2);
  expect((await stream.requests())[1].body).toEqual(
    (await stream.requests())[0].body,
  );
  await stream.emit(1, { type: "text", delta: "重试成功" }, { type: "done" });
  await waitForAnswer(page);
  await expect(page.getByRole("article", { name: "你的消息" })).toHaveCount(1);
  await expect(page.getByRole("article", { name: "知序的回答" })).toHaveCount(
    1,
  );
  await expect(page.locator("[data-markdown]")).toHaveText("重试成功");
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test("[APP-RUN-001] 生成时锁定模型，停止后切换供应商隔离历史，快速 Enter 不重复提交", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  const input = page.getByRole("textbox", { name: "输入消息" });
  await input.fill("快速提交");
  await input.press("Enter");
  await input.press("Enter");
  await stream.waitForRequests(1);
  await expect(page.getByRole("combobox", { name: "选择模型" })).toBeDisabled();
  await page.getByRole("button", { name: "停止生成", exact: true }).click();
  await chooseProvider(page, "阿里云百炼");
  expect((await stream.requests())[0].aborted).toBe(true);
  await send(page, "百炼问题");
  await stream.waitForRequests(2);
  await stream.emit(0, { type: "text", delta: "旧模型回答" });
  await stream.emit(1, { type: "text", delta: "百炼回答" }, { type: "done" });
  await waitForAnswer(page);
  expect((await stream.requests())[1].body).toMatchObject({
    provider: "aliyun",
    model: "qwen-test",
    messages: [{ role: "user", content: "百炼问题" }],
  });
  await expect(page.locator("[data-markdown]")).toHaveText("百炼回答");
});

test("[OSS-MD-010] 真正结束前，代码块逐段可读（Streamdown #473）", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await send(page, "输出代码");
  await stream.waitForRequests(1);
  await stream.emit(0, { type: "text", delta: "```text\n第一行" });
  await expect(page.locator("pre code")).toContainText("第一行");
  await expect(page.getByRole("button", { name: "停止生成" })).toBeVisible();
  await stream.emit(0, { type: "text", delta: "\n第二行" });
  await expect
    .poll(() => page.locator("pre code").textContent())
    .toBe("第一行\n第二行\n");
  await stream.emit(
    0,
    { type: "text", delta: "\n```\n\n代码后的说明" },
    { type: "done" },
  );
  await waitForAnswer(page);
  await expect(page.locator("[data-markdown]")).toContainText("代码后的说明");
});

test("[APP-REF-001] 来源迟到或更新时，已打开引用保留页码与焦点", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await send(page, "带引用回答");
  await stream.waitForRequests(1);
  await stream.emit(0, { type: "text", delta: "正文[[1_0][1_1]]" });
  const badge = page.locator("[data-citation]");
  await badge.click();
  const next = page.getByRole("button", { name: "下一个来源" });
  await next.click();
  const popup = page.getByRole("dialog");
  await expect(popup).toContainText("2/2");
  await expect(popup).toContainText("暂无资料");
  await stream.emit(0, {
    type: "references",
    items: [
      {
        id: "1_0",
        title: "第一来源",
        content: "第一摘录",
        link: "https://example.com/one",
      },
      {
        id: "1_1",
        title: "第二来源",
        content: "第二摘录",
        link: "https://example.com/two",
      },
    ],
  });
  await expect(badge).toContainText("第一来源");
  await expect(popup).toBeVisible();
  await expect(popup).toContainText("第二摘录");
  await expect(popup).toContainText("2/2");
  await expect(next).toBeFocused();
  await stream.emit(
    0,
    { type: "text", delta: "\n\n回答继续" },
    { type: "done" },
  );
  await expect(popup).toContainText("2/2");
  await page.keyboard.press("Escape");
  await expect(popup).toBeHidden();
  await expect(badge).toBeFocused();
});

test("[OSS-REF-001] 引用内部失焦后，一次外部点击即可关闭（Floating UI #3366，迁移场景）", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await send(page, "来源焦点");
  await stream.waitForRequests(1);
  await stream.emit(
    0,
    { type: "text", delta: "正文[[1_0]]" },
    { type: "done" },
  );
  await waitForAnswer(page);
  const badge = page.locator("[data-citation]");
  await expect(badge).toBeVisible();
  await page.getByRole("button", { name: "复制回答", exact: true }).focus();
  await page.keyboard.press("Shift+Tab");
  await expect(badge).toBeFocused();
  const popup = page.getByRole("dialog");
  await expect(popup).toBeVisible();
  await popup.getByText("引用资料尚未返回，正文内容可以继续阅读。").click();
  await page.getByRole("textbox", { name: "输入消息" }).click();
  await expect(popup).toBeHidden();
  await expect(page.getByRole("textbox", { name: "输入消息" })).toBeFocused();
});
