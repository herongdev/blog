import { test, expect, send } from "./fixtures";
import { controlledChat } from "./controlled-chat";
import { seedLegacy } from "./history-fixtures";

test("[LARGE-MARKDOWN] 大表格分页和长代码保持完整复制内容", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const chat = await controlledChat(page);
  await send(page, "大表格与长代码");
  await chat.waitForRequests(1);
  const code = "console.log('保留完整内容');\n".repeat(1200);
  const table =
    "|编号|内容|\n|---|---|\n" +
    Array.from({ length: 125 }, (_, i) => `|${i + 1}|记录${i + 1}|`).join("\n");
  await chat.emit(
    0,
    { type: "text", delta: `${table}\n\n\`\`\`js\n${code}\`\`\`\n` },
    { type: "done" },
  );
  const pagination = page.getByRole("navigation", { name: "表格分页" });
  await expect(pagination).toContainText("第 1 / 3 页");
  await expect(page.locator("tbody tr")).toHaveCount(50);
  await pagination.getByRole("button", { name: "下一页" }).click();
  await pagination.getByRole("button", { name: "下一页" }).click();
  await expect(page.locator("tbody tr")).toHaveCount(25);
  await expect(page.locator("tbody")).toContainText("记录125");
  await expect(
    pagination.getByRole("button", { name: "下一页" }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "复制代码", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe(code);
});

test("[CONTEXT-BUDGET] 超过一百条历史仍能发送，数据库保留完整消息", async ({
  page,
}) => {
  const chat = await controlledChat(page, undefined, false);
  await seedLegacy(page, 1, 160, false, false, "deepseek");
  await send(page, "只带近期上下文");
  await chat.waitForRequests(1);
  const [request] = await chat.requests();
  expect(request.body.messages.length).toBeLessThanOrEqual(80);
  expect(request.body.messages.at(-1)?.content).toBe("只带近期上下文");
  await chat.emit(0, { type: "text", delta: "新的回答" }, { type: "done" });
  await expect(
    page.getByText("本次使用近期对话作为上下文，完整记录仍保留。"),
  ).toBeVisible();
  await expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "saved",
  );
  const counts = await page.evaluate(
    () =>
      new Promise<number>((resolve, reject) => {
        const request = indexedDB.open("zhixu-chat");
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const count = db
            .transaction("messages")
            .objectStore("messages")
            .count();
          count.onsuccess = () => {
            resolve(count.result);
            db.close();
          };
        };
      }),
  );
  expect(counts).toBe(162);
});

test("[ASSET-STORAGE] 图片分表保存，修改草稿不重写历史，删除释放附件", async ({
  page,
}) => {
  await seedLegacy(page, 1, 100, false, true);
  await page.reload();
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 0",
  );
  await page.evaluate(() => {
    const writes: Record<string, number> = {};
    Object.assign(window, { __scaleWrites: writes });
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (...args) {
      writes[this.name] = (writes[this.name] ?? 0) + 1;
      return put.apply(this, args);
    };
  });
  await page.getByRole("textbox", { name: "输入消息" }).fill("新的草稿");
  await expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "saved",
  );
  const result = await page.evaluate(async () => {
    const writes = (
      window as unknown as { __scaleWrites: Record<string, number> }
    ).__scaleWrites;
    return new Promise<{
      writes: typeof writes;
      assets: number;
      inline: number;
    }>((resolve, reject) => {
      const request = indexedDB.open("zhixu-chat");
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(["assets", "messages"]);
        const assets = tx.objectStore("assets").count();
        const messages = tx.objectStore("messages").getAll();
        tx.oncomplete = () => {
          resolve({
            writes,
            assets: assets.result,
            inline: messages.result.filter((row) =>
              row.message.images?.some(
                (image: { dataUrl: string }) => image.dataUrl,
              ),
            ).length,
          });
          db.close();
        };
      };
    });
  });
  expect(result.assets).toBe(100);
  expect(result.inline).toBe(0);
  expect(result.writes.messages ?? 0).toBe(0);
  expect(result.writes.assets ?? 0).toBe(0);
  expect(result.writes.search).toBe(1);
  await page
    .locator('[data-conversation-id="chat-0000"]')
    .getByRole("button", { name: "更多操作", exact: true })
    .click();
  await page.getByRole("menuitem", { name: "删除", exact: true }).click();
  await page
    .getByRole("dialog", { name: "删除", exact: true })
    .getByRole("button", { name: "删除", exact: true })
    .click();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          new Promise<number>((resolve) => {
            const request = indexedDB.open("zhixu-chat");
            request.onsuccess = () => {
              const db = request.result;
              const count = db
                .transaction("assets")
                .objectStore("assets")
                .count();
              count.onsuccess = () => {
                resolve(count.result);
                db.close();
              };
            };
          }),
      ),
    )
    .toBe(0);
});
