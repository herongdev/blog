---
title: 在 Vite+Vue3 中实现 `v-smart-name` 指令：多语言昵称稳定展示的最佳实践
date: 2025-09-19
tags: [Vue3, Vite, i18n, 指令, UI/UX]
---

# 方案总览

目标：封装一个 **自定义指令 `v-smart-name`**，统一处理**单/多行省略**、**中间省略**、**CJK/RTL 断行**、**emoji/合字（grapheme）安全截断**、**容器宽度自适应**、**无障碍与 Tooltip**，并兼顾 **性能（ResizeObserver/MutationObserver）** 与 **SSR/Hydration**。

> 原则：**能用 CSS 就不用 JS**；只有在需要**中间省略**或**像素级控制**时才启用测量与截断逻辑。

---

# 使用方式（开箱即用）

```vue
<template>
  <!-- 单行省略（纯 CSS） -->
  <span v-smart-name="{ mode: 'one-line', tooltip: true }">{{ nick }}</span>

  <!-- 两行省略（纯 CSS），可选 2~3 行 -->
  <span v-smart-name="{ mode: 'multi-line', lines: 2, tooltip: true }">{{
    nick
  }}</span>

  <!-- 中间省略（JS 宽度驱动，字素安全） -->
  <span
    class="name-cell"
    v-smart-name="{ mode: 'middle-ellipsis', tooltip: true }"
    >{{ nick }}</span
  >

  <!-- 自动模式：优先 CSS，容器过窄时退化为中间省略 -->
  <span v-smart-name="{ mode: 'auto', lines: 2, tooltip: true }">{{
    nick
  }}</span>
</template>
```

---

# 安装与注册

```ts
// src/directives/smartName.ts
import type { DirectiveBinding } from "vue";

type Mode = "one-line" | "multi-line" | "middle-ellipsis" | "auto";

interface SmartNameOptions {
  mode?: Mode;
  lines?: 1 | 2 | 3;
  tooltip?: boolean;
  dirAuto?: boolean;
  maxGraphemes?: number; // 统一的后端/前端存储上限（字素簇），可选
  preferCSS?: boolean; // auto 模式下更保守使用 CSS
  observeText?: boolean; // 监听文本节点变更
}

type El = HTMLElement & { __smartName?: ReturnType<typeof mountSmartName> };

const DEFAULTS: Required<Omit<SmartNameOptions, "maxGraphemes">> = {
  mode: "auto",
  lines: 2,
  tooltip: true,
  dirAuto: true,
  preferCSS: true,
  observeText: true,
};

// 上一行注释：字素簇切分，避免切断 emoji/合字；无 Intl.Segmenter 时退化为 [...str]
const segmentGraphemes = (text: string): string[] => {
  try {
    // @ts-ignore
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(text), (s) => s.segment);
  } catch {
    return Array.from(text);
  }
};

// 上一行注释：构建测量上下文，读取元素实际字体样式以精确测宽
const buildMeasure = (el: HTMLElement) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const cs = getComputedStyle(el);
  ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  return (s: string) => ctx.measureText(s).width;
};

// 上一行注释：根据容器像素宽度进行“中间省略”，尽量保留首尾可辨识信息
const middleEllipsisByWidth = (
  text: string,
  el: HTMLElement,
  reservePx = 0
) => {
  const measure = buildMeasure(el);
  const max = el.clientWidth - reservePx;
  const ell = "…";
  if (!text || measure(text) <= max) return text;

  const g = segmentGraphemes(text);
  // 上一行注释：二分/双指针会更快；此处采用逐步扩展首尾的启发式
  let headCount = 1,
    tailCount = 1;
  // 上一行注释：极窄容器保护
  if (max <= measure(ell)) return ell;

  while (headCount + tailCount < g.length) {
    const candidate =
      g.slice(0, headCount).join("") + ell + g.slice(-tailCount).join("");
    const w = measure(candidate);
    if (w <= max) {
      // 上一行注释：尝试再多留一点字符（交替扩展首尾）
      if (headCount <= tailCount) headCount++;
      else tailCount++;
    } else {
      // 上一行注释：回退上一次成功值
      if (headCount <= tailCount) {
        headCount--;
      } else {
        tailCount--;
      }
      break;
    }
  }
  headCount = Math.max(0, headCount);
  tailCount = Math.max(0, tailCount);
  return g.slice(0, headCount).join("") + ell + g.slice(-tailCount).join("");
};

// 上一行注释：应用/清理 CSS 样式类，用于单/多行省略与断行策略
const applyCssMode = (el: HTMLElement, mode: Mode, lines: number) => {
  el.style.removeProperty("-webkit-line-clamp");
  el.style.removeProperty("display");
  el.style.removeProperty("-webkit-box-orient");
  el.style.removeProperty("white-space");
  el.style.removeProperty("text-overflow");
  el.style.removeProperty("overflow");
  el.style.removeProperty("word-break");
  el.style.removeProperty("overflow-wrap");
  el.style.removeProperty("line-break");

  if (mode === "one-line") {
    // 上一行注释：单行省略
    el.style.display = "block";
    el.style.whiteSpace = "nowrap";
    el.style.overflow = "hidden";
    el.style.textOverflow = "ellipsis";
  } else if (mode === "multi-line") {
    // 上一行注释：多行省略（2~3 行）
    el.style.display = "-webkit-box";
    el.style.overflow = "hidden";
    (el.style as any)["-webkit-box-orient"] = "vertical";
    (el.style as any)["-webkit-line-clamp"] = String(lines);
    (el.style as any)["text-wrap"] = "pretty";
    el.style.lineBreak = "auto";
    el.style.wordBreak = "break-word";
    (el.style as any)["overflow-wrap"] = "anywhere";
  }
};

// 上一行注释：设置 Tooltip / 无障碍信息
const applyA11y = (
  el: HTMLElement,
  fullText: string,
  enableTooltip: boolean
) => {
  el.setAttribute("aria-label", fullText);
  if (enableTooltip) {
    el.setAttribute("title", fullText);
  } else {
    el.removeAttribute("title");
  }
};

// 上一行注释：核心挂载逻辑，按模式执行，并监听尺寸与文本变化
const mountSmartName = (el: HTMLElement, opts: SmartNameOptions) => {
  const cfg = { ...DEFAULTS, ...opts };
  const original = () => el.textContent ?? "";

  // 上一行注释：根据模式渲染一次
  const render = () => {
    const full = original();
    if (cfg.dirAuto) el.setAttribute("dir", "auto");
    applyA11y(el, full, cfg.tooltip);

    if (cfg.mode === "one-line" || cfg.mode === "multi-line") {
      applyCssMode(el, cfg.mode, cfg.lines);
      // 上一行注释：CSS 模式无需改写文本，浏览器负责省略
      return;
    }

    if (cfg.mode === "middle-ellipsis") {
      // 上一行注释：中间省略使用测量并直接替换文本
      el.style.overflow = "hidden";
      const display = middleEllipsisByWidth(full, el);
      el.textContent = display;
      return;
    }

    // 上一行注释：auto 模式：先尝试 CSS（多行），不够再退化为中间省略
    if (cfg.preferCSS) {
      applyCssMode(el, "multi-line", cfg.lines);
      // 上一行注释：如果 CSS 已经能装下，就不动文本；否则使用中间省略
      // 粗略检测：滚动高度 > clientHeight 视为溢出
      const overflowed =
        el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
      if (!overflowed) return;
    }
    // 上一行注释：退化为中间省略
    el.style.removeProperty("display");
    el.style.removeProperty("-webkit-line-clamp");
    el.style.whiteSpace = "nowrap";
    el.style.textOverflow = "ellipsis";
    el.style.overflow = "hidden";
    el.textContent = middleEllipsisByWidth(original(), el);
  };

  // 上一行注释：尺寸变化时重算
  const ro = new ResizeObserver(() => render());
  ro.observe(el);

  // 上一行注释：文本变化（例如 i18n 切换、数据更新）时重算
  const mo = cfg.observeText ? new MutationObserver(() => render()) : null;
  if (mo)
    mo.observe(el, { childList: true, characterData: true, subtree: true });

  // 首次渲染
  // 上一行注释：等待一帧获取到最终样式与尺寸，避免首次测量不准
  const raf = requestAnimationFrame(render);

  // 上一行注释：卸载清理函数
  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    mo?.disconnect();
  };
};

export default {
  mounted(el: El, binding: DirectiveBinding<SmartNameOptions>) {
    el.__smartName = mountSmartName(el, binding.value || {});
  },
  updated(el: El, binding: DirectiveBinding<SmartNameOptions>) {
    // 上一行注释：参数变更时重新挂载（简单稳妥）
    el.__smartName?.();
    el.__smartName = mountSmartName(el, binding.value || {});
  },
  unmounted(el: El) {
    el.__smartName?.();
  },
};
```

```ts
// src/main.ts 中注册
import { createApp } from "vue";
import App from "./App.vue";
import SmartName from "./directives/smartName";

const app = createApp(App);
app.directive("smart-name", SmartName);
app.mount("#app");
```

---

# 设计细节与取舍

## 1）模式选择

- **one-line / multi-line**：纯 CSS，**性能最佳**，适用于大多数列表/卡片标题；不会“切半个 emoji”。
- **middle-ellipsis**：当你需要保留前后关键信息（例如“张三…认证”）时使用；**字素簇安全**，但需要测量与监听，开销略高。
- **auto**：先走 CSS，多行放不下再退化到中间省略；兼顾**观感与性能**。

## 2）断行与混排

- 指令内部设置：`line-break: auto`、`word-break: break-word`、`overflow-wrap: anywhere`，兼顾 CJK 与长 token。
- 方向性：默认 `dir="auto"`，避免 RTL 文本影响周边布局。

## 3）可访问性

- 自动为元素设置 `aria-label` 与（可选）`title`。
- 移动端可结合长按/点击弹出完整昵称（此指令侧重展示，不含交互弹层）。

## 4）性能策略

- 仅在 **middle-ellipsis/auto 退化** 时进行**像素测量**与**ResizeObserver**。
- 使用 **MutationObserver** 监听文本变化，避免频繁主动调用。
- 在虚拟滚动场景中，尽量把 `mode` 设为 CSS 类（one-line/multi-line），降低重排成本。

## 5）SSR 与 Hydration

- 指令在 `mounted` 后才执行测量，不影响 SSR。
- 如需 SSR 同构时提前输出省略文本，可在服务端根据**最大列宽**做保守字素截断（非必需）。

---

# 与 UI 布局配合的关键点

```css
/* 常见网格布局：头像 | 名字 | 操作 */
.row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 8px;
}
.name-cell {
  min-width: 0; /* 关键：允许收缩从而触发省略 */
}
```

---

# 扩展：统一“后端存储上限”为字素簇

在表单提交前可做一次**字素簇长度**校验，避免 DB 端按字节/字符截断：

```ts
// 上一行注释：表单提交前校验，避免把合成 emoji 切断
const withinLimit = (name: string, max = 40) =>
  segmentGraphemes(name).length <= max;
```

---

# 测试清单（建议纳入单测/截图回归）

1. CJK、英文、混排、长连续 token（无空格）、emoji 及 ZWJ 合成。
2. RTL（阿拉伯语/希伯来语）混排与 `dir="auto"`。
3. 极窄容器（仅显示 `…`）、超宽容器（不省略）。
4. lines=2/3 的多行省略在移动端/桌面端表现一致。
5. i18n 切换导致文本更新时的重渲染。
6. 虚拟列表 1000+ 行的滚动性能（CSS 模式优先）。

---

# 最简用例（可直接拷贝到项目）

```vue
<template>
  <div class="row">
    <img src="/avatar.png" width="28" height="28" />
    <!-- 上一行注释：两行优先，放不下自动中间省略，带无障碍与 tooltip -->
    <span
      class="name-cell"
      v-smart-name="{ mode: 'auto', lines: 2, tooltip: true }"
    >
      {{ nick }}
    </span>
    <button>关注</button>
  </div>
</template>
```

---

# 结论

- **最佳默认**：`mode: 'auto'` + `lines: 2`，优先 CSS，必要时中间省略。
- **需要保留首尾信息**：`mode: 'middle-ellipsis'`。
- **高性能列表/表格**：固定使用 `one-line` 或 `multi-line`，并保证网格 `min-width: 0`。
- **i18n 安全**：使用字素簇逻辑、`dir="auto"`、合理断行与无障碍元数据。

如需，我可以\*\*按你的组件库（AntD Vue/Element Plus/TDesign）\*\*给出针对性的最小适配片段（只改需要的代码）。
