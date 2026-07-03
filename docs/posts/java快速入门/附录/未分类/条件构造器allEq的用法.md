---
title: 条件构造器allEq的用法
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 附录, OneNote]
---
![params params, boolean nu1121sNu11 allEqb001ean co...](Exported%20image%2020260702225657-0.png)

其中第二个方法表示，map中值为null的条件会过滤掉
 ![Test public void selectByA11Eq new queryurapper ne...](Exported%20image%2020260702225658-1.png)

allEq(BiPredicate\<R, V\> filter, Map\<R, V\> params)￼allEq(BiPredicate\<R, V\> filter, Map\<R, V\> params, boolean null2IsNull)￼allEq(boolean condition, BiPredicate\<R, V\> filter, Map\<R, V\> params, boolean null2IsNull)
如：

![Test public void selectByA11Eq new queryWrapper ma...](Exported%20image%2020260702225700-2.png)
