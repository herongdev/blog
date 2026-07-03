---
title: Nginx
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
```
**什么是****Nginx**
Nginx是一款高性能的http 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器。由俄罗斯的程序设计师Igor Sysoev所开发，官方测试nginx能够支支撑5万并发链接，并且cpu、内存等资源消耗却非常低，运行非常稳定。开源、免费。
**Nginx****的应用场景**
1、http服务器。Nginx是一个http服务，可以独立提供http服务。可以做网页静态服务器。
2、虚拟主机。可以实现在一台服务器虚拟出多个网站。例如个人网站使用的虚拟主机。
3、反向代理，负载均衡。当网站的访问量达到一定程度后，单台服务器不能满足用户的请求时，需要用多台服务器集群可以使用nginx做反向代理。并且多台服务器可以平均分担负载，不会因为某台服务器负载高宕机而某台服务器闲置的情况。
**Nginx****负载均衡**
**什么是负载均衡**
负载均衡 建立在现有网络结构之上，它提供了一种廉价有效透明的方法扩展网络设备和服务器的带宽、增加吞吐量、加强网络数据处理能力、提高网络的灵活性和可用性。
负载均衡，英文名称为Load Balance，其意思就是分摊到多个操作单元上进行执行，例如Web服务器、FTP服务器、企业关键应用服务器和其它关键任务服务器等，从而共同完成工作任务。
如果在同一个域名下有多台服务器提供服务，此时需要nginx负载均衡。
**配置****Nginx****负载均衡**
nginx作为负载均衡服务器，用户请求先到达nginx，再由nginx根据负载配置将请求转发至 tomcat服务器。
nginx负载均衡服务器：10.10.1.146
tomcat1服务器：10.10.1.146:8080
tomcat2服务器：10.10.1.146:8081
![upstream tomcatserverl server server 10.10.1.146 8...](Exported%20image%2020260702233529-0.png)
![up e y v 127 0 9090dm v 127 0 80weight 2 server 12...](Exported%20image%2020260702233535-1.png)

- image.png
- 启动2个tomcat和nginx服务后即可看到效果：

![Home G 8080.wzf.com Documentation Configuration Ex...](Exported%20image%2020260702233540-2.png)
\> 来自

 \<https://www.jianshu.com/p/4f7d17a7ccbb\>
```
