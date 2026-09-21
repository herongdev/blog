import { readFile } from "node:fs/promises";
import type { Page } from "@playwright/test";
import type { StoredConversation } from "../../src/features/chat/lib/persistedChat";
import { test, expect, send, waitForAnswer } from "./fixtures";
import { controlledChat } from "./controlled-chat";

async function saved(page: Page) {
  await expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "saved",
  );
}
async function records(page: Page): Promise<StoredConversation[]> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open("zhixu-chat");
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction(["conversations", "messages"], "readonly");
          const all = tx.objectStore("conversations").getAll();
          const messages = tx.objectStore("messages").getAll();
          tx.oncomplete = () => {
            db.close();
            resolve(
              all.result.map((record) =>
                record.normalized
                  ? {
                      ...record,
                      conversation: {
                        ...record.conversation,
                        messages: messages.result
                          .filter((row) => row.conversationId === record.id)
                          .sort((a, b) => a.position - b.position)
                          .map((row) => row.message),
                      },
                    }
                  : record,
              ),
            );
          };
          tx.onabort = () => {
            db.close();
            reject(tx.error);
          };
        };
      }),
  );
}

test("[HISTORY-RESTORE] 刷新恢复正文、活动、来源、模型与附件草稿，重新打开页面仍可阅读", async ({
  page,
  context,
}) => {
  const chat = await controlledChat(page);
  await send(page, "值得保存的长对话");
  await chat.waitForRequests(1);
  await chat.emit(
    0,
    { type: "reasoning", id: "r", delta: "核对第一份资料。" },
    {
      type: "references",
      items: [
        {
          id: "1_0",
          title: "可追溯资料",
          content: "来源内容",
          link: "https://example.com/source",
        },
      ],
    },
    { type: "text", delta: "## 已完成的答案\n\n这是原始正文 [[1_0]]。" },
    { type: "done" },
  );
  await waitForAnswer(page);
  const input = page.getByRole("textbox", { name: "输入消息" });
  await input.fill("还没发送的追问\n保留换行");
  await page.locator('input[type="file"]').setInputFiles({
    name: "draft.md",
    mimeType: "text/markdown",
    buffer: Buffer.from("附件草稿内容"),
  });
  await expect(page.getByRole("list", { name: "待发送附件" })).toContainText(
    "draft.md",
  );
  await saved(page);
  const stored = (await records(page)).find(
    (r) => r.conversation.title === "值得保存的长对话",
  )!;
  const original = stored.conversation;
  await page.reload();
  await expect(input).toHaveValue("还没发送的追问\n保留换行");
  await expect(page.getByRole("list", { name: "待发送附件" })).toContainText(
    "draft.md",
  );
  await expect(page.locator("[data-markdown]")).toContainText("这是原始正文");
  await expect(page.getByRole("combobox", { name: "选择模型" })).toContainText(
    "test-a",
  );
  expect(
    (await records(page)).find((r) => r.id === stored.id)!.conversation,
  ).toEqual(original);
  expect(await page.evaluate(() => window.__chatRuns.length)).toBe(0);
  await page.getByRole("button", { name: "1 个来源", exact: true }).click();
  await expect(page.getByRole("link", { name: /可追溯资料/ })).toBeVisible();
  await page.screenshot({
    path: "output/playwright/history-restored.png",
    animations: "disabled",
  });
  const reopened = await context.newPage();
  await reopened.goto(page.url());
  await expect(reopened.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "还没发送的追问\n保留换行",
  );
  await expect(reopened.locator("[data-markdown]")).toContainText(
    "这是原始正文",
  );
  await reopened.close();
});

test("[HISTORY-INTERRUPT] 生成中立即刷新保留已接收内容，恢复后不自动发送，支持重新生成", async ({
  page,
}) => {
  const chat = await controlledChat(page);
  await send(page, "中断恢复");
  await chat.waitForRequests(1);
  await chat.emit(
    0,
    { type: "reasoning", id: "r", delta: "仍在分析" },
    { type: "text", delta: "刷新前最后收到的正文" },
  );
  await page.reload();
  await expect(page.locator("[data-markdown]")).toContainText(
    "刷新前最后收到的正文",
  );
  await expect(
    page.getByText("页面离开时生成中断，已保留收到的内容，可重新生成。", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "停止生成" })).toHaveCount(0);
  expect(await page.evaluate(() => window.__chatRuns.length)).toBe(0);
  await page
    .getByRole("textbox", { name: "输入消息" })
    .fill("不要误发这份草稿");
  await page.getByRole("button", { name: "重新生成" }).click();
  await chat.waitForRequests(1);
  expect((await chat.requests())[0].body.messages).toEqual([
    { role: "user", content: "中断恢复" },
  ]);
  await chat.emit(0, { type: "text", delta: "重试完成" }, { type: "done" });
  await waitForAnswer(page);
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "不要误发这份草稿",
  );
});

test("[HISTORY-QUOTA] 保存失败保留内存和原记录，可导出和重试，立即刷新恢复最新草稿", async ({
  page,
}) => {
  await page.goto("/");
  const input = page.getByRole("textbox", { name: "输入消息" });
  await input.fill("已保存的版本");
  await saved(page);
  await page.evaluate(() => {
    const original = IDBObjectStore.prototype.put;
    Object.assign(window, {
      restoreHistoryWrites: () => {
        IDBObjectStore.prototype.put = original;
      },
    });
    IDBObjectStore.prototype.put = function (...args) {
      if (this.name === "conversations")
        throw new DOMException("Full", "QuotaExceededError");
      return original.apply(this, args);
    };
  });
  await input.fill("空间满了也不能丢掉这句话");
  await expect(page.getByRole("alert")).toContainText("聊天记录未能保存");
  expect((await records(page))[0].conversation.draft).toBe("已保存的版本");
  const downloading = page.waitForEvent("download");
  await page
    .locator("[data-conversation-id]")
    .getByRole("button", { name: "更多操作", exact: true })
    .click();
  await page.getByRole("menuitem", { name: "导出记录", exact: true }).click();
  const download = await downloading;
  const backup = JSON.parse(await readFile((await download.path())!, "utf8"));
  expect(backup.conversations[0].draft).toBe("空间满了也不能丢掉这句话");
  await page.evaluate(() =>
    (
      window as unknown as { restoreHistoryWrites: () => void }
    ).restoreHistoryWrites(),
  );
  await page.getByRole("button", { name: "重试保存" }).click();
  await saved(page);
  await input.fill("立即刷新这一版");
  await page.reload();
  await expect(input).toHaveValue("立即刷新这一版");
  await saved(page);
  await page.setViewportSize({ width: 390, height: 700 });
  await page.screenshot({
    path: "output/playwright/history-mobile.png",
    animations: "disabled",
  });
});

test("[HISTORY-CORRUPT] 单条损坏或未来版本不会清空正常记录或覆盖原始数据", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("textbox", { name: "输入消息" }).fill("正常历史仍在");
  await saved(page);
  await page.evaluate(
    () =>
      new Promise<void>((resolve, reject) => {
        const open = indexedDB.open("zhixu-chat");
        open.onsuccess = () => {
          const db = open.result;
          const tx = db.transaction("conversations", "readwrite");
          tx.objectStore("conversations").put({
            id: "future",
            version: 99,
            original: "不能覆盖",
          });
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
          tx.onabort = () => reject(tx.error);
        };
      }),
  );
  await page.reload();
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "正常历史仍在",
  );
  await expect(page.getByRole("alert")).toContainText("部分历史记录无法读取");
  await page
    .getByRole("textbox", { name: "输入消息" })
    .fill("仍可继续编辑正常历史");
  await saved(page);
  expect((await records(page)).find((r) => r.id === "future")).toEqual({
    id: "future",
    version: 99,
    original: "不能覆盖",
  });
});

test("[HISTORY-DENIED] 浏览器禁止 IndexedDB 时仍可聊天和导出，不伪报已保存", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, "indexedDB", {
      get() {
        throw new DOMException("Denied", "SecurityError");
      },
    }),
  );
  await page.goto("/");
  await expect(page.getByRole("alert")).toContainText("聊天记录未能保存");
  await page.getByRole("textbox", { name: "输入消息" }).fill("仍可输入并导出");
  await expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "error",
  );
  await page
    .locator("[data-conversation-id]")
    .getByRole("button", { name: "更多操作", exact: true })
    .click();
  await expect(
    page.getByRole("menuitem", { name: "导出记录", exact: true }),
  ).toBeEnabled();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "重试保存" }).click();
  await expect(page.getByRole("alert")).toContainText("聊天记录未能保存");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "仍可输入并导出",
  );
});

test("[HISTORY-TABS] 标签页独立新增不会互相清空，同一会话冲突不静默覆盖", async ({
  page,
  context,
}) => {
  await page.goto("/");
  const input = page.getByRole("textbox", { name: "输入消息" });
  await input.fill("共有的起点");
  await saved(page);
  const other = await context.newPage();
  await other.goto(page.url());
  const otherInput = other.getByRole("textbox", { name: "输入消息" });
  await expect(otherInput).toHaveValue("共有的起点");
  await input.fill("主标签页的新内容");
  await saved(page);
  await otherInput.fill("第二标签页不应覆盖主标签页");
  await expect(other.getByRole("alert")).toContainText(
    "另一标签页更新了此会话",
  );
  expect((await records(page))[0].conversation.draft).toBe("主标签页的新内容");
  await other.reload();
  await expect(otherInput).toHaveValue("第二标签页不应覆盖主标签页");
  await saved(other);
  expect((await records(page)).map((r) => r.conversation.draft)).toEqual(
    expect.arrayContaining(["主标签页的新内容", "第二标签页不应覆盖主标签页"]),
  );
  await page.getByRole("button", { name: "新聊天" }).click();
  await input.fill("独立新会话");
  await saved(page);
  expect(await records(page)).toHaveLength(3);
  await other.close();
});
