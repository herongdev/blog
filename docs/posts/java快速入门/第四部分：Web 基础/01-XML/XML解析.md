---
title: XML解析
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, Web基础, OneNote]
---
**解析：**操作`xml`文档，将文档中的数据读取到内存中。
`*` 操作`xml`文档
`1.` 解析`(`读取`)`：将文档中的数据读取到内存中
`2.` 写入：将内存中的数据保存到`xml`文档中。持久化的存储。
`*` 解析`xml`的方式：
`1. DOM`：将标记语言文档一次性加载进内存，在内存中形成一颗`dom`树
`*` 优点：操作方便，可以对文档进行`CRUD`的所有操作
`*` 缺点：占内存
`2. SAX`：逐行读取，基于事件驱动的。
`*` 优点：不占内存。
`*` 缺点：只能读取，不能增删改

`xml`**常见的解析器：**
`1. JAXP`：`sun`公司提供的解析器，支持`dom`和`sax`两种思想
`2. DOM4J`：一款非常优秀的解析器
`3. Jsoup`：`jsoup` 是一款`Java` 的`HTML`解析器，可直接解析某个`URL`地址、`HTML`文本内容。它提供了一套非常省力的`API`，可通过`DOM`，`CSS`以及类似于`jQuery`的操作方法来取出和操作数据。
`4. PULL`：`Android`操作系统内置的解析器，`sax`方式的。

`Jsoup`**：**
`jsoup` 是一款`Java` 的`HTML`解析器，可直接解析某个`URL`地址、`HTML`文本内容。它提供了一套非常省力的`API`，可通过`DOM`，`CSS`以及类似于`jQuery`的操作方法来取出和操作数据。
`*` 快速入门，步骤：
`1.` 导入`jar`包
`2.` 获取`Document`对象
`3.` 获取对应的标签`Element`对象
`4.` 获取数据

`*` 代码：

![2 . student . xmI path String path JscupDemoI . cl...](Exported%20image%2020260702233444-0.png)

对象的使用：
`1. Jsoup`：工具类，可以解析`html`或`xml`文档，返回

- Document
- * parse

：解析`html`或`xml`文档，返回

- Document
- * parse

​`(File in, String charsetName)`：解析`xml`或`html`文件的。
`* parse`​`(String html)`：解析`xml`或`html`字符串
`* parse`​`(URL url, int timeoutMillis)`：通过网络路径获取指定的`html`或`xml`的文档对象。

`2. Document`：文档对象。代表内存中的`dom`树
`*` 获取`Element`对象
`* getElementById`​`(String id)`：根据`id`属性值获取唯一的`element`对象
`* getElementsByTag`​`(String tagName)`：根据标签名称获取元素对象集合
`* getElementsByAttribute`​`(String key)`：根据属性名称获取元素对象集合
`* getElementsByAttributeValue`​`(String key, String value)`：根据对应的属性名和属性值获取元素对象集合

`3. Elements`：元素`Element`对象的集合。可以当做 `ArrayList\<Element\>`来使用

`4. Element`：元素对象
`1.` 获取子元素对象
`* getElementById`​`(String id)`：根据`id`属性值获取唯一的`element`对象
`* getElementsByTag`​`(String tagName)`：根据标签名称获取元素对象集合
`* getElementsByAttribute`​`(String key)`：根据属性名称获取元素对象集合
`* getElementsByAttributeValue`​`(String key, String value)`：根据对应的属性名和属性值获取元素对象集合
`2.` 获取属性值
`* String attr(String key)`：根据属性名称获取属性值
`3.` 获取文本内容
`* String text():`获取文本内容
`* String html():`获取标签体的所有内容`(`包括字标签的字符串内容`)`

`5. Node`：节点对象
`*` 是`Document`和`Element`的父类
`*` 快捷查询方式：
`1. selector:`选择器
`*` 使用的方法：`Elements select`​

- (String cssQuery)
- *

语法：参考`Selector`类中定义的语法
`2. XPath`：`XPath`即为`XML`路径语言，它是一种用来确定`XML`（标准通用标记语言的子集）文档中某部分位置的语言
`*` 使用`Jsoup`的`Xpath`需要额外导入`jar`包。
`*` 查询`w3cshool`参考手册，使用`xpath`的语法完成查询
`*` 代码：

![I . Student. xmI path SC ling path JsoupDem06. cla...](Exported%20image%2020260702233446-1.png)
