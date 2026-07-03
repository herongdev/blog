---
title: nginx 更改用户组
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
为什么要更改 Nginx 服务的默认用户：就像更改 ssh 的默认 22 端口一样，增加安全性，Nginx 服务的默认用户是 nobody ，我们更改为 nginx
方法一：

为 nginx 添加用户

useradd nginx -s /sbin/nologin -M

更改 Nginx 配置文件

worker_processes 1;
user nginx nginx; # 指定Nginx服务的用户和用户组
}
}

events {
worker_connections 1024;
http {
include mime.types;
default_type application/octet-stream;
sendfile on;
keepalive_timeout 65;
server_tokens off;
server {
listen 80;
server_name [www.abc.com](http://www.abc.com);
location / {
root html/www;
index index.html index.htm;
}
}
方法二：在编译Nginx软件时直接指定编译的用户和组，命令如下
./configure --user=nginx --group= nginx --prefix.............

最后，重新加载nginx 并且 验证是否生效，可在root用户下操作
启动：
nginx可以通过命令行来启动，操作命令
启动：nginx
停止：nginx -s stop
重新加载：nginx -s reload

查看nginx进程信息
ps -ef | grep nginx
```
