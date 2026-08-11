---
title: "Vue 3 拖拽布局库"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "在 Vue 3 中，实现页面分区域布局并支持拖拽调整边界的功能，以下是国内最受欢迎的库以及实现思路： 国内最受欢迎的 Vue 3 拖拽布局库 1. Splitpanes 特点 ：轻量级、纯 Vue 3 实现，支持水平和垂直分割，拖拽流畅。 适用场景 ：类似 VS Code 的面板。"
sidebarWeight: 12
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实用包/Vue 3 拖拽布局库.md"
---
::: v-pre

# Vue 3 拖拽布局库

> 本节目标：理解“Vue 3 拖拽布局库”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 3 中，实现页面分区域布局并支持拖拽调整边界的功能，以下是国内最受欢迎的库以及实现思路：

**国内最受欢迎的 Vue 3 拖拽布局库**
**1.** **Splitpanes**

- **特点**==：轻量级、纯 Vue 3 实现，支持水平和垂直分割，拖拽流畅。==
- **适用场景**==：类似 VS Code 的面板拖拽调整。==
- **npm 安装**==：========bash========复制========npm== ==install== ==splitpanes==

**2.** **Vue Grid Layout**

- **特点**==：类似 Trello/看板布局，支持拖拽、缩放、响应式。==
- **适用场景**==：仪表盘、可拖拽卡片布局。==
- **npm 安装**==：========bash========复制========npm== ==install== ==vue-grid-layout@next==

**3.** **Vue Draggable Resizable**

- **特点**==：支持拖拽 + 调整大小，适合自由布局。==
- **npm 安装**==：========bash========复制========npm== ==install== ==vue-draggable-resizable==

**4.** **Element Plus 的 Split 组件**

- **特点**==：基于 Element UI，适合后台管理系统，简单易用。==
- **npm 安装**==：========bash========复制========npm== ==install== ==element-plus==

**实现思路（以** **Splitpanes** **为例）**
**1. 安装 Splitpanes**
bash
复制
npm install splitpanes
**2. 基本使用（水平/垂直分割）**
vue
复制
\<template\> \<Splitpanes class="default-theme" @resize="onResize"\> \<Pane min-size="20" size="25"\>左侧面板\</Pane\> \<Pane size="50"\>中间面板\</Pane\> \<Pane min-size="20" size="25"\>右侧面板\</Pane\> \</Splitpanes\>\</template\>
\<script setup\>import \{ Splitpanes, Pane \} from "splitpanes";import "splitpanes/dist/splitpanes.css";
const onResize = (sizes) =\> \{ console.log("面板尺寸变化:", sizes);\};\</script\>
\<style\>.splitpanes__splitter \{ background: #eee; position: relative;\}.splitpanes__splitter:before \{ content: ""; position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: #ccc; opacity: 0.3; transition: opacity 0.3s;\}.splitpanes__splitter:hover:before \{ opacity: 1;\}\</style\>
**3. 进阶用法（嵌套拖拽）**
vue
复制
\<template\> \<Splitpanes horizontal\> \<Pane size="30"\> \<Splitpanes\> \<Pane size="50"\>左上\</Pane\> \<Pane size="50"\>右上\</Pane\> \</Splitpanes\> \</Pane\> \<Pane size="70"\> \<Splitpanes\> \<Pane size="30"\>左下\</Pane\> \<Pane size="70"\>右下\</Pane\> \</Splitpanes\> \</Pane\> \</Splitpanes\>\</template\>

**实现思路（以** **Vue Grid Layout** **为例）**
**1. 安装 Vue Grid Layout**
bash
复制
npm install vue-grid-layout@next
**2. 基本使用（可拖拽看板）**
vue
复制
\<template\> \<GridLayout :layout="layout" :col-num="12" :row-height="30" @layout-updated="onLayoutUpdated" \> \<GridItem v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" \> \{\{ `Panel ${item.i}` \}\} \</GridItem\> \</GridLayout\>\</template\>
\<script setup\>import \{ ref \} from "vue";import \{ GridLayout, GridItem \} from "vue-grid-layout";
const layout = ref([ \{ x: 0, y: 0, w: 4, h: 4, i: "1" \}, \{ x: 4, y: 0, w: 4, h: 4, i: "2" \}, \{ x: 8, y: 0, w: 4, h: 4, i: "3" \},]);
const onLayoutUpdated = (newLayout) =\> \{ console.log("布局更新:", newLayout);\};\</script\>

**总结**

|   |   |   |   |
|---|---|---|---|
|库|适用场景|特点|推荐指数|
|**Splitpanes**|面板分割（类似 VS Code）|轻量、流畅|⭐⭐⭐⭐⭐|
|**Vue Grid Layout**|看板/仪表盘|拖拽+缩放|⭐⭐⭐⭐|
|**Vue Draggable Resizable**|自由布局|可调整大小|⭐⭐⭐|
|**Element Plus Split**|简单分割|集成 Element UI|⭐⭐⭐|

**推荐选择**

- **如果需要类似 IDE 的分割面板** ==→== **Splitpanes**
- **如果需要可拖拽的卡片布局** ==→== **Vue Grid Layout**
- **如果项目已用 Element Plus** ==→== **Element Plus Split**
- **如果需要自由拖拽 + 调整大小** ==→== **Vue Draggable Resizable**

你可以根据具体需求选择合适的库！ 🚀
 \> 来自 \<[https://chat.deepseek.com/a/chat/s/9c2caa9b-a223-4340-802e-82a4b5410ff9](https://chat.deepseek.com/a/chat/s/9c2caa9b-a223-4340-802e-82a4b5410ff9)\>

了解！你想深入探讨这些库的**源码实现思路**，而不仅仅是使用方式。下面我会分析 **Splitpanes** 和 **Vue Grid Layout** 这两个典型库的核心实现逻辑，帮助你理解它们是如何在底层实现拖拽分割和动态布局的。

**1. Splitpanes 源码实现思路**
**核心功能**==：支持面板分割 + 拖拽调整边界。==
**源码关键点**==（简化版逻辑）：==
**(1) DOM 结构**
html
复制
\<div class="splitpanes"\> \<div class="splitpanes__pane"\>面板1\</div\> \<div class="splitpanes__splitter"\>\</div\> \<!-- 拖拽条 --\> \<div class="splitpanes__pane"\>面板2\</div\>\</div\>

运行 HTML

- **splitpanes__splitter** ==是拖拽手柄，用户通过它调整相邻面板大小。==

**(2) 拖拽事件绑定**
javascript
复制
// 源码关键部分（伪代码）splitter.addEventListener('mousedown', (e) =\> \{ e.preventDefault(); document.addEventListener('mousemove', onMouseMove); document.addEventListener('mouseup', onMouseUp);\});
function onMouseMove(e) \{ // 计算鼠标移动距离（deltaX/deltaY） const delta = horizontal ? e.clientX - startX : e.clientY - startY;  // 计算新尺寸（按比例分配） const newSizes = calculateNewSizes(delta);  // 更新面板宽度/高度 panes.forEach((pane, i) =\> \{ pane.style.flexBasis = `${newSizes[i]}%`; \});\}

- **核心逻辑**==：通过== ==mousemove== ==计算鼠标偏移量，动态调整相邻面板的== ==flexBasis====。==

**(3) 尺寸计算**
javascript
复制
function calculateNewSizes(delta) \{ // 总容器尺寸 const totalSize = horizontal ? container.offsetWidth : container.offsetHeight;  // 当前面板尺寸（百分比） const pane1Size = (pane1.offsetWidth / totalSize) * 100; const pane2Size = (pane2.offsetWidth / totalSize) * 100;  // 调整后的新尺寸 const newPane1Size = pane1Size + (delta / totalSize) * 100; const newPane2Size = pane2Size - (delta / totalSize) * 100;  return [newPane1Size, newPane2Size];\}

- **关键点**==：使用== **flexbox** **+ 百分比计算**==，确保拖拽时面板按比例缩放。==

**(4) 嵌套支持**
==通过递归组件实现嵌套分割：==
vue
复制
\<Splitpanes\> \<Pane\> \<Splitpanes\> \<!-- 嵌套 --\> \<Pane\>子面板1\</Pane\> \<Pane\>子面板2\</Pane\> \</Splitpanes\> \</Pane\>\</Splitpanes\>

**2. Vue Grid Layout 源码实现思路**
**核心功能**==：支持动态网格布局（类似 Trello）。==
**源码关键点**==：==
**(1) 数据驱动布局**
javascript
复制
layout: [ \{ x: 0, y: 0, w: 2, h: 2, i: "1" \}, // x/y 是网格坐标，w/h 是宽高 \{ x: 2, y: 0, w: 2, h: 4, i: "2" \}]

- **网格系统**==：所有元素的位置和大小通过== ==x, y, w, h== ==描述。==

**(2) 拖拽实现**
javascript
复制
// 伪代码：拖拽事件处理onDragStart(item) \{ // 记录初始位置 this.draggingItem = \{ ...item, offsetX: event.clientX, offsetY: event.clientY \};\},
onDrag(event) \{ // 计算新位置（基于网格） const gridX = Math.floor((event.clientX - this.draggingItem.offsetX) / this.colWidth); const gridY = Math.floor((event.clientY - this.draggingItem.offsetY) / this.rowHeight);  // 更新布局数据 this.layout.find(item =\> item.i === this.draggingItem.i).x = gridX; this.layout.find(item =\> item.i === this.draggingItem.i).y = gridY;\}

- **关键点**==：将像素坐标转换为网格坐标（====colWidth== ==和== ==rowHeight== ==是预设值）。==

**(3) 碰撞检测**
javascript
复制
// 检查目标位置是否已被占用function isPositionAvailable(x, y, w, h, excludeId) \{ return !this.layout.some(item =\> \{ if (item.i === excludeId) return false; return ( x \< item.x + item.w && x + w \> item.x && y \< item.y + item.h && y + h \> item.y ); \});\}

- **算法**==：基于== **AABB（轴对齐边界框）碰撞检测**==。==

**(4) 响应式调整**
javascript
复制
// 监听窗口大小变化，重新计算布局window.addEventListener('resize', () =\> \{ this.containerWidth = this.$el.offsetWidth; this.colWidth = this.containerWidth / this.colNum; // 重新计算列宽\});

- **核心**==：通过== ==resize== ==事件动态调整== ==colWidth== ==和== ==rowHeight====。==

**3. 通用实现思路总结**

|   |   |
|---|---|
|功能|实现方案|
|**拖拽手柄**|监听 mousedown/mousemove/mouseup，计算偏移量并更新 DOM 样式|
|**动态尺寸调整**|使用 flexbox（Splitpanes）或 绝对定位 + transform（Vue Grid Layout）|
|**碰撞检测**|AABB 算法（检查矩形重叠）|
|**嵌套布局**|递归组件 + 上下文传递（如 provide/inject）|
|**性能优化**|防抖 resize 事件、避免直接操作 DOM（优先数据驱动）|

**如何自己实现一个简易版？**
==如果你想手动实现类似功能，可以按以下步骤：==

1. **基础结构**==：用== ==flexbox== ==或== ==grid== ==布局划分区域。==
2. **拖拽交互**==：========javascript========复制========splitter====.====onmousedown== ===== ==(====e====)== ===\>== ==\{====== ==const== ==startX== ===== ==e====.====clientX====;====== ==const== ==pane1Width== ===== ==pane1====.====offsetWidth====;====== ==== ==document====.====onmousemove== ===== ==(====e====)== ===\>== ==\{====== ==const== ==delta== ===== ==e====.====clientX== ==-== ==startX====;====== ==pane1====.====style====.====width== ===== ==`====${====pane1Width== ==+== ==delta====}====px`====;====== ==\};====== ==== ==document====.====onmouseup== ===== ==()== ===\>== ==\{====== ==document====.====onmousemove== ===== ==null;====== ==\};========\};==
3. **数据同步**==：将最终尺寸通过== ==v-model== ==抛给父组件。==

**总结**

- **Splitpanes**==：基于== ==flexbox== ==+ 鼠标事件，适合面板分割。==
- **Vue Grid Layout**==：基于== ==绝对定位== ==+ 网格系统，适合自由布局。==
- **核心难点**==：拖拽流畅性、碰撞检测、嵌套支持。==

==如果你对某个库的具体实现细节感兴趣，可以直接阅读其源码（通常不超过 1000 行）。例如：==

- ==Splitpanes 源码==
- ==Vue Grid Layout 源码==

希望这些分析能帮助你理解底层原理！ 🛠️
 \> 来自 \<[https://chat.deepseek.com/a/chat/s/9c2caa9b-a223-4340-802e-82a4b5410ff9](https://chat.deepseek.com/a/chat/s/9c2caa9b-a223-4340-802e-82a4b5410ff9)\>

:::
