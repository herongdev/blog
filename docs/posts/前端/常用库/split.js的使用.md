---
title: 测试文章
description: <一句话摘要，便于 SEO>
date: 2025-09-09
tags: [<标签1>, <标签2>]
# 可选：用于排序，数字越小越靠前
# weight: 10
---

# **Split.js** 配置项

## 1. `direction: 'horizontal'`

- **作用**：设置分割方向。
- **可选值**：
  - `'horizontal'`：左右分割（垂直分隔条）。
  - `'vertical'`：上下分割（水平分隔条）。
- **这里的用法**：`'horizontal'` 表示左边是 SymbolList，右边是 ChartPanel。

## 2. `sizes: [sidebarPanelWidth.value, containerWidth - sidebarPanelWidth.value]`

- **作用**：设置两个面板的初始尺寸（像素或百分比）。
- **值的含义**：
  - 第一个值：左侧面板宽度（这里是 `sidebarPanelWidth.value`）。
  - 第二个值：右侧面板宽度（容器总宽度减去左侧宽度）。
- **注意**：如果传百分比（如 `[30, 70]`），则按比例分配；传像素值则按固定像素。

## 3. `minSize: [0, 0]`

- **作用**：设置每个面板的最小尺寸。
- **值的含义**：
  - `[0, 0]` 表示两个面板都可以被拖到 0 像素（完全隐藏）。
- **常见用法**：防止面板被拖得太小导致内容不可见，比如 `[200, 300]`。

## 4. `maxSize: [tableWidth, Infinity]`

- **作用**：设置每个面板的最大尺寸。
- **值的含义**：
  - 第一个值：左侧最大宽度是 `tableWidth`（表格宽度）。
  - 第二个值：右侧最大宽度无限制（`Infinity`）。
- **用途**：避免左侧面板被拖得过宽，影响右侧内容显示。

## 5. `gutterSize: 8`

- **作用**：分隔条的宽度（水平分割时是宽度，垂直分割时是高度）。
- **值的含义**：`8` 表示分隔条宽度为 8 像素。

## 6. `snapOffset: chartPanelHeight.value < 10 ? 0 : 10`

- **作用**：拖动时的“吸附”距离。
- **值的含义**：
  - 如果 `chartPanelHeight` 小于 10，则吸附距离为 0（无吸附）。
  - 否则为 10 像素，表示拖动接近边界 10 像素时会自动吸附到边界。
- **用途**：提升拖动体验，方便快速收起或展开面板。

## 7. `elementStyle: (dimension, size, gutterSize) => ({ 'flex-basis': \`calc(${size}px - ${gutterSize}px)\` })`

- **作用**：自定义面板的 CSS 样式。
- **这里的逻辑**：
  - `flex-basis` 决定了面板在 Flex 布局中的基础尺寸。
  - 用 `calc()` 减去分隔条的宽度，保证布局精确。

## 8. `gutterStyle: () => ({ width: '8px', background: 'var(--ground-50)', cursor: 'col-resize' })`

- **作用**：自定义分隔条的样式。
- **值的含义**：
  - `width: '8px'`：分隔条宽度。
  - `background: 'var(--ground-50)'`：背景颜色（CSS 变量）。
  - `cursor: 'col-resize'`：鼠标悬停时显示左右拖动的光标。

## 9. `onDrag: (sizes) => handleSidebarResizing(sizes)`

- **作用**：拖动分隔条时触发的回调。
- **值的含义**：
  - `sizes` 是当前两个面板的尺寸数组。
  - `handleSidebarResizing(sizes)` 是你自定义的函数，用来更新状态（比如保存用户调整后的宽度）。

### 总结表

| 属性           | 作用            | 常用值示例                    |
| -------------- | --------------- | ----------------------------- |
| `direction`    | 分割方向        | `'horizontal'` / `'vertical'` |
| `sizes`        | 初始尺寸        | `[300, 700]` 或 `[30, 70]`    |
| `minSize`      | 最小尺寸        | `[200, 300]`                  |
| `maxSize`      | 最大尺寸        | `[500, Infinity]`             |
| `gutterSize`   | 分隔条宽度/高度 | `8`                           |
| `snapOffset`   | 吸附距离        | `0` / `10`                    |
| `elementStyle` | 面板样式        | 自定义函数                    |
| `gutterStyle`  | 分隔条样式      | 自定义函数                    |
| `onDrag`       | 拖动回调        | `(sizes) => { ... }`          |

如果你愿意，我可以帮你画一个 **Split.js 配置可视化示意图**，让你直观理解这些参数是如何影响布局的，这样你在调试时会更快找到合适的值。  
你想让我帮你画这个示意图吗？

# 如何隐藏侧板

- 将保存侧板宽度的变量的值设置为 0
- 调用 horizontalSplit.setSizes 方法，重置面板数组中的有面板的宽度值
- 如果是最外侧的面板，我们隐藏一下 gutter, 主要是通过给分隔面板的父 Ref 添加一个新的 no-gutter 样式类；这个样式主要就是 display: none !important;

# 如何分隔上下面板，并支持最大化、最小化和正常

- 如果只有上下两块，它就只有三个状态：最大化、最小化、在最大和最小之间的任意尺寸；
- 我们通过调用 setSizes 设置 2 个面板的宽度，同时更新保存这 2 个值的数组；
- 如果我们想最大或最小化时，隐藏 gutter，可以在到达最大或最小时，给面板的父容器加上 no-gutter 样式类，隐藏 gutter，当切换到最大和最小之间时，我们又移除样式；
