---
title: "Maven的安装和配置"
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
description: "下载 地址： http://maven.apache.org/download.cgi 安装 1. 选择 任一非中文 目录进行解压后， 无需安装。 2. 配置 Maven 命令的环境变量 ： 新增 MAVEN HOME 变量，变量值为安装 目录。 3. 之后在修改 PATH 环境。"
sidebarWeight: 13
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue商城/准备工作及基础环境搭建（后端）/Maven的安装和配置.md"
---
::: v-pre

# Maven的安装和配置

> 本节目标：理解“Maven的安装和配置”的核心思路，并能把它用于实际开发或面试表达。
**下载**
==地址：==[http://maven.apache.org/download.cgi](http://maven.apache.org/download.cgi)
**安装**

1. ==选择====任一非中文====目录进行解压后，====无需安装。==
2. ==配置== `Maven` ==命令的环境变量====：====新增==`MAVEN_HOME`==变量，变量值为安装====目录。==
3. ==之后在修改==`PATH`==环境变量，在末尾增加==`;%MAVEN_HOME%\bin;`==即可。==

**配置文件**
==修改配置文件，====位置在====安装目录下的==`conf`==目录，找到==`settings.xml`==文件，修改为如下配置即可：==

```
<?xml version="1.0" encoding="UTF-8"?><settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
<!--
```

==本地仓库的路径== ==十三设置的是==`D`==盘==`maven/repo`==目录下== `(`==自行配置一个文件夹即可，默认是==

```
~/.m2/repository) --><localRepository>D:\maven\repo</localRepository>    <!--
```

==配置阿里云镜像服务器== ==国内镜像速度会快一些==

```
 --> <mirror>        <id>alimaven</id>        <name>aliyun maven</name>        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>        <mirrorOf>central</mirrorOf>            </mirror>
</settings>
```
 ==以上配置的含义是添加了一个阿里云的== `Maven` ==镜像，这样在下载== `jar` ==包依赖的时候会快很多，不用从国外的== `Maven` ==仓库下载，可以节省很多时间。==
**验证**

```
mvn -v
```
 ==能够正常显示== `Maven` ==安装信息即可：==

:::
