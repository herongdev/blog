import {
  test,
  expect,
  send,
  readingArea,
  expectAtBottom,
  openModelSettings,
} from "./fixtures";
import { controlledChat } from "./controlled-chat";

test("[SIDEBAR-DESKTOP] 桌面折叠释放空间，焦点可恢复，生成与草稿不受影响", async ({
  page,
}) => {
  const chat = await controlledChat(page);
  const sidebar = page.getByRole("complementary", { name: "侧栏" });
  const collapse = page.getByRole("button", { name: "收起侧栏", exact: true });
  const expand = page.getByRole("button", { name: "打开侧栏", exact: true });
  const settingsEntry = page.getByRole("button", {
    name: "用户设置",
    exact: true,
  });
  await expect(sidebar).toBeVisible();
  await expect(settingsEntry).toHaveCount(1);
  await expect(expand).toBeHidden();
  await send(page, "侧栏切换不会中断回答");
  await chat.waitForRequests(1);
  await chat.emit(0, {
    type: "text",
    delta: "## 测试回答\n\n" + "保留这段回答。\n\n".repeat(24),
  });
  await expect(page.locator("[data-markdown]")).toContainText("保留这段回答。");
  await expectAtBottom(page);
  const draft = page.getByRole("textbox", { name: "输入消息" });
  await draft.fill("尚未发送的草稿\n保留换行");
  const before = await readingArea(page).boundingBox();
  await collapse.click();
  await expect(sidebar).toBeHidden();
  await expect(expand).toBeFocused();
  await expect(expand).toHaveAttribute("aria-expanded", "false");
  await expect(settingsEntry).toBeHidden();
  expect(
    await expand.evaluate(
      (el) => !!document.getElementById(el.getAttribute("aria-controls")!),
    ),
  ).toBe(true);
  const after = await readingArea(page).boundingBox();
  expect(after!.width).toBeGreaterThan(before!.width);
  await expect(
    page.getByRole("button", { name: "新聊天", exact: true }),
  ).toBeHidden();
  await expect(draft).toHaveValue("尚未发送的草稿\n保留换行");
  expect(await chat.requests()).toHaveLength(1);
  expect((await chat.requests())[0].aborted).toBe(false);
  await expectAtBottom(page);
  await expect(page.locator("aside")).toHaveCSS("visibility", "hidden");
  await page.screenshot({
    path: "output/playwright/sidebar-desktop-collapsed.png",
  });
  await chat.emit(
    0,
    { type: "text", delta: "收起后继续输出。" },
    { type: "done" },
  );
  await chat.end(0);
  await expect(page.locator("[data-markdown]")).toContainText(
    "收起后继续输出。",
  );
  await expand.press("Enter");
  await expect(sidebar).toBeVisible();
  await expect(collapse).toBeFocused();
  await expect(draft).toHaveValue("尚未发送的草稿\n保留换行");
  await expect.poll(async () => (await sidebar.boundingBox())?.x).toBe(0);
  await page.screenshot({
    path: "output/playwright/sidebar-desktop-expanded.png",
  });
  // Selecting or creating a desktop conversation must keep the sidebar available.
  await page.getByRole("button", { name: "新聊天", exact: true }).click();
  await expect(sidebar).toBeVisible();
  await page
    .getByRole("navigation", { name: "聊天" })
    .getByRole("button", { name: "侧栏切换不会中断回答", exact: true })
    .click();
  await expect(sidebar).toBeVisible();
  await expect(draft).toHaveValue("尚未发送的草稿\n保留换行");
});

test("[SIDEBAR-RESPONSIVE] 手机抽屉支持键盘和遮罩关闭，跨断点保留桌面选择", async ({
  page,
}) => {
  await page.goto("/");
  const collapse = page.getByRole("button", { name: "收起侧栏", exact: true });
  const expand = page.getByRole("button", { name: "打开侧栏", exact: true });
  await collapse.click();
  await page.setViewportSize({ width: 390, height: 700 });
  const drawer = page.getByRole("dialog", { name: "侧栏", exact: true });
  await expect(drawer).toBeHidden();
  await expand.click();
  await expect(drawer).toBeVisible();
  await expect(collapse).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    drawer.getByRole("button", { name: "搜索对话", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    drawer.getByRole("button", { name: "用户设置", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    drawer.getByRole("button", { name: "搜索对话", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(collapse).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await expect(expand).toBeFocused();
  await expand.click();
  await page.mouse.click(375, 350);
  await expect(drawer).toBeHidden();
  await expect(expand).toBeFocused();
  await page.setViewportSize({ width: 1080, height: 820 });
  await expect(page.getByRole("complementary", { name: "侧栏" })).toBeHidden();
  await expand.click();
  await expect(collapse).toBeVisible();
  await page.setViewportSize({ width: 320, height: 568 });
  await expect(drawer).toBeHidden();
  await expand.click();
  await expect.poll(async () => (await drawer.boundingBox())?.x).toBe(0);
  await page.screenshot({ path: "output/playwright/sidebar-mobile-open.png" });
  const bounds = await drawer.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(0);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
  await page.keyboard.press("Escape");
  await expect(drawer).toBeHidden();
  await openModelSettings(page);
  const settings = page.getByRole("dialog", { name: "让知序接入你的 API" });
  await expect(settings).toBeVisible();
  await expect(
    settings.getByRole("button", { name: "关闭设置" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(expand).toBeFocused();
  await expand.click();
  await drawer.getByRole("button", { name: "新聊天", exact: true }).click();
  await expect(drawer).toBeHidden();
  await page.setViewportSize({ width: 1200, height: 820 });
  await expect(page.getByRole("complementary", { name: "侧栏" })).toBeVisible();
});
