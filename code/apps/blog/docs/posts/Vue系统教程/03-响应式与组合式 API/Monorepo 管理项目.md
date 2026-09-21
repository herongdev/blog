---
title: "Monorepo 管理项目"
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
description: "Monorepo 是管理项目代码的一个方式，指在一个项目仓库 (repo) 中管理多个模块 / 包 (package) 。 方便版本管理和依赖管理，模块之间的引用，调用都非常方便 Vue3 采用 Typescript Vue2 采用 Flow 来进行类型检测 （ Vue2 中对。"
sidebarWeight: 16
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue3/Monorepo 管理项目.md"
---
::: v-pre

# Monorepo 管理项目

> 本节目标：理解“Monorepo 管理项目”的核心思路，并能把它用于实际开发或面试表达。

> 说明：原 OneNote 中有图片引用，但图片未包含在导出目录中；本页保留了可用的文字与代码内容。
==Monorepo== ==是管理项目代码的一个方式，指在一个项目仓库====(repo)====中管理多个模块====/====包====(package)====。==

```
==Vue3====源码采用== ==monorepo== ==方式进行管理，将模块拆分到====package====目录中。==
```

```
==一个仓库可维护多个模块，不用到处找仓库==
```

==方便版本管理和依赖管理，模块之间的引用，调用都非常方便==

```
==#====Vue3====项目结构==
```

[](http://www.zhufengpeixun.com/jg-vue/guide/introduce.png)

==#====Vue3====采用====Typescript==
==Vue2== ==采用====Flow====来进行类型检测== ==（====Vue2====中对====TS====支持并不友好），== ==Vue3====源码采用====Typescript====来进行重写== ==,== ==对====Ts====的支持更加友好。==
 \> 来自

```
 <http://www.zhufengpeixun.com/jg-vue/guide/01.introduce.html#monorepo-%E7%AE%A1%E7%90%86%E9%A1%B9%E7%9B%AE>
```

:::
