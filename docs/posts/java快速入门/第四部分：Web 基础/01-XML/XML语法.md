---
title: XML语法
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Web基础, OneNote]
---
**基本语法：**
`1. xml`文档的后缀名

- .xml
- 2. xml

第一行必须定义为文档声明
`3. xml`文档中有且仅有一个根标签
`4.` 属性值必须使用引号`(`单双都可`)`引起来
`5.` 标签必须正确关闭
`6. xml`标签名称区分大小写

**快速入门：**

\<?xml version='1.0' ?\>
\<users\>
\<user id='1'\>
\<name\>zhangsan\</name\>
\<age\>23\</age\>
\<gender\>male\</gender\>
\<br/\>
\</user\>

\<user id='2'\>
\<name\>lisi\</name\>
\<age\>24\</age\>
\<gender\>female\</gender\>
\</user\>
\</users\>
**组成部分：**
`1.` 文档声明
`1.` 格式：`\<?xml` 属性列表

- ?\>
- 2.

属性列表：
`* version`：版本号，必须的属性
`* encoding`：编码方式。告知解析引擎当前文档使用的字符集，默认值：

- ISO-8859-1
- * standalone

：是否独立
`*` 取值：
`* yes`：不依赖其他文件
`* no`：依赖其他文件
`2.` 指令`(`了解`)`：结合`css`的

* \<?xml-stylesheet type="text/css" href="a.css" ?\>
3.
标签：标签名称自定义的，规则：
`*` 名称可以包含字母、数字以及其他的字符；
`*` 名称不能以数字或者标点符号开始；
`*` 名称不能以字母 `xml`（或者 `XML`、`Xml` 等等）开始；
`*` 名称不能包含空格；
`4.` 属性：
`id`属性值唯一；
`5.` 文本：
`* CDATA`区：在该区域中的数据会被原样展示
`*` 格式： `\<![CDATA[` 数据 `]]\>`

**约束：**规定`xml`文档的书写规则

![xm xm colorredcolor xml xm](Exported%20image%2020260702233440-0.png)

`*` 作为框架的使用者`(`程序员`)`，做到以下即可：
`1.` 能够在`xml`中引入约束文档
`2.` 能够简单的读懂约束文档
`*` 分类：
`1. DTD:`一种简单的约束技术
`2. Schema:`一种复杂的约束技术
`* DTD`：
`*` 引入`dtd`文档到`xml`文档中
`*` 内部`dtd`：将约束规则定义在`xml`文档中
`*` 外部`dtd`：将约束的规则定义在外部的`dtd`文件中
`*` 本地：`\<!DOCTYPE` 根标签名 `SYSTEM "dtd`文件的位置`"\>` 约束也可直接写在标签里，用`[]`包括起来。
`*` 网络：`\<!DOCTYPE` 根标签名 `PUBLIC "dtd`文件名字`" "dtd`文件的位置

- URL"\>
- * Schema

：引入
`1.`填写`xml`文档的根元素；
`2.`引入`xsi`前缀：

xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
3.
引入`xsd`文件命名空间：

xsi:schemaLocation="http://www.itcast.cn/xml  student.xsd"
4.
为每一个`xsd`约束声明一个前缀`,`作为标识

  xmlns="http://www.itcast.cn/xml"
\<students   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns="http://www.itcast.cn/xml"
xsi:schemaLocation="http://www.itcast.cn/xml  student.xsd"\>
```
