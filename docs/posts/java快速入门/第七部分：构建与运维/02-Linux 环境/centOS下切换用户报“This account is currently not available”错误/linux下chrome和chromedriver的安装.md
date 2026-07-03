---
title: linux下chrome和chromedriver的安装
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
```
1、安装chrome
用下面的命令安装最新的 Google Chrome
yum install [https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm](https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm)
也可以下载到本地再安装
wget [https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm](https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm)
yum install ./google-chrome-stable_current_x86_64.rpm￼
 安装必要的库
yum install mesa-libOSMesa-devel gnu-free-sans-fonts wqy-zenhei-fonts
 
2、安装 chromedriver
chrome官网 wget [https:](https://chromedriver.storage.googleapis.com/2.38/chromedriver_linux64.zip)//chromedriver.storage.googleapis.com/2.38/chromedriver_linux64.zip
淘宝源（推荐）wget [http://npm.taobao.org/mirrors/chromedriver/2.41/](http://npm.taobao.org/mirrors/chromedriver/2.41/chromedriver_linux64.zip)chromedriver_linux64.zip
  
将下载的文件解压，放在如下位置
unzip chromedriver_linux64.zip
/usr/bin/chromedriver
给予执行权限
chmod +x /usr/bin/chromedriver

还可以参考这篇文章，虽然没试过，但感觉很牛逼 
 [https://intoli.com/blog/installing-google-chrome-on-centos/](https://intoli.com/blog/installing-google-chrome-on-centos/)
 \> 来自

 \<https://www.cnblogs.com/z-x-y/p/9506941.html\>
```
