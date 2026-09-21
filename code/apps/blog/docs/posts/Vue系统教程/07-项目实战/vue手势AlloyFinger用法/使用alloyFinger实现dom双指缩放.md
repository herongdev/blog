---
title: "使用alloyFinger实现dom双指缩放"
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
description: "围绕“使用alloyFinger实现dom双指缩放”整理的概念、示例与实践笔记。"
sidebarWeight: 58
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/vue手势AlloyFinger用法/使用alloyFinger实现dom双指缩放.md"
---
::: v-pre

# 使用alloyFinger实现dom双指缩放

> 本节目标：理解“使用alloyFinger实现dom双指缩放”的核心思路，并能把它用于实际开发或面试表达。
```
<template>
  <div
    ref="box"
    class="hello"
    :style="style"
    v-finger:pinch="pinchHandler"
    v-finger:swipe="pinchHandler"
    v-finger:multipoint-end="multipointEnd"
  >
    <p>{{scale}}</p>
    <p>{{prevScale}}</p>
  </div>
</template>
<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      scale: 1,
      prevScale: 1,
    };
  },
  computed: {
    style() {
      return {
        transform: "scale(" + this.scale + ")",
      };
    },
  },
  methods: {
    pinchHandler(e) {
      this.scale = e.scale * this.prevScale;
    },
    multipointEnd() {
      this.prevScale = this.scale;
    },
  },
};
</script>
<style >
* {
  padding: 0;
  margin: 0;
}
.hello {
  position: absolute;
  left: 10px;
  top: 10px;
  right: 10px;
  bottom: 10px;
  background: red;
}
p {
  font-size: 4rem;
  color: #fff;
  margin-top: 2rem;
}
</style>
```

:::
