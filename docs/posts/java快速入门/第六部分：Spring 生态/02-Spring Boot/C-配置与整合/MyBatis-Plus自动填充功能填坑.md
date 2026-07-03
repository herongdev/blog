---
title: MyBatis-Plus自动填充功能填坑
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
隐 风

于 2021-10-04 00:05:46 发布

3273
收藏
分类专栏： springboot企业级实战 文章标签： java
版权

springboot企业级实战
专栏收录该内容
5 篇文章4 订阅
已订阅
使用strictInsertFill填充字段的时候，需要保证字段类型和填充类型一致

/**
* @author yinfeng
* @description mybatis-pluis代码填充
* @since 2021/10/3 22:32
*/
public class MyMetaObjectHandlerAdvice implements MetaObjectHandler {

@Override
public void insertFill(MetaObject metaObject) {
//this.strictInsertFill(metaObject, "createTime", () -\> LocalDateTime.now()
// ,LocalDateTime.class); 类型不一致，填充失败
this.strictInsertFill(metaObject, "createTime", Date.class, new Date());
this.strictInsertFill(metaObject, "updateTime", Date.class, new Date());
}

@Override
public void updateFill(MetaObject metaObject) {
this.strictUpdateFill(metaObject, "updateTime", Date.class, new Date());
}
}
————————————————
版权声明：本文为CSDN博主「隐 风」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/a1774381324/article/details/120600058
