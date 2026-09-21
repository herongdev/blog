import { test, expect, readingArea, expectAtBottom } from "./fixtures";
import { seedLegacy } from "./history-fixtures";

test("[MIGRATION-RESUME] 迁移进度按批提交，关闭后从断点恢复", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (...args) {
      const request = put.apply(this, args);
      if (
        this.name === "meta" &&
        args[1] === "migration" &&
        args[0]?.done >= 200 &&
        !sessionStorage.getItem("interrupted")
      ) {
        this.transaction.addEventListener("complete", () => {
          sessionStorage.setItem("interrupted", "yes");
          location.assign("/seed-history");
        });
      }
      return request;
    };
  });
  await seedLegacy(page, 600, 1, false, false, "local", false);
  await expect(page).toHaveURL(/seed-history$/);
  const checkpoint = await page.evaluate(
    () =>
      new Promise<{ done: number }>((resolve) => {
        const request = indexedDB.open("zhixu-chat");
        request.onsuccess = () => {
          const db = request.result;
          const value = db
            .transaction("meta")
            .objectStore("meta")
            .get("migration");
          value.onsuccess = () => {
            resolve(value.result);
            db.close();
          };
        };
      }),
  );
  expect(checkpoint.done).toBeGreaterThanOrEqual(200);
  expect(checkpoint.done).toBeLessThan(600);
  await page.goto("/");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 0",
  );
  await page.reload();
  await expect(page.locator("[data-message-row]")).toContainText("正文 0");
  const final = await page.evaluate(
    () =>
      new Promise<{ count: number; pending: unknown }>((resolve) => {
        const request = indexedDB.open("zhixu-chat");
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction(["messages", "meta"]);
          const count = tx.objectStore("messages").count();
          const pending = tx.objectStore("meta").get("migration");
          tx.oncomplete = () => {
            resolve({ count: count.result, pending: pending.result });
            db.close();
          };
        };
      }),
  );
  expect(final).toEqual({ count: 600, pending: undefined });
});

test("[MESSAGE-VIEW] 虚拟卸载后保留活动展开和表格页码", async ({ page }) => {
  await seedLegacy(page, 1, 100);
  await page.goto("/seed-history");
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        const request = indexedDB.open("zhixu-chat");
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction("messages", "readwrite");
          const store = tx.objectStore("messages");
          const row = store.get("chat-0000:chat-0000-0");
          row.onsuccess = () =>
            store.put({
              ...row.result,
              message: {
                ...row.result.message,
                role: "assistant",
                content:
                  "|编号|内容|\n|---|---|\n" +
                  Array.from({ length: 60 }, (_, i) => `|${i}|记录${i}|`).join(
                    "\n",
                  ),
                activities: [
                  {
                    id: "a",
                    kind: "reasoning",
                    title: "活动",
                    status: "complete",
                    content: "保留的活动内容",
                  },
                ],
              },
            });
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
        };
      }),
  );
  await page.goto("/");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 0",
  );
  await expect(page.locator('[data-message-row="chat-0000-99"]')).toBeVisible();
  await expectAtBottom(page);
  const area = readingArea(page);
  await area.hover();
  await page.mouse.wheel(0, -100000);
  const first = page.locator('[data-message-row="chat-0000-0"]');
  await expect(first).toBeVisible();
  await first.locator("[data-activity-toggle]").click();
  await first.getByRole("button", { name: "下一页", exact: true }).click();
  await expect(first).toContainText("第 2 / 2 页");
  await page.getByRole("button", { name: "回到最新", exact: true }).click();
  await expectAtBottom(page);
  await expect(first).toHaveCount(0);
  await area.hover();
  await page.mouse.wheel(0, -100000);
  await expect(first.locator("[data-activity-toggle]")).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(first).toContainText("第 2 / 2 页");
});

test("[MIGRATION-V4] 已分表的旧版本升级不清空消息与搜索索引", async ({
  page,
}) => {
  await seedLegacy(page, 1, 2, false, true);
  await page.goto("/seed-history");
  await page.evaluate(async () => {
    const entries = await new Promise<
      Record<string, Array<[IDBValidKey, unknown]>>
    >((resolve) => {
      const request = indexedDB.open("zhixu-chat");
      request.onsuccess = () => {
        const db = request.result;
        const names = Array.from(db.objectStoreNames);
        const tx = db.transaction(names);
        const reads = names.map((name) => ({
          name,
          keys: tx.objectStore(name).getAllKeys(),
          values: tx.objectStore(name).getAll(),
        }));
        tx.oncomplete = () => {
          resolve(
            Object.fromEntries(
              reads.map(({ name, keys, values }) => [
                name,
                values.result.map((value, i) => [keys.result[i], value]),
              ]),
            ),
          );
          db.close();
        };
      };
    });
    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase("zhixu-chat");
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
    await new Promise<void>((resolve, reject) => {
      const request = indexedDB.open("zhixu-chat", 4);
      request.onupgradeneeded = () => {
        for (const [name, values] of Object.entries(entries)) {
          const store =
            name === "meta"
              ? request.result.createObjectStore(name)
              : request.result.createObjectStore(name, {
                  keyPath: name === "messages" ? "key" : "id",
                });
          for (const [key, value] of values) {
            if (name === "meta") store.put(value, key);
            else store.put(value);
          }
        }
      };
      request.onsuccess = () => {
        request.result.close();
        resolve();
      };
      request.onerror = () => reject(request.error);
    });
  });
  await page.goto("/");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 0",
  );
  await expect(page.locator("[data-message-row]")).toHaveCount(2);
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog", { name: "搜索对话", exact: true });
  await dialog.getByRole("searchbox").fill("共同检索词");
  await expect(dialog.getByRole("list").getByRole("button")).toHaveCount(1);
});
