---
title: "在 v-for 里使用对象"
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
description: "一、可以用 v for 来遍历一个对象的 property 。 结果： How to do lists in Vue Jane Doe 2016 04 10 二、可以提供第二个的参数，代表 property 名称 ( 也就是键名 ) ： 三、还可以用第三个参数作为索引： 注意：在。"
sidebarWeight: 40
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/api/列表渲染/在 v-for 里使用对象.md"
---
::: v-pre

# 在 v-for 里使用对象

> 本节目标：理解“在 v-for 里使用对象”的核心思路，并能把它用于实际开发或面试表达。
==一、可以用== `v-for` ==来遍历一个对象的== `property`==。==

```
<ul id="v-for-object" class="demo">  <li v-for="value in object">    {{ value }}  </li></ul>
new Vue({  el: '#v-for-object',  data: {    object: {      title: 'How to do lists in Vue',      author: 'Jane Doe',      publishedAt: '2016-04-10'    }  }})
```
 ==结果：==

- `How to do lists in Vue`
- `Jane Doe`
- `2016-04-10`

==二、可以提供第二个的参数，代表== `property` ==名称== `(`==也就是键名==`)`==：==

```
<div v-for="(value, name) in object">  {{ name }}: {{ value }}</div>
title: How to do lists in Vue
author: Jane Doe
publishedAt: 2016-04-10
```

==三、还可以用第三个参数作为索引：==

```
<div v-for="(value, name, index) in object">  {{ index }}. {{ name }}: {{ value }}</div>
0. title: How to do lists in Vue
1. author: Jane Doe
2. publishedAt: 2016-04-10
```

==注意：在遍历对象时，会按== `Object.keys()` ==的结果遍历，但是====不能====保证它的结果在不同的== `JavaScript` ==引擎下都一致。==

:::
