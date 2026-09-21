---
title: "Vue keep-alive实践总结"
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
description: "\\<keep alive\\ 是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。 \\<keep alive\\ 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 \\<transition\\ 相似，\\<keep alive\\ 是一个抽象组件：它自身。"
sidebarWeight: 40
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/实战/Vue keep-alive实践总结.md"
---
::: v-pre

# Vue keep-alive实践总结

> 本节目标：理解“Vue keep-alive实践总结”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
\<keep-alive\>是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。
\<keep-alive\> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 \<transition\> 相似，\<keep-alive\> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。
**prop:**

```
include: 字符串或正则表达式。只有匹配的组件会被缓存。
```

```
exclude: 字符串或正则表达式。任何匹配的组件都不会被缓存。
```

```
在2.1.0版本Vue中
**常见用法：**

```
//
```

组件

```
export default \{
  name: 'test-keep-alive',
  data () \{
    return \{
        includedComponents: "test-keep-alive"
    \}
  \}
\}
\<keep-alive include="test-keep-alive"\>
  \<!--
```

将缓存`name`为`test-keep-alive`的组件

```
 --\>
  \<component\>\</component\>
\</keep-alive\>
\<keep-alive include="a,b"\>
  \<!--
```

将缓存`name`为`a`或者`b`的组件，结合动态组件使用

```
 --\>
  \<component :is="view"\>\</component\>
\</keep-alive\>
\<!--
```

使用正则表达式，需使用

```
v-bind --\>
\<keep-alive :include="/a|b/"\>
  \<component :is="view"\>\</component\>
\</keep-alive\>
\<!--
```

动态判断

```
 --\>
\<keep-alive :include="includedComponents"\>
  \<router-view\>\</router-view\>
\</keep-alive\>
\<keep-alive exclude="test-keep-alive"\>
  \<!--
```

将不缓存`name`为`test-keep-alive`的组件

```
 --\>
  \<component\>\</component\>
\</keep-alive\>
```
 **结合****router****，缓存部分页面**
使用$route.meta的keepAlive属性：
<keep-alive>    <router-view v-if="$route.meta.keepAlive"></router-view></keep-alive><router-view v-if="!$route.meta.keepAlive"></router-view>
需要在router中设置router的元信息meta：
//...router.jsexport default new Router({  routes: [    {      path: '/',      name: 'Hello',      component: Hello,      meta: {        keepAlive: false // 不需要缓存      }    },    {      path: '/page1',      name: 'Page1',      component: Page1,      meta: {        keepAlive: true // 需要被缓存      }    }  ]})
**使用效果**
以上面router的代码为例：

```
\<!-- Page1
```

页面

```
 --\>
\<template\>
  \<div class="hello"\>
    \<h1\>Vue\</h1\>
    \<h2\>\{\{msg\}\}\</h2\>
    \<input placeholder="
```

输入框

```
"\>\</input\>
  \</div\>
\</template\>
\<!-- Hello
```

页面

```
 --\>
\<template\>
  \<div class="hello"\>
    \<h1\>\{\{msg\}\}\</h1\>
  \</div\>
\</template\>
(1) 在Page1页面输入框输入“asd”，然后手动跳转到Hello页面；
(2) 回到Page1页面发现之前输入的"asd"依然保留，说明页面信息成功保存在内存中；

```
​ 图1 进入Page1页面，并输入"asd"
```

```
​ 图2 跳转到Hello
```

​ 图3 返回Page1页面，输入框数据会被保留
当然，也可以通过动态设置route.meta的keepAlive属性来实现其他需求，
借鉴一下 [vue-router](http://www.jianshu.com/p/0b0222954483) 之 keep-alive，作者：RoamIn 这篇博客中的例子：

```
首页是A页面
```

```
B页面跳转到A，A页面需要缓存
```

```
C页面跳转到A，A页面不需要被缓存
```

```
思路是在每个路由的beforeRouteLeave(to, from, next)钩子中设置to.meta.keepAlive：
A的路由：
{    path: '/',    name: 'A',    component: A,    meta: {        keepAlive: true // 需要被缓存    }}
export default {    data() {        return {};    },    methods: {},    beforeRouteLeave(to, from, next) {         // 设置下一个路由的 meta        to.meta.keepAlive = true;  // B 跳转到 A 时，让 A 缓存，即不刷新        next();    }};
export default {    data() {        return {};    },    methods: {},    beforeRouteLeave(to, from, next) {        // 设置下一个路由的 meta        to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新        next();    }};
亲测有效哦~
**keep-alive****生命周期钩子函数：****activated****、****deactivated**
使用<keep-alive>会将数据保留在内存中，如果要在每次进入页面的时候获取最新的数据，需要在activated阶段获取数据，承担原来created钩子中获取数据的任务。
```
 \> 来自 \<[https://www.cnblogs.com/sysuhanyf/p/7454530.html](https://www.cnblogs.com/sysuhanyf/p/7454530.html)\>

:::
