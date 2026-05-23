---
title: 小程序里如何做苹果式毛玻璃 Dock
date: 2026-05-23
tags:
  - 小程序
  - UI
  - 毛玻璃
  - CSS
categories:
  - 小程序
---

苹果式毛玻璃效果，本质不是「把背景调透明」这么简单，而是几层视觉叠加。

## 实现思路

### 1. 半透明底色

先给容器一个半透明背景，让下面的地图、图片或页面内容隐约透出来。

```css
background: rgba(255, 255, 255, 0.56);
```

### 2. 背景模糊

真正的「玻璃感」主要来自 `backdrop-filter`。它模糊的是元素背后的内容，不是元素自己。

```css
-webkit-backdrop-filter: blur(28rpx);
backdrop-filter: blur(28rpx);
```

### 3. 饱和度增强

苹果的玻璃不是灰蒙蒙的，而是有一点「润」。可以用 `saturate()` 增强背景色彩。

```css
backdrop-filter: blur(28rpx) saturate(160%);
```

### 4. 细边框高光

半透明白边框能模拟玻璃边缘的反光。

```css
border: 1px solid rgba(255, 255, 255, 0.68);
```

### 5. 柔和阴影

阴影让 Dock 从页面中浮起来，而不是贴在背景上。

```css
box-shadow: 0 18rpx 60rpx rgba(16, 24, 40, 0.14);
```

### 6. 兼容兜底

部分小程序环境可能不支持 `backdrop-filter`。所以半透明背景、边框和阴影不能省，它们是降级后的基础效果。

## 最小代码示例

### WXML

```xml
<view class="glass-dock">
  <view class="dock-main-btn">换一换</view>
  <view class="dock-chip">近一点</view>
  <view class="dock-chip">室内</view>
  <view class="dock-chip">免费</view>
</view>
```

### WXSS

```css
.glass-dock {
  position: fixed;
  left: 24rpx;
  right: 24rpx;
  bottom: 160rpx;
  padding: 12rpx;
  border-radius: 36rpx;
  background: rgba(255, 255, 255, 0.56);
  border: 1px solid rgba(255, 255, 255, 0.68);
  box-shadow: 0 18rpx 60rpx rgba(16, 24, 40, 0.14);
  -webkit-backdrop-filter: blur(28rpx) saturate(160%);
  backdrop-filter: blur(28rpx) saturate(160%);
  display: flex;
  gap: 10rpx;
}

.dock-main-btn,
.dock-chip {
  height: 76rpx;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

.dock-main-btn {
  flex: 0 0 220rpx;
  color: #fff;
  background: linear-gradient(135deg, #008858, #13c27f);
}

.dock-chip {
  flex: 1;
  color: #1f2933;
  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.68);
}
```

### 深色模式可选增强

```css
@media (prefers-color-scheme: dark) {
  .glass-dock {
    background: rgba(25, 28, 32, 0.5);
    border-color: rgba(255, 255, 255, 0.14);
    box-shadow: 0 18rpx 60rpx rgba(0, 0, 0, 0.28);
  }

  .dock-chip {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.12);
    color: #f5f7fa;
  }
}
```

## 一句话总结

苹果式毛玻璃 = 半透明背景 + 背景模糊 + 饱和度 + 高光边框 + 柔和阴影。  
在小程序里，`backdrop-filter` 是锦上添花，半透明背景和阴影才是兼容兜底。
