import { chooseProvider, openPreferences } from "./fixtures";
import { test, expect, chooseOption } from "./fixtures";
import { controlledChat } from "./controlled-chat";

const file = (name: string, content = "附件中的测试资料") => ({
  name,
  mimeType: "text/plain",
  buffer: Buffer.from(content),
});

test("[COMPOSER] 文本附件可移除并随提问发送，模型菜单不误提交草稿", async ({
  page,
}) => {
  await controlledChat(page, ["deepseek-v4-flash", "deepseek-v4-pro"]);
  await page.goto("/");
  await chooseProvider(page, "本地样例");
  await expect(
    page.getByRole("button", { name: "添加附件和工具", exact: true }),
  ).toBeEnabled();
  await chooseProvider(page, "DeepSeek");
  const input = page.getByRole("textbox", { name: "输入消息" });
  await input.fill("总结资料");
  await page
    .getByRole("button", { name: "添加附件和工具", exact: true })
    .click();
  const chooser = page.waitForEvent("filechooser");
  await page
    .getByRole("menuitem", { name: "添加文本文件", exact: true })
    .click();
  await (
    await chooser
  ).setFiles([file("notes.md"), file("remove.txt", "不应发送")]);
  await page.getByRole("button", { name: "移除附件 remove.txt" }).click();
  await expect(page.getByRole("list", { name: "待发送附件" })).toContainText(
    "notes.md",
  );
  await chooseOption(page, "选择模型", "deepseek-v4-pro");
  const tools = page.getByRole("button", {
    name: "添加附件和工具",
    exact: true,
  });
  await tools.click();
  const thinking = page.getByRole("menuitemcheckbox", {
    name: "深度思考",
    exact: true,
  });
  await expect(thinking).toHaveAttribute("aria-checked", "false");
  await thinking.click();
  await expect(tools).toBeFocused();
  await tools.click();
  await expect(thinking).toHaveAttribute("aria-checked", "true");
  await page.keyboard.press("Escape");
  await expect(tools).toBeFocused();
  await expect(input).toHaveValue("总结资料");
  expect(await page.evaluate(() => window.__chatRuns.length)).toBe(0);
  await page.screenshot({
    path: "output/playwright/composer-desktop.png",
    animations: "disabled",
  });
  await page.getByRole("button", { name: "发送消息", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => window.__chatRuns.length))
    .toBe(1);
  const body = await page.evaluate(() => window.__chatRuns[0].body);
  expect(body).toMatchObject({ model: "deepseek-v4-pro", thinking: true });
  expect(body.messages[0].content).toBe(
    "总结资料\n\n[notes.md]\n附件中的测试资料",
  );
  await expect(page.getByRole("list", { name: "待发送附件" })).toHaveCount(0);
  await expect(input).toHaveValue("");
  await page.getByRole("button", { name: "停止生成", exact: true }).click();
});

test("[COMPOSER] 附件校验、草稿隔离与窄屏工具栏", async ({ page }) => {
  await controlledChat(page);
  await page.goto("/");
  await chooseProvider(page, "DeepSeek");
  const upload = page.locator('input[type="file"]');
  for (const [candidate, expected] of [
    [file("image.svg"), "支持 PNG"],
    [file("large.txt", "x".repeat(16 * 1024 + 1)), "16 KB"],
    [file("empty.txt", ""), "无法读取"],
    [file("binary.txt", "\u0000"), "无法读取"],
  ] as const) {
    await upload.setInputFiles(candidate);
    await expect(page.getByRole("alert")).toContainText(expected);
    await expect(page.getByRole("list", { name: "待发送附件" })).toHaveCount(0);
  }
  await upload.setInputFiles([
    file("a.txt"),
    file("b.txt"),
    file("c.txt"),
    file("d.txt"),
  ]);
  await expect(page.getByRole("alert")).toContainText("最多添加 3 个");
  await upload.setInputFiles(file("draft.md"));
  await expect(
    page.getByRole("button", { name: "发送消息", exact: true }),
  ).toBeEnabled();
  await page.getByRole("button", { name: "新聊天", exact: true }).click();
  await expect(page.getByRole("list", { name: "待发送附件" })).toHaveCount(0);
  await page.getByRole("button", { name: /草稿/ }).click();
  await expect(page.getByRole("list", { name: "待发送附件" })).toContainText(
    "draft.md",
  );
  await page.setViewportSize({ width: 320, height: 680 });
  await expect(page.locator("aside")).toHaveAttribute("aria-hidden", "true");
  const model = page.getByRole("combobox", { name: "选择模型" });
  const add = page.getByRole("button", { name: "添加附件和工具", exact: true });
  const send = page.getByRole("button", { name: "发送消息", exact: true });
  const [a, m, s] = await Promise.all([
    add.boundingBox(),
    model.boundingBox(),
    send.boundingBox(),
  ]);
  expect(a!.x + a!.width).toBeLessThan(m!.x);
  expect(m!.x + m!.width).toBeLessThanOrEqual(s!.x);
  expect(Math.abs(a!.y + a!.height / 2 - (s!.y + s!.height / 2))).toBeLessThan(
    2,
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
  await page.screenshot({
    path: "output/playwright/composer-mobile.png",
    animations: "disabled",
  });
});

test("[COMPOSER] 切换会话后丢弃迟到的附件读取结果", async ({ page }) => {
  await controlledChat(page);
  await page.goto("/");
  await chooseProvider(page, "DeepSeek");
  await page.getByRole("textbox", { name: "输入消息" }).fill("原会话草稿");
  await page.evaluate(() => {
    const original = File.prototype.arrayBuffer;
    const target = window as Window & {
      finishAttachmentRead?: () => Promise<void>;
    };
    File.prototype.arrayBuffer = function () {
      return new Promise((resolve) => {
        target.finishAttachmentRead = async () => {
          resolve(await original.call(this));
          File.prototype.arrayBuffer = original;
        };
      });
    };
  });
  await page.locator('input[type="file"]').setInputFiles(file("late.txt"));
  await expect(page.getByRole("status")).toContainText("正在读取附件");
  await page.getByRole("button", { name: "新聊天", exact: true }).click();
  await page.evaluate(async () => {
    await (
      window as Window & { finishAttachmentRead?: () => Promise<void> }
    ).finishAttachmentRead?.();
  });
  await expect(page.getByRole("list", { name: "待发送附件" })).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "添加附件和工具", exact: true }),
  ).toBeEnabled();
  await page.getByRole("button", { name: /未发送草稿/ }).click();
  await expect(page.getByRole("textbox", { name: "输入消息" })).toHaveValue(
    "原会话草稿",
  );
  await expect(page.getByRole("list", { name: "待发送附件" })).toHaveCount(0);
});

test("[COMPOSER-TOOLS] 键盘切换思考、窄屏弹层、生成锁定与语言主题", async ({
  page,
}) => {
  await controlledChat(page, ["deepseek-v4-flash"]);
  await page.goto("/");
  await chooseProvider(page, "DeepSeek");
  const input = page.getByRole("textbox", { name: "输入消息" });
  await input.fill("保留草稿，验证工具菜单");
  const tools = page.getByRole("button", {
    name: "添加附件和工具",
    exact: true,
  });
  const chip = page.getByRole("button", { name: "关闭深度思考", exact: true });
  await expect(chip).toHaveCount(0);
  await tools.focus();
  await tools.press("Enter");
  const attach = page.getByRole("menuitem", {
    name: "添加文本文件",
    exact: true,
  });
  await expect(attach).toBeFocused();
  await attach.press("ArrowDown");
  await expect(
    page.getByRole("menuitem", { name: "添加图片", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("ArrowDown");
  const thinking = page.getByRole("menuitemcheckbox", {
    name: "深度思考",
    exact: true,
  });
  await expect(thinking).toBeFocused();
  await expect(thinking).toHaveAttribute("aria-checked", "false");
  await thinking.press("Enter");
  await expect(chip).toBeVisible();
  await expect(tools).toBeFocused();
  await tools.click();
  await expect(thinking).toHaveAttribute("aria-checked", "true");
  await page.keyboard.press("Escape");
  await chip.click();
  await expect(tools).toBeFocused();
  await expect(chip).toHaveCount(0);
  await tools.click();
  await thinking.click();
  await expect(chip).toBeVisible();
  await expect(input).toHaveValue("保留草稿，验证工具菜单");
  expect(await page.evaluate(() => window.__chatRuns.length)).toBe(0);

  await page.setViewportSize({ width: 320, height: 680 });
  await expect(page.locator("aside")).toHaveCSS("visibility", "hidden");
  await tools.click();
  const menu = page.getByRole("menu", { name: "添加附件和工具" });
  await expect(menu).toBeVisible();
  // Wait for measured positioning before checking viewport bounds.
  await expect
    .poll(async () => {
      const box = await menu.boundingBox();
      const trigger = await tools.boundingBox();
      return (
        !!box &&
        !!trigger &&
        box.x >= 0 &&
        box.x + box.width <= 320 &&
        box.y >= 0 &&
        box.y + box.height <= trigger.y
      );
    })
    .toBe(true);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
  await page.screenshot({
    path: "output/playwright/composer-tools-mobile.png",
  });
  await page.keyboard.press("Escape");
  await expect(tools).toBeFocused();
  await page.getByRole("button", { name: "发送消息", exact: true }).click();
  await expect(tools).toBeDisabled();
  await expect(chip).toBeDisabled();
  await page.getByRole("button", { name: "停止生成", exact: true }).click();
  await expect(tools).toBeEnabled();

  const preferences = await openPreferences(page);
  await preferences
    .getByRole("radio", { name: "English", exact: true })
    .check();
  await preferences.getByRole("radio", { name: "Dark", exact: true }).check();
  await preferences.getByRole("button", { name: "Done", exact: true }).click();
  await expect(page.locator("aside")).toHaveCSS("visibility", "hidden");
  await page
    .getByRole("button", { name: "Add attachments and tools", exact: true })
    .click();
  await expect(
    page.getByRole("menuitem", { name: "Add text file", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("menuitemcheckbox", { name: "Deep thinking", exact: true }),
  ).toHaveAttribute("aria-checked", "true");
  await page.screenshot({ path: "output/playwright/composer-tools-dark.png" });
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Turn off deep thinking", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Add attachments and tools", exact: true })
    .click();
  await expect(
    page.getByRole("menuitemcheckbox", { name: "Deep thinking", exact: true }),
  ).toHaveAttribute("aria-checked", "false");
});
