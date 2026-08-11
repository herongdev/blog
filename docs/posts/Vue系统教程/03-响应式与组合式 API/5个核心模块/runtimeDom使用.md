---
title: "runtimeDom使用"
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
description: "@vue/runtime dom 是vue3默认入口，作用是把虚拟dom转换为真实dom; 其中@vue/runtime core 底层不依赖于平台的模块； h方法默认不提供，主要是为了treeShake，如果用户没有定义render方法，就不会自动引入； 需要手动引入； 但由于。"
sidebarWeight: 12
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/5个核心模块/runtimeDom使用.md"
---
::: v-pre

# runtimeDom使用

> 本节目标：理解“runtimeDom使用”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
@vue/runtime-dom 是vue3默认入口，作用是把虚拟dom转换为真实dom;
其中@vue/runtime-core 底层不依赖于平台的模块；

h方法默认不提供，主要是为了treeShake，如果用户没有定义render方法，就不会自动引入；
需要手动引入；

```
setup是vue3的启动方法；
```

```
->表示引用了；
```

但由于我们没有编译模板，也没有提供render方法，所以会报警告：

```
所以我们在Setup中直接返回一个函数 ，这个函数就是render函数：
```

```
可以在render函数中写事件
```

```
事件名以on开头+事件名
```

```
setup中支持传参，即CreateApp时的第二个参数，即属性值
```

```
第二个参数为上下文，其中有一些常用的属性；
```

```
添加子组件，例如；
```

```
组件复用
```

```
这种写法访问不到this了
通过以下api拿到实例
```

:::
