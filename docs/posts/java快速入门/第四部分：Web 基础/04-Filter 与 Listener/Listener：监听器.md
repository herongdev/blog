---
title: Listener：监听器
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Web基础, OneNote]
---
**概念：**`web`**的三大组件之一**

**事件监听机制**
`*` 事件 ：一件事情
`*` 事件源 ：事件发生的地方
`*` 监听器 ：一个对象
`*` 注册监听：将事件、事件源、监听器绑定在一起。 当事件源上发生某个事件后，执行监听器代码

`ServletContextListener`：监听`ServletContext`对象的创建和销毁

**方法：**
`* void contextDestroyed(ServletContextEvent sce)` ：`ServletContext`对象被销毁之前会调用该方法
`* void contextInitialized(ServletContextEvent sce)` ：`ServletContext`对象创建后会调用该方法

**步骤：**
`1.` 定义一个类，实现`ServletContextListener`接口
`2.` 复写方法
`3.` 配置

- 1. web.xml
- \<listener\>
- \<listener-class\>
- cn.itcast.web.listener.ContextLoaderListener
- \</listener-class\>
- \</listener\>
- *

指定初始化参数

- \<context-param\>
- 2.

注解：
`* @WebListener`
