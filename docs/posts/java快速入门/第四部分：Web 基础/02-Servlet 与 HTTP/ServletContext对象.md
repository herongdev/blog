---
title: ServletContext对象
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Web基础, OneNote]
---
**概念：**
代表整个`web`应用，可以和程序的容器`(`服务器`)`来通信。

**获取：**
`1.` 通过`request`对象获取

request.getServletContext();
2.
通过`HttpServlet`获取
`this.getServletContext();`

**功能：**
`1.` 获取`MIME`类型：
`* MIME`类型`:`在互联网通信过程中定义的一种文件数据类型
`*` 格式： 大类型`/`小类型

- text/html  image/jpeg
- *

获取：`String getMimeType(String file)`

`2.` 域对象：共享数据

- 1. setAttribute(String name,Object value)
- 2. getAttribute(String name)
- 3. removeAttribute(String name)
- * ServletContext

对象范围：所有用户所有请求的数据，在一个请求中设置的属性，可以在另外一个请求中获取。用的时候要谨慎，生命周期长。

`3.` 获取文件的真实`(`服务器`)`路径
配置文件一般放三个地方，

`src`

目录，`web`目录，`WEN-INF`目录。
`1.` 方法：`String getRealPath(String path)`

`//web`目录下资源访问

//WEB-INF目录下的资源访问

String c = context.getRealPath("/WEB-INF/c.txt");
     System.out.println(c);

`//src`目录下的资源访问，`src`下的文件最终会放到

`WEB-INF/classes`

下：

String a = context.getRealPath("/WEB-INF/classes/a.txt");
System.out.println(a);
```
