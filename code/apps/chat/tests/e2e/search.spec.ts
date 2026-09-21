import { test, expect, send, waitForAnswer, openPreferences } from "./fixtures";
import { controlledChat } from "./controlled-chat";

test("[CHAT-SEARCH] 标题、正文、项目和归档记录刷新后可离线搜索，同会话选择不打断生成", async ({
  page,
  context,
}) => {
  const stream = await controlledChat(page);
  await page.getByRole("button", { name: "新建项目", exact: true }).click();
  const create = page.getByRole("dialog", { name: "新建项目", exact: true });
  await create.getByRole("textbox").fill("面试准备");
  await create.getByRole("button", { name: "新建项目", exact: true }).click();
  await send(page, "项目里的问题");
  await stream.waitForRequests(1);
  await stream.emit(0, {
    type: "text",
    delta: "唯一正文 [a+b] 关于 React 的资料",
  });
  await page.keyboard.press("Control+k");
  let dialog = page.getByRole("dialog", { name: "搜索对话", exact: true });
  await dialog
    .getByRole("searchbox", { name: "搜索关键词", exact: true })
    .fill("项目里的问题");
  await expect(dialog.getByRole("list")).toHaveAttribute("aria-busy", "false");
  await expect(dialog.getByRole("list").getByRole("button")).toHaveCount(1);
  await dialog.getByRole("searchbox").press("Enter");
  expect(await page.evaluate(() => window.__chatRuns[0].aborted)).toBe(false);
  await stream.emit(0, { type: "done" });
  await waitForAnswer(page);
  await page.getByRole("button", { name: "新聊天", exact: true }).click();
  await send(page, "另一条历史");
  await stream.waitForRequests(2);
  await stream.emit(
    1,
    { type: "text", delta: "已归档的橘子味记录" },
    { type: "done" },
  );
  await waitForAnswer(page);
  await page
    .getByRole("group", { name: "另一条历史", exact: true })
    .getByRole("button", { name: "更多操作", exact: true })
    .click();
  await page.getByRole("menuitem", { name: "归档", exact: true }).click();
  await expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "saved",
  );
  await page.reload();
  await expect(page.getByRole("textbox", { name: "输入消息" })).toBeVisible();
  await context.setOffline(true);
  await page.getByRole("button", { name: "搜索对话", exact: true }).click();
  dialog = page.getByRole("dialog", { name: "搜索对话", exact: true });
  await dialog.getByRole("searchbox").fill("[a+b]");
  const result = dialog.getByRole("list").getByRole("button");
  await expect(result).toHaveCount(1);
  await expect(result).toContainText("面试准备");
  await expect(result.locator("mark")).toHaveText("[a+b]");
  await page.screenshot({
    path: "output/playwright/search-desktop.png",
    animations: "disabled",
  });
  await result.click();
  await expect(page.locator("[data-markdown]")).toContainText("唯一正文");
  await page.keyboard.press("Control+k");
  await dialog.getByRole("searchbox").fill("橘子味");
  await expect(dialog.getByRole("list")).toHaveAttribute("aria-busy", "false");
  await expect(dialog.getByRole("list").getByRole("button")).toHaveCount(1);
  await expect(dialog.getByRole("list")).toContainText("已归档");
  await dialog.getByRole("searchbox").press("ArrowDown");
  await expect(dialog.getByRole("list").getByRole("button")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("navigation", { name: "已归档", exact: true }),
  ).toContainText("另一条历史");
  await expect(page.locator("[data-markdown]")).toContainText("橘子味");
  await context.setOffline(false);
});

test("[CHAT-SEARCH-UI] 手机深色英文、空状态、Escape 焦点恢复和草稿搜索", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toBeVisible();
  await page.keyboard.press("Control+k");
  const initial = page.getByRole("dialog", { name: "搜索对话", exact: true });
  await expect(initial).toContainText("还没有可搜索的对话");
  await page.keyboard.press("Escape");
  await page
    .getByRole("textbox", { name: "输入消息" })
    .fill("Unsent draft 未发送草稿");
  const preferences = await openPreferences(page);
  await preferences
    .getByRole("radio", { name: "English", exact: true })
    .check();
  await page.keyboard.press("Control+k");
  await expect(
    page.getByRole("dialog", { name: "Search chats", exact: true }),
  ).toHaveCount(0);
  await preferences.getByRole("button", { name: "Done", exact: true }).click();
  await page.getByRole("button", { name: "Open sidebar", exact: true }).click();
  const trigger = page.getByRole("button", {
    name: "Search chats",
    exact: true,
  });
  await trigger.click();
  const dialog = page.getByRole("dialog", {
    name: "Search chats",
    exact: true,
  });
  await expect(dialog.getByRole("searchbox")).toBeFocused();
  await dialog.getByRole("searchbox").fill("Not here");
  await expect(dialog).toContainText("No chats found");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("searchbox").fill("UNSENT");
  await expect(dialog.getByRole("list").getByRole("button")).toHaveCount(1);
  await page.screenshot({
    path: "output/playwright/search-mobile-dark.png",
    animations: "disabled",
  });
  const bounds = await dialog.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(390);
  await dialog.getByRole("list").getByRole("button").click();
  await expect(
    page.getByRole("dialog", { name: "Sidebar", exact: true }),
  ).toBeHidden();
  await expect(
    page.getByRole("textbox", { name: "Message", exact: true }),
  ).toHaveValue("Unsent draft 未发送草稿");
});
