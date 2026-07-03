---
title: 在common中实现我们的接口
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
`先新增三个依赖：`

![lycommon resources lycommon.iml m pom.xml lygatewa...](Exported%20image%2020260702235018-0.png)

`新建我们的通用Mapper类：`

![vaStudyleyou Java com.leyou.common advice enums ex...](Exported%20image%2020260702235020-1.png)

`注意，不要引错包，特别是InsertListMapper包`

![Mapper import tk batis .mapper .additional. idlist...](Exported%20image%2020260702235025-2.png)

让我们的StockMapper继承我们自己实现的BaseMapper;
![package com.leyou . item. mapper import com.leyou ...](Exported%20image%2020260702235034-3.png)
