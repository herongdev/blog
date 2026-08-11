---
title: 解决maven生成项目时卡死
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
lastUpdated: false
---
::: v-pre

==在==

`configure,`

==在==`maven`==的==`runner`==中增加参数== `archetypeCatalog=local`


更换国内境像地址

\<mirror\>  ￼      \<id\>alimaven\</id\>  ￼      \<name\>aliyun maven\</name\>  ￼      \<url\>http://maven.aliyun.com/nexus/content/groups/public/\</url\>  ￼      \<mirrorOf\>central\</mirrorOf\>          ￼    \</mirror\>
```

:::
