import { test, expect, readingArea, expectAtBottom } from "./fixtures";
import { seedLegacy } from "./history-fixtures";

test("[HISTORY-SCALE] 千条旧记录迁移、摘要读取、虚拟侧栏和后台搜索分页", async ({
  page,
}) => {
  test.setTimeout(90_000);
  await seedLegacy(page, 1000);
  await page.reload();
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 0",
  );
  const reads = await page.evaluate(
    () =>
      (
        window as unknown as {
          __historyReads: { fullGetAll: number; fullGet: number };
        }
      ).__historyReads,
  );
  expect(reads).toEqual({ fullGetAll: 0, fullGet: 1 });
  const rows = page.locator("[data-conversation-id]");
  expect(await rows.count()).toBeLessThan(50);
  const first = page.locator('[data-conversation-id="chat-0000"]');
  await first
    .getByRole("button", { name: "历史问题 0000", exact: true })
    .focus();
  await page.keyboard.press("End");
  const last = page.locator('[data-conversation-id="chat-0049"]');
  await expect(
    last.getByRole("button", { name: "历史问题 0049", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 49",
  );
  await expect(page.locator("[data-message-row]")).toContainText("正文 49");
  expect(await rows.count()).toBeLessThan(50);
  await page.getByRole("button", { name: "加载更多对话", exact: true }).click();
  await expect(
    page.locator('[data-windowed-list][data-total-items="100"]'),
  ).toBeAttached();
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog", { name: "搜索对话", exact: true });
  await dialog.getByRole("searchbox").fill("共同检索词");
  await expect(dialog.getByRole("list").getByRole("button")).toHaveCount(50);
  await expect(dialog).toContainText("1000");
  await dialog.getByRole("button", { name: "下一页", exact: true }).click();
  await expect(dialog.getByRole("list")).toContainText("历史问题 0050");
  await expect(dialog.getByRole("list")).not.toContainText("历史问题 0000");
  await dialog.getByRole("searchbox").fill("不存在的搜索");
  await dialog.getByRole("searchbox").fill("正文 876");
  await expect(dialog.getByRole("list").getByRole("button")).toHaveCount(1);
  await expect(dialog.getByRole("list")).toContainText("历史问题 0876");
  await dialog.getByRole("list").getByRole("button").click();
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 876",
  );
  await page.screenshot({ path: "output/playwright/history-scale.png" });
});

test("[MESSAGE-WINDOW] 长对话双向虚拟化，往返滚动保持完整内容和有限挂载", async ({
  page,
}) => {
  await seedLegacy(page, 1, 160);
  await expectAtBottom(page);
  await expect(
    page.locator('[data-message-row="chat-0000-159"]'),
  ).toBeVisible();
  expect(await page.locator("[data-message-row]").count()).toBeLessThan(50);
  const viewport = readingArea(page);
  await viewport.evaluate((el) => {
    el.scrollTop = 0;
  });
  await expect(page.locator('[data-message-row="chat-0000-0"]')).toBeVisible();
  expect(await page.locator("[data-message-row]").count()).toBeLessThan(50);
  await viewport.evaluate((el) => {
    el.scrollTop = el.scrollHeight / 2;
  });
  await expect(page.locator('[data-message-row="chat-0000-159"]')).toHaveCount(
    0,
  );
  expect(await page.locator("[data-message-row]").count()).toBeLessThan(50);
  await page.getByRole("button", { name: "回到最新", exact: true }).click();
  await expectAtBottom(page);
  await expect(
    page.locator('[data-message-row="chat-0000-159"]'),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.locator('[data-message-row="chat-0000-159"]'),
  ).toContainText("第 159 条消息");
});

test("[PROJECT-WINDOW] 项目内大量会话支持虚拟滚动与键盘导航", async ({
  page,
}) => {
  await seedLegacy(page, 500, 1, true);
  const rows = page.locator("[data-conversation-id]");
  expect(await rows.count()).toBeLessThan(50);
  const project = page.locator('[data-project-id="project"]');
  await project
    .getByRole("button", { name: "历史问题 0000", exact: true })
    .focus();
  await page.keyboard.press("End");
  await expect(
    project.getByRole("button", { name: "历史问题 0049", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 49",
  );
});

test("[SEARCH-INDEX-UPDATES] 未加载会话重命名保留正文，草稿更新和删除同步搜索索引", async ({
  page,
}) => {
  await seedLegacy(page, 3);
  const second = page.locator('[data-conversation-id="chat-0001"]');
  await second.getByRole("button", { name: "更多操作", exact: true }).click();
  await page.getByRole("menuitem", { name: "重命名", exact: true }).click();
  const rename = page.getByRole("dialog", { name: "重命名", exact: true });
  await rename.getByRole("textbox").fill("更新后的唯一标题");
  await rename.getByRole("textbox").press("Enter");
  await expect(second).toContainText("更新后的唯一标题");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 0",
  );
  await page.keyboard.press("Control+k");
  const search = page.getByRole("dialog", { name: "搜索对话", exact: true });
  await search.getByRole("searchbox").fill("更新后的唯一标题");
  await expect(search.getByRole("list").getByRole("button")).toHaveCount(1);
  await search.getByRole("list").getByRole("button").click();
  await expect(page.locator("[data-message-row]")).toContainText("正文 1");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 1",
  );
  await page.getByRole("textbox", { name: "输入消息" }).fill("更新后的草稿");
  await expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "saved",
  );
  await page.reload();
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "更新后的草稿",
  );
  await page.keyboard.press("Control+k");
  await search.getByRole("searchbox").fill("更新后的草稿");
  await expect(search.getByRole("list").getByRole("button")).toHaveCount(1);
  await search.getByRole("searchbox").fill("草稿 1");
  await expect(search).toContainText("没有找到相关对话");
  await page.keyboard.press("Escape");
  await second.getByRole("button", { name: "更多操作", exact: true }).click();
  await page.getByRole("menuitem", { name: "删除", exact: true }).click();
  await page
    .getByRole("dialog", { name: "删除", exact: true })
    .getByRole("button", { name: "删除", exact: true })
    .click();
  await expect(second).toHaveCount(0);
  await page.keyboard.press("Control+k");
  await search.getByRole("searchbox").fill("更新后的");
  await expect(search).toContainText("没有找到相关对话");
});
