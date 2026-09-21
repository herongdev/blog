---
title: "transition"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "模板、组件与交互"
description: "name string，用于自动生成 CSS 过渡类名。例如：name: 'fade' 将自动拓展为 .fade enter，.fade enter active 等。默认类名为 \"v\" css boolean，是否使用 CSS 过渡类。默认为 true。如果设置为 false。"
sidebarWeight: 116
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/过渡和动画/transition.md"
---
::: v-pre

# transition

> 本节目标：理解“transition”的核心思路，并能把它用于实际开发或面试表达。
```
**Props**：
```

name - string，用于自动生成 CSS 过渡类名。例如：name: 'fade' 将自动拓展为 .fade-enter，.fade-enter-active 等。默认类名为 "v"

```
appear - boolean，是否在初始渲染时使用过渡。默认为 false。
```

css - boolean，是否使用 CSS 过渡类。默认为 true。如果设置为 false，将只通过组件事件触发注册的 JavaScript 钩子。

type - string，指定过渡事件类型，侦听过渡何时结束。有效值为 "transition" 和 "animation"。默认 Vue.js 将自动检测出持续时间长的为过渡事件类型。

mode - string，控制离开/进入过渡的时间序列。有效的模式有 "out-in" 和 "in-out"；默认同时进行。

```
duration - number | { enter: number, leave: number } 指定过渡的持续时间。默认情况下，Vue 会等待过渡所在根元素的第一个 transitionend 或 animationend 事件。
```

```
enter-class - string
```

```
leave-class - string
```

```
appear-class - string
```

```
enter-to-class - string
```

```
leave-to-class - string
```

```
appear-to-class - string
```

```
enter-active-class - string
```

```
leave-active-class - string
```

```
appear-active-class - string
```

```
**事件：**
```

```
before-enter
```

```
before-leave
```

```
before-appear
```

```
enter
```

```
leave
```

```
appear
```

```
after-enter
```

```
after-leave
```

```
after-appear
```

```
enter-cancelled
```

```
leave-cancelled (v-show only)
```

```
appear-cancelled
```

```
用法：<transition> 元素作为**单个**元素/组件的过渡效果。<transition> 只会把过渡效果应用到其包裹的内容上，而不会额外渲染 DOM 元素，也不会出现在可被检查的组件层级中。<!-- 简单元素 -->
<transition>
  <div v-if="ok">toggled content</div>
</transition>
<!-- 动态组件 -->
<transition name="fade" mode="out-in" appear>
  <component :is="view"></component>
</transition>
<!-- 事件钩子 -->
<div id="transition-demo">
  <transition @after-enter="transitionComplete">
    <div v-show="ok">toggled content</div>
  </transition>
</div>
new Vue({
  // ...
  methods: {
    transitionComplete: function (el) {
      // 传入 'el' 这个 DOM 元素作为参数。
    },
  },
  // ...
}).$mount("#transition-demo");
参考：[过渡：进入，离开和列表](https://cn.vuejs.org/v2/guide/transitions.html)
```
 \> 来自

```
 <https://cn.vuejs.org/v2/api/#%E5%86%85%E7%BD%AE%E7%9A%84%E7%BB%84%E4%BB%B6>
```

:::
