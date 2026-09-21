import { chromium, expect } from "@playwright/test";

export async function openBrowserAcceptance(origin, password) {
  const browser = await chromium.launch({
    channel: process.env.PLAYWRIGHT_CHANNEL,
  });
  try {
    const context = await browser.newContext({
      locale: "zh-CN",
      httpCredentials: { username: "tester", password },
      viewport: { width: 1200, height: 820 },
    });
    const page = await context.newPage();
    await page.route("**/*", (route) =>
      new URL(route.request().url()).origin === origin
        ? route.continue()
        : route.abort(),
    );
    await page.goto(origin);
    await page.getByRole("combobox", { name: "选择模型", exact: true }).click();
    await page
      .getByRole("listbox")
      .getByRole("option", { name: /test-model/ })
      .click();
    const input = page.getByRole("textbox", { name: "输入消息" });
    await input.fill("success");
    await page.getByRole("button", { name: "发送消息", exact: true }).click();
    await expect(page.locator("[data-markdown]")).toContainText(
      "container answer",
    );
    await expect(page.getByRole("button", { name: "停止生成" })).toHaveCount(0);
    await input.fill("容器重启与回滚后仍保留的草稿");
    await expect(page.locator("[data-history-status]")).toHaveAttribute(
      "data-history-status",
      "saved",
    );
    return {
      async verifyRestored() {
        await page.reload();
        await expect(page.locator("[data-markdown]")).toContainText(
          "container answer",
        );
        await expect(input).toHaveValue("容器重启与回滚后仍保留的草稿");
        await expect(
          page.getByRole("button", { name: "停止生成" }),
        ).toHaveCount(0);
        await page.screenshot({
          path: "output/playwright/container/browser-restored.png",
        });
      },
      close: () => browser.close(),
    };
  } catch (error) {
    await browser.close();
    throw error;
  }
}
