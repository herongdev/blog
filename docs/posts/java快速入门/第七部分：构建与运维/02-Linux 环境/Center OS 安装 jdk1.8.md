---
title: Center OS 安装 jdk1.8
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
```
**1****、源码包准备：**
首先到官网下载jdk-8u66-linux-x64.tar.gz，
[http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
**2****、解压源码包**
通过终端在/usr/local目录下新建java文件夹，命令行：

==sudo mkdir /usr/local/java====￼==然后将下载到压缩包拷贝到java文件夹中，命令行：

进入jdk源码包所在目录

==cp jdk-8u66-linux-x64.tar.gz /usr/local/java====￼==然后进入java目录，命令行：

==cd /usr/local/java====￼==解压压缩包，命令行：

==sudo tar zxvf jdk-8u66-linux-x64.tar.gz====￼==然后可以把压缩包删除，命令行：

==sudo rm jdk-8u66-linux-x64.tar.gz==

**3****、设置****jdk****环境变量**
这里采用全局设置方法，就是修改etc/profile，它是是所有用户的共用的环境变量

==vi /etc/profile==

打开之后在末尾添加
export JAVA_HOME=/usr/local/java/jdk1.8.0_171
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH

使环境变量生效

source /etc/profile

添加软链接

ln -s /usr/local/java/jdk1.8.0_171/bin/java /usr/bin/java

**5****、检验是否安装成功**
在终端

==java -version==

看看是否安装成功，成功则显示如下
![rootLocaLhost jd 3va version TM SE Runtime Hotspot...](Exported%20image%2020260702224829-0.png)
\> 来自

 \<https://www.jianshu.com/p/d5a335c7da2b\>
```
