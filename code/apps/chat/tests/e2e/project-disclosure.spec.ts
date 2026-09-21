import type { Page } from "@playwright/test";
import {
  test,
  expect,
  openUserSettings,
  send,
  waitForAnswer,
} from "./fixtures";
import { controlledChat } from "./controlled-chat";

const project = (page: Page, name: string) =>
  page.locator("[data-project-id]").filter({
    has: page.getByRole("button", { name, exact: true }),
  });
const folder = (page: Page, name: string) =>
  project(page, name).getByRole("button", { name, exact: true });

async function create(page: Page, name: string, draft: string) {
  await page.getByRole("button", { name: "新建项目", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "新建项目", exact: true });
  await dialog.getByRole("textbox").fill(name);
  await dialog.getByRole("button", { name: "新建项目", exact: true }).click();
  await page.getByRole("textbox", { name: "输入消息" }).fill(draft);
  await expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "saved",
  );
}

test("[PROJECT-DISCLOSURE] 多项目独立展开，按需加载，折叠不导航也不打断生成", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await create(page, "项目甲", "甲的草稿");
  await create(page, "项目乙", "乙的草稿");
  await expect(folder(page, "项目甲")).toHaveAttribute("aria-expanded", "true");
  await expect(folder(page, "项目乙")).toHaveAttribute("aria-expanded", "true");
  await page.reload();
  // Only the current project's directory is loaded at startup; opening the other
  // project must load its saved entries without activating one of its chats.
  await expect(folder(page, "项目乙")).toHaveAttribute("aria-expanded", "true");
  await folder(page, "项目甲").click();
  await expect(folder(page, "项目甲")).toHaveAttribute("aria-expanded", "true");
  await expect(folder(page, "项目乙")).toHaveAttribute("aria-expanded", "true");
  await expect(
    project(page, "项目甲").getByRole("button", {
      name: "未发送草稿",
      exact: true,
    }),
  ).toBeVisible();
  const draft = page.getByRole("textbox", { name: "输入消息" });
  await expect(draft).toHaveValue("乙的草稿");
  await folder(page, "项目甲").press("Enter");
  await expect(folder(page, "项目甲")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(folder(page, "项目乙")).toHaveAttribute("aria-expanded", "true");
  await folder(page, "项目甲").press("Space");
  await project(page, "项目甲")
    .getByRole("button", { name: "未发送草稿", exact: true })
    .click();
  await expect(draft).toHaveValue("甲的草稿");
  await draft.focus();
  await page.mouse.move(1100, 100);
  // Only the active chat is highlighted; its parent is a disclosure control.
  await expect(
    project(page, "项目甲").getByRole("button", {
      name: "未发送草稿",
      exact: true,
    }),
  ).toHaveAttribute("aria-current", "page");
  expect(
    await folder(page, "项目甲").evaluate((button) => ({
      background: getComputedStyle(button.parentElement!).backgroundColor,
      color: getComputedStyle(button).color,
    })),
  ).toEqual({
    background: "rgba(0, 0, 0, 0)",
    color: await folder(page, "项目乙").evaluate(
      (button) => getComputedStyle(button).color,
    ),
  });
  await page.screenshot({
    path: "output/playwright/project-chat-selection.png",
    animations: "disabled",
  });
  await expect(folder(page, "项目乙")).toHaveAttribute("aria-expanded", "true");
  await send(page, "继续项目甲");
  await stream.waitForRequests(1);
  await stream.emit(0, { type: "text", delta: "仍在生成" });
  await draft.fill("生成期间的草稿");
  await folder(page, "项目甲").click();
  await folder(page, "项目乙").click();
  await expect(folder(page, "项目甲")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(folder(page, "项目乙")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(draft).toHaveValue("生成期间的草稿");
  expect((await stream.requests())[0].aborted).toBe(false);
  await stream.emit(
    0,
    { type: "text", delta: "，折叠后继续" },
    { type: "done" },
  );
  await waitForAnswer(page);
  await expect(page.locator("[data-markdown]").last()).toContainText(
    "折叠后继续",
  );
  await project(page, "项目乙")
    .getByRole("button", { name: "在此项目中新建对话", exact: true })
    .click();
  await expect(folder(page, "项目乙")).toHaveAttribute("aria-expanded", "true");
  await expect(folder(page, "项目甲")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(draft).toHaveValue("");
});

test("[PROJECT-DISCLOSURE-UI] 收起侧栏、归档往返及移动端保留各项目的展开选择", async ({
  page,
}) => {
  await page.goto("/");
  await create(page, "项目甲", "甲的草稿");
  await create(page, "项目乙", "乙的草稿");
  await folder(page, "项目甲").click();
  await page.getByRole("button", { name: "收起侧栏", exact: true }).click();
  await page.getByRole("button", { name: "打开侧栏", exact: true }).click();
  await expect(folder(page, "项目甲")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(folder(page, "项目乙")).toHaveAttribute("aria-expanded", "true");
  const menu = await openUserSettings(page);
  await menu.getByRole("menuitem", { name: "已归档", exact: true }).click();
  await page.getByRole("button", { name: "返回聊天", exact: true }).click();
  await expect(folder(page, "项目甲")).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(folder(page, "项目乙")).toHaveAttribute("aria-expanded", "true");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "打开侧栏", exact: true }).click();
  await folder(page, "项目甲").click();
  await expect(folder(page, "项目甲")).toHaveAttribute("aria-expanded", "true");
  await expect(folder(page, "项目乙")).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("aside")).toHaveAttribute("aria-hidden", "false");
  await page.screenshot({
    path: "output/playwright/projects-independent-mobile.png",
    animations: "disabled",
  });
  await project(page, "项目甲")
    .getByRole("button", { name: "未发送草稿", exact: true })
    .click();
  await expect(page.locator("aside")).toHaveAttribute("aria-hidden", "true");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "甲的草稿",
  );
  await page.getByRole("button", { name: "打开侧栏", exact: true }).click();
  await expect(folder(page, "项目甲")).toHaveAttribute("aria-expanded", "true");
  await expect(folder(page, "项目乙")).toHaveAttribute("aria-expanded", "true");
});
