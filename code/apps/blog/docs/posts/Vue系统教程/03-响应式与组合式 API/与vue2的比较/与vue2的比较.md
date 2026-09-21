---
title: "与vue2的比较"
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
description: "Vue3 最主要的特点是小和快； 移除了 vue2 中不常用的内容和过滤器，组件； Vue3 可以按需打包，借助了 rollup 可以支持函数的 treeshakeing 能力； 提供了一些新增组件； 兼容了 vue2 的核心 api; 不再考虑 ie11 下的兼容性问题； 快：。"
sidebarWeight: 60
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/与vue2的比较/与vue2的比较.md"
---
::: v-pre

# 与vue2的比较

> 本节目标：理解“与vue2的比较”的核心思路，并能把它用于实际开发或面试表达。
`Vue3`最主要的特点是小和快；

- 移除了`vue2`中不常用的内容和过滤器，组件；
- `Vue3`可以按需打包，借助了`rollup`可以支持函数的`treeshakeing`能力；
- 提供了一些新增组件；
- 兼容了`vue2`的核心`api;`不再考虑`ie11`下的兼容性问题；

快：

- `proxy`：`proxy`是天生的拦截器，不需要重写属性；`defineProperty`使用递归和重写属性
- `monorepo`：整体`vue3`架构发生了变化（采用发`monorepo`，可以分层清晰，一个项目中可以维护多个项目，可以利用项目中的某个部分）
- 模板编译：`Vue3`对编译时的内容，进行了重写；也就是将`template`转换为`rencder`函数时，增加了很多逻辑，如静态标记还有属性标记，`patchFlage`动态标记（比较哪些元素包含哪些属性 `class, style,` 动态属性`,` 指令等）；如只对可能发生变化的内容进行对比；
    - 静态提升为变量；
    - `Vue3`使用了最长子序列重写了`diff`算法（这个和`vue2`基本没有太大差异）
    - 使用了`vue3`模板内部有一个概念叫`blockTree`，如果在`vue`中使用`jsx`就不会得到模板的优化；可以在写`jsx`的时候，自己标记；
- `Ts`：`Vue3`完全采用了`ts`来进行重构，对`ts`兼容非常好，对`this`的推断也好；采用函数式的方式对`ts`的推断是非常好的；
- 组合式`api(compositonApi)`：`vue3`的亮点；可以分散逻辑；功能少可以使用`vue2`的写法；

`Vue3` 的主流`Ui`框架：`element-plus`

:::
