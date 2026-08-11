---
title: "获取Dom和nextTick"
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
description: "Vue3 中获取单个 dom 方法一：原生方法 原生js获取dom元素： document.querySelector(选择器) document.getElementById(id选择器) document.getElementsByClassName(class选择器) 在。"
sidebarWeight: 14
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/Dom获取/获取Dom和nextTick.md"
---
::: v-pre

# 获取Dom和nextTick

> 本节目标：理解“获取Dom和nextTick”的核心思路，并能把它用于实际开发或面试表达。
```
在vue2中可以使用this.$refs获取一个dom或者多个dom, 但在vue3中获取dom和vue2有些不同
```

**Vue3****中获取单个****dom**
方法一：原生方法
原生js获取dom元素：
document.querySelector(选择器)
document.getElementById(id选择器)
document.getElementsByClassName(class选择器)

```
setup相当于create, 此时页面还没有初始化, 因此在nextTick中获取dom
<template>
  <div>
    <div ref="name">张三</div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
// 创建一个Ref，并赋值给dom的ref值
let name = ref<any>("");
// 可以在mounted生命周期中获取
// 在更改了一些数据后，dom不一定会马上更新，
// 使用nextTick以等待 DOM 更新后立即调用作为参数的回调函数。
nextTick(() => {
  // 这个回调会等到下一个dom更新周期后才执行
  console.log(name.value, "dom");
  console.log(name.value.innerHTML, "内容");
});
</script>
```

```
**vue3****中获取多个****dom****的方法**
**方法一**
<template>
  <div>
    <div ref="name">张三</div>
    <div :ref="getFruit">香蕉</div>
    <div :ref="getFruit">梨子</div>
    <div :ref="getFruit">菠萝</div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
let name = ref<any>("");
nextTick(() => {
  console.log(name.value, "dom");
  console.log(name.value.innerHTML, "内容");
});
// 将dom中ref的值赋值为一个函数
// 在dom挂载的时候，会依次调用这个函数
// 参数e为dom引用
let getFruit = (e: any) => {
  console.log(e);
};
</script>
```

```
方法二：使用nextTick来获取
<template>
  <div>
    <div ref="name">张三</div>
    <div :ref="getFruit">香蕉</div>
    <div :ref="getFruit">梨子</div>
    <div :ref="getFruit">菠萝</div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
let name = ref<any>("");
let fruitArr: any[] = [];
// 这个函数会在dom挂载的时候被调用
let getFruit = (el: any) => {
  fruitArr.push(el);
};
nextTick(() => {
  // 这个回调函数是数据发生变化后的第一个dom更新周期后
  // 马上被调用
  console.log(name.value, "dom");
  console.log(name.value.innerHTML, "内容");
  // getFruit函数在dom挂载时被执行，所以现在fruitArr有值
  console.log(fruitArr, "fruitArr数据..");
});
</script>
```

```
方法三：在v-for中赋值，在nextTick中获取
<template>
  <div ref="getDivDom" v-for="item in list" :data-id="item.id" />
</template>
<script setup>
import { ref } from "vue";
const divDomList = ref(new Map());
const getDivDom = (el) => {
  if (el) {
    divDomList.set(el.dataset["id"], el);
  }
};
</script>
```

在`swiper`中获取`swiper`的`dom`元素：
\<template\>
  \<swiper @swiper="getSwiper"\>\</swiper\>
\</template\>
\<script setup\>
import swiper from "swiper";
import \{ ref \} from "vue";
const swiperDom = ref(null);
const getSwiper = (el) =\> \{
  swiperDom.value = el;
\};
\</script\>

:::
