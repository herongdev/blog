---
title: "vue 可拖拽可缩放 vue-draggable-resizable 组件常用总结"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "特征 没有依赖 使用可拖动，可调整大小或两者兼备 定义用于调整大小的句柄 限制大小和移动到父元素或自定义选择器 将元素捕捉到自定义网格 将拖动限制为垂直或水平轴 保持纵横比 启用触控功能 使用自己的样式 为句柄提供自己的样式 安装和基本用法 npm install save vu。"
sidebarWeight: 54
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/vue手势AlloyFinger用法/vue 可拖拽可缩放 vue-draggable-resizable 组件常用总结.md"
---
::: v-pre

# vue 可拖拽可缩放 vue-draggable-resizable 组件常用总结

> 本节目标：理解“vue 可拖拽可缩放 vue-draggable-resizable 组件常用总结”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
**特征**

- ==没有依赖==
- ==使用可拖动，可调整大小或两者兼备==
- ==定义用于调整大小的句柄==
- ==限制大小和移动到父元素或自定义选择器==
- ==将元素捕捉到自定义网格==
- ==将拖动限制为垂直或水平轴==
- ==保持纵横比==
- ==启用触控功能==
- ==使用自己的样式==
- ==为句柄提供自己的样式==

**安装和基本用法**
`npm install --save vue-draggable-resizable`
==全局注册组件==`main.js`==中写入：==

```
import Vue from 'vue'import VueDraggableResizable from 'vue-draggable-resizable'
//
```

可选择导入默认样式

```
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)
```
 ==局部注册：在使用的组件里引用==

```
import VueDraggableResizable from 'vue-draggable-resizable'import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
```
 **常用属性总结**
`:w` 默认宽度

```
:h
```

默认高度

```
:x="50"
```

默认水平坐标 注意相对元素是谁

```
:y="50"
```

默认垂直最表 注意相对元素是谁

```
:min-width="50"
```

最小宽度

```
:min-height="50"
```

最小高度

```
:parent="true"
```

限制不能拖出父元素

```
parent=".p-event"
```

限制不能拖出`class`为`p-event`的元素

```
:grid
```

水平和垂直移动 每次分别能够走多少像素

```
class-name
```

自定义组件`class` 下面定义一个`dragging1`
**常用事件总结**
事件简述 [文档（可点击直接进入）](https://github.com/gorkys/vue-draggable-resizable-gorkys/blob/master/README_ZH.md)中`ctrl+f` 搜索 “事件” 查看详细事件参数

```

```
 本`demo`举例的不一一阐述

```
@dragging="onDrag"
```

每当拖动组件时调用。

```
@resizing="onResize"
```

每当组件调整大小时调用。``
本`demo`没用到的 可能会用到的

```
@dragstop="onDragstop"
```

每当组件停止拖动时调用。

```
@resizestop="onResizstop"
```

每当组件停止调整大小时调用

```
@deactivated="onDeactivated"
```

每当用户单击组件外的任何位置时调用

```
@activated="onActivated"
```

单击组件时调用，以显示句柄。备注：句柄就是点击组件后上下左右的可以拉伸的方块点
**举例**
`vue`==模板代码==

```
  <div class="helloword">    <div class="text-event">      <vue-draggable-resizable        :w="150"        :h="150"        :x="50"        :y="50"        :min-width="50"        :min-height="50"        :parent="true"        :grid="[10,10]"        class-name="dragging1"        @dragging="onDrag"        @resizing="onResize"      >        <p>
```

你好！ 我是一个灵活的组件。 你可以拖我四处，你可以调整我的大小。

```
          <br />          X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}        </p>      </vue-draggable-resizable>    </div>
<!--
```

相对于`class`等于什么的标记拖拽 注意指定

```
 parent -->    <div class="p-event">      <vue-draggable-resizable       parent=".p-event"      >        <p>You can drag me around and resize me as you wish.</p>      </vue-draggable-resizable>    </div>  </div>
```

`vue script`==代码==

```
export default {  name: "HelloWorld",  data: function() {    return {      width: 0,      height: 0,      x: 0,      y: 0    };  },  methods: {    onResize: function(x, y, width, height) {      this.x = x;      this.y = y;      this.width = width;      this.height = height;    },    onDrag: function(x, y) {      this.x = x;      this.y = y;    }  }};
vue
```

==层叠样式代码==

```
.helloword {  overflow: hidden;}.text-event {  float: left;  height: 500px;  width: 500px;  border: 1px solid red;  position: relative;
/*
```

网格设置

```
 */
background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px;
}.p-event {  float: left;  height: 300px;  width: 300px;  border: 1px solid blue;  position: relative;  margin-left: 20px;}
.dragging1 {  border: 1px solid #000;  color: #000;}
```

==运行效果：都限制在自己设置的元素中不得超出==

- ==网格设置== ==网格宽高为==`10`==像素，通过：==  `:grid`==属性控制每次拖拽移动多少像素==  `:grid:[10, 10]`
- ==单击组件可显示== ==句柄== ==用来调整宽度高度==
- ==拖拽移动组件可实时保存== ==水平== ==垂直== ==宽度== ==高度== ==的数据==

==注意：拖拽后背景变颜色是因为==`gif`==录制的原因==

 \> 来自

```
 <https://www.cnblogs.com/wangweizhang/p/11241788.html>
```

:::
