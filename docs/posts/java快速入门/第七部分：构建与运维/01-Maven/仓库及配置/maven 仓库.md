---
title: maven 仓库
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
**常用的** `maven` **命令**
`compile`：编译

`clean`

：清理

`test`

：测试

`package`

：打包

`install`

：安装

**坐标定义**
在

`pom.xml`

中定义坐标，内容包括：`groupId`、`artifactId`、`version`，详细内容如下：

`\<!--`

项目名称，定义为组织名`+`项目名，类似包名

- --\>
- \<groupId\>cn.itcast.maven\</groupId\>
- \<!--

模块名称

- --\>
- \<artifactId\>maven-first\</artifactId\>
- \<!--

当前项目版本号，`snapshot` 为快照版本即非正式版本，`release` 为正式发布版本

- --\>
- \<version\>0.0.1-SNAPSHOT\</version\>
- \<packaging \>

：打包类型

`jar`

：执行 `package` 会打成 `jar` 包

`war`

：执行 `package` 会打成 `war` 包

`pom`

：用于 `maven` 工程的继承，通常父工程设置为 `pom`

`pom` **基本配置**
`pom.xml` 是 `Maven` 项目的核心配置文件，位于每个工程的根目录，基本配置如下：

`\<project \>`

：文件的根节点

- .
- \<modelversion \>

： `pom.xml` 使用的对象模型版本

`\<groupId \>`

：项目名称，一般写项目的域名

`\<artifactId \>`

：模块名称，子项目名或模块名称

`\<version \>`

：产品的版本号

- .
- \<packaging \>

：打包类型，一般有 `jar`、`war`、`pom` 等

`\<name \>`

：项目的显示名，常用于 `Maven` 生成的文档。

`\<description \>`

：项目描述，常用于 `Maven` 生成的文档

`\<dependencies\>`

：项目依赖构件配置，配置项目依赖构件的坐标

`\<build\>`

：项目构建配置，配置编译、运行插件等。
