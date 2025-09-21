---
title: v-smart-name 指令：这是最佳实践吗？用到哪些关键技术？（总结与维护手册）
date: 2025-09-19
tags: [i18n, Emoji/字素簇, UI/UX]
---

**Web 前端在跨语言可变长度文本稳定展示上的最佳实践组合**

- **优先 CSS，必要时 JS**：单/多行用 `text-overflow` 与 `-webkit-line-clamp`，仅在需要“中间省略”或“宽度精控”时使用 JS。
- **字素簇安全**：`Intl.Segmenter({ granularity: 'grapheme' })`，避免“切半个 emoji/合字”。
- **像素级自适配**：`canvas.measureText` 基于**真实字体**测宽，按容器宽度计算前后保留量。
- **稳定性**：`ResizeObserver + requestAnimationFrame` 合并重排；`MutationObserver` 只认“外部真实变更”；微任务级**抑制自触发**消除死循环。
- **可访问性**：`aria-label`/`title` 始终写**原文**，展示层可省略但 tooltip 不被污染。
- **布局约束**：`min-w-0 / flex-1 / shrink-0 / max-width: 100%` 等保证“可收缩、可省略”。

> 这不是“代码炫技”，而是把各层面坑位（i18n/布局/性能/可达性/稳定）都处理到位后的**工程化组合拳**。

---

# 关键技术清单（你团队以后快速复用的知识点）

## 1）显示策略分层

- **CSS 单/多行省略**：

  - 单行：`white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`
  - 多行：`display: -webkit-box; -webkit-line-clamp: N; -webkit-box-orient: vertical; overflow: hidden;`
  - 断行：`white-space: normal; word-break: break-word; overflow-wrap: anywhere; line-break: auto;`

- **JS 中间省略（仅必要时）**：保留首尾信息，适配各种宽度场景。

## 2）字素簇（grapheme）安全

- `Intl.Segmenter(..., { granularity: 'grapheme' })` 获取**可见字符**列表，避免截断 emoji/ZWJ/旗帜/变体等。
- **统一计数口径**：限制“40 个”指 **字素簇数** 而不是 code point 或字节。

## 3）像素级测量

- `canvas.getContext('2d').measureText()`，用元素**真实的 font 组合**（包含 `fontStyle/fontWeight/fontStretch/fontSize/fontFamily`）测宽，避免误差。
- **启发式扩展**（首尾交替增加字素数）在准确度和速度之间平衡；非常长字符串可加入**上限保护**。

## 4）观察器与渲染节流

- **ResizeObserver → rAF 合并**：RO 只做调度，实际渲染放到 `requestAnimationFrame`，一帧一次，避免连环触发。
- **MutationObserver 限定**：只在“外部真实变更”时更新 `original`；内部写 `textContent` 使用

  - `isInternalUpdate` 标记
  - `suppressMutations` 计数 + `queueMicrotask` 归零
    来**屏蔽本轮回调**。

- **脏检查**：`dataset` 缓存 `mode/lines`，相同样式不重复写，切断 RO 回路。

## 5）可访问性与 Tooltip 不污染

- `applyA11y(el, full, tooltip)`：`aria-label`/`title` 永远用**原文**（`state.original`），与展示层解耦。
- 可额外写 `data-sn-full` 供第三方 Tooltip 读取。

## 6）布局要点（避免“看似失效”的根因）

- Flex 行：**父容器**加 `min-w-0 w-full`，昵称列 `flex-1 min-w-0 overflow-hidden`，图标 `shrink-0`。
- Grid：昵称列用 `minmax(0, 1fr)`，单元格 `min-w-0 overflow-hidden`。
- 指令内部加 `max-width: 100%` 兜底。

## 7）SSR/Hydration

- 指令逻辑仅在 `mounted` 后生效；SSR 输出“原文 + CSS 类”即可。
- 若需 SSR 端的保守截断，可用**字素簇**先截至上限，再在客户端做像素级校正。

---

# 常见坑位与对应修复

- **为什么没有省略？**

  - 忘了 `min-w-0`，或者父容器没 `w-full`；
  - 有 `whitespace-nowrap` 抢戏；
  - 邻近图标未 `shrink-0` 导致宽度反复竞争。

- **死循环/高频渲染？**

  - RO 直接触发渲染（缺少 rAF 合并）；
  - MO 没屏蔽内部更新；
  - 每次都重写相同样式（缺少脏检查）。

- **tooltip 显示成“…”？**

  - 先写 `title` 再改 `textContent` 且同步了 `original`；
  - 现方案已用**抑制 + 末尾统一写原文**修复。

---

# 性能建议（列表/表格 1k+ 行）

- 能用 **`mode: 'one-line'|'multi-line'` 就不用 JS**；中间省略仅在确需保留首尾信息时开。
- 虚拟滚动场景：**只监听可见节点**；关闭 `observeText` 或在业务侧合并多次变更。
- 缓存测量：同一字体的 `measureText` 可复用 `ctx`；针对相同字符串（如重复昵称）可加 Map 缓存（注意容器宽不同仍要重算）。

---

# 维护与扩展建议

- **API 稳定面**：`mode | lines | tooltip | dirAuto | observeText | preferCSS` 已覆盖主需求，**保持最小化**。
- **扩展点**：

  - `maxGraphemes`：在显示前做**软限制**提示（不强制改写）；
  - `reservePx`：为右侧按钮预留像素边距（你的 `middleEllipsisByWidth` 已留参数）。

- **单测/E2E 建议**：

  - 文本集：英文/CJK/混排、emoji + ZWJ、长连续 token、RTL；
  - 布局：Flex/Grid、极窄/极宽容器；
  - 行为：窗口 resize、i18n 切换、快速多次更新；
  - 可达性：`title` 始终为原文。

---

# 80% 需求的“轻量版模板”（便于新页面快速落地）

> 不涉及你现有文件，只是**模板记忆**，以后复制即用。

- **模板类**：

  - 父：`flex items-center gap-2 min-w-0 w-full`
  - 名称：`flex-1 min-w-0 overflow-hidden`
  - 图标：`shrink-0`

- **指令参数**：

  - 单行：`v-smart-name="{ mode: 'one-line', tooltip: true }"`
  - 多行：`v-smart-name="{ mode: 'multi-line', lines: 2, tooltip: true }"`
  - 中间省略（确需首尾可见）：`v-smart-name="{ mode: 'middle-ellipsis', tooltip: true }"`

---

# 你现在这份实现的最终建议

- **保留现实现**作为**通用指令**；
- 在**高频列表**里默认用 `mode:'one-line'` 或 `multi-line`；只有“卡片标题保留首尾信息”等场景启用 `middle-ellipsis`；
- 把“布局辅助类”（`min-w-0 / w-full / flex-1 / shrink-0`）写进团队的**组件样式规范**或封装成小组件，减少踩坑。

有了这份总结，你们以后只需：**按模板摆对布局类 → 选对 mode →（必要时）打开中间省略**，其余细节交给指令即可。

---

title: 除了自定义指令，还能怎样封装“昵称稳定展示”？（多方案对比与最小片段）
date: 2025-09-19
tags:

- Vue3
- 组件设计
- Composable
- Tailwind 插件
- Web Components

---

# 结论速览

在你的指令已稳定可用的基础上，**更易维护/复用/测试**的替代封装主要有 5 种：
**函数式组件**、**renderless 组件**、**composable 钩子**、**Tailwind 插件（CSS 层标准化）**、**Web Component（跨框架）**。
推荐优先级：**函数式组件 ≥ renderless 组件 > composable > Tailwind 插件 > Web Component**。

---

# 1) 函数式组件 `<SmartNameText>`（推荐）

适合全站统一风格、可测试、可与三方 Tooltip 深度集成。

## 最小改动片段

```ts
// 上一行注释：声明 props，复用你指令的 options（无复杂逻辑粘贴）
export interface SmartNameProps {
  text: string;
  mode?: "one-line" | "multi-line" | "middle-ellipsis" | "auto";
  lines?: 1 | 2 | 3;
  tooltip?: boolean;
  dirAuto?: boolean;
}

// 上一行注释：在 <script setup> 内用 <SmartNameText :text="nickname" ... />
// 组件内部：用一个 <span ref> 承载，复用现有核心逻辑（segment/measure/ro/mo）
// 关键不同：title/aria 等“外部可见属性”由组件控制，避免指令和宿主元素干扰
```

```vue
<!-- 使用处最小替换 -->
-
<div
  class="ink-18 ... flex-1 min-w-0 overflow-hidden"
  v-smart-name="{ mode: 'one-line', tooltip: true }"
>{{ nickname }}</div>
+
<SmartNameText
  class="ink-18 ... flex-1 min-w-0 overflow-hidden"
  :text="nickname"
  mode="one-line"
  :tooltip="true"
/>
```

**优点**：边界清晰、易 mock/单测、与设计系统契合；SSR 更可控；Tooltip 可直接用组件库（`a-tooltip`/`el-tooltip`）。
**注意**：内部逻辑直接搬你指令 `mountSmartName` 的实现，换成 `onMounted/onUpdated/onBeforeUnmount` 管理观察器即可。

---

# 2) Renderless 组件（插槽暴露 display 与 attrs）

把计算和观察放到组件里，**展示交给插槽**，兼顾灵活性与可测试性。

## 最小改动片段

```vue
<!-- 上一行注释：renderless 组件用法示例 -->
<SmartName
  v-slot="{ display, attrs }"
  :text="nickname"
  mode="auto"
  :lines="2"
  :tooltip="true"
>
  <!-- 上一行注释：attrs 包含 aria-label/title/dir 等；display 是已处理的展示值 -->
  <span class="flex-1 min-w-0 overflow-hidden ink-18 ..." v-bind="attrs">{{ display }}</span>
</SmartName>
```

```ts
// 上一行注释：SmartName 内部仅负责：监听宽度/文本、计算中间省略、输出 {display, attrs}
expose({ display, attrs });
```

**优点**：展示完全面向业务自定义；逻辑封装在一个地方。
**适用**：不同页面需要不同标签结构/图标穿插的复杂排版。

---

# 3) Composable：`useSmartName(el, options)`（更轻、更贴近指令）

当你不想引入新组件、但又希望**按需控制**生命周期与依赖时。

## 最小改动片段

```ts
// 上一行注释：在页面组件里使用 composable，替代指令
const nameRef = ref<HTMLElement|null>(null)
onMounted(() => stop = useSmartName(nameRef.value!, { mode:'one-line', tooltip:true }))
onBeforeUnmount(() => stop?.())

// 上一行注释：模板中只留 ref，不再贴指令
<span ref="nameRef" class="flex-1 min-w-0 overflow-hidden ink-18 ...">{{ nickname }}</span>
```

```ts
// 上一行注释：useSmartName 内部直接搬你指令的核心（RO/MO/测量/tooltip 抑制）并返回 cleanup
export function useSmartName(el: HTMLElement, opts: Options) {
  /* 复用 mountSmartName */ return () => cleanup();
}
```

**优点**：代码最少、逻辑集中、易复用到 TS 逻辑层；
**注意**：团队成员要记得绑定 `ref` 和在正确生命周期调用。

---

# 4) Tailwind 插件：统一 CSS 语义类（覆盖 80% 场景）

把**单/多行省略**、断行策略做成可复用的工具类，**无 JS** 情况下先吃下大部分页面。

## 最小改动片段

```ts
// tailwind.config.js
plugin(({ addUtilities }) => {
  addUtilities({
    ".name-one-line": {
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
    },
    ".name-two-lines": {
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: "2",
      overflow: "hidden",
      whiteSpace: "normal",
      lineBreak: "auto",
      wordBreak: "break-word",
      overflowWrap: "anywhere",
      maxWidth: "100%",
    },
  });
});
```

```diff
- <span class="ink-18 ..." v-smart-name="{ mode:'multi-line', lines:2 }">{{ nickname }}</span>
+ <span class="ink-18 ... name-two-lines">{{ nickname }}</span>
```

**优点**：统一样式语义、极简、性能最好；
**限制**：遇到“中间省略”仍需 JS（组件/指令/钩子三选一）。

---

# 5) Web Component `<smart-name>`（跨框架/微前端）

当你的项目存在 **多技术栈**（Vue/React/纯 HTML）的复用需求。

## 最小改动片段

```ts
// 上一行注释：注册自定义元素，可跨框架使用
class SmartNameEl extends HTMLElement {
  static get observedAttributes() {
    return ["mode", "lines", "tooltip"];
  }
  connectedCallback() {
    /* init: 复用核心逻辑，监听 this.textContent */
  }
  attributeChangedCallback() {
    /* 变更时重算 */
  }
  disconnectedCallback() {
    /* cleanup */
  }
}
customElements.define("smart-name", SmartNameEl);
```

```html
<!-- 使用 -->
<smart-name mode="one-line" tooltip>王者荣耀👨‍👩‍👧‍👦的超级超长昵称</smart-name>
```

**优点**：框架无关、发布成独立包；
**成本**：事件/样式隔离、与框架路由/SSR 协作细节要额外处理。

---

# 什么时候用哪一种？

- **项目内统一、可测试、易接第三方 Tooltip** → 用 **函数式组件**。
- **布局复杂、需要将“显示值与属性”交回模板** → **renderless 组件**。
- **已有大量模板，不想改标签结构** → **指令** 或 **composable**。
- **只要单/多行省略** → **Tailwind 插件** 即可。
- **多技术栈/微前端共用** → **Web Component**。

---

# 你当前项目的落地建议（最少迁移成本）

1. **保留指令**用于历史页面；
2. 新页面/新组件统一用 **`<SmartNameText>` 函数式组件**；
3. Tailwind 配一套 `.name-one-line` / `.name-two-lines`，覆盖不需要“中间省略”的 80% 场景；
4. 列表/表格默认只用 CSS 类；\*\*仅当确需“中间省略”\*\*时，替换为组件（或启用 `mode:'middle-ellipsis'`）。

---

# 复用清单（复制即用）

- **布局模板**：父容器 `min-w-0 w-full`，文本列 `flex-1 min-w-0 overflow-hidden`，图标 `shrink-0`。
- **API 面**（组件/指令/钩子共用）：`mode | lines | tooltip | dirAuto | observeText | preferCSS`。
- **核心工具**：`segmentGraphemes` + `measureText` + `ResizeObserver -> rAF` + `MutationObserver 抑制`。
- **可达性约定**：`title/aria-label` 永远写原文；需要时额外输出 `data-sn-full`。

需要的话，我给你把**指令核心**提炼为 **`<SmartNameText>` 函数式组件的最小实现片段**（仅组件内部代码），以便你直接替换到项目里。

下面给你一个**可直接落地**的函数式组件（SFC）完整代码：`src/components/SmartNameText.vue`。
按你的要求：复杂逻辑处我在上一行加了注释。

```vue
<template>
  <!-- 上一行注释：可替换标签名，默认 span；displayText 为展示用文本，attrs 内含 aria/title/dir -->
  <component :is="tag" ref="elRef" v-bind="attrs" :style="inlineStyle">{{
    displayText
  }}</component>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

/** 组件 Props，与指令保持同一语义面（精简到最常用的） */
type Mode = "one-line" | "multi-line" | "middle-ellipsis" | "auto";
interface Props {
  /** 原始昵称文本（单一数据源） */
  text: string;
  /** 展示模式：默认 auto */
  mode?: Mode;
  /** 多行省略的行数 */
  lines?: 1 | 2 | 3;
  /** 是否展示 tooltip（使用原文） */
  tooltip?: boolean;
  /** 是否根据文本自动设置方向 */
  dirAuto?: boolean;
  /** auto 模式优先 CSS，多行装不下再退化到中间省略 */
  preferCSS?: boolean;
  /** 右侧预留像素（给按钮/图标留边，避免被完全吃掉） */
  reservePx?: number;
  /** 包裹元素标签名 */
  tag?: keyof HTMLElementTagNameMap;
}

/** 默认值 */
const props = withDefaults(defineProps<Props>(), {
  mode: "auto",
  lines: 2,
  tooltip: true,
  dirAuto: true,
  preferCSS: true,
  reservePx: 0,
  tag: "span",
});

/** 容器引用（用于测量与观察） */
const elRef = ref<HTMLElement | null>(null);

/** 展示文本（仅在 middle-ellipsis/auto 退化时会是省略文本；其余保持原文） */
const displayText = ref<string>(props.text);

/** 无障碍与 tooltip 属性（永远使用原文） */
const attrs = computed<Record<string, any>>(() => {
  const a: Record<string, any> = {
    "aria-label": props.text,
  };
  if (props.tooltip) a.title = props.text;
  if (props.dirAuto) a.dir = "auto";
  return a;
});

/** 内联样式（仅用于施加单/多行省略与兜底 maxWidth） */
const inlineStyle = ref<Record<string, string>>({});

/* --------------------- 工具函数 --------------------- */

/** 上一行注释：字素簇切分，避免把 emoji/合字切半；无 Intl.Segmenter 时退化为 Array.from */
const segmentGraphemes = (text: string): string[] => {
  try {
    // @ts-ignore
    const seg = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return Array.from(seg.segment(text), (s) => s.segment);
  } catch {
    return Array.from(text);
  }
};

/** 上一行注释：基于元素真实字体构建测量函数，保证像素宽度评估准确 */
const buildMeasure = (el: HTMLElement) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const cs = getComputedStyle(el);
  // 上一行注释：尽量完整地拼接 font 字串，减少不同平台误差
  const font = [
    cs.fontStyle,
    cs.fontVariant,
    cs.fontWeight,
    cs.fontStretch,
    cs.fontSize,
    cs.lineHeight === "normal" ? "" : `/${cs.lineHeight}`,
    cs.fontFamily,
  ]
    .filter(Boolean)
    .join(" ");
  ctx.font = font;
  return (s: string) => ctx.measureText(s).width;
};

/** 上一行注释：根据可用像素宽度做“中间省略”，首尾交替扩展确保可读性 */
const middleEllipsisByWidth = (
  text: string,
  el: HTMLElement,
  reservePx = 0
) => {
  const measure = buildMeasure(el);
  const max = el.clientWidth - reservePx;
  const ell = "…";
  if (!text) return text;
  if (measure(text) <= max) return text;
  if (max <= measure(ell)) return ell;

  const g = segmentGraphemes(text);
  let head = 1,
    tail = 1;
  // 上一行注释：启发式交替扩展首尾，直到超宽为止
  while (head + tail < g.length) {
    const candidate = g.slice(0, head).join("") + ell + g.slice(-tail).join("");
    const w = measure(candidate);
    if (w <= max) {
      if (head <= tail) head++;
      else tail++;
    } else {
      if (head <= tail) head--;
      else tail--;
      break;
    }
  }
  head = Math.max(0, head);
  tail = Math.max(0, tail);
  return g.slice(0, head).join("") + ell + g.slice(-tail).join("");
};

/* --------------------- 核心渲染逻辑 --------------------- */

/** 上一行注释：应用 CSS 单/多行省略（不改写文本），并设置兜底样式 */
const applyCssMode = (el: HTMLElement, mode: Mode, lines: number) => {
  const st = el.style;
  st.maxWidth = "100%"; // 兜底，避免突破父容器
  st.removeProperty("-webkit-line-clamp");
  st.removeProperty("display");
  st.removeProperty("-webkit-box-orient");
  st.removeProperty("white-space");
  st.removeProperty("text-overflow");
  st.removeProperty("overflow");
  st.removeProperty("word-break");
  st.removeProperty("overflow-wrap");
  st.removeProperty("line-break");

  if (mode === "one-line") {
    // 上一行注释：标准单行省略
    st.display = "block";
    st.whiteSpace = "nowrap";
    st.overflow = "hidden";
    st.textOverflow = "ellipsis";
  } else if (mode === "multi-line") {
    // 上一行注释：WebKit 多行省略 + CJK/长 token 断行策略
    st.display = "-webkit-box";
    st.overflow = "hidden";
    st.whiteSpace = "normal";
    (st as any)["-webkit-box-orient"] = "vertical";
    (st as any)["-webkit-line-clamp"] = String(lines);
    (st as any)["text-wrap"] = "pretty";
    st.lineBreak = "auto";
    st.wordBreak = "break-word";
    (st as any)["overflow-wrap"] = "anywhere";
  }
};

/** 上一行注释：根据 props.mode 渲染；auto 模式先尝试多行 CSS，溢出则退到中间省略 */
const render = () => {
  const el = elRef.value;
  if (!el) return;

  if (props.mode === "one-line") {
    applyCssMode(el, "one-line", props.lines);
    displayText.value = props.text; // 文本保持原文
    return;
  }

  if (props.mode === "multi-line") {
    applyCssMode(el, "multi-line", props.lines);
    displayText.value = props.text; // 文本保持原文
    return;
  }

  if (props.mode === "middle-ellipsis") {
    // 上一行注释：中间省略需要 nowrap+ellipsis，文本替换为省略版本
    const st = el.style;
    st.removeProperty("display");
    st.removeProperty("-webkit-line-clamp");
    st.whiteSpace = "nowrap";
    st.textOverflow = "ellipsis";
    st.overflow = "hidden";
    displayText.value = middleEllipsisByWidth(props.text, el, props.reservePx);
    return;
  }

  // 上一行注释：auto 模式：先 CSS 多行，如仍溢出则退到中间省略单行
  if (props.preferCSS) {
    applyCssMode(el, "multi-line", props.lines);
    displayText.value = props.text;
    // 上一行注释：下一帧读布局再判断是否溢出，避免同步读导致回流
    requestAnimationFrame(() => {
      if (!el) return;
      const overflowed =
        el.scrollHeight > el.clientHeight || el.scrollWidth > el.clientWidth;
      if (!overflowed) return;
      // 上一行注释：退化至单行中间省略
      const st = el.style;
      st.removeProperty("display");
      st.removeProperty("-webkit-line-clamp");
      st.whiteSpace = "nowrap";
      st.textOverflow = "ellipsis";
      st.overflow = "hidden";
      displayText.value = middleEllipsisByWidth(
        props.text,
        el,
        props.reservePx
      );
    });
  } else {
    // 上一行注释：不偏好 CSS，直接按中间省略处理
    const st = el.style;
    st.whiteSpace = "nowrap";
    st.textOverflow = "ellipsis";
    st.overflow = "hidden";
    displayText.value = middleEllipsisByWidth(props.text, el, props.reservePx);
  }
};

/* --------------------- 观察与调度 --------------------- */

/** 上一行注释：用 rAF 合并多次重算（RO 高频回调 → 每帧一次） */
let rafId = 0;
const scheduleRender = () => {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    rafId = 0;
    render();
  });
};

/** 上一行注释：ResizeObserver 只做调度，避免回调风暴 */
let ro: ResizeObserver | null = null;

onMounted(() => {
  // 上一行注释：初始化样式对象（供外部 class 叠加时也能兜底）
  inlineStyle.value = { maxWidth: "100%" };

  // 上一行注释：首帧渲染放到 nextTick，确保拿到最终尺寸
  nextTick(scheduleRender);

  if (elRef.value) {
    ro = new ResizeObserver(() => scheduleRender());
    ro.observe(elRef.value);
  }
});

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
  ro?.disconnect();
  ro = null;
});

/** 上一行注释：text 或尺寸相关 props 变化时重算 */
watch(
  () => [props.text, props.mode, props.lines, props.reservePx, props.preferCSS],
  () => scheduleRender()
);
</script>
```

---

## 为什么这个**组件**比“指令”更好

- **单一数据源，天然避免“tooltip 被省略文本污染”**
  组件用 `props.text` 作为**唯一真相源**，展示值与 `title/aria-label` 都从 props 计算；不像指令那样要在 DOM 里读/写 `textContent` 再配合 MutationObserver 抑制回调。

- **边界清晰，便于测试与类型约束**
  组件的输入/输出都在 Vue 的响应式体系内，**不用挂在宿主元素上**维护隐藏状态（dataset/私有字段）。JS 测量与观察的副作用在组件生命周期内，**单元测/E2E**都更好写。

- **更容易和 UI 库集成**
  直接把它包到 `<a-tooltip>`/`<el-tooltip>` 里即可；或者让它只产出 `displayText`，由父组件决定 Tooltip 形态。指令常常和三方组件的 DOM 结构/渲染时机打架。

- **SSR/Hydration 更可控**
  组件在 `onMounted` 后才做测量与 ResizeObserver；SSR 端仅输出原文。指令在宿主元素上改写文本，容易与框架的 hydration 对齐问题纠缠。

- **更易演进**
  后续要加“复制按钮”“右键菜单”“异步本地化”“统计埋点”，组件内部都能自然承载；指令则需要更多与宿主交互的约定。

> 指令仍有其用武之地（例如：**不想改 DOM 结构**、或**给历史页面做低侵入改造**），但**新页面/新功能**优先用组件，会让长期维护更轻松。
