import {
  test,
  expect,
  chooseProvider,
  chooseReplayOption,
  startSample,
} from "./fixtures";
import { controlledChat } from "./controlled-chat";

test("[UI-SELECT] 统一入口向上展开，分组选择与字体跟随令牌", async ({
  page,
}) => {
  await page.goto("/");
  const model = page.getByRole("combobox", { name: "选择模型" });
  await expect(page.locator("header").getByRole("combobox")).toHaveCount(0);
  await expect(model).toContainText("本地样例 · 1× 回放");
  await model.click();
  const list = page.getByRole("listbox", { name: "选择模型" });
  const popup = list.locator("..");
  await expect(
    list.getByRole("option", { name: "qwen-plus", exact: true }),
  ).toBeInViewport();
  await expect
    .poll(
      async () =>
        (await popup.boundingBox())!.y + (await popup.boundingBox())!.height <=
        (await model.boundingBox())!.y,
    )
    .toBe(true);
  await expect(list.getByRole("option", { name: "本地样例" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  const typography = (locator: typeof model) =>
    locator.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        family: style.fontFamily,
        size: style.fontSize,
        weight: style.fontWeight,
      };
    });
  expect(await typography(list)).toEqual(await typography(model));
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "20px";
    document.documentElement.style.setProperty("--text-control", "1.25rem");
    document.documentElement.style.setProperty("--font-sans", "monospace");
  });
  await expect
    .poll(() => typography(list))
    .toEqual({ family: "monospace", size: "25px", weight: "400" });
  expect(await typography(list)).toEqual(await typography(model));
  await page.keyboard.press("Escape");
  await expect(model).toBeFocused();
  await page.evaluate(() => {
    document.documentElement.style.removeProperty("font-size");
    document.documentElement.style.removeProperty("--text-control");
    document.documentElement.style.removeProperty("--font-sans");
  });
  await model.click();
  await page.screenshot({ path: "output/playwright/select-desktop.png" });
  await page.getByRole("heading", { name: "让答案，有据可循。" }).click();
  await expect(list).toBeHidden();
});

test("[UI-SELECT] 方向键与快速定位可选模型，回放设置和关闭菜单保留草稿", async ({
  page,
}) => {
  await page.goto("/");
  const input = page.getByRole("textbox", { name: "输入消息" });
  await input.fill("尚未发送的草稿");
  const model = page.getByRole("combobox", { name: "选择模型" });
  await model.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("option", { name: "本地样例" })).toBeFocused();
  await page.keyboard.press("End");
  await expect(page.getByRole("option").last()).toBeFocused();
  await page.keyboard.press("Home");
  await expect(page.getByRole("option", { name: "本地样例" })).toBeFocused();
  await page.keyboard.press("q");
  await expect(
    page.getByRole("option", { name: "qwen-plus", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(model).toContainText("qwen-plus");
  await expect(model).toBeFocused();
  await expect(input).toHaveValue("尚未发送的草稿");
  await expect(page.getByRole("article")).toHaveCount(0);
  await chooseProvider(page, "本地样例");
  await chooseReplayOption(page, "本地演示场景", "Markdown 排版");
  await model.click();
  const compact = page.getByRole("slider", { name: "回放速度", exact: true });
  await expect(
    page.getByRole("option", { name: "本地样例", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(compact).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowRight");
  await expect(compact).toHaveAttribute("aria-valuetext", "2× 回放");
  await page.keyboard.press("Escape");
  await expect(model).toContainText("2× 回放");
  await expect(model).toBeFocused();
  await expect(input).toHaveValue("尚未发送的草稿");
  await model.click();
  await expect(
    page.getByRole("option", { name: "本地样例", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(compact).toBeFocused();
  await page.keyboard.press("Escape");
});

test("[UI-SELECT] 窄屏与窗口变化保持菜单可见，长选项可滚动且不撑开页面", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await controlledChat(page);
  const longModel = "deepseek-" + "long-model-name-".repeat(8);
  await page.route("**/api/providers", (route) =>
    route.fulfill({
      json: {
        providers: [
          {
            id: "local",
            name: "本地样例",
            configured: true,
            models: ["sample"],
          },
          {
            id: "aliyun",
            name: "阿里云百炼",
            configured: true,
            models: ["qwen-test"],
          },
          {
            id: "deepseek",
            name: "DeepSeek",
            configured: true,
            models: [
              longModel,
              ...Array.from({ length: 24 }, (_, i) => `deepseek-model-${i}`),
            ],
          },
        ],
      },
    }),
  );
  await page.goto("/");
  await chooseProvider(page, "DeepSeek");
  const model = page.getByRole("combobox", { name: "选择模型" });
  await model.click();
  const list = page.getByRole("listbox", { name: "选择模型" });
  const assertFits = async (width: number, height: number) => {
    await expect
      .poll(async () => {
        const box = (await list.boundingBox())!;
        return (
          box.x >= 0 &&
          box.y >= 0 &&
          box.x + box.width <= width &&
          box.y + box.height <= height
        );
      })
      .toBe(true);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    expect(await list.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(
      true,
    );
  };
  await assertFits(390, 844);
  expect(await list.evaluate((el) => el.scrollHeight > el.clientHeight)).toBe(
    true,
  );
  await page.setViewportSize({ width: 320, height: 568 });
  await assertFits(320, 568);
  await page.keyboard.press("End");
  await expect(
    page.getByRole("option", { name: "deepseek-model-23", exact: true }),
  ).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(model).toContainText("deepseek-model-23");
  await chooseProvider(page, "本地样例");
  await chooseReplayOption(page, "本地演示场景", "Markdown 排版");
  await page.getByRole("combobox", { name: "选择模型" }).click();
  await expect(page.getByRole("listbox")).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
  const emptyScenario = page.getByRole("radio", {
    name: "空结果",
    exact: true,
  });
  await emptyScenario.scrollIntoViewIfNeeded();
  await expect(emptyScenario).toBeInViewport();
  await emptyScenario.check();
  await expect(emptyScenario).toBeChecked();
  await page.screenshot({ path: "output/playwright/select-mobile.png" });
});

test("[UI-SELECT] 生成时禁止修改回放参数，结束后正常恢复", async ({ page }) => {
  await page.goto("/");
  await startSample(page, 1);
  const model = page.getByRole("combobox", { name: "选择模型" });
  await expect(model).toBeDisabled();
  await expect(page.getByRole("listbox")).toHaveCount(0);
  await page.getByRole("button", { name: "停止生成" }).click();
  await chooseReplayOption(page, "回放速度", "4× 回放");
  await expect(model).toContainText("4× 回放");
});

test("[UI-SELECT] 同名模型按服务商区分，未知能力不出现无效开关", async ({
  page,
}) => {
  const stream = await controlledChat(page, ["qwen-plus"]);
  await page.route("**/api/providers", (route) =>
    route.fulfill({
      json: {
        providers: [
          {
            id: "local",
            name: "本地样例",
            configured: true,
            models: ["sample"],
          },
          {
            id: "deepseek",
            name: "DeepSeek",
            configured: true,
            models: ["qwen-plus"],
          },
          {
            id: "aliyun",
            name: "阿里云百炼",
            configured: true,
            models: ["qwen-plus"],
          },
        ],
      },
    }),
  );
  await page.reload();
  const input = page.getByRole("textbox", { name: "输入消息" });
  await input.fill("同名模型的供应商必须正确");
  await chooseProvider(page, "DeepSeek");
  const model = page.getByRole("combobox", { name: "选择模型" });
  await model.click();
  await expect(
    page.getByRole("option", { name: "qwen-plus", exact: true }),
  ).toHaveCount(2);
  await expect(
    page.getByRole("menuitemcheckbox", { name: "深度思考" }),
  ).toHaveCount(0);
  await expect(page.getByRole("button", { name: "开启加速" })).toHaveCount(0);
  await page.keyboard.press("Escape");
  const tools = page.getByRole("button", { name: "添加附件和工具" });
  await tools.click();
  await expect(
    page.getByRole("menuitemcheckbox", { name: "深度思考" }),
  ).toHaveCount(0);
  await page.keyboard.press("Escape");
  await chooseProvider(page, "阿里云百炼");
  await tools.click();
  await expect(
    page.getByRole("menuitemcheckbox", { name: "深度思考" }),
  ).toBeVisible();
  await expect(
    page.getByRole("menuitemcheckbox", { name: "深度思考" }),
  ).toHaveAttribute("aria-checked", "false");
  await page.keyboard.press("Escape");
  await expect(input).toHaveValue("同名模型的供应商必须正确");
  await page.getByRole("button", { name: "发送消息", exact: true }).click();
  await stream.waitForRequests(1);
  expect((await stream.requests())[0].body).toMatchObject({
    provider: "aliyun",
    model: "qwen-plus",
    thinking: false,
  });
  await page.getByRole("button", { name: "停止生成", exact: true }).click();
});
