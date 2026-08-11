---
title: "vue3中jsx写法实现动态组件"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "工程化、质量与性能"
description: "淘人居士 于 2021 03 30 18:02:11 发布 3685 收藏 8 分类专栏： web前端 经验分享 文章标签： vue javascript typescript 版权 web前端 同时被 2 个专栏收录 11 篇文章1 订阅 订阅专栏 经验分享 18 篇文章0 订。"
sidebarWeight: 6
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/动态导入/defineAsyncComponent /vue3中jsx写法实现动态组件.md"
---
::: v-pre

# vue3中jsx写法实现动态组件

> 本节目标：理解“vue3中jsx写法实现动态组件”的核心思路，并能把它用于实际开发或面试表达。
淘人居士

于 2021-03-30 18:02:11 发布

3685
收藏 8
分类专栏： web前端 经验分享 文章标签： vue javascript typescript
版权

web前端
同时被 2 个专栏收录
11 篇文章1 订阅
订阅专栏

经验分享
18 篇文章0 订阅
订阅专栏
vue2和vue3的动态组件在模板语法中写起来很简单，但是换成jsx后，俩版本的写法有很大的差异，以下是vue3的写法示范。
vue2的jsx写法如何实现动态组件？

首先声明两个示范组件
comp1.tsx

import \{ defineComponent \} from "vue";
export default defineComponent(\{
setup() \{
return () =\> (
\<div\>动态组件1\</div\>
);
\}
\});
1
2
3
4
5
6
7
8
comp2.tsx

import \{ defineComponent \} from "vue";
export default defineComponent(\{
setup() \{
return () =\> (
\<div\>动态组件2\</div\>
);
\}
\});
1
2
3
4
5
6
7
8
应用动态组件
index.tsx

import \{ defineComponent, h, resolveComponent, defineAsyncComponent,ref \} from 'vue';
export default defineComponent(\{
components:\{
comp1: defineAsyncComponent(() =\> import('./components/comp1')),
comp2: defineAsyncComponent(() =\> import('./components/comp2'))
\},
setup()\{
let tabComponent = ref('comp1');
return ()=\>(
\<\>
\<h1\>动态组件示范\</h1\>
\<button onClick=\{() =\> tabComponent.value = 'comp1'\}\>comp1\</button\>\<button onClick=\{() =\> tabComponent.value = 'comp2'\}\>comp2\</button\>
\{
h(resolveComponent(tabComponent.value))
\}
\</\>
);
\}
\})
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
15
16
17
18
19
以上就是动态组件的实现方式，
关键步骤:
1.用defineAsyncComponent声明需要动态载入的组件
2.用resolveComponent请求组件
3.用渲染函数h加载组件
————————————————
版权声明：本文为CSDN博主「淘人居士」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/kw269937519/article/details/115331859

:::
