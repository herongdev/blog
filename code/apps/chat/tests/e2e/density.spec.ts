import type { Page } from "@playwright/test";
import {
  openPreferences,
  test,
  expect,
  send,
  readingArea,
  expectAtBottom,
} from "./fixtures";
import { controlledChat } from "./controlled-chat";

async function setDensity(page: Page, label: string) {
  const dialog = await openPreferences(page);
  await dialog.getByRole("radio", { name: label, exact: true }).check();
  await dialog.getByRole("button", { name: /^(完成|Done)$/ }).click();
}

test("[DENSITY-UI] 三档实际间距递增，字号和控件保持稳定，刷新恢复选择", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute(
    "data-density",
    "standard",
  );
  const draft = page.getByRole("textbox", { name: "输入消息" });
  await draft.fill("密度切换保留草稿");
  const results = [];
  for (const [value, label] of [
    ["compact", "紧凑"],
    ["standard", "适中"],
    ["comfortable", "宽松"],
  ]) {
    const dialog = await openPreferences(page);
    const before = await dialog.boundingBox();
    await dialog.getByRole("radio", { name: label, exact: true }).check();
    await expect(page.locator("html")).toHaveAttribute("data-density", value);
    expect(await dialog.boundingBox()).toEqual(before);
    await dialog.getByRole("button", { name: "完成", exact: true }).click();
    await expect(draft).toHaveValue("密度切换保留草稿");
    const card = await page
      .getByRole("button", { name: /带着来源，读懂一个问题/ })
      .evaluate((el) => {
        const style = getComputedStyle(el);
        return {
          padding: parseFloat(style.paddingTop),
          font: getComputedStyle(el.querySelector("strong")!).fontSize,
        };
      });
    const metrics = await draft.evaluate((el) => ({
      composerHeight: el.closest("form")!.getBoundingClientRect().height,
      width: el.closest("form")!.getBoundingClientRect().width,
      font: getComputedStyle(el).fontSize,
    }));
    const sendButton = await page
      .getByRole("button", { name: "发送消息", exact: true })
      .boundingBox();
    await page.getByRole("combobox", { name: "选择模型" }).click();
    const option = page.getByRole("option", { name: "本地样例", exact: true });
    const optionMetrics = await option.evaluate((el) => ({
      padding: parseFloat(getComputedStyle(el).paddingTop),
      font: getComputedStyle(el).fontSize,
      height: el.getBoundingClientRect().height,
    }));
    expect(optionMetrics.height).toBeGreaterThanOrEqual(36);
    await page.keyboard.press("Escape");
    results.push({ card, metrics, sendButton, optionMetrics });
    await page.screenshot({ path: `output/playwright/density-${value}.png` });
  }
  for (let i = 1; i < results.length; i++) {
    expect(results[i].card.padding).toBeGreaterThan(
      results[i - 1].card.padding,
    );
    expect(results[i].metrics.composerHeight).toBeGreaterThan(
      results[i - 1].metrics.composerHeight,
    );
    expect(results[i].optionMetrics.padding).toBeGreaterThan(
      results[i - 1].optionMetrics.padding,
    );
    expect(results[i].card.font).toBe(results[0].card.font);
    expect(results[i].metrics.font).toBe(results[0].metrics.font);
    expect(results[i].metrics.width).toBe(results[0].metrics.width);
    expect(results[i].optionMetrics.font).toBe(results[0].optionMetrics.font);
    expect(results[i].sendButton!.height).toBe(results[0].sendButton!.height);
  }
  await page.reload();
  const dialog = await openPreferences(page);
  await expect(
    dialog.getByRole("radio", { name: "宽松", exact: true }),
  ).toBeChecked();
  await dialog.getByRole("radio", { name: "English", exact: true }).check();
  await dialog.getByRole("radio", { name: "Dark", exact: true }).check();
  await expect(
    dialog.getByRole("radio", { name: "Comfortable", exact: true }),
  ).toBeChecked();
  await page.screenshot({
    path: "output/playwright/density-preferences-en-dark.png",
  });
});

test("[DENSITY-STREAM] 生成中切换保持请求和阅读跟随，正文段落表格间距同步变化", async ({
  page,
}) => {
  const chat = await controlledChat(page);
  await send(page, "检查阅读密度");
  await chat.waitForRequests(1);
  const text =
    Array.from(
      { length: 24 },
      (_, i) => `第 ${i + 1} 段：保留原始回答与阅读状态。`,
    ).join("\n\n") +
    "\n\n| 项目 | 状态 |\n|---|---|\n| 密度 | 可切换 |\n\n```js\nconst density = 'standard';\n```";
  await chat.emit(0, { type: "text", delta: text });
  await expect(page.locator("[data-markdown] table")).toBeVisible();
  await expectAtBottom(page);
  const draft = page.getByRole("textbox", { name: "输入消息" });
  await draft.fill("保留未发送的草稿");
  const metrics = async () =>
    page.locator("[data-markdown]").evaluate((el) => ({
      gap: parseFloat(getComputedStyle(el.querySelector("p")!).marginBottom),
      cell: parseFloat(getComputedStyle(el.querySelector("td")!).paddingTop),
      font: getComputedStyle(el).fontSize,
      lineHeight: getComputedStyle(el).lineHeight,
      code: el.querySelector("code")!.textContent,
    }));
  const standard = await metrics();
  await setDensity(page, "紧凑");
  await expectAtBottom(page);
  const compact = await metrics();
  expect(compact.gap).toBeLessThan(standard.gap);
  expect(compact.cell).toBeLessThan(standard.cell);
  await page.screenshot({
    path: "output/playwright/density-answer-compact.png",
  });
  // A reader who has left the bottom must not be pulled back by a density change.
  await readingArea(page).evaluate((el) => {
    el.scrollTop = 120;
  });
  await expect(
    page.getByRole("button", { name: "回到最新", exact: true }),
  ).toBeVisible();
  await setDensity(page, "宽松");
  await expect(
    page.getByRole("button", { name: "回到最新", exact: true }),
  ).toBeVisible();
  const comfortable = await metrics();
  expect(comfortable.gap).toBeGreaterThan(standard.gap);
  expect(comfortable.cell).toBeGreaterThan(standard.cell);
  expect(comfortable.font).toBe(standard.font);
  expect(comfortable.lineHeight).toBe(standard.lineHeight);
  expect(comfortable.code).toBe(standard.code);
  await expect(draft).toHaveValue("保留未发送的草稿");
  expect(await chat.requests()).toHaveLength(1);
  expect((await chat.requests())[0].aborted).toBe(false);
  await chat.emit(
    0,
    { type: "text", delta: "\n\n切换后继续输出。" },
    { type: "done" },
  );
  await chat.end(0);
  await expect(page.locator("[data-markdown]")).toContainText(
    "切换后继续输出。",
  );
  await page.getByRole("button", { name: "回到最新", exact: true }).click();
  await expectAtBottom(page);
  await page.screenshot({
    path: "output/playwright/density-answer-comfortable.png",
  });
});

test("[DENSITY-MOBILE] 英文窄屏可键盘选择，菜单不越界，草稿换行后高度正确", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  const dialog = await openPreferences(page);
  await dialog.getByRole("radio", { name: "English", exact: true }).check();
  await dialog.getByRole("radio", { name: "Dark", exact: true }).check();
  await dialog.getByRole("radio", { name: "Standard", exact: true }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(
    dialog.getByRole("radio", { name: "Compact", exact: true }),
  ).toBeChecked();
  await dialog
    .getByRole("radio", { name: "Comfortable", exact: true })
    .scrollIntoViewIfNeeded();
  await page.screenshot({
    path: "output/playwright/density-preferences-mobile.png",
  });
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open sidebar" }),
  ).toBeFocused();
  const draft = page.getByRole("textbox", { name: "Message", exact: true });
  const text =
    "Preserve this draft while spacing changes and words wrap onto more lines.";
  await draft.fill(text);
  for (const label of ["Compact", "Comfortable"]) {
    await setDensity(page, label);
    await expect(draft).toHaveValue(text);
    await expect
      .poll(() => draft.evaluate((el) => el.scrollHeight - el.clientHeight))
      .toBeLessThanOrEqual(1);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(320);
    await page.getByRole("combobox", { name: "Choose model" }).click();
    const popup = page.getByRole("listbox", { name: "Choose model" });
    const bounds = await popup.boundingBox();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
    expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(568);
    await page.screenshot({
      path: `output/playwright/density-mobile-${label.toLowerCase()}.png`,
    });
    await page.keyboard.press("Escape");
  }
});
