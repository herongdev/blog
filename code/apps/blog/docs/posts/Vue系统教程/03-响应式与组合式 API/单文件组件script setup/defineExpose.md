---
title: "defineExpose"
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
description: "使用 \\<script setup\\ 的组件是默认关闭的，也即通过模板 ref 或者 $parent 链获取到的组件的公开实例，不会暴露任何在 \\<script setup\\ 中声明的绑定。 为了在 \\<script setup\\ 组件中明确要暴露出去的属性，使用 defineE。"
sidebarWeight: 66
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/单文件组件script setup/defineExpose.md"
---
::: v-pre

# defineExpose

> 本节目标：理解“defineExpose”的核心思路，并能把它用于实际开发或面试表达。
```
#defineExpose
```
 使用 `\<script setup\>` 的组件是默认关闭的，也即通过模板 `ref` 或者 `$parent` 链获取到的组件的公开实例，不会暴露任何在 `\<script setup\>` 中声明的绑定。
为了在 `\<script setup\>` 组件中明确要暴露出去的属性，使用 `defineExpose` 编译器宏：

```
<scriptsetup>import{ref }from'vue'consta =1constb =ref(2)defineExpose({a,b})</script>
1
2
3
4
5
6
7
8
9
10
11
```
 当父组件通过模板 `ref` 的方式获取到当前组件的实例，获取到的实例会像这样 `{ a: number, b: number }` `(ref` 会和在普通实例中一样被自动解包

```
)
#useSlots
```

 和 `useAttrs`
在 `\<script setup\>` 使用 `slots` 和 `attrs` 的情况应该是很罕见的，因为可以在模板中通过 `$slots` 和 `$attrs` 来访问它们。在你的确需要使用它们的罕见场景中，可以分别用 `useSlots` 和 `useAttrs` 两个辅助函数：

```
<scriptsetup>import{useSlots,useAttrs }from'vue'constslots =useSlots()constattrs =useAttrs()</script>
1
2
3
4
5
6
useSlots
```

 和 `useAttrs` 是真实的运行时函数，它会返回与 `setupContext.slots` 和 `setupContext.attrs` 等价的值，同样也能在普通的组合式 `API` 中使用。

```
#
```

与普通的 `\<script\>` 一起使用
`\<script setup\>` 可以和普通的 `\<script\>` 一起使用。普通的 `\<script\>` 在有这些需要的情况下或许会被使用到：

- 无法在 `\<script setup\>` 声明的选项，例如 `inheritAttrs` 或通过插件启用的自定义的选项。
- 声明命名导出。
- 运行副作用或者创建只需要执行一次的对象。

```
<script>//
```

普通 `\<script\>,` 在模块范围下执行`(`只执行一次

```
)runSideEffectOnce()//
```

声明额外的选项

```
exportdefault{inheritAttrs:false,customOptions:{}}</script><scriptsetup>//
```

在 `setup()` 作用域中执行 `(`对每个实例皆如此

```
)</script>
1
2
3
4
5
6
7
8
9
10
11
12
13
14
WARNING
```
 该场景下不支持使用 `render` 函数。请使用一个普通的 `\<script\>` 结合 `setup` 选项来代替。

```
#
```

顶层

```
await
<script setup>
```

 中可以使用顶层 `await`。结果代码会被编译成 `async setup()`：

```
<scriptsetup>constpost =awaitfetch(`/api/post/1`).then(r=>r.json())</script>
1
2
3
```
 另外，`await` 的表达式会自动编译成在 `await` 之后保留当前组件实例上下文的格式。
注意
`async setup()` 必须与 `Suspense` 组合使用，`Suspense` 目前还是处于实验阶段的特性。我们打算在将来的某个发布版本中开发完成并提供文档 `-` 如果你现在感兴趣，可以参照

```
tests
```

 看它是如何工作的。

:::
