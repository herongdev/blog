---
title: 案例：response综合应用
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Web基础, OneNote]
---
案例：
`1.` **完成重定向**
`*` 重定向：资源跳转的方式
`*` 代码实现：
`//1.` 设置状态码为

302
response.setStatus(302);
//2.
设置响应头

location
response.setHeader("location","/day15/responseDemo2");
//
简单的重定向方法
`response.sendRedirect("/day15/responseDemo2");`

`forward` **和** `redirect` **区别**
`*` 重定向的特点

- :redirect
- 1.

地址栏发生变化
`2.` 重定向可以访问其他站点`(`服务器`)`的资源
`3.` 重定向是两次请求。不能使用`request`对象来共享数据
`*` 转发的特点：

- forward
- 1.

转发地址栏路径不变
`2.` 转发只能访问当前服务器下的资源
`3.` 转发是一次请求，可以使用`request`对象来共享数据

**路径写法与路径分类**
`1.` 相对路径：通过相对路径不可以确定唯一资源
`*` 如：

- ./index.html
- *

不以`/`开头，以`.`开头路径
`*` 规则：找到当前资源和目标资源之间的相对位置关系
`* ./`：当前目录
`* ../:`后退一级目录
`2.` 绝对路径：通过绝对路径可以确定唯一资源
`*` 如：

http://localhost/day15/responseDemo2/day15/responseDemo2
*
以`/`开头的路径
`*` 规则：判断定义的路径是给谁用的？判断请求将来从哪儿发出
`*` 给客户端浏览器使用：需要加虚拟目录`(`项目的访问路径

- )
- *

建议虚拟目录动态获取：

- request.getContextPath()
- * \<a\> , \<form\>

重定向

- ...
- *

给服务器使用：不需要加虚拟目录
`*` 转发路径
