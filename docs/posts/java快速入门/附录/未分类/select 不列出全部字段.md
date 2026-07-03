---
title: select 不列出全部字段
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 附录, OneNote]
---
名字中包含雨且年龄不小于`40`，**只取指定字段**
`queryWrapper.select("id","name").like("name","`雨`").lt("age",40);`

**排除指定列**
`queryWrapper.like("name","`雨

").lt("age",40).select(User.class,info-\>!info.getColumn().equals("create_time")&&info.getColumn().equals("manager_id
“`))`；
