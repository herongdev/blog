---
title: "v-model 的原理？"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "面试复习"
description: "我们在 vue 项目中主要使用 v model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v model 本质上不过是语法糖，v model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：。"
sidebarWeight: 20
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/面试/v-model 的原理？.md"
---
::: v-pre

# v-model 的原理？

> 本节目标：理解“v-model 的原理？”的核心思路，并能把它用于实际开发或面试表达。
我们在 vue 项目中主要使用 v-model 指令在表单 input、textarea、select 等元素上创建双向数据绑定，我们知道 v-model 本质上不过是语法糖，v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

```
text 和 textarea 元素使用 value 属性和 input 事件；
```

```
checkbox 和 radio 使用 checked 属性和 change 事件；
```

```
select 字段将 value 作为 prop 并将 change 作为事件。
```

```
以 input 表单元素为例：
<input v-model='something'>    相当于
<input v-bind:value="something" v-on:input="something = $event.target.value">
如果在自定义组件中，v-model 默认会利用名为 value 的 prop 和名为 input 的事件，如下所示：
父组件：<ModelChild v-model="message"></ModelChild>
子组件：<div>{{value}}</div>
props: {
    value: String
},
methods: {
    test1() {
        this.$emit('input', '小红')
    },
},
```

```
了解更多：[自定义事件](%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6)
```

:::
