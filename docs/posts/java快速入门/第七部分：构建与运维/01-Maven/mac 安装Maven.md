---
title: mac 安装Maven
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
要注意版本的选择，要与jdk和springboot版本兼容；
Maven 安装及配置大体可以划分为三个步骤：下载、安装和配置。
1.下载
打开 Maven 官方下载页面：[[https://maven.apache.org/download.cgi#](https://links.jianshu.com/go?to=https%3A%2F%2Fmaven.apache.org%2Fdownload.cgi%23)，点击下载链接即可开始下载：]

clipboard_20211201_041716.png
以 Maven 3.8.4 为例，解压后可以看到文件夹：apache-maven-3.8.4。
进行下一步之前，需要按照官方说明确认 JDK 已安装完成：

clipboard_20211201_041816.png
打开命令行终端，输入命令：`java -version`

clipboard_20211201_041922.png
如果可以看到类似输出（可能 JDK 版本不一样），表示 JDK 已安装完成，且工作正常。
2.安装
将文件夹 apache-maven-3.8.4 拷贝或移动至系统目录 /usr/local（也可以根据个人喜好选择其它目录），Maven 安装完成。
注：涉及系统目录或系统文件的操作，可以需要 sudo 权限，下同。
3.配置
Maven 配置文件：/usr/local/apache-maven-3.8.4/conf/settings.xml。
本地仓库目录
Maven 本地仓库用于缓存已下载（远程）的 Jar 及相关文件，默认目录为用户主目录（~/.m2/repository），如果是win系统会占用C盘空间。建议统一配置为其它目录：

vim settings.xml￼//
==建议在==`maven`==目录下==`bin`==同级创建==`mvn_resp`==目录用来存放==

￼\<localRepository\>/usr/local/apache-maven-3.8.4/mvn_resp\</localRepository\>
 阿里云仓库镜像
添加阿里云仓库镜像，加速文件下载（远程）速度。

vim settings.xml￼
\<mirror\>\<id\>aliyunmaven\</id\>\<mirrorOf\>*\</mirrorOf\>\<name\>aliyun\</name\>\<url\>https://maven.aliyun.com/repository/public\</url\>\</mirror\>
 系统环境变量
打开命令行终端，输入命令：mvn -version，会提示找不到命令;
需要将 mvn 添加到系统环境变量里：

vim ~/.bash_profile ￼
export M2_HOME=/usr/local/apache-maven-3.8.4 ￼export PATH=$PATH:$M2_HOME/bin ￼
 vim命令：
MAC 终端编辑完成后如何保存
如果是vi，则：输入i表示开始输入，Esc 退出编辑模式，输入以下命令：
:wq 保存后退出vi，若为:wq!则为强制储存后退出（常用）
:w 保存但不退出（常用）
:w! 若文件属性为『只读』时，强制写入该档案
:q 离开 vi （常用）
:q! 若曾修改过档案，又不想储存，使用!为强制离开不储存档案。
:e! 将档案还原到最原始的状态！
注：Mac 系统环境变量配置文件支持多个，这里仅以 ~/.bash_profile 为例。
添加完成之后，可以手动执行命令：

`source ~/.bash_profile ￼`
 强制系统环境变量生效；或者也可以关闭/重新打开命令行终端，系统环境变量会自动生效。再次输入命令：mvn -version
如果可以看到类似输出（可能 Maven 或 JDK 版本不一样），表示 Maven 已安装完成，且工作正常。
