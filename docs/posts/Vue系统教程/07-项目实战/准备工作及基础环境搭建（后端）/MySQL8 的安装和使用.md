---
title: "MySQL8 的安装和使用"
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
description: "2018 年， MySQL 8.0 正式版 8.0.11 已发布，官方表示 MySQL 8 要比 MySQL 5.7 快 2 倍，还带来了大量的改进和更快的性能！ 本教程使用的 MySQL 数据库版本是 8.0.11 ，如果你已经安装了其他版本的 MySQL 则可以忽略这一节，如。"
sidebarWeight: 14
lastUpdated: false
feed: false
source: onenote
sourceNote: "OneNote/f-vue/vue商城/准备工作及基础环境搭建（后端）/MySQL8 的安装和使用.md"
---
::: v-pre

# MySQL8 的安装和使用

> 本节目标：理解“MySQL8 的安装和使用”的核心思路，并能把它用于实际开发或面试表达。
`2018`==年，==`MySQL 8.0` ==正式版== `8.0.11` ==已发布，官方表示== `MySQL 8` ==要比== `MySQL 5.7` ==快== `2` ==倍，还带来了大量的改进和更快的性能！==
==本教程使用的== `MySQL` ==数据库版本是== `8.0.11` ==，如果你已经安装了其他版本的== `MySQL` ==则可以忽略这一节，如果你想掌握== `MySQL8` ==的安装使用则可以跟着十三的教程体验一把。==
**下载安装包**
==首先到== `MySQL8 Installer` ==的下载页面：==

```
dev.mysql.com/downloads/m
```

==…==
==选择对应的版本然后点击==`"Dowanload"`==按钮，之后会跳转到下载页面，点击页面下方的==`No thanks, just start my download.`==即可进行下载，过程如下图：==
**安装**
**解压至安装目录**
==首先是确定== `MySQL8` ==的安装目录，可以自行决定，十三是将其安装在==`F:\mysql-8.0.11-winx64`==目录下，解压安装包至安装目录下即可。==
**配置文件**
==在安装目录下新建配置文件==`my.ini`==，配置文件中写入：==

```
[mysqld] port=3306 basedir =F:\mysql-8.0.11-winx64 datadir =F:\mysqlData\max_allowed_packet = 20M
```
 ==保存即可，其中==`datadir`==为数据存储目录，十三将其放在了==`F:\mysqlData\`==目录下，你可以对应的进行修改。==
**初始化** `MySQL8`
==打开命令行，进入== `MySQL` ==的==`bin`==目录下，之后进行初始化，命令为：==
`mysqld --initialize --console`
==初始化成功后，命令行会打印出== `root` ==用户的初始密码==`(`==记得保存，如果没有报错或者忘记的话，删掉初始化的== `datadir` ==目录再次进行初始化即可==`)`==，过程如下图：==
**启动** `MySQL` **服务**
==在启动服务前，首先要将== `MySQL` ==安装为== `Windows` ==的系统服务，在== `MySQL` ==的== `bin` ==目录执行命令如下：== `mysqld --install mysql8`
==其中== `MySQL8` ==为服务名称，你可以自行修改成想要的名字。==
==服务注册成功后，就可以启动== `MySQL` ==服务了，执行命令：==

```
net start mysql8
```
 **登录** `MySQL`
==服务启动成功后，则可以登录== `MySQL` ==服务器了，在== `bin` ==目录下执行==`mysql -uroot -p`==，输入刚刚保存的密码即可，不过首次登录==`mysql`==时需要修改== `root` ==用户密码，不然是无法进行操作的，因此需要执行修改== `root` ==用户密码操作：==

```
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '131313';FLUSH PRIVILEGES;
```
 ==十三修改密码为==`131313`==，你可以按照你的要求进行设置，之后就可以进行操作了。==
**验证**
==通过客户端连接== `MySQL8` ==，输入用户名密码无报错即为登录成功，如下图：==
==安装成功！==
==还是要再提醒一下各位，如果已经安装了其他版本的== `MySQL` ==也是可以的，后续实战教程对于== `MySQL` ==版本没有特殊要求。==

:::
