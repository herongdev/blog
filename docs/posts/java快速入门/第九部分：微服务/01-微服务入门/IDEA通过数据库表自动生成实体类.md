---
title: IDEA通过数据库表自动生成实体类
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 微服务, OneNote]
---
首先连接数据库
选择想要生成实体类的表

![Exported image](Exported%20image%2020260703001111-0.png)

选择导入位置

![Exported image](Exported%20image%2020260703001113-1.png)

修改成自己想要的表名即可。

注意：有些同志并点击`Scripted Extensions`时并没有出现`Generate POJO.groovy`如何解决呢？

解决方法：
首先点击`Go To Scripts Directory`
其次右击`schema`，选中`Restore Default Extensions`

![Exported image](Exported%20image%2020260703001115-2.png)

再按之前的步骤操作就行了。
原文链接：

https://blog.csdn.net/wxbug/article/details/126806686
```
