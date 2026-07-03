---
title: 分布式文件系统FastDFS安装教程
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
==FastDFS(Fast Distributed File System)====是一款开源轻量级分布式文件系统。==

准备安装资源：

FastDFS所有资源都可以在Yuqing的git仓库中找到：

[https://github.com/happyfish100/](https://github.com/happyfish100/)

nginx可在官网下载：

[http://nginx.org/en/download.html](http://nginx.org/en/download.html)

下载资源可以采用以下方法：

==直接下载压缩包再传输到====liux====目录或直接在====linux====下载相应格式安装包；==

==通过====wget====命令，====w====get====默认下载到用户根目录；==

==使用====git clone====命令（如：==

==git clone== ==https://github.com/happyfish100/libfastcommon.git== ==--depth 1====）；==

==准备工作==
|
|
- 说明
- 位置
- 所有安装包
- /usr/local/src
- 数据存储位置
- /home/dfs/
- #这里我为了方便把日志什么的都放到了dfs

|

==mkdir /home/dfs== ==#====创建数据存储目录====￼====cd== ==/usr/local/src== ==#====切换到安装目录准备下载安装包==
```
