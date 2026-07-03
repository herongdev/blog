---
title: api项目目录结构
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
==主体目录结构如下：==

`newbee-mall-api￼`

==├──==

`src/main/java￼`

==└──==

`ltd.newbee.mall￼`

==├──== `common //` ==存放相关的常量配置及枚举类==

`￼`

==├──== `config //` ==存放== `web` ==配置类==

`￼`

==├──== `api //` ==存放控制类，包括所有的== `API` ==处理类==

`￼`

==├──== `param //` ==存放请求时的参数实体==

`￼`

==└──== `vo //` ==存放接口响应返回给前端的== `view object` ==实体==

`￼`

==├──== `dao //` ==存放数据层接口==

`￼`

==├──== `entity //` ==存放实体类==

`￼`

==├──== `service //` ==存放业务层方法==

`￼`

==├──== `util //` ==存放工具类==

`￼`

==└──== `NewBeeMallAPIApplication // Spring Boot` ==项目主类==

`￼`

==├──==

`src/main/resources￼`

==├──== `mapper //` ==存放== `MyBatis` ==的通用== `Mapper`==文件==

`￼`

==├──== `application.properties //` ==项目配置文件==

`￼`

==├──== `newbee_mall_v2_schema.sql //` ==项目所需的== `SQL` ==文件==

`￼`

==└──== `upload.zip //` ==商品图片==

`￼`

==└──== `pom.xml // Maven` ==配置文件==
==接口文档的生成是使用== `Swagger`==，启动后大家也会看到所有的接口类。==
==除了== `Spring Boot` ==项目的基础目录外，我还在== `resources` ==目录中上传了== `newbee_mall_v2_schema.sql` ==文件和== `upload.zip` ==文件，这是项目启动时所需的两个文件，==`newbee_mall_v2_schema.sql` ==是商城项目的== `SQL` ==文件，包含了项目所需的所有表结构和初始化数据，==`upload.zip` ==文件则是商品图片文件，我在商品表中存储了数百条记录，主要是为了大家可以更好的学习和体验，这些数据的图片文件就是== `upload.zip` ==这个压缩包，如果没有这个压缩包，你在启动项目后看到所有页面的商品图片都是== `404`==，这并不是一个很好的学习体验，这两个文件的作用即是如此，后面我会继续介绍它们的使用和配置。==

\> 来自 \<[https://juejin.cn/book/6844733826191589390/section/6844733826279669774](https://juejin.cn/book/6844733826191589390/section/6844733826279669774)\>
