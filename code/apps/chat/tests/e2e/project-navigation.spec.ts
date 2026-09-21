import { test, expect } from "./fixtures";
import { seedLegacy } from "./history-fixtures";

test("[PROJECT-OPEN] 项目内历史读取完成前保留当前对话与草稿", async ({
  page,
}) => {
  await seedLegacy(page, 100, 1, true);
  await page.evaluate(() => {
    const original = IDBDatabase.prototype.transaction;
    const descriptor = Object.getOwnPropertyDescriptor(
      IDBTransaction.prototype,
      "oncomplete",
    )!;
    IDBDatabase.prototype.transaction = function (...args) {
      const tx = original.apply(this, args);
      if (
        tx.mode === "readonly" &&
        tx.objectStoreNames.contains("messages") &&
        tx.objectStoreNames.contains("conversations")
      ) {
        IDBDatabase.prototype.transaction = original;
        Object.defineProperty(tx, "oncomplete", {
          set(callback: (event: Event) => void) {
            descriptor.set!.call(tx, (event: Event) => {
              (
                window as Window & { completeProjectOpen?: () => void }
              ).completeProjectOpen = () => callback.call(tx, event);
            });
          },
        });
      }
      return tx;
    };
  });
  await page
    .locator('[data-project-id="project"]')
    .getByRole("button", { name: "历史问题 0001", exact: true })
    .click();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          typeof (window as Window & { completeProjectOpen?: () => void })
            .completeProjectOpen,
      ),
    )
    .toBe("function");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 0",
  );
  await expect(page.locator("[data-message-row]")).toContainText("正文 0");
  await page.evaluate(() =>
    (
      window as Window & { completeProjectOpen?: () => void }
    ).completeProjectOpen?.(),
  );
  await expect(page.locator("[data-message-row]")).toContainText("正文 1");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 1",
  );
});
