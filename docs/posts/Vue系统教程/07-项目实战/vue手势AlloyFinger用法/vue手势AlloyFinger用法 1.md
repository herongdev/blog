---
title: "vue手势AlloyFinger用法 1"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "项目实战"
description: "下载： main.js XXX.vue: 滑动的有效区域 亲测有效 其他手勢方法：。"
sidebarWeight: 56
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/vue手势AlloyFinger用法/vue手势AlloyFinger用法 1.md"
---
::: v-pre

# vue手势AlloyFinger用法 1

> 本节目标：理解“vue手势AlloyFinger用法 1”的核心思路，并能把它用于实际开发或面试表达。
下载：

```
npm install alloyfinger
```
 main.js

```
import AlloyFinger from 'alloyfinger'import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger_vue'
Vue.use(AlloyFingerPlugin,{  AlloyFinger})
```
 XXX.vue:

```
<div class="songlist-row-s"  v-finger:swipe="swipeHandler">//
```

滑动的有效区域

```
</div>
methods:{        swipeHandler(e){          console.log("swipe" + e.direction);        }......
```
 亲测有效
其他手勢方法：

```
var h = new Vue({    el: '#cnt',    methods: {        tap: function() { console.log('onTap'); },        multipointStart: function() { console.log('onMultipointStart'); },        longTap: function() { console.log('onLongTap'); },        swipe: function(evt) {            console.log("swipe" + evt.direction);            console.log('onSwipe');        },        pinch: function(evt) {             console.log(evt.scale);            console.log('onPinch');         },        rotate: function(evt) {            console.log(evt.angle);            console.log('onRotate');         },        pressMove: function(evt) {             console.log(evt.deltaX);            console.log(evt.deltaY);            console.log('onPressMove');         },        multipointEnd: function() { console.log('onMultipointEnd'); },        doubleTap: function() { console.log('onDoubleTap'); },        singleTap: function () { console.log('onSingleTap'); },
touchStart: function() { console.log('onTouchStart'); },        touchMove: function() { console.log('onTouchMove'); },        touchEnd: function() { console.log('onTouchEnd'); },        touchCancel: function() { console.log('onTouchCancel'); }    }});
```

:::
