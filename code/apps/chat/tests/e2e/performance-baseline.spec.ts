import { mkdir, writeFile } from "node:fs/promises";
import { test, expect } from "./fixtures";
import { seedLegacy } from "./history-fixtures";

for (const scenario of [
  { name: "many-chats", chats: 10000, messages: 1 },
  { name: "long-chat", chats: 1, messages: 2000 },
  { name: "image-history", chats: 1, messages: 200 },
]) {
  test(`[PERF] ${scenario.name}`, async ({ page, browserName, context }) => {
    test.skip(!process.env.PERF_RUN, "Opt-in measurement, not a timing gate");
    test.setTimeout(180_000);
    await page.addInitScript(() => {
      const metrics = {
        writes: {} as Record<string, number>,
        serializedChars: {} as Record<string, number>,
        blobBytes: 0,
        longTasks: [] as number[],
        upgradeMs: 0,
      };
      Object.assign(window, { __perf: metrics });
      const open = IDBFactory.prototype.open;
      IDBFactory.prototype.open = function (...args) {
        const request = open.apply(this, args);
        request.addEventListener("upgradeneeded", () => {
          const started = performance.now();
          request.transaction?.addEventListener("complete", () => {
            metrics.upgradeMs = performance.now() - started;
          });
        });
        return request;
      };
      const put = IDBObjectStore.prototype.put;
      IDBObjectStore.prototype.put = function (...args) {
        metrics.writes[this.name] = (metrics.writes[this.name] ?? 0) + 1;
        metrics.serializedChars[this.name] =
          (metrics.serializedChars[this.name] ?? 0) +
          JSON.stringify(args[0]).length;
        if (args[0]?.blob instanceof Blob)
          metrics.blobBytes += args[0].blob.size;
        return put.apply(this, args);
      };
      new PerformanceObserver((list) => {
        metrics.longTasks.push(
          ...list.getEntries().map((entry) => entry.duration),
        );
      }).observe({ type: "longtask", buffered: true });
    });
    const profiler = process.env.PERF_PROFILE
      ? await context.newCDPSession(page)
      : undefined;
    await profiler?.send("Profiler.enable");
    await profiler?.send("Profiler.start");
    const migrationStart = Date.now();
    const migrationPhases = await seedLegacy(
      page,
      scenario.chats,
      scenario.messages,
      false,
      scenario.name === "image-history",
    );
    const migrationMs = Date.now() - migrationStart;
    const profile = await profiler?.send("Profiler.stop");
    const cpu = profile?.profile.nodes
      .filter((node) => node.hitCount)
      .sort((a, b) => (b.hitCount ?? 0) - (a.hitCount ?? 0))
      .slice(0, 12)
      .map((node) => ({
        name: node.callFrame.functionName,
        hits: node.hitCount,
      }));
    const upgradeMs = await page.evaluate(
      () =>
        (window as unknown as { __perf: { upgradeMs: number } }).__perf
          .upgradeMs,
    );
    const start = Date.now();
    await page.reload();
    await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
      "草稿 0",
    );
    const restoreMs = Date.now() - start;
    const cdp = await context.newCDPSession(page);
    await cdp.send("HeapProfiler.collectGarbage");
    const restoredHeap = await cdp.send("Runtime.getHeapUsage");
    const searchStart = Date.now();
    await page.keyboard.press("Control+k");
    const dialog = page.getByRole("dialog", { name: "搜索对话", exact: true });
    await dialog.getByRole("searchbox").fill("共同检索词");
    await expect(dialog.getByRole("list")).toHaveAttribute(
      "aria-busy",
      "false",
    );
    await expect(dialog.getByRole("list").getByRole("button")).toHaveCount(
      Math.min(50, scenario.chats),
    );
    const searchMs = Date.now() - searchStart;
    await page.keyboard.press("Escape");
    await cdp.send("HeapProfiler.collectGarbage");
    const searchedHeap = await cdp.send("Runtime.getHeapUsage");
    const saveStart = Date.now();
    await page
      .getByRole("textbox", { name: "输入消息" })
      .fill("测量一次草稿修改");
    await expect(page.locator("[data-history-status]")).toHaveAttribute(
      "data-history-status",
      "saved",
    );
    const saveMs = Date.now() - saveStart;
    const sample = await page.evaluate(() => ({
      ...(window as unknown as { __perf: object }).__perf,
      heapBytes: (
        performance as Performance & { memory?: { usedJSHeapSize: number } }
      ).memory?.usedJSHeapSize,
      messageNodes: document.querySelectorAll("[data-message-row]").length,
      chatNodes: document.querySelectorAll("[data-conversation-id]").length,
    }));
    const folder = `output/performance/${process.env.PERF_LABEL ?? "current"}`;
    await mkdir(folder, { recursive: true });
    await writeFile(
      `${folder}/${scenario.name}.json`,
      JSON.stringify(
        {
          scenario,
          browserName,
          measuredAt: new Date().toISOString(),
          migrationMs,
          migrationPhases,
          cpu,
          databaseUpgradeMs: upgradeMs,
          postGcHeap: {
            restored: restoredHeap.usedSize,
            searched: searchedHeap.usedSize,
          },
          restoreMs,
          searchMs,
          saveMs,
          ...sample,
        },
        null,
        2,
      ),
    );
  });
}
