---
title: @PostConstruct
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Spring, OneNote]
---
- 该注解是用于在依赖注入完成后进行一些初始化操作。@PostConstruct 注解的方法会在所有必需的依赖注入完成后，但在任何初始化回调（例如，Database initialization）之前调用。
