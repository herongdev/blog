---
title: 彻底删除CentOS上的Nginx
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
**删除使用****yum****安装的****nginx****方法**
1.停止Nginx软件
[root@localhost ~]# service nginx stop
2.删除Nginx的自动启动
[root@localhost ~]# chkconfig nginx off
3.从源头删除Nginx
[root@localhost ~]# rm -rf /usr/sbin/nginx￼[root@localhost ~]# rm -rf /etc/nginx￼[root@localhost ~]# rm -rf /etc/init.d/nginx￼4.再使用yum清理
  [root@localhost ~]# yum remove nginx
 \> 来自

 \<https://blog.csdn.net/xinyflove/article/details/83108379\>
```
