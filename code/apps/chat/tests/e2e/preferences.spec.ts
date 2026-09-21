import { chooseReplayOption } from "./fixtures";
import type { Page } from "@playwright/test";
import {
  openPreferences,
  openModelSettings,
  test,
  expect,
  chooseProvider,
  send,
} from "./fixtures";
import { controlledChat } from "./controlled-chat";

async function closePreferences(page: Page) {
  await page
    .getByRole("dialog", { name: /^(偏好设置|Preferences)$/ })
    .getByRole("button", { name: /^(完成|Done)$/, exact: true })
    .click();
}

async function expectDarkSurfaces(page: Page) {
  const surface = await page
    .locator("html")
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  await expect(
    page.getByRole("button", {
      name: /Understand a question through its sources/,
    }),
  ).toHaveCSS("background-color", surface);
}

test("[PREF-UI] 中英文、深色主题立即生效，保留草稿并在刷新后恢复偏好", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("textbox", { name: "输入消息" })
    .fill("保留我的草稿 draft");
  const dialog = await openPreferences(page);
  await dialog.getByRole("radio", { name: "English", exact: true }).check();
  await expect(
    dialog.getByRole("group", { name: "Language", exact: true }),
  ).toBeVisible();
  await dialog.getByRole("radio", { name: "Dark", exact: true }).check();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expectDarkSurfaces(page);
  await page.screenshot({ path: "output/playwright/preferences-dark-en.png" });
  await closePreferences(page);
  await expect(
    page.getByRole("heading", { name: "Answers with a clear trail." }),
  ).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Message", exact: true }),
  ).toHaveValue("保留我的草稿 draft");
  await expect(page.getByRole("article")).toHaveCount(0);
  await expect(page).toHaveTitle("Zhixu · AI Chat");
  await chooseProvider(page, "Alibaba Cloud Bailian");
  await openModelSettings(page);
  await expect(
    page.getByRole("dialog", { name: "Connect your API to Zhixu" }),
  ).toBeVisible();
  await expect(page.getByRole("dialog")).not.toContainText(/[\p{Script=Han}]/u);
  await page.keyboard.press("Escape");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await chooseProvider(page, "Local samples");
  await page.getByRole("combobox", { name: "Choose model" }).click();
  const popup = page
    .getByRole("listbox", { name: "Choose model" })
    .locator("..");
  await expect(
    popup.getByRole("radio", { name: "Error recovery" }),
  ).toBeVisible();
  const colors = await popup.evaluate((element) => ({
    popup: getComputedStyle(element).backgroundColor,
    page: getComputedStyle(document.documentElement).backgroundColor,
  }));
  expect(colors.popup).toBe(colors.page);
  await page.screenshot({ path: "output/playwright/theme-dark-en.png" });
  await page.keyboard.press("Escape");
  const preferences = await openPreferences(page);
  await preferences
    .getByRole("radio", { name: "简体中文", exact: true })
    .check();
  await preferences.getByRole("radio", { name: "浅色", exact: true }).check();
  await closePreferences(page);
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.screenshot({ path: "output/playwright/theme-light-zh.png" });
});

test("[PREF-SYSTEM] 跟随系统实时响应，手动选择优先，多标签页同步与删除恢复", async ({
  page,
  context,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  let dialog = await openPreferences(page);
  await dialog.getByRole("radio", { name: "深色", exact: true }).check();
  await dialog.getByRole("radio", { name: "English", exact: true }).check();
  await closePreferences(page);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const other = await context.newPage();
  try {
    await other.goto("/");
    await expect(other.locator("html")).toHaveAttribute("lang", "en");
    await expect(other.locator("html")).toHaveAttribute("data-theme", "dark");
    dialog = await openPreferences(other);
    await dialog
      .getByRole("radio", { name: "Comfortable", exact: true })
      .check();
    await expect(page.locator("html")).toHaveAttribute(
      "data-density",
      "comfortable",
    );
    await dialog.getByRole("radio", { name: "System", exact: true }).check();
    await dialog.getByRole("radio", { name: "简体中文", exact: true }).check();
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await page.emulateMedia({ colorScheme: "dark" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await other.evaluate(() => localStorage.removeItem("zhixu.preferences.v1"));
    await expect(page.locator("html")).toHaveAttribute(
      "data-density",
      "standard",
    );
    await expect(page.locator("html")).toHaveAttribute(
      "data-theme-preference",
      "system",
    );
  } finally {
    await other.close();
  }
});

test("[PREF-STORAGE] 浏览器禁止存储时仍能切换，明确提示保存失败", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
    Storage.prototype.setItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const dialog = await openPreferences(page);
  await dialog.getByRole("radio", { name: "English" }).check();
  await expect(dialog.getByRole("status")).toContainText("could not save");
  await dialog.getByRole("radio", { name: "Compact", exact: true }).check();
  await expect(page.locator("html")).toHaveAttribute("data-density", "compact");
  await dialog.getByRole("radio", { name: "Light", exact: true }).check();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await closePreferences(page);
  await expect(
    page.getByRole("textbox", { name: "Message", exact: true }),
  ).toBeEnabled();
});

test("[PREF-BOOT] 主应用脚本未加载时已恢复主题与语言，损坏数据安全回退", async ({
  page,
  context,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      "zhixu.preferences.v1",
      JSON.stringify({
        version: 1,
        locale: "en",
        theme: "dark",
        density: "compact",
      }),
    );
  });
  // A delayed/unavailable React bundle must not postpone applying saved preferences.
  await page.route("**/assets/index-*.js", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "" }),
  );
  await page.goto("/");
  await expect(page.locator("#root")).toBeEmpty();
  await expect(page.locator("html")).toHaveAttribute("data-density", "compact");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).colorScheme),
  ).toBe("dark");
  expect(await page.locator("script[data-preferences-bootstrap]").count()).toBe(
    1,
  );
  const other = await context.newPage();
  try {
    await other.addInitScript(() =>
      localStorage.setItem("zhixu.preferences.v1", "not-json"),
    );
    await other.goto("/");
    await expect(
      other.getByRole("heading", { name: "让答案，有据可循。" }),
    ).toBeVisible();
    await expect(other.locator("html")).toHaveAttribute(
      "data-theme-preference",
      "system",
    );
  } finally {
    await other.close();
  }
});

test("[PREF-STREAM] 生成中切换语言和主题保持请求、正文、引用与草稿", async ({
  page,
}) => {
  const chat = await controlledChat(page);
  await send(page, "Original question 原始问题");
  await chat.waitForRequests(1);
  await chat.emit(
    0,
    { type: "reasoning", id: "r1", delta: "原始推理 raw reasoning" },
    {
      type: "text",
      delta:
        "原始回答 **raw answer** [[1_0][1_1]]\n\n```js\nconst answer = 42;\n```",
    },
    {
      type: "references",
      items: [
        {
          id: "1_0",
          title: "来源 A",
          content: "原始资料 A",
          link: "https://example.com/a",
        },
        {
          id: "1_1",
          title: "来源 B",
          content: "原始资料 B",
          link: "https://example.com/b",
        },
      ],
    },
  );
  await expect(page.locator("[data-markdown]")).toContainText("raw answer");
  await page.getByRole("textbox", { name: "输入消息" }).fill("还未发送 draft");
  const dialog = await openPreferences(page);
  await dialog.getByRole("radio", { name: "English" }).check();
  await dialog.getByRole("radio", { name: "Dark", exact: true }).check();
  await closePreferences(page);
  await expect(
    page.getByRole("button", { name: "Stop generating" }),
  ).toBeVisible();
  expect((await chat.requests())[0].aborted).toBe(false);
  expect(await chat.requests()).toHaveLength(1);
  await expect(
    page.getByRole("textbox", { name: "Message", exact: true }),
  ).toHaveValue("还未发送 draft");
  await chat.emit(
    0,
    { type: "text", delta: "\n\n继续输出 after switching" },
    { type: "done" },
  );
  await chat.end(0);
  await expect(
    page.getByRole("article", { name: "Zhixu’s answer" }),
  ).toContainText("继续输出 after switching");
  await expect(page.getByRole("article", { name: "Your message" })).toHaveText(
    "Original question 原始问题",
  );
  await page
    .getByRole("button", {
      name: "View citation: 来源 A, 2 sources",
      exact: true,
    })
    .click();
  await page.getByRole("button", { name: "Next source", exact: true }).click();
  await expect(page.getByRole("dialog")).toContainText("原始资料 B");
  await expect(
    page.getByRole("dialog").getByRole("link", { name: "Open original" }),
  ).toBeVisible();
  await page.screenshot({ path: "output/playwright/theme-dark-answer.png" });
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Copy code" })).toBeVisible();
  await page.getByRole("button", { name: /^Activity/ }).click();
  await expect(page.getByText(/^Reasoning\s*Completed$/)).toBeVisible();
  await expect(
    page.getByText("原始推理 raw reasoning", { exact: true }),
  ).toBeVisible();
});

test("[PREF-MOBILE] 英文窄屏无横向溢出，偏好窗口可键盘操作，错误提示已翻译", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  const dialog = await openPreferences(page);
  await dialog.getByRole("radio", { name: "English" }).check();
  await dialog.getByRole("radio", { name: "Dark", exact: true }).focus();
  await page.keyboard.press("Space");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expectDarkSurfaces(page);
  await page.screenshot({
    path: "output/playwright/preferences-mobile-en.png",
  });
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open sidebar" }),
  ).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Open sidebar" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Answers with a clear trail." }),
  ).toBeInViewport();
  await expect(
    page.getByRole("region", { name: "Conversation reading area" }),
  ).toHaveJSProperty("scrollTop", 0);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
  await page.screenshot({ path: "output/playwright/theme-mobile-en.png" });
  await chooseReplayOption(page, "Playback speed", "4× playback");
  await chooseReplayOption(page, "Sample scenario", "Error recovery");
  await page
    .getByRole("textbox", { name: "Message", exact: true })
    .fill("Try a sample");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("alert")).toContainText("This is an error demo");
  await expect(page.getByRole("alert")).not.toContainText(/[\p{Script=Han}]/u);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
});

test("[PREF-LOCALE] 首次访问按浏览器语言初始化", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ locale: "en-US" });
  const page = await context.newPage();
  try {
    await page.goto(baseURL!);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByRole("heading", { name: "Answers with a clear trail." }),
    ).toBeVisible();
    await expect(
      page.getByRole("combobox", { name: "Choose model" }),
    ).toContainText("Local samples");
  } finally {
    await context.close();
  }
});
