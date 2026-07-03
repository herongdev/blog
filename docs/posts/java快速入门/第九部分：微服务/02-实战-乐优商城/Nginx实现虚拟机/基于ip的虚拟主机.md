---
title: 基于ip的虚拟主机
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
**1****、基于****ip****的虚拟主机**
需要一台服务器绑定多个ip地址。
**方法一（系统重启后会失效）：**
使用标准的网络配置工具（比如ifconfig和route命令）添加lP别名：
**方法二（永久修改，推荐）：**
1、将/etc/sysconfig/network-scripts/ifcfg-eth0文件复制一份，命名为ifcfg-eth0:1
修改其中内容：
DEVICE=eth0:1
IPADDR=192.168.25.103
其他项不用修改
2、重启系统：reboot
**配置****nginx****基于****ip****地址的虚拟主机**
基于ip的虚拟主机配置（配置多个server，把server_name修改为虚拟的ip地址）：
修改Nginx的原始配置文件：
![server listen server name 10.10.1.146 location roo...](Exported%20image%2020260702233653-0.png)

- 复制Nginx安装目录下的html文件夹，并将其中的index.html稍作修改：
- 重启Nginx服务即可。
