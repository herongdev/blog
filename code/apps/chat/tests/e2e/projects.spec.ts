import type { Page } from "@playwright/test";
import { test, expect, send, waitForAnswer } from "./fixtures";
import { controlledChat } from "./controlled-chat";

async function createProject(page: Page, name: string) {
  await page.getByRole("button", { name: "新建项目", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "新建项目", exact: true });
  await dialog.getByRole("textbox", { name: "项目名称" }).fill(name);
  await dialog.getByRole("button", { name: "新建项目", exact: true }).click();
}
async function saved(page: Page) {
  await expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "saved",
  );
}
async function move(page: Page, title: string, destination: string) {
  await page
    .getByRole("group", { name: title, exact: true })
    .getByRole("button", { name: "更多操作", exact: true })
    .click();
  await page.getByRole("menuitem", { name: "移至项目", exact: true }).click();
  await page
    .getByRole("dialog", { name: "移至项目", exact: true })
    .getByRole("button", { name: destination, exact: true })
    .click();
}

test("[PROJECTS] 创建、项目内新建、移动正在生成的会话和移出项目，刷新保留归属", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await createProject(page, "  求职准备  ");
  await expect(
    page.getByRole("heading", { name: "求职准备", exact: true }),
  ).toBeVisible();
  const project = page.locator("[data-project-id]");
  const addChat = project.getByRole("button", {
    name: "在此项目中新建对话",
    exact: true,
  });
  await expect(addChat).toHaveCount(1);
  await expect(addChat).toHaveText("");
  await expect(project.getByText(/项目内新建(?:对话|会话)/)).toHaveCount(0);
  const nameBounds = await project
    .getByRole("button", { name: "求职准备", exact: true })
    .boundingBox();
  const addBounds = await addChat.boundingBox();
  expect(nameBounds).not.toBeNull();
  expect(addBounds).not.toBeNull();
  expect(addBounds!.x).toBeGreaterThanOrEqual(
    nameBounds!.x + nameBounds!.width,
  );
  expect(
    Math.abs(
      addBounds!.y +
        addBounds!.height / 2 -
        (nameBounds!.y + nameBounds!.height / 2),
    ),
  ).toBeLessThan(2);
  await page.screenshot({ path: "output/playwright/project-created.png" });
  await send(page, "准备第一轮面试");
  await stream.waitForRequests(1);
  await stream.emit(0, { type: "text", delta: "面试建议" }, { type: "done" });
  await waitForAnswer(page);
  const id = await page
    .getByRole("group", { name: "准备第一轮面试", exact: true })
    .getAttribute("data-conversation-id");
  await page
    .getByRole("button", { name: "在此项目中新建对话", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "求职准备", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "输入消息" })
    .fill("待补充的项目草稿");
  await saved(page);
  await page.reload();
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "待补充的项目草稿",
  );
  await expect(
    page.locator("[data-project-id] [data-conversation-id]"),
  ).toHaveCount(2);
  await page.getByRole("button", { name: "新聊天", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "让答案，有据可循。", exact: true }),
  ).toBeVisible();
  await send(page, "项目外的工作");
  await stream.waitForRequests(1);
  await move(page, "项目外的工作", "求职准备");
  await stream.emit(
    0,
    { type: "text", delta: "移动后继续回答" },
    { type: "done" },
  );
  await waitForAnswer(page);
  await expect(page.locator("[data-project-id]")).toContainText("项目外的工作");
  await expect(page.locator("[data-markdown]")).toContainText("移动后继续回答");
  await move(page, "项目外的工作", "不属于任何项目");
  await saved(page);
  await page.reload();
  await expect(
    page.getByRole("navigation", { name: "聊天", exact: true }),
  ).toContainText("项目外的工作");
  await page.getByRole("button", { name: "求职准备", exact: true }).click();
  await expect(page.locator(`[data-conversation-id="${id}"]`)).toBeVisible();
});

test("[PROJECTS] 两个标签页分别创建项目互不覆盖，空项目刷新保留", async ({
  page,
  context,
}) => {
  await page.goto("/");
  const other = await context.newPage();
  await other.goto(page.url());
  await expect(
    other.getByRole("button", { name: "新建项目", exact: true }),
  ).toBeVisible();
  await createProject(page, "项目甲");
  await createProject(other, "项目乙");
  await saved(page);
  await saved(other);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "项目甲", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "项目乙", exact: true }),
  ).toBeVisible();
  await other.close();
});

test("[PROJECTS] 移动端深色弹窗、空白校验、Escape 和长项目名称不溢出", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "打开侧栏", exact: true }).click();
  await page.getByRole("button", { name: "新建项目", exact: true }).click();
  let dialog = page.getByRole("dialog", { name: "新建项目", exact: true });
  const input = dialog.getByRole("textbox", { name: "项目名称" });
  await expect(input).toBeFocused();
  await input.fill("   ");
  await expect(
    dialog.getByRole("button", { name: "新建项目", exact: true }),
  ).toBeDisabled();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "新建项目", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "新建项目", exact: true }).click();
  dialog = page.getByRole("dialog", { name: "新建项目", exact: true });
  await page.screenshot({
    path: "output/playwright/project-dialog-mobile.png",
  });
  const name = "长期项目名称".repeat(12);
  await dialog.getByRole("textbox", { name: "项目名称" }).fill(name);
  await dialog.getByRole("button", { name: "新建项目", exact: true }).click();
  await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "output/playwright/project-long-name-mobile.png",
    animations: "disabled",
  });
});
