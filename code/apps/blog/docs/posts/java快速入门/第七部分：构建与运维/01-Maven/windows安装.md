---
title: windows安装
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
lastUpdated: false
---
::: v-pre

一、环境：

- 1. JDK
- 2. Maven

程序包
二、下载：
`1.` 前往

https://maven.apache.org/download.cgi
下载最新版的`Maven`程序：



`2.` 将文件解压到`D:\Program Files\Apache\maven`目录下`:`
解压后目录结构如下：

`bin:`

存放了 `maven` 的命令，比如我们前面用到的

- mvn tomcat:run
- boot:

存放了一些 `maven` 本身的引导程序，如类加载器等

`conf:`

存放了 `maven` 的一些配置文件，如 `setting.xml` 文件

`lib:`

存放了 `maven` 本身运行所需的一些 `jar` 包
至此我们的 `maven` 软件就可以使用了，前提是你的电脑上之前已经安装并配置好了 `JDK`。
 

`3.` 新建环境变量`MAVEN_HOME`，赋值`D:\Program Files\Apache\maven`
系统变量：对所有的用户起作用
 用户变量：对当前用户起作用



`4.` 编辑环境变量`Path`，追加`%MAVEN_HOME%\bin\;`



`5. MAVEN_OPTS`

 `:` `-Xms128m -Xmx512m -Duser.language=zh -Dfile.encoding=UTF-8`
至此，`maven`已经完成了安装，我们可以通过`DOS`命令检查一下我们是否安装成功：
`mvn -v`



:::
