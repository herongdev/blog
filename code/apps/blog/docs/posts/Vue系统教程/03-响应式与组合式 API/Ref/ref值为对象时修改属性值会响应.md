---
title: "ref值为对象时修改属性值会响应"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "响应式与组合式 API"
description: "在 Vue 3 中，如果你使用 ref() 包裹了一个对象，当直接修改这个对象的属性时，确实会触发响应。这是因为 Vue 3 的响应式系统会使用 Proxy 对 ref() 包裹的对象进行深层次的响应式转换。 这意味着，即使你只改变了对象中的某个属性，Vue 的响应式系统也能检测。"
sidebarWeight: 19
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/Ref/ref值为对象时修改属性值会响应.md"
---
::: v-pre

# ref值为对象时修改属性值会响应

> 本节目标：理解“ref值为对象时修改属性值会响应”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 3 中，如果你使用 `ref()` 包裹了一个对象，当直接修改这个对象的属性时，确实会触发响应。这是因为 Vue 3 的响应式系统会使用 `Proxy` 对 `ref()` 包裹的对象进行深层次的响应式转换。

这意味着，即使你只改变了对象中的某个属性，Vue 的响应式系统也能检测到这个变化，并且触发更新。这适用于使用 `ref()` 创建的响应式引用。

举个例子：

```javascript
import { ref } from 'vue';

const myObject = ref({
name: 'Alice',
age: 25
});

// 修改对象属性
myObject.value.age = 26; // 这会触发响应
```

在这个例子中，`myObject` 是一个响应式引用，包含一个对象。修改 `myObject.value.age` 的值会触发 Vue 的响应式系统，因此任何依赖于 `myObject` 的 DOM 将会被更新。

值得注意的是，这种行为是 Vue 3 中的特性。在 Vue 2 中，对于使用 `Vue.observable()` 或 `this.$set` 创建的响应式对象，你需要小心地处理对象属性的添加或删除，以确保触发响应。但在 Vue 3 中，由于使用了 `Proxy`，这种处理变得更加自然和直观。

:::
