---
title: 修改files数据模型
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 常见需求, OneNote]
---
修改files数据模型
在ms-system或ms-common模块中找到与files表对应的实体类（可能名为File或其他名称）。添加新的字段以及它们的getters和setters。

// 在对应的File类中
private String convertedPath;
private Integer convertedStatus;
private String convertedMsg;

// 添加对应的getters和setters
