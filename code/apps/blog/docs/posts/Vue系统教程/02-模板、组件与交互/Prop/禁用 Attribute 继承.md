---
title: "禁用 Attribute 继承"
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
description: "一、如果你不希望组件的根元素继承 attribute ，你可以在组件的选项中设置 inheritAttrs: false 。例如： 二、通过通过 禁止根组件继承属性；然后再通过实例的 $attrs property 来获取传递给组件的全部 attrs ；如果配合使用的话，就可以手。"
sidebarWeight: 92
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/组件/Prop/禁用 Attribute 继承.md"
---
::: v-pre

# 禁用 Attribute 继承

> 本节目标：理解“禁用 Attribute 继承”的核心思路，并能把它用于实际开发或面试表达。
一、如果你不希望组件的根元素继承 `attribute`，你可以在组件的选项中设置 `inheritAttrs: false`。例如：

```
Vue.component('my-component', {  inheritAttrs: false,  // ...})
```
 二、通过通过

```
inheritAttrs: false
```

禁止根组件继承属性；然后再通过实例的 `$attrs` `property` 来获取传递给组件的全部`attrs`；如果配合使用的话，就可以手动决定让这些根元素未继承的属性赋予给哪个元素使用，在撰写[基础组件](https://cn.vuejs.org/v2/style-guide/#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E5%90%8D-%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)的时候是常会用到的：

```
Vue.component('base-input', {  inheritAttrs: false,  props: ['label', 'value'],  template: `    <label>      {{ label }}      <input        v-bind="$attrs"        v-bind:value="value"        v-on:input="$emit('input', $event.target.value)"      >    </label>  `})
```

三、`inheritAttrs: false` 选项不会影响 `style` 和 `class` 的绑定。
这个模式允许你在使用基础组件的时候更像是使用原始的 `HTML` 元素，而不会担心哪个元素是真正的根元素：

```
<base-input  v-model="username"  required  placeholder="Enter your username"></base-input>
```
 \> 来自

```
 <https://cn.vuejs.org/v2/guide/components-props.html>
```

:::
