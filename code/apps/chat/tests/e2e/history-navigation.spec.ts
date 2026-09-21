import { test, expect, readingArea, expectAtBottom } from "./fixtures";
import { seedLegacy } from "./history-fixtures";
import type { Page } from "@playwright/test";

declare global {
  interface Window {
    releaseHistoryRead?: () => void;
    restoreHistoryReads?: () => void;
  }
}
async function delayedRead(page: Page) {
  await page.evaluate(() => {
    delete window.releaseHistoryRead;
    const original = IDBDatabase.prototype.transaction;
    let intercepted = false;
    const descriptor = Object.getOwnPropertyDescriptor(
      IDBTransaction.prototype,
      "oncomplete",
    )!;
    IDBDatabase.prototype.transaction = function (...args) {
      const tx = original.apply(this, args);
      if (
        !intercepted &&
        tx.mode === "readonly" &&
        tx.objectStoreNames.contains("messages") &&
        tx.objectStoreNames.contains("conversations")
      ) {
        intercepted = true;
        Object.defineProperty(tx, "oncomplete", {
          configurable: true,
          set(callback: (event: Event) => void) {
            descriptor.set!.call(tx, (event: Event) => {
              window.releaseHistoryRead = () => {
                IDBDatabase.prototype.transaction = original;
                callback.call(tx, event);
              };
            });
          },
        });
      }
      return tx;
    };
  });
}
async function openOldResult(page: Page) {
  await page.getByRole("button", { name: "搜索对话", exact: true }).click();
  const search = page.getByRole("dialog", { name: "搜索对话", exact: true });
  await search.getByRole("searchbox").fill("历史问题 0099");
  const result = search.getByRole("list").getByRole("button");
  await expect(result).toHaveCount(1);
  await result.click();
}

for (const destination of [
  "new",
  "current",
  "other",
  "project",
  "cancel",
] as const) {
  test(`[HISTORY-NAV] 迟到读取不能覆盖后续意图：${destination}`, async ({
    page,
  }) => {
    await seedLegacy(page, 100);
    if (destination === "project") {
      await page.getByRole("button", { name: "新建项目", exact: true }).click();
      const dialog = page.getByRole("dialog", {
        name: "新建项目",
        exact: true,
      });
      await dialog.getByRole("textbox").fill("导航测试项目");
      await dialog
        .getByRole("button", { name: "新建项目", exact: true })
        .click();
    }
    await delayedRead(page);
    await openOldResult(page);
    await expect
      .poll(() => page.evaluate(() => typeof window.releaseHistoryRead))
      .toBe("function");
    await expect(page.getByRole("status")).toContainText("正在打开对话");
    let expected = "草稿 0";
    if (destination === "new") {
      await page.getByRole("button", { name: "新聊天", exact: true }).click();
      expected = "新会话草稿不被覆盖";
      await page.getByRole("textbox", { name: "输入消息" }).fill(expected);
    } else if (destination === "project") {
      await page
        .getByRole("button", { name: "在此项目中新建对话", exact: true })
        .click();
      expected = "项目草稿不被覆盖";
      await page.getByRole("textbox", { name: "输入消息" }).fill(expected);
    } else if (destination === "cancel") {
      await page.getByRole("button", { name: "取消打开", exact: true }).click();
    } else {
      // Opening the current conversation must also invalidate an older pending navigation.
      await page.getByRole("button", { name: "搜索对话", exact: true }).click();
      const dialog = page.getByRole("dialog", {
        name: "搜索对话",
        exact: true,
      });
      await dialog
        .getByRole("searchbox")
        .fill(destination === "current" ? "历史问题 0000" : "历史问题 0001");
      await expect(dialog.getByRole("list").getByRole("button")).toHaveCount(1);
      await dialog.getByRole("list").getByRole("button").click();
      expected = destination === "current" ? "草稿 0" : "草稿 1";
    }
    await page.evaluate(() => window.releaseHistoryRead?.());
    await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
      expected,
    );
    await expect(
      page.getByRole("button", { name: "取消打开", exact: true }),
    ).toHaveCount(0);
  });
}

test("[HISTORY-OPEN-ERROR] 搜索正文读取失败可重试，旧对话和草稿保持可用", async ({
  page,
}) => {
  await seedLegacy(page, 100);
  await page.evaluate(() => {
    const original = IDBDatabase.prototype.transaction;
    window.restoreHistoryReads = () => {
      IDBDatabase.prototype.transaction = original;
    };
    IDBDatabase.prototype.transaction = function (...args) {
      const names = Array.isArray(args[0]) ? args[0] : [args[0]];
      if (
        names.includes("messages") &&
        names.includes("conversations") &&
        args[1] === "readonly"
      ) {
        throw new DOMException("Simulated read failure", "UnknownError");
      }
      return original.apply(this, args);
    };
  });
  await openOldResult(page);
  await expect(page.getByRole("alert")).toContainText("未能打开所选对话");
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 0",
  );
  await page.evaluate(() => window.restoreHistoryReads?.());
  await page.getByRole("button", { name: "重新读取", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 99",
  );
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test("[HISTORY-NO-FLASH] 快速读取不挂载提示，新消息在首次绘制前定位，取消后无迟到提示", async ({
  page,
}) => {
  await seedLegacy(page, 3, 10);
  await page.getByRole("button", { name: "新聊天", exact: true }).click();
  await page.clock.install();
  await page.clock.pauseAt(await page.evaluate(() => Date.now() + 50));
  await delayedRead(page);
  await page.evaluate(() => {
    const observations: { opening: boolean; gap?: number }[] = [];
    Object.assign(window, { navigationObservations: observations });
    const observer = new MutationObserver(() => {
      const view = document.querySelector<HTMLElement>(
        "[data-message-viewport]",
      )!;
      observations.push({
        opening: document.body.textContent!.includes("正在打开对话"),
        ...(view.querySelector('[data-message-row="chat-0001-0"]')
          ? { gap: view.scrollHeight - view.clientHeight - view.scrollTop }
          : {}),
      });
    });
    observer.observe(document.querySelector("main")!, {
      childList: true,
      subtree: true,
    });
    Object.assign(window, {
      stopNavigationObservations: () => observer.disconnect(),
    });
  });
  await page
    .getByRole("button", { name: "历史问题 0001", exact: true })
    .click();
  await expect
    .poll(() => page.evaluate(() => typeof window.releaseHistoryRead))
    .toBe("function");
  await expect(page.getByText("正在打开对话…", { exact: true })).toBeHidden();
  await page.evaluate(() => window.releaseHistoryRead?.());
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "草稿 1",
  );
  const observations = await page.evaluate(() => {
    const state = window as unknown as {
      navigationObservations: { opening: boolean; gap?: number }[];
      stopNavigationObservations: () => void;
    };
    state.stopNavigationObservations();
    return state.navigationObservations;
  });
  expect(observations.length).toBeGreaterThan(0);
  expect(observations.every((entry) => !entry.opening)).toBe(true);
  const first = observations.find((entry) => entry.gap !== undefined);
  expect(first).toBeDefined();
  expect(first!.gap).toBeLessThan(5);
  await page.clock.runFor(250);
  await expect(page.getByText("正在打开对话…", { exact: true })).toBeHidden();
  await delayedRead(page);
  await page
    .getByRole("button", { name: "历史问题 0000", exact: true })
    .click();
  await expect
    .poll(() => page.evaluate(() => typeof window.releaseHistoryRead))
    .toBe("function");
  await page.getByRole("button", { name: "新聊天", exact: true }).click();
  await page.clock.runFor(250);
  await page.evaluate(() => window.releaseHistoryRead?.());
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue("");
  await expect(page.getByText("正在打开对话…", { exact: true })).toBeHidden();
});

test("[HISTORY-WAIT-LAYOUT] 慢读取提示不改变消息区和输入区的位置，取消保留阅读位置", async ({
  page,
}) => {
  await seedLegacy(page, 3, 10);
  await expectAtBottom(page);
  const viewport = readingArea(page);
  await viewport.evaluate((element) => {
    element.scrollTop = 80;
  });
  await expect(
    page.getByRole("button", { name: "回到最新", exact: true }),
  ).toBeVisible();
  const before = await viewport.boundingBox();
  const input = page.getByRole("textbox", { name: "输入消息" });
  const inputBefore = await input.boundingBox();
  const scrollBefore = await viewport.evaluate((element) => element.scrollTop);
  await delayedRead(page);
  await page
    .getByRole("button", { name: "历史问题 0001", exact: true })
    .click();
  await expect(page.getByText("正在打开对话…", { exact: true })).toBeVisible();
  expect(await viewport.boundingBox()).toEqual(before);
  expect(await input.boundingBox()).toEqual(inputBefore);
  expect(await viewport.evaluate((element) => element.scrollTop)).toBe(
    scrollBefore,
  );
  await expect(input).toHaveValue("草稿 0");
  await page.getByRole("button", { name: "取消打开", exact: true }).click();
  await page.evaluate(() => window.releaseHistoryRead?.());
  await expect(page.getByText("正在打开对话…", { exact: true })).toBeHidden();
  expect(await viewport.boundingBox()).toEqual(before);
  expect(await viewport.evaluate((element) => element.scrollTop)).toBe(
    scrollBefore,
  );
});
