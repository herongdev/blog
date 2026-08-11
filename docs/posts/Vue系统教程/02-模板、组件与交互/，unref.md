---
title: "，unref"
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
description: "在 Vue 3 中，unref 是一个 ​​响应式工具函数​​，用于处理 ​​ref​​ 和 ​​普通值​​，使其在代码中更灵活地使用。它是 @vue/reactivity 或 @vue/runtime core 提供的一个实用方法。 ​​1. unref 的作用​​ unref。"
sidebarWeight: 65
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/，unref.md"
---
::: v-pre

# ，unref

> 本节目标：理解“，unref”的核心思路，并能把它用于实际开发或面试表达。
在 Vue 3 中，unref 是一个 ​​响应式工具函数​​，用于处理 ​​ref​​ 和 ​​普通值​​，使其在代码中更灵活地使用。它是 @vue/reactivity 或 @vue/runtime-core 提供的一个实用方法。

​​1. unref 的作用​​
unref 的作用是 ​​安全地获取一个值​​，无论它是 ​​ref 对象​​ 还是 ​​普通值​​：

- 如果传入的是 ref，则返回 ref.value（即解包 ref）。
- 如果传入的是普通值，则直接返回该值。

​​语法：​​

ts
复制

import \{ unref \} from 'vue';
const value = unref(someRefOrValue);

​​2. 为什么需要 unref？​​
在 Vue 3 的 Composition API 中，我们经常使用 ref 和 reactive 来管理状态。但有时候，我们不确定某个变量是 ref 还是普通值，这时 unref 可以 ​​统一处理​​，避免手动判断：

ts
复制

function useSomeLogic(maybeRef) \{ // 不用手动判断 maybeRef 是 ref 还是普通值 const value = unref(maybeRef); // 现在 value 一定是普通值\}

​​3. 使用示例​​
​​示例 1：处理可能是 ref 或普通值的参数​​

ts
复制

import \{ ref, unref \} from 'vue';
function double(numOrRef) \{ const num = unref(numOrRef); // 无论传入 ref 还是普通值，都能正确获取 return num * 2;\}
const count = ref(5);console.log(double(count)); // 10console.log(double(10)); // 20
​​示例 2：在 watch 或 computed 中使用​​

ts
复制

import \{ ref, watch, unref \} from 'vue';
const count = ref(0);
watch( () =\> unref(count), // 确保 watch 监听的总是普通值 (newValue) =\> \{ console.log('Count changed:', newValue); \});

​​4. unref vs ref.value​​

|   |   |   |
|---|---|---|
|**方式**|**适用场景**|**缺点**|
|unref(x)|适用于 ​​不确定 x 是 ref 还是普通值​​ 的情况|无|
|x.value|适用于 ​​明确知道 x 是 ref​​ 的情况|如果 x 不是 ref，会报错|

​​推荐​​：在 ​​工具函数​​ 或 ​​组合式函数​​ 中使用 unref，提高代码的健壮性。

​​5. 类似的方法​​

- ​​toRef​​：将响应式对象的属性转换成 ref。
- ​​toValue​​（Vue 3.3+）：类似于 unref，但还能处理 getter 函数。
- ​​isRef​​：检查变量是否是 ref。
​​总结​​

- unref 是 Vue 3 提供的一个 ​​响应式工具函数​​，用于安全地获取 ref 或普通值。
- 适用于 ​​不确定变量是 ref 还是普通值​​ 的场景，避免手动 isRef 判断。
- 在 ​​组合式函数​​、​​工具函数​​ 或 ​​watch/computed​​ 中使用，使代码更健壮。

如果你经常编写可复用的 Composition API 逻辑，unref 会非常有用！ 🚀
 \> 来自 \<[https://yuanbao.tencent.com/chat/naQivTmsDa/20453305-afb6-4fff-b4dd-5d8f46ca6e91](https://yuanbao.tencent.com/chat/naQivTmsDa/20453305-afb6-4fff-b4dd-5d8f46ca6e91)\>
                      \> 来自 \<[https://yuanbao.tencent.com/chat/naQivTmsDa/20453305-afb6-4fff-b4dd-5d8f46ca6e91](https://yuanbao.tencent.com/chat/naQivTmsDa/20453305-afb6-4fff-b4dd-5d8f46ca6e91)\>

:::
