---
title: java下载安装
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Java基础, OneNote]
---
1. 前往https://www.oracle.com/java/technologies/downloads
2. 登录，账号：379925144@com 密码：Hr@#
3. 下载：mac版本： [https://www.oracle.com/java/technologies/downloads](https://www.oracle.com/java/technologies/downloads) mac有压缩档和安装程序dmg两种，dmg要容易一些；

`JDK11` 安装（`win10`）

- 与一般安装没有什么区别，但要记住或设置好安装的目录，设置环境变量要用到；
- 安装完成后，配置环境变量，默认的安装的话，配置的地址是：`C:\Program Files\Java\jdk-11.0.16\bin`
- 打开`cmd`，输入`java`，如果出现用法提示，表明安装成功：

_用法：_`java [options] \<`_主类_

`\> [args...]`

_（执行类）_
_或_ `java [options] -jar \<jar` _文件_

`\> [args...]`

_（执行_ `jar` _文件）_
_或_ `java [options] -m \<`_模块_`\>[/\<`_主类_

- \>] [args...]
- java [options] --module \<

_模块_`\>[/\<`_主类_

`\>] [args...]`

_（执行模块中的主类）_
_或_ `java [options] \<`_源文件_

`\> [args]`

_（执行单个源文件程序）_

**mac安装：**
在安装JDK之前，先查看下自己电脑是否已经安装了JDK。
打开终端，输入java -version并回车。
2.从[官网](https://link.jianshu.com/?t=http%3A%2F%2Fwww.oracle.com%2Ftechnetwork%2Fjava%2Fjavase%2Fdownloads%2Findex.html)下载需要的JDK版本
链接：[http://www.oracle.com/technetwork/java/javase/downloads/](https://link.jianshu.com/?t=http%3A%2F%2Fwww.oracle.com%2Ftechnetwork%2Fjava%2Fjavase%2Fdownloads%2F)
**3.** JDK安装。MAC系统JDK安装是很简单的，一路下一步就ok了。
**4.**配置Java开发环境
以下是配置环境变量：
**MAC默认安装目录为/Library/Java/JavaVirtualMachines/**
此时需要从Home打开终端，有两种方法。
第一种方法:在Home文件夹处右击——服务——新建位于文件夹位置的终端窗口
第二种方法：直接打开终端 键入：cd /Library/Java/JavaVirtualMachines/jdk1.8.0_101.jdk/Contents/Home/，然后回车；
打开的是相同的终端窗口
输入sudo -i vi /etc/.bash_profile命令，并回车。
输入密码并回车。在弹出的页面中**按i键**开始输入以下内容
 

1. ==JAVA_HOME=========/Library/====Java====/====JavaVirtualMachines====/====jdk1====.====8.0====_101====.====jdk====/====Contents====/====Home====/==

3. ==CLASSPAHT=====.:====$JAVA_HOME====/====lib====/====dt====.====jar====:====$JAVA_HOME====/====lib====/====tools====.====jar==

5. ==PATH=========$JAVA_HOME====/====bin====:====$PATH====:==

7. ==export== ==JAVA_HOME==

9. ==export== ==CLASSPATH==

11. ==export== ==PATH==

 
 
完成后按esc键退出编辑，再输入**:wq** 保存刚刚的操作,输入source /etc/.bash_profile并回车，使配置生效;
在终端输入java和javac 分别出现如下界面，则配置成功。
 
来自 \< [https://zhuanlan.zhihu.com/p/357903259](https://zhuanlan.zhihu.com/p/357903259)
