---
title: 使用 `<img>` 宽高 vs 外层占位：不闪不抖的两套写法
date: 2025-09-18
tags:
  - 前端性能
  - 图片优化
  - CLS

categories:
  - Web 前端
---

## 摘要

是否"闪一下"与"远程/本地"无关，关键在**提前占位**与**缓存**。实践上有两套稳妥方案：

1. 已知原图尺寸 → 在 `<img>` 上写 **像素级 `width`/`height` 属性** 定比例，再用 CSS 自适应；
2. 需要统一裁切比例/拿不到尺寸 → **外层容器 `aspect-ratio` 占位**，`img` 充满容器并用 `object-fit` 控裁切。

---

## 整体思路

- **提前给出宽高比**，避免布局抖动（CLS），首屏更稳。
- **`width/height` 要写成 HTML 属性（像素）**，用于固有尺寸；CSS 再决定如何缩放。
- **裁切/统一比例场景**改用外层占位：`aspect-ratio + object-fit`。

---

## 适用场景对比

- **已知原图尺寸（新闻图、正文图、Logo）**：`<img width height>`（像素）＋ `max-width:100%; height:auto;`
- **卡片封面、Banner、列表缩略图（比例统一/需裁切）**：外层 `aspect-ratio`，内层 `object-fit:cover`
- **完整显图不裁切**：`object-fit:contain`

---

## 分步实现

### 方案 A：在 `<img>` 上写像素 `width/height`

1. 获取原图真实像素尺寸（构建期或接口返回）。
2. 在 `<img>` 标签**写属性** `width`、`height`（像素值）。
3. 用 CSS 做响应式（`max-width:100%; height:auto; display:block;`）。

**最小变更片段：**

```html
<!-- 复杂逻辑：用属性提供"固有尺寸"让浏览器提前算出比例，CSS 再自适应 -->
<img
  src="/images/banner.jpg"
  width="1200"
  height="400"
  style="max-width:100%; height:auto; display:block;"
  alt="banner"
/>
```

### 方案 B：外层占位（统一比例/需要裁切）

1. 外层容器写 `aspect-ratio` 作为占位，控制统一比例。
2. `img` 宽高 100% 填充容器，配 `object-fit` 控制裁切或等比内含。

**最小变更片段：**

```html
<!-- 复杂逻辑：外层用固定比例占位，内层充满并按需裁切 -->
<div style="aspect-ratio: 3 / 1; width:100%; overflow:hidden;">
  <img
    src="/images/cover.jpg"
    style="width:100%; height:100%; object-fit:cover; display:block;"
    alt="cover"
  />
</div>
```

---

## 最简代码示例

### 已知尺寸（推荐写法）

```html
<!-- 复杂逻辑：属性 width/height 定比例，CSS 负责响应式缩放 -->
<img
  src="https://cdn.example.com/pic-800.jpg"
  width="800"
  height="450"
  style="max-width:100%; height:auto; display:block;"
  alt="pic"
/>
```

### 统一比例+裁切

```html
<!-- 复杂逻辑：卡片封面按 16:9 占位，cover 保证铺满不变形 -->
<div style="aspect-ratio: 16 / 9; width:100%; overflow:hidden;">
  <img
    src="https://cdn.example.com/cover.jpg"
    style="width:100%; height:100%; object-fit:cover; display:block;"
    alt="cover"
  />
</div>
```

### 不裁切（完整显示）

```html
<!-- 复杂逻辑：contain 模式完整展示图片，可能留边 -->
<div style="aspect-ratio: 4 / 3; width:100%; background:#f5f5f5;">
  <img
    src="https://cdn.example.com/photo.jpg"
    style="width:100%; height:100%; object-fit:contain; display:block;"
    alt="photo"
  />
</div>
```

---

## 常见误区与修正

- **只写 `img { width:100%; height:auto }` 不写属性宽高** → 首次渲染前无比例信息，可能抖动。
  **修正**：补上 `<img width height>`（像素）。
- **给 `img` 写 `height:100%`，但外层未定高/未占位** → 变形或跳动。
  **修正**：外层用 `aspect-ratio` 占位，或改 `height:auto`。
- **固定外层高度但没设 `object-fit`** → 拉伸。
  **修正**：按需求用 `cover/contain`。

---

## 小结（怎么选）

- **能拿到原图尺寸**：优先 `<img width="W" height="H"> + max-width:100%` ——最简单、最稳。
- **要统一版式或裁切**：外层 `aspect-ratio` + `object-fit`。
- 两者都做对了，首屏基本就不闪、不抖。
