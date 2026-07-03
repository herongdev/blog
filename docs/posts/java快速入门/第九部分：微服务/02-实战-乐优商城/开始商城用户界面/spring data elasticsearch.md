---
title: spring data elasticsearch
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
`新建一个demo工程，`

![New Groupld Artifact Id Version com.leyou.demo esd...](Exported%20image%2020260702235935-0.png)
![New Project na me Project location More Settings M...](Exported%20image%2020260702235936-1.png)

`引入依赖`

![versionl . 8 SNAPSHOTversion nameelasticsearchname...](Exported%20image%2020260702235937-2.png)

`创建启动类`

![esdemo com.leyou EsApplication resources 6 applica...](Exported%20image%2020260702235939-3.png)

`配置文件类`

![esdemo resou rces 6 application.yml spring data el...](Exported%20image%2020260702235941-4.png)

`准备实体类：`

![esdemo com.leyou Item repository EsApplication res...](Exported%20image%2020260702235948-5.png)

`新建测试类：`

![esdemo com.leyou e Item repository EsApplication r...](Exported%20image%2020260702235953-6.png) ![ees.demo EST est es.repository m pom.xml Scratches...](Exported%20image%2020260702235957-7.png)

- 如何实现复杂查询：
- 只要在我们之前定义的接口中写上自己的抽象方法即可，它会帮我们实现

![x application.yml x EsApplicationjava pom.xml pack...](Exported%20image%2020260703000014-8.png)

`然后我们就可以在我们的测试类中使用方法了：`

![Test public void testFind Iterableltem all reposit...](Exported%20image%2020260703000019-9.png)

其原理是根据方法名中的关键词来得到相应的查询条件，这叫做自定义查询，方法名必须遵循一定的命名规范才可以

这个spring Data elasticsearch功能强大，只是在聚合功能的实现上无法封装，这主要和实际需求复杂多样有关。
```
