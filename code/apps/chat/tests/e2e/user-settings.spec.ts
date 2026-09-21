import {
  test,
  expect,
  openUserSettings,
  openPreferences,
  openModelSettings,
} from "./fixtures";

test("[USER-SETTINGS] 左下角集中设置，键盘选择与关闭后焦点恢复", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "用户设置", exact: true });
  await expect(trigger).toBeVisible();
  await expect(
    page
      .locator("header")
      .getByRole("button", { name: /语言与外观|打开模型设置/ }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "已归档", exact: true }),
  ).toHaveCount(0);
  const menu = await openUserSettings(page);
  const triggerBox = (await trigger.boundingBox())!;
  const menuBox = (await menu.boundingBox())!;
  expect(menuBox.y + menuBox.height).toBeLessThanOrEqual(triggerBox.y);
  expect(menuBox.x).toBeGreaterThanOrEqual(0);
  await page.screenshot({
    path: "output/playwright/user-settings-desktop.png",
    animations: "disabled",
  });
  await page.keyboard.press("End");
  await expect(menu.getByRole("menuitem", { name: "已归档" })).toBeFocused();
  await page.keyboard.press("Home");
  await expect(
    menu.getByRole("menuitem", { name: "语言与外观" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
  const dialog = await openPreferences(page);
  await expect(dialog).toBeVisible();
  await expect(menu).toBeHidden();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await openModelSettings(page);
  await expect(
    page.getByRole("dialog", { name: "让知序接入你的 API" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  const draft = page.getByRole("textbox", { name: "输入消息", exact: true });
  await draft.fill("查看归档时保留的草稿");
  const archiveMenu = await openUserSettings(page);
  await expect
    .poll(() =>
      archiveMenu.evaluate((menu) => menu.contains(document.activeElement)),
    )
    .toBe(true);
  await page.keyboard.press("End");
  await expect(
    archiveMenu.getByRole("menuitem", { name: "已归档", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(archiveMenu).toBeHidden();
  await expect(
    page.getByRole("navigation", { name: "已归档", exact: true }),
  ).toContainText("暂无归档会话");
  await expect(draft).toHaveValue("查看归档时保留的草稿");
  await page.getByRole("button", { name: "返回聊天", exact: true }).click();
  await expect(
    page.getByRole("navigation", { name: "聊天", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "新聊天", exact: true }),
  ).toBeFocused();
});

test("[USER-SETTINGS] 收起侧栏与手机端仍可找到设置，弹窗切换不困住焦点", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "收起侧栏", exact: true }).click();
  let dialog = await openPreferences(page);
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("aside")).toHaveAttribute("aria-hidden", "true");
  const menu = await openUserSettings(page);
  await expect(menu).toBeVisible();
  await page.screenshot({
    path: "output/playwright/user-settings-mobile.png",
    animations: "disabled",
  });
  await menu.getByRole("menuitem", { name: "语言与外观" }).click();
  dialog = page.getByRole("dialog", { name: "偏好设置" });
  await expect(dialog).toBeVisible();
  await expect(page.locator("aside")).toHaveAttribute("aria-hidden", "true");
  await dialog.getByRole("radio", { name: "English", exact: true }).check();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open sidebar", exact: true }),
  ).toBeFocused();
  const englishMenu = await openUserSettings(page);
  await expect(englishMenu).toBeVisible();
  await englishMenu
    .getByRole("menuitem", { name: "Archived chats", exact: true })
    .click();
  await expect(englishMenu).toBeHidden();
  await expect(page.locator("aside")).toHaveAttribute("aria-hidden", "false");
  await expect(
    page.getByRole("navigation", { name: "Archived chats", exact: true }),
  ).toContainText("No archived chats");
  await page
    .getByRole("button", { name: "Back to chats", exact: true })
    .click();
  await expect(
    page.getByRole("navigation", { name: "Chats", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
});
