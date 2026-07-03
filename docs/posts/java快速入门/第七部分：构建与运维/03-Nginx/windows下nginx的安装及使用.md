---
title: windows下nginx的安装及使用
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
`1.`下载

nginx
http://nginx.org/en/download.html
 下载稳定版本，以

`nginx/Windows-1.12.2`

为例，直接下载 `nginx-1.12.2.zip`
下载后解压，解压后如下

![F nglnx1.12.2 H conf contrib temp nginx.exe 2017 1...](Exported%20image%2020260702225850-0.png)

`2.`启动`nginx`
有很多种方法启动

- nginx
- (1)

直接双击`nginx.exe`，双击后一个黑色的弹窗一闪而过
`(2)`打开`cmd`命令窗口，切换到`nginx`解压目录下，输入命令 `nginx.exe` 或者 `start nginx` ，回车即可
`3.`检查`nginx`是否启动成功
直接在浏览器地址栏输入网址 

http://localhost:80
，回车，出现以下页面说明启动成功

![C Welcome to nginx! Welcome to nginx! If you see t...](Exported%20image%2020260702225852-1.png)

也可以在`cmd`命令窗口输入命令 `tasklist /fi "imagename eq nginx.exe"` ，出现如下结果说明启动成功

![.12 .2taskIist Fi imagename eq nginx.exe g Inx. ex...](Exported%20image%2020260702225854-2.png)

 `nginx`的配置文件是`conf`目录下的`nginx.conf`，默认配置的`nginx`监听的端口为`80`，如果`80`端口被占用可以修改为未被占用的端口即可；
 ![n clude defaul t type log format access log t cp n...](Exported%20image%2020260702225856-3.png)

检查`80`端口是否被占用的命令是： `netstat -ano | findstr 0.0.0.0:80` 或 `netstat -ano | findstr "80"`
当我们修改了`nginx`的配置文件`nginx.conf` 时，不需要关闭`nginx`后重新启动`nginx`，只需要执行命令 `nginx -s reload` 即可让改动生效
`4.`关闭`nginx`
如果使用`cmd`命令窗口启动`nginx`，关闭`cmd`窗口是不能结束`nginx`进程的，可使用两种方法关闭

- nginx
- (1)

输入`nginx`命令  `nginx -s stop(`快速停止`nginx)`  或  `nginx -s quit(`完整有序的停止

- nginx)
- (2)

使用`taskkill`  

- taskkill /f /t /im nginx.exe
- 5.

使用`nginx`代理服务器做负载均衡
我们可以修改`nginx`的配置文件`nginx.conf` 达到访问`nginx`代理服务器时跳转到指定服务器的目的，即通过`proxy_pass` 配置请求转发地址，即当我们依然输入`http://localhost:80` 时，请求会跳转到我们配置的服务器
 同理，我们可以配置多个目标服务器，当一台服务器出现故障时，`nginx`能将请求自动转向另一台服务器，例如配置如下：

![upstream tomcat server server 8080 weight2 server ...](Exported%20image%2020260702225859-4.png)

当服务器 `localhost:8080` 挂掉时，`nginx`能将请求自动转向服务器 `192.168.101.9:8080` 。上面还加了一个`weight`属性，此属性表示各服务器被访问到的权重，`weight`
越高被访问到的几率越高。
`6.nginx`配置静态资源
 将静态资源（如`jpg|png|css|js`等）放在如下配置的`f:/nginx-1.12.2/static`目录下，然后在`nginx`配置文件中做如下配置`(`注意：静态资源配置只能放在 `location /` 中`)`，浏览器中访问 

 http://localhost:80/1.png
即可访问到 `f:/nginx-1.12.2/static`目录下的 `1.png`图片

![server I is ten server name local host charset koi...](Exported%20image%2020260702225904-5.png)
