---
title: centOS下切换用户报“This account is currently not available”错误
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
```
上网搜索了一圈之后发现是用户的shell禁止登录了
**解决方法：**
只要开启shell登录即可。
**操作步骤：**
**1.**用vi查看账户信息
cat /etc/passwd | grep 用户名
发现它的shell是“/sbin/nologin”（表示禁止shell登录），需要将起改成"/bin/bash",如下图所示：
![Exported image](Exported%20image%2020260702224756-0.png)

- **2**.修改信息
- vi /etc/passwd

![cpdump x 72 72 inzno log in erong x IBBB IBBB hero...](Exported%20image%2020260702224759-1.png)

输入命令修改完毕后，保存退出
**3**.切换用户
su 用户名
**补充操作：**
查看系统中有哪些用户：cut -d : -f 1 /etc/passwd 
查看可以登录系统的用户：cat /etc/passwd | grep -v /sbin/nologin | cut -d : -f 1 
查看用户操作：w命令(需要root权限) 
查看某一用户：w 用户名 
查看登录用户：who 
查看用户登录历史记录：last
 \> 来自

 \<https://blog.csdn.net/Muz_victory/article/details/88814160\>
```
