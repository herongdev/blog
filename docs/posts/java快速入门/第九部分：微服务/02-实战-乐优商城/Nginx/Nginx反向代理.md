---
title: Nginx反向代理
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
Nginx只做请求的转发，后台有多个http服务器提供服务，nginx的功能就是把请求转发给后面的服务器，决定把请求转发给谁。
![5 5 9 120 4 1.2 0 b om 6 135 69 121 tw,vbalducom 6...](Exported%20image%2020260702233717-0.png)

- 在一个虚拟机上创建两个tomcat实例，模拟多个服务器。
- 通过访问不同的域名访问运行在不同端口的tomcat
- 8080.wzf.com 访问运行8080端口的tomcat
- 8081.wzf.com 访问运行8081端口的tomcat
- **1****、域名需要配置****host****文件：**

![ptc h 2018610 1126 2028610 1124 LJNREGISTEREO Fil ...](Exported%20image%2020260702233724-1.png)

**2****、安装两个****tomcat****，它们的端口号分别为****8080****、****8081****，并修改相应的****index.jsp****加以区分。**
![C Home G 10.10.1.146u8 arcgis a ArcGISAp1fotJava D...](Exported%20image%2020260702233728-2.png)

- **3****、****Nginx****的配置**
- 修改Nginx的原始配置文件：

![upstream omca server server 10.10.1.146 8080 upst ...](Exported%20image%2020260702233734-3.png)

**4****、分别启动****2****个****tomcat****和****nginx****服务后，即可看到效果：**
![C 8080_wzf.com Home Documentation Configuration Ex...](Exported%20image%2020260702233738-4.png)
