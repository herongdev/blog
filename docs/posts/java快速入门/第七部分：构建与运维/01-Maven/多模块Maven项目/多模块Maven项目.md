---
title: 多模块Maven项目
date: 2026-07-03
categories: [Java 快速入门]
tags: [Java, 构建运维, OneNote]
---
多模块Maven项目。您的主要应用可能是在ms-admin模块中，因为它的名称和其包含的资源文件（如application.yml、logback.xml等）都暗示它可能是主应用模块。

一、顶级容器pom.xml；

- 它没有parent节点：正确。顶级容器pom.xml通常不会有parent节点，因为它是整个多模块项目的根。
- 它有modules表明它包括哪些模块：正确。在顶级容器中使用modules元素来列出所有子模块。
- 虽然子模块在物理结构上被包括在主模块中，并在主模块的modules元素中被声明，但如果一个子模块想要使用另一个子模块的类或资源，它仍然需要在其pom.xml文件中明确地添加该子模块的依赖声明。
- 它的类型为：\<packaging\>pom\</packaging\>：正确。顶级容器pom.xml的packaging类型应为pom，这表示它主要用于聚合和管理子模块，而不是产生特定的构建输出。

这个pom.xml文件是一个多模块Maven项目的主pom文件，它定义了一些常用的属性、依赖管理和模块。从你提供的内容来看，这个配置大致是合理的，但仍有一些需要注意的点：

1. groupId与artifactId的使用
    - 通常在多模块项目中，每个模块的groupId应该是相同的，而artifactId则应该是各自不同的，用来标识各个模块。从你给出的pom.xml来看，各模块的artifactId都是不同的，这是正确的。
2. version属性的使用
    - 通常情况下，主模块的版本号和子模块的版本号应该保持一致。在你给的pom.xml中，所有模块的版本号都是从\<ms.version\>1.0.0\</ms.version\>属性中获取的，这是一个好做法。
3. \<packaging\>pom\</packaging\>
    - 这是正确的，因为这是一个聚合模块，所以其包类型应该是pom。
4. 依赖管理 (dependencyManagement)
    - 在主pom文件中使用\<dependencyManagement\>元素来定义子模块通用的依赖是一个好做法。这样可以保证子模块使用相同的依赖版本，便于统一管理。
5. \<repositories\> 和 \<pluginRepositories\>
    - 你在这里指定了阿里云的Maven仓库，这对于中国的开发者来说是一个加速下载依赖的好做法，但如果项目需要在其他地区部署，可能会遇到访问速度的问题。
6. 模块的声明
    - ms-admin被声明为一个模块，但在依赖管理中并没有看到它的依赖声明。确保其他模块如果需要依赖ms-admin，则需要在它们自己的pom.xml文件中添加依赖声明。
7. 潜在的问题
    - \<groupId\>com.alibaba.fastjson2\</groupId\>，这里的fastjson2可能是个错误。通常，fastjson的groupId是com.alibaba，artifactId是fastjson。你需要验证是否真的需要使用fastjson2。

调整建议：

9. 对于每个模块，除非它确实需要某个依赖，否则不应在其pom.xml文件中直接引入从dependencyManagement中定义的依赖。这样可以避免不必要的依赖传递。
10. 根据实际情况检查fastjson的依赖声明。
11. 考虑为常用的插件版本也定义属性，例如，你已经为maven-compiler-plugin定义了版本3.1，你可以为它定义一个属性，类似于你为依赖定义的版本属性。
12. 最后，建议经常运行mvn clean install或mvn clean verify来确保所有的模块都能正确编译和安装。

\<?xml version="1.0" encoding="UTF-8"?\>
\<project xmlns="http://maven.apache.org/POM/4.0.0"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 [http://maven.apache.org/xsd/maven-4.0.0.xsd](http://maven.apache.org/xsd/maven-4.0.0.xsd)"\>
\<modelVersion\>4.0.0\</modelVersion\>

\<groupId\>com.ms\</groupId\>
\<artifactId\>ms\</artifactId\>
\<version\>1.0.0\</version\>

\<name\>ms\</name\>
\<description\>民晟管理系统\</description\>   \<properties\>
\<ms.version\>1.0.0\</ms.version\>
\<project.build.sourceEncoding\>UTF-8\</project.build.sourceEncoding\>
\<project.reporting.outputEncoding\>UTF-8\</project.reporting.outputEncoding\>
\<java.version\>1.8\</java.version\>
\<maven-jar-plugin.version\>3.1.1\</maven-jar-plugin.version\>
\<druid.version\>1.2.14\</druid.version\>
\<bitwalker.version\>1.21\</bitwalker.version\>
\<swagger.version\>3.0.0\</swagger.version\>
\<kaptcha.version\>2.3.2\</kaptcha.version\>
\<mybatis-spring-boot.version\>2.2.2\</mybatis-spring-boot.version\>
\<pagehelper.boot.version\>1.4.5\</pagehelper.boot.version\>
\<fastjson.version\>2.0.16\</fastjson.version\>
\<oshi.version\>6.3.2\</oshi.version\>
\<commons.io.version\>2.11.0\</commons.io.version\>
\<commons.fileupload.version\>1.4\</commons.fileupload.version\>
\<commons.collections.version\>3.2.2\</commons.collections.version\>
\<poi.version\>4.1.2\</poi.version\>
\<velocity.version\>2.3\</velocity.version\>
\<jwt.version\>0.9.1\</jwt.version\>
\</properties\>

\<!-- 依赖声明 --\>
\<dependencyManagement\>
\<dependencies\>

\<!-- SpringBoot的依赖配置--\>
\<dependency\>
\<groupId\>org.springframework.boot\</groupId\>
\<artifactId\>spring-boot-dependencies\</artifactId\>
\<version\>2.5.14\</version\>
\<type\>pom\</type\>
\<scope\>import\</scope\>
\</dependency\>

\<!-- 阿里数据库连接池 --\>
\<dependency\>
\<groupId\>com.alibaba\</groupId\>
\<artifactId\>druid-spring-boot-starter\</artifactId\>
\<version\>${druid.version}\</version\>
\</dependency\>

\<!-- 解析客户端操作系统、浏览器等 --\>
\<dependency\>
\<groupId\>eu.bitwalker\</groupId\>
\<artifactId\>UserAgentUtils\</artifactId\>
\<version\>${bitwalker.version}\</version\>
\</dependency\>

\<!-- SpringBoot集成mybatis框架 --\>
\<dependency\>
\<groupId\>org.mybatis.spring.boot\</groupId\>
\<artifactId\>mybatis-spring-boot-starter\</artifactId\>
\<version\>${mybatis-spring-boot.version}\</version\>
\</dependency\>

\<!-- pagehelper 分页插件 --\>
\<dependency\>
\<groupId\>com.github.pagehelper\</groupId\>
\<artifactId\>pagehelper-spring-boot-starter\</artifactId\>
\<version\>${pagehelper.boot.version}\</version\>
\</dependency\>

\<!-- 获取系统信息 --\>
\<dependency\>
\<groupId\>com.github.oshi\</groupId\>
\<artifactId\>oshi-core\</artifactId\>
\<version\>${oshi.version}\</version\>
\</dependency\>

\<!-- Swagger3依赖 --\>
\<dependency\>
\<groupId\>io.springfox\</groupId\>
\<artifactId\>springfox-boot-starter\</artifactId\>
\<version\>${swagger.version}\</version\>
\<exclusions\>
\<exclusion\>
\<groupId\>io.swagger\</groupId\>
\<artifactId\>swagger-models\</artifactId\>
\</exclusion\>
\</exclusions\>
\</dependency\>

\<!-- io常用工具类 --\>
\<dependency\>
\<groupId\>commons-io\</groupId\>
\<artifactId\>commons-io\</artifactId\>
\<version\>${commons.io.version}\</version\>
\</dependency\>

\<!-- 文件上传工具类 --\>
\<dependency\>
\<groupId\>commons-fileupload\</groupId\>
\<artifactId\>commons-fileupload\</artifactId\>
\<version\>${commons.fileupload.version}\</version\>
\</dependency\>

\<!-- excel工具 --\>
\<dependency\>
\<groupId\>org.apache.poi\</groupId\>
\<artifactId\>poi-ooxml\</artifactId\>
\<version\>${poi.version}\</version\>
\</dependency\>

\<!-- velocity代码生成使用模板 --\>
\<dependency\>
\<groupId\>org.apache.velocity\</groupId\>
\<artifactId\>velocity-engine-core\</artifactId\>
\<version\>${velocity.version}\</version\>
\</dependency\>

\<!-- collections工具类 --\>
\<dependency\>
\<groupId\>commons-collections\</groupId\>
\<artifactId\>commons-collections\</artifactId\>
\<version\>${commons.collections.version}\</version\>
\</dependency\>

\<!-- 阿里JSON解析器 --\>
\<dependency\>
\<groupId\>com.alibaba.fastjson2\</groupId\>
\<artifactId\>fastjson2\</artifactId\>
\<version\>${fastjson.version}\</version\>
\</dependency\>

\<!-- Token生成与解析--\>
\<dependency\>
\<groupId\>io.jsonwebtoken\</groupId\>
\<artifactId\>jjwt\</artifactId\>
\<version\>${jwt.version}\</version\>
\</dependency\>

\<!-- 验证码 --\>
\<dependency\>
\<groupId\>com.github.penggle\</groupId\>
\<artifactId\>kaptcha\</artifactId\>
\<version\>${kaptcha.version}\</version\>
\</dependency\>

\<!-- 定时任务--\>
\<dependency\>
\<groupId\>com.ms\</groupId\>
\<artifactId\>ms-quartz\</artifactId\>
\<version\>${ms.version}\</version\>
\</dependency\>

\<!-- 代码生成--\>
\<dependency\>
\<groupId\>com.ms\</groupId\>
\<artifactId\>ms-generator\</artifactId\>
\<version\>${ms.version}\</version\>
\</dependency\>

\<!-- 核心模块--\>
\<dependency\>
\<groupId\>com.ms\</groupId\>
\<artifactId\>ms-framework\</artifactId\>
\<version\>${ms.version}\</version\>
\</dependency\>

\<!-- 系统模块--\>
\<dependency\>
\<groupId\>com.ms\</groupId\>
\<artifactId\>ms-system\</artifactId\>
\<version\>${ms.version}\</version\>
\</dependency\>

\<!-- 通用工具--\>
\<dependency\>
\<groupId\>com.ms\</groupId\>
\<artifactId\>ms-common\</artifactId\>
\<version\>${ms.version}\</version\>
\</dependency\>

\</dependencies\>
\</dependencyManagement\>

==\<modules\>==
==\<module\>ms-admin\</module\>==
==\<module\>ms-framework\</module\>==
==\<module\>ms-system\</module\>==
==\<module\>ms-quartz\</module\>==
==\<module\>ms-generator\</module\>==
==\<module\>ms-common\</module\>==
==\</modules\>==
==\<packaging\>pom\</packaging\>==

\<dependencies\>

\</dependencies\>

\<build\>
\<plugins\>
\<plugin\>
\<groupId\>org.apache.maven.plugins\</groupId\>
\<artifactId\>maven-compiler-plugin\</artifactId\>
\<version\>3.1\</version\>
\<configuration\>
\<source\>${java.version}\</source\>
\<target\>${java.version}\</target\>
\<encoding\>${project.build.sourceEncoding}\</encoding\>
\</configuration\>
\</plugin\>
\</plugins\>
\</build\>

\<repositories\>
\<repository\>
\<id\>public\</id\>
\<name\>aliyun nexus\</name\>
\<url\>https://maven.aliyun.com/repository/public\</url\>
\<releases\>
\<enabled\>true\</enabled\>
\</releases\>
\</repository\>
\</repositories\>

\<pluginRepositories\>
\<pluginRepository\>
\<id\>public\</id\>
\<name\>aliyun nexus\</name\>
\<url\>https://maven.aliyun.com/repository/public\</url\>
\<releases\>
\<enabled\>true\</enabled\>
\</releases\>
\<snapshots\>
\<enabled\>false\</enabled\>
\</snapshots\>
\</pluginRepository\>
\</pluginRepositories\>

\</project\>
