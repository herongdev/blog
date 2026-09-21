---
title: "Eclipse STS 安装使用"
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
description: "Eclipse 编辑器对 SpringBoot 项目的支持并不好，偶尔会出现一些奇怪的问题影响到初学者的学习，因此建议大家使用 IDEA 或者 STS 开发 SpringBoot 项目，这两个开发工具对于 SpringBoot 项目的支持都是十分完善的。本教程后续实战部分的开发工。"
sidebarWeight: 9
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue商城/准备工作及基础环境搭建（后端）/Eclipse STS 安装使用.md"
---
::: v-pre

# Eclipse STS 安装使用

> 本节目标：理解“Eclipse STS 安装使用”的核心思路，并能把它用于实际开发或面试表达。
`Eclipse` **编辑器对** `SpringBoot` **项目的支持并不好，偶尔会出现一些奇怪的问题影响到初学者的学习，因此建议大家使用** `IDEA` **或者** `STS` **开发** `SpringBoot` **项目，这两个开发工具对于** `SpringBoot` **项目的支持都是十分完善的。本教程后续实战部分的开发工具都是** `IDEA` **，但是考虑到有些朋友更熟悉** `Eclipse` **，因此增加了** `STS` **插件的介绍，我不希望因为编辑器的原因导致大家无法获得更好的学习体验。**
`Spring Tool Suite`==（后文会简称为==`STS`==）== ==是一个基于== `Eclipse` ==针对== `Spring` ==应用量身定制的开发环境，提供了开发== `Spring` ==应用必须的编码、调试、运行和部署功能。==`STS` ==在最新的== `Eclipse` ==发布版本基础上集成了== `Pivotal tc` ==服务器、==`Pivotal Cloud Foundry`==、==`Git`==、==`Maven`==、==`AspectJ` ==等必要的工具。==
`SpringSource Tool Suite` ==就是== `Spring Framework` ==官方在== `JavaEE` ==版== `Eclipse` ==工具上增加了== `Spring` ==开发插件的编辑器，其核心还是== `JavaEE` ==版本的== `Eclipse` ==工具，主要是对== `Eclipse` ==编辑器的功能扩展，并最大限度的支持== `Spring` ==相关应用的开发。美国当地时间==`2018`==年==`9`==月==`25`==日，==`Pivotal` ==正式宣布推出全新的== `Spring Tool Suite 4 GA` ==版！本课程演示安装的即是最新的== `STS 4` ==版本。==
==如果习惯使用== `Eclipse` ==编辑器的小伙伴，建议使用== `STS` ==进行== `SpringBoot` ==项目的开发。==
`STS` **安装包下载**
==首先到== `Spring Tools 4` ==的官方网站，网址如下：==

```
Spring Tools 4 for Eclipse
```
 ==选择对应的操作系统安装包，点击== `Download STS4` ==按钮下载即可，如下图：==
`STS` **安装**
==下载完成后，将压缩文件移动到安装目录，安装过程比较简单，将== `STS` ==的压缩包解压即可，过程如下面图片所示：==
`STS` ==作为== `Eclipse` ==编辑器的插件工具，也可以像其他== `Eclipse` ==插件通过插件安装的方式进行安装，朋友们也可以采用这种方式来安装== `STS` ==。==
`STS` **安装成功**
==安装成功后点击== `STS` ==的可执行程序==`SpringToolSuite4.exe`==，程序可以正常打开，在设置了工作目录后出现== `Eclipse` ==的编辑页面，安装成功，之后打开== `STS` ==并将== `Maven` ==配置好即可使用它来开发== `Spring Boot` ==项目了。==
`STS` ==同== `Eclipse` ==编辑器一样，是开源免费的，因此不需要向== `IDEA` ==一样进行付费授权等操作，可以免费使用。==

:::
