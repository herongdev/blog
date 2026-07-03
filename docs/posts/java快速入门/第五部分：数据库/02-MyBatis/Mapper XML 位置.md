---
title: Mapper XML 位置
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 数据库, OneNote]
---
对于 MyBatis 的 Mapper XML 文件，我们通常会放在 resources/mapper 目录下，并且命名规则通常会与其对应的 Mapper Java 接口相同，只是文件后缀是 .xml。是不是有地方可以配置这个眼泪

ChatGPT
在 MyBatis 中，你可以在 MyBatis 配置文件中指定 Mapper XML 文件的位置。这个配置文件通常名为 mybatis-config.xml，位于 src/main/resources 目录下。在这个文件中，你可以使用 \<mappers\> 标签来指定 Mapper XML 文件的位置。

例如，如果你将 Mapper XML 文件放在 src/main/resources/mapper 目录下，那么你可以这样配置：

xml
Copy code
\<configuration\>
\<!-- 其他配置 --\>
\<mappers\>
\<package name="mapper"/\>
\</mappers\>
\</configuration\>
如果你使用 Spring Boot 集成 MyBatis，那么你可以在 application.properties 或 application.yml 文件中配置 Mapper XML 文件的位置。例如：

properties
Copy code
# application.properties
mybatis.mapper-locations=classpath:mapper/*.xml
yaml
Copy code
# application.yml
mybatis:
mapper-locations: classpath:mapper/*.xml
请注意，你需要根据实际的 Mapper XML 文件路径来修改上述配置。
