---
title: "requestAnimationFrame 在 Vue 3 和浏览器事件循环中的位置与时机"
date: 2026-08-11
categories:
  - "JavaScript 系统教程"
tags:
  - "JavaScript"
  - "前端"
  - "教程"
  - "OneNote"
  - "异步编程"
description: "是浏览器提供的一个专门用于动画和高性能渲染的 API ，它在 Vue 3 和浏览器事件循环中扮演着重要角色。下面我将详细解析它的工作机制和最佳实践。 一、浏览器事件循环中的位置 浏览器事件循环阶段概览 宏任务队列 ： setTimeout 、 setInterval 、 I/O。"
sidebarWeight: 99
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/b-原生js/11-异步编程/requestAnimationFrame/`requestAnimationFrame` 在 Vue 3 和浏览器事件循环中的位置与时机.md"
---
::: v-pre

# requestAnimationFrame 在 Vue 3 和浏览器事件循环中的位置与时机

> 本节目标：理解“requestAnimationFrame 在 Vue 3 和浏览器事件循环中的位置与时机”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
```
#
`requestAnimationFrame` (rAF)
```

是浏览器提供的一个专门用于动画和高性能渲染的`API`，它在`Vue 3`和浏览器事件循环中扮演着重要角色。下面我将详细解析它的工作机制和最佳实践。
`##` **一、浏览器事件循环中的位置**
`###` **浏览器事件循环阶段概览**

```
1. **
```

**宏任务队列**`**`：`setTimeout`、`setInterval`、`I/O`等

```
2. **
```

**微任务队列**`**`：`Promise`、

```
MutationObserver
3. **
```

**渲染管道阶段**`**`：

```
   - **requestAnimationFrame
```

**回调**

```
**
   -
```

样式计算（`Style`）

```
   -
```

布局（`Layout`）

```
   -
```

绘制（`Paint`）

```
   -
```

合成（`Composite`）
`### rAF`**的精确位置**
` ``` `
事件循环一次迭代流程：
`1.` 执行一个宏任务
`2.` 清空微任务队列
`3. (`如有需要渲染

```
) →
   a.
```

执行`rAF`回调 `←` 这就是`rAF`执行点
   `b.` 执行渲染步骤`(`样式、布局、绘制

```
)
4.
```

检查是否需要渲染下一帧

```
```
##
```

**二、在**`Vue 3`**中的工作时机**
`### Vue 3`**更新周期与**`rAF`**的关系**

```
1. **
```

**响应式数据变更**

```
**
2.
```

触发组件

```
 **
```

**重新渲染**

```
**(
```

异步批处理

```
)
3.
```

在下次渲染前：

```
   -
```

微任务阶段：`Vue`的`DOM`更新

```
   - rAF
```

阶段：你的动画逻辑执行

```
   -
```

实际浏览器绘制
`###` **典型执行顺序示例**

```
```javascript
// 1.
```

数据变更

```
count.value++
// 2. Vue
```

排队更新`(DOM`更新进入微任务队列

```
)
// 3.
```

同步代码继续执行

```
console.log('
```

同步代码

```
')
// 4.
```

微任务阶段`(Vue DOM`更新

```
)
// 5. rAF
```

回调执行

```
requestAnimationFrame(() => {
  console.log('rAF
```

回调

```
')
})
```
##
```

**三、**`Vue 3`**中的最佳实践**
`### 1.` **与**`Composition API`**结合使用**

```
```javascript
import { ref, onMounted, onUnmounted } from 'vue'
export function useAnimation() {
  const frame = ref(0)
  let animationId = null
  function animate() {
    frame.value++
    animationId = requestAnimationFrame(animate)
  }
  onMounted(() => {
    animationId = requestAnimationFrame(animate)
  })
  onUnmounted(() => {
    cancelAnimationFrame(animationId)
  })
  return { frame }
}
```
### 2.
```

**与**`watchEffect`**配合**

```
```javascript
watchEffect((onCleanup) => {
  const id = requestAnimationFrame(() => {
    //
```

执行基于响应式状态的动画

```
  })
  onCleanup(() => cancelAnimationFrame(id))
})
```
### 3.
```

**性能优化技巧**

```
```javascript
//
```

使用节流技术防止过度渲染

```
const lastTime = ref(0)
const fps = 30
const interval = 1000 / fps
requestAnimationFrame(function animate(time) {
  if (time - lastTime.value >= interval) {
    lastTime.value = time
    //
```

实际动画逻辑

```
  }
  requestAnimationFrame(animate)
})
```
##
```

**四、与**`Vue`**更新周期的协调**
`###` **关键点：**

```
1. **Vue
```

**的**`DOM`**更新在微任务阶段完成**

```
**
2. **rAF
```

**回调在渲染前阶段执行**

```
**
3.
```

因此：

```
   -
```

在`rAF`中访问`DOM`能获取`Vue`最新更新

```
   -
```

在`rAF`中修改响应式数据会触发下一轮更新
`###` **执行顺序可视化：**

```
```
[
```

数据变更`] → [Vue`微任务队列：生成虚拟`DOM`、`DOM`更新`] → [rAF`回调`] → [`浏览器绘制

```
]
```
##
```

**五、特殊场景处理**
`###` **场景**`1`**：确保**`DOM`**已更新**

```
```javascript
function triggerAfterUpdate() {
  //
```

方法`1`：使用

```
nextTick
  nextTick().then(() => {
    requestAnimationFrame(() => {
      //
```

此时`DOM`已更新

```
    })
  })
  //
```

方法`2`：直接使用`rAF(`通常足够

```
)
  requestAnimationFrame(() => {
    //
```

大多数情况下`DOM`已更新

```
  })
}
```
###
```

**场景**`2`**：与**`Web Worker`**协作**

```
```javascript
//
```

主线程

```
const worker = new Worker('worker.js')
let animationId
function tick() {
  worker.postMessage('tick')
  animationId = requestAnimationFrame(tick)
}
// Worker
```

线程计算结果返回后
`//` 通过`postMessage`通知主线程更新视图

```
```
##
```

**六、调试技巧**
`### 1.` **性能分析**

```
```javascript
let lastTime = performance.now()
function animate() {
  const now = performance.now()
  const delta = now - lastTime
  console.log(`
```

帧间隔

```
: ${delta}ms`)
  lastTime = now
  requestAnimationFrame(animate)
}
animate()
```
### 2.
```

**使用**

```
DevTools
1.
```

在`Chrome DevTools`的`Performance`面板记录

```
2.
```

查看`"Main"`线程中的`rAF`回调

```
3.
```

分析`"Animation Frame Fired"`事件
`##` **七、常见问题解决**
`###` **问题**`1`**：动画卡顿**
`**`**解决方案**`**`：

```
-
```

检查`rAF`回调中是否有耗时操作

```
-
```

使用`Web Worker`分流计算

```
-
```

降低动画复杂度
`###` **问题**`2`**：内存泄漏**
`**`**解决方案**`**`：

```
```javascript
onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
```
###
```

**问题**`3`**：后台标签页性能**

```
```javascript
//
```

使用

```
Page Visibility API
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(animationId)
  } else {
    startAnimation()
  }
})
```
##
```

**总结**
`` `requestAnimationFrame` ``在现代`Web`开发中：

```
1.
```

位于浏览器渲染管道的关键路径

```
2.
```

与`Vue 3`的响应式系统完美配合

```
3.
```

是高性能动画和可视化的首选方案

```
4.
```

使用时需要注意生命周期管理和性能优化
正确理解和使用`rAF`，可以创建出既流畅又高效的`Vue 3`应用。

:::
