---
title: "vue-cli 包安装"
date: 2026-08-11
categories:
  - "Vue 系统教程"
tags:
  - "Vue"
  - "Vue3"
  - "前端"
  - "教程"
  - "OneNote"
  - "快速开始与工程环境"
description: "vue cli 3.x 还提供了其专属的 vue add 命令，但是需要注意的是该命令安装的包是以 @vue/cli plugin 或者 vue cli plugin 开头，即只能安装 Vue 集成的包。 比如运行： vue add jquery 其会安装 vue cli plu。"
sidebarWeight: 38
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/安装配置/创建项目/vue-cli 包安装.md"
---
::: v-pre

# vue-cli 包安装

> 本节目标：理解“vue-cli 包安装”的核心思路，并能把它用于实际开发或面试表达。
==vue-cli 3.x== ==还提供了其专属的== ==vue add== ==命令，但是需要注意的是该命令安装的包是以== ==@vue/cli-plugin== ==或者== ==vue-cli-plugin== ==开头，即只能安装== ==Vue== ==集成的包。==
==比如运行：==
==vue add jquery======
==其会安装== ==vue-cli-plugin-jquery====，很显然这个插件不存在便会安装失败。又或者你运行：==
==vue add @vue/eslint======
==其会解析为完整的包名== ==@vue/cli-plugin-eslint====，因为该包存在所以会安装成功。==
==同时，不同于== ==npm== ==或== ==yarn== ==的安装，== ==vue add== ==不仅会将包安装到你的项目中，其还会改变项目的代码或文件结构，所以安装前最好提交你的代码至仓库。==
==另外== ==vue add== ==中还有两个特例，如下：==
**#** ==安装== ==vue-router========vue add router======
**#** ==安装== ==vuex========vue add vuex======
==这两个命令会直接安装== ==vue-router== ==和== ==vuex== ==并改变你的代码结构，使你的项目集成这两个配置，并不会去安装添加== ==vue-cli-plugin== ==或== ==@vue/cli-plugin== ==前缀的包。==
**结语**
==不积跬步无以至千里，不积小流无以成江海==

```
==文章中使用的一些== ==npm== ==包名为什么要用== ==@== ==开头？==
```

==除了文章中介绍的== ==browserslist== ==这样的配置项可以写在单独的文件中外，还有哪些常用的配置项可以这样操作？又是如何配置的？==

```
==Vue CLI 3== ==还集成了哪些包，可以通过== ==vue add== ==命令安装？==
```

:::
