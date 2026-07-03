---
title: mvn 本地jar包 加入自己的maven仓库
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
`-Dfile` ：你的`jar`的名称
`-DgroupId :`在`pom`中的

- groupId
- -DartifactId

：在`pom`中的

- artifactId
- -Dversion

：在`pom`中的`version`
在`jar`包文件目录输入`cmd`打开命令窗口，执行：
`mvn install:install-file -Dfile=k3cloud-webapi-client.jar -DgroupId=cn.weixiuhui -DartifactId=k3cloud-webapi-client -Dversion=1.0 -Dpackaging=jar`
 \> 来自

 \<https://www.cnblogs.com/gzhbk/p/11585051.html\>
```
