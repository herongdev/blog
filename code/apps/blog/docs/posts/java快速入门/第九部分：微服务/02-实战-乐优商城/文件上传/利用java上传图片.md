---
title: 利用java上传图片
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
lastUpdated: false
---
::: v-pre

- 使用FastDFS-Client 1.26.2
- 在我们的父工程里，已经有了相关依赖



`我们只要在子工程中直接引入坐标即可：`



由于第一次使用，等待下载完成即可

使用方法：
在ly-upload下新建config包，建立配置文件FastClientImporter.java文件：
代码如下：


`配置fdfs，修改ly-upload下的application.yml`



可以新建ly-upload/test/java/com.leyou.upload/FdfsTest类，进行测试：
 

`测试结果：`



`测试完毕，现在修改我们的UploadService.java代码：`



`我们把路径和图片后缀等常量放到配置文件中去：`



- 新建配置文件：
- UploadProperties，用来读取配置文件，并把其中的值变成类的成员变量；



`再修改一下代码，可以利用我们配置文件中的属性了：`



测试时发现报错，原来是nginx对上传的文件有大小限制，修改nginx.conf文件：
即设置client_max_body_size 10m;
此时再试用一下文件上传功能，发现图片可以上传了


:::
