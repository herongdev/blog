import type { Page } from "@playwright/test";
import { expect } from "./fixtures";

/** Exercise the real legacy-to-indexed migration, without application imports in the page. */
export async function seedLegacy(
  page: Page,
  count: number,
  messages = 1,
  inProject = false,
  imageMessages = false,
  provider = "local",
  waitForReady = true,
) {
  await page.route("**/seed-history", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<!doctype html><title>Seed</title>",
    }),
  );
  await page.goto("/seed-history");
  const seedStart = Date.now();
  await page.evaluate(
    async ({ count, messages, inProject, imageMessages, provider }) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 64;
      const painter = canvas.getContext("2d")!;
      const pixels = painter.createImageData(64, 64);
      let seed = 17;
      for (let i = 0; i < pixels.data.length; i++) {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        pixels.data[i] = i % 4 === 3 ? 255 : seed >>> 24;
      }
      painter.putImageData(pixels, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      await new Promise<void>((resolve, reject) => {
        const request = indexedDB.open("zhixu-chat", 1);
        request.onupgradeneeded = () => {
          request.result.createObjectStore("conversations", { keyPath: "id" });
          request.result.createObjectStore("meta");
        };
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction(["conversations", "meta"], "readwrite");
          for (let i = 0; i < count; i++) {
            const id = `chat-${String(i).padStart(4, "0")}`;
            tx.objectStore("conversations").put({
              version: 1,
              id,
              revision: `revision-${i}`,
              updatedAt: count - i,
              conversation: {
                id,
                title: `历史问题 ${String(i).padStart(4, "0")}`,
                projectId: inProject ? "project" : undefined,
                provider,
                model: provider === "local" ? "fixture" : "test-a",
                draft: `草稿 ${i}`,
                messages: Array.from({ length: messages }, (_, j) => ({
                  id: `${id}-${j}`,
                  role: "user",
                  content: `第 ${j} 条消息，共同检索词，正文 ${i}。${"这是一段保留的数据。".repeat(20)}`,
                  status: "complete",
                  activities: [],
                  references: {},
                  createdAt: j,
                  ...(imageMessages
                    ? {
                        images: [
                          {
                            id: `image-${j}`,
                            kind: "image",
                            name: `image-${j}.png`,
                            dataUrl,
                            width: 64,
                            height: 64,
                          },
                        ],
                      }
                    : {}),
                })),
              },
            });
          }
          tx.objectStore("meta").put("chat-0000", "activeId");
          if (inProject)
            tx.objectStore("meta").put(
              {
                version: 1,
                kind: "project",
                project: { id: "project", name: "大型项目", createdAt: 1 },
              },
              "project:project",
            );
          tx.oncomplete = () => {
            db.close();
            resolve();
          };
          tx.onabort = () => reject(tx.error);
        };
      });
    },
    { count, messages, inProject, imageMessages, provider },
  );
  const seedMs = Date.now() - seedStart;
  await page.addInitScript(() => {
    const counters = { fullGetAll: 0, fullGet: 0 };
    Object.assign(window, { __historyReads: counters });
    const getAll = IDBObjectStore.prototype.getAll;
    const get = IDBObjectStore.prototype.get;
    IDBObjectStore.prototype.getAll = function (...args) {
      if (this.name === "conversations") counters.fullGetAll++;
      return getAll.apply(this, args);
    };
    IDBObjectStore.prototype.get = function (...args) {
      if (this.name === "conversations") counters.fullGet++;
      return get.apply(this, args);
    };
  });
  const loadStart = Date.now();
  await page.goto("/");
  if (waitForReady)
    await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
      "草稿 0",
      { timeout: process.env.PERF_RUN ? 120_000 : 10_000 },
    );
  return { seedMs, loadMs: Date.now() - loadStart };
}
