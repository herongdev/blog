---
title: 利用java上传图片
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
- 使用FastDFS-Client 1.26.2
- 在我们的父工程里，已经有了相关依赖

![lyitemservice.iml m pom.xml lyitem.iml TI pom.xml ...](Exported%20image%2020260702234649-0.png)

`我们只要在子工程中直接引入坐标即可：`

![com.leyou upload 3 LyuploadApplicati 33 resources ...](Exported%20image%2020260702234651-1.png)

由于第一次使用，等待下载完成即可

使用方法：
在ly-upload下新建config包，建立配置文件FastClientImporter.java文件：
代码如下：
![Spec Pa ra m e Spu e SpuDetail e Stock resources l...](Exported%20image%2020260702234653-2.png)

`配置fdfs，修改ly-upload下的application.yml`

![lyupload com.leyou upload config e FastClientImpor...](Exported%20image%2020260702234656-3.png)

可以新建ly-upload/test/java/com.leyou.upload/FdfsTest类，进行测试：
![t h Spr ingRunner. crass eSpr1nqBoot rest pubiic A...](Exported%20image%2020260702234658-4.png) ![public void testup10adAndCreateThumb throvs FileNo...](Exported%20image%2020260702234705-5.png)

`测试结果：`

![rou FAt eh peg xBD61_6x6e. jpeg](Exported%20image%2020260702234708-6.png)

`测试完毕，现在修改我们的UploadService.java代码：`

![e Brand e Category e Sku e SpecGroup e SpecParam 2...](Exported%20image%2020260702234710-7.png)

`我们把路径和图片后缀等常量放到配置文件中去：`

![com.leyou upload config service e Upload Service w...](Exported%20image%2020260702234712-8.png)

- 新建配置文件：
- UploadProperties，用来读取配置文件，并把其中的值变成类的成员变量；

![e SpecParam e Spu e SpuDetail e Stock resources ly...](Exported%20image%2020260702234715-9.png)

`再修改一下代码，可以利用我们配置文件中的属性了：`

![e Sku e SpecGroup e SpecParam e Spu e SpuDetail e ...](Exported%20image%2020260702234717-10.png)

测试时发现报错，原来是nginx对上传的文件有大小限制，修改nginx.conf文件：
即设置client_max_body_size 10m;
此时再试用一下文件上传功能，发现图片可以上传了
![manage.leyou.comitembrand 0 oackend frontend mygit...](Exported%20image%2020260702234720-11.png)
