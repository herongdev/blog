import type { Page } from "@playwright/test";
import {
  test,
  expect,
  send,
  waitForAnswer,
  openUserSettings,
} from "./fixtures";
import { controlledChat } from "./controlled-chat";

const row = (page: Page, title: string) =>
  page.getByRole("group", { name: title, exact: true });
const open = (page: Page, title: string) =>
  row(page, title).getByRole("button", { name: title, exact: true }).click();
const fresh = (page: Page) =>
  page.getByRole("button", { name: "新聊天", exact: true }).click();
const saved = (page: Page) =>
  expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "saved",
  );

test("[BG-STOP] 两个首包等待独立运行，停止一条并重发不影响另一条或被旧终态覆盖", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await send(page, "后台甲");
  await stream.waitForRequests(1);
  await fresh(page);
  await send(page, "后台乙");
  await stream.waitForRequests(2);
  for (const title of ["后台甲", "后台乙"])
    await expect(
      row(page, title).getByRole("img", { name: "正在生成" }),
    ).toBeVisible();
  await open(page, "后台甲");
  await page.getByRole("button", { name: "停止生成" }).click();
  expect((await stream.requests()).map((r) => r.aborted)).toEqual([
    true,
    false,
  ]);
  await expect(
    row(page, "后台甲").getByRole("img", { name: "正在生成" }),
  ).toHaveCount(0);
  await send(page, "甲的新问题");
  await stream.waitForRequests(3);
  await stream.emit(0, { type: "text", delta: "废弃数据" }, { type: "done" });
  await stream.emit(1, { type: "text", delta: "乙仍然完成" }, { type: "done" });
  await stream.emit(2, { type: "text", delta: "甲的新回答" });
  await expect(page.locator("[data-markdown]")).toHaveText("甲的新回答");
  await expect(page.getByRole("button", { name: "停止生成" })).toBeVisible();
  await open(page, "后台乙");
  await expect(page.locator("[data-markdown]")).toHaveText("乙仍然完成");
  await waitForAnswer(page);
  await stream.emit(2, { type: "done" });
  await open(page, "后台甲");
  await waitForAnswer(page);
  await expect(page.locator("[data-markdown]")).toHaveText("甲的新回答");
  await expect(
    row(page, "后台甲").getByRole("img", { name: "正在生成" }),
  ).toHaveCount(0);
});

for (const action of ["归档", "删除"] as const) {
  test(`[BG-MANAGE] ${action}后台聊天仅取消该聊天，迟到数据不影响当前生成`, async ({
    page,
  }) => {
    const stream = await controlledChat(page);
    await send(page, "待处理甲");
    await stream.waitForRequests(1);
    await stream.emit(0, { type: "text", delta: "甲已收到" });
    await expect(page.locator("[data-markdown]")).toHaveText("甲已收到");
    await fresh(page);
    await send(page, "保留乙");
    await stream.waitForRequests(2);
    await row(page, "待处理甲")
      .getByRole("button", { name: "更多操作", exact: true })
      .click();
    await page.getByRole("menuitem", { name: action, exact: true }).click();
    if (action === "删除")
      await page
        .getByRole("dialog", { name: "删除", exact: true })
        .getByRole("button", { name: "删除", exact: true })
        .click();
    await expect
      .poll(async () => (await stream.requests()).map((r) => r.aborted))
      .toEqual([true, false]);
    await stream.emit(
      0,
      { type: "text", delta: "不应恢复" },
      { type: "error", message: "迟到异常" },
    );
    await stream.emit(
      1,
      { type: "text", delta: "乙正常完成" },
      { type: "done" },
    );
    await expect(page.locator("[data-markdown]")).toHaveText("乙正常完成");
    await expect(page.getByRole("alert")).toHaveCount(0);
    await expect(row(page, "待处理甲")).toHaveCount(0);
    if (action === "归档") {
      const menu = await openUserSettings(page);
      await menu.getByRole("menuitem", { name: "已归档", exact: true }).click();
      await open(page, "待处理甲");
      await expect(page.locator("[data-markdown]")).toHaveText("甲已收到");
      await expect(page.getByText("已停止生成", { exact: true })).toBeVisible();
    }
  });
}

test("[BG-CACHE] 打开已释放的历史不卸载两个后台流，完成后刷新仍保留各自全文", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await send(page, "旧历史");
  await stream.waitForRequests(1);
  await stream.emit(0, { type: "text", delta: "旧历史正文" }, { type: "done" });
  await waitForAnswer(page);
  await fresh(page);
  await send(page, "并行甲");
  await stream.waitForRequests(2);
  await fresh(page);
  await send(page, "并行乙");
  await stream.waitForRequests(3);
  await open(page, "旧历史");
  await expect(page.locator("[data-markdown]")).toHaveText("旧历史正文");
  expect((await stream.requests()).slice(1).map((r) => r.aborted)).toEqual([
    false,
    false,
  ]);
  await stream.emit(1, { type: "text", delta: "甲的后台正文" });
  await stream.emit(2, { type: "text", delta: "乙的后台正文" });
  await stream.emit(1, { type: "text", delta: "，完整结尾" }, { type: "done" });
  await stream.emit(2, { type: "text", delta: "，完整结尾" }, { type: "done" });
  await expect(page.getByRole("img", { name: "正在生成" })).toHaveCount(0);
  await expect(page.locator("[data-markdown]")).toHaveText("旧历史正文");
  await saved(page);
  await page.reload();
  for (const [title, content] of [
    ["并行甲", "甲的后台正文，完整结尾"],
    ["并行乙", "乙的后台正文，完整结尾"],
  ]) {
    await open(page, title);
    await expect(page.locator("[data-markdown]")).toHaveText(content);
    await expect(page.getByText("已停止生成", { exact: true })).toHaveCount(0);
  }
});

test("[BG-RELOAD] 刷新保留两个生成中聊天已收到的正文，恢复为中断且不自动重发", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  for (const [i, title] of ["刷新甲", "刷新乙"].entries()) {
    if (i) await fresh(page);
    await send(page, title);
    await stream.waitForRequests(i + 1);
    await stream.emit(i, { type: "text", delta: `${title}已收到` });
    await expect(page.locator("[data-markdown]")).toHaveText(`${title}已收到`);
  }
  await page.reload();
  for (const title of ["刷新甲", "刷新乙"]) {
    await open(page, title);
    await expect(page.locator("[data-markdown]")).toHaveText(`${title}已收到`);
    await expect(page.getByRole("button", { name: "停止生成" })).toHaveCount(0);
  }
  await stream.waitForRequests(0);
  await expect(page.getByRole("img", { name: "正在生成" })).toHaveCount(0);
});
