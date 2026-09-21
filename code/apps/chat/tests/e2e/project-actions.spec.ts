import type { Page } from "@playwright/test";
import { test, expect, send, waitForAnswer, openPreferences } from "./fixtures";
import { controlledChat } from "./controlled-chat";

const project = (page: Page, name: string) =>
  page
    .locator("[data-project-id]")
    .filter({ has: page.getByRole("button", { name, exact: true }) });
async function create(page: Page, name: string) {
  await page.getByRole("button", { name: "新建项目", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "新建项目", exact: true });
  await dialog.getByRole("textbox").fill(name);
  await dialog.getByRole("button", { name: "新建项目", exact: true }).click();
}
async function action(page: Page, name: string, action: string) {
  await project(page, name)
    .getByRole("button", { name: "项目操作", exact: true })
    .click();
  await page.getByRole("menuitem", { name: action, exact: true }).click();
}
async function saved(page: Page) {
  await expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "saved",
  );
}

test("[PROJECT-MENU] 重命名、置顶与快捷新建；删除项目保留正在生成的对话", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await create(page, "项目甲");
  await send(page, "项目内的问题");
  await stream.waitForRequests(1);
  await stream.emit(0, { type: "text", delta: "第一条答案" }, { type: "done" });
  await waitForAnswer(page);
  await create(page, "项目乙");
  await action(page, "项目乙", "置顶项目");
  await expect(page.locator("[data-project-id]").first()).toContainText(
    "项目乙",
  );
  await action(page, "项目乙", "重命名项目");
  let dialog = page.getByRole("dialog", { name: "重命名项目", exact: true });
  await expect(dialog.getByRole("textbox")).toBeFocused();
  await dialog.getByRole("textbox").fill("  ");
  await expect(
    dialog.getByRole("button", { name: "保存", exact: true }),
  ).toBeDisabled();
  await dialog.getByRole("textbox").fill("项目新名");
  await dialog.getByRole("textbox").press("Enter");
  await saved(page);
  await page.reload();
  await expect(project(page, "项目新名")).toHaveAttribute(
    "data-pinned",
    "true",
  );
  await action(page, "项目新名", "取消置顶项目");
  await project(page, "项目甲")
    .getByRole("button", { name: "在此项目中新建对话", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "项目甲", exact: true }),
  ).toBeVisible();
  await project(page, "项目甲")
    .getByRole("button", { name: "项目操作", exact: true })
    .click();
  await expect(page.getByRole("menuitem")).toHaveText([
    "重命名项目",
    "置顶项目",
    "删除项目",
  ]);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toBeVisible();
  await project(page, "项目甲")
    .getByRole("button", { name: "项目内的问题", exact: true })
    .click();
  await expect(page.locator("[data-markdown]").last()).toContainText(
    "第一条答案",
  );
  await send(page, "继续回答");
  await stream.waitForRequests(1);
  await action(page, "项目甲", "删除项目");
  dialog = page.getByRole("dialog", { name: "删除项目", exact: true });
  await expect(dialog).toContainText("聊天内容将保留");
  await expect(
    dialog.getByRole("button", { name: "取消", exact: true }),
  ).toBeFocused();
  await dialog.getByRole("button", { name: "取消", exact: true }).click();
  await expect(project(page, "项目甲")).toBeVisible();
  await action(page, "项目甲", "删除项目");
  await dialog.getByRole("button", { name: "删除项目", exact: true }).click();
  await expect(project(page, "项目甲")).toHaveCount(0);
  await stream.emit(
    0,
    { type: "text", delta: "删除项目后仍然保留的答案" },
    { type: "done" },
  );
  await waitForAnswer(page);
  await saved(page);
  await page.reload();
  await expect(page.locator("[data-markdown]").last()).toContainText(
    "删除项目后仍然保留的答案",
  );
  await expect(
    page.getByRole("navigation", { name: "聊天", exact: true }),
  ).toContainText("项目内的问题");
});

test("[PROJECT-MENU-TABS] 旧标签页不能覆盖新名称或恢复已删项目", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await create(page, "共享本地项目");
  await page.getByRole("textbox", { name: "输入消息" }).fill("保留项目草稿");
  await saved(page);
  const other = await context.newPage();
  await other.goto(page.url());
  await expect(project(other, "共享本地项目")).toBeVisible();
  await action(page, "共享本地项目", "重命名项目");
  await page
    .getByRole("dialog", { name: "重命名项目", exact: true })
    .getByRole("textbox")
    .fill("已经改名");
  await page
    .getByRole("dialog", { name: "重命名项目", exact: true })
    .getByRole("button", { name: "保存", exact: true })
    .click();
  await saved(page);
  await action(other, "共享本地项目", "置顶项目");
  await expect(other.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "conflict",
  );
  await other.reload();
  await expect(project(other, "已经改名")).toBeVisible();
  await action(page, "已经改名", "删除项目");
  await page
    .getByRole("dialog", { name: "删除项目", exact: true })
    .getByRole("button", { name: "删除项目", exact: true })
    .click();
  await saved(page);
  await action(other, "已经改名", "置顶项目");
  await expect(other.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "conflict",
  );
  await other.reload();
  await expect(other.locator("[data-project-id]")).toHaveCount(0);
  await expect(other.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "保留项目草稿",
  );
  await other.close();
});

test("[PROJECT-MENU-UI] 手机深色英文菜单支持键盘、Escape 和重命名弹窗", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await page.getByRole("button", { name: "打开侧栏", exact: true }).click();
  await create(page, "Research");
  const preferences = await openPreferences(page);
  await preferences
    .getByRole("radio", { name: "English", exact: true })
    .check();
  await preferences.getByRole("button", { name: "Done", exact: true }).click();
  await page.getByRole("button", { name: "Open sidebar", exact: true }).click();
  const trigger = project(page, "Research").getByRole("button", {
    name: "Project actions",
    exact: true,
  });
  await trigger.focus();
  await trigger.press("ArrowDown");
  const menu = page.getByRole("menu", { name: "Project actions", exact: true });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("menuitem")).toHaveText([
    "Rename project",
    "Pin project",
    "Delete project",
  ]);
  await expect(
    page.getByRole("menuitem", { name: "Rename project", exact: true }),
  ).toBeFocused();
  await page.screenshot({
    path: "output/playwright/project-menu-mobile-dark.png",
    animations: "disabled",
  });
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("menuitem", { name: "Rename project", exact: true })
    .click();
  const dialog = page.getByRole("dialog", {
    name: "Rename project",
    exact: true,
  });
  await expect(
    dialog.getByRole("textbox", { name: "Project name", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeVisible();
});
