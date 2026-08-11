---
title: "hammer.js"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "触摸操作库 Hammer.js 是一个流行的开源JavaScript库，专门用于处理触摸、手势识别和多点触控事件。它被广泛用于移动设备和现代浏览器中，使得开发者能够轻松添加触摸驱动的交互到他们的网页或应用中。以下是 Hammer.js 的一些关键特点： 关键特点 1. 多种手势支。"
sidebarWeight: 41
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/hammer.js.md"
---
::: v-pre

# hammer.js

> 本节目标：理解“hammer.js”的核心思路，并能把它用于实际开发或面试表达。
触摸操作库
`Hammer.js` 是一个流行的开源JavaScript库，专门用于处理触摸、手势识别和多点触控事件。它被广泛用于移动设备和现代浏览器中，使得开发者能够轻松添加触摸驱动的交互到他们的网页或应用中。以下是 `Hammer.js` 的一些关键特点：

### 关键特点

1. **多种手势支持**：
- 支持多种手势，如轻触（tap）、双击（doubletap）、拖拽（pan）、滑动（swipe）、捏合（pinch）、旋转（rotate）等。

2. **易于使用**：
- 提供了简洁的API来监听和处理手势事件。
- 可以直接绑定到DOM元素上，并为这些元素添加手势识别功能。

3. **可定制性**：
- 允许自定义手势识别的参数，如触摸动作的最小距离、速度等。
- 提供了丰富的配置选项，使其能够满足不同场景的需求。

4. **跨平台兼容性**：
- 良好的跨平台兼容性，支持多种浏览器和触摸设备。
- 同时支持鼠标事件和触摸事件，使其在非触摸设备上也能工作。

5. **事件绑定和委托**：
- 支持事件绑定和事件委托，方便在单个页面上管理多个手势事件。

### 使用场景

- 移动应用中的触摸交互，如图片的缩放、轮播图的滑动等。
- 增强网页的交互性，例如添加触摸驱动的导航菜单。
- 开发复杂的手势驱动应用，如游戏或图形编辑器。

### 如何使用

引入 `Hammer.js` 到您的项目中，可以通过CDN链接或者将其作为一个模块安装。然后，您可以创建一个 `Hammer` 实例并绑定到特定的DOM元素上，然后添加所需的手势识别和事件处理。

```javascript
// 引入Hammer.js
import Hammer from 'hammerjs';

// 创建Hammer实例并绑定到DOM元素
const myElement = document.getElementById('myElement');
const mc = new Hammer(myElement);

// 添加手势识别和事件处理
mc.on("panleft panright tap press", function(ev) {
myElement.textContent = ev.type +" gesture detected.";
});
```

总的来说，`Hammer.js` 是一个功能强大、易于使用的库，对于开发需要复杂触摸交互的网页和应用非常有帮助。

:::
