---
title: serviceImpl
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
- 添加@Service注解
- 定义private Mapper变量，要调用Mapper，添加@Resource注解；
- 如果要调用其它Service也要添加@Resource注解；
- 定义方法，方法返回的还是DO或POJO类型；
- 在controller中添加转换类，将DO转换为RespVO，返回给前端；
