---
title: "JDK8安装配置"
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
description: "下载 地址： https://www.oracle.com/cn/java/technologies/javase downloads.html 根据系统选择需要下载的安装包 安装 下载完成后，点击安装包进行安装 ； 安装过程中将公共 JRE 取消安装，因为 JDK 中已经包含。"
sidebarWeight: 12
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue商城/准备工作及基础环境搭建（后端）/JDK8安装配置.md"
---
::: v-pre

# JDK8安装配置

> 本节目标：理解“JDK8安装配置”的核心思路，并能把它用于实际开发或面试表达。
**下载**
==地址：==[https://www.oracle.com/cn/java/technologies/javase-downloads.html](https://www.oracle.com/cn/java/technologies/javase-downloads.html)
==根据系统选择需要下载的安装包==
**安装**
==下载完成后，点击安装包进行安装====；==
==安装过程中将公共== `JRE` ==取消安装，因为== `JDK` ==中已经包含== `JRE` ==了，过程如下图：==
**配置环境变量**
==右键==`"`==我的电脑==`"`==，依次进入==`"`==属性==`"-\>"`==高级系统设置==`"-\>"`==环境变量==`"`==，点击新建按钮====：==

1. ==首先添加==`JAVA_HOME`==变量，变量值为安装步骤中选择的安装路径==`F:\Java\jdk1.8.0_171`==。==
2. ==再====编辑== `PATH` ==变量，在变量的末尾添加==`;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;`
3. ==最后增加==`CLASS_PATH`==变量，同添加==`JAVA_HOME`==变量的过程一样，点击新建按钮，输入变量名，并输入变量值==`.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar`==，环境变量设置完成。==

**检查**
==打开命令提示符，输入==`java -version`==，输出版本号正确即可====则====配置成功====。==

:::
