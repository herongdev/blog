import { test, expect } from "./fixtures";

test("[SIDEBAR-MOTION] 桌面平滑让位、侧栏内容不挤压，动画途中可反向收起", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const panel = page.locator("aside");
  await expect(panel).toBeVisible();
  const fullWidth = (await panel.boundingBox())!.width;
  // Sample real rendered frames, rather than only checking transition declarations.
  const closing = await panel.evaluate(async (element) => {
    const slot = element.parentElement!;
    const main = document.querySelector("main")!;
    element.querySelector<HTMLButtonElement>("button[aria-controls]")!.click();
    const frames = [];
    for (let i = 0; i < 90; i++) {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
      frames.push({
        slotWidth: slot.getBoundingClientRect().width,
        panelWidth: element.getBoundingClientRect().width,
        mainLeft: main.getBoundingClientRect().left,
      });
      if (getComputedStyle(element).visibility === "hidden") break;
    }
    return frames;
  });
  expect(
    closing.some(({ slotWidth }) => slotWidth > 1 && slotWidth < fullWidth - 1),
  ).toBe(true);
  for (const frame of closing) {
    expect(frame.panelWidth).toBeCloseTo(fullWidth);
    expect(frame.mainLeft).toBeCloseTo(frame.slotWidth);
  }
  expect(closing.at(-1)!.slotWidth).toBe(0);
  await expect(panel).toHaveAttribute("inert", "");
  await expect(
    page.getByRole("button", { name: "打开侧栏", exact: true }),
  ).toBeFocused();

  const reversed = await panel.evaluate(async (element) => {
    document
      .querySelector<HTMLButtonElement>("header button[aria-controls]")!
      .click();
    let reversed = false;
    for (let i = 0; i < 90; i++) {
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve()),
      );
      const { x, width } = element.getBoundingClientRect();
      if (!reversed && x > -width * 0.7 && x < -1) {
        element
          .querySelector<HTMLButtonElement>("button[aria-controls]")!
          .click();
        reversed = true;
      }
      if (reversed && getComputedStyle(element).visibility === "hidden") break;
    }
    return reversed;
  });
  expect(reversed).toBe(true);
  await expect(panel).toHaveCSS("visibility", "hidden");
  await expect(
    page.getByRole("button", { name: "打开侧栏", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("button", { name: "新聊天", exact: true }),
  ).toBeHidden();
  await page.getByRole("button", { name: "打开侧栏", exact: true }).click();
  await expect.poll(async () => (await panel.boundingBox())?.x).toBe(0);
  await expect(
    page.getByRole("button", { name: "收起侧栏", exact: true }),
  ).toBeFocused();
});

test("[SIDEBAR-MOBILE-MOTION] 手机滑入滑出与遮罩淡入淡出同步，减少动态效果时直接切换", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 390, height: 700 });
  await page.goto("/");
  const panel = page.locator("aside");
  await expect(
    page.getByRole("button", { name: "打开侧栏", exact: true }),
  ).toBeVisible();
  for (const opening of [true, false]) {
    const frames = await panel.evaluate(async (element, opening) => {
      const scrim = element.parentElement!.previousElementSibling!;
      const toggle = opening
        ? document.querySelector<HTMLButtonElement>(
            "header button[aria-controls]",
          )!
        : element.querySelector<HTMLButtonElement>("button[aria-controls]")!;
      toggle.click();
      const frames = [];
      for (let i = 0; i < 90; i++) {
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve()),
        );
        const { x, width } = element.getBoundingClientRect();
        const opacity = Number(getComputedStyle(scrim).opacity);
        frames.push({ x, width, opacity });
        if (
          opening
            ? x === 0 && opacity === 1
            : getComputedStyle(element).visibility === "hidden"
        )
          break;
      }
      return frames;
    }, opening);
    expect(
      frames.some(
        ({ x, width, opacity }) =>
          x > -width + 1 && x < -1 && opacity > 0 && opacity < 1,
      ),
    ).toBe(true);
    const end = frames.at(-1)!;
    expect(end.x).toBe(opening ? 0 : -end.width);
    expect(end.opacity).toBe(opening ? 1 : 0);
  }

  await page.emulateMedia({ reducedMotion: "reduce" });
  const expand = page.getByRole("button", { name: "打开侧栏", exact: true });
  await expand.click();
  await expect(
    page.getByRole("button", { name: "收起侧栏", exact: true }),
  ).toBeFocused();
  expect(
    await panel.evaluate(
      (element) => element.getAnimations({ subtree: true }).length,
    ),
  ).toBe(0);
  expect((await panel.boundingBox())!.x).toBe(0);
  await page.keyboard.press("Escape");
  await expect(panel).toHaveCSS("visibility", "hidden");
  await expect(expand).toBeFocused();
  // A closed drawer and scrim must not intercept the composer or header.
  await page
    .getByRole("textbox", { name: "输入消息" })
    .fill("减少动态效果仍可输入");
  await page.setViewportSize({ width: 1200, height: 820 });
  await page.getByRole("button", { name: "收起侧栏", exact: true }).click();
  await expect(panel).toHaveCSS("visibility", "hidden");
  expect(
    await panel.evaluate(
      (element) =>
        element.parentElement!.getAnimations({ subtree: true }).length,
    ),
  ).toBe(0);
  expect((await page.getByRole("main").boundingBox())!.x).toBe(0);
});
