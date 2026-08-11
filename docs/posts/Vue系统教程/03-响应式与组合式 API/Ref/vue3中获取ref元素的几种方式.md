---
title: "vue3中获取ref元素的几种方式"
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
description: "vue3中为了节约资源，并不是全部数据都会进行响应式监听。他允许用户进行动态监听。 因此在vue3中主要用reactive和ref进行响应数据的监听。他俩的区别在于： ①reactive中必须存放对象（json、数组等），不能存放基本数据类型 ②ref则可以存放基本数据类型【注：。"
sidebarWeight: 21
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/Ref/vue3中获取ref元素的几种方式.md"
---
::: v-pre

# vue3中获取ref元素的几种方式

> 本节目标：理解“vue3中获取ref元素的几种方式”的核心思路，并能把它用于实际开发或面试表达。
vue3中为了节约资源，并不是全部数据都会进行响应式监听。他允许用户进行动态监听。
因此在vue3中主要用reactive和ref进行响应数据的监听。他俩的区别在于：
①reactive中必须存放对象（json、数组等），不能存放基本数据类型
②ref则可以存放基本数据类型【注：ref本质还是reactive】

一、获取单个DOM
\<template\>
\<div ref="myRef"\>获取单个DOM元素\</div\>
\</template\>
\<script\>
import \{ ref, onMounted \} from "vue";
export default \{
setup() \{
const myRef = ref(null);
onMounted(() =\> \{
console.dir(myRef.value);
\});
return \{
myRef,
\};
\},
\};
\</script\>

二、在循环渲染中获取dom的ref引用；
\<script setup\>
import \{ onMounted, ref \} from "vue";
const iRefs = ref([]);
const setRefs = (el) =\> \{
console.log("el", el);
iRefs.value.push(el);
\};
onMounted(() =\> \{
console.log(iRefs.value);
\});
\</script\>
\<template\>
\<div\>
\<div v-for="i of 10" :ref="setRefs"\>\{\{ i \}\}\</div\>
\</div\>
\</template\>

三、在swiper中获取swiper的dom元素：
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
