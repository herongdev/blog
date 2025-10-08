---
title: 深入理解 ResizeObserver —— API、回调参数与实战（含 Vue 示例）
tags: [Web apis, 性能优化, 前端基础]
---

# 一文吃透 ResizeObserver：它解决了什么问题？如何使用？回调入参 entries 的每个属性（contentRect、borderBoxSize、contentBoxSize、devicePixelContentBoxSize、target）到底代表什么？observe 的 box 选项怎么选？附跨浏览器坑位、性能与 Vue 组合式写法

# 目录

- 概览
- 快速上手
- API 详解
- 回调参数 `entries` 逐项拆解
- 观察选项 `box` 如何选择
- 常见用法模式（含你的 Split 示例）
- 在 Vue 3 中的优雅使用
- 性能与坑位
- 调试清单
- 速查表

---

## 概览

`ResizeObserver` 用于**观察某个元素的盒子尺寸变化**（而不是窗口尺寸）。与传统 `window.onresize` 不同，它能监听**任意元素**的宽高变化（内容尺寸、边框盒、设备像素盒），典型场景：

- 自适应组件（图表、编辑器、分栏、虚拟列表）
- 容器查询的补充（了解容器尺寸，触发内部布局变化）
- 拖拽、折叠面板、Split-pane 布局联动

---

## 快速上手

```ts
// 复杂逻辑：创建观察者，回调在元素尺寸变化时被批处理调用（微任务之后、绘制前后）
const ro = new ResizeObserver((entries, observer) => {
  for (const entry of entries) {
    // entry 是 ResizeObserverEntry
    const el = entry.target as HTMLElement;

    // contentRect 是旧接口，读内容盒的宽高（不含 padding + border）
    const { width, height } = entry.contentRect;

    // 新接口，读“内容盒”尺寸（数组是为多片段布局准备的）
    const contentInline = entry.contentBoxSize?.[0]?.inlineSize;
    const contentBlock = entry.contentBoxSize?.[0]?.blockSize;

    console.log(
      "元素",
      el,
      "内容宽高",
      width,
      height,
      "inline/block",
      contentInline,
      contentBlock
    );
  }
});

// 开始观察某元素（默认观察 content-box）
ro.observe(document.querySelector("#box")!);

// 停止观察某元素
// ro.unobserve(document.querySelector('#box')!)

// 断开所有观察
// ro.disconnect()
```

---

## API 详解

### 构造函数

```ts
const ro = new ResizeObserver(callback);
```

- `callback(entries, observer)`：**尺寸变化**被批处理后调用。**不要**在回调里同步反复修改被观察元素尺寸，否则可能触发 `ResizeObserver loop limit exceeded`。

### 实例方法

- `observe(target: Element, options?: { box?: 'content-box' | 'border-box' | 'device-pixel-content-box' })`
- `unobserve(target: Element)`
- `disconnect()`

> `box` 含义见后文；不传则等价于 `{ box: 'content-box' }`。

---

## 回调参数 `entries` 逐项拆解

回调签名：

```ts
type ResizeObserverCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver
) => void;
```

`entries` 是一组 `ResizeObserverEntry`，每个 entry 对应一个发生了尺寸变化的元素。

**ResizeObserverEntry 的属性：**

1. `target: Element`
   被观察的元素（你的代码里就是 `div.split-horizontal.w-full`）。

2. `contentRect: DOMRectReadOnly`（**旧接口**，仍被广泛使用）

- 表示**内容盒（content-box）**的矩形：`x, y, width, height, top, right, bottom, left`
- 不含 `padding` / `border` / `margin`。
- 局限：只能读内容盒；新接口能更灵活区分不同盒模型。

3. `contentBoxSize: ResizeObserverSize[]`（**新接口**）

- 表示**内容盒**的尺寸集合（数组是为多片段容器准备的，大多数情况下只有一项）。
- 每一项是 `ResizeObserverSize`：

  - `inlineSize`: 写入方向的尺寸（在水平书写中等同 width）
  - `blockSize` : 块方向的尺寸（在水平书写中等同 height）

- **优点**：与书写模式（writing-mode）无关，比 `width/height` 更国际化。

4. `borderBoxSize: ResizeObserverSize[]`（**新接口**）

- 表示**边框盒**（包括 `padding` + `border`）的尺寸（多数情况仅一项）。
- 当你需要与 CSS `box-sizing: border-box;` 对齐时，应使用它。

5. `devicePixelContentBoxSize: ResizeObserverSize[]`（**新接口**）

- 表示**设备像素级**的内容盒尺寸，已经乘上 `devicePixelRatio`。
- 渲染位图（如 `<canvas>`、高 DPI 图表）时很有用，可减少模糊。

> 兼容性提示：老版 Safari 可能返回 `borderBoxSize` 等为**对象**而非数组，或没有这些属性。要写**兼容代码**（见下文）。

---

## 观察选项 `box` 如何选择

在 `observe(el, { box })` 里可以指定观测哪种盒子：

- `content-box`（默认）：**内容**区域尺寸变化才触发；适合根据内容变化重排。
- `border-box`：包含 `padding + border`；与 `box-sizing: border-box` 设计一致，常用于与布局尺寸对齐。
- `device-pixel-content-box`：内容盒的**设备像素**尺寸（乘上 DPR）；适合 Canvas/图表等需要像素级精度的场景。

**选择建议：**

- 你的场景如果是**计算分栏/剩余宽度**，通常选 `border-box` 更直观；
- 需要高分屏绘图 → 选 `device-pixel-content-box`；
- 默认不指定也能用，但读值时记得从对应的 `*BoxSize` 里拿。

---

## 常见用法模式（含你的 Split 示例）

### 模式 1：读取“内容盒”宽高（兼容写法）

```ts
function getContentSize(entry: ResizeObserverEntry) {
  // 复杂逻辑：优先用新接口；兼容老浏览器回退到 contentRect
  const cb = Array.isArray(entry.contentBoxSize)
    ? entry.contentBoxSize[0]
    : (entry as any).contentBoxSize; // 某些 Safari 旧版是对象
  const width = cb?.inlineSize ?? entry.contentRect.width;
  const height = cb?.blockSize ?? entry.contentRect.height;
  return { width, height };
}
```

### 模式 2：读取“边框盒”宽高（与 border-box 对齐）

```ts
function getBorderBoxSize(entry: ResizeObserverEntry) {
  const bb = Array.isArray(entry.borderBoxSize)
    ? entry.borderBoxSize[0]
    : (entry as any).borderBoxSize;
  // 回退到 contentRect 以避免 undefined
  const width = bb?.inlineSize ?? entry.contentRect.width;
  const height = bb?.blockSize ?? entry.contentRect.height;
  return { width, height };
}
```

### 模式 3：高 DPI Canvas 自适应

```ts
const ro = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const dpcb = Array.isArray(entry.devicePixelContentBoxSize)
      ? entry.devicePixelContentBoxSize[0]
      : (entry as any).devicePixelContentBoxSize;

    const dpr = window.devicePixelRatio || 1;
    const cssW = entry.contentRect.width;
    const cssH = entry.contentRect.height;
    const pixelW = dpcb?.inlineSize ?? Math.round(cssW * dpr);
    const pixelH = dpcb?.blockSize ?? Math.round(cssH * dpr);

    // 复杂逻辑：canvas 实际像素用设备像素，样式尺寸保持 CSS 像素一致
    canvas.width = pixelW;
    canvas.height = pixelH;
    canvas.style.width = cssW + "px";
    canvas.style.height = cssH + "px";
  }
});
ro.observe(canvas, { box: "device-pixel-content-box" });
```

### 模式 4：你的 Split-pane 场景

```ts
// 复杂逻辑：观察容器宽度变化，动态设置左右面板尺寸
const horizontalSplitObserver = new ResizeObserver((entries) => {
  const entry = entries[0];
  // 用 border-box 保证与布局占位一致
  const { width: containerWidth } = getBorderBoxSize(entry);

  if (horizontalSplit) {
    horizontalSplit.setSizes([
      sidebarPanelWidth.value,
      containerWidth - sidebarPanelWidth.value,
    ]);
  }
});
horizontalSplitObserver.observe(
  document.querySelector(".split-horizontal.w-full") as Element,
  { box: "border-box" }
);
```

---

## 在 Vue 3 中的优雅使用

```ts
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
let ro: ResizeObserver | null = null

// 复杂逻辑：封装读取尺寸的兼容工具
function readBorderBox(entry: ResizeObserverEntry) {
  const bb = Array.isArray(entry.borderBoxSize)
    ? entry.borderBoxSize[0]
    : (entry as any).borderBoxSize
  const width  = bb?.inlineSize ?? entry.contentRect.width
  const height = bb?.blockSize  ?? entry.contentRect.height
  return { width, height }
}

onMounted(() => {
  ro = new ResizeObserver((entries) => {
    const entry = entries[0]
    const { width } = readBorderBox(entry)
    // 复杂逻辑：这里做布局联动（如 setSizes / 重新渲染图表）
    // updateLayout(width)
  })
  if (containerRef.value) {
    ro.observe(containerRef.value, { box: 'border-box' })
  }
})

onBeforeUnmount(() => {
  ro?.disconnect()
  ro = null
})
</script>

<template>
  <div ref="containerRef" class="w-full h-full">
    <!-- your content -->
  </div>
</template>
```

---

## 性能与坑位

1. **批处理调用**
   回调不会为每次微小变化都同步触发，浏览器会**合并/节流**。避免在回调内做昂贵计算，可加自节流/防抖。

2. **循环限制错误**
   如果回调中**修改了被观察元素的尺寸**，且导致持续触发，会报：

   > _ResizeObserver loop limit exceeded_
   > 解决：在 `requestAnimationFrame`、`setTimeout(0)` 或下一个 tick 再修改 DOM；或把变更施加到**非被观察元素**。

3. **老浏览器兼容**

   - 旧 Safari 可能将 `*BoxSize` 暴露为**对象**而不是数组；或缺失这些属性（仅有 `contentRect`）。
   - 写 **Array/对象双兼容** 与 **`contentRect` 回退** 的读取逻辑。

4. **避免多余观察**
   同一个元素不要重复 `observe`；同页面过多观察者需注意内存与回调开销。

5. **与 MutationObserver 区分**

   - `ResizeObserver` 关注**尺寸**；
   - `MutationObserver` 关注**DOM 结构/属性**；
   - `IntersectionObserver` 关注**可见性/交叉状态**。
     目标不同，不可互代。

---

## 调试清单

- ✅ 回调是否触发？（尝试改变容器尺寸，或给目标元素加边框确认）
- ✅ `observe` 的元素是否**可渲染且在文档中**？
- ✅ 读取的是哪个盒模型？（`contentRect` vs `borderBoxSize`）
- ✅ 是否有循环更改导致 loop exceeded？
- ✅ 是否做了兼容读取（数组/对象/回退到 `contentRect`）？
- ✅ 在组件卸载时 `disconnect()` 了吗？

---

## 速查表

**构造：**

```ts
new ResizeObserver((entries, observer) => { ... })
```

**Entry 属性：**

- `target: Element`
- `contentRect: DOMRectReadOnly` ➜ 内容盒矩形（旧）
- `contentBoxSize: ResizeObserverSize[]`
- `borderBoxSize: ResizeObserverSize[]`
- `devicePixelContentBoxSize: ResizeObserverSize[]`

**ResizeObserverSize：**

- `inlineSize`（水平书写 ≈width）
- `blockSize`（水平书写 ≈height）

**方法：**

```ts
ro.observe(el, {
  box: "content-box" | "border-box" | "device-pixel-content-box",
});
ro.unobserve(el);
ro.disconnect();
```

---

### 小结

- **entries[0].contentRect**：内容盒 `width/height`（旧、通用）。
- **entries[0].contentBoxSize[0].inlineSize/blockSize**：内容盒 size（新、书写模式友好）。
- **entries[0].borderBoxSize[0]...**：边框盒 size（与 `border-box` 布局一致）。
- **entries[0].devicePixelContentBoxSize[0]...**：设备像素级内容盒（高 DPI 渲染）。

在你的分栏（Split）场景：

> 选 `border-box` + 兼容读取 + 异步修改尺寸（必要时 `requestAnimationFrame`），最稳。
