---
title: 1-安装libfastcommon
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
`FastDFS` 将以前版本的公共的一些函数单独封装成了`libfastcommon`包，所以在安装`FastDFS`之前我们还必须安装`libfastcommon`。

- ==进入目录：====cd libfastcommon-1.0.38==
- ==执行编译：====./make.sh==
- ==安装：====./make.sh install==

![roothzabj mind204 us r local s rclibfastcommonl. 0...](Exported%20image%2020260702234515-0.jpeg)

==可能遇到的问题：==
==-bash====:== ==make====: command== ==not found====￼====-bash====:== ==gcc====: command== ==not found==

==解决方案：==
==debian====通过====apt-====get install gcc make====安装====￼====centos====通过====yum -y install gcc make====安装==

`libfastcommon.so` 默认安装到了`/usr/lib64/libfastcommon.so`，但是`FastDFS`主程序设置的`lib`目录是`/usr/local/lib`，
所以此处需要重新设置软链接（类似于`Windows`的快捷方式）：

ln -s /usr/lib64/libfastcommon.so /usr/local/lib/libfastcommon.so
ln -s /usr/lib64/libfdfsclient.so /usr/local/lib/libfdfsclient.so
ln -s /usr/lib64/libfdfsclient.so /usr/lib/libfdfsclient.so
```
