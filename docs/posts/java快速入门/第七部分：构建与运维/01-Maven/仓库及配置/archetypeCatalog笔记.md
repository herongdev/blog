---
title: archetypeCatalog笔记
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
当我们使用`maven`原型生成项目骨架时，经常会在`[INFO] Generating project in Interactive mode`这个地方特别慢，这里并不是什么出错卡住的原因，你打开`mvn`的`debug`模式就可看到下面的信息：

[DEBUG] Searching for remote catalog: http://repo.maven.apache.org/maven2/archetype-catalog.xml
 _他只是在寻找远程原型数据信息，而这个数据在外网并且还挺大，导致速度很慢，解决方式是我们手动下载这个_`archetype-catalog.xml`_文件到我们本地，把它放在_`.m2`_的目录下，_`.m2`_目录下也可以放置_`maven`_的配置文件，并且_`maven`_默认的本地仓库目录就在_`.m2`_的目录下面。_`.m2`_下面的_`maven`_配置文件比_`maven`_安装目录下的_`config`_目录下面的配置文件优先级高。因为_`.m2`_存在于当前用户的目录下，不同的用户有自己的_`maven`_配置习惯。_
_把_`archetype-catalog.xml`_放在_`.m2`_目录下后我们在使用_`mvn archetype:generate`_时在后面添加_`-DarchetypeCatalog=local` _这时_`mvn`_会使用本地的原型数据来供你选择生成骨架的原型。_
`archetypeCatalog`用来指定`maven-archetype-plugin`读取`archetype-catalog.xml`文件的位置：
`internal`——`maven-archetype-plugin`内置的
`local`——本地的，位置为

- ~/.m2/archetype-catalog.xml
- remote

——指向`Maven`中央仓库的`Catalog`

\> 来自

 \<https://www.cnblogs.com/syd-fish-cat/p/9260991.html\>
```
