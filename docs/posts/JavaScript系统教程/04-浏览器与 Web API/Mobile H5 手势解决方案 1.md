---
title: "Mobile H5 手势解决方案 1"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "浏览器与 Web API"
description: "触摸事件： 在手机 H5 页面开发需求中，我们经常遇到一些手势需求，例如： pinch( 捏 rotate( 旋转 ) ， multipointStart( 多点触摸 ) ， pressMove 、 Tap 、 doubleTap 、 longTap 、 swipe 。以上手势没。"
sidebarWeight: 36
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/DOM/Mobile H5 手势解决方案 1.md"
---
::: v-pre

# Mobile H5 手势解决方案 1

> 本节目标：理解“Mobile H5 手势解决方案 1”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
触摸事件：

```
https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events
```
 在手机`H5`页面开发需求中，我们经常遇到一些手势需求，例如：`pinch(`==捏==

```
),
```

 `rotate(`==旋转==`)`，`multipointStart(`==多点触摸==`)`，`pressMove`、`Tap`、`doubleTap`、`longTap`、`swipe`。以上手势没有原生事件的支持，所以需要自己通过一些方法实现。
这篇文章旨在介绍原生触摸事件，以及如果利用原生事件实现各种手势。

```
demo
github touch-finger
Mobile
```

**触摸事件列表**

```
TouchEvent
```

- ```
    touchstart
    ```

    ：当触点与触控设备表面接触时触发`touchstart` 事件`.`
- ```
    touchend:
    ```

    当触点离开触控平面时触发`touchend`事件`.`
- ```
    touchmove:
    ```

    当触点在触控平面上移动时触发`touchmove`事件。
- ```
    touchcancel:
    ```

    当触控点被特定的实现方式打乱时触发 `touchcancel` 事件（例如， 创建了太多的触控点）。

```
Touch Interface
Interface Interface
```

 描述了触摸事件的单个[触摸点](https://www.w3.org/TR/touch-events/#dfn-touch-point)。

```
Touch
```

对象是不可变的`;` 创建一个后，其属性不得更改。
`Attributes`

- ```
    clientX: readonly
    ```

    点相对于视口的水平坐标（以像素为单位），不包括任何滚动偏移
- ```
    clientY: readonly
    ```

    点相对于视口的垂直坐标（以像素为单位），不包括任何滚动偏移
- ```
    identifier: readonly
    ```

    每个触摸点的标识号。当触摸点变为活动状态时，必须为其分配与任何其他活动触摸点不同的 标识符。触摸点保持活动状态时，引用它的所有事件都必须为其指定相同的标识符。
- ```
    pageX: readonly
    ```

    点相对于视口的水平坐标（以像素为单位），包括任何滚动偏移
- ```
    pageY: readonly
    ```

    点相对于视口的垂直坐标（以像素为单位），包括任何滚动偏移
- ```
    screenX: readonly
    ```

    点相对于屏幕的水平坐标（以像素为单位）
- ```
    screenY: readonly
    ```

    点相对于屏幕的垂直坐标（以像素为单位）
- `target` `:`类型为`EventTarget`，`readonly` 的事件目标在其上的触摸点开始，当它被首先放置在表面上，即使触摸点自移动该元素的交互区域之外。

```
TouchList
```

```
Interface
TouchList Interface
```

 定义触摸事件的各个联系点列表。

```
TouchList
```

对象是不可变的`;` 创建一个后，其内容不得更改。
`Attributes`

- ```
    length: readonly returns the number of Touches in the list
    ```

```
TouchEvent
```

 `Interface`
定义

```
touchstart
```

，

```
touchend
```

，

```
touchmove
```

和

```
touchcancel
```

事件类型。

```
TouchEvent
```

对象是不可变的`;` 在创建并初始化一个之后，其属性不得更改。
`Attributes`

- ```
    altKey:
    ```

    类型为`boolean`，`readonly true` 如果`alt`（`Alternate`）键修饰符被激活`;` 除此以外`false`
- ```
    changedTouches:
    ```

    类型`TouchList`，只读 `Touch`为活动做出贡献的每个联系点 `touches` 列表。

==说明：==
`*` `touchstart`==事件==`:` ==这必须是刚刚对当前事件激活的触摸点列表。==
`*` `touchmove`==事件==`:` ==这必须是自上次事件以来已移动的触摸点列表。==
`*` `touchend`==、==

```
touchcancel:
```

==这必须是刚从表面移除的触摸点列表。==

- ```
    ctrlKey:
    ```

    类型为`boolean`，`readonly true` 如果`ctrl`（`Control`）键修饰符被激活`;` 除此以外`false`
- ```
    metaKey:
    ```

    类型为`boolean`，`readonly true` 如果`meta`（`Meta`）键修饰符被激活`;` 否则`false`。在某些平台上，此属性可能会映射到不同名称的键修饰符。
- ```
    shiftKey:
    ```

    类型为`boolean`，`readonly true` 如果移位（`Shift`）键修改器被激活`;` 除此以外`false`
- ```
    targetTouches:
    ```

    类型`TouchList`，只读
- ```
    Touch:
    ```

    触摸表面并从作为当前事件目标的元素开始的 每个接触点 `touches` 列表。
- ```
    touches:
    ```

    类型 `TouchList`，只读 `Touch`当前接触表面的每个接触点 `touches` 列表。

**手势实现原理**
**具体实现**
浏览器暴露了四个事件给开发者，`touchstart` `touchmove` `touchend` `touchcancel`，在这四个事件的回调函数可以拿到`TouchEvent`。
`TouchEvent:`

- `touches`：当前位于屏幕上的所有手指动作的列表
- `targetTouches`：位于当前 `DOM` 元素上的手指动作的列表
- `changedTouches`：涉及当前事件的手指动作的列表

    ```
    TouchEvent
    ```

    里可以拿到各个手指的坐标和其他参数

`Tap`**点按**
**移动端**`click`**有**`300`**毫秒延时，**`tap`**的本质其实就是**`touchend`**。但是要判断**`touchstart`**的手的坐标和**`touchend`**时候手的坐标**`x`**、**`y`**方向偏移要小于**`30`**。小于**`30`**才会去触发**`tap`**。**
`longTap` **长按**
`touchstart`开启一个`750`毫秒的`settimeout`，如果`750ms`内有`touchmove`或者`touchend`都会清除掉该定时器。超过`750ms`没有`touchmove`或者`touchend`就会触发

```
longTap
doubleTap
```

**双击**
`touchstart` 记录一次当前的事件戳，然后把下一次出发`touchstart`的时间戳减法上一次的，如果小于`250`毫秒，并且偏移量小于`30`则清除`Tap`的`settmeout,`调用`doubleTap`事件
`swipe`**划**
这里需要注意，当`touchstart`的手的坐标和`touchend`时候手的坐标`x`、`y`方向偏移要大于`30`，判断`swipe`，小于`30`会判断`tap`。那么用户到底是从上到下，还是从下到上，或者从左到右、从右到左滑动呢？可以根据上面三个判断得出，具体的代码如下：

```
  _swipeDirection(x1, x2, y1, y2) {    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')  }
pinch
```

**捏**

如上图所示，两点之间的距离比值求`pinch`的`scale`。这个`scale`会挂载在`event`上，让用户反馈给`dom`的`transform`或者其他元素的`scale`属性。
`rotate`**旋转**

如上图所示，利用内积，可以求出两次手势状态之间的夹角θ。但是这里怎么求旋转方向呢？那么就要使用差乘（`Vector Cross`）。 利用`cross`结果的正负来判断旋转的方向。

`cross`本质其实是面积，可以看下面的推导：

**其他手势**
略。
其他解决方案：

```
http://hammerjs.github.io/
```
 ==参照：==

```
https://github.com/AlloyTeam/AlloyFinger
```
 \> 来自

```
 <https://www.jianshu.com/p/da6460330428>
```

:::
