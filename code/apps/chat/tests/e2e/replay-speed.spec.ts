import { test, expect } from "./fixtures";

test("[REPLAY-SPEED] 分档滑杆支持点击拖动、键盘、主题与窄屏，选择不会提交草稿", async ({
  page,
}) => {
  await page.goto("/");
  const draft = page.getByRole("textbox", { name: "输入消息" });
  await draft.fill("保留草稿");
  const trigger = page.getByRole("combobox", { name: "选择模型" });
  await trigger.click();
  const slider = page.getByRole("slider", { name: "回放速度" });
  await slider.focus();
  await slider.press("End");
  await expect(slider).toHaveAttribute("aria-valuetext", "4× 回放");
  await slider.press("ArrowLeft");
  await expect(slider).toHaveAttribute("aria-valuetext", "3× 回放");
  await slider.press("Home");
  await expect(slider).toHaveAttribute("aria-valuetext", "1× 回放");
  const box = (await slider.boundingBox())!;
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await expect(slider).toHaveAttribute("aria-valuetext", "2× 回放");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width - 8, box.y + box.height / 2, {
    steps: 5,
  });
  await page.mouse.up();
  await expect(slider).toHaveAttribute("aria-valuetext", "4× 回放");
  await page.screenshot({ path: "output/playwright/replay-speed-light.png" });
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toContainText("4× 回放");
  await expect(draft).toHaveValue("保留草稿");
  await expect(page.getByRole("article")).toHaveCount(0);
  await page.emulateMedia({ colorScheme: "dark" });
  await page.setViewportSize({ width: 375, height: 740 });
  await expect(page.locator("aside")).toHaveCSS("visibility", "hidden");
  await trigger.click();
  await expect(slider).toBeVisible();
  const narrow = (await slider.boundingBox())!;
  expect(narrow.x).toBeGreaterThanOrEqual(0);
  expect(narrow.x + narrow.width).toBeLessThanOrEqual(375);
  await slider.press("ArrowLeft");
  await page.screenshot({
    path: "output/playwright/replay-speed-dark-mobile.png",
  });
  await page.keyboard.press("Escape");
  await expect(trigger).toContainText("3× 回放");
});

test("[REPLAY-MOTION] 五档颜色独立、粒子随速度加快，减少动态效果时停用动画", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("combobox", { name: "选择模型" }).click();
  const slider = page.getByRole("slider", { name: "回放速度" });
  await slider.focus();
  await slider.press("Home");
  const colors: string[] = [];
  for (const [index, speed] of [1, 1.5, 2, 3, 4].entries()) {
    if (index) await slider.press("ArrowRight");
    await expect(slider).toHaveAttribute("aria-valuetext", `${speed}× 回放`);
    const root = page.locator(`[data-step="${index}"]`).filter({ has: slider });
    colors.push(
      await root
        .locator('[data-color][data-active="true"]')
        .evaluate((el) => getComputedStyle(el).backgroundImage),
    );
  }
  expect(new Set(colors).size).toBe(5);
  const fast = await slider.evaluate((el) => {
    const root = el.closest("[data-step]")!;
    const particle = root.querySelector('[class*="particles"] i')!;
    const thumb = root.querySelector('[class*="thumb-path"] > span')!;
    return {
      duration: parseFloat(getComputedStyle(particle).animationDuration),
      transition: parseFloat(getComputedStyle(thumb).transitionDuration),
      running: root
        .getAnimations({ subtree: true })
        .some((a) => a.playState === "running"),
    };
  });
  expect(fast.transition).toBeGreaterThan(0);
  expect(fast.running).toBe(true);
  await expect(page.locator('[data-color="4"][data-active="true"]')).toHaveCSS(
    "opacity",
    "1",
  );
  await expect
    .poll(() =>
      slider.evaluate((el) => {
        const root = el.closest("[data-step]")!;
        const thumb = root
          .querySelector('[class*="thumb-path"] > span')!
          .getBoundingClientRect();
        return Math.abs(thumb.right - el.getBoundingClientRect().right);
      }),
    )
    .toBeLessThan(1);
  await page.screenshot({ path: "output/playwright/replay-motion-fast.png" });
  await slider.press("Home");
  await slider.press("ArrowRight");
  const slow = await slider.evaluate((el) =>
    parseFloat(
      getComputedStyle(
        el.closest("[data-step]")!.querySelector('[class*="particles"] i')!,
      ).animationDuration,
    ),
  );
  expect(slow).toBeGreaterThan(fast.duration);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await slider.press("End");
  await expect(slider).toHaveAttribute("aria-valuetext", "4× 回放");
  await expect
    .poll(() =>
      slider.evaluate(
        (el) =>
          el
            .closest("[data-step]")!
            .getAnimations({ subtree: true })
            .filter((a) => a.playState === "running").length,
      ),
    )
    .toBe(0);
  await page.keyboard.press("Escape");
  await expect(slider).toHaveCount(0);
});
