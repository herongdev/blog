import { readFile } from "node:fs/promises";
import type { Page } from "@playwright/test";
import { test, expect, send, waitForAnswer } from "./fixtures";
import { controlledChat } from "./controlled-chat";

async function exportChat(page: Page, title: string) {
  await page
    .locator("[data-conversation-id]")
    .filter({ has: page.getByRole("button", { name: title, exact: true }) })
    .getByRole("button", { name: "更多操作", exact: true })
    .click();
  const downloading = page.waitForEvent("download");
  await page.getByRole("menuitem", { name: "导出记录", exact: true }).click();
  const download = await downloading;
  return {
    name: download.suggestedFilename(),
    data: JSON.parse(await readFile((await download.path())!, "utf8")),
  };
}

test("[CONVERSATION-EXPORT] 保存静默、按会话导出，生成期间导出不切换或停止当前对话", async ({
  page,
}) => {
  const stream = await controlledChat(page);
  await expect(
    page.getByText("聊天记录已保存在此浏览器", { exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "导出记录", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "新建项目", exact: true }).click();
  const dialog = page.getByRole("dialog", { name: "新建项目", exact: true });
  await dialog.getByRole("textbox").fill("导出所属项目");
  await dialog.getByRole("button", { name: "新建项目", exact: true }).click();
  const title = "项目/内:问题?";
  await send(page, title);
  await stream.waitForRequests(1);
  await stream.emit(0, { type: "text", delta: "历史答案" }, { type: "done" });
  await waitForAnswer(page);
  await page
    .getByRole("textbox", { name: "输入消息" })
    .fill("待发送的项目草稿");
  await page.getByRole("button", { name: "新聊天", exact: true }).click();
  await send(page, "另一条独立问题");
  await stream.waitForRequests(2);
  await stream.emit(1, { type: "text", delta: "生成中的答案" });
  await page.getByRole("button", { name: "停止生成", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "导出所属项目", exact: true }),
  ).toHaveAttribute("aria-expanded", "true");
  const projectBackup = await exportChat(page, title);
  expect(projectBackup.data.conversations).toHaveLength(1);
  expect(projectBackup.data.projects).toHaveLength(1);
  expect(projectBackup.data.projects[0].name).toBe("导出所属项目");
  expect(projectBackup.data.conversations[0].draft).toBe("待发送的项目草稿");
  expect(projectBackup.name).not.toMatch(/[/:?]/);
  expect(JSON.stringify(projectBackup.data)).not.toContain("另一条独立问题");
  await page.getByRole("button", { name: "新聊天", exact: true }).click();
  await send(page, "当前生成");
  await stream.waitForRequests(3);
  await stream.emit(2, { type: "text", delta: "最新已接收的片段" });
  const background = await exportChat(page, "另一条独立问题");
  expect(background.data.conversations).toHaveLength(1);
  expect(background.data.conversations[0].title).toBe("另一条独立问题");
  expect(background.data.projects).toEqual([]);
  await expect(
    page.getByRole("button", { name: "停止生成", exact: true }),
  ).toBeVisible();
  expect(await page.evaluate(() => window.__chatRuns[2].aborted)).toBe(false);
  const current = await exportChat(page, "当前生成");
  expect(current.data.conversations[0].messages.at(-1).content).toBe(
    "最新已接收的片段",
  );
  expect(current.data.activeId).toBe(current.data.conversations[0].id);
  await stream.emit(2, { type: "done" });
  await waitForAnswer(page);
  await expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "saved",
  );
  await expect(page.locator("[data-history-status]")).toBeHidden();
  await page.screenshot({
    path: "output/playwright/composer-quiet-footer.png",
    animations: "disabled",
  });
});
