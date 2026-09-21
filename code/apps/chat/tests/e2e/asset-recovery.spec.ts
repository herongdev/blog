import { readFile } from "node:fs/promises";
import { test, expect } from "./fixtures";
import { seedLegacy } from "./history-fixtures";

test("[ASSET-RECOVERY] 冲突恢复副本独立拥有图片，删除原会话后仍可导出", async ({
  page,
}) => {
  await seedLegacy(page, 1, 2, false, true);
  const journal = await page.evaluate(
    () =>
      new Promise<string>((resolve, reject) => {
        const request = indexedDB.open("zhixu-chat");
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction(["conversations", "messages"]);
          const record = tx.objectStore("conversations").get("chat-0000");
          const messages = tx.objectStore("messages").getAll();
          tx.oncomplete = () => {
            const value = record.result;
            const rows = messages.result
              .sort((a, b) => a.position - b.position)
              .map((row) => row.message);
            resolve(
              JSON.stringify({
                version: 2,
                activeId: value.id,
                projects: [],
                projectBases: {},
                records: [
                  {
                    record: {
                      ...value,
                      revision: "recovery-revision",
                      conversation: {
                        ...value.conversation,
                        draft: "恢复副本草稿",
                        messages: rows,
                      },
                    },
                    baseRevisions: ["stale-revision"],
                    messageOrder: rows.map((row) => row.id),
                  },
                ],
              }),
            );
            db.close();
          };
        };
      }),
  );
  await page.goto("/seed-history");
  await page.evaluate(
    (value) => sessionStorage.setItem("zhixu.chat.pending.v1", value),
    journal,
  );
  await page.goto("/");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "恢复副本草稿",
  );
  await expect(page.locator("[data-conversation-id]")).toHaveCount(2);
  await expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "saved",
  );
  await page
    .locator('[data-conversation-id="chat-0000"]')
    .getByRole("button", { name: "更多操作", exact: true })
    .click();
  await page.getByRole("menuitem", { name: "删除", exact: true }).click();
  await page
    .getByRole("dialog", { name: "删除", exact: true })
    .getByRole("button", { name: "删除", exact: true })
    .click();
  await expect(page.locator("[data-history-status]")).toHaveAttribute(
    "data-history-status",
    "saved",
  );
  await page.reload();
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "恢复副本草稿",
  );
  await page
    .locator("[data-conversation-id]")
    .getByRole("button", { name: "更多操作", exact: true })
    .click();
  const downloading = page.waitForEvent("download");
  await page.getByRole("menuitem", { name: "导出记录", exact: true }).click();
  const download = await downloading;
  const data = JSON.parse(await readFile((await download.path())!, "utf8"));
  expect(data.conversations[0].messages).toHaveLength(2);
  for (const message of data.conversations[0].messages) {
    expect(message.images[0].dataUrl).toMatch(/^data:image\/png;base64,/);
    expect(message.images[0].assetId).toBeUndefined();
  }
});
