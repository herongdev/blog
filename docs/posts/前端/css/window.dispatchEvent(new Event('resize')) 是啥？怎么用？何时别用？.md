---
title: window.dispatchEvent(new Event('resize'))是啥？怎么用？何时别用？
date: 2025-09-30
tags: []
---

## 一句话说明

`window.dispatchEvent(new Event('resize'))` 会**手动触发**浏览器的 `resize` 事件（合成事件），从而唤起**所有监听了窗口尺寸变化**的回调函数。它**不会真的改变窗口大小**，只是通知“有个 resize 发生了”。

---

## 基本用法

```ts
// 触发一次“窗口尺寸变化”的通知
window.dispatchEvent(new Event("resize"));
```

等价写法（带显式选项）：

```ts
// resize 不冒泡、不可取消，写不写都一样
window.dispatchEvent(
  new Event("resize", { bubbles: false, cancelable: false })
);
```

监听与触发：

```ts
const onResize = () => {
  // 执行你的自适应逻辑
};
window.addEventListener("resize", onResize);

// 需要时主动通知
window.dispatchEvent(new Event("resize"));

// 清理
window.removeEventListener("resize", onResize);
```

---

## 典型使用场景

1. **第三方库只监听了 `window.resize`**：比如图表/地图组件仅在 `resize` 回调里调用 `setSize()`，而你的 UI 通过侧栏收起、分割拖拽等方式**改变了可用宽高**，可以**手动派发**一次通知它重算。
2. **布局变化但没有真正改变窗口大小**：例如 CSS 动画、容器显示/隐藏导致内部尺寸变化。

> 注意：**派发事件不会触发布局计算**，浏览器是否回流/重绘取决于你的监听函数里做了什么。

---

## 事件特性与规范要点

- 事件类型：`Event`（历史上曾归类 UIEvent，不必强求）。
- **不冒泡**：`resize` 只在 `window` 上监听就行。
- **不可取消**：`event.preventDefault()` 没意义。
- **合成 vs. 原生**：合成的 `resize` 与用户真实拖拽窗口触发的 `resize` 在监听层面**等效**；但**不会改变 `innerWidth/innerHeight`**（它们由真实窗口大小决定）。

---

## 性能与防抖

**频繁派发**会让所有监听器都执行，可能导致卡顿。建议**节流/防抖**：

```ts
let raf = 0;
function notifyResize() {
  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    window.dispatchEvent(new Event("resize"));
    raf = 0;
  });
}

// 在分割条拖拽、面板显隐结束后调用
notifyResize();
```

或 lodash：

```ts
const notifyResize = _.debounce(() => {
  window.dispatchEvent(new Event("resize"));
}, 100);
```

---

## 与自定义事件的对比

如果你只想**局部通知**（不要惊动全局所有 `resize` 监听），可用 `CustomEvent` 自定义信号：

```ts
// 1) 定义频道
const EVT = "chart:resize";

// 2) 订阅（只在图表模块里）
window.addEventListener(EVT, () => chart.resize());

// 3) 派发（来源：父容器或布局管理器）
window.dispatchEvent(new CustomEvent(EVT));
```

**对比**

- `window.resize`：**全局广播**，简单粗暴，副作用大。
- `CustomEvent`：**定向频道**，更可控，可携带数据 `{ detail }`。
- **最佳**：若拿得到实例引用，**直接调用组件方法**（例如 `chartRef.resize()`），最可控、最省事。

---

## 什么时候**不建议**用 `dispatchEvent('resize')`

- 你**能拿到组件实例**并调用它的 `resize()` 或 `setSize()`。
- 大型页面里有**很多**对 `window.resize` 的监听（图表、编辑器、虚拟列表……）。全局派发会让它们都醒来，**性能不可控**。
- 想触发**媒体查询**或 CSS 断点重算——**做不到**。媒体查询基于真实窗口/容器尺寸，合成事件不改变这些值。

---

## 常见误区

- ❌ “派发 `resize` 会让浏览器回流并更新 `innerWidth`”
  ✔️ **不会**。`innerWidth/innerHeight` 只受真实窗口大小影响；回流是否发生取决于监听器做了什么。
- ❌ “给 `resize` 设置 `bubbles:true` 可以冒泡到 document/body”
  ✔️ 规范语义上 `resize` 不冒泡；就算你传了也没意义。
- ❌ “多派发几次更稳”
  ✔️ 过度派发只会放大抖动与性能消耗；**一次即可**，必要时用 rAF/防抖。

---

## 实战建议（来自工程实践）

1. **优先直呼 API**：能 `ref.resize()` 就别全局派发（副作用小、链路短）。
2. **退而求其次**：需要兼容只监听 `window.resize` 的三方库时，**单点派发一次**即可。
3. **配合布局策略**：在 `Split.js` 调整完尺寸、或面板显隐的**下一帧**再派发，避免读取旧尺寸。
4. **与 `ResizeObserver` 搭配**：容器尺寸变化 → `requestAnimationFrame` → 调 `ref.resize()`；**只有当拿不到 ref 时**再派发全局事件兜底。

---

## 代码模板（工程版）

```ts
// 优先：直接调用
function resizeChart() {
  chartRef?.resize?.();
}

// 兜底：全局事件（谨慎使用）
function notifyGlobalResize() {
  window.dispatchEvent(new Event("resize"));
}

// 统一入口：先尝试直呼，失败才全局
let raf = 0;
export function smartResize() {
  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    if (chartRef?.resize) {
      chartRef.resize();
    } else {
      window.dispatchEvent(new Event("resize"));
    }
    raf = 0;
  });
}
```

---

## 小结

- `window.dispatchEvent(new Event('resize'))` 是一把**万能广播**的扳手：简单、粗暴、通用。
- 但在可维护性与性能上，**直呼组件 API > 自定义事件 > 全局 resize**。
- 在复杂布局（Flex/Split）里，配合 `min-w-0 / min-h-0` 与 `ResizeObserver`，自适应更可靠。
