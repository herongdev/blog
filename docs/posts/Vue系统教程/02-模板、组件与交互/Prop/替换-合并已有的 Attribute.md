---
title: "替换-合并已有的 Attribute"
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
description: "对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值。 但 和 style attribute 会将传入的值和原来的值合并起来。 想象一下 \\<bootstrap date input\\ 的模板是这样的： 为了给我们的日期选择器插件定制一个主题。"
sidebarWeight: 91
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/组件/Prop/替换-合并已有的 Attribute.md"
---
::: v-pre

# 替换-合并已有的 Attribute

> 本节目标：理解“替换-合并已有的 Attribute”的核心思路，并能把它用于实际开发或面试表达。
- 对于绝大多数 `attribute` 来说，从外部提供给组件的值会替换掉组件内部设置好的值。
- 但

    ```
     class
    ```

     和 `style` `attribute` 会将传入的值和原来的值合并起来。

想象一下 `\<bootstrap-date-input\>` 的模板是这样的：

```
<input type="date" class="form-control">
```
 为了给我们的日期选择器插件定制一个主题，我们可能需要像这样添加一个特别的类名：

```
<bootstrap-date-input  data-date-picker="activated"  class="date-picker-theme-dark"></bootstrap-date-input>
```
 在这种情况下，我们定义了两个不同的 `class` 的值：

- `form-control`，这是在组件的模板内设置好的
- `date-picker-theme-dark`，这是从组件的父级传入的

所以最终的值：`form-control date-picker-theme-dark`

:::
