import { test as base, expect, type Page } from "@playwright/test";

export const test = base.extend({
  page: async ({ page, baseURL }, use) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (
        url.origin !== new URL(baseURL!).origin ||
        url.pathname === "/api/chat"
      ) {
        // API tests explicitly replace this route with a local SSE fixture.
        errors.push(`Unexpected request: ${url.origin}${url.pathname}`);
        await route.abort();
      } else await route.continue();
    });
    await use(page);
    expect(
      errors,
      "No uncaught page errors or unexpected network calls",
    ).toEqual([]);
  },
});

export { expect };

export async function send(page: Page, message: string) {
  await page.getByRole("textbox", { name: "输入消息" }).fill(message);
  await page.getByRole("button", { name: "发送消息", exact: true }).click();
}

export async function startSample(page: Page, speed: 1 | 4 = 4) {
  await chooseReplayOption(page, "回放速度", `${speed}× 回放`);
  await page
    .getByRole("button", { name: "带着来源，读懂一个问题 甲硝唑是什么？" })
    .click();
  await expect(page.getByRole("button", { name: "停止生成" })).toBeVisible();
}

export async function waitForAnswer(page: Page) {
  await expect(
    page.getByRole("article", { name: "知序的回答" }).last(),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "停止生成" })).toBeHidden({
    timeout: 25_000,
  });
}

export const readingArea = (page: Page) =>
  page.getByRole("region", { name: "消息阅读区", exact: true });
export async function expectAtBottom(page: Page) {
  await expect
    .poll(() =>
      readingArea(page).evaluate(
        (el) => el.scrollHeight - el.clientHeight - el.scrollTop,
      ),
    )
    .toBeLessThan(5);
}

export async function chooseOption(page: Page, name: string, option: string) {
  await page.getByRole("combobox", { name, exact: true }).click();
  await page
    .getByRole("listbox", { name, exact: true })
    .getByRole("option", { name: option, exact: true })
    .click();
}

export async function openUserSettings(page: Page) {
  const trigger = page.getByRole("button", {
    name: /^(用户设置|User settings)$/,
  });
  if (!(await trigger.isVisible())) {
    await page
      .getByRole("button", { name: /^(打开侧栏|Open sidebar)$/ })
      .click();
  }
  await trigger.click();
  return page.getByRole("menu", { name: /^(用户设置|User settings)$/ });
}

export async function openPreferences(page: Page) {
  const menu = await openUserSettings(page);
  await menu
    .getByRole("menuitem", { name: /^(语言与外观|Language and appearance)$/ })
    .click();
  return page.getByRole("dialog", { name: /^(偏好设置|Preferences)$/ });
}

export async function openModelSettings(page: Page) {
  const menu = await openUserSettings(page);
  await menu
    .getByRole("menuitem", { name: /^(模型设置|Model settings)$/ })
    .click();
}

export async function chooseProvider(page: Page, name: string) {
  const trigger = page.getByRole("combobox", {
    name: /^(选择模型|Choose model)$/,
  });
  await trigger.click();
  await page
    .getByRole("listbox")
    .getByRole("option")
    .and(page.locator(`[data-option-group="${name}"]`))
    .first()
    .click();
}

export async function chooseReplayOption(
  page: Page,
  group: string,
  option: string,
) {
  await page
    .getByRole("combobox", { name: /^(选择模型|Choose model)$/ })
    .click();
  if (group === "回放速度" || group === "Playback speed") {
    const slider = page.getByRole("slider", { name: group, exact: true });
    await slider.focus();
    await slider.press("Home");
    for (
      let i = 0;
      i < [1, 1.5, 2, 3, 4].indexOf(Number.parseFloat(option));
      i++
    )
      await slider.press("ArrowRight");
  } else {
    await page
      .getByRole("group", { name: group, exact: true })
      .getByRole("radio", { name: option, exact: true })
      .check();
  }
  await page.keyboard.press("Escape");
}
