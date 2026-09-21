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
  page.locator("nav").getByRole("group", { name: title, exact: true });
async function action(page: Page, title: string, name: string) {
  await row(page, title)
    .getByRole("button", { name: "更多操作", exact: true })
    .click();
  await page
    .getByRole("menu", { name: "更多操作", exact: true })
    .getByRole("menuitem", { name, exact: true })
    .click();
}
async function saved(page: Page) {
  await expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "saved",
  );
}

test("[CONVERSATIONS] 自动标题、重命名、置顶、归档恢复和确认删除持久保存", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await send(page, "我的第一条问题");
  await stream.waitForRequests(1);
  await stream.emit(0, { type: "text", delta: "回答" }, { type: "done" });
  await waitForAnswer(page);
  await expect(row(page, "我的第一条问题")).toBeVisible();
  await action(page, "我的第一条问题", "重命名");
  const dialog = page.getByRole("dialog", { name: "重命名", exact: true });
  const title = dialog.getByRole("textbox", { name: "会话标题" });
  await expect(title).toBeFocused();
  await title.fill("   ");
  await expect(dialog.getByRole("button", { name: "保存" })).toBeDisabled();
  await title.fill("职业规划");
  await title.press("Enter");
  const id = (await row(page, "职业规划").getAttribute(
    "data-conversation-id",
  ))!;
  await page.getByRole("button", { name: "新聊天", exact: true }).click();
  await send(page, "另一条问题");
  await stream.waitForRequests(2);
  await stream.emit(1, { type: "text", delta: "另一个回答" }, { type: "done" });
  await waitForAnswer(page);
  await row(page, "职业规划")
    .getByRole("button", { name: "更多操作", exact: true })
    .click();
  await page.screenshot({
    path: "output/playwright/conversation-menu-desktop.png",
  });
  await page.keyboard.press("Escape");
  await action(page, "职业规划", "置顶聊天");
  await expect(
    page.locator("nav [data-conversation-id]").first(),
  ).toHaveAttribute("data-conversation-id", id);
  await expect(
    row(page, "另一条问题").getByRole("button", {
      name: "另一条问题",
      exact: true,
    }),
  ).toHaveAttribute("aria-current", "page");
  await saved(page);
  await page.reload();
  await expect(row(page, "职业规划")).toHaveAttribute("data-pinned", "true");
  await action(page, "职业规划", "取消置顶");
  await expect(row(page, "职业规划")).toHaveAttribute("data-pinned", "false");
  await action(page, "职业规划", "归档");
  await expect(row(page, "职业规划")).toHaveCount(0);
  await saved(page);
  await page.reload();
  const settings = await openUserSettings(page);
  await settings.getByRole("menuitem", { name: "已归档", exact: true }).click();
  await expect(row(page, "职业规划")).toBeVisible();
  await saved(page);
  await action(page, "职业规划", "取消归档");
  await page.getByRole("button", { name: "返回聊天" }).click();
  await action(page, "职业规划", "删除");
  const confirm = page.getByRole("dialog", { name: "删除", exact: true });
  await confirm.getByRole("button", { name: "取消" }).click();
  await expect(row(page, "职业规划")).toBeVisible();
  await action(page, "职业规划", "删除");
  await confirm.getByRole("button", { name: "删除", exact: true }).click();
  await expect(row(page, "职业规划")).toHaveCount(0);
  await saved(page);
  await page.reload();
  await expect(row(page, "职业规划")).toHaveCount(0);
  await expect(row(page, "另一条问题")).toBeVisible();
});

test("[CONVERSATIONS] 更多按钮支持键盘和手机，原生右键不打开操作菜单", async ({
  page,
}) => {
  await page.goto("/");
  const current = row(page, "新的对话");
  await current.click({ button: "right" });
  await expect(page.getByRole("menu", { name: "更多操作" })).toHaveCount(0);
  const more = current.getByRole("button", { name: "更多操作", exact: true });
  await more.focus();
  await more.press("Enter");
  await expect(
    page.getByRole("menuitem", { name: "重命名", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("End");
  await expect(
    page.getByRole("menuitem", { name: "删除", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Home");
  await expect(
    page.getByRole("menuitem", { name: "重命名", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(more).toBeFocused();
  await page.emulateMedia({ colorScheme: "dark" });
  await page.setViewportSize({ width: 390, height: 740 });
  await page.getByRole("button", { name: "打开侧栏", exact: true }).click();
  await more.click();
  const menu = page.getByRole("menu", { name: "更多操作", exact: true });
  await expect(menu).toBeVisible();
  const box = (await menu.boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(390);
  await page.screenshot({
    path: "output/playwright/conversation-menu-mobile.png",
  });
  await menu.getByRole("menuitem", { name: "重命名" }).click();
  const dialog = page.getByRole("dialog", { name: "重命名", exact: true });
  await dialog.getByRole("textbox").fill("手动标题");
  await dialog.getByRole("button", { name: "保存" }).click();
  await expect(row(page, "手动标题")).toBeVisible();
  await saved(page);
  await page.reload();
  await page.getByRole("button", { name: "打开侧栏", exact: true }).click();
  await expect(row(page, "手动标题")).toBeVisible();
});

test("[CONVERSATIONS] 删除生成中的会话终止请求，旧标签页与迟到事件不能恢复已删内容", async ({
  page,
  context,
}) => {
  const stream = await controlledChat(page);
  await send(page, "准备删除的会话");
  await stream.waitForRequests(1);
  await stream.emit(0, { type: "text", delta: "已接收内容" });
  await saved(page);
  const other = await context.newPage();
  await other.goto("/");
  await expect(row(other, "准备删除的会话")).toBeVisible();
  await action(page, "准备删除的会话", "删除");
  await page
    .getByRole("dialog", { name: "删除", exact: true })
    .getByRole("button", { name: "删除", exact: true })
    .click();
  expect((await stream.requests())[0].aborted).toBe(true);
  await stream.emit(0, { type: "text", delta: "迟到内容" });
  await expect(page.getByRole("article")).toHaveCount(0);
  await saved(page);
  await other.getByRole("textbox", { name: "输入消息" }).fill("旧标签页草稿");
  await expect(other.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "conflict",
  );
  await other.reload();
  await expect(row(other, "准备删除的会话")).toHaveCount(0);
  await expect(other.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "",
  );
  await other.close();
});
